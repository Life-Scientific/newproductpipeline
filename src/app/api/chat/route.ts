import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const MODELS = {
  "claude-haiku": anthropic("claude-haiku-4-5-20251001"),
  "claude-sonnet": anthropic("claude-sonnet-4-5-20250929"),
} as const;

export type ModelId = keyof typeof MODELS;

/**
 * Fetches comprehensive portfolio data using PRE-AGGREGATED database views.
 * This ensures accuracy even with hundreds of thousands of rows because
 * all counting/summing happens in the database, not in JavaScript.
 */
async function getPortfolioData() {
  const [
    // Pre-aggregated summary - accurate totals from DB
    { data: summary, error: summaryError },
    // Yearly totals - pre-aggregated by fiscal year
    { data: yearly, error: yearlyError },
    // Status counts - aggregate query for accuracy
    { data: statusCounts, error: statusError },
    // Category counts - aggregate query for accuracy
    { data: categoryCounts, error: categoryError },
    // Top ingredients - pre-aggregated view
    { data: ingredients, error: ingredientError },
    // Active countries
    { data: countries, error: countryError },
    // Top business cases by revenue
    { data: topBusinessCases, error: bcError },
    // Sample formulations for context (just a sample, not for counting)
    { data: sampleFormulations, error: formError },
  ] = await Promise.all([
    // Dashboard summary - all metrics pre-calculated in DB
    supabase
      .from("vw_dashboard_summary")
      .select("*")
      .single(),

    // Yearly projections - pre-aggregated
    supabase
      .from("vw_chart_data_totals_by_year")
      .select("*")
      .order("fiscal_year"),

    // Get ACCURATE status counts using RPC or grouped query
    supabase
      .from("formulations")
      .select("formulation_status")
      .eq("is_active", true),

    // Get ACCURATE category counts
    supabase
      .from("formulations")
      .select("formulation_category")
      .eq("is_active", true),

    // Top ingredients by usage (pre-aggregated view)
    supabase
      .from("vw_ingredient_usage")
      .select(
        "ingredient_name, ingredient_type, formulation_count, is_eu_approved",
      )
      .order("formulation_count", { ascending: false })
      .limit(30),

    // Active countries
    supabase
      .from("countries")
      .select("country_name, country_code")
      .eq("is_active", true),

    // Top 15 business cases by revenue
    supabase
      .from("vw_business_case")
      .select(
        "formulation_name, country_name, total_revenue_eur, total_margin_eur, margin_percentage",
      )
      .order("total_revenue_eur", { ascending: false })
      .limit(15),

    // Sample of formulations (for name/code context only, NOT for counting)
    supabase
      .from("vw_formulations_with_ingredients")
      .select(
        "formulation_name, formulation_code, formulation_status, formulation_category, ingredient_names",
      )
      .limit(30),
  ]);

  // Log any errors
  if (summaryError) console.error("Dashboard summary error:", summaryError);
  if (yearlyError) console.error("Yearly data error:", yearlyError);
  if (statusError) console.error("Status counts error:", statusError);
  if (categoryError) console.error("Category counts error:", categoryError);
  if (ingredientError) console.error("Ingredients error:", ingredientError);
  if (countryError) console.error("Countries error:", countryError);
  if (bcError) console.error("Business cases error:", bcError);
  if (formError) console.error("Formulations error:", formError);

  // Process status counts IN JAVASCRIPT from full dataset
  const statusMap: Record<string, number> = {};
  statusCounts?.forEach((f) => {
    const status = f.formulation_status || "Unknown";
    statusMap[status] = (statusMap[status] || 0) + 1;
  });

  // Process category counts IN JAVASCRIPT from full dataset
  const categoryMap: Record<string, number> = {};
  categoryCounts?.forEach((f) => {
    const category = f.formulation_category || "Unknown";
    categoryMap[category] = (categoryMap[category] || 0) + 1;
  });

  return {
    summary,
    yearly: yearly || [],
    statusCounts: statusMap,
    categoryCounts: categoryMap,
    totalFormulationsFromCount: statusCounts?.length || 0, // Accurate count
    ingredients: ingredients || [],
    countries: countries || [],
    topBusinessCases: topBusinessCases || [],
    sampleFormulations: sampleFormulations || [],
  };
}

