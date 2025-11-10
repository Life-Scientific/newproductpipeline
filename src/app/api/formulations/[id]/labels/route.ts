import { getFormulationLabels } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const labels = await getFormulationLabels(id);
    return NextResponse.json(labels);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch labels" },
      { status: 500 }
    );
  }
}

