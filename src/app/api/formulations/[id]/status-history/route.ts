import { NextResponse } from "next/server";
import { log, warn, error, table } from "@/lib/logger";
import { getFormulationStatusHistory } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const statusHistory = await getFormulationStatusHistory(id);
    return NextResponse.json(statusHistory);
  } catch (error) {
    error("Error fetching status history:", error);
    return NextResponse.json(
      { error: "Failed to fetch status history" },
      { status: 500 },
    );
  }
}
