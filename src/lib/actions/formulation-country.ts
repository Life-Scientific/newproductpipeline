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

  // Crops and targets are JSON arrays
  const cropsJson = formData.get("crops") as string | null;
  const targetsJson = formData.get("targets") as string | null;

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

  // Add crops
  if (cropsJson && data?.formulation_country_id) {
    try {
      const crops: Array<{ crop_id: string; notes?: string }> = JSON.parse(cropsJson);
      if (crops.length > 0) {
        const cropInserts = crops.map((crop) => ({
          formulation_country_id: data.formulation_country_id,
          crop_id: crop.crop_id,
          notes: crop.notes || null,
        }));
        await supabase.from("formulation_country_crops").insert(cropInserts);
      }
    } catch (parseError) {
      console.error("Failed to parse crops:", parseError);
    }
  }

  // Add targets
  if (targetsJson && data?.formulation_country_id) {
    try {
      const targets: Array<{ target_id: string; efficacy_level?: string; notes?: string }> =
        JSON.parse(targetsJson);
      if (targets.length > 0) {
        const targetInserts = targets.map((target) => ({
          formulation_country_id: data.formulation_country_id,
          target_id: target.target_id,
          efficacy_level: target.efficacy_level || null,
          notes: target.notes || null,
        }));
        await supabase.from("formulation_country_targets").insert(targetInserts);
      }
    } catch (parseError) {
      console.error("Failed to parse targets:", parseError);
    }
  }

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

  const cropsJson = formData.get("crops") as string | null;
  const targetsJson = formData.get("targets") as string | null;

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

  // Update crops - delete all and reinsert
  if (cropsJson) {
    await supabase
      .from("formulation_country_crops")
      .delete()
      .eq("formulation_country_id", formulationCountryId);

    try {
      const crops: Array<{ crop_id: string; notes?: string }> = JSON.parse(cropsJson);
      if (crops.length > 0) {
        const cropInserts = crops.map((crop) => ({
          formulation_country_id: formulationCountryId,
          crop_id: crop.crop_id,
          notes: crop.notes || null,
        }));
        await supabase.from("formulation_country_crops").insert(cropInserts);
      }
    } catch (parseError) {
      console.error("Failed to parse crops:", parseError);
    }
  }

  // Update targets - delete all and reinsert
  if (targetsJson) {
    await supabase
      .from("formulation_country_targets")
      .delete()
      .eq("formulation_country_id", formulationCountryId);

    try {
      const targets: Array<{ target_id: string; efficacy_level?: string; notes?: string }> =
        JSON.parse(targetsJson);
      if (targets.length > 0) {
        const targetInserts = targets.map((target) => ({
          formulation_country_id: formulationCountryId,
          target_id: target.target_id,
          efficacy_level: target.efficacy_level || null,
          notes: target.notes || null,
        }));
        await supabase.from("formulation_country_targets").insert(targetInserts);
      }
    } catch (parseError) {
      console.error("Failed to parse targets:", parseError);
    }
  }

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

