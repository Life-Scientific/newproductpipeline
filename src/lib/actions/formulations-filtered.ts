"use server";

import { createClient } from "@/lib/supabase/server";
import type { PortfolioFilters } from "@/hooks/use-portfolio-filters";
import type { FormulationWithNestedData } from "@/lib/db/queries";

/**
 * Get formulations with nested data, filtered by portfolio filters
 * This reduces data transfer by filtering on the server instead of client
 *
 * @param filters - Portfolio filters from URL params
 * @returns Filtered formulations with nested data
 */
export async function getFormulationsWithFilters(
  filters: PortfolioFilters,
): Promise<FormulationWithNestedData[]> {
  const supabase = await createClient();

  // Build formulation query with filters
  let formulationQuery = supabase
    .from("vw_formulations_with_ingredients")
    .select("*")
    .order("formulation_code", { ascending: true });

  // Apply formulation code filter
  if (filters.formulations && filters.formulations.length > 0) {
    formulationQuery = formulationQuery.in("formulation_code", filters.formulations);
  }

  // Apply formulation status filter
  if (filters.formulationStatuses && filters.formulationStatuses.length > 0) {
    formulationQuery = formulationQuery.in("status", filters.formulationStatuses);
  }

  // Fetch formulations
  const { data: formulations, error } = await formulationQuery;

  if (error || !formulations || formulations.length === 0) {
    return [];
  }

  // Extract formulation codes for related data
  const formulationCodes = formulations
    .map((f) => f.formulation_code)
    .filter(Boolean) as string[];

  if (formulationCodes.length === 0) {
    return [];
  }

  // Get all related data in parallel, filtered by formulation codes
  const [countries, useGroups, businessCases, cogs, protection] =
    await Promise.all([
      supabase
        .from("vw_formulation_country_detail")
        .select(
          "formulation_code, country_name, country_code, country_status, earliest_market_entry_date, target_market_entry_fy, normal_crop_usage, targets_treated",
        )
        .in("formulation_code", formulationCodes),
      supabase
        .from("vw_formulation_country_use_group")
        .select(
          "formulation_code, use_group_name, use_group_variant, country_name, reference_product_name",
        )
        .in("formulation_code", formulationCodes),
      supabase
        .from("vw_business_case")
        .select("formulation_code, total_revenue, total_margin")
        .in("formulation_code", formulationCodes),
      supabase
        .from("vw_cogs")
        .select("formulation_code, cogs_value, fiscal_year")
        .in("formulation_code", formulationCodes),
      supabase
        .from("vw_patent_protection_status")
        .select(
          "formulation_code, country_name, earliest_ingredient_patent_expiry, earliest_combination_patent_expiry, earliest_formulation_patent_expiry",
        )
        .in("formulation_code", formulationCodes),
    ]);

  const countriesResult = countries.data || [];
  const useGroupsResult = useGroups.data || [];
  const businessCasesResult = businessCases.data || [];
  const cogsResult = cogs.data || [];
  const protectionResult = protection.data || [];

  // Filter countries by country code and country status if provided
  let filteredCountries = countriesResult;
  if (filters.countries && filters.countries.length > 0) {
    filteredCountries = countriesResult.filter((item: any) =>
      filters.countries.includes(item.country_code),
    );
  }
  if (filters.countryStatuses && filters.countryStatuses.length > 0) {
    filteredCountries = filteredCountries.filter((item: any) =>
      filters.countryStatuses.includes(item.country_status || "Not yet evaluated"),
    );
  }

  // Build a set of formulation codes that match country filters
  // If country filters are active, only include formulations with matching countries
  const formulationsWithMatchingCountries = new Set<string>();
  if (filters.countries.length > 0 || filters.countryStatuses.length > 0) {
    filteredCountries.forEach((item: any) => {
      if (item.formulation_code) {
        formulationsWithMatchingCountries.add(item.formulation_code);
      }
    });
  }

  // Aggregate data by formulation_code
  const aggregated = new Map<
    string,
    {
      countries: Set<string>;
      countriesList: Array<{
        name: string;
        status: string;
        emd: string | null;
        tme: string | null;
      }>;
      useGroups: Set<string>;
      useGroupsList: Array<{
        name: string;
        variant: string;
        country: string;
        status: string;
        ref: string | null;
      }>;
      businessCases: number;
      totalRevenue: number;
      totalMargin: number;
      cogs: Array<{ value: number; year: string }>;
      protection: Array<{
        country: string;
        patent: string | null;
        data: string | null;
      }>;
      crops: Set<string>;
      targets: Set<string>;
    }
  >();

  // Process countries (use filtered countries)
  filteredCountries.forEach((item: any) => {
    if (!item.formulation_code) return;
    if (!aggregated.has(item.formulation_code)) {
      aggregated.set(item.formulation_code, {
        countries: new Set(),
        countriesList: [],
        useGroups: new Set(),
        useGroupsList: [],
        businessCases: 0,
        totalRevenue: 0,
        totalMargin: 0,
        cogs: [],
        protection: [],
        crops: new Set(),
        targets: new Set(),
      });
    }
    const agg = aggregated.get(item.formulation_code)!;
    agg.countries.add(item.country_name);
    agg.countriesList.push({
      name: item.country_name,
      status: item.country_status || "Not yet evaluated",
      emd: item.earliest_market_entry_date,
      tme: item.target_market_entry_fy,
    });
  });

  // Process use groups
  useGroupsResult.forEach((item: any) => {
    if (!item.formulation_code) return;
    if (!aggregated.has(item.formulation_code)) {
      aggregated.set(item.formulation_code, {
        countries: new Set(),
        countriesList: [],
        useGroups: new Set(),
        useGroupsList: [],
        businessCases: 0,
        totalRevenue: 0,
        totalMargin: 0,
        cogs: [],
        protection: [],
        crops: new Set(),
        targets: new Set(),
      });
    }
    const agg = aggregated.get(item.formulation_code)!;
    const useGroupKey = item.use_group_variant
      ? `${item.use_group_name} - ${item.use_group_variant}`
      : item.use_group_name;
    agg.useGroups.add(useGroupKey);
    agg.useGroupsList.push({
      name: item.use_group_name,
      variant: item.use_group_variant || "",
      country: item.country_name,
      status: "Active",
      ref: item.reference_product_name,
    });
  });

  // Process business cases
  businessCasesResult.forEach((item: any) => {
    if (!item.formulation_code) return;
    const agg = aggregated.get(item.formulation_code);
    if (agg) {
      agg.businessCases += 1;
      agg.totalRevenue += item.total_revenue || 0;
      agg.totalMargin += item.total_margin || 0;
    }
  });

  // Process COGS
  cogsResult.forEach((item: any) => {
    if (!item.formulation_code) return;
    const agg = aggregated.get(item.formulation_code);
    if (agg) {
      agg.cogs.push({
        value: item.cogs_value,
        year: item.fiscal_year,
      });
    }
  });

  // Process protection
  protectionResult.forEach((item: any) => {
    if (!item.formulation_code) return;
    const agg = aggregated.get(item.formulation_code);
    if (agg) {
      agg.protection.push({
        country: item.country_name,
        patent: item.earliest_ingredient_patent_expiry,
        data: item.earliest_combination_patent_expiry,
      });
    }
  });

  // Combine formulations with aggregated data
  const result: FormulationWithNestedData[] = formulations
    .map((formulation) => {
      const code = formulation.formulation_code;
      if (!code) return null;

      // If country filters are active, exclude formulations without matching countries
      if (
        (filters.countries.length > 0 || filters.countryStatuses.length > 0) &&
        !formulationsWithMatchingCountries.has(code)
      ) {
        return null;
      }

      const agg = aggregated.get(code);

      return {
        ...formulation,
        countries_list: agg?.countries
          ? Array.from(agg.countries).join(", ")
          : "",
        countries_count: agg?.countries.size || 0,
        countries_detail: agg?.countriesList || [],
        use_groups_list: agg?.useGroups
          ? Array.from(agg.useGroups).join(", ")
          : "",
        use_groups_count: agg?.useGroups.size || 0,
        use_groups_detail: agg?.useGroupsList || [],
        business_cases_count: agg?.businessCases || 0,
        total_revenue: agg?.totalRevenue || 0,
        total_margin: agg?.totalMargin || 0,
        cogs_data: agg?.cogs || [],
        protection_data: agg?.protection || [],
        crops_list: agg?.crops ? Array.from(agg.crops).join(", ") : "",
        targets_list: agg?.targets ? Array.from(agg.targets).join(", ") : "",
      };
    })
    .filter((f): f is FormulationWithNestedData => f !== null);

  return result;
}
