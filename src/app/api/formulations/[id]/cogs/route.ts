import { getFormulationCOGS } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cogs = await getFormulationCOGS(id);
    return NextResponse.json(cogs);
  } catch (supabaseError) {
    return NextResponse.json(
      {
        error: supabaseError instanceof Error ? supabaseError.message : "Failed to fetch COGS",
      },
      { status: 500 },
    );
  }
}
