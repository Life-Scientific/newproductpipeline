import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export interface SearchResult {
  entity_type: "formulation" | "country" | "reference_product";
  entity_id: string;
  entity_code: string;
  entity_name: string;
  score: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  const supabase = await createClient();

  // Call the search_portfolio function
  const { data, error } = await supabase.rpc("search_portfolio", {
    search_query: query,
    result_limit: Math.min(limit, 50), // Cap at 50 results
  });

  if (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    results: data as SearchResult[],
    query,
  });
}
