"use server";

import { getBusinessCasesForChart } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";

/**
 * Server action to fetch business cases for chart
 * Called client-side to avoid blocking initial page load
 */
export async function fetchBusinessCasesForChartAction() {
  const data = await getBusinessCasesForChart();
  revalidatePath("/portfolio"); // Revalidate to ensure fresh data on subsequent loads
  return data;
}

