"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserName } from "@/lib/utils/user-context";

export async function createBusinessCase(formData: FormData) {
  const supabase = await createClient();
  const userName = await getCurrentUserName();

  const formulationId = formData.get("formulation_id") as string | null;
  const countryId = formData.get("country_id") as string | null;
  const useGroupIds = formData.getAll("use_group_ids") as string[];
  const businessCaseName = formData.get("business_case_name") as string | null;
  const yearOffset = Number(formData.get("year_offset"));
  const volume = formData.get("volume") ? Number(formData.get("volume")) : null;
  const nsp = formData.get("nsp") ? Number(formData.get("nsp")) : null;
  const cogsPerUnit = formData.get("cogs_per_unit") ? Number(formData.get("cogs_per_unit")) : null;
  const fiscalYear = formData.get("fiscal_year") as string | null;
  const scenarioId = formData.get("scenario_id") as string | null;
  const scenarioName = formData.get("scenario_name") as string | null;
  const assumptions = formData.get("assumptions") as string | null;

  if (!formulationId || !countryId) {
    return { error: "Formulation and country are required" };
  }

  if (!useGroupIds || useGroupIds.length === 0) {
    return { error: "At least one use group must be selected" };
  }

  if (!yearOffset || yearOffset < 1 || yearOffset > 10) {
    return { error: "Year offset must be between 1 and 10" };
  }

  // Find formulation_country_id
  const { data: formulationCountry, error: fcError } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId)
    .eq("country_id", countryId)
    .single();

  if (fcError || !formulationCountry) {
    return { error: "Formulation-country combination not found" };
  }

  // Find formulation_country_use_group_ids for the selected use groups
  const { data: useGroups, error: ugError } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, use_group_variant")
    .eq("formulation_country_id", formulationCountry.formulation_country_id)
    .in("use_group_variant", useGroupIds);

  if (ugError || !useGroups || useGroups.length === 0) {
    return { error: "Selected use groups not found for this formulation-country combination" };
  }

  // Create business case
  const { data: businessCase, error: bcError } = await supabase
    .from("business_case")
    .insert({
      business_case_name: businessCaseName,
      year_offset: yearOffset,
      volume,
      nsp,
      cogs_per_unit: cogsPerUnit,
      fiscal_year: fiscalYear,
      assumptions,
      created_by: userName,
    })
    .select()
    .single();

  if (bcError || !businessCase) {
    return { error: bcError?.message || "Failed to create business case" };
  }

  // Insert into junction table
  const junctionEntries = useGroups.map((ug) => ({
    business_case_id: businessCase.business_case_id,
    formulation_country_use_group_id: ug.formulation_country_use_group_id,
  }));

  const { error: junctionError } = await supabase
    .from("business_case_use_groups")
    .insert(junctionEntries);

  if (junctionError) {
    // Rollback: delete the business case if junction insert fails
    await supabase
      .from("business_case")
      .delete()
      .eq("business_case_id", businessCase.business_case_id);
    return { error: `Failed to link use groups: ${junctionError.message}` };
  }

  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { data: businessCase, success: true };
}

export async function updateBusinessCase(businessCaseId: string, formData: FormData) {
  const supabase = await createClient();

  const formulationId = formData.get("formulation_id") as string | null;
  const countryId = formData.get("country_id") as string | null;
  const useGroupIds = formData.getAll("use_group_ids") as string[];
  const businessCaseName = formData.get("business_case_name") as string | null;
  const yearOffset = formData.get("year_offset") ? Number(formData.get("year_offset")) : null;
  const volume = formData.get("volume") ? Number(formData.get("volume")) : null;
  const nsp = formData.get("nsp") ? Number(formData.get("nsp")) : null;
  const cogsPerUnit = formData.get("cogs_per_unit") ? Number(formData.get("cogs_per_unit")) : null;
  const fiscalYear = formData.get("fiscal_year") as string | null;
  const assumptions = formData.get("assumptions") as string | null;

  if (yearOffset && (yearOffset < 1 || yearOffset > 10)) {
    return { error: "Year offset must be between 1 and 10" };
  }

  // Update business case fields
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (businessCaseName !== null) updateData.business_case_name = businessCaseName;
  if (yearOffset !== null) updateData.year_offset = yearOffset;
  if (volume !== null) updateData.volume = volume;
  if (nsp !== null) updateData.nsp = nsp;
  if (cogsPerUnit !== null) updateData.cogs_per_unit = cogsPerUnit;
  if (fiscalYear !== null) updateData.fiscal_year = fiscalYear;
  if (assumptions !== null) updateData.assumptions = assumptions;

  const { data, error } = await supabase
    .from("business_case")
    .update(updateData)
    .eq("business_case_id", businessCaseId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Update use groups if provided
  if (formulationId && countryId && useGroupIds && useGroupIds.length > 0) {
    // Find formulation_country_id
    const { data: formulationCountry, error: fcError } = await supabase
      .from("formulation_country")
      .select("formulation_country_id")
      .eq("formulation_id", formulationId)
      .eq("country_id", countryId)
      .single();

    if (fcError || !formulationCountry) {
      return { error: "Formulation-country combination not found" };
    }

    // Find formulation_country_use_group_ids
    const { data: useGroups, error: ugError } = await supabase
      .from("formulation_country_use_group")
      .select("formulation_country_use_group_id, use_group_variant")
      .eq("formulation_country_id", formulationCountry.formulation_country_id)
      .in("use_group_variant", useGroupIds);

    if (ugError || !useGroups || useGroups.length === 0) {
      return { error: "Selected use groups not found for this formulation-country combination" };
    }

    // Delete existing junction entries
    const { error: deleteError } = await supabase
      .from("business_case_use_groups")
      .delete()
      .eq("business_case_id", businessCaseId);

    if (deleteError) {
      return { error: `Failed to update use groups: ${deleteError.message}` };
    }

    // Insert new junction entries
    const junctionEntries = useGroups.map((ug) => ({
      business_case_id: businessCaseId,
      formulation_country_use_group_id: ug.formulation_country_use_group_id,
    }));

    const { error: insertError } = await supabase
      .from("business_case_use_groups")
      .insert(junctionEntries);

    if (insertError) {
      return { error: `Failed to link use groups: ${insertError.message}` };
    }
  }

  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { data, success: true };
}

export async function deleteBusinessCase(businessCaseId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("business_case")
    .delete()
    .eq("business_case_id", businessCaseId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { success: true };
}

