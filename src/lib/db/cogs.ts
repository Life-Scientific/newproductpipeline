import { createClient } from "@/lib/supabase/server";
import type { COGS } from "./types";
import { getFormulationById } from "./queries";

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
  countryId: string | null,
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
