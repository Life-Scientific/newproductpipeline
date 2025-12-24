import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";

// Re-export types from types.ts
export type {
  Formulation,
  FormulationTable,
  FormulationCountryDetail,
  FormulationIngredient,
  Ingredient,
  COGS,
  BusinessCase,
  StatusHistory,
  ProtectionStatus,
  FormulationCountryUseGroup,
  Country,
  IngredientUsage,
  ActivePortfolio,
  EnrichedBusinessCase,
  FormulationWithNestedData,
} from "./types";

// Re-export interfaces (not types) separately
export type {
  BusinessCaseGroupData,
  BusinessCaseYearData,
} from "./types";

// Re-export functions from domain modules
export {
  getIngredientUsage,
  getIngredientById,
  getIngredientFormulations,
  getIngredientSuppliers,
} from "./ingredients";

export {
  getCountries,
  getCountryById,
  getCountriesWithStats,
  getCountryDetails,
  getExchangeRates,
  getLatestExchangeRate,
  type CountryWithStats,
} from "./countries";

export {
  getCOGSList,
  getFormulationCOGS,
  getCOGSGroup,
  getFormulationCOGSHistory,
} from "./cogs";

export {
  getAllUseGroups,
  getUseGroupById,
  getUseGroupCrops,
  getUseGroupTargets,
  validateUseGroupTargetEntryConsistency,
} from "./use-groups";

export {
  getActivePortfolio,
  getPipelineTrackerData,
} from "./portfolio";

// Import types for use in this file
import type {
  Formulation,
  FormulationTable,
  FormulationCountryDetail,
  FormulationIngredient,
  Ingredient,
  COGS,
  BusinessCase,
  StatusHistory,
  ProtectionStatus,
  FormulationCountryUseGroup,
  Country,
  IngredientUsage,
  ActivePortfolio,
  EnrichedBusinessCase,
  FormulationWithNestedData,
  BusinessCaseGroupData,
  BusinessCaseYearData,
} from "./types";

export async function getFormulations() {
  const supabase = await createClient();

    // Supabase limit is 10k rows - fetch all with pagination if needed
    const { count } = await supabase
      .from("vw_formulations_with_ingredients")
      .select("*", { count: "exact", head: true });

    const pageSize = 10000;
    const totalPages = Math.ceil((count || 0) / pageSize);

    let allData: any[] = [];

    for (let page = 0; page < totalPages; page++) {
      const { data: pageData, error: pageError } = await supabase
        .from("vw_formulations_with_ingredients")
        .select("*")
        .order("formulation_code", { ascending: true })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (pageError) {
        throw new Error(`Failed to fetch formulations: ${pageError.message}`);
      }

      if (pageData) {
        allData = allData.concat(pageData);
      }
    }

    return allData as Formulation[];
}

// =============================================================================
// Dashboard Optimization Queries
// These use pre-aggregated views to minimize data transfer
// =============================================================================

/**
 * Dashboard summary metrics - pre-aggregated single row result.
 * Use this instead of fetching all formulations and business cases separately.
 */
export interface DashboardSummary {
  total_formulations: number;
  selected_formulations: number;
  monitoring_formulations: number;
  development_formulations: number;
  dropped_formulations: number;
  total_business_cases: number;
  unique_business_case_groups: number;
  total_revenue: number;
  total_margin: number;
  avg_margin_percent: number;
  unique_countries: number;
  formulations_with_business_cases: number;
  active_portfolio_count: number;
}

export async function getDashboardSummary(): Promise<DashboardSummary | null> {
  const supabase = await createClient();

    const { data, error } = await supabase
      .from("vw_dashboard_summary")
      .select("*")
      .single();

    if (error) {
      console.error("Failed to fetch dashboard summary:", error.message);
      return null;
    }

    return data as DashboardSummary;
}

/**
 * Chart data aggregated by fiscal year and country.
 * Pre-includes EUR conversions using latest exchange rates.
 */
export interface ChartDataByYear {
  fiscal_year: string;
  country_id: string | null;
  country_name: string | null;
  currency_code: string | null;
  exchange_rate_to_eur: number | null;
  total_revenue: number;
  total_margin: number;
  total_cogs: number;
  avg_margin_percent: number;
  business_case_group_count: number;
  formulation_count: number;
  total_revenue_eur: number;
  total_margin_eur: number;
}

export async function getChartDataByYear(): Promise<ChartDataByYear[]> {
  const supabase = await createClient();

    const { data, error } = await supabase
      .from("vw_chart_data_by_year")
      .select("*")
      .order("fiscal_year", { ascending: true });

    if (error) {
      console.error("Failed to fetch chart data by year:", error.message);
      return [];
    }

    return (data || []) as ChartDataByYear[];
}

/**
 * Simple yearly totals for basic charts.
 * Smallest possible result set for year-over-year views.
 */
export interface ChartYearlyTotals {
  fiscal_year: string;
  total_revenue_eur: number;
  total_margin_eur: number;
  avg_margin_percent: number;
  business_case_group_count: number;
  formulation_count: number;
  country_count: number;
}

export async function getChartYearlyTotals(): Promise<ChartYearlyTotals[]> {
  const supabase = await createClient();

    const { data, error } = await supabase
      .from("vw_chart_data_totals_by_year")
      .select("*")
      .order("fiscal_year", { ascending: true });

    if (error) {
      console.error("Failed to fetch chart yearly totals:", error.message);
      return [];
    }

    return (data || []) as ChartYearlyTotals[];
}

// =============================================================================
// End Dashboard Optimization Queries
// =============================================================================

export async function getBlacklistedFormulations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("formulations")
    .select("*")
    .eq("is_active", false)
    .eq("created_by", "Blacklist Import Script")
    .order("formulation_code", { ascending: true });

  if (error) {
    throw new Error(
      `Failed to fetch blacklisted formulations: ${error.message}`,
    );
  }

  return data as FormulationTable[];
}

// Helper function to fetch all rows from a view/table with parallel pagination
async function fetchAllPaginatedFromView<T>(
  supabase: Awaited<ReturnType<typeof createClient>>,
  viewName: string,
  selectQuery: string,
  orderBy?: { column: string; ascending: boolean },
): Promise<T[]> {
  const pageSize = 10000;

  // Get count first
  const { count } = await supabase
    .from(viewName)
    .select("*", { count: "exact", head: true });

  const totalPages = Math.ceil((count || 0) / pageSize);

  // Early exit for single page results
  if (totalPages <= 1) {
    const { data, error } = await supabase
      .from(viewName)
      .select(selectQuery)
      .order(orderBy?.column ?? "id", { ascending: orderBy?.ascending ?? true });

    if (error) {
      throw new Error(`Failed to fetch ${viewName}: ${error.message}`);
    }

    return (data as T[]) || [];
  }

  // Fetch all pages in parallel using Promise.all
  const pagePromises: Promise<T[]>[] = [];

  for (let page = 0; page < totalPages; page++) {
    let query = supabase.from(viewName).select(selectQuery);

    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending });
    }

    pagePromises.push(
      query.range(page * pageSize, (page + 1) * pageSize - 1).then(({ data, error }) => {
        if (error) {
          throw new Error(`Failed to fetch ${viewName}: ${error.message}`);
        }
        return (data as T[]) || [];
      }),
    );
  }

  // Flatten all page results
  const allPages = await Promise.all(pagePromises);
  return allPages.flat();
}

