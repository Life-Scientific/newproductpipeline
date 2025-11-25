import type { Database } from "@/lib/supabase/database.types";

// Re-export database types for convenience
export type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
export type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];
export type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
export type FormulationIngredient = Database["public"]["Tables"]["formulation_ingredients"]["Row"];
export type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];
export type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];
export type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
export type StatusHistory = Database["public"]["Tables"]["formulation_status_history"]["Row"];
export type ProtectionStatus = Database["public"]["Views"]["vw_patent_protection_status"]["Row"];
export type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];
export type Country = Database["public"]["Tables"]["countries"]["Row"];
export type IngredientUsage = Database["public"]["Views"]["vw_ingredient_usage"]["Row"];
export type ActivePortfolio = Database["public"]["Views"]["vw_active_portfolio"]["Row"];

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

