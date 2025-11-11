"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserName } from "@/lib/utils/user-context";
import { checkExistingBusinessCase, validateUseGroupTargetEntryConsistency } from "@/lib/db/queries";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";

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
  const assumptions = formData.get("assumptions") as string | null;
  // Note: fiscal_year is no longer stored - it's calculated from target_market_entry_fy + year_offset

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
  // Note: fiscal_year is no longer stored - it's calculated from target_market_entry_fy + year_offset
  const { data: businessCase, error: bcError } = await supabase
    .from("business_case")
    .insert({
      business_case_name: businessCaseName,
      year_offset: yearOffset,
      volume,
      nsp,
      cogs_per_unit: cogsPerUnit,
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
  const assumptions = formData.get("assumptions") as string | null;

  if (yearOffset && (yearOffset < 1 || yearOffset > 10)) {
    return { error: "Year offset must be between 1 and 10" };
  }

  // Update business case fields
  // Note: fiscal_year is no longer stored - it's calculated from target_market_entry_fy + year_offset
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (businessCaseName !== null) updateData.business_case_name = businessCaseName;
  if (yearOffset !== null) updateData.year_offset = yearOffset;
  if (volume !== null) updateData.volume = volume;
  if (nsp !== null) updateData.nsp = nsp;
  if (cogsPerUnit !== null) updateData.cogs_per_unit = cogsPerUnit;
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

/**
 * Create a new business case group (10 years of data)
 */
export async function createBusinessCaseGroupAction(formData: FormData) {
  const supabase = await createClient();
  const userName = await getCurrentUserName();

  const formulationId = formData.get("formulation_id") as string | null;
  const countryId = formData.get("country_id") as string | null;
  const useGroupIds = formData.getAll("use_group_ids") as string[]; // These are formulation_country_use_group_ids

  if (!formulationId || !countryId) {
    return { error: "Formulation and country are required" };
  }

  if (!useGroupIds || useGroupIds.length === 0) {
    return { error: "At least one use group must be selected" };
  }

  // Validate that all selected use groups have the same target_market_entry_fy
  const validation = await validateUseGroupTargetEntryConsistency(useGroupIds);
  if (!validation.isValid) {
    return { error: validation.error || "Validation failed" };
  }

  const targetMarketEntry = validation.targetEntry;
  if (!targetMarketEntry) {
    return { error: "Selected use groups do not have target market entry fiscal year set" };
  }

  // Parse target market entry (e.g., "FY26" -> 26)
  const targetYearMatch = targetMarketEntry.match(/FY(\d{2})/);
  if (!targetYearMatch) {
    return { error: "Invalid target market entry format. Expected format: FY26" };
  }
  const targetYear = parseInt(targetYearMatch[1], 10);

  // Determine effective start fiscal year at creation time
  // If target_market_entry is in the past, start from current fiscal year
  // This preserves the fiscal year context when data was entered
  const effectiveStartYear = targetYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : targetYear;
  const effectiveStartFiscalYear = `FY${String(effectiveStartYear).padStart(2, "0")}`;

  // Check if business case already exists for this combination
  // For now, check the first use group - in the future we might want to check all
  const existingGroupId = await checkExistingBusinessCase(
    formulationId,
    countryId,
    useGroupIds[0]
  );

  if (existingGroupId) {
    // Return the existing group ID so the UI can switch to update mode
    return { data: { business_case_group_id: existingGroupId }, exists: true };
  }

  // Generate a single UUID for the group
  const groupId = crypto.randomUUID();

  // Extract year data (10 years: year_1_volume, year_1_nsp, year_2_volume, etc.)
  const yearData: Array<{ year_offset: number; volume: number; nsp: number; fiscal_year: string }> = [];
  
  for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
    const volumeKey = `year_${yearOffset}_volume`;
    const nspKey = `year_${yearOffset}_nsp`;
    
    const volume = formData.get(volumeKey) ? Number(formData.get(volumeKey)) : null;
    const nsp = formData.get(nspKey) ? Number(formData.get(nspKey)) : null;

    if (volume === null || nsp === null || volume <= 0 || nsp <= 0) {
      return { error: `Year ${yearOffset}: Volume and NSP are required and must be greater than 0` };
    }

    yearData.push({
      year_offset: yearOffset,
      volume,
      nsp,
    });
  }

  // Create 10 business case rows
  // Set effective_start_fiscal_year to preserve fiscal year context at creation time
  // This ensures data entered in FY26 always maps to FY26-FY35, even if viewed in FY27+
  const businessCaseInserts = yearData.map((year) => ({
    business_case_group_id: groupId,
    business_case_name: formData.get("business_case_name") as string | null,
    year_offset: year.year_offset,
    volume: year.volume,
    nsp: year.nsp,
    effective_start_fiscal_year: effectiveStartFiscalYear, // Preserves creation context
    status: "active" as const,
    created_by: userName,
  }));

  const { data: businessCases, error: bcError } = await supabase
    .from("business_case")
    .insert(businessCaseInserts)
    .select();

  if (bcError || !businessCases || businessCases.length !== 10) {
    return { error: bcError?.message || "Failed to create business case group" };
  }

  // Link all business cases to the selected use groups via junction table
  const junctionEntries: Array<{
    business_case_id: string;
    formulation_country_use_group_id: string;
  }> = [];

  businessCases.forEach((bc) => {
    useGroupIds.forEach((useGroupId) => {
      junctionEntries.push({
        business_case_id: bc.business_case_id,
        formulation_country_use_group_id: useGroupId,
      });
    });
  });

  if (junctionEntries.length > 0) {
    const { error: junctionError } = await supabase
      .from("business_case_use_groups")
      .insert(junctionEntries);

    if (junctionError) {
      // Rollback: delete the business cases if junction insert fails
      await supabase
        .from("business_case")
        .delete()
        .eq("business_case_group_id", groupId);
      return { error: `Failed to link use groups: ${junctionError.message}` };
    }
  }

  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { data: { business_case_group_id: groupId }, success: true };
}

/**
 * Update an existing business case group (all 10 years)
 */
export async function updateBusinessCaseGroupAction(
  groupId: string,
  formData: FormData
) {
  const supabase = await createClient();

  // Extract year data (10 years)
  const updates: Array<{
    year_offset: number;
    volume: number;
    nsp: number;
  }> = [];

  for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
    const volumeKey = `year_${yearOffset}_volume`;
    const nspKey = `year_${yearOffset}_nsp`;

    const volume = formData.get(volumeKey) ? Number(formData.get(volumeKey)) : null;
    const nsp = formData.get(nspKey) ? Number(formData.get(nspKey)) : null;

    if (volume === null || nsp === null || volume <= 0 || nsp <= 0) {
      return { error: `Year ${yearOffset}: Volume and NSP are required and must be greater than 0` };
    }

    updates.push({
      year_offset: yearOffset,
      volume,
      nsp,
    });
  }

  // Update each year in the group
  for (const update of updates) {
    const { error } = await supabase
      .from("business_case")
      .update({
        volume: update.volume,
        nsp: update.nsp,
        updated_at: new Date().toISOString(),
      })
      .eq("business_case_group_id", groupId)
      .eq("year_offset", update.year_offset)
      .eq("status", "active");

    if (error) {
      return { error: `Failed to update year ${update.year_offset}: ${error.message}` };
    }
  }

  // Update business_case_name if provided
  const businessCaseName = formData.get("business_case_name") as string | null;
  if (businessCaseName !== null) {
    const { error: nameError } = await supabase
      .from("business_case")
      .update({ business_case_name: businessCaseName })
      .eq("business_case_group_id", groupId)
      .eq("status", "active");

    if (nameError) {
      return { error: `Failed to update business case name: ${nameError.message}` };
    }
  }

  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { success: true };
}

/**
 * Server action to get business case group data (for client components)
 */
export async function getBusinessCaseGroupAction(groupId: string) {
  const { getBusinessCaseGroup } = await import("@/lib/db/queries");
  try {
    const data = await getBusinessCaseGroup(groupId);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Failed to fetch business case group" };
  }
}

/**
 * Server action to check for existing business case (for client components)
 */
export async function checkExistingBusinessCaseAction(
  formulationId: string,
  countryId: string,
  useGroupId: string
) {
  const { checkExistingBusinessCase } = await import("@/lib/db/queries");
  try {
    const groupId = await checkExistingBusinessCase(formulationId, countryId, useGroupId);
    return { data: groupId, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Failed to check existing business case" };
  }
}

/**
 * Server action to get formulations (for client components)
 */
export async function getFormulationsAction() {
  const { getFormulations } = await import("@/lib/db/queries");
  try {
    const data = await getFormulations();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Failed to fetch formulations" };
  }
}

/**
 * Server action to get countries (for client components)
 */
export async function getCountriesAction() {
  const { getCountries } = await import("@/lib/db/queries");
  try {
    const data = await getCountries();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Failed to fetch countries" };
  }
}

