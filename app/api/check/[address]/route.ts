import { NextResponse } from "next/server";
import { checkContract } from "@/lib/checker";
import { APIResponse } from "@/types";

/**
 * API Endpoint GET handler checking contract safety parameters.
 * Resolves dynamic parameters asynchronously matching Next 15 standard.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ address: string }> }
): Promise<NextResponse<APIResponse>> {
  try {
    // In Next.js 15, route parameters are resolved asynchronously
    const resolvedParams = await params;
    const address = resolvedParams.address;

    if (!address) {
      return NextResponse.json(
        { success: false, error: "Contract address parameter is required." },
        { status: 400 }
      );
    }

    const checkResult = checkContract(address);

    return NextResponse.json({
      success: true,
      data: checkResult,
    });
  } catch (error) {
    console.error("API error checking contract reputation:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred while analyzing the contract." },
      { status: 500 }
    );
  }
}
