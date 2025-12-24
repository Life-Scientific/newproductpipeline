import { NextResponse } from "next/server";
import { log, warn, error, table } from "@/lib/logger";
import {
  findDuplicateActiveBusinessCases,
  fixDuplicateActiveBusinessCases,
} from "@/lib/actions/business-cases-cleanup";

export async function GET() {
  try {
    const result = await findDuplicateActiveBusinessCases();
    return NextResponse.json(result);
  } catch (error) {
    error("Error finding duplicates:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to find duplicates",
      },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    const result = await fixDuplicateActiveBusinessCases();
    return NextResponse.json(result);
  } catch (error) {
    error("Error fixing duplicates:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fix duplicates",
      },
      { status: 500 },
    );
  }
}

