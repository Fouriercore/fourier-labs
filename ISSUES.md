# Fourier Open Source Contributor Issue Catalog

Welcome to the Fourier open-source contributor issue catalog! This guide contains a curated list of **45 open issues** in the repository. To ensure high standards of engineering quality, **every issue has been marked as High Complexity (Advanced)**. This helps contributors tackle rigorous, production-grade tasks across the stack.

---

## 🛠️ Issue Classification Schema

To make contribution simple, each issue is tagged with:
- **Complexity Level**: 
  - 🔴 **Advanced (High)**: Production-grade tasks covering smart contract validators, backend architecture, security auditing heuristics, database integrations, UI design, or SDK wrappers.
- **Issue Type**: Bug, Feature, Optimization, Security, Refactor, Documentation.
- **Labels**: Standard GitHub labels matching our workflow.

---

## 📋 Table of Contents

1. [Legacy Repository Baseline Tasks (Issues #3-#12)](#1-legacy-repository-baseline-tasks)
2. [Core Validators & Utilities (Issues #13-#16, #22)](#2-core-validators--utilities)
3. [API & Route Handlers (Issues #17-#20, #23, #46-#47)](#3-api--route-handlers)
4. [Database & Storage Models (Issues #21, #24-#27)](#4-database--storage-models)
5. [UI/UX Components & Responsive Layouts (Issues #28-#34, #45)](#5-uiux-components--responsive-layouts)
6. [Security Hardening & Threat Intelligence (Issues #35-#39)](#6-security-hardening--threat-intelligence)
7. [Tooling, Linting & CI/CD (Issues #40-#43)](#7-tooling-linting--cicd)
8. [Developer SDK Integration (Issue #44)](#8-developer-sdk-integration)

---

## 1. Legacy Repository Baseline Tasks

### ISSUE-03: [Feature] Browser Extension: Base Structure & Manifest Config
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `enhancement`, `extension`
- **Target Module**: `extension/`
- **Description**: 
  Set up the boilerplate structure for the Fourier Browser Extension (Phase 2 of the roadmap). This extension will eventually scan transaction payloads on-screen and warn users before signing malicious transactions.
- **Requirements**:
  - Create an `extension/` subdirectory in the project root.
  - Configure `manifest.json` (MV3) targeting Chrome and Firefox browsers.
  - Set up standard entry points: background script (`background.ts`), content scripts (`content.ts`), and popup UI (`popup/`).
  - Add TypeScript compiling configuration (`tsconfig.json`) for the extension subfolder.
- **Verification Criteria**:
  - Extension builds successfully without errors.
  - `manifest.json` contains required permissions for host access (specifically targeting Stellar/Soroban explorers and common wallets).

---

### ISSUE-04: [Feature] Fourier SDK (@fouriercore/sdk): Core Client Implementation
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `enhancement`, `sdk`
- **Target Module**: `sdk/`
- **Description**: 
  Package a lightweight TypeScript/JavaScript SDK (`@fouriercore/sdk`) to allow developers to query the Fourier reputation API programmatically within their decentralized applications (Phase 2 of the roadmap).
- **Requirements**:
  - Set up a standard TypeScript package configuration under a new `sdk/` directory.
  - Implement a `FourierClient` class supporting custom config (e.g., base URL, API keys, timeout).
  - Expose public methods:
    - `checkAddress(address: string): Promise<RiskResponse>`
    - `batchCheckAddresses(addresses: string[]): Promise<Record<string, RiskResponse>>`
  - Provide full TypeScript types matching the Next.js API response layout.
- **Verification Criteria**:
  - Client compiles and is exportable as both ESM and CommonJS.
  - Integration tests confirm correct query behavior when mocking Next.js endpoint.

---

### ISSUE-05: [Feature] Public API: Rate Limiting & Global Caching Middleware
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `api`, `complexity: high`, `enhancement`
- **Target File**: [route.ts](file:///c:/Users/ACER/fourier-labs/app/api/check/%5Baddress%5D/route.ts)
- **Description**: 
  Implement rate limiting and request caching for the `/api/check/[address]` endpoint to prepare the reputation engine for public client and wallet usage.
- **Requirements**:
  - Integrate Upstash Redis or a memory-based token-bucket middleware.
  - Implement IP-based rate limiting (e.g., 60 requests/minute for anonymous calls).
  - Configure Cache-Control headers or Redis caching for identical contract queries (TTL: 1 hour) to reduce database load.
  - Return appropriate standard HTTP status codes (429 Too Many Requests) along with rate limit headers.
- **Verification Criteria**:
  - Repeated requests exceeding the threshold receive a 429 response.
  - Headers include `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `X-RateLimit-Reset`.

---

### ISSUE-06: [Refactor] Database Migration: Prisma ORM and Supabase PostgreSQL Setup
- **Type**: ⚙️ Refactor
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `database`, `refactor`
- **Target File**: [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  Transition the current local JSON-based datastore (`data/contracts.json`) to a persistent PostgreSQL database using Prisma ORM and Supabase (Phase 3 of the roadmap).
- **Requirements**:
  - Initialize Prisma CLI and set up `prisma/schema.prisma`.
  - Define tables: `Contract` (address, status, confidence, riskLevel, reason, category, lastUpdated).
  - Write a migration script to populate PostgreSQL from the existing `data/contracts.json`.
  - Refactor `lib/checker.ts` to perform database queries instead of synchronous file reads.
- **Verification Criteria**:
  - Database schemas match the legacy fields.
  - No regression in API endpoint `/api/check/[address]`.

---

### ISSUE-07: [Feature] Community Reporting Portal: Submission UI
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `enhancement`, `frontend`
- **Target Module**: `app/report/`
- **Description**: 
  Create a dedicated community report interface where users can report new threats, phishing contracts, or verified safe tokens.
- **Requirements**:
  - Add a `/report` route in the Next.js frontend.
  - Design a premium, accessible form containing:
    - Target Contract Address (with base32 Soroban address validation).
    - Status Flag (Safe / Scam).
    - Threat Category (e.g., Phishing, Backdoor, Fake Token, Rug Pull).
    - Narrative/Evidence and supporting links.
  - Use Framer Motion for animations and Lucide icons.
- **Verification Criteria**:
  - Form validates address formats dynamically on-screen.
  - Design matches the existing cyber-security/dark mode palette.

---

### ISSUE-08: [Feature] Community Report Verification & Review Workflows
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `database`, `enhancement`
- **Target Module**: `app/api/report/`
- **Description**: 
  Build a backend vetting system for community-submitted reports to avoid spam, abuse, or incorrect flags.
- **Requirements**:
  - Create a `Report` database table tracking submitters, status (pending, approved, rejected), and review notes.
  - Set up API endpoint `/api/report` (POST) to process reports.
  - Implement simple automated scoring or verification flags (e.g., requires manual reviewer authorization, or multiple consensus reports).
  - Integrate Webhooks or discord/slack notifications for reviewers.
- **Verification Criteria**:
  - Submitted reports are saved to database with a 'pending' state.
  - Only reviewed/approved submissions update the primary Contract reputation state.

---

### ISSUE-09: [Feature] Automated Bytecode Heuristics Analysis Engine
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `enhancement`, `security`
- **Target Module**: `lib/heuristics.ts`
- **Description**: 
  Develop an automated analyzer to run heuristics check against target Soroban WASM contract bytecodes to detect potential backdoor features.
- **Requirements**:
  - Create a scanning module inside `lib/heuristics.ts`.
  - Implement checks for:
    - Presence of high-privilege keys / owner roles.
    - Dynamic contract upgrades/self-destruct code sequences.
    - Known malicious library imports or call hooks.
  - Output a generated bytecode confidence/risk score.
- **Verification Criteria**:
  - Returns a structured report summarizing specific heuristic flags triggered.

---

### ISSUE-10: [Feature] Pre-Transaction Wallet Verification Simulation Widget
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `enhancement`, `extension`
- **Target Module**: `app/simulate/`
- **Description**: 
  Create a simulated wallet transaction warning system to showcase how wallets (Freighter, xBull, Albedo) can show warnings before signing.
- **Requirements**:
  - Add a route `/simulate` with a dashboard mock.
  - Allow users to 'simulate signing' a transaction pointing to a specified contract address.
  - Show interactive alert boxes (Red warning modal for Scam status, Green check for Safe status) before mock signature.
- **Verification Criteria**:
  - Simulates wallet events visually.
  - Integrates directly with our local contract API.

---

### ISSUE-11: [Feature] Interactive Reputation Dashboard with Analytics & Maps
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `complexity: high`, `enhancement`, `frontend`
- **Target Module**: `app/dashboard/`
- **Description**: 
  Build a central dashboard landing showing historical stats, live feeds of recently flagged contracts, and threat category distribution charts.
- **Requirements**:
  - Create `/dashboard` route under the app directory.
  - Display key metrics cards: Total Checked, Safe Contracts, Flagged Threats, Active Community Contributors.
  - Build charts showing threats grouped by category (phishing vs rugpull) using Recharts or simple CSS flex/SVG charts.
  - Expose a list of recently updated addresses.
- **Verification Criteria**:
  - High-fidelity visual charts rendering properly in dark-mode layout.
  - Layout is fully responsive.

---

### ISSUE-12: [Bug] Enhance Soroban Base32 Address Validator Checksum Verification
- **Type**: 🐛 Bug
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `bug`, `complexity: high`, `validation`
- **Target File**: [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  The current base32 address checker `isValidSorobanAddress` uses a regex checking prefix and characters. It needs to check cryptographic checksums to verify standard Stellar public/contract keys.
- **Requirements**:
  - Update `lib/checker.ts` (or import Stellar SDK helper if needed).
  - Validate the CRC16 checksum embedded in Stellar/Soroban Base32 G/C addresses.
  - Provide precise error feedback: distinguish between length mismatch, prefix mismatch, alphabet invalidity, and checksum failure.
- **Verification Criteria**:
  - Returns false for typos that match the regex format but have incorrect checksums.
  - Comprehensive unit tests covering valid addresses, checksum failures, and length errors.

---

## 2. Core Validators & Utilities

### ISSUE-13: [Bug] Correct Soroban Address Regex Constraints
- **Type**: 🐛 Bug
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `bug`, `validation`, `complexity: high`
- **Target File**: [validation.ts](file:///c:/Users/ACER/fourier-labs/utils/validation.ts)
- **Description**: 
  The current implementation of `isValidSorobanAddress` uses a simple regex constraint `^C[A-Z2-7]{55}$`. However, it doesn't account for additional characters that could be injected, or handle casing correctly when trimmed. We need to verify that all Stellar Soroban contract address prefixes are fully validated, and ensure that the regex is strict enough to reject non-Base32 characters dynamically.
- **Verification Criteria**:
  - Run validation tests against edge-case strings (e.g. invalid letters '0', '1', '8', '9', 'I', 'O').
  - Ensure addresses containing lowercase are correctly rejected if not normalized, or correctly parsed if normalized.

---

### ISSUE-14: [Feature] Implement CRC16 Checksum Validation for StrKey
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `validation`, `complexity: high`
- **Target File**: [validation.ts](file:///c:/Users/ACER/fourier-labs/utils/validation.ts)
- **Description**: 
  Stellar StrKeys (including Soroban contract addresses beginning with 'C') use a CRC16 checksum at the end (the last two bytes of the decoded Base32 payload) to verify integrity. Currently, we only check the format using a regular expression. To prevent dummy or invalid contract addresses from being accepted or processed by our check pipeline, implement a CRC16 XMODEM checksum validator to verify the payload structure.
- **Verification Criteria**:
  - Decode the Base32 contract address payload.
  - Verify that the last 2 bytes match the CRC16 checksum of the preceding bytes.
  - Reject addresses that pass the regex but fail the checksum.

---

### ISSUE-15: [Optimization] Address Normalization and Trim Helper Function
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `refactor`, `validation`, `complexity: high`
- **Target Files**: [validation.ts](file:///c:/Users/ACER/fourier-labs/utils/validation.ts), [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  Address inputs can sometimes include leading/trailing whitespace, invisible unicode characters, or lowercase characters. We need to write a dedicated string utility that sanitizes inputs (stripping non-alphanumeric/spaces) and normalizes it to uppercase before any validation or database lookups.
- **Verification Criteria**:
  - Inputs like `  ca3d5rw...` or `CA3D5RW...\n` should normalize cleanly to `CA3D5RW...`.
  - Add tests validating that input sanitization functions correctly on multi-byte or space-heavy characters.

---

### ISSUE-16: [Documentation] Standardize Error Messages for Invalid Addresses
- **Type**: 📝 Documentation
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `documentation`, `validation`, `complexity: high`
- **Target File**: [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  The checker returns a generic error description when validation fails. We want to return specific error messages indicating exactly *why* validation failed:
  - Wrong length (must be 56 chars)
  - Wrong prefix (must start with 'C')
  - Invalid Base32 characters
  - Failed checksum validation (once CRC16 is implemented)
- **Verification Criteria**:
  - Inputting a 55-character address should return "Invalid address length".
  - Inputting an address starting with 'G' should return "Invalid contract prefix".

---

### ISSUE-22: [Feature] Implement Unit Tests for Validation Library
- **Type**: 🧪 Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `validation`, `complexity: high`
- **Target File**: `tests/validation.test.ts`
- **Description**: 
  Write a comprehensive test suite (using Jest or Vitest) to check the behavior of the `isValidSorobanAddress` function. The tests should cover correct addresses, incorrect lengths, invalid prefixes (e.g. starting with 'G', 'D', or 'S'), invalid alphabet characters, and empty values.
- **Verification Criteria**:
  - Run the test suite and verify 100% path coverage for validation methods.
  - Integrate test commands into the continuous integration configuration.

---

## 3. API & Route Handlers

### ISSUE-17: [Feature] API Rate Limiting for /api/check/[address]
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `api`, `complexity: high`
- **Target File**: [route.ts](file:///c:/Users/ACER/fourier-labs/app/api/check/%5Baddress%5D/route.ts)
- **Description**: 
  To prevent denial-of-service (DoS) attacks and abuse of our reputation checker, we need to implement rate-limiting middleware. The middleware should track requests by IP address (sliding window rate limit, e.g. 60 requests per minute) and return a `429 Too Many Requests` status code with an appropriate JSON payload.
- **Verification Criteria**:
  - Perform load testing or write tests that execute 61 requests in 10 seconds.
  - Verify that the 61st request returns `429` with headers `Retry-After`.

---

### ISSUE-18: [Optimization] API Response Schema Validation with Zod
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `refactor`, `api`, `complexity: high`
- **Target File**: [route.ts](file:///c:/Users/ACER/fourier-labs/app/api/check/%5Baddress%5D/route.ts)
- **Description**: 
  Define a strict type checking schema using Zod for incoming API path variables and outgoing response items. Zod validations ensure request payloads conform strictly to expected properties, preventing runtime errors on parsing.
- **Verification Criteria**:
  - Invalid requests fail before running business logic and return `400 Bad Request`.
  - TypeScript types are inferred directly from Zod schema definitions.

---

### ISSUE-19: [Feature] Add Support for Multiple Addresses Query (Bulk Lookup)
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `api`, `enhancement`, `complexity: high`
- **Target Files**: `app/api/check/bulk/route.ts` [NEW], [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  Wallets and smart contract developers often need to check multiple contracts in a single transaction sequence. Create a new POST endpoint `/api/check/bulk` that accepts a JSON list of contract addresses and returns a dictionary/map of lookup responses.
- **Verification Criteria**:
  - Send a POST request containing `["CA3D...", "CB3D..."]`.
  - The response should return key-value pairs matching each address to its risk response payload.

---

### ISSUE-20: [Security] CORS Policies and Security Headers for Public API Access
- **Type**: 🔒 Security
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `api`, `complexity: high`
- **Target File**: [next.config.ts](file:///c:/Users/ACER/fourier-labs/next.config.ts)
- **Description**: 
  Fourier needs to be consumable by public wallets, developer consoles, and browser extensions. We need to implement clean CORS policies in our routing structures to enable `GET` requests from external origins, while blocking unsafe modification verbs (`POST`, `PUT`, `DELETE` from unauthorized sources).
- **Verification Criteria**:
  - Querying the endpoint from a local file origin should succeed and return `Access-Control-Allow-Origin: *` headers.
  - Non-GET requests should fail with CORS errors if triggered from unexpected origins.

---

### ISSUE-23: [Optimization] Detailed Logging and Alerting Middleware
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `api`, `complexity: high`
- **Target Files**: `lib/logger.ts` [NEW], [route.ts](file:///c:/Users/ACER/fourier-labs/app/api/check/%5Baddress%5D/route.ts)
- **Description**: 
  Add structured logging inside our API routes (e.g. using `winston` or `pino`). Log query duration, address searched, classification result (safe vs. scam), and client user-agent. Logs should output in JSON format to support indexing by monitoring tools.
- **Verification Criteria**:
  - Verify that query parameters and response attributes are printed cleanly to system stdout/stderr.
  - Verify that execution metrics (milliseconds) are computed and attached to log messages.

---

### ISSUE-46: [Feature] Webhook Integration for Automatic Flag Alerts
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `api`, `complexity: high`
- **Target File**: `app/api/webhooks/dispatch/route.ts` [NEW]
- **Description**: 
  When a contract gets updated to 'Scam' status, we want to broadcast this update to external subscribers. Build a webhook dispatcher that reads subscriber URLs from the database and sends POST payloads containing the newly flagged contract details.
- **Verification Criteria**:
  - Trigger status changes in a contract test entry.
  - Verify that the dispatcher sends POST requests with matching payloads.

---

### ISSUE-47: [Feature] Write Comprehensive Swagger / OpenAPI Spec for Registry APIs
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `documentation`, `api`, `complexity: high`
- **Target File**: `public/openapi.yaml` [NEW]
- **Description**: 
  Write a comprehensive OpenAPI 3.0 specification file documenting all `/api/check/*` paths, query arguments, error codes, and result schemas. Add Swagger UI to display this schema interactively.
- **Verification Criteria**:
  - The spec parses with zero syntax errors in OpenAPI validators.
  - The documentation endpoint renders correctly at `/docs/api-spec`.

---

## 4. Database & Storage Models

### ISSUE-21: [Feature] Transition from JSON File to PostgreSQL (Supabase/Prisma)
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `database`, `refactor`, `complexity: high`
- **Target Files**: `prisma/schema.prisma` [NEW], [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  Our MVP stores reputation information inside a local `contracts.json` file. While this simplifies deployment, it doesn't scale. Build database tables for contracts using Prisma, deploy a Supabase instance, and rewrite `lib/checker.ts` to query DB data asynchronously.
- **Verification Criteria**:
  - Connect to DB, run prisma migrations, and execute scans.
  - Ensure system behaves exactly as before but queries are fetched dynamically from Postgres.

---

### ISSUE-24: [Optimization] Implement Redis Caching Layer for Lookups
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `database`, `refactor`, `complexity: high`
- **Target Files**: `lib/redis.ts` [NEW], [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  To speed up API response times, set up a Redis integration. If a contract signature is requested, fetch from Redis first. If it is a cache miss, read from the database, cache it in Redis with a TTL of 1 hour, and return the response.
- **Verification Criteria**:
  - Verify lookups for cached values resolve in under 15ms.
  - Verify that updates to database entities correctly invalidate the matching Redis key.

---

### ISSUE-25: [Feature] Draft Database Migration Scripts and Seed Code
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `database`, `complexity: high`
- **Target File**: `prisma/seed.ts` [NEW]
- **Description**: 
  Write a database seeder script that parses the original `data/contracts.json` file and bulk inserts the historical telemetry data into PostgreSQL.
- **Verification Criteria**:
  - Run the seed script and verify database tables are populated with correct keys, status labels, and updated timestamps.

---

### ISSUE-26: [Feature] Implement Soft Deletes and Status Changelog in Schema
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `database`, `complexity: high`
- **Target File**: `prisma/schema.prisma` [NEW]
- **Description**: 
  Contracts can change reputation status (e.g. from Unknown to Scam or Safe). We need to support soft deletion (`deletedAt` field) for record archiving and create a `ReputationChangelog` table that logs every history update, who authorized it, and the previous values.
- **Verification Criteria**:
  - Soft deleted contracts must be ignored by the checker API.
  - Updates to a contract record must trigger a record entry in `ReputationChangelog`.

---

### ISSUE-27: [Feature] Automate Daily Database Backup Workflow
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `database`, `complexity: high`
- **Target File**: `.github/workflows/db-backup.yml` [NEW]
- **Description**: 
  Create an automated workflow that runs nightly to export a pg_dump file of the postgres reputation tables, compresses the script, and securely pushes it to AWS S3 or Google Cloud Storage.
- **Verification Criteria**:
  - Trigger the Github Action manually and verify the encrypted dump file lands in the target storage bucket.

---

## 5. UI/UX Components & Responsive Layouts

### ISSUE-28: [Optimization] Enhance Glassmorphic Terminal Theme with Smooth CSS Glow
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `frontend`, `complexity: high`
- **Target Files**: [globals.css](file:///c:/Users/ACER/fourier-labs/styles/globals.css), [tailwind.config.ts](file:///c:/Users/ACER/fourier-labs/tailwind.config.ts)
- **Description**: 
  We want to refine our cyberpunk terminal vibe. Create glowing shadow parameters in CSS/Tailwind (e.g., custom utility class `text-glow-cyan`, `shadow-glow-cyan`) and implement transition animations on border interactions for input fields.
- **Verification Criteria**:
  - Focus indicators glow with a subtle cyan shadow gradient.
  - Hovering on cards triggers smooth border opacity changes.

---

### ISSUE-29: [Bug] Mobile Navigation Responsiveness and Hamburger Menu Drawer
- **Type**: 🐛 Bug
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `bug`, `frontend`, `complexity: high`
- **Target File**: `components/Navbar.tsx`
- **Description**: 
  The current Navbar looks great on desktop but wraps poorly on mobile screens, pushing content off-screen. Implement a clean mobile hamburger icon that toggles a full-screen drawer list of pages (`Scanner`, `Docs`, `About`).
- **Verification Criteria**:
  - Verify that the layout remains responsive on viewports as small as 320px wide.
  - Ensure menu items are clickable and navigation works cleanly in the mobile drawer.

---

### ISSUE-30: [Feature] Multi-Step Interactive Scanner Telemetry Animation
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `frontend`, `complexity: high`
- **Target Files**: [ResultCard.tsx](file:///c:/Users/ACER/fourier-labs/components/ResultCard.tsx), `components/ScannerConsole.tsx` [NEW]
- **Description**: 
  Instead of rendering results instantly, build an interactive 'auditing' pipeline step using Framer Motion. Display mock checklist stages sequentially to create a high-fidelity diagnostic experience:
  - Step 1: Normalizing Address Checksum
  - Step 2: Querying Registry Database
  - Step 3: Fetching Threat Intelligence Heuristics
  - Step 4: Final Reputation Verdict
- **Verification Criteria**:
  - Clicking search should display the loader steps in sequence over 1.5 seconds.
  - Users should be able to skip the animation if they perform rapid bulk queries.

---

### ISSUE-31: [Feature] Dynamic Scanning History Sidebar and Quick Actions
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `frontend`, `complexity: high`
- **Target Files**: [page.tsx](file:///c:/Users/ACER/fourier-labs/app/page.tsx), `components/HistorySidebar.tsx` [NEW]
- **Description**: 
  Extract the scanning history layout into a slide-out panel sidebar. Store the last 10 scans locally using localStorage. Add features for user utility, such as a 'Clear History' button and individual deletion buttons for each history chip.
- **Verification Criteria**:
  - Scans populate the sidebar. Clicking a history item triggers a new scan for that address immediately.
  - Deleting an address removes it from history list and updates local storage.

---

### ISSUE-32: [Optimization] Empty State Illustration and Dynamic Helper Prompts
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `frontend`, `complexity: high`
- **Target File**: [EmptyState.tsx](file:///c:/Users/ACER/fourier-labs/components/ui/EmptyState.tsx)
- **Description**: 
  The current empty state is plain text. Design and implement an inline SVG graphic representing a terminal cursor / search shield. Add a small list of 'recommended starting lookups' that users can click to immediately see how safe vs scam contract cards render.
- **Verification Criteria**:
  - Renders vector elements responsively.
  - Clicking a helper link executes search callback successfully.

---

### ISSUE-33: [Feature] Toast Notifications for Input and System Alerts
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `frontend`, `complexity: high`
- **Target Files**: [layout.tsx](file:///c:/Users/ACER/fourier-labs/app/layout.tsx), [SearchBar.tsx](file:///c:/Users/ACER/fourier-labs/components/SearchBar.tsx)
- **Description**: 
  Implement toaster notification states. When users click 'Copy Address' or input malformed parameters, trigger floating success/error alerts in the corner of the screen. Recommend using `react-hot-toast` or custom React hooks.
- **Verification Criteria**:
  - Copying contract address triggers a 'Copied to clipboard!' alert.
  - Empty search inputs show a validation alert.

---

### ISSUE-34: [Optimization] Accessible UI Components (WAI-ARIA compliance)
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `frontend`, `complexity: high`
- **Target Files**: `components/SearchBar.tsx`, `components/Navbar.tsx`
- **Description**: 
  Review keyboard accessibility on all form inputs and interactive lists. Ensure screen readers read state changes dynamically:
  - Add `aria-expanded` and role labels for mobile drawers.
  - Add descriptive label parameters to inputs.
  - Enable keyboard `Enter` and arrow selections.
- **Verification Criteria**:
  - Pass all manual tab-focus checks on key buttons.
  - Run Lighthouse accessibility audit and hit a score of 100%.

---

### ISSUE-45: [Feature] Create Wallet Pre-Transaction Sandbox Mockup Page
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `frontend`, `sdk`, `complexity: high`
- **Target Files**: `app/sandbox/page.tsx` [NEW], `components/TransactionDetails.tsx` [NEW]
- **Description**: 
  To demonstrate how Fourier integrates with wallets (e.g. Freighter, Albedo), build an interactive wallet mockup page. Users can submit a transaction payload, and the page simulates a wallet confirmation screen. It queries the Fourier check API and displays warning alerts if the target contract is flagged.
- **Verification Criteria**:
  - Renders a mock screen displaying gas fee, target, and payload parameters.
  - Highlights dangerous transactions in red, listing warning reasons.

---

## 6. Security Hardening & Threat Intelligence

### ISSUE-35: [Feature] Decentralized Validator Consensus Rule Draft
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `documentation`, `complexity: high`
- **Target File**: `docs/CONSENSUS_SPEC.md` [NEW]
- **Description**: 
  Since community inputs flag scam contracts, we need a spec defining how to validate reports. Write a comprehensive consensus validation proposal detailing how multiple public validators sign updates using Stellar multisig envelopes or a lightweight voting smart contract, preventing false flagging.
- **Verification Criteria**:
  - The document must detail data verification steps, validator onboarding rules, conflict resolution, and attack defense mechanisms.

---

### ISSUE-36: [Feature] Sandbox Contract Execution Analysis Mockup
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `complexity: high`
- **Target Files**: `lib/sandbox.ts` [NEW], [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  Instead of relying only on static DB files, build a mock WASM analyzer that extracts methods from a Soroban contract binary. Create code that scans method signatures for keywords (e.g. `mint_by_admin`, `drain_assets`, `transfer_all`) and increases the risk level if dangerous functions exist without open source verification.
- **Verification Criteria**:
  - The analysis helper outputs warning flags if sensitive admin functions are declared without access restriction schemas.

---

### ISSUE-37: [Feature] Integrate Threat Intelligence API feeds (StellarExpert / PhishFort)
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `complexity: high`
- **Target File**: [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  If a contract address query is not present in our database, we should query public intelligence APIs (such as StellarExpert API or PhishFort blacklists) to see if the address has been flagged for scam activity. Cache the result to prevent lookup latency.
- **Verification Criteria**:
  - Check result falls back to external APIs when local status is 'unknown'.
  - The responses merge cleanly into our `RiskResponse` schema.

---

### ISSUE-38: [Security] Sanitize Input Parameters Against SQL Injection & XSS
- **Type**: 🔒 Security
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `complexity: high`
- **Target Files**: [validation.ts](file:///c:/Users/ACER/fourier-labs/utils/validation.ts), [route.ts](file:///c:/Users/ACER/fourier-labs/app/api/check/%5Baddress%5D/route.ts)
- **Description**: 
  Raw path inputs on `/api/check/[address]` are passed directly. Sanitize parameters strictly using a clean validator schema to prevent SQL Injection (in future database implementations) and Cross-Site Scripting (XSS) in UI rendering states.
- **Verification Criteria**:
  - Inputting strings containing scripts or HTML characters (e.g. `<script>`) triggers immediate validation failure and returns a `400` code.

---

### ISSUE-39: [Feature] Automated Fraud Score Metric Calculation
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `security`, `complexity: high`
- **Target Files**: `utils/scoring.ts` [NEW], [checker.ts](file:///c:/Users/ACER/fourier-labs/lib/checker.ts)
- **Description**: 
  Write a scoring algorithm to calculate our `confidence` metric. The confidence percentage should be mathematically generated using:
  - Account age weighting (older contracts are safer)
  - Number of historical transactions
  - Number of reports from the community
  - Verification signature count by trusted auditors
- **Verification Criteria**:
  - Verify that the output value falls strictly within the `0-100` bounds.
  - Write test cases asserting expected confidence values for new vs. veteran safe contracts.

---

## 7. Tooling, Linting & CI/CD

### ISSUE-40: [Optimization] Enable Strict TypeScript Compilation Rules
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `refactor`, `complexity: high`
- **Target File**: [tsconfig.json](file:///c:/Users/ACER/fourier-labs/tsconfig.json)
- **Description**: 
  To enforce maximum code safety and catch edge cases at compile-time, enable strict compiler options inside `tsconfig.json`:
  - `"noImplicitAny": true`
  - `"strictNullChecks": true`
  - `"noUnusedLocals": true`
  - `"noUnusedParameters": true`
- **Verification Criteria**:
  - Run `npm run build` or `npx tsc --noEmit` and resolve all resulting code errors in the codebase.

---

### ISSUE-41: [Optimization] Setup Lint Staged with Husky for Automated Pre-Commit Formatting
- **Type**: ⚡ Optimization
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `refactor`, `complexity: high`
- **Target Files**: [package.json](file:///c:/Users/ACER/fourier-labs/package.json), `.husky/pre-commit` [NEW]
- **Description**: 
  Set up pre-commit git hooks using `husky` and `lint-staged`. Before a developer commits code, the hook must format matching files with Prettier and run `next lint` on modified files, blocking the commit if compile check errors are present.
- **Verification Criteria**:
  - Commit a poorly formatted file and verify it is formatted automatically before the commit finishes.
  - Commits should fail if lint errors are present.

---

### ISSUE-42: [Feature] Automated Lighthouse Audit CI Action
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `documentation`, `complexity: high`
- **Target File**: `.github/workflows/lighthouse.yml` [NEW]
- **Description**: 
  Create a GitHub actions workflow that runs a Lighthouse scan on pull requests. The build output is audited for speed, accessibility, SEO metrics, and best practices. Fail the pipeline if any metric drops below 90.
- **Verification Criteria**:
  - Push a pull request and verify that the Lighthouse CI job executes and posts scores in the PR details.

---

### ISSUE-43: [Feature] Code Coverage Reporting on Pull Requests
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `testing`, `complexity: high`
- **Target File**: `.github/workflows/ci.yml`
- **Description**: 
  Expand our standard CI pipeline to run test coverage checks. Integrate Codecov or write a shell runner that outputs coverage reports and comments directly on the GitHub PR thread.
- **Verification Criteria**:
  - PR checks display detailed line-by-line coverage metrics for changed files.

---

## 8. Developer SDK Integration

### ISSUE-44: [Feature] Initial Scaffold of Developer SDK (@fouriercore/sdk)
- **Type**: ✨ Feature
- **Complexity**: 🔴 Advanced (High)
- **Labels**: `sdk`, `complexity: high`
- **Target Files**: `packages/sdk/package.json` [NEW], `packages/sdk/src/index.ts` [NEW]
- **Description**: 
  Scaffold a lightweight, packageable SDK enabling other developers to run Fourier checks programmatically. Write functions `checkAddress` and `isBlacklisted` that call the Fourier API under the hood, complete with type definitions. Use Microbundle or TSDX to package it.
- **Verification Criteria**:
  - Build the package. Ensure it compiles to commonjs and esm formats.
  - Set up a small local script that imports the package and tests the lookup functions.
