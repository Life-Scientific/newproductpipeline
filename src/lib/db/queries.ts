import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationIngredient = Database["public"]["Tables"]["formulation_ingredients"]["Row"];
type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];
type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
type StatusHistory = Database["public"]["Tables"]["formulation_status_history"]["Row"];
type ProtectionStatus = Database["public"]["Views"]["vw_protection_status"]["Row"];
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
    supabase.from("vw_protection_status").select("formulation_code, country_name, earliest_active_patent_expiry, earliest_active_data_protection_expiry"),
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
 * Helper function to enrich business cases with formulation_id and country_id
 * by looking them up from the formulation_country table
 */
async function enrichBusinessCases(
  businessCases: BusinessCase[]
): Promise<EnrichedBusinessCase[]> {
  if (!businessCases || businessCases.length === 0) {
    return [];
  }

  const supabase = await createClient();
  
  // Get unique formulation_country_ids
  const countryIds = [
    ...new Set(
      businessCases
        .map((bc) => bc.formulation_country_id)
        .filter((id): id is string => Boolean(id))
    ),
  ];

  if (countryIds.length === 0) {
    return businessCases.map((bc) => ({
      ...bc,
      formulation_id: null,
      country_id: null,
    }));
  }

  // Batch fetch formulation_id and country_id for all formulation_country_ids
  const { data: countryData } = await supabase
    .from("formulation_country")
    .select("formulation_country_id, formulation_id, country_id")
    .in("formulation_country_id", countryIds);

  // Create maps for quick lookup
  const countryIdToFormulationId = new Map<string, string>();
  const countryIdToCountryId = new Map<string, string>();
  countryData?.forEach((fc) => {
    if (fc.formulation_country_id) {
      countryIdToFormulationId.set(fc.formulation_country_id, fc.formulation_id);
      countryIdToCountryId.set(fc.formulation_country_id, fc.country_id);
    }
  });

  // Enrich business cases
  return businessCases.map((bc) => ({
    ...bc,
    formulation_id: bc.formulation_country_id
      ? countryIdToFormulationId.get(bc.formulation_country_id) || null
      : null,
    country_id: bc.formulation_country_id
      ? countryIdToCountryId.get(bc.formulation_country_id) || null
      : null,
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

  return enrichBusinessCases(data || []);
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

  return enrichBusinessCases(data || []);
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

  return enrichBusinessCases(data || []);
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
    .from("vw_protection_status")
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
    .from("vw_protection_status")
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

  return enrichBusinessCases(data || []);
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








