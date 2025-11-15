import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationIngredient = Database["public"]["Tables"]["formulation_ingredients"]["Row"];
type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];
type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
type StatusHistory = Database["public"]["Tables"]["formulation_status_history"]["Row"];
type ProtectionStatus = Database["public"]["Views"]["vw_patent_protection_status"]["Row"];
type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];
type IngredientUsage = Database["public"]["Views"]["vw_ingredient_usage"]["Row"];
type ActivePortfolio = Database["public"]["Views"]["vw_active_portfolio"]["Row"];
type PortfolioGaps = Database["public"]["Views"]["vw_portfolio_gaps"]["Row"];

// Enriched BusinessCase type with formulation_id and country_id
export type EnrichedBusinessCase = BusinessCase & {
  formulation_id: string | null;
  country_id: string | null;
};

export interface FormulationWithNestedData extends Formulation {
  countries_count: number;
  countries_list: string;
  use_groups_count: number;
  use_groups_list: string;
  business_cases_count: number;
  total_revenue: number;
  total_margin: number;
  cogs_count: number;
  latest_cogs: number | null;
  registration_statuses: string;
  protection_status: string;
  earliest_emd: string | null;
  latest_tme_fy: string | null;
  reference_products: string;
  crops_list: string;
  targets_list: string;
}