export async function getFormulationsWithNestedData(
  limit?: number,
): Promise<FormulationWithNestedData[]> {
  const supabase = await createClient();

    // Get formulations with pagination (Supabase default limit is 10k)
    // If limit is provided, only fetch first N formulations for progressive loading
    const allFormulations = await fetchAllPaginatedFromView<Formulation>(
      supabase,
      "vw_formulations_with_ingredients",
      "*",
      { column: "formulation_code", ascending: true },
    );
    
    // Apply limit if provided (for progressive loading)
    const formulations = limit 
      ? allFormulations.slice(0, limit)
      : allFormulations;

    if (!formulations || formulations.length === 0) {
      return [];
    }

    // Get all related data in parallel with pagination
    const [
      countriesData,
      useGroupsData,
      businessCasesData,
      cogsData,
      protectionData,
    ] = await Promise.all([
      fetchAllPaginatedFromView<any>(
        supabase,
        "vw_formulation_country_detail",
        "formulation_code, country_name, earliest_market_entry_date, target_market_entry_fy, normal_crop_usage, targets_treated",
      ),
      fetchAllPaginatedFromView<any>(
        supabase,
        "vw_formulation_country_use_group",
        "formulation_code, use_group_name, use_group_variant, country_name, reference_product_name",
      ),
      fetchAllPaginatedFromView<any>(
        supabase,
        "vw_business_case",
        "formulation_code, total_revenue, total_margin",
      ),
      fetchAllPaginatedFromView<any>(
        supabase,
        "vw_cogs",
        "formulation_code, cogs_value, fiscal_year",
      ),
      fetchAllPaginatedFromView<any>(
        supabase,
        "vw_patent_protection_status",
        "formulation_code, country_name, earliest_ingredient_patent_expiry, earliest_combination_patent_expiry, earliest_formulation_patent_expiry",
      ),
    ]);

    // OPTIMIZATION: When limit is provided, only aggregate for formulations in the limited set
    // This significantly speeds up initial load by skipping aggregation for non-displayed formulations
    const formulationCodesSet = limit
      ? new Set(formulations.map((f) => f.formulation_code).filter(Boolean))
      : null;

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

    // Process countries (only for formulations in limited set if limit provided)
    countriesData.forEach((item: any) => {
      if (!item.formulation_code) return;
      // Skip aggregation if this formulation is not in the limited set
      if (formulationCodesSet && !formulationCodesSet.has(item.formulation_code)) {
        return;
      }
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
        status: "", // registration_status was removed from schema
        emd: item.earliest_market_entry_date,
        tme: item.target_market_entry_fy,
      });
      // Extract crops and targets from comma-separated strings
      if (item.normal_crop_usage) {
        item.normal_crop_usage.split(",").forEach((crop: string) => {
          const trimmed = crop.trim();
          if (trimmed) agg.crops.add(trimmed);
        });
      }
      if (item.targets_treated) {
        item.targets_treated.split(",").forEach((target: string) => {
          const trimmed = target.trim();
          if (trimmed) agg.targets.add(trimmed);
        });
      }
    });

    // Process use groups (only for formulations in limited set if limit provided)
    useGroupsData.forEach((item: any) => {
      if (!item.formulation_code) return;
      // Skip aggregation if this formulation is not in the limited set
      if (formulationCodesSet && !formulationCodesSet.has(item.formulation_code)) {
        return;
      }
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
      const useGroupKey = `${item.use_group_variant || ""} (${item.country_name || ""})`;
      agg.useGroups.add(useGroupKey);
      agg.useGroupsList.push({
        name: item.use_group_name || item.use_group_variant || "",
        variant: item.use_group_variant || "",
        country: item.country_name || "",
        status: "", // registration_status was removed from schema
        ref: item.reference_product_name,
      });
    });

    // Process business cases (only for formulations in limited set if limit provided)
    businessCasesData.forEach((item: any) => {
      if (!item.formulation_code) return;
      // Skip aggregation if this formulation is not in the limited set
      if (formulationCodesSet && !formulationCodesSet.has(item.formulation_code)) {
        return;
      }
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
      agg.businessCases += 1;
      agg.totalRevenue += item.total_revenue || 0;
      agg.totalMargin += item.total_margin || 0;
    });

    // Process COGS (only for formulations in limited set if limit provided)
    cogsData.forEach((item: any) => {
      if (!item.formulation_code) return;
      // Skip aggregation if this formulation is not in the limited set
      if (formulationCodesSet && !formulationCodesSet.has(item.formulation_code)) {
        return;
      }
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
      agg.cogs.push({
        value: item.cogs_value || 0,
        year: item.fiscal_year || "",
      });
    });

    // Process protection (only for formulations in limited set if limit provided)
    protectionData.forEach((item: any) => {
      if (!item.formulation_code) return;
      // Skip aggregation if this formulation is not in the limited set
      if (formulationCodesSet && !formulationCodesSet.has(item.formulation_code)) {
        return;
      }
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
      // Use earliest_ingredient_patent_expiry as the primary patent expiry (fallback to combination/formulation)
      const patentExpiry =
        item.earliest_ingredient_patent_expiry ||
        item.earliest_combination_patent_expiry ||
        item.earliest_formulation_patent_expiry;
      agg.protection.push({
        country: item.country_name || "",
        patent: patentExpiry,
        data: null, // Data protections removed from schema
      });
    });

    // Combine formulations with aggregated data
    return formulations.map((formulation) => {
      const agg = aggregated.get(formulation.formulation_code || "") || {
        countries: new Set<string>(),
        countriesList: [],
        useGroups: new Set<string>(),
        useGroupsList: [],
        businessCases: 0,
        totalRevenue: 0,
        totalMargin: 0,
        cogs: [],
        protection: [],
        crops: new Set<string>(),
        targets: new Set<string>(),
      };

      // Get unique crops and targets from aggregated data
      const referenceProducts = new Set<string>();

      agg.useGroupsList.forEach((useGroup) => {
        if (useGroup.ref) referenceProducts.add(useGroup.ref);
      });

      // Get EMD dates
      const emdDates = agg.countriesList
        .map((c) => c.emd)
        .filter(Boolean)
        .sort();
      const earliestEmd = emdDates[0] || null;

      // Get TME FYs
      const tmeFys = agg.countriesList
        .map((c) => c.tme)
        .filter(Boolean)
        .sort()
        .reverse();
      const latestTme = tmeFys[0] || null;

      // Registration statuses summary
      const statusCounts: Record<string, number> = {};
      agg.countriesList.forEach((c) => {
        if (c.status) {
          statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
        }
      });
      const registrationStatuses = Object.entries(statusCounts)
        .map(([status, count]) => `${status}:${count}`)
        .join(", ");

      // Protection status summary
      const hasProtection = agg.protection.length > 0;
      const earliestPatent = agg.protection
        .map((p) => p.patent)
        .filter(Boolean)
        .sort()[0];
      const earliestDataProt = agg.protection
        .map((p) => p.data)
        .filter(Boolean)
        .sort()[0];
      const protectionStatus = hasProtection
        ? `Patents: ${earliestPatent || "None"}, Data: ${earliestDataProt || "None"}`
        : "None";

      // Latest COGS
      const sortedCogs = [...agg.cogs].sort((a, b) =>
        b.year.localeCompare(a.year),
      );
      const latestCogs = sortedCogs[0]?.value || null;

      return {
        ...formulation,
        countries_count: agg.countries.size,
        countries_list: Array.from(agg.countries).join(", ") || "—",
        use_groups_count: agg.useGroups.size,
        use_groups_list:
          agg.useGroupsList
            .map((ug) => `${ug.variant} (${ug.country})`)
            .join("; ") || "—",
        business_cases_count: agg.businessCases,
        total_revenue: agg.totalRevenue,
        total_margin: agg.totalMargin,
        cogs_count: agg.cogs.length,
        latest_cogs: latestCogs,
        registration_statuses: registrationStatuses || "—",
        protection_status: protectionStatus,
        earliest_emd: earliestEmd,
        latest_tme_fy: latestTme,
        reference_products: Array.from(referenceProducts).join(", ") || "—",
        crops_list: Array.from(agg.crops).join(", ") || "—",
        targets_list: Array.from(agg.targets).join(", ") || "—",
      } as FormulationWithNestedData;
    });
}

export async function getFormulationById(id: string) {
  const supabase = await createClient();

  // Always try to get from formulations table first (includes inactive formulations)
  // This ensures we can view any formulation by ID, even if inactive
  const { data: formulationData, error: formulationError } = await supabase
    .from("formulations")
    .select("*")
    .eq("formulation_id", id)
    .maybeSingle();

  if (!formulationError && formulationData) {
    return formulationData as FormulationTable;
  }

  // Fallback to view if not found in table (only active formulations)
  // Use limit(1) to ensure we only get one row, then maybeSingle() to handle 0 or 1 row
  const { data, error } = await supabase
    .from("vw_formulations_with_ingredients")
    .select("*")
    .eq("formulation_id", id)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch formulation: ${error.message}`);
  }

  return data as Formulation | null;
}

export async function getFormulationCountryDetails(formulationId: string) {
  const supabase = await createClient();
  const formulation = await getFormulationById(formulationId);
  if (!formulation?.formulation_code) {
    return [];
  }

  const { data, error } = await supabase
    .from("vw_formulation_country_detail")
    .select("*")
    .eq("formulation_code", formulation.formulation_code)
    .order("country_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch country details: ${error.message}`);
  }

  return data as FormulationCountryDetail[];
}

