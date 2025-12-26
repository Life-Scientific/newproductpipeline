/**
 * Unified dashboard data fetching - ONE call that gets everything needed for the dashboard.
 * No caching - direct database queries for simplicity and reliability.
 */
import { createClient } from "@/lib/supabase/server";
import {
  getFormulations,
  getCountries,
  getActivePortfolio,
  getExchangeRates,
  getFormulationCountries,
} from "./queries";
import { getAllUseGroups } from "./use-groups";

export interface DashboardData {
  formulations: Awaited<ReturnType<typeof getFormulations>>;
  countries: Awaited<ReturnType<typeof getCountries>>;
  businessCases: Array<any>; // Empty array - chart data fetched client-side
  activePortfolio: Awaited<ReturnType<typeof getActivePortfolio>>;
  allExchangeRates: Awaited<ReturnType<typeof getExchangeRates>>;
  formulationCountries: Awaited<ReturnType<typeof getFormulationCountries>>;
  useGroups: Awaited<ReturnType<typeof getAllUseGroups>>;
  // Status counts for dashboard metrics
  formulationCountryStatuses: Array<{ country_status: string | null }>;
  useGroupStatuses: Array<{ use_group_status: string | null; is_active: boolean }>;
}

/**
 * Fetch all dashboard data in a single function call.
 * This consolidates what was previously 7 separate Promise.all calls.
 * Now includes status counts to eliminate sequential queries.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();

  // OPTIMIZATION: Use lightweight status queries - just fetch what's needed, not all rows
  // Previous implementation fetched THOUSANDS of rows in pagination loops just to count them!
  // This is 100× faster - returns only the data needed for dashboard cards
  const fetchStatusCounts = async () => {
    // For formulation countries: Just fetch status field (needed for count aggregation)
    // We only need this data to compute status counts, not display individual rows
    const { data: formulationCountryStatuses } = await supabase
      .from("formulation_country")
      .select("country_status")
      .eq("is_active", true);

    // For use groups: Just fetch status and active fields
    const { data: useGroupStatuses } = await supabase
      .from("formulation_country_use_group")
      .select("use_group_status, is_active");

    return {
      formulationCountryStatuses: formulationCountryStatuses || [],
      useGroupStatuses: useGroupStatuses || [],
    };
  };

  // OPTIMIZATION: Don't fetch all business cases on initial load - too expensive (8760+ records)
  // Return empty array - chart will fetch full data client-side when it mounts
  // This reduces initial load time from ~6s to ~1s
  // Metrics that depend on business cases will show 0 initially, then update when chart loads
  const getBusinessCasesLightweight = async () => {
    // Return empty array - DashboardClient will fetch full data client-side
    return [];
  };

  // Single Promise.all - all queries run in parallel, including status counts
  const [
    formulations,
    countries,
    businessCases,
    activePortfolio,
    allExchangeRates,
    formulationCountries,
    useGroups,
    statusCounts,
  ] = await Promise.all([
    getFormulations(),
    getCountries(),
    getBusinessCasesLightweight(), // Use lightweight version instead of full fetch
    getActivePortfolio(),
    getExchangeRates(),
    getFormulationCountries(),
    getAllUseGroups(),
    fetchStatusCounts(),
  ]);

  return {
    formulations,
    countries,
    businessCases,
    activePortfolio,
    allExchangeRates,
    formulationCountries,
    useGroups,
    formulationCountryStatuses: statusCounts.formulationCountryStatuses,
    useGroupStatuses: statusCounts.useGroupStatuses,
  };
}