export async function getFormulations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_formulations_with_ingredients")
    .select("*")
    .order("formulation_code", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch formulations: ${error.message}`);
  }

  return data as Formulation[];
}

export async function getFormulationsWithNestedData(): Promise<FormulationWithNestedData[]> {
  const supabase = await createClient();
  
  // Get formulations
  const { data: formulations, error: formulationsError } = await supabase
    .from("vw_formulations_with_ingredients")
    .select("*")
    .order("formulation_code", { ascending: true });

  if (formulationsError || !formulations) {
    throw new Error(`Failed to fetch formulations: ${formulationsError?.message}`);
  }

  // Get all related data in parallel
  const [countriesResult, useGroupsResult, businessCasesResult, cogsResult, protectionResult] = await Promise.all([
    supabase.from("vw_formulation_country_detail").select("formulation_code, country_name, registration_status, emd, target_market_entry_fy, normal_crop_usage, targets_treated"),
    supabase.from("vw_formulation_country_use_group").select("formulation_code, use_group_name, use_group_variant, country_name, registration_status, reference_product_name"),
    supabase.from("vw_business_case").select("formulation_code, total_revenue, total_margin"),
    supabase.from("vw_cogs").select("formulation_code, cogs_value, fiscal_year"),
    supabase.from("vw_patent_protection_status").select("formulation_code, country_name, earliest_ingredient_patent_expiry, earliest_combination_patent_expiry, earliest_formulation_patent_expiry, earliest_blocking_launch_date"),
  ]);

  const countriesData = countriesResult.data || [];
  const useGroupsData = useGroupsResult.data || [];
  const businessCasesData = businessCasesResult.data || [];
  const cogsData = cogsResult.data || [];
  const protectionData = protectionResult.data || [];

  // Aggregate data by formulation_code
  const aggregated = new Map<string, {
    countries: Set<string>;
    countriesList: Array<{ name: string; status: string; emd: string | null; tme: string | null }>;
    useGroups: Set<string>;
    useGroupsList: Array<{ name: string; variant: string; country: string; status: string; ref: string | null }>;
    businessCases: number;
    totalRevenue: number;
    totalMargin: number;
    cogs: Array<{ value: number; year: string }>;
    protection: Array<{ country: string; patent: string | null; data: string | null }>;
    crops: Set<string>;
    targets: Set<string>;
  }>();

  // Process countries
  countriesData.forEach((item: any) => {
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
      status: item.registration_status || "",
      emd: item.emd,
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

  // Process use groups
  useGroupsData.forEach((item: any) => {
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
    const useGroupKey = `${item.use_group_variant || ""} (${item.country_name || ""})`;
    agg.useGroups.add(useGroupKey);
    agg.useGroupsList.push({
      name: item.use_group_name || item.use_group_variant || "",
      variant: item.use_group_variant || "",
      country: item.country_name || "",
      status: item.registration_status || "",
      ref: item.reference_product_name,
    });
  });

  // Process business cases
  businessCasesData.forEach((item: any) => {
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
    agg.businessCases += 1;
    agg.totalRevenue += item.total_revenue || 0;
    agg.totalMargin += item.total_margin || 0;
  });

  // Process COGS
  cogsData.forEach((item: any) => {
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
    agg.cogs.push({
      value: item.cogs_value || 0,
      year: item.fiscal_year || "",
    });
  });

  // Process protection
  protectionData.forEach((item: any) => {
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
    agg.protection.push({
      country: item.country_name || "",
      patent: item.earliest_active_patent_expiry,
      data: item.earliest_active_data_protection_expiry,
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
    const sortedCogs = [...agg.cogs].sort((a, b) => b.year.localeCompare(a.year));
    const latestCogs = sortedCogs[0]?.value || null;

    return {
      ...formulation,
      countries_count: agg.countries.size,
      countries_list: Array.from(agg.countries).join(", ") || "—",
      use_groups_count: agg.useGroups.size,
      use_groups_list: agg.useGroupsList.map((ug) => `${ug.variant} (${ug.country})`).join("; ") || "—",
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
  
  // First try to get from formulations table (for editing)
  const { data: formulationData, error: formulationError } = await supabase
    .from("formulations")
    .select("*")
    .eq("formulation_id", id)
    .single();

  if (!formulationError && formulationData) {
    return formulationData as FormulationTable;
  }

  // Fallback to view if not found in table
  const { data, error } = await supabase
    .from("vw_formulations_with_ingredients")
    .select("*")
    .eq("formulation_id", id)
    .single();

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
 * for each formulation-country-use_group-year combination
 */
function deduplicateBusinessCases(
  businessCases: BusinessCase[]
): BusinessCase[] {
  if (!businessCases || businessCases.length === 0) {
    return [];
  }

  // Group by formulation_code + country_name + use_group_variant + year_offset
  const groups = new Map<string, BusinessCase[]>();
  
  businessCases.forEach((bc) => {
    // Create a unique key for grouping
    const key = `${bc.formulation_code || ""}_${bc.country_name || ""}_${bc.use_group_variant || ""}_${bc.year_offset || ""}`;
    
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
        const aTime = a.updated_at ? new Date(a.updated_at).getTime() : (a.created_at ? new Date(a.created_at).getTime() : 0);
        const bTime = b.updated_at ? new Date(b.updated_at).getTime() : (b.created_at ? new Date(b.created_at).getTime() : 0);
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
  businessCases: BusinessCase[]
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
        .filter((id): id is string => Boolean(id))
    ),
  ];

  if (businessCaseIds.length === 0) {
    return businessCases.map((bc) => ({
      ...bc,
      formulation_id: null,
      country_id: null,
    }));
  }

  // Fetch formulation_id and country_id through junction table
  // We need to join through business_case_use_groups -> formulation_country_use_group -> formulation_country
  // Since Supabase doesn't support deep nested selects easily, we'll do it in steps
  
  // First, get the formulation_country_use_group_ids for these business cases
  const { data: junctionData } = await supabase
    .from("business_case_use_groups")
    .select("business_case_id, formulation_country_use_group_id")
    .in("business_case_id", businessCaseIds);

  if (!junctionData || junctionData.length === 0) {
    return businessCases.map((bc) => ({
      ...bc,
      formulation_id: null,
      country_id: null,
    }));
  }

  // Get unique formulation_country_use_group_ids
  const useGroupIds = [
    ...new Set(
      junctionData
        .map((j) => j.formulation_country_use_group_id)
        .filter((id): id is string => Boolean(id))
    ),
  ];

  // Get formulation_country_ids from use groups
  const { data: useGroupData } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, formulation_country_id")
    .in("formulation_country_use_group_id", useGroupIds);

  // Get unique formulation_country_ids
  const formulationCountryIds = [
    ...new Set(
      useGroupData
        ?.map((ug) => ug.formulation_country_id)
        .filter((id): id is string => Boolean(id)) || []
    ),
  ];

  // Get formulation_id and country_id from formulation_country
  const { data: countryData } = await supabase
    .from("formulation_country")
    .select("formulation_country_id, formulation_id, country_id")
    .in("formulation_country_id", formulationCountryIds);

  // Create maps for lookup
  const useGroupToFormulationCountry = new Map<string, string>();
  useGroupData?.forEach((ug) => {
    if (ug.formulation_country_use_group_id && ug.formulation_country_id) {
      useGroupToFormulationCountry.set(ug.formulation_country_use_group_id, ug.formulation_country_id);
    }
  });

  const formulationCountryToFormulationId = new Map<string, string>();
  const formulationCountryToCountryId = new Map<string, string>();
  countryData?.forEach((fc) => {
    if (fc.formulation_country_id) {
      formulationCountryToFormulationId.set(fc.formulation_country_id, fc.formulation_id);
      formulationCountryToCountryId.set(fc.formulation_country_id, fc.country_id);
    }
  });

  // Create maps for business cases (use first match for each business case)
  const businessCaseToFormulationId = new Map<string, string>();
  const businessCaseToCountryId = new Map<string, string>();
  
  junctionData.forEach((j) => {
    if (j.business_case_id && j.formulation_country_use_group_id) {
      const fcId = useGroupToFormulationCountry.get(j.formulation_country_use_group_id);
      if (fcId && !businessCaseToFormulationId.has(j.business_case_id)) {
        businessCaseToFormulationId.set(j.business_case_id, formulationCountryToFormulationId.get(fcId) || "");
        businessCaseToCountryId.set(j.business_case_id, formulationCountryToCountryId.get(fcId) || "");
      }
    }
  });

  // Enrich business cases
  return businessCases.map((bc) => ({
    ...bc,
    formulation_id: businessCaseToFormulationId.get(bc.business_case_id) || null,
    country_id: businessCaseToCountryId.get(bc.business_case_id) || null,
  }));
}

export async function getBusinessCases() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .order("fiscal_year", { ascending: false })
    .order("year_offset", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business cases: ${error.message}`);
  }

  // Deduplicate before enrichment
  const deduplicated = deduplicateBusinessCases(data || []);
  return enrichBusinessCases(deduplicated);
}

