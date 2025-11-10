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
type FormulationCountryLabel = Database["public"]["Views"]["vw_formulation_country_label"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];
type IngredientUsage = Database["public"]["Views"]["vw_ingredient_usage"]["Row"];
type ActivePortfolio = Database["public"]["Views"]["vw_active_portfolio"]["Row"];
type PortfolioGaps = Database["public"]["Views"]["vw_portfolio_gaps"]["Row"];

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

  return data as BusinessCase[];
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

  return data as BusinessCase | null;
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

  return data as BusinessCase[];
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

  return data as BusinessCase[];
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

export async function getFormulationLabels(formulationId: string) {
  const supabase = await createClient();
  const formulation = await getFormulationById(formulationId);
  if (!formulation?.formulation_code) {
    return [];
  }

  const { data, error } = await supabase
    .from("vw_formulation_country_label")
    .select("*")
    .eq("formulation_code", formulation.formulation_code)
    .order("country_name", { ascending: true })
    .order("label_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch labels: ${error.message}`);
  }

  return data as FormulationCountryLabel[];
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

  return data as BusinessCase[];
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
