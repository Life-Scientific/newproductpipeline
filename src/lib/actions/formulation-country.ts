"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createFormulationCountry(formData: FormData) {
  const supabase = await createClient();

  const formulationId = formData.get("formulation_id") as string;
  const countryId = formData.get("country_id") as string;
  const registrationPathway = formData.get("registration_pathway") as string | null;
  const registrationStatus = formData.get("registration_status") as string | null;
  const targetMarketEntryFy = formData.get("target_market_entry_fy") as string | null;
  const emd = formData.get("emd") as string | null;
  const keyedinProjectIds = formData.get("keyedin_project_ids") as string | null;
  const isNovel = formData.get("is_novel") === "true";
  const isEuApprovedFormulation = formData.get("is_eu_approved_formulation") === "true";
  const isInActivePortfolio = formData.get("is_in_active_portfolio") === "true";
  const hasApproval = formData.get("has_approval") === "true";

  // Note: Crops and targets are now managed at formulation level via EPPO codes,
  // not at formulation_country level

  if (!formulationId || !countryId) {
    return { error: "Formulation and country are required" };
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId)
    .eq("country_id", countryId)
    .single();

  if (existing) {
    return { error: "This formulation is already registered in this country" };
  }

  const { data, error } = await supabase
    .from("formulation_country")
    .insert({
      formulation_id: formulationId,
      country_id: countryId,
      registration_pathway: registrationPathway,
      registration_status: registrationStatus,
      target_market_entry_fy: targetMarketEntryFy,
      emd: emd || null,
      keyedin_project_ids: keyedinProjectIds,
      is_novel: isNovel,
      is_eu_approved_formulation: isEuApprovedFormulation,
      is_in_active_portfolio: isInActivePortfolio,
      has_approval: hasApproval,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Note: Crops and targets are managed at formulation level via EPPO codes,
  // not at formulation_country level

  revalidatePath("/registration");
  revalidatePath("/formulations");
  return { data, success: true };
}

export async function updateFormulationCountry(
  formulationCountryId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const registrationPathway = formData.get("registration_pathway") as string | null;
  const registrationStatus = formData.get("registration_status") as string | null;
  const targetMarketEntryFy = formData.get("target_market_entry_fy") as string | null;
  const emd = formData.get("emd") as string | null;
  const keyedinProjectIds = formData.get("keyedin_project_ids") as string | null;
  const isNovel = formData.get("is_novel") === "true";
  const isEuApprovedFormulation = formData.get("is_eu_approved_formulation") === "true";
  const isInActivePortfolio = formData.get("is_in_active_portfolio") === "true";
  const hasApproval = formData.get("has_approval") === "true";

  // Note: Crops and targets are managed at formulation level via EPPO codes,
  // not at formulation_country level

  const { data, error } = await supabase
    .from("formulation_country")
    .update({
      registration_pathway: registrationPathway,
      registration_status: registrationStatus,
      target_market_entry_fy: targetMarketEntryFy,
      emd: emd || null,
      keyedin_project_ids: keyedinProjectIds,
      is_novel: isNovel,
      is_eu_approved_formulation: isEuApprovedFormulation,
      is_in_active_portfolio: isInActivePortfolio,
      has_approval: hasApproval,
      updated_at: new Date().toISOString(),
    })
    .eq("formulation_country_id", formulationCountryId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Note: Crops and targets are managed at formulation level via EPPO codes,
  // not at formulation_country level

  revalidatePath("/registration");
  revalidatePath("/formulations");
  return { data, success: true };
}

export async function deleteFormulationCountry(formulationCountryId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_country")
    .delete()
    .eq("formulation_country_id", formulationCountryId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/registration");
  revalidatePath("/formulations");
  return { success: true };
}