/**
 * Helper function to deduplicate business cases by keeping the latest one
 * for each unique business case + fiscal year combination
 *
 * Each business case can have projections across multiple fiscal years,
 * so fiscal_year MUST be part of the deduplication key.
 */
function deduplicateBusinessCases(
  businessCases: BusinessCase[],
): BusinessCase[] {
  if (!businessCases || businessCases.length === 0) {
    return [];
  }

  // Group by formulation_code + country_name + use_group_variant + year_offset + fiscal_year
  // fiscal_year is critical - each year is a separate projection that must be preserved
  const groups = new Map<string, BusinessCase[]>();

  businessCases.forEach((bc) => {
    // Create a unique key for grouping - INCLUDE fiscal_year
    const key = `${bc.formulation_code || ""}_${bc.country_name || ""}_${bc.use_group_variant || ""}_${bc.year_offset || ""}_${bc.fiscal_year || ""}`;

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(bc);
  });

  // For each group, keep only the latest one (by updated_at, then created_at)
  const deduplicated: BusinessCase[] = [];

  groups.forEach((group) => {
    if (group.length === 1) {
      deduplicated.push(group[0]);
    } else {
      // Sort by updated_at (descending), then created_at (descending)
      const sorted = group.sort((a, b) => {
        const aTime = a.updated_at
          ? new Date(a.updated_at).getTime()
          : a.created_at
            ? new Date(a.created_at).getTime()
            : 0;
        const bTime = b.updated_at
          ? new Date(b.updated_at).getTime()
          : b.created_at
            ? new Date(b.created_at).getTime()
            : 0;
        return bTime - aTime; // Latest first
      });
      deduplicated.push(sorted[0]); // Keep the latest one
    }
  });

  return deduplicated;
}

/**
 * Helper function to enrich business cases with formulation_id and country_id
 * by looking them up through the junction table
 */
