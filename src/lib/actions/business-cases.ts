"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserName } from "@/lib/utils/user-context";

export async function createBusinessCase(formData: FormData) {
  const supabase = await createClient();
  const userName = await getCurrentUserName();

  const formulationCountryId = formData.get("formulation_country_id") as string | null;
  const formulationCountryUseGroupId = formData.get("formulation_country_use_group_id") as string | null;
  const businessCaseName = formData.get("business_case_name") as string | null;
  const businessCaseType = (formData.get("business_case_type") as string) || "Single Use Group";
  const yearOffset = Number(formData.get("year_offset"));
  const volume = formData.get("volume") ? Number(formData.get("volume")) : null;
  const nsp = formData.get("nsp") ? Number(formData.get("nsp")) : null;
  const cogsPerUnit = formData.get("cogs_per_unit") ? Number(formData.get("cogs_per_unit")) : null;
  const fiscalYear = formData.get("fiscal_year") as string | null;
  const scenarioId = formData.get("scenario_id") as string | null;
  const scenarioName = formData.get("scenario_name") as string | null;
  const assumptions = formData.get("assumptions") as string | null;
  const confidenceLevel = formData.get("confidence_level") as string | null;

  if (!formulationCountryId && !formulationCountryUseGroupId) {
    return { error: "Must link to either formulation-country or use group" };
  }

  if (formulationCountryId && formulationCountryUseGroupId) {
    return { error: "Cannot link to both formulation-country and use group" };
  }

  if (!yearOffset || yearOffset < 1 || yearOffset > 10) {
    return { error: "Year offset must be between 1 and 10" };
  }

  const { data, error } = await supabase
    .from("business_case")
    .insert({
      formulation_country_id: formulationCountryId || null,
      formulation_country_use_group_id: formulationCountryUseGroupId || null,
      business_case_name: businessCaseName,
      business_case_type: businessCaseType,
      year_offset: yearOffset,
      volume,
      nsp,
      cogs_per_unit: cogsPerUnit,
      fiscal_year: fiscalYear,
      scenario_id: scenarioId,
      scenario_name: scenarioName,
      assumptions,
      confidence_level: confidenceLevel,
      created_by: userName,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { data, success: true };
}

export async function updateBusinessCase(businessCaseId: string, formData: FormData) {
  const supabase = await createClient();

  const businessCaseName = formData.get("business_case_name") as string | null;
  const businessCaseType = formData.get("business_case_type") as string | null;
  const yearOffset = formData.get("year_offset") ? Number(formData.get("year_offset")) : null;
  const volume = formData.get("volume") ? Number(formData.get("volume")) : null;
  const nsp = formData.get("nsp") ? Number(formData.get("nsp")) : null;
  const cogsPerUnit = formData.get("cogs_per_unit") ? Number(formData.get("cogs_per_unit")) : null;
  const fiscalYear = formData.get("fiscal_year") as string | null;
  const scenarioId = formData.get("scenario_id") as string | null;
  const scenarioName = formData.get("scenario_name") as string | null;
  const assumptions = formData.get("assumptions") as string | null;
  const confidenceLevel = formData.get("confidence_level") as string | null;

  if (yearOffset && (yearOffset < 1 || yearOffset > 10)) {
    return { error: "Year offset must be between 1 and 10" };
  }

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (businessCaseName !== null) updateData.business_case_name = businessCaseName;
  if (businessCaseType !== null) updateData.business_case_type = businessCaseType;
  if (yearOffset !== null) updateData.year_offset = yearOffset;
  if (volume !== null) updateData.volume = volume;
  if (nsp !== null) updateData.nsp = nsp;
  if (cogsPerUnit !== null) updateData.cogs_per_unit = cogsPerUnit;
  if (fiscalYear !== null) updateData.fiscal_year = fiscalYear;
  if (scenarioId !== null) updateData.scenario_id = scenarioId;
  if (scenarioName !== null) updateData.scenario_name = scenarioName;
  if (assumptions !== null) updateData.assumptions = assumptions;
  if (confidenceLevel !== null) updateData.confidence_level = confidenceLevel;

  const { data, error } = await supabase
    .from("business_case")
    .update(updateData)
    .eq("business_case_id", businessCaseId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
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

