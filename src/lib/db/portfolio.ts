import { createClient } from "@/lib/supabase/server";
import type {
  ActivePortfolio,
  Formulation,
  FormulationCountryDetail,
  FormulationCountryUseGroup,
  BusinessCase,
} from "./types";

export async function getActivePortfolio() {
  const supabase = await createClient();
  const { data, error: supabaseError } = await supabase
    .from("vw_active_portfolio")
    .select("*")
    .order("formulation_code", { ascending: true });

  if (supabaseError) {
    throw new Error(`Failed to fetch active portfolio: ${supabaseError.message}`);
  }

  return data as ActivePortfolio[];
}

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
    businessCasesResult,
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
    supabase
      .from("vw_business_case")
      .select("*")
      .order("formulation_code", { ascending: true })
      .order("country_name", { ascending: true })
      .order("fiscal_year", { ascending: true }),
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
  if (businessCasesResult.error) {
    throw new Error(
      `Failed to fetch business cases: ${businessCasesResult.error.message}`,
    );
  }

  return {
    formulations: formulationsResult.data as Formulation[],
    countries: countriesResult.data as FormulationCountryDetail[],
    useGroups: useGroupsResult.data as FormulationCountryUseGroup[],
    businessCases: businessCasesResult.data as BusinessCase[],
  };
}