export async function getBusinessCaseById(businessCaseId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("business_case_id", businessCaseId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch business case: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const enriched = await enrichBusinessCases([data]);
  return enriched[0] || null;
}

export async function getCountries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("is_active", true)
    .order("country_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }

  return data as Country[];
}

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
    throw new Error(`Failed to fetch formulation ingredients: ${error.message}`);
  }

  return data as Array<FormulationIngredient & { ingredients: Ingredient | null }>;
}

export async function getFormulationCOGS(formulationId: string) {
  const supabase = await createClient();
  const formulation = await getFormulationById(formulationId);
  if (!formulation?.formulation_code) {
    return [];
  }

  const { data, error } = await supabase
    .from("vw_cogs")
    .select("*")
    .eq("formulation_code", formulation.formulation_code)
    .order("fiscal_year", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch COGS: ${error.message}`);
  }

  return data as COGS[];
}

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
    .order("year_offset", { ascending: true })
    .order("fiscal_year", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business cases: ${error.message}`);
  }

  // Deduplicate before enrichment
  const deduplicated = deduplicateBusinessCases(data || []);
  return enrichBusinessCases(deduplicated);
}

export async function getFormulationBusinessCasesForTree(formulationId: string) {
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
    .order("year_offset", { ascending: true })
    .order("fiscal_year", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business cases: ${error.message}`);
  }

  // Deduplicate before enrichment
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

export async function getAllUseGroups() {
  const supabase = await createClient();
  
  // Get all use groups
  const { data: useGroups, error } = await supabase
    .from("vw_formulation_country_use_group")
    .select("*")
    .order("formulation_code", { ascending: true })
    .order("country_name", { ascending: true })
    .order("use_group_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch use groups: ${error.message}`);
  }

  if (!useGroups || useGroups.length === 0) {
    return [];
  }

  // Get unique formulation_country_ids and fetch formulation_ids
  const countryIds = [...new Set(useGroups.map((ug) => ug.formulation_country_id).filter(Boolean))];
  
  const { data: countryData } = await supabase
    .from("formulation_country")
    .select("formulation_country_id, formulation_id")
    .in("formulation_country_id", countryIds);

  // Create a map for quick lookup
  const countryIdToFormulationId = new Map<string, string>();
  countryData?.forEach((fc) => {
    if (fc.formulation_country_id) {
      countryIdToFormulationId.set(fc.formulation_country_id, fc.formulation_id);
    }
  });

  // Map use groups to include formulation_id
  const useGroupsWithFormulationId = useGroups.map((useGroup) => ({
    ...useGroup,
    formulation_id: useGroup.formulation_country_id
      ? countryIdToFormulationId.get(useGroup.formulation_country_id) || null
      : null,
  }));

  return useGroupsWithFormulationId as (FormulationCountryUseGroup & { formulation_id: string | null })[];
}

