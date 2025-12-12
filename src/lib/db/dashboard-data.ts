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
}

/**
 * Fetch all dashboard data in a single function call.
 * This consolidates what was previously 7 separate Promise.all calls.
 */
export async function getDashboardData(): Promise<DashboardData> {
  // Single Promise.all - all queries run in parallel, but it's ONE function call from the page
  const [
    formulations,
    countries,
    businessCases,
    activePortfolio,
    allExchangeRates,
    formulationCountries,
    useGroups,
  ] = await Promise.all([
    getFormulations(),
    getCountries(),
    getBusinessCasesForChart(),
    getActivePortfolio(),
    getExchangeRates(),
    getFormulationCountries(),
    getAllUseGroups(),
  ]);

  return {
    formulations,
    countries,
    businessCases,
    activePortfolio,
    allExchangeRates,
    formulationCountries,
    useGroups,
  };
}
