import type { Database } from "@/lib/supabase/database.types";

export type Formulation =
  Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

export interface BusinessCase {
  total_revenue: number | null;
  total_margin: number | null;
  fiscal_year: string;
}

export interface Ingredient {
  ingredients: {
    ingredient_name: string;
    ingredient_type: string;
  } | null;
  quantity: number | null;
  quantity_unit: string | null;
}

export interface Country {
  country_name: string | null;
  registration_status: string;
  earliest_market_entry_date: string | null;
  target_market_entry_fy: string | null;
  is_eu_approved_formulation: boolean | null;
  is_novel: boolean | null;
  likely_registration_pathway: string | null;
}

export interface UseGroup {
  reference_product_name: string | null;
  crops: string[];
}

export interface COGS {
  fiscal_year: string;
  cogs_value: number | null;
}

export interface ProtectionStatus {
  earliest_active_patent_expiry: string | null;
  earliest_formulation_patent_expiry: string | null;
}

export interface StatusHistory {
  changed_at: string | null;
}

export interface ComparisonData {
  formulation: Formulation;
  businessCases: BusinessCase[];
  ingredients: Ingredient[];
  countries: Country[];
  useGroups: UseGroup[];
  cogs: COGS[];
  protectionStatus: ProtectionStatus[];
  statusHistory: StatusHistory[];
}

export interface FormulationMetrics {
  totalRevenue: number;
  totalMargin: number;
  avgMarginPercent: number;
  latestCOGS: number | null;
  earliestEMD: Date | null;
  earliestTME: string | null;
  earliestProtectionExpiry: Date | null;
  activeIngredients: Array<{ name: string; quantity: number; unit: string }>;
  referenceProducts: string[];
  approvedCountries: number;
  countriesList: string[];
  registrationPathways: string[];
  euApprovedCount: number;
  novelCount: number;
  cropsList: string[];
  businessCaseYears: Record<
    string,
    { revenue: number; margin: number; count: number }
  >;
  statusChangeDate: Date | null;
}

export const MAX_COMPARISONS = 5;

export function calculateMetrics(
  comparisonData: ComparisonData,
): FormulationMetrics {
  const {
    businessCases,
    countries,
    protectionStatus,
    ingredients,
    useGroups,
    cogs,
    statusHistory,
  } = comparisonData;

  const totalRevenue = businessCases.reduce(
    (sum, bc) => sum + (bc.total_revenue || 0),
    0,
  );

  const totalMargin = businessCases.reduce(
    (sum, bc) => sum + (bc.total_margin || 0),
    0,
  );

  const avgMarginPercent =
    totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

  const sortedCOGS = [...cogs].sort((a, b) => {
    const yearA = parseInt(a.fiscal_year?.replace("FY", "") || "0");
    const yearB = parseInt(b.fiscal_year?.replace("FY", "") || "0");
    return yearB - yearA;
  });
  const latestCOGS = sortedCOGS[0]?.cogs_value || null;

  const emds = countries
    .map((c) => c.earliest_market_entry_date)
    .filter(Boolean)
    .map((emd) => new Date(emd!))
    .sort((a, b) => a.getTime() - b.getTime());
  const earliestEMD = emds.length > 0 ? emds[0] : null;

  const tmes = countries
    .map((c) => c.target_market_entry_fy)
    .filter(Boolean)
    .sort();
  const earliestTME = tmes.length > 0 ? tmes[0] : null;

  const expiries = protectionStatus
    .flatMap((ps) => [
      ps.earliest_active_patent_expiry,
      ps.earliest_formulation_patent_expiry,
    ])
    .filter(Boolean)
    .map((exp) => new Date(exp!))
    .sort((a, b) => a.getTime() - b.getTime());
  const earliestProtectionExpiry = expiries.length > 0 ? expiries[0] : null;

  const activeIngredients = ingredients
    .filter((ing) => ing.ingredients?.ingredient_type === "Active")
    .map((ing) => ({
      name: ing.ingredients?.ingredient_name || "Unknown",
      quantity: ing.quantity || 0,
      unit: ing.quantity_unit || "",
    }));

  const referenceProducts = Array.from(
    new Set(
      useGroups
        .map((ug) => ug.reference_product_name)
        .filter(Boolean) as string[],
    ),
  );

  const approvedCountries = countries.filter(
    (c) => c.registration_status === "Approved",
  ).length;

  const countriesList = countries
    .map((c) => c.country_name)
    .filter(Boolean) as string[];

  const registrationPathways = Array.from(
    new Set(
      countries
        .map((c) => c.likely_registration_pathway)
        .filter(Boolean) as string[],
    ),
  );

  const euApprovedCount = countries.filter(
    (c) => c.is_eu_approved_formulation === true,
  ).length;

  const novelCount = countries.filter((c) => c.is_novel === true).length;

  const cropsSet = new Set<string>();
  useGroups.forEach((useGroup) => {
    if (useGroup.crops && Array.isArray(useGroup.crops)) {
      useGroup.crops.forEach((crop) => {
        if (crop) cropsSet.add(crop);
      });
    }
  });
  const cropsList = Array.from(cropsSet).sort();

  const businessCaseYears: Record<
    string,
    { revenue: number; margin: number; count: number }
  > = {};
  businessCases.forEach((bc) => {
    const fy = bc.fiscal_year || "Unknown";
    if (!businessCaseYears[fy]) {
      businessCaseYears[fy] = { revenue: 0, margin: 0, count: 0 };
    }
    businessCaseYears[fy].revenue += bc.total_revenue || 0;
    businessCaseYears[fy].margin += bc.total_margin || 0;
    businessCaseYears[fy].count += 1;
  });

  const sortedStatusHistory = [...statusHistory].sort(
    (a, b) =>
      new Date(b.changed_at || 0).getTime() -
      new Date(a.changed_at || 0).getTime(),
  );
  const statusChangeDate = sortedStatusHistory[0]?.changed_at
    ? new Date(sortedStatusHistory[0].changed_at)
    : null;

  return {
    totalRevenue,
    totalMargin,
    avgMarginPercent,
    latestCOGS,
    earliestEMD,
    earliestTME,
    earliestProtectionExpiry,
    activeIngredients,
    referenceProducts,
    approvedCountries,
    countriesList,
    registrationPathways,
    euApprovedCount,
    novelCount,
    cropsList,
    businessCaseYears,
    statusChangeDate,
  };
}

export function formatNumber(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString();
}