export async function getCOGSList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_cogs")
    .select("*")
    .eq("status", "active")
    .order("formulation_code", { ascending: true })
    .order("fiscal_year", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch COGS: ${error.message}`);
  }

  return data as COGS[];
}

export async function getIngredientUsage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_ingredient_usage")
    .select("*")
    .order("ingredient_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch ingredient usage: ${error.message}`);
  }

  return data as IngredientUsage[];
}

// New types for projection table
export interface BusinessCaseGroupData {
  business_case_group_id: string;
  formulation_id: string;
  formulation_name: string;
  formulation_code: string | null;
  uom: string | null;
  country_id: string;
  country_name: string;
  country_code: string;
  currency_code: string;
  use_group_id: string;
  use_group_name: string | null;
  use_group_variant: string | null;
  target_market_entry: string | null; // Original target market entry fiscal year from use group (e.g., "FY20")
  effective_start_fiscal_year: string | null; // Effective start fiscal year at creation time (e.g., "FY26" if created in FY26)
  years_data: Record<string, {
    volume: number | null;
    nsp: number | null;
    cogs_per_unit: number | null;
    total_revenue: number | null;
    total_margin: number | null;
    margin_percent: number | null;
  }>;
}

export interface BusinessCaseYearData {
  business_case_id: string;
  business_case_group_id: string;
  year_offset: number;
  fiscal_year: string | null;
  volume: number | null;
  nsp: number | null;
  cogs_per_unit: number | null;
  total_revenue: number | null;
  total_cogs: number | null;
  total_margin: number | null;
  margin_percent: number | null;
  formulation_name: string | null;
  uom: string | null;
  country_name: string | null;
  currency_code: string | null;
  use_group_name: string | null;
  use_group_variant: string | null;
}

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
function getEffectiveStartYearFromStored(effectiveStartFiscalYear: string | null): number {
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
export async function getBusinessCasesForProjectionTable(): Promise<BusinessCaseGroupData[]> {
  const supabase = await createClient();
  
  // Fetch all active business cases with their relationships
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("status", "active")
    .order("formulation_name", { ascending: true })
    .order("country_name", { ascending: true })
    .order("use_group_name", { ascending: true })
    .order("year_offset", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business cases: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Fetch target_market_entry_fy for each use group
  // target_market_entry_fy is now stored at the formulation_country_use_group level
  const businessCaseIds = data.map(bc => bc.business_case_id).filter(Boolean) as string[];
  const { data: junctionData } = await supabase
    .from("business_case_use_groups")
    .select("business_case_id, formulation_country_use_group_id")
    .in("business_case_id", businessCaseIds);

  const useGroupIds = Array.from(new Set(junctionData?.map(j => j.formulation_country_use_group_id).filter(Boolean) || []));
  
  const { data: useGroupData } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, target_market_entry_fy")
    .in("formulation_country_use_group_id", useGroupIds);

  // Create map for lookup: business_case_id -> target_market_entry_fy
  const businessCaseToTargetEntry = new Map<string, string | null>();
  junctionData?.forEach((j) => {
    if (j.business_case_id && j.formulation_country_use_group_id) {
      const useGroup = useGroupData?.find(ug => ug.formulation_country_use_group_id === j.formulation_country_use_group_id);
      if (useGroup) {
        businessCaseToTargetEntry.set(j.business_case_id, useGroup.target_market_entry_fy || null);
      }
    }
  });

  // Group by business_case_group_id
  const groups = new Map<string, BusinessCaseGroupData>();
  
  data.forEach((bc) => {
    if (!bc.business_case_group_id || !bc.formulation_id || !bc.country_id) {
      return; // Skip incomplete records
    }

    const groupId = bc.business_case_group_id;
    
    if (!groups.has(groupId)) {
      // Get target_market_entry_fy for this business case (original from use group)
      const targetMarketEntry = businessCaseToTargetEntry.get(bc.business_case_id || "") || null;
      
      // Use stored effective_start_fiscal_year from database (preserves creation context)
      const effectiveStartFiscalYear = bc.effective_start_fiscal_year || null;
      const effectiveStartYear = getEffectiveStartYearFromStored(effectiveStartFiscalYear);
      
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
        target_market_entry: targetMarketEntry, // Store original target_market_entry
        effective_start_fiscal_year: effectiveStartFiscalYear, // Store effective start (preserves creation context)
        years_data: {},
      });
    }

    const group = groups.get(groupId)!;
    
    // Use stored effective_start_fiscal_year for display calculations
    // This preserves the fiscal year context when data was created
    const effectiveStartFiscalYear = group.effective_start_fiscal_year || null;
    const effectiveStartYear = getEffectiveStartYearFromStored(effectiveStartFiscalYear);
    
    // Calculate display fiscal year: effectiveStartYear + (year_offset - 1)
    // This ensures year_offset 1 maps to effectiveStartYear (e.g., FY26 if created in FY26)
    const displayFiscalYear = effectiveStartYear + ((bc.year_offset || 1) - 1);
    const displayFiscalYearStr = `FY${String(displayFiscalYear).padStart(2, "0")}`;
    
    // Always overwrite with the current year_offset's data
    // This ensures we're using the correct mapping regardless of stored fiscal_year
    group.years_data[displayFiscalYearStr] = {
      volume: bc.volume,
      nsp: bc.nsp,
      cogs_per_unit: bc.cogs_per_unit,
      total_revenue: bc.total_revenue,
      total_margin: bc.total_margin,
      margin_percent: bc.margin_percent,
    };
  });

  // Update groups with use_group_id (using formulation_country_use_group_id as identifier)
  // junctionData was already fetched above, reuse it
  const bcToUseGroup = new Map<string, string>();
  junctionData?.forEach((j) => {
    if (j.business_case_id && j.formulation_country_use_group_id) {
      bcToUseGroup.set(j.business_case_id, j.formulation_country_use_group_id);
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

  return Array.from(groups.values());
}

/**
 * Get all 10 years of data for a specific business case group
 */
export async function getBusinessCaseGroup(groupId: string): Promise<BusinessCaseYearData[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("business_case_group_id", groupId)
    .eq("status", "active")
    .order("year_offset", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch business case group: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
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
  }));
}

/**
 * Check if an active business case exists for a formulation-country-use_group combination
 * Note: use_group_id here refers to formulation_country_use_group_id
 */
export async function checkExistingBusinessCase(
  formulationId: string,
  countryId: string,
  useGroupId: string // This is actually formulation_country_use_group_id
): Promise<string | null> {
  const supabase = await createClient();
  
  // Find business cases linked to this use group
  const { data: junctionData } = await supabase
    .from("business_case_use_groups")
    .select("business_case_id")
    .eq("formulation_country_use_group_id", useGroupId)
    .limit(1);

  if (!junctionData || junctionData.length === 0) {
    return null;
  }

  // Get business_case_group_id from one of the business cases
  const { data: bcData } = await supabase
    .from("business_case")
    .select("business_case_group_id")
    .eq("business_case_id", junctionData[0].business_case_id)
    .eq("status", "active")
    .single();

  return bcData?.business_case_group_id || null;
}

/**
 * Validate that all selected use groups have the same target_market_entry_fy
 * Returns { isValid: boolean, targetEntry: string | null, error: string | null }
 */
export async function validateUseGroupTargetEntryConsistency(
  useGroupIds: string[]
): Promise<{ isValid: boolean; targetEntry: string | null; error: string | null }> {
  const supabase = await createClient();
  
  if (!useGroupIds || useGroupIds.length === 0) {
    return { isValid: false, targetEntry: null, error: "At least one use group must be selected" };
  }

  // Fetch target_market_entry_fy for all selected use groups
  const { data: useGroupData, error } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, target_market_entry_fy")
    .in("formulation_country_use_group_id", useGroupIds);

  if (error) {
    return { isValid: false, targetEntry: null, error: `Failed to fetch use groups: ${error.message}` };
  }

  if (!useGroupData || useGroupData.length === 0) {
    return { isValid: false, targetEntry: null, error: "No use groups found" };
  }

  // Get unique non-null target_market_entry_fy values
  const targetEntries = useGroupData
    .map(ug => ug.target_market_entry_fy)
    .filter((entry): entry is string => entry !== null && entry !== undefined);

  if (targetEntries.length === 0) {
    return { isValid: false, targetEntry: null, error: "Selected use groups do not have target market entry fiscal year set" };
  }

  // Check if all values are the same
  const uniqueEntries = Array.from(new Set(targetEntries));
  
  if (uniqueEntries.length > 1) {
    return {
      isValid: false,
      targetEntry: null,
      error: `All selected use groups must have the same target market entry fiscal year. Found values: ${uniqueEntries.join(", ")}`
    };
  }

  return { isValid: true, targetEntry: uniqueEntries[0], error: null };
}

export async function getRevenueProjections() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .order("fiscal_year", { ascending: false })
    .order("year_offset", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch revenue projections: ${error.message}`);
  }

  // Deduplicate before enrichment
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

  return data as (FormulationCountryDetail & { formulation_id?: string }) | null;
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
    const cropIds = data.map(fc => fc.crop_id).filter(Boolean) as string[];
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
    const targetIds = data.map(ft => ft.target_id).filter(Boolean) as string[];
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

export async function getUseGroupById(useGroupId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("vw_formulation_country_use_group")
    .select("*")
    .eq("formulation_country_use_group_id", useGroupId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch use group: ${error.message}`);
  }

  // Get formulation_id through formulation_country
  if (data && data.formulation_country_id) {
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_id")
      .eq("formulation_country_id", data.formulation_country_id)
      .single();
    
    if (fcData) {
      (data as any).formulation_id = fcData.formulation_id;
    }
  }

  return data as (FormulationCountryUseGroup & { formulation_id?: string }) | null;
}

