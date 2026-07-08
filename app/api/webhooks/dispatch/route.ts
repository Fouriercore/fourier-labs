import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Contract } from "@/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Shape of a single webhook subscriber stored in data/webhooks.json.
 * Each subscriber registers a URL that will receive POST payloads whenever
 * a contract is flagged as "scam".
 */
export interface WebhookSubscriber {
  /** Unique identifier for the subscriber. */
  id: string;
  /** The HTTP(S) URL that receives the webhook payload. */
  url: string;
  /** Optional human-readable label for the subscriber. */
  label?: string;
  /** ISO timestamp when the subscriber was registered. */
  registeredAt: string;
}

/**
 * The payload shape sent to each subscriber URL via HTTP POST.
 */
export interface WebhookPayload {
  /** Event type discriminator – always "contract.flagged" for scam alerts. */
  event: "contract.flagged";
  /** ISO timestamp of when the dispatch was triggered. */
  timestamp: string;
  /** The newly flagged contract's details. */
  contract: Contract;
}

/**
 * Per-subscriber result included in the dispatch summary response.
 */
export interface DispatchResult {
  subscriberId: string;
  url: string;
  success: boolean;
  statusCode?: number;
  error?: string;
}

/**
 * Response shape returned by POST /api/webhooks/dispatch.
 * Extends the generic success/error envelope with dispatch-specific data.
 */
export interface DispatchAPIResponse {
  success: boolean;
  error?: string;
  data?: {
    dispatched: number;
    succeeded: number;
    failed: number;
    results: DispatchResult[];
    message?: string;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Reads and returns the list of webhook subscribers from the local JSON store.
 * Returns an empty array if the file does not exist or cannot be parsed.
 */
function readSubscribers(): WebhookSubscriber[] {
  try {
    const filePath = path.join(process.cwd(), "data", "webhooks.json");
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as WebhookSubscriber[];
  } catch (err) {
    console.error("[webhook/dispatch] Failed to read webhooks.json:", err);
    return [];
  }
}

/**
 * Reads and returns all contracts from the local JSON database.
 * Returns an empty array on any failure.
 */
function readContracts(): Contract[] {
  try {
    const filePath = path.join(process.cwd(), "data", "contracts.json");
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Contract[];
  } catch (err) {
    console.error("[webhook/dispatch] Failed to read contracts.json:", err);
    return [];
  }
}

/**
 * Validates that a string is a well-formed absolute HTTP(S) URL.
 *
 * @param raw - The string to validate.
 * @returns True when the URL is valid, false otherwise.
 */
function isValidUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Dispatches a POST request to a single subscriber URL with the given payload.
 * Enforces a 10-second timeout so a slow subscriber cannot stall the handler.
 *
 * @param subscriber - The target subscriber.
 * @param payload    - The webhook payload to send.
 * @returns A DispatchResult summarising the outcome.
 */
async function dispatchToSubscriber(
  subscriber: WebhookSubscriber,
  payload: WebhookPayload
): Promise<DispatchResult> {
  // Guard against malformed URLs stored in the database
  if (!isValidUrl(subscriber.url)) {
    return {
      subscriberId: subscriber.id,
      url: subscriber.url,
      success: false,
      error: "Subscriber URL is not a valid HTTP(S) URL.",
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(subscriber.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Fourier-Event": payload.event,
        "X-Fourier-Timestamp": payload.timestamp,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return {
      subscriberId: subscriber.id,
      url: subscriber.url,
      success: response.ok,
      statusCode: response.status,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      subscriberId: subscriber.id,
      url: subscriber.url,
      success: false,
      error: message,
    };
  }
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

/**
 * POST /api/webhooks/dispatch
 *
 * Triggers the webhook dispatcher for a specific contract address.  The
 * handler validates that the contract exists in the local database and that
 * its status is "scam" before fanning out POST payloads to every registered
 * subscriber URL.
 *
 * Request body (JSON):
 * ```json
 * { "address": "<soroban-contract-address>" }
 * ```
 *
 * Response body (JSON):
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "dispatched": 3,
 *     "succeeded": 2,
 *     "failed": 1,
 *     "results": [...]
 *   }
 * }
 * ```
 */
export async function POST(request: Request): Promise<NextResponse<DispatchAPIResponse>> {
  // 1. Parse and validate the request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("address" in body) ||
    typeof (body as Record<string, unknown>).address !== "string"
  ) {
    return NextResponse.json(
      { success: false, error: 'Request body must include a string field "address".' },
      { status: 400 }
    );
  }

  const address = ((body as Record<string, unknown>).address as string).toUpperCase().trim();

  if (!address) {
    return NextResponse.json(
      { success: false, error: 'The "address" field must not be empty.' },
      { status: 400 }
    );
  }

  // 2. Look up the contract in the local database
  const contracts = readContracts();
  const contract = contracts.find((c) => c.address.toUpperCase() === address);

  if (!contract) {
    return NextResponse.json(
      {
        success: false,
        error: `Contract "${address}" was not found in the Fourier threat intelligence database.`,
      },
      { status: 404 }
    );
  }

  // 3. Only dispatch alerts for contracts that are flagged as "scam"
  if (contract.status !== "scam") {
    return NextResponse.json(
      {
        success: false,
        error: `Contract "${address}" has status "${contract.status}". Webhook alerts are only dispatched for contracts with status "scam".`,
      },
      { status: 422 }
    );
  }

  // 4. Load subscribers
  const subscribers = readSubscribers();

  if (subscribers.length === 0) {
    return NextResponse.json({
      success: true,
      data: {
        dispatched: 0,
        succeeded: 0,
        failed: 0,
        results: [],
        message: "No webhook subscribers are currently registered.",
      },
    });
  }

  // 5. Build the payload and fan-out to all subscribers concurrently
  const payload: WebhookPayload = {
    event: "contract.flagged",
    timestamp: new Date().toISOString(),
    contract,
  };

  const results = await Promise.all(subscribers.map((sub) => dispatchToSubscriber(sub, payload)));

  const succeeded = results.filter((r) => r.success).length;
  const failed = results.length - succeeded;

  console.info(
    `[webhook/dispatch] Dispatched to ${results.length} subscriber(s): ${succeeded} succeeded, ${failed} failed.`
  );

  // 6. Return summary
  return NextResponse.json({
    success: true,
    data: {
      dispatched: results.length,
      succeeded,
      failed,
      results,
    },
  });
}
