"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getCurrentUserName } from "@/lib/utils/user-context";
import { checkExistingBusinessCase, validateUseGroupTargetEntryConsistency } from "@/lib/db/queries";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import { lookupCOGSWithCarryForward } from "./cogs";
import { withUserContext } from "@/lib/supabase/user-context";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

export async function createBusinessCase(formData: FormData) {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canCreate) {
    return { error: "Unauthorized: You don't have permission to create business cases" };
  }

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

  revalidateTag("business-cases", "page");
  revalidateTag("formulations", "page");
  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { data: businessCase, success: true };
}

export async function updateBusinessCase(businessCaseId: string, formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.BUSINESS_CASE_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to edit business cases" };
  }

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

  // Update business case fields with user context for triggers
  const result = await withUserContext(async (supabase) => {
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

    return { data };
  });

  if (result.error) {
    return { error: result.error };
  }

  const { data } = result;

  // Update use groups if provided
  if (formulationId && countryId && useGroupIds && useGroupIds.length > 0) {
    const useGroupResult = await withUserContext(async (supabase) => {
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

      return { success: true };
    });

    if (useGroupResult.error) {
      return { error: useGroupResult.error };
    }
  }

  revalidateTag("business-cases", "page");
  revalidateTag("formulations", "page");
  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { data, success: true };
}