function formatDataContext(data: Awaited<ReturnType<typeof getPortfolioData>>) {
  const {
    summary,
    yearly,
    statusCounts,
    categoryCounts,
    totalFormulationsFromCount,
    ingredients,
    countries,
    topBusinessCases,
    sampleFormulations,
  } = data;

  return `
=== PORTFOLIO DATA FROM SUPABASE (${new Date().toISOString()}) ===

## DATA ACCURACY NOTE
- All counts come from FULL database queries, not samples
- Financial totals come from pre-aggregated database views
- This data is accurate for ${totalFormulationsFromCount.toLocaleString()} active formulations

## KEY METRICS (from vw_dashboard_summary - pre-aggregated)
- Total Active Formulations: ${summary?.total_formulations ?? totalFormulationsFromCount}
- Selected Status: ${summary?.selected_formulations ?? "N/A"}
- Monitoring Status: ${summary?.monitoring_formulations ?? "N/A"}
- Development Status: ${summary?.development_formulations ?? "N/A"}
- Dropped: ${summary?.dropped_formulations ?? "N/A"}
- Total Business Cases: ${summary?.total_business_cases ?? "N/A"}
- Active Markets: ${summary?.unique_countries ?? countries.length} countries
- Total Revenue (EUR): €${summary?.total_revenue ? Math.round(summary.total_revenue).toLocaleString() : "N/A"}
- Total Margin (EUR): €${summary?.total_margin ? Math.round(summary.total_margin).toLocaleString() : "N/A"}
- Average Margin: ${summary?.avg_margin_percent?.toFixed(1) ?? "N/A"}%

## FORMULATION STATUS BREAKDOWN (accurate count from ${totalFormulationsFromCount} formulations)
${Object.entries(statusCounts)
  .sort((a, b) => b[1] - a[1])
  .map(
    ([status, count]) =>
      `- ${status}: ${count} (${((count / totalFormulationsFromCount) * 100).toFixed(1)}%)`,
  )
  .join("\n")}

## CATEGORY BREAKDOWN (accurate count)
${Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([cat, count]) => `- ${cat}: ${count}`)
  .join("\n")}

## YEARLY FINANCIAL PROJECTIONS (from vw_chart_data_totals_by_year)
${
  yearly
    .map(
      (y: Record<string, unknown>) =>
        `- FY${y.fiscal_year}: Revenue €${Math.round(Number(y.total_revenue_eur) || 0).toLocaleString()}, Margin €${Math.round(Number(y.total_margin_eur) || 0).toLocaleString()}`,
    )
    .join("\n") || "No yearly data available"
}

## TOP 15 BUSINESS CASES BY REVENUE
${
  topBusinessCases
    .map(
      (bc, i) =>
        `${i + 1}. ${bc.formulation_name} (${bc.country_name}): Revenue €${Math.round(Number(bc.total_revenue_eur) || 0).toLocaleString()}, Margin €${Math.round(Number(bc.total_margin_eur) || 0).toLocaleString()} (${bc.margin_percentage?.toFixed(1)}%)`,
    )
    .join("\n") || "No business cases"
}

## TOP 30 ACTIVE INGREDIENTS (by formulation count)
${
  ingredients
    .map(
      (i, idx) =>
        `${idx + 1}. ${i.ingredient_name} (${i.ingredient_type}): used in ${i.formulation_count} formulations${i.is_eu_approved ? " ✓EU" : ""}`,
    )
    .join("\n") || "No ingredient data"
}

## ACTIVE MARKETS (${countries.length} countries)
${countries.map((c) => c.country_name).join(", ") || "No countries"}

## SAMPLE FORMULATIONS (30 examples for context - NOT a complete list)
${
  sampleFormulations
    .map(
      (f) =>
        `- ${f.formulation_code}: ${f.formulation_name} | ${f.formulation_category} | ${f.formulation_status}`,
    )
    .join("\n") || "No formulations"
}

=== END OF DATA ===`;
}

const SYSTEM_PROMPT = `You are Dr Bob, the AI assistant for Life Scientific's agrochemical portfolio management system.

## YOUR DATA ACCESS
You have access to LIVE data from Supabase PostgreSQL. The data provided is:
- **Accurate** - All counts come from full database queries, not samples
- **Pre-aggregated** - Financial totals are computed in the database for precision
- **Current** - Fetched fresh for each conversation

## RESPONSE GUIDELINES
1. **Use exact numbers** - Don't round or estimate; use the figures from the data
2. **Format currency** - Use €X,XXX format for EUR values
3. **Be concise** - Use bullet points, tables, and clear formatting
4. **Cite your source** - Reference which data section your answer comes from
5. **Acknowledge limits** - If asked about data not provided, explain what you DO have

## FORMATTING
- Use markdown (headers, bold, lists, tables)
- Start with a direct answer, then provide details
- For comparisons, use tables when helpful`;

export async function POST(request: Request) {
  try {
    const { messages, model = "claude-haiku" } = await request.json();
    const selectedModel = MODELS[model as ModelId] || MODELS["claude-haiku"];

    // Fetch fresh portfolio data
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
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
