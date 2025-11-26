import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { createClient } from "@supabase/supabase-js";

// Create a simple Supabase client for API routes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Fetch database context
async function getDatabaseContext() {
  // Get formulation counts by status
  const { data: formulations } = await supabase
    .from("formulations")
    .select("formulation_status, formulation_category")
    .eq("is_active", true);

  const statusCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  
  formulations?.forEach((f) => {
    statusCounts[f.formulation_status || "Unknown"] = 
      (statusCounts[f.formulation_status || "Unknown"] || 0) + 1;
    categoryCounts[f.formulation_category || "Unknown"] = 
      (categoryCounts[f.formulation_category || "Unknown"] || 0) + 1;
  });

  // Get country count
  const { count: countryCount } = await supabase
    .from("countries")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  // Get business case totals
  const { data: bcData } = await supabase
    .from("vw_business_case")
    .select("total_revenue, total_margin, country_name, fiscal_year")
    .eq("status", "active");

  const totalRevenue = bcData?.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0) || 0;
  const totalMargin = bcData?.reduce((sum, bc) => sum + (bc.total_margin || 0), 0) || 0;

  return `
## Current Portfolio Summary

### Formulations
- Total active formulations: ${formulations?.length || 0}
- By Status: ${Object.entries(statusCounts).map(([k, v]) => `${k}: ${v}`).join(", ")}
- By Category: ${Object.entries(categoryCounts).map(([k, v]) => `${k}: ${v}`).join(", ")}

### Markets
- Active countries: ${countryCount || 0}

### Business Cases
- Total projected revenue: €${Math.round(totalRevenue).toLocaleString()}
- Total projected margin: €${Math.round(totalMargin).toLocaleString()}
- Margin %: ${totalRevenue > 0 ? Math.round((totalMargin / totalRevenue) * 100) : 0}%
`;
}

// System prompt
const SYSTEM_PROMPT = `You are Dr Bob, an AI assistant for a product portfolio management system. You help users understand and analyze their agrochemical formulation portfolio, business cases, and pipeline data.

You have access to real-time data from the database. Be helpful, concise, and provide insights based on the data provided.

When discussing financial figures:
- Use EUR (€) as the currency
- Format large numbers with thousands separators
- Round to whole numbers unless precision is important

Keep responses clear and actionable. If you don't have enough information to answer a question, say so.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  // Fetch current database context
  const dbContext = await getDatabaseContext();

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: SYSTEM_PROMPT + "\n\n" + dbContext,
    messages,
  });

  return result.toTextStreamResponse();
}