export async function deleteBusinessCase(businessCaseId: string) {
  // Permission check
  const canDelete = await hasPermission(PERMISSIONS.BUSINESS_CASE_DELETE);
  if (!canDelete) {
    return { error: "Unauthorized: You don't have permission to delete business cases" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("business_case")
    .delete()
    .eq("business_case_id", businessCaseId);

  if (error) {
    return { error: error.message };
  }

  revalidateTag("business-cases", "page");
  revalidateTag("formulations", "page");
  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { success: true };
}

/**
 * Create a new business case group (10 years of data)
 */
export async function createBusinessCaseGroupAction(formData: FormData) {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canCreate) {
    return { error: "Unauthorized: You don't have permission to create business cases" };
  }

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

  // If existing business case found, preserve its effective_start_fiscal_year
  let finalEffectiveStartFiscalYear = effectiveStartFiscalYear;
  
  if (existingGroupId) {
    // Get the existing business case's effective_start_fiscal_year to preserve it
    const { data: existingCase } = await supabase
      .from("business_case")
      .select("effective_start_fiscal_year")
      .eq("business_case_group_id", existingGroupId)
      .eq("status", "active")
      .limit(1)
      .single();
    
    if (existingCase?.effective_start_fiscal_year) {
      // Preserve the original effective start fiscal year
      finalEffectiveStartFiscalYear = existingCase.effective_start_fiscal_year;
    }
    
    // Mark old business cases as superseded (archived)
    const { error: deactivateError } = await supabase
      .from("business_case")
      .update({ status: "superseded", updated_at: new Date().toISOString() })
      .eq("business_case_group_id", existingGroupId)
      .eq("status", "active");

    if (deactivateError) {
      return { error: `Failed to archive old version: ${deactivateError.message}` };
    }
  }

  // Generate a single UUID for the group
  const groupId = crypto.randomUUID();

  // Get formulation_country_id from country_id
  const { data: fcData } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId)
    .eq("country_id", countryId)
    .single();

  const formulationCountryId = fcData?.formulation_country_id || null;

  // Extract year data (10 years: year_1_volume, year_1_nsp, year_2_volume, etc.)
  const yearData: Array<{ 
    year_offset: number; 
    volume: number; 
    nsp: number; 
    fiscal_year: string;
    cogs_per_unit: number | null;
  }> = [];
  
  // Parse the final effective start year for fiscal year calculations
  const finalStartYearMatch = finalEffectiveStartFiscalYear.match(/FY(\d{2})/);
  const finalEffectiveStartYear = finalStartYearMatch ? parseInt(finalStartYearMatch[1], 10) : effectiveStartYear;
  
  for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
    const volumeKey = `year_${yearOffset}_volume`;
    const nspKey = `year_${yearOffset}_nsp`;
    const cogsKey = `year_${yearOffset}_cogs`;
    
    const volume = formData.get(volumeKey) ? Number(formData.get(volumeKey)) : null;
    const nsp = formData.get(nspKey) ? Number(formData.get(nspKey)) : null;
    const cogsOverride = formData.get(cogsKey) ? Number(formData.get(cogsKey)) : null;

    if (volume === null || nsp === null || volume <= 0 || nsp <= 0) {
      return { error: `Year ${yearOffset}: Volume and NSP are required and must be greater than 0` };
    }

    // Calculate fiscal year for this business case year (use preserved effective start year)
    const fiscalYearNum = finalEffectiveStartYear + (yearOffset - 1);
    const fiscalYear = `FY${String(fiscalYearNum).padStart(2, "0")}`;

    // Use manual override if provided, otherwise lookup COGS with carry-forward logic
    let cogsValue: number | null = null;
    if (cogsOverride !== null && cogsOverride > 0) {
      cogsValue = cogsOverride;
    } else {
      cogsValue = await lookupCOGSWithCarryForward(
        formulationId,
        formulationCountryId,
        fiscalYear
      );
    }

    yearData.push({
      year_offset: yearOffset,
      volume,
      nsp,
      fiscal_year: fiscalYear,
      cogs_per_unit: cogsValue,
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
    cogs_per_unit: year.cogs_per_unit, // COGS value from lookup with carry-forward
    effective_start_fiscal_year: finalEffectiveStartFiscalYear, // Preserves creation context
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

  revalidateTag("business-cases", "page");
  revalidateTag("formulations", "page");
  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { data: { business_case_group_id: groupId }, success: true };
}

/**
 * Create a new version of a business case group (version control)
 * This marks the old version as inactive and creates a new active version.
 * All changes to business cases are tracked as new versions - we never edit in place.
 */
export async function updateBusinessCaseGroupAction(
  oldGroupId: string,
  formData: FormData
) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.BUSINESS_CASE_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to edit business cases" };
  }

  const supabase = await createClient();
  const userName = await getCurrentUserName();

  // Extract year data (10 years)
  const yearData: Array<{
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

    yearData.push({
      year_offset: yearOffset,
      volume,
      nsp,
    });
  }

  // Get the existing business case group data
  const { data: existingCases, error: fetchError } = await supabase
    .from("business_case")
    .select("*, business_case_use_groups(formulation_country_use_group_id)")
    .eq("business_case_group_id", oldGroupId)
    .eq("status", "active");

  if (fetchError || !existingCases || existingCases.length === 0) {
    return { error: "Could not find existing business case group to version" };
  }

  // Get the common data from the first existing case
  const firstCase = existingCases[0];
  const businessCaseName = (formData.get("business_case_name") as string | null) ?? firstCase.business_case_name;
  const effectiveStartFiscalYear = firstCase.effective_start_fiscal_year;

  // Get use group IDs from the junction table
  const { data: useGroupLinks } = await supabase
    .from("business_case_use_groups")
    .select("formulation_country_use_group_id")
    .in("business_case_id", existingCases.map(c => c.business_case_id));

  const useGroupIds = [...new Set(useGroupLinks?.map(l => l.formulation_country_use_group_id) || [])];

  if (useGroupIds.length === 0) {
    return { error: "No use groups linked to existing business case" };
  }

  // Get formulation_id and formulation_country_id from the first use group
  const { data: useGroupData } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_id, formulation_country(formulation_id)")
    .eq("formulation_country_use_group_id", useGroupIds[0])
    .single();

  const formulationId = (useGroupData?.formulation_country as any)?.formulation_id;
  const formulationCountryId = useGroupData?.formulation_country_id;

  // Generate new group ID for the new version
  const newGroupId = crypto.randomUUID();

  // Create new business case records (new version)
  const newBusinessCaseInserts = await Promise.all(
    yearData.map(async (year) => {
      // Calculate fiscal year for COGS lookup
      const match = effectiveStartFiscalYear?.match(/FY(\d{2})/);
      const startYear = match ? parseInt(match[1], 10) : CURRENT_FISCAL_YEAR;
      const fiscalYearNum = startYear + (year.year_offset - 1);
      const fiscalYear = `FY${String(fiscalYearNum).padStart(2, "0")}`;

      // Check for COGS override from form data
      const cogsOverrideKey = `year_${year.year_offset}_cogs`;
      const cogsOverride = formData.get(cogsOverrideKey) ? Number(formData.get(cogsOverrideKey)) : null;

      // Use override if provided and valid, otherwise lookup COGS
      let cogsValue: number | null = null;
      if (cogsOverride !== null && cogsOverride > 0) {
        cogsValue = cogsOverride;
      } else if (formulationId) {
        cogsValue = await lookupCOGSWithCarryForward(formulationId, formulationCountryId || null, fiscalYear);
      }

      return {
        business_case_group_id: newGroupId,
        business_case_name: businessCaseName,
        year_offset: year.year_offset,
        volume: year.volume,
        nsp: year.nsp,
        cogs_per_unit: cogsValue,
        effective_start_fiscal_year: effectiveStartFiscalYear,
        status: "active" as const,
        created_by: userName,
      };
    })
  );

  // Start transaction: mark old as inactive, create new
  const result = await withUserContext(async (supabase) => {
    // Mark old business cases as superseded (archived)
    const { error: deactivateError } = await supabase
      .from("business_case")
      .update({ status: "superseded", updated_at: new Date().toISOString() })
      .eq("business_case_group_id", oldGroupId)
      .eq("status", "active");

    if (deactivateError) {
      return { error: `Failed to archive old version: ${deactivateError.message}` };
    }

    // Create new business case records
    const { data: newCases, error: insertError } = await supabase
      .from("business_case")
      .insert(newBusinessCaseInserts)
      .select();

    if (insertError || !newCases || newCases.length !== 10) {
      // Rollback: reactivate old records (change back from superseded)
      await supabase
        .from("business_case")
        .update({ status: "active" })
        .eq("business_case_group_id", oldGroupId);
      return { error: `Failed to create new version: ${insertError?.message || "Unknown error"}` };
    }

    // Link new business cases to the same use groups
    const junctionEntries: Array<{
      business_case_id: string;
      formulation_country_use_group_id: string;
    }> = [];

    newCases.forEach((bc) => {
      useGroupIds.forEach((useGroupId) => {
        junctionEntries.push({
          business_case_id: bc.business_case_id,
          formulation_country_use_group_id: useGroupId,
        });
      });
    });

    const { error: junctionError } = await supabase
      .from("business_case_use_groups")
      .insert(junctionEntries);

    if (junctionError) {
      // Rollback: delete new cases and reactivate old ones
      await supabase
        .from("business_case")
        .delete()
        .eq("business_case_group_id", newGroupId);
      await supabase
        .from("business_case")
        .update({ status: "active" })
        .eq("business_case_group_id", oldGroupId);
      return { error: `Failed to link use groups: ${junctionError.message}` };
    }

    return { success: true, data: { business_case_group_id: newGroupId } };
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidateTag("business-cases", "page");
  revalidateTag("formulations", "page");
  revalidatePath("/business-cases");
  revalidatePath("/analytics");
  revalidatePath("/");
  return { success: true, data: result.data };
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

/**
 * Server action to get business case version history (for client components)
 */
export async function getBusinessCaseVersionHistoryAction(useGroupId: string) {
  const { getBusinessCaseVersionHistory } = await import("@/lib/db/queries");
  try {
    const data = await getBusinessCaseVersionHistory(useGroupId);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : "Failed to fetch version history" };
  }
}

