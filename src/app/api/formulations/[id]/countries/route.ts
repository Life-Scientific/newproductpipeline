import { getFormulationCountryDetails } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const countries = await getFormulationCountryDetails(id);
    return NextResponse.json(countries);
  } catch (supabaseError) {
    return NextResponse.json(
      {
        error:
          supabaseError instanceof Error ? supabaseError.message : "Failed to fetch countries",
      },
      { status: 500 },
    );
  }
}
