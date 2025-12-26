import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { getBusinessCases } from "./business-cases";
import type {
  ActivePortfolio,
  Formulation,
  FormulationCountryDetail,
  FormulationCountryUseGroup,
  BusinessCase,
  EnrichedBusinessCase,
} from "./types";

/**
 * Get active portfolio
 * PERFORMANCE: Wrapped in React cache() - called on every dashboard load
 */
export const getActivePortfolio = cache(async () => {
  const supabase = await createClient();
  const { data, error: supabaseError } = await supabase
    .from("vw_active_portfolio")
    .select("*")
    .order("formulation_code", { ascending: true});

  if (supabaseError) {
    throw new Error(`Failed to fetch active portfolio: ${supabaseError.message}`);
  }

  return data as ActivePortfolio[];
});

/**
 * Get all data needed for Pipeline Tracker
 * Returns formulations, countries, use groups, and business cases for the full state management tree
 */
export async function getPipelineTrackerData() {
  const supabase = await createClient();

  const [
    formulationsResult,
    countriesResult,
    useGroupsResult,
    businessCases,
  ] = await Promise.all([
    supabase
      .from("vw_formulations_with_ingredients")
      .select("*")
      .order("formulation_code", { ascending: true }),
    supabase
      .from("vw_formulation_country_detail")
      .select("*")
      .order("formulation_code", { ascending: true })
      .order("country_name", { ascending: true }),
    supabase
      .from("vw_formulation_country_use_group")
      .select("*")
      .order("formulation_code", { ascending: true })
      .order("country_name", { ascending: true })
      .order("use_group_variant", { ascending: true }),
    // Use enriched business cases
    getBusinessCases(),
  ]);

  if (formulationsResult.error) {
    throw new Error(
      `Failed to fetch formulations: ${formulationsResult.error.message}`,
    );
  }
  if (countriesResult.error) {
    throw new Error(
      `Failed to fetch countries: ${countriesResult.error.message}`,
    );
  }
  if (useGroupsResult.error) {
    throw new Error(
      `Failed to fetch use groups: ${useGroupsResult.error.message}`,
    );
  }

  return {
    formulations: formulationsResult.data as Formulation[],
    countries: countriesResult.data as FormulationCountryDetail[],
    useGroups: useGroupsResult.data as FormulationCountryUseGroup[],
    businessCases: businessCases as EnrichedBusinessCase[],
  };
}
