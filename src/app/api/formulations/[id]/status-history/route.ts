import { NextResponse } from "next/server";
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
    console.error("Error fetching status history:", error);
    return NextResponse.json(
      { error: "Failed to fetch status history" },
      { status: 500 },
    );
  }
}
