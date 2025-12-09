import { getFormulationBusinessCases } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const businessCases = await getFormulationBusinessCases(id);
    return NextResponse.json(businessCases);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch business cases",
      },
      { status: 500 },
    );
  }
}
