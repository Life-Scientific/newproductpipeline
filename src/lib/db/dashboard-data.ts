/**
 * Unified dashboard data fetching - ONE call that gets everything needed for the dashboard.
 * No caching - direct database queries for simplicity and reliability.
 */
import { createClient } from "@/lib/supabase/server";
import {
  getFormulations,
  getCountries,
  getBusinessCasesForChart,
  getActivePortfolio,
  getExchangeRates,
  getFormulationCountries,
} from "./queries";
import { getAllUseGroups } from "./use-groups";

export interface DashboardData {
  formulations: Awaited<ReturnType<typeof getFormulations>>;
  countries: Awaited<ReturnType<typeof getCountries>>;
  businessCases: Awaited<ReturnType<typeof getBusinessCasesForChart>>;
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

  // OPTIMIZATION: Fetch status counts in parallel with other data
  // This eliminates 2 sequential paginated queries from the portfolio page
  const fetchStatusCounts = async () => {
    // Fetch formulation country statuses with pagination (parallel)
    const fetchFormulationCountryStatuses = async () => {
      let allStatuses: Array<{ country_status: string | null }> = [];
      let page = 0;
      const pageSize = 10000;
      let hasMore = true;

      while (hasMore) {
        const { data: pageData } = await supabase
          .from("formulation_country")
          .select("country_status")
          .eq("is_active", true)
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (!pageData || pageData.length === 0) {
          hasMore = false;
        } else {
          allStatuses = [...allStatuses, ...pageData];
          hasMore = pageData.length === pageSize;
          page++;
        }
      }
      return allStatuses;
    };

    // Fetch use group statuses with pagination (parallel)
    const fetchUseGroupStatuses = async () => {
      let allStatuses: Array<{ use_group_status: string | null; is_active: boolean }> = [];
      let page = 0;
      const pageSize = 10000;
      let hasMore = true;

      while (hasMore) {
        const { data: pageData } = await supabase
          .from("formulation_country_use_group")
          .select("use_group_status, is_active")
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (!pageData || pageData.length === 0) {
          hasMore = false;
        } else {
          allStatuses = [...allStatuses, ...pageData];
          hasMore = pageData.length === pageSize;
          page++;
        }
      }
      return allStatuses;
    };

    // Run both status queries in parallel
    const [formulationCountryStatuses, useGroupStatuses] = await Promise.all([
      fetchFormulationCountryStatuses(),
      fetchUseGroupStatuses(),
    ]);

    return { formulationCountryStatuses, useGroupStatuses };
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
    getBusinessCasesForChart(),
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
