"use server";

import { getBusinessCasesForChart, getBusinessCaseChartAggregates } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";
import type { PortfolioFilters } from "@/lib/db/progressive-queries";

/**
 * Server action to fetch business cases for chart
 * Called client-side to avoid blocking initial page load
 */
export async function fetchBusinessCasesForChartAction() {
  const data = await getBusinessCasesForChart();
  revalidatePath("/portfolio"); // Revalidate to ensure fresh data on subsequent loads
  return data;
}

/**
 * Server action to fetch business cases for chart with server-side filters
 * Optimized to only fetch filtered data instead of all 8k rows
 */
export async function fetchBusinessCasesForChartFilteredAction(
  filters: PortfolioFilters,
) {
  const { getBusinessCasesForChartFiltered } = await import("@/lib/db/queries");
  const data = await getBusinessCasesForChartFiltered(filters);
  revalidatePath("/portfolio");
  return data;
}

/**
 * Server action to fetch AGGREGATED chart data (OPTIMIZED)
 * Reduces payload from ~2-3MB to ~2KB by aggregating at database level
 * Returns pre-aggregated data grouped by fiscal year
 */
export async function fetchBusinessCaseChartAggregatesAction(
  filters?: PortfolioFilters,
) {
  const data = await getBusinessCaseChartAggregates(filters);
  revalidatePath("/portfolio");
  return data;
}