/**
 * Get crops for a use group with critical flags
 */
export async function getUseGroupCrops(useGroupId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("formulation_country_use_group_crops")
    .select("crop_id, is_critical")
    .eq("formulation_country_use_group_id", useGroupId);

  if (error) {
    throw new Error(`Failed to fetch use group crops: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Get crop details
  const cropIds = data.map(ugc => ugc.crop_id).filter(Boolean) as string[];
  const { data: crops } = await supabase
    .from("crops")
    .select("*")
    .in("crop_id", cropIds)
    .eq("is_active", true)
    .order("crop_name");

  // Merge with is_critical flag
  return (crops || []).map(crop => {
    const useGroupCrop = data.find(ugc => ugc.crop_id === crop.crop_id);
    return {
      ...crop,
      is_critical: useGroupCrop?.is_critical || false,
    };
  });
}

/**
 * Get targets for a use group with critical flags
 */
export async function getUseGroupTargets(useGroupId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("formulation_country_use_group_targets")
    .select("target_id, is_critical")
    .eq("formulation_country_use_group_id", useGroupId);

  if (error) {
    throw new Error(`Failed to fetch use group targets: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Get target details
  const targetIds = data.map(ugt => ugt.target_id).filter(Boolean) as string[];
  const { data: targets } = await supabase
    .from("targets")
    .select("*")
    .in("target_id", targetIds)
    .eq("is_active", true)
    .order("target_name");

  // Merge with is_critical flag
  return (targets || []).map(target => {
    const useGroupTarget = data.find(ugt => ugt.target_id === target.target_id);
    return {
      ...target,
      is_critical: useGroupTarget?.is_critical || false,
    };
  });
}

/**
 * @deprecated Needs rewrite for EPPO codes system
 * Validate that use group crops are subset of formulation crops
 * This function uses legacy crops table - will be removed after EPPO migration
 */
export async function validateUseGroupCropsSubsetLegacy(
  useGroupId: string,
  cropIds: string[]
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

  const formulationCropIds = new Set(formulationCrops?.map(fc => fc.crop_id) || []);

  // Check if all cropIds are in formulation crops
  const invalidCrops = cropIds.filter(cropId => !formulationCropIds.has(cropId));
  
  if (invalidCrops.length > 0) {
    // Get crop names for error message
    const { data: invalidCropData } = await supabase
      .from("crops")
      .select("crop_name")
      .in("crop_id", invalidCrops);
    
    const invalidNames = invalidCropData?.map(c => c.crop_name).join(", ") || "unknown";
    return {
      isValid: false,
      error: `The following crops are not in the formulation's crop list: ${invalidNames}`
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
  targetIds: string[]
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

  const formulationTargetIds = new Set(formulationTargets?.map(ft => ft.target_id) || []);

  // Check if all targetIds are in formulation targets
  const invalidTargets = targetIds.filter(targetId => !formulationTargetIds.has(targetId));
  
  if (invalidTargets.length > 0) {
    // Get target names for error message
    const { data: invalidTargetData } = await supabase
      .from("targets")
      .select("target_name")
      .in("target_id", invalidTargets);
    
    const invalidNames = invalidTargetData?.map(t => t.target_name).join(", ") || "unknown";
    return {
      isValid: false,
      error: `The following targets are not in the formulation's target list: ${invalidNames}`
    };
  }

  return { isValid: true, error: null };
}

/**
 * Check if a formulation crop is used in any child use group
 */
export async function checkFormulationCropInUse(
  cropId: string,
  formulationId: string
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

  const fcIds = fcRecords.map(fc => fc.formulation_country_id);
  const { data: useGroups } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, use_group_variant")
    .in("formulation_country_id", fcIds);

  if (!useGroups || useGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupIds = useGroups.map(ug => ug.formulation_country_use_group_id);
  
  // Check if crop is used in any use group
  const { data: usedInGroups } = await supabase
    .from("formulation_country_use_group_crops")
    .select("formulation_country_use_group_id")
    .eq("crop_id", cropId)
    .in("formulation_country_use_group_id", useGroupIds);

  if (!usedInGroups || usedInGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupVariants = usedInGroups
    .map(ugc => {
      const ug = useGroups.find(u => u.formulation_country_use_group_id === ugc.formulation_country_use_group_id);
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
  formulationId: string
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

  const fcIds = fcRecords.map(fc => fc.formulation_country_id);
  const { data: useGroups } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, use_group_variant")
    .in("formulation_country_id", fcIds);

  if (!useGroups || useGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupIds = useGroups.map(ug => ug.formulation_country_use_group_id);
  
  // Check if target is used in any use group
  const { data: usedInGroups } = await supabase
    .from("formulation_country_use_group_targets")
    .select("formulation_country_use_group_id")
    .eq("target_id", targetId)
    .in("formulation_country_use_group_id", useGroupIds);

  if (!usedInGroups || usedInGroups.length === 0) {
    return { inUse: false, useGroups: [] };
  }

  const useGroupVariants = usedInGroups
    .map(ugt => {
      const ug = useGroups.find(u => u.formulation_country_use_group_id === ugt.formulation_country_use_group_id);
      return ug?.use_group_variant || null;
    })
    .filter((v): v is string => v !== null);

  return { inUse: true, useGroups: useGroupVariants };
}

export async function getActivePortfolio() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_active_portfolio")
    .select("*")
    .order("formulation_code", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch active portfolio: ${error.message}`);
  }

  return data as ActivePortfolio[];
}

export async function getPortfolioGaps() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_portfolio_gaps")
    .select("*")
    .order("country_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch portfolio gaps: ${error.message}`);
  }

  return data as PortfolioGaps[];
}

/**
 * Get all 5 years of COGS data for a specific COGS group
 */
export async function getCOGSGroup(groupId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vw_cogs")
    .select("*")
    .eq("cogs_group_id", groupId)
    .order("fiscal_year", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch COGS group: ${error.message}`);
  }

  return data as COGS[];
}

/**
 * Get COGS history (all versions) for a formulation + country
 */
export async function getFormulationCOGSHistory(
  formulationId: string,
  countryId: string | null
) {
  const supabase = await createClient();

  const query = supabase
    .from("vw_cogs")
    .select("*")
    .eq("formulation_id", formulationId)
    .order("created_at", { ascending: false })
    .order("fiscal_year", { ascending: true });

  if (countryId) {
    query.eq("formulation_country_id", countryId);
  } else {
    query.is("formulation_country_id", null);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch COGS history: ${error.message}`);
  }

  return data as COGS[];
}

/**
 * Get all active business case groups for a formulation + country
 * Used by cascade update logic
 */
export async function getBusinessCaseGroupsUsingFormulation(
  formulationId: string,
  countryId: string
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
  const uniqueGroups = new Map<string, { formulation_id: string; country_id: string }>();
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
export async function getPipelineTrackerData() {
  const supabase = await createClient();
  
  const [formulationsResult, countriesResult, useGroupsResult, businessCasesResult] = await Promise.all([
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
    throw new Error(`Failed to fetch formulations: ${formulationsResult.error.message}`);
  }
  if (countriesResult.error) {
    throw new Error(`Failed to fetch countries: ${countriesResult.error.message}`);
  }
  if (useGroupsResult.error) {
    throw new Error(`Failed to fetch use groups: ${useGroupsResult.error.message}`);
  }
  if (businessCasesResult.error) {
    throw new Error(`Failed to fetch business cases: ${businessCasesResult.error.message}`);
  }

  return {
    formulations: formulationsResult.data as Formulation[],
    countries: countriesResult.data as FormulationCountryDetail[],
    useGroups: useGroupsResult.data as FormulationCountryUseGroup[],
    businessCases: businessCasesResult.data as BusinessCase[],
  };
}