async function enrichBusinessCases(
  businessCases: BusinessCase[],
): Promise<EnrichedBusinessCase[]> {
  if (!businessCases || businessCases.length === 0) {
    return [];
  }

  const supabase = await createClient();

  // Get unique business_case_ids
  const businessCaseIds = [
    ...new Set(
      businessCases
        .map((bc) => bc.business_case_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  if (businessCaseIds.length === 0) {
    return businessCases.map((bc) => ({
      ...bc,
      formulation_id: null,
      country_id: null,
    }));
  }

  // Fetch formulation_id and country_id through multiple paths:
  // 1. Direct: business_case.formulation_country_id -> formulation_country
  // 2. Via use groups: business_case_use_groups -> formulation_country_use_group -> formulation_country

  // First, get direct formulation_country_ids from business cases
  const directFormulationCountryIds = [
    ...new Set(
      businessCases
        .map((bc) => bc.formulation_country_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  // Get formulation_id and country_id for direct links
  const { data: directCountryData } = await supabase
    .from("formulation_country")
    .select("formulation_country_id, formulation_id, country_id")
    .in("formulation_country_id", directFormulationCountryIds);

  // Create maps for direct links
  const directFormulationCountryToFormulationId = new Map<string, string>();
  const directFormulationCountryToCountryId = new Map<string, string>();
  directCountryData?.forEach((fc) => {
    if (fc.formulation_country_id) {
      directFormulationCountryToFormulationId.set(
        fc.formulation_country_id,
        fc.formulation_id,
      );
      directFormulationCountryToCountryId.set(
        fc.formulation_country_id,
        fc.country_id,
      );
    }
  });

  // Now handle business cases linked via use groups
  const { data: junctionData } = await supabase
    .from("business_case_use_groups")
    .select("business_case_id, formulation_country_use_group_id")
    .in("business_case_id", businessCaseIds);

  // Get unique formulation_country_use_group_ids
  const useGroupIds = [
    ...new Set(
      junctionData
        ?.map((j) => j.formulation_country_use_group_id)
        .filter((id): id is string => Boolean(id)) || [],
    ),
  ];

  // Get formulation_country_ids from use groups
  const { data: useGroupData } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, formulation_country_id")
    .in("formulation_country_use_group_id", useGroupIds);

  // Get unique formulation_country_ids from use groups
  const useGroupFormulationCountryIds = [
    ...new Set(
      useGroupData
        ?.map((ug) => ug.formulation_country_id)
        .filter((id): id is string => Boolean(id)) || [],
    ),
  ];

  // Get formulation_id and country_id for use group links (excluding ones we already have)
  const useGroupCountryIdsToFetch = useGroupFormulationCountryIds.filter(
    (id) => !directFormulationCountryIds.includes(id),
  );

  const { data: useGroupCountryData } =
    useGroupCountryIdsToFetch.length > 0
      ? await supabase
          .from("formulation_country")
          .select("formulation_country_id, formulation_id, country_id")
          .in("formulation_country_id", useGroupCountryIdsToFetch)
      : { data: null };

  // Merge country data
  const allCountryData = [
    ...(directCountryData || []),
    ...(useGroupCountryData || []),
  ];

  // Create maps for lookup
  const useGroupToFormulationCountry = new Map<string, string>();
  useGroupData?.forEach((ug) => {
    if (ug.formulation_country_use_group_id && ug.formulation_country_id) {
      useGroupToFormulationCountry.set(
        ug.formulation_country_use_group_id,
        ug.formulation_country_id,
      );
    }
  });

  const formulationCountryToFormulationId = new Map<string, string>();
  const formulationCountryToCountryId = new Map<string, string>();
  allCountryData.forEach((fc) => {
    if (fc.formulation_country_id) {
      formulationCountryToFormulationId.set(
        fc.formulation_country_id,
        fc.formulation_id,
      );
      formulationCountryToCountryId.set(
        fc.formulation_country_id,
        fc.country_id,
      );
    }
  });

  // Create maps for business cases
  const businessCaseToFormulationId = new Map<string, string>();
  const businessCaseToCountryId = new Map<string, string>();

  // First, handle direct links
  businessCases.forEach((bc) => {
    if (bc.business_case_id && bc.formulation_country_id) {
      if (!businessCaseToFormulationId.has(bc.business_case_id)) {
        businessCaseToFormulationId.set(
          bc.business_case_id,
          directFormulationCountryToFormulationId.get(
            bc.formulation_country_id,
          ) || "",
        );
        businessCaseToCountryId.set(
          bc.business_case_id,
          directFormulationCountryToCountryId.get(bc.formulation_country_id) ||
            "",
        );
      }
    }
  });

  // Then, handle use group links (only if not already set)
  junctionData?.forEach((j) => {
    if (j.business_case_id && j.formulation_country_use_group_id) {
      if (!businessCaseToFormulationId.has(j.business_case_id)) {
        const fcId = useGroupToFormulationCountry.get(
          j.formulation_country_use_group_id,
        );
        if (fcId) {
          businessCaseToFormulationId.set(
            j.business_case_id,
            formulationCountryToFormulationId.get(fcId) || "",
          );
          businessCaseToCountryId.set(
            j.business_case_id,
            formulationCountryToCountryId.get(fcId) || "",
          );
        }
      }
    }
  });

  // Enrich business cases
  return businessCases.map((bc) => ({
    ...bc,
    formulation_id: bc.business_case_id
      ? (businessCaseToFormulationId.get(bc.business_case_id) ?? null)
      : null,
    country_id: bc.business_case_id
      ? (businessCaseToCountryId.get(bc.business_case_id) ?? null)
      : null,
  }));
}

/**
 * Get business cases - fetches all active business cases with pagination
 * Note: This is NOT cached due to large payload size (>2MB)
 * For chart aggregations, use getBusinessCaseSummaryByFiscalYear instead
 */
export async function getBusinessCases() {
  const supabase = await createClient();

  // Supabase has a default limit of 10k rows - we need to fetch all
  // First get total count, then fetch in batches if needed
  const { count } = await supabase
    .from("vw_business_case")
    .select("*", { count: "exact", head: true })
    .eq("status", "active"); // Only count active business cases

  const pageSize = 10000;
  const totalPages = Math.ceil((count || 0) / pageSize);

  let allData: any[] = [];

  for (let page = 0; page < totalPages; page++) {
    const { data: pageData, error: pageError } = await supabase
      .from("vw_business_case")
      .select("*")
      .eq("status", "active") // Only show active versions, exclude superseded
      .order("fiscal_year", { ascending: true })
      .order("year_offset", { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (pageError) {
      console.error("getBusinessCases page error:", pageError);
      throw new Error(`Failed to fetch business cases: ${pageError.message}`);
    }

    if (pageData) {
      allData = allData.concat(pageData);
    }
  }

  const data = allData;

  // Deduplicate before enrichment
  const deduplicated = deduplicateBusinessCases(data || []);
  const enriched = await enrichBusinessCases(deduplicated);

  // Filter out orphaned business cases (those without formulation_code or country_name)
  // These are invalid business cases that shouldn't be returned
  const validBusinessCases = enriched.filter(
    (bc) => bc.formulation_code && bc.country_name,
  );

  return validBusinessCases;
}

/**
 * Lightweight business case data for the 10-year projection chart
 * Only fetches columns needed for chart aggregation
 * NOT cached - data is too large (>2MB) for Next.js cache limits
 */
export async function getBusinessCasesForChart() {
  const supabase = await createClient();

  const { count } = await supabase
    .from("vw_business_case")
    .select("fiscal_year", { count: "exact", head: true });

  const pageSize = 10000;
  const totalPages = Math.ceil((count || 0) / pageSize);

  let allData: any[] = [];

  for (let page = 0; page < totalPages; page++) {
    const { data: pageData, error: pageError } = await supabase
      .from("vw_business_case")
      .select(`
        business_case_id,
        business_case_group_id,
        fiscal_year,
        year_offset,
        effective_start_fiscal_year,
        total_revenue,
        total_margin,
        total_cogs,
        margin_percent,
        country_name,
        country_code,
        country_id,
        formulation_country_id,
        formulation_country_use_group_id,
        formulation_id,
        formulation_code,
        formulation_name,
        use_group_name,
        use_group_variant,
        display_name,
        business_case_name
      `)
      .eq("status", "active")
      .order("fiscal_year", { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (pageError) {
      throw new Error(
        `Failed to fetch business cases for chart: ${pageError.message}`,
      );
    }

    if (pageData) {
      allData = allData.concat(pageData);
    }
  }

  // Fetch country_status separately from formulation_country table
  // Need to handle both direct links and use group links
  const formulationCountryIds = [
    ...new Set(
      allData
        .map((bc) => bc.formulation_country_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  // Also get formulation_country_ids from use groups
  const useGroupIds = [
    ...new Set(
      allData
        .map((bc) => bc.formulation_country_use_group_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  console.log(
    `[getBusinessCasesForChart] Total business cases: ${allData.length}`,
  );
  console.log(
    `[getBusinessCasesForChart] Direct formulation_country_ids: ${formulationCountryIds.length}`,
  );
  console.log(
    `[getBusinessCasesForChart] Use group IDs to resolve: ${useGroupIds.length}`,
  );

  // Resolve use groups to formulation_country_ids
  // OPTIMIZATION: Parallelize batch processing instead of sequential loop
  let useGroupFormulationCountryIds: string[] = [];
  const useGroupToFormulationCountryMap = new Map<string, string>();
  if (useGroupIds.length > 0) {
    const batchSize = 5000;
    const batches: string[][] = [];
    for (let i = 0; i < useGroupIds.length; i += batchSize) {
      batches.push(useGroupIds.slice(i, i + batchSize));
    }

    // Fetch all batches in parallel
    const batchPromises = batches.map((batch) =>
      supabase
        .from("formulation_country_use_group")
        .select("formulation_country_use_group_id, formulation_country_id")
        .in("formulation_country_use_group_id", batch),
    );

    const batchResults = await Promise.all(batchPromises);

    // Process all results
    batchResults.forEach(({ data: ugData }) => {
      if (ugData) {
        ugData.forEach((ug) => {
          if (
            ug.formulation_country_id &&
            ug.formulation_country_use_group_id
          ) {
            useGroupToFormulationCountryMap.set(
              ug.formulation_country_use_group_id,
              ug.formulation_country_id,
            );
            useGroupFormulationCountryIds.push(ug.formulation_country_id);
          }
        });
      }
    });
  }

  // Combine all formulation_country_ids (direct + via use groups)
  const allFormulationCountryIds = [
    ...new Set([...formulationCountryIds, ...useGroupFormulationCountryIds]),
  ];

  // Fetch country_status for all formulation_country_ids
  // Load all from vw_formulation_country_detail and filter in memory
  // (The .in() query with many IDs was causing "Bad Request" errors)
  let countryStatusMap = new Map<string, string | null>();
  let countryStatusFetchFailed = false;

  console.log(
    `[getBusinessCasesForChart] Attempting to fetch country_status for ${allFormulationCountryIds.length} formulation_country_ids`,
  );

  // Create a Set for faster lookup
  const fcIdSet = new Set(allFormulationCountryIds);

  if (allFormulationCountryIds.length > 0) {
    try {
      // OPTIMIZATION: Get total count first, then parallelize pagination
      const { count: totalCount } = await supabase
        .from("vw_formulation_country_detail")
        .select("formulation_country_id", { count: "exact", head: true });

      const pageSize = 1000;
      const totalPages = Math.ceil((totalCount || 0) / pageSize);

      // Fetch all pages in parallel
      const pagePromises = Array.from({ length: totalPages }, (_, page) =>
        supabase
          .from("vw_formulation_country_detail")
          .select("formulation_country_id, country_status")
          .range(page * pageSize, (page + 1) * pageSize - 1),
      );

      const pageResults = await Promise.all(pagePromises);

      // Process all results
      for (const { data: fcData, error: fcError } of pageResults) {
        if (fcError) {
          console.error(
            `[getBusinessCasesForChart] Failed to fetch country_status from view:`,
            fcError.message,
            fcError.code,
            fcError.details,
          );
          countryStatusFetchFailed = true;
          break;
        }

        if (fcData && fcData.length > 0) {
          fcData.forEach((fc) => {
            // Only add if this ID is in our set of needed IDs
            if (
              fc.formulation_country_id &&
              fcIdSet.has(fc.formulation_country_id)
            ) {
              countryStatusMap.set(
                fc.formulation_country_id,
                fc.country_status,
              );
            }
          });
        }
      }

      console.log(
        `[getBusinessCasesForChart] Fetched ${countryStatusMap.size} country_status records (from ${totalPages} pages)`,
      );
    } catch (err) {
      console.error(
        `[getBusinessCasesForChart] Exception fetching country_status:`,
        err,
      );
      countryStatusFetchFailed = true;
    }
  }

  if (countryStatusFetchFailed) {
    console.warn(
      `[getBusinessCasesForChart] Country status fetch failed - continuing with null country_status values`,
    );
  } else {
    console.log(
      `[getBusinessCasesForChart] Successfully loaded ${countryStatusMap.size} country_status mappings`,
    );
  }

  // Enrich business cases with country_status and formulation_country_id
  // Resolve formulation_country_id for each business case (direct or via use group)
  const enrichedData = allData.map((bc) => {
    let fcId: string | null = null;

    // First try direct link
    if (bc.formulation_country_id) {
      fcId = bc.formulation_country_id;
    }
    // Otherwise try via use group
    else if (bc.formulation_country_use_group_id) {
      fcId =
        useGroupToFormulationCountryMap.get(
          bc.formulation_country_use_group_id,
        ) || null;
    }

    // Get country_status from map, handling undefined properly
    let countryStatus: string | null = null;
    if (fcId) {
      const statusFromMap = countryStatusMap.get(fcId);
      // Map.get() returns undefined if key doesn't exist, but status could also be null in DB
      // If undefined, the formulation_country_id wasn't found in our query (shouldn't happen)
      // If null, the status is actually null in the DB (should default to "Not yet evaluated" per schema)
      countryStatus = statusFromMap !== undefined ? statusFromMap : null;
    }

    return {
      ...bc,
      formulation_country_id: fcId || bc.formulation_country_id || null,
      country_status: countryStatus,
    };
  });

  // Debug: Log enrichment statistics
  const statusCounts = new Map<string, number>();
  enrichedData.forEach((bc) => {
    const status = bc.country_status || "null/undefined";
    statusCounts.set(status, (statusCounts.get(status) || 0) + 1);
  });
  console.log(
    "Country status enrichment stats:",
    Object.fromEntries(statusCounts),
  );
  console.log(
    `Total enriched: ${enrichedData.length}, Map size: ${countryStatusMap.size}, Unique FC IDs: ${allFormulationCountryIds.length}`,
  );

  // Filter orphans only
  return enrichedData.filter((bc) => bc.formulation_code && bc.country_name);
}

export async function getBusinessCaseById(id: string) {
  try {
    const supabase = await createClient();

    // First try to find by business_case_id
    let { data, error } = await supabase
      .from("vw_business_case")
      .select("*")
      .eq("business_case_id", id)
      .single();

    // If not found, try by business_case_group_id (get the first year's record)
    if (error?.code === "PGRST116" || !data) {
      const groupResult = await supabase
        .from("vw_business_case")
        .select("*")
        .eq("business_case_group_id", id)
        .order("year_offset", { ascending: true })
        .limit(1)
        .single();

      data = groupResult.data;
      error = groupResult.error;
    }

    if (error) {
      console.error("Error fetching business case:", error);
      return null;
    }

    if (!data) {
      return null;
    }

    const enriched = await enrichBusinessCases([data]);
    return enriched[0] || null;
  } catch (error) {
    console.error("Error in getBusinessCaseById:", error);
    return null;
  }
}

// Countries functions moved to ./countries.ts

export async function getFormulationIngredients(formulationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("formulation_ingredients")
    .select(`
      *,
      ingredients (
        ingredient_id,
        ingredient_name,
        ingredient_type,
        cas_number,
        supply_risk,
        is_eu_approved
      )
    `)
    .eq("formulation_id", formulationId)
    .order("ingredient_role", { ascending: true });

  if (error) {
    throw new Error(
      `Failed to fetch formulation ingredients: ${error.message}`,
    );
  }

  return data as Array<
    FormulationIngredient & { ingredients: Ingredient | null }
  >;
}

// getFormulationCOGS moved to ./cogs.ts

export async function getFormulationBusinessCases(formulationId: string) {
  const supabase = await createClient();
  const formulation = await getFormulationById(formulationId);
  if (!formulation?.formulation_code) {
    return [];
  }

  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("formulation_code", formulation.formulation_code)
    .eq("status", "active") // Only show active versions, exclude superseded
    .order("year_offset", { ascending: true })
    .order("fiscal_year", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business cases: ${error.message}`);
  }

  // Deduplicate before enrichment (handles edge cases where multiple active versions exist)
  const deduplicated = deduplicateBusinessCases(data || []);
  return enrichBusinessCases(deduplicated);
}

export async function getFormulationBusinessCasesForTree(
  formulationId: string,
) {
  const supabase = await createClient();
  const formulation = await getFormulationById(formulationId);
  if (!formulation?.formulation_code) {
    return [];
  }

  // Get all business cases for this formulation, including their country/label relationships
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("formulation_code", formulation.formulation_code)
    .eq("status", "active") // Only show active versions, exclude superseded
    .order("year_offset", { ascending: true })
    .order("fiscal_year", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business cases: ${error.message}`);
  }

  // Deduplicate before enrichment (handles edge cases where multiple active versions exist)
  const deduplicated = deduplicateBusinessCases(data || []);
  return enrichBusinessCases(deduplicated);
}

export async function getFormulationStatusHistory(formulationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("formulation_status_history")
    .select("*")
    .eq("formulation_id", formulationId)
    .order("changed_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch status history: ${error.message}`);
  }

  return data as StatusHistory[];
}

export async function getFormulationProtectionStatus(formulationId: string) {
  const supabase = await createClient();
  const formulation = await getFormulationById(formulationId);
  if (!formulation?.formulation_code) {
    return [];
  }

  const { data, error } = await supabase
    .from("vw_patent_protection_status")
    .select("*")
    .eq("formulation_code", formulation.formulation_code);

  if (error) {
    throw new Error(`Failed to fetch protection status: ${error.message}`);
  }

  return data as ProtectionStatus[];
}

export async function getAllProtectionStatus() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_patent_protection_status")
    .select("*");

  if (error) {
    throw new Error(`Failed to fetch protection status: ${error.message}`);
  }

  return data as ProtectionStatus[];
}

export async function getFormulationUseGroups(formulationId: string) {
  const supabase = await createClient();
  const formulation = await getFormulationById(formulationId);
  if (!formulation?.formulation_code) {
    return [];
  }

  const { data, error } = await supabase
    .from("vw_formulation_country_use_group")
    .select("*")
    .eq("formulation_code", formulation.formulation_code)
    .order("country_name", { ascending: true })
    .order("use_group_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch use groups: ${error.message}`);
  }

  return data as FormulationCountryUseGroup[];
}

// Use groups functions moved to ./use-groups.ts

// COGS functions moved to ./cogs.ts
// Ingredient functions moved to ./ingredients.ts

// New types for projection table
// BusinessCaseGroupData and BusinessCaseYearData are now defined in ./types.ts

/**
 * Helper function to extract year number from fiscal year string
 * @deprecated Use effective_start_fiscal_year from database instead
 * Kept for backward compatibility or fallback scenarios
 */
function getEffectiveStartFiscalYear(targetMarketEntry: string | null): number {
  if (!targetMarketEntry) {
    return CURRENT_FISCAL_YEAR;
  }

  const match = targetMarketEntry.match(/FY(\d{2})/);
  if (!match) {
    return CURRENT_FISCAL_YEAR;
  }

  const targetYear = parseInt(match[1], 10);
  return targetYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : targetYear;
}

/**
 * Helper function to extract year number from effective_start_fiscal_year string
 * Use this when you have the stored effective_start_fiscal_year from database
 */
function getEffectiveStartYearFromStored(
  effectiveStartFiscalYear: string | null,
): number {
  if (!effectiveStartFiscalYear) {
    return CURRENT_FISCAL_YEAR;
  }

  const match = effectiveStartFiscalYear.match(/FY(\d{2})/);
  if (!match) {
    return CURRENT_FISCAL_YEAR;
  }

  return parseInt(match[1], 10);
}

/**
 * Get business cases grouped by business_case_group_id for projection table display
 */
export async function getBusinessCasesForProjectionTable(
  limit?: number,
): Promise<BusinessCaseGroupData[]> {
  const supabase = await createClient();

    // Supabase has a default limit - we need to fetch all rows with pagination
    // First get total count
    const { count } = await supabase
      .from("vw_business_case")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    const pageSize = 10000;
    const totalPages = limit
      ? Math.ceil(Math.min(limit, count || 0) / pageSize) // Only fetch pages needed for limit
      : Math.ceil((count || 0) / pageSize);

    // OPTIMIZATION: Fetch all pages in parallel instead of sequentially
    const pagePromises = Array.from({ length: totalPages }, (_, page) =>
      supabase
        .from("vw_business_case")
        .select("*")
        .eq("status", "active")
        .order("formulation_name", { ascending: true })
        .order("country_name", { ascending: true })
        .order("use_group_name", { ascending: true })
        .order("year_offset", { ascending: true })
        .range(page * pageSize, (page + 1) * pageSize - 1),
    );

    const pageResults = await Promise.all(pagePromises);

    // Check for errors and combine data
    const allData: any[] = [];
    for (const result of pageResults) {
      if (result.error) {
        throw new Error(`Failed to fetch business cases: ${result.error.message}`);
      }
      if (result.data) {
        allData.push(...result.data);
      }
    }

    const data = allData;

    if (!data || data.length === 0) {
      return [];
    }

    // Fetch target_market_entry_fy for each use group
    // target_market_entry_fy is now stored at the formulation_country_use_group level
    const businessCaseIds = data
      .map((bc) => bc.business_case_id)
      .filter(Boolean) as string[];

    // OPTIMIZATION: Fetch junction data in parallel batches instead of sequentially
    const junctionBatchSize = 5000;
    const junctionBatches = [];
    for (let i = 0; i < businessCaseIds.length; i += junctionBatchSize) {
      const batch = businessCaseIds.slice(i, i + junctionBatchSize);
      junctionBatches.push(batch);
    }

    const junctionPromises = junctionBatches.map((batch) =>
      supabase
        .from("business_case_use_groups")
        .select("business_case_id, formulation_country_use_group_id")
        .in("business_case_id", batch),
    );

    const junctionResults = await Promise.all(junctionPromises);
    const junctionData: any[] = [];
    for (const result of junctionResults) {
      if (result.data) {
        junctionData.push(...result.data);
      }
    }

    const useGroupIds = Array.from(
      new Set(
        junctionData
          ?.map((j) => j.formulation_country_use_group_id)
          .filter(Boolean) || [],
      ),
    );

    const { data: useGroupData } = await supabase
      .from("formulation_country_use_group")
      .select(
        "formulation_country_use_group_id, target_market_entry_fy, use_group_status",
      )
      .in("formulation_country_use_group_id", useGroupIds);

    // Create map for lookup: business_case_id -> target_market_entry_fy and use_group_status
    const businessCaseToTargetEntry = new Map<string, string | null>();
    const businessCaseToUseGroupStatus = new Map<string, string | null>();
    junctionData?.forEach((j) => {
      if (j.business_case_id && j.formulation_country_use_group_id) {
        const useGroup = useGroupData?.find(
          (ug) =>
            ug.formulation_country_use_group_id ===
            j.formulation_country_use_group_id,
        );
        if (useGroup) {
          businessCaseToTargetEntry.set(
            j.business_case_id,
            useGroup.target_market_entry_fy || null,
          );
          businessCaseToUseGroupStatus.set(
            j.business_case_id,
            useGroup.use_group_status || null,
          );
        }
      }
    });

    // Group by business_case_group_id
    // Also track created_at for deduplication
    const groups = new Map<string, BusinessCaseGroupData>();
    const groupCreatedAt = new Map<string, string | null>(); // Track created_at per group

    data.forEach((bc) => {
      if (!bc.business_case_group_id || !bc.formulation_id || !bc.country_id) {
        return; // Skip incomplete records
      }

      const groupId = bc.business_case_group_id;

      if (!groups.has(groupId)) {
        // Get target_market_entry_fy for this business case (original from use group)
        const targetMarketEntry =
          businessCaseToTargetEntry.get(bc.business_case_id || "") || null;
        const useGroupStatus =
          businessCaseToUseGroupStatus.get(bc.business_case_id || "") || null;

        // Use stored effective_start_fiscal_year from database (preserves creation context)
        const effectiveStartFiscalYear = bc.effective_start_fiscal_year || null;
        const effectiveStartYear = getEffectiveStartYearFromStored(
          effectiveStartFiscalYear,
        );

        groups.set(groupId, {
          business_case_group_id: groupId,
          formulation_id: bc.formulation_id,
          formulation_name: bc.formulation_name || "",
          formulation_code: bc.formulation_code,
          uom: bc.uom || null,
          country_id: bc.country_id,
          country_name: bc.country_name || "",
          country_code: bc.country_code || "",
          currency_code: bc.currency_code || "USD",
          use_group_id: "", // Will populate below
          use_group_name: bc.use_group_name || null,
          use_group_variant: bc.use_group_variant || null,
          use_group_status: useGroupStatus, // Store use group status (Active/Inactive)
          target_market_entry: targetMarketEntry, // Store original target_market_entry
          effective_start_fiscal_year: effectiveStartFiscalYear, // Store effective start (preserves creation context)
          years_data: {},
          // Audit info
          updated_at: (bc as any).updated_at || (bc as any).created_at || null,
          created_by: (bc as any).created_by || null,
          change_reason: (bc as any).change_reason || null,
          change_summary: (bc as any).change_summary || null,
        });

        // Store created_at for deduplication
        groupCreatedAt.set(groupId, (bc as any).created_at || null);
      }

      const group = groups.get(groupId)!;

      // Use stored effective_start_fiscal_year for display calculations
      // This preserves the fiscal year context when data was created
      const effectiveStartFiscalYear =
        group.effective_start_fiscal_year || null;
      const effectiveStartYear = getEffectiveStartYearFromStored(
        effectiveStartFiscalYear,
      );

      // Calculate display fiscal year: effectiveStartYear + (year_offset - 1)
      // This ensures year_offset 1 maps to effectiveStartYear (e.g., FY26 if created in FY26)
      const displayFiscalYear =
        effectiveStartYear + ((bc.year_offset || 1) - 1);
      const displayFiscalYearStr = `FY${String(displayFiscalYear).padStart(2, "0")}`;

      // Always overwrite with the current year_offset's data
      // This ensures we're using the correct mapping regardless of stored fiscal_year
      // Only store data if volume and nsp are not null (null means no data for this year)
      if (bc.volume !== null && bc.nsp !== null) {
        group.years_data[displayFiscalYearStr] = {
          volume: bc.volume,
          nsp: bc.nsp,
          cogs_per_unit: bc.cogs_per_unit,
          total_revenue: bc.total_revenue,
          total_margin: bc.total_margin,
          margin_percent: bc.margin_percent,
        };
      }
    });

    // Update groups with use_group_id (using formulation_country_use_group_id as identifier)
    // junctionData was already fetched above, reuse it
    const bcToUseGroup = new Map<string, string>();
    junctionData?.forEach((j) => {
      if (j.business_case_id && j.formulation_country_use_group_id) {
        bcToUseGroup.set(
          j.business_case_id,
          j.formulation_country_use_group_id,
        );
      }
    });

    data.forEach((bc) => {
      if (bc.business_case_group_id && bc.business_case_id) {
        const group = groups.get(bc.business_case_group_id);
        if (group) {
          const useGroupId = bcToUseGroup.get(bc.business_case_id);
          if (useGroupId && !group.use_group_id) {
            group.use_group_id = useGroupId; // Use formulation_country_use_group_id as identifier
          }
        }
      }
    });

    // Deduplicate: If multiple active versions exist for the same formulation-country-use_group,
    // keep only the most recent one (by created_at, then updated_at)
    // This handles edge cases where multiple versions might still be marked as active
    const deduplicatedGroups = new Map<string, BusinessCaseGroupData>();
    const deduplicatedGroupIds = new Map<string, string>(); // Track which groupId is stored for each dedupeKey

    Array.from(groups.entries()).forEach(([groupId, group]) => {
      // Create a unique key: formulation_id + country_id + use_group_id
      const dedupeKey = `${group.formulation_id}_${group.country_id}_${group.use_group_id}`;

      if (!deduplicatedGroups.has(dedupeKey)) {
        deduplicatedGroups.set(dedupeKey, group);
        deduplicatedGroupIds.set(dedupeKey, groupId);
      } else {
        // Compare with existing group - keep the one with the most recent created_at
        const existingGroupId = deduplicatedGroupIds.get(dedupeKey)!;
        const existingCreatedAt = groupCreatedAt.get(existingGroupId);
        const newCreatedAt = groupCreatedAt.get(groupId);

        // Prefer created_at for comparison (when versions are created), fall back to updated_at
        const existingTime = existingCreatedAt
          ? new Date(existingCreatedAt).getTime()
          : deduplicatedGroups.get(dedupeKey)!.updated_at
            ? new Date(deduplicatedGroups.get(dedupeKey)!.updated_at!).getTime()
            : 0;
        const newTime = newCreatedAt
          ? new Date(newCreatedAt).getTime()
          : group.updated_at
            ? new Date(group.updated_at).getTime()
            : 0;

        // Keep the most recent one
        if (newTime > existingTime) {
          deduplicatedGroups.set(dedupeKey, group);
          deduplicatedGroupIds.set(dedupeKey, groupId);
        }
      }
    });

    return Array.from(deduplicatedGroups.values());
}

/**
 * Get all 10 years of data for a specific business case group
 */
export async function getBusinessCaseGroup(
  groupId: string,
): Promise<BusinessCaseYearData[]> {
  const supabase = await createClient();

  // Get ALL records in the group (including duplicates) to handle edge cases
  const { data: allData, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("business_case_group_id", groupId)
    .eq("status", "active")
    .order("created_at", { ascending: false }) // Most recent first
    .order("year_offset", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business case group: ${error.message}`);
  }

  if (!allData || allData.length === 0) {
    return [];
  }

  // Deduplicate: If there are multiple active records for the same year_offset,
  // keep only the most recent one (by created_at)
  const deduplicatedMap = new Map<number, typeof allData[0]>();
  for (const record of allData) {
    const yearOffset = record.year_offset || 1;
    const existing = deduplicatedMap.get(yearOffset);
    if (!existing || (record.created_at && existing.created_at && new Date(record.created_at) > new Date(existing.created_at))) {
      deduplicatedMap.set(yearOffset, record);
    }
  }

  // Convert back to array and sort by year_offset
  const data = Array.from(deduplicatedMap.values()).sort((a, b) => (a.year_offset || 1) - (b.year_offset || 1));

  // Get the formulation_country_use_group_id from junction table
  const firstBusinessCaseId = data[0]?.business_case_id;
  let useGroupId: string | null = null;

  if (firstBusinessCaseId) {
    const { data: junctionData } = await supabase
      .from("business_case_use_groups")
      .select("formulation_country_use_group_id")
      .eq("business_case_id", firstBusinessCaseId)
      .limit(1);

    useGroupId = junctionData?.[0]?.formulation_country_use_group_id || null;
  }

  return data.map((bc) => ({
    business_case_id: bc.business_case_id || "",
    business_case_group_id: bc.business_case_group_id || "",
    year_offset: bc.year_offset || 1,
    fiscal_year: bc.fiscal_year, // Calculated from effective_start_fiscal_year + year_offset
    target_market_entry_fy: bc.target_market_entry_fy || null, // Original from use group
    effective_start_fiscal_year: bc.effective_start_fiscal_year || null, // Preserves creation context
    volume: bc.volume,
    nsp: bc.nsp,
    cogs_per_unit: bc.cogs_per_unit,
    total_revenue: bc.total_revenue,
    total_cogs: bc.total_cogs,
    total_margin: bc.total_margin,
    margin_percent: bc.margin_percent,
    formulation_name: bc.formulation_name || null,
    uom: bc.uom || null,
    country_name: bc.country_name || null,
    currency_code: bc.currency_code || null,
    use_group_name: bc.use_group_name || null,
    use_group_variant: bc.use_group_variant || null,
    formulation_country_use_group_id: useGroupId, // For version history lookup
  }));
}

/**
 * Check if an active business case exists for a formulation-country-use_group combination
 * Note: use_group_id here refers to formulation_country_use_group_id
 */
export async function checkExistingBusinessCase(
  formulationId: string,
  countryId: string,
  useGroupId: string, // This is actually formulation_country_use_group_id
): Promise<string | null> {
  const supabase = await createClient();

  // Find business cases linked to this use group that are ACTIVE
  // We join with business_case to filter by status = 'active' to avoid
  // getting superseded (old version) business case IDs
  const { data: junctionData } = await supabase
    .from("business_case_use_groups")
    .select(`
      business_case_id,
      business_case!inner(business_case_group_id, status)
    `)
    .eq("formulation_country_use_group_id", useGroupId)
    .eq("business_case.status", "active")
    .limit(1);

  if (!junctionData || junctionData.length === 0) {
    return null;
  }

  // Extract business_case_group_id from the joined data
  // business_case is returned as an array by Supabase's !inner join
  const businessCaseArray = junctionData[0].business_case as
    | { business_case_group_id: string; status: string }[]
    | null;
  const businessCase = businessCaseArray?.[0];
  return businessCase?.business_case_group_id || null;
}

/**
 * Business case version history entry
 */
export interface BusinessCaseVersionHistoryEntry {
  business_case_group_id: string;
  status: string;
  created_at: string | null;
  created_by: string | null;
  updated_at: string | null;
  version_number: number;
  year_1_summary: {
    volume: number | null;
    nsp: number | null;
    total_revenue: number | null;
  };
  // Audit fields
  change_reason: string | null;
  change_summary: string | null;
  previous_group_id: string | null;
}

/**
 * Get version history for a use group's business cases
 * Returns all versions (active and inactive) sorted by creation date
 */
export async function getBusinessCaseVersionHistory(
  useGroupId: string,
): Promise<BusinessCaseVersionHistoryEntry[]> {
  const supabase = await createClient();

  // Get all business case IDs linked to this use group
  const { data: junctionData, error: junctionError } = await supabase
    .from("business_case_use_groups")
    .select("business_case_id")
    .eq("formulation_country_use_group_id", useGroupId);

  if (junctionError || !junctionData || junctionData.length === 0) {
    return [];
  }

  const businessCaseIds = junctionData.map((j) => j.business_case_id);

  // Get all business cases (both active and inactive)
  const { data: businessCases, error: bcError } = await supabase
    .from("business_case")
    .select(
      "business_case_group_id, status, created_at, created_by, updated_at, year_offset, volume, nsp, total_revenue, change_reason, change_summary, previous_group_id",
    )
    .in("business_case_id", businessCaseIds)
    .order("created_at", { ascending: false });

  if (bcError || !businessCases) {
    return [];
  }

  // Group by business_case_group_id and get summary from year 1
  const groupMap = new Map<string, BusinessCaseVersionHistoryEntry>();

  businessCases.forEach((bc) => {
    if (!bc.business_case_group_id) return;

    if (!groupMap.has(bc.business_case_group_id)) {
      groupMap.set(bc.business_case_group_id, {
        business_case_group_id: bc.business_case_group_id,
        status: bc.status || "active",
        created_at: bc.created_at,
        created_by: bc.created_by,
        updated_at: bc.updated_at,
        version_number: 0, // Will be calculated after
        year_1_summary: {
          volume: null,
          nsp: null,
          total_revenue: null,
        },
        // Audit fields (use year 1 data since these are same across all years in a group)
        change_reason: (bc as any).change_reason || null,
        change_summary: (bc as any).change_summary || null,
        previous_group_id: (bc as any).previous_group_id || null,
      });
    }

    // Use year 1 data for summary
    if (bc.year_offset === 1) {
      const entry = groupMap.get(bc.business_case_group_id)!;
      entry.year_1_summary = {
        volume: bc.volume,
        nsp: bc.nsp,
        total_revenue: bc.total_revenue,
      };
    }
  });

  // Convert to array and sort by created_at descending
  const versions = Array.from(groupMap.values()).sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });

  // Assign version numbers (newest = highest number)
  const totalVersions = versions.length;
  versions.forEach((v, index) => {
    v.version_number = totalVersions - index;
  });

  return versions;
}

/**
 * Validate that all selected use groups have the same target_market_entry_fy
 * Returns { isValid: boolean, targetEntry: string | null, error: string | null }
 */
// validateUseGroupTargetEntryConsistency moved to ./use-groups.ts

export async function getRevenueProjections() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("status", "active") // Only show active versions, exclude superseded
    .order("fiscal_year", { ascending: false })
    .order("year_offset", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch revenue projections: ${error.message}`);
  }

  // Deduplicate before enrichment (handles edge cases where multiple active versions exist)
  const deduplicated = deduplicateBusinessCases(data || []);
  return enrichBusinessCases(deduplicated);
}

export async function getFormulationCountryById(formulationCountryId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vw_formulation_country_detail")
    .select("*")
    .eq("formulation_country_id", formulationCountryId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch formulation country: ${error.message}`);
  }

  // Get formulation_id from formulation_country table
  if (data) {
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_id")
      .eq("formulation_country_id", formulationCountryId)
      .single();

    if (fcData) {
      (data as any).formulation_id = fcData.formulation_id;
    }
  }

  return data as
    | (FormulationCountryDetail & { formulation_id?: string })
    | null;
}

/**
 * @deprecated Use getFormulationCrops from eppo-codes actions instead
 * Get crops for a formulation (normal use - global superset)
 * This function uses legacy crops table - will be removed after EPPO migration
 */
export async function getFormulationCropsLegacy(formulationId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_crops")
    .select("crop_id, notes")
    .eq("formulation_id", formulationId);

  if (error) {
    throw new Error(`Failed to fetch formulation crops: ${error.message}`);
  }

  // Get crop details
  if (data && data.length > 0) {
    const cropIds = data.map((fc) => fc.crop_id).filter(Boolean) as string[];
    const { data: crops } = await supabase
      .from("crops")
      .select("*")
      .in("crop_id", cropIds)
      .eq("is_active", true)
      .order("crop_name");

    return crops || [];
  }

  return [];
}

/**
 * @deprecated Use getFormulationTargets from eppo-codes actions instead
 * Get targets for a formulation (normal use - global superset)
 * This function uses legacy targets table - will be removed after EPPO migration
 */
export async function getFormulationTargetsLegacy(formulationId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_targets")
    .select("target_id, notes")
    .eq("formulation_id", formulationId);

  if (error) {
    throw new Error(`Failed to fetch formulation targets: ${error.message}`);
  }

  // Get target details
  if (data && data.length > 0) {
    const targetIds = data
      .map((ft) => ft.target_id)
      .filter(Boolean) as string[];
    const { data: targets } = await supabase
      .from("targets")
      .select("*")
      .in("target_id", targetIds)
      .eq("is_active", true)
      .order("target_name");

    return targets || [];
  }

  return [];
}

// Use group functions moved to ./use-groups.ts

/**
 * @deprecated Needs rewrite for EPPO codes system
 * Validate that use group crops are subset of formulation crops
 * This function uses legacy crops table - will be removed after EPPO migration
 */
export async function validateUseGroupCropsSubsetLegacy(
  useGroupId: string,
  cropIds: string[],
): Promise<{ isValid: boolean; error: string | null }> {
  const supabase = await createClient();

  // Get formulation_id from use group
  const { data: useGroup } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_id")
    .eq("formulation_country_use_group_id", useGroupId)
    .single();

  if (!useGroup) {
    return { isValid: false, error: "Use group not found" };
  }

  const { data: fcData } = await supabase
    .from("formulation_country")
    .select("formulation_id")
    .eq("formulation_country_id", useGroup.formulation_country_id)
    .single();

  if (!fcData) {
    return { isValid: false, error: "Formulation country not found" };
  }

  // Get formulation crops
  const { data: formulationCrops } = await supabase
    .from("formulation_crops")
    .select("crop_id")
    .eq("formulation_id", fcData.formulation_id);

  const formulationCropIds = new Set(
    formulationCrops?.map((fc) => fc.crop_id) || [],
  );

  // Check if all cropIds are in formulation crops
  const invalidCrops = cropIds.filter(
    (cropId) => !formulationCropIds.has(cropId),
  );

  if (invalidCrops.length > 0) {
    // Get crop names for error message
    const { data: invalidCropData } = await supabase
      .from("crops")
      .select("crop_name")
      .in("crop_id", invalidCrops);

    const invalidNames =
      invalidCropData?.map((c) => c.crop_name).join(", ") || "unknown";
    return {
      isValid: false,
      error: `The following crops are not in the formulation's crop list: ${invalidNames}`,
    };
  }

  return { isValid: true, error: null };
}

/**
 * @deprecated Needs rewrite for EPPO codes system
 * Validate that use group targets are subset of formulation targets
 * This function uses legacy targets table - will be removed after EPPO migration
 */
export async function validateUseGroupTargetsSubsetLegacy(
  useGroupId: string,
  targetIds: string[],
): Promise<{ isValid: boolean; error: string | null }> {
  const supabase = await createClient();

  // Get formulation_id from use group
  const { data: useGroup } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_id")
    .eq("formulation_country_use_group_id", useGroupId)
    .single();

  if (!useGroup) {
    return { isValid: false, error: "Use group not found" };
  }

  const { data: fcData } = await supabase
    .from("formulation_country")
    .select("formulation_id")
    .eq("formulation_country_id", useGroup.formulation_country_id)
    .single();

  if (!fcData) {
    return { isValid: false, error: "Formulation country not found" };
  }

  // Get formulation targets
  const { data: formulationTargets } = await supabase
    .from("formulation_targets")
    .select("target_id")
    .eq("formulation_id", fcData.formulation_id);

  const formulationTargetIds = new Set(
    formulationTargets?.map((ft) => ft.target_id) || [],
  );

  // Check if all targetIds are in formulation targets
  const invalidTargets = targetIds.filter(
    (targetId) => !formulationTargetIds.has(targetId),
  );

  if (invalidTargets.length > 0) {
    // Get target names for error message
    const { data: invalidTargetData } = await supabase
      .from("targets")
      .select("target_name")
      .in("target_id", invalidTargets);

    const invalidNames =
      invalidTargetData?.map((t) => t.target_name).join(", ") || "unknown";
    return {
      isValid: false,
      error: `The following targets are not in the formulation's target list: ${invalidNames}`,
    };
  }

  return { isValid: true, error: null };
}

/**
 * Check if a formulation crop is used in any child use group
 */
export async function checkFormulationCropInUse(
  cropId: string,
  formulationId: string,
): Promise<{ inUse: boolean; useGroups: string[] }> {
  const supabase = await createClient();

  // Get all use groups for this formulation
  // First get all formulation_country_ids for this formulation
  const { data: fcRecords } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId);

  if (!fcRecords || fcRecords.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const fcIds = fcRecords.map((fc) => fc.formulation_country_id);
  const { data: useGroups } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, use_group_variant")
    .in("formulation_country_id", fcIds);

  if (!useGroups || useGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupIds = useGroups.map(
    (ug) => ug.formulation_country_use_group_id,
  );

  // Check if crop is used in any use group (using EPPO codes)
  const { data: usedInGroups } = await supabase
    .from("formulation_country_use_group_eppo_crops")
    .select("formulation_country_use_group_id")
    .eq("eppo_code_id", cropId)
    .in("formulation_country_use_group_id", useGroupIds);

  if (!usedInGroups || usedInGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupVariants = usedInGroups
    .map((ugc) => {
      const ug = useGroups.find(
        (u) =>
          u.formulation_country_use_group_id ===
          ugc.formulation_country_use_group_id,
      );
      return ug?.use_group_variant || null;
    })
    .filter((v): v is string => v !== null);

  return { inUse: true, useGroups: useGroupVariants };
}

/**
 * Check if a formulation target is used in any child use group
 */
export async function checkFormulationTargetInUse(
  targetId: string,
  formulationId: string,
): Promise<{ inUse: boolean; useGroups: string[] }> {
  const supabase = await createClient();

  // Get all use groups for this formulation
  // First get all formulation_country_ids for this formulation
  const { data: fcRecords } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId);

  if (!fcRecords || fcRecords.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const fcIds = fcRecords.map((fc) => fc.formulation_country_id);
  const { data: useGroups } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, use_group_variant")
    .in("formulation_country_id", fcIds);

  if (!useGroups || useGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupIds = useGroups.map(
    (ug) => ug.formulation_country_use_group_id,
  );

  // Check if target is used in any use group (using EPPO codes)
  const { data: usedInGroups } = await supabase
    .from("formulation_country_use_group_eppo_targets")
    .select("formulation_country_use_group_id")
    .eq("eppo_code_id", targetId)
    .in("formulation_country_use_group_id", useGroupIds);

  if (!usedInGroups || usedInGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupVariants = usedInGroups
    .map((ugt) => {
      const ug = useGroups.find(
        (u) =>
          u.formulation_country_use_group_id ===
          ugt.formulation_country_use_group_id,
      );
      return ug?.use_group_variant || null;
    })
    .filter((v): v is string => v !== null);

  return { inUse: true, useGroups: useGroupVariants };
}

// Portfolio functions moved to ./portfolio.ts

/**
 * Get all 5 years of COGS data for a specific COGS group
 */
// COGS group functions moved to ./cogs.ts

/**
 * Get all active business case groups for a formulation + country
 * Used by cascade update logic
 */
export async function getBusinessCaseGroupsUsingFormulation(
  formulationId: string,
  countryId: string,
) {
  const supabase = await createClient();

  // Get formulation code first
  const { data: formulation } = await supabase
    .from("formulations")
    .select("formulation_code")
    .eq("formulation_id", formulationId)
    .single();

  if (!formulation) {
    return [];
  }

  // Get country code
  const { data: country } = await supabase
    .from("countries")
    .select("country_code")
    .eq("country_id", countryId)
    .single();

  if (!country) {
    return [];
  }

  // Get business cases for this formulation + country
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("business_case_group_id, formulation_id, country_id")
    .eq("formulation_code", formulation.formulation_code)
    .eq("country_code", country.country_code)
    .eq("status", "active");

  if (error) {
    throw new Error(`Failed to fetch business case groups: ${error.message}`);
  }

  // Get unique group IDs
  const uniqueGroups = new Map<
    string,
    { formulation_id: string; country_id: string }
  >();
  data?.forEach((bc) => {
    if (bc.business_case_group_id && bc.formulation_id && bc.country_id) {
      uniqueGroups.set(bc.business_case_group_id, {
        formulation_id: bc.formulation_id,
        country_id: bc.country_id,
      });
    }
  });

  return Array.from(uniqueGroups.entries()).map(([groupId, ids]) => ({
    business_case_group_id: groupId,
    formulation_id: ids.formulation_id,
    country_id: ids.country_id,
  }));
}

/**
 * Get all formulation-country combinations
 * Used for Countries page
 */
export async function getFormulationCountries() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vw_formulation_country_detail")
    .select("*")
    .order("formulation_code", { ascending: true })
    .order("country_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch formulation countries: ${error.message}`);
  }

  return data as FormulationCountryDetail[];
}

/**
 * Get all data needed for Pipeline Tracker
 * Returns formulations, countries, use groups, and business cases for the full state management tree
 */
// getPipelineTrackerData moved to ./portfolio.ts
