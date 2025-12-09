import { getFormulationIngredients } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const ingredients = await getFormulationIngredients(id);
    return NextResponse.json(ingredients);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch ingredients",
      },
      { status: 500 },
    );
  }
}
