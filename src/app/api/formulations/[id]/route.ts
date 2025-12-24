import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("formulations")
    .select("*")
    .eq("formulation_id", id)
    .single();

  if (supabaseError) {
    return NextResponse.json({ error: supabaseError.message }, { status: 404 });
  }

  return NextResponse.json(data);
}
