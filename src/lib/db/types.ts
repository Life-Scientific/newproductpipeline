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
  use_group_status: string | null; // Status of the linked use group (Active/Inactive)
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
  // Audit info
  updated_at: string | null;
  created_by: string | null;
  change_reason: string | null;
  change_summary: string | null;
}

export interface BusinessCaseYearData {
  business_case_id: string;
  business_case_group_id: string;
  year_offset: number;
  fiscal_year: string | null;
  target_market_entry_fy: string | null; // Original target market entry from use group
  effective_start_fiscal_year: string | null; // Effective start fiscal year at creation time
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
  formulation_country_use_group_id: string | null; // For version history lookup
}

// ============================================================================
// Business Case Import Types
// ============================================================================

/**
 * Raw CSV row data for business case import.
 * All year data fields are optional - COGS will auto-lookup if empty.
 */
export interface BusinessCaseImportRow {
  /** Formulation code (e.g., "323-01") - required */
  formulation_code: string;
  /** Country code (e.g., "IE", "UK", "DE") - required */
  country_code: string;
  /** Use group variant (e.g., "001") - required */
  use_group_variant: string;
  /** Effective fiscal year start (e.g., "FY26") - optional, uses use group's target_market_entry_fy if omitted */
  effective_start_fiscal_year?: string;
  /** Business case name/description - optional */
  business_case_name?: string;
  /** Reason for change - required when updating existing business case */
  change_reason?: string;
  /** Year 1-10 data: volume (in base units L/KG), nsp (in EUR), cogs (optional EUR override) */
  year_1_volume: number;
  year_1_nsp: number;
  year_1_cogs?: number;
  year_2_volume: number;
  year_2_nsp: number;
  year_2_cogs?: number;
  year_3_volume: number;
  year_3_nsp: number;
  year_3_cogs?: number;
  year_4_volume: number;
  year_4_nsp: number;
  year_4_cogs?: number;
  year_5_volume: number;
  year_5_nsp: number;
  year_5_cogs?: number;
  year_6_volume: number;
  year_6_nsp: number;
  year_6_cogs?: number;
  year_7_volume: number;
  year_7_nsp: number;
  year_7_cogs?: number;
  year_8_volume: number;
  year_8_nsp: number;
  year_8_cogs?: number;
  year_9_volume: number;
  year_9_nsp: number;
  year_9_cogs?: number;
  year_10_volume: number;
  year_10_nsp: number;
  year_10_cogs?: number;
}

/**
 * Validation result for a single import row.
 */
export interface BusinessCaseImportRowValidation {
  /** Original row index in CSV (0-based, excluding header) */
  rowIndex: number;
  /** The parsed row data */
  row: BusinessCaseImportRow;
  /** Whether validation passed */
  isValid: boolean;
  /** Validation errors (if any) */
  errors: string[];
  /** Validation warnings (non-blocking issues) */
  warnings: string[];
  /** Resolved entity IDs (populated during validation) */
  resolved?: {
    formulation_id: string;
    country_id: string;
    formulation_country_id: string;
    formulation_country_use_group_id: string;
    target_market_entry_fy: string | null;
    existing_business_case_group_id: string | null; // If updating existing
  };
}

/**
 * Status of a single row during import process.
 */
export type ImportRowStatus = 
  | "pending"
  | "validating"
  | "valid"
  | "invalid"
  | "importing"
  | "created"
  | "updated"
  | "skipped"
  | "error";

/**
 * Progress tracking for a row during import.
 */
export interface BusinessCaseImportRowProgress {
  rowIndex: number;
  status: ImportRowStatus;
  message?: string;
  businessCaseGroupId?: string; // Set after successful import
}

/**
 * Overall import result summary.
 */
export interface BusinessCaseImportResult {
  /** Total rows processed */
  totalRows: number;
  /** Rows that passed validation */
  validRows: number;
  /** Rows that failed validation */
  invalidRows: number;
  /** New business cases created */
  created: number;
  /** Existing business cases updated (new version created) */
  updated: number;
  /** Rows skipped (e.g., dry run or user choice) */
  skipped: number;
  /** Rows that failed during import */
  errors: number;
  /** Detailed validation results per row */
  rowValidations: BusinessCaseImportRowValidation[];
  /** Progress tracking per row */
  rowProgress: BusinessCaseImportRowProgress[];
  /** Overall error message if import failed catastrophically */
  error?: string;
}

