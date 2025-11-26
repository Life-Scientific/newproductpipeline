import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MODELS = {
  "claude-haiku": anthropic("claude-haiku-4-5-20251001"),
  "claude-sonnet": anthropic("claude-sonnet-4-5-20250929"),
} as const;

export type ModelId = keyof typeof MODELS;

async function getPortfolioData() {
  // Fetch all data in parallel from Supabase views
  const [
    { data: dashboardSummary, error: summaryError },
    { data: yearlyData, error: yearlyError },
    { data: formulations, error: formError },
    { data: ingredients, error: ingredientError },
    { data: countries, error: countryError },
  ] = await Promise.all([
    supabase.from("vw_dashboard_summary").select("*").single(),
    supabase.from("vw_chart_data_totals_by_year").select("*").order("fiscal_year"),
    supabase.from("vw_formulations_with_ingredients").select("formulation_name, formulation_code, formulation_status, formulation_category, ingredient_names").limit(100),
    supabase.from("vw_ingredient_usage").select("ingredient_name, ingredient_type, formulation_count, is_eu_approved").order("formulation_count", { ascending: false }).limit(25),
    supabase.from("countries").select("country_name, country_code").eq("is_active", true),
  ]);

  // Log any errors
  if (summaryError) console.error("Dashboard summary error:", summaryError);
  if (yearlyError) console.error("Yearly data error:", yearlyError);
  if (formError) console.error("Formulations error:", formError);
  if (ingredientError) console.error("Ingredients error:", ingredientError);
  if (countryError) console.error("Countries error:", countryError);

  // Process formulation status counts
  const statusCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  formulations?.forEach((f) => {
    statusCounts[f.formulation_status || "Unknown"] = (statusCounts[f.formulation_status || "Unknown"] || 0) + 1;
    categoryCounts[f.formulation_category || "Unknown"] = (categoryCounts[f.formulation_category || "Unknown"] || 0) + 1;
  });

  return {
    summary: dashboardSummary,
    yearly: yearlyData || [],
    formulations: formulations || [],
    ingredients: ingredients || [],
    countries: countries || [],
    statusCounts,
    categoryCounts,
  };
}

function formatDataContext(data: Awaited<ReturnType<typeof getPortfolioData>>) {
  const { summary, yearly, formulations, ingredients, countries, statusCounts, categoryCounts } = data;

  return `
=== LIVE PORTFOLIO DATA FROM SUPABASE ===
(Data fetched from: vw_dashboard_summary, vw_chart_data_totals_by_year, vw_formulations_with_ingredients, vw_ingredient_usage, countries)

## KEY METRICS (from vw_dashboard_summary)
- Total Formulations: ${summary?.total_formulations ?? "N/A"}
- Selected Status: ${summary?.selected_formulations ?? "N/A"}
- Monitoring Status: ${summary?.monitoring_formulations ?? "N/A"}  
- Development Status: ${summary?.development_formulations ?? "N/A"}
- Dropped: ${summary?.dropped_formulations ?? "N/A"}
- Total Business Cases: ${summary?.total_business_cases ?? "N/A"}
- Active Markets: ${summary?.unique_countries ?? "N/A"} countries
- Total Revenue (EUR): €${summary?.total_revenue ? Math.round(summary.total_revenue).toLocaleString() : "N/A"}
- Total Margin (EUR): €${summary?.total_margin ? Math.round(summary.total_margin).toLocaleString() : "N/A"}
- Average Margin: ${summary?.avg_margin_percent?.toFixed(1) ?? "N/A"}%

## STATUS BREAKDOWN (counted from formulations table)
${Object.entries(statusCounts).map(([status, count]) => `- ${status}: ${count}`).join("\n")}

## CATEGORY BREAKDOWN
${Object.entries(categoryCounts).map(([cat, count]) => `- ${cat}: ${count}`).join("\n")}

## YEARLY FINANCIAL PROJECTIONS (from vw_chart_data_totals_by_year)
${yearly.map((y: Record<string, unknown>) => `- ${y.fiscal_year}: Revenue €${Math.round(Number(y.total_revenue_eur) || 0).toLocaleString()}, Margin €${Math.round(Number(y.total_margin_eur) || 0).toLocaleString()}`).join("\n") || "No yearly data available"}

## TOP ACTIVE INGREDIENTS (from vw_ingredient_usage, top 25 by formulation count)
${ingredients.map((i, idx) => `${idx + 1}. ${i.ingredient_name} (${i.ingredient_type}): ${i.formulation_count} formulations${i.is_eu_approved ? " [EU Approved]" : ""}`).join("\n") || "No ingredient data"}

## ACTIVE MARKETS (${countries.length} countries)
${countries.map((c) => c.country_name).join(", ") || "No countries"}

## SAMPLE FORMULATIONS (first 20 from vw_formulations_with_ingredients)
${formulations.slice(0, 20).map((f) => `- ${f.formulation_code}: ${f.formulation_name} | ${f.formulation_category} | ${f.formulation_status} | Ingredients: ${f.ingredient_names || "None listed"}`).join("\n") || "No formulations"}

=== END OF LIVE DATA ===
`;
}

const SYSTEM_PROMPT = `You are Dr Bob, the AI assistant for Life Scientific's agrochemical portfolio management system.

IMPORTANT: You have access to LIVE data from the Supabase database. The data context below shows exactly what was queried:
- vw_dashboard_summary: Pre-aggregated portfolio metrics
- vw_chart_data_totals_by_year: Financial projections by fiscal year
- vw_formulations_with_ingredients: Formulation details with ingredients
- vw_ingredient_usage: Active ingredient usage statistics
- countries: Active market list

GUIDELINES:
1. Use the EXACT numbers from the data - don't estimate or round differently
2. Currency is EUR (€) - use thousands separators (e.g., €1,234,567)
3. Be concise - use bullet points and tables
4. If data is missing or shows "N/A", say so clearly
5. When asked about something not in the data, explain what data you DO have access to

RESPONSE FORMAT:
- Use markdown formatting (headers, bold, lists)
- For comparisons, use tables when appropriate
- Start with a direct answer, then provide supporting details
- Keep responses focused and actionable`;

export async function POST(request: Request) {
  try {
    const { messages, model = "claude-haiku" } = await request.json();
    const selectedModel = MODELS[model as ModelId] || MODELS["claude-haiku"];

    // Fetch live portfolio data
    const portfolioData = await getPortfolioData();
    const dataContext = formatDataContext(portfolioData);

    const result = streamText({
      model: selectedModel,
      system: SYSTEM_PROMPT + "\n\n" + dataContext,
      messages,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Failed to process request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
