"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserName } from "@/lib/utils/user-context";
import {
  checkExistingBusinessCase,
  validateUseGroupTargetEntryConsistency,
  getBusinessCaseGroup,
  getFormulations,
  getCountries,
  getBusinessCaseVersionHistory,
} from "@/lib/db/queries";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import { lookupCOGSWithCarryForward } from "./cogs";
import { withUserContext } from "@/lib/supabase/user-context";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";
import { computeBusinessCaseDiff } from "@/lib/utils/business-case-diff";

export async function createBusinessCase(formData: FormData) {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canCreate) {
    return {
      error: "Unauthorized: You don't have permission to create business cases",
    };
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
  const cogsPerUnit = formData.get("cogs_per_unit")
    ? Number(formData.get("cogs_per_unit"))
    : null;
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
    return {
      error:
        "Selected use groups not found for this formulation-country combination",
    };
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

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // No cache to invalidate - direct database queries
  return { data: businessCase, success: true };
}

export async function updateBusinessCase(
  businessCaseId: string,
  formData: FormData,
) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.BUSINESS_CASE_EDIT);
  if (!canEdit) {
    return {
      error: "Unauthorized: You don't have permission to edit business cases",
    };
  }

  const formulationId = formData.get("formulation_id") as string | null;
  const countryId = formData.get("country_id") as string | null;
  const useGroupIds = formData.getAll("use_group_ids") as string[];
  const businessCaseName = formData.get("business_case_name") as string | null;
  const yearOffset = formData.get("year_offset")
    ? Number(formData.get("year_offset"))
    : null;
  const volume = formData.get("volume") ? Number(formData.get("volume")) : null;
  const nsp = formData.get("nsp") ? Number(formData.get("nsp")) : null;
  const cogsPerUnit = formData.get("cogs_per_unit")
    ? Number(formData.get("cogs_per_unit"))
    : null;
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

    if (businessCaseName !== null)
      updateData.business_case_name = businessCaseName;
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
        return {
          error:
            "Selected use groups not found for this formulation-country combination",
        };
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

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // No cache to invalidate - direct database queries
  return { data, success: true };
}

export async function deleteBusinessCase(businessCaseId: string) {
  // Permission check
  const canDelete = await hasPermission(PERMISSIONS.BUSINESS_CASE_DELETE);
  if (!canDelete) {
    return {
      error: "Unauthorized: You don't have permission to delete business cases",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("business_case")
    .delete()
    .eq("business_case_id", businessCaseId);

  if (error) {
    return { error: error.message };
  }

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // No cache to invalidate - direct database queries
  return { success: true };
}

/**
 * Create a new business case group (10 years of data)
 */
export async function createBusinessCaseGroupAction(formData: FormData) {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canCreate) {
    return {
      error: "Unauthorized: You don't have permission to create business cases",
    };
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
    return {
      error:
        "Selected use groups do not have target market entry fiscal year set",
    };
  }

  // Parse target market entry (e.g., "FY26" -> 26)
  const targetYearMatch = targetMarketEntry.match(/FY(\d{2})/);
  if (!targetYearMatch) {
    return {
      error: "Invalid target market entry format. Expected format: FY26",
    };
  }
  const targetYear = parseInt(targetYearMatch[1], 10);

  // Determine effective start fiscal year at creation time
  // If target_market_entry is in the past, start from current fiscal year
  // This preserves the fiscal year context when data was entered
  const effectiveStartYear =
    targetYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : targetYear;
  const effectiveStartFiscalYear = `FY${String(effectiveStartYear).padStart(2, "0")}`;

  // Get change reason from form data
  const changeReason = formData.get("change_reason") as string | null;

  // Check if business case already exists for this combination
  // For now, check the first use group - in the future we might want to check all
  const existingGroupId = await checkExistingBusinessCase(
    formulationId,
    countryId,
    useGroupIds[0],
  );

  // If existing business case found, preserve its effective_start_fiscal_year
  let finalEffectiveStartFiscalYear = effectiveStartFiscalYear;
  let previousGroupId: string | null = null;
  let existingYearData: Array<{
    year_offset: number;
    volume: number | null;
    nsp: number | null;
    cogs_per_unit: number | null;
  }> = [];

  if (existingGroupId) {
    previousGroupId = existingGroupId;

    // Get the existing business case data for diff computation
    const { data: existingCases } = await supabase
      .from("business_case")
      .select(
        "year_offset, volume, nsp, cogs_per_unit, effective_start_fiscal_year",
      )
      .eq("business_case_group_id", existingGroupId)
      .eq("status", "active")
      .order("year_offset", { ascending: true });

    if (existingCases && existingCases.length > 0) {
      existingYearData = existingCases;
      // Preserve the original effective start fiscal year
      if (existingCases[0]?.effective_start_fiscal_year) {
        finalEffectiveStartFiscalYear =
          existingCases[0].effective_start_fiscal_year;
      }
    }

    // Mark old business cases as superseded (archived)
    // Update ALL records in the old group that aren't already superseded
    // This handles edge cases where records might be in "active" or "inactive" status
    const { data: deactivatedData, error: deactivateError } = await supabase
      .from("business_case")
      .update({ status: "superseded", updated_at: new Date().toISOString() })
      .eq("business_case_group_id", existingGroupId)
      .neq("status", "superseded")
      .select();

    if (deactivateError) {
      return {
        error: `Failed to archive old version: ${deactivateError.message}`,
      };
    }

    // Verify that we actually updated some records
    // If no records were updated, it might mean the old group was already superseded
    // or doesn't exist, which is fine - we'll still create the new version
    if (deactivatedData && deactivatedData.length === 0) {
      console.warn(
        `No records found to supersede for group ${existingGroupId} - may already be superseded or not exist`,
      );
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
  const finalEffectiveStartYear = finalStartYearMatch
    ? parseInt(finalStartYearMatch[1], 10)
    : effectiveStartYear;

  for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
    const volumeKey = `year_${yearOffset}_volume`;
    const nspKey = `year_${yearOffset}_nsp`;
    const cogsKey = `year_${yearOffset}_cogs`;

    const volume = formData.get(volumeKey)
      ? Number(formData.get(volumeKey))
      : null;
    const nsp = formData.get(nspKey) ? Number(formData.get(nspKey)) : null;
    const cogsOverride = formData.get(cogsKey)
      ? Number(formData.get(cogsKey))
      : null;

    if (volume === null || nsp === null || volume < 0 || nsp < 0) {
      return {
        error: `Year ${yearOffset}: Volume and NSP (Net Selling Price) are required and cannot be negative. Volume must be in Litres, and NSP must be in Euros per Litre. Use 0 to indicate zero values, or leave blank if there is no data for this year.`,
      };
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
        fiscalYear,
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

  // Compute change summary if this is an update to existing business case
  let changeSummary: string | null = null;
  if (previousGroupId && existingYearData.length > 0) {
    const newYearDataForDiff = yearData.map((y) => ({
      year_offset: y.year_offset,
      volume: y.volume,
      nsp: y.nsp,
      cogs_per_unit: y.cogs_per_unit,
    }));
    changeSummary = computeBusinessCaseDiff(
      existingYearData,
      newYearDataForDiff,
      finalEffectiveStartYear,
    );
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
    // Audit fields
    previous_group_id: previousGroupId,
    change_reason: changeReason || null,
    change_summary: changeSummary,
  }));

  const { data: businessCases, error: bcError } = await supabase
    .from("business_case")
    .insert(businessCaseInserts)
    .select();

  if (bcError || !businessCases || businessCases.length !== 10) {
    return {
      error: bcError?.message || "Failed to create business case group",
    };
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

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // No cache to invalidate - direct database queries
  return { data: { business_case_group_id: groupId }, success: true };
}

/**
 * Create a new version of a business case group (version control)
 * This marks the old version as inactive and creates a new active version.
 * All changes to business cases are tracked as new versions - we never edit in place.
 */
export async function updateBusinessCaseGroupAction(
  oldGroupId: string,
  formData: FormData,
) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.BUSINESS_CASE_EDIT);
  if (!canEdit) {
    return {
      error: "Unauthorized: You don't have permission to edit business cases",
    };
  }

  const supabase = await createClient();
  const userName = await getCurrentUserName();

  // Get change reason from form data
  const changeReason = formData.get("change_reason") as string | null;

  // Extract year data (10 years)
  const yearData: Array<{
    year_offset: number;
    volume: number;
    nsp: number;
  }> = [];

  for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
    const volumeKey = `year_${yearOffset}_volume`;
    const nspKey = `year_${yearOffset}_nsp`;

    const volume = formData.get(volumeKey)
      ? Number(formData.get(volumeKey))
      : null;
    const nsp = formData.get(nspKey) ? Number(formData.get(nspKey)) : null;

    if (volume === null || nsp === null || volume < 0 || nsp < 0) {
      return {
        error: `Year ${yearOffset}: Volume and NSP (Net Selling Price) are required and cannot be negative. Volume must be in Litres, and NSP must be in Euros per Litre. Use 0 to indicate zero values, or leave blank if there is no data for this year.`,
      };
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
  const businessCaseName =
    (formData.get("business_case_name") as string | null) ??
    firstCase.business_case_name;
  const effectiveStartFiscalYear = firstCase.effective_start_fiscal_year;

  // Prepare existing data for diff computation
  const existingYearData = existingCases.map((c) => ({
    year_offset: c.year_offset,
    volume: c.volume,
    nsp: c.nsp,
    cogs_per_unit: c.cogs_per_unit,
  }));

  // Get use group IDs from the junction table
  const { data: useGroupLinks } = await supabase
    .from("business_case_use_groups")
    .select("formulation_country_use_group_id")
    .in(
      "business_case_id",
      existingCases.map((c) => c.business_case_id),
    );

  const useGroupIds = [
    ...new Set(
      useGroupLinks?.map((l) => l.formulation_country_use_group_id) || [],
    ),
  ];

  if (useGroupIds.length === 0) {
    return { error: "No use groups linked to existing business case" };
  }

  // Get formulation_id and formulation_country_id from the first use group
  const { data: useGroupData } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_id, formulation_country(formulation_id)")
    .eq("formulation_country_use_group_id", useGroupIds[0])
    .single();

  const formulationId = (useGroupData?.formulation_country as any)
    ?.formulation_id;
  const formulationCountryId = useGroupData?.formulation_country_id;

  // Generate new group ID for the new version
  const newGroupId = crypto.randomUUID();

  // Parse effective start year for diff computation
  const effectiveMatch = effectiveStartFiscalYear?.match(/FY(\d{2})/);
  const effectiveStartYear = effectiveMatch
    ? parseInt(effectiveMatch[1], 10)
    : CURRENT_FISCAL_YEAR;

  // Create new business case records (new version)
  const newBusinessCaseInsertsPromises = yearData.map(async (year) => {
    // Calculate fiscal year for COGS lookup
    const fiscalYearNum = effectiveStartYear + (year.year_offset - 1);
    const fiscalYear = `FY${String(fiscalYearNum).padStart(2, "0")}`;

    // Check for COGS override from form data
    const cogsOverrideKey = `year_${year.year_offset}_cogs`;
    const cogsOverride = formData.get(cogsOverrideKey)
      ? Number(formData.get(cogsOverrideKey))
      : null;

    // Use override if provided and valid, otherwise lookup COGS
    let cogsValue: number | null = null;
    if (cogsOverride !== null && cogsOverride > 0) {
      cogsValue = cogsOverride;
    } else if (formulationId) {
      cogsValue = await lookupCOGSWithCarryForward(
        formulationId,
        formulationCountryId || null,
        fiscalYear,
      );
    }

    return {
      year_offset: year.year_offset,
      volume: year.volume,
      nsp: year.nsp,
      cogs_per_unit: cogsValue,
    };
  });

  const newYearDataWithCogs = await Promise.all(newBusinessCaseInsertsPromises);

  // Compute change summary
  const changeSummary = computeBusinessCaseDiff(
    existingYearData,
    newYearDataWithCogs,
    effectiveStartYear,
  );

  // Build the final insert objects
  const newBusinessCaseInserts = newYearDataWithCogs.map((year) => ({
    business_case_group_id: newGroupId,
    business_case_name: businessCaseName,
    year_offset: year.year_offset,
    volume: year.volume,
    nsp: year.nsp,
    cogs_per_unit: year.cogs_per_unit,
    effective_start_fiscal_year: effectiveStartFiscalYear,
    status: "active" as const,
    created_by: userName,
    // Audit fields
    previous_group_id: oldGroupId,
    change_reason: changeReason || null,
    change_summary: changeSummary,
  }));

  // Start transaction: mark old as inactive, create new
  const result = await withUserContext(async (supabase) => {
    // Mark old business cases as superseded (archived)
    // Update ALL records in the old group that aren't already superseded
    // This handles edge cases where records might be in "active" or "inactive" status
    const { data: deactivatedData, error: deactivateError } = await supabase
      .from("business_case")
      .update({ status: "superseded", updated_at: new Date().toISOString() })
      .eq("business_case_group_id", oldGroupId)
      .neq("status", "superseded")
      .select();

    if (deactivateError) {
      return {
        error: `Failed to archive old version: ${deactivateError.message}`,
      };
    }

    // Verify that we actually updated some records
    // If no records were updated, it might mean the old group was already superseded
    // or doesn't exist, which is fine - we'll still create the new version
    if (deactivatedData && deactivatedData.length === 0) {
      console.warn(
        `No records found to supersede for group ${oldGroupId} - may already be superseded or not exist`,
      );
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
      return {
        error: `Failed to create new version: ${insertError?.message || "Unknown error"}`,
      };
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

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // No cache to invalidate - direct database queries
  return { success: true, data: result.data };
}

/**
 * Server action to get business case group data (for client components)
 */
export async function getBusinessCaseGroupAction(groupId: string) {
  try {
    const data = await getBusinessCaseGroup(groupId);
    return { data, error: null };
  } catch (error) {
    console.error("getBusinessCaseGroupAction error:", error);
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch business case group",
    };
  }
}

/**
 * Server action to check for existing business case (for client components)
 */
export async function checkExistingBusinessCaseAction(
  formulationId: string,
  countryId: string,
  useGroupId: string,
) {
  try {
    const groupId = await checkExistingBusinessCase(
      formulationId,
      countryId,
      useGroupId,
    );
    return { data: groupId, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to check existing business case",
    };
  }
}

/**
 * Server action to get formulations (for client components)
 */
export async function getFormulationsAction() {
  try {
    const data = await getFormulations();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to fetch formulations",
    };
  }
}

/**
 * Server action to get countries (for client components)
 */
export async function getCountriesAction() {
  try {
    const data = await getCountries();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Failed to fetch countries",
    };
  }
}

/**
 * Server action to get business case version history (for client components)
 */
export async function getBusinessCaseVersionHistoryAction(useGroupId: string) {
  try {
    const data = await getBusinessCaseVersionHistory(useGroupId);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch version history",
    };
  }
}

// ============================================================================
// Business Case Import
// ============================================================================

import type {
  BusinessCaseImportRow,
  BusinessCaseImportRowValidation,
  BusinessCaseImportRowProgress,
  BusinessCaseImportResult,
} from "@/lib/db/types";

/**
 * Validates a single import row by looking up entities and checking data.
 */
async function validateImportRow(
  row: BusinessCaseImportRow,
  rowIndex: number,
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<BusinessCaseImportRowValidation> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required field checks with user-friendly messages
  if (!row.formulation_code?.trim()) {
    errors.push(
      "Formulation Code is missing. Please enter the product formulation code (e.g., 001-01, 302-01).",
    );
  }
  if (!row.country_code?.trim()) {
    errors.push(
      "Country Code is missing. Please enter the 2-letter country code (e.g., FR, IT, CA).",
    );
  }
  if (!row.use_group_variant?.trim()) {
    errors.push(
      'Use Group Variant is missing. Please enter the use group variant code in "001" format (3 digits, e.g., 001, 002).',
    );
  }

  // If basic fields missing, return early
  if (errors.length > 0) {
    return { rowIndex, row, isValid: false, errors, warnings };
  }

  // Lookup formulation by code
  const { data: formulation, error: formError } = await supabase
    .from("formulations")
    .select("formulation_id")
    .eq("formulation_code", row.formulation_code.trim())
    .single();

  if (formError || !formulation) {
    errors.push(
      `Formulation Code "${row.formulation_code}" was not found in the system. Please check the code is correct or add this formulation first.`,
    );
  }

  // Lookup country by code
  const { data: country, error: countryError } = await supabase
    .from("countries")
    .select("country_id")
    .eq("country_code", row.country_code.trim().toUpperCase())
    .single();

  if (countryError || !country) {
    errors.push(
      `Country Code "${row.country_code}" was not found. Please check the 2-letter country code is correct (e.g., FR for France, IT for Italy, CA for Canada).`,
    );
  }

  // If formulation or country not found, can't proceed
  if (!formulation || !country) {
    return { rowIndex, row, isValid: false, errors, warnings };
  }

  // Lookup formulation_country
  const { data: formCountry, error: fcError } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulation.formulation_id)
    .eq("country_id", country.country_id)
    .single();

  if (fcError || !formCountry) {
    errors.push(
      `The formulation "${row.formulation_code}" is not registered for the country "${row.country_code}". Please register this formulation for this country first, or check that the formulation and country codes are correct.`,
    );
    return { rowIndex, row, isValid: false, errors, warnings };
  }

  // Lookup use group
  const { data: useGroup, error: ugError } = await supabase
    .from("formulation_country_use_group")
    .select(
      "formulation_country_use_group_id, target_market_entry_fy, is_active",
    )
    .eq("formulation_country_id", formCountry.formulation_country_id)
    .eq("use_group_variant", row.use_group_variant.trim())
    .single();

  if (ugError || !useGroup) {
    errors.push(
      `Use Group Variant "${row.use_group_variant}" was not found for formulation "${row.formulation_code}" in country "${row.country_code}". Please check the use group variant code is correct (must be in "001" format - 3 digits). You may need to create this use group first.`,
    );
    return { rowIndex, row, isValid: false, errors, warnings };
  }

  if (!useGroup.is_active) {
    warnings.push(
      `Use Group "${row.use_group_variant}" is currently inactive. The import will proceed, but you may want to activate this use group first.`,
    );
  }

  // Check target_market_entry_fy
  const targetMarketEntry =
    row.effective_start_fiscal_year?.trim() || useGroup.target_market_entry_fy;
  if (!targetMarketEntry) {
    errors.push(
      `No Effective Start Fiscal Year was provided and the use group "${row.use_group_variant}" does not have a target market entry year set. Please add an effective_start_fiscal_year column value (format: FY##, e.g., FY26) or set the target market entry year for this use group.`,
    );
    return { rowIndex, row, isValid: false, errors, warnings };
  }

  // Validate fiscal year format
  if (
    row.effective_start_fiscal_year &&
    !/^FY\d{2}$/.test(row.effective_start_fiscal_year.trim())
  ) {
    errors.push(
      `Invalid Effective Start Fiscal Year format: "${row.effective_start_fiscal_year}". The format must be FY followed by 2 digits (e.g., FY26, FY30). Please correct this value.`,
    );
  }

  // Validate year data (10 years of volume and nsp required)
  for (let year = 1; year <= 10; year++) {
    const volumeKey = `year_${year}_volume` as keyof BusinessCaseImportRow;
    const nspKey = `year_${year}_nsp` as keyof BusinessCaseImportRow;

    const volume = row[volumeKey];
    const nsp = row[nspKey];

    if (
      volume === undefined ||
      volume === null ||
      Number.isNaN(Number(volume))
    ) {
      errors.push(
        `Year ${year} Volume is missing or invalid. Please enter a number (0 or greater) in the year_${year}_volume column (in Litres).`,
      );
    } else if (Number(volume) < 0) {
      errors.push(
        `Year ${year} Volume cannot be negative. You entered "${volume}". Please enter a number that is 0 or greater (in Litres).`,
      );
    }

    if (nsp === undefined || nsp === null || Number.isNaN(Number(nsp))) {
      errors.push(
        `Year ${year} NSP (Net Selling Price) is missing or invalid. Please enter a number (0 or greater) in the year_${year}_nsp column (in Euros per Litre).`,
      );
    } else if (Number(nsp) < 0) {
      errors.push(
        `Year ${year} NSP (Net Selling Price) cannot be negative. You entered "${nsp}". Please enter a number that is 0 or greater (in Euros per Litre).`,
      );
    }
  }

  // Check for existing business case (to determine if update)
  const existingGroupId = await checkExistingBusinessCase(
    formulation.formulation_id,
    country.country_id,
    useGroup.formulation_country_use_group_id,
  );

  // If updating existing, change_reason is required
  if (existingGroupId && !row.change_reason?.trim()) {
    errors.push(
      `Change Reason is required because a business case already exists for formulation "${row.formulation_code}", country "${row.country_code}", and use group "${row.use_group_variant}". Please provide a reason for this update in the change_reason column (e.g., "Updated pricing", "LRP December 8th, 2025 Upload").`,
    );
  }

  if (existingGroupId) {
    warnings.push(
      `A business case already exists for this combination. This import will create a new version and archive the previous one. The change reason "${row.change_reason || "not provided"}" will be recorded in the audit log.`,
    );
  }

  return {
    rowIndex,
    row,
    isValid: errors.length === 0,
    errors,
    warnings,
    resolved:
      errors.length === 0
        ? {
            formulation_id: formulation.formulation_id,
            country_id: country.country_id,
            formulation_country_id: formCountry.formulation_country_id,
            formulation_country_use_group_id:
              useGroup.formulation_country_use_group_id,
            target_market_entry_fy: targetMarketEntry,
            existing_business_case_group_id: existingGroupId,
          }
        : undefined,
  };
}

/**
 * Validates all import rows without making changes (dry run).
 */
export async function validateBusinessCaseImport(
  rows: BusinessCaseImportRow[],
): Promise<{ validations: BusinessCaseImportRowValidation[]; error?: string }> {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canCreate) {
    return {
      validations: [],
      error: "Unauthorized: You don't have permission to import business cases",
    };
  }

  const supabase = await createClient();
  const validations: BusinessCaseImportRowValidation[] = [];

  for (let i = 0; i < rows.length; i++) {
    const validation = await validateImportRow(rows[i], i, supabase);
    validations.push(validation);
  }

  return { validations };
}

/**
 * Preview import - simulates import without actually saving to database.
 * Shows what would be created, updated, or fail.
 */
export async function previewBusinessCaseImport(
  rows: BusinessCaseImportRow[],
): Promise<BusinessCaseImportResult> {
  const supabase = await createClient();

  // Step 1: Validate all rows (same as import)
  const rowValidations: BusinessCaseImportRowValidation[] = [];
  for (let i = 0; i < rows.length; i++) {
    const validation = await validateImportRow(rows[i], i, supabase);
    rowValidations.push(validation);
  }

  const validRows = rowValidations.filter((v) => v.isValid);
  const invalidRows = rowValidations.filter((v) => !v.isValid);

  // Initialize progress tracking
  const rowProgress: BusinessCaseImportRowProgress[] = rowValidations.map(
    (v) => ({
      rowIndex: v.rowIndex,
      status: v.isValid ? "valid" : "invalid",
      message: v.isValid ? undefined : v.errors.join("; "),
    }),
  );

  let wouldCreate = 0;
  let wouldUpdate = 0;
  let wouldError = 0;

  // Step 2: Simulate import for valid rows (without actually saving)
  for (const validation of validRows) {
    const { row, rowIndex, resolved } = validation;
    if (!resolved) {
      wouldError++;
      const progressIdx = rowProgress.findIndex((p) => p.rowIndex === rowIndex);
      if (progressIdx >= 0) {
        rowProgress[progressIdx].status = "error";
        rowProgress[progressIdx].message = "Validation resolved data missing";
      }
      continue;
    }

    const progressIdx = rowProgress.findIndex((p) => p.rowIndex === rowIndex);
    if (progressIdx >= 0) {
      rowProgress[progressIdx].status = "importing";
    }

    try {
      // Simulate validation checks that would happen in createBusinessCaseGroupAction
      // Check if this would be an update or create
      const isUpdate = !!resolved.existing_business_case_group_id;

      // Validate year data (simulate what createBusinessCaseGroupAction would check)
      let hasYearError = false;
      for (let year = 1; year <= 10; year++) {
        const volumeKey = `year_${year}_volume` as keyof BusinessCaseImportRow;
        const nspKey = `year_${year}_nsp` as keyof BusinessCaseImportRow;

        const volume = row[volumeKey];
        const nsp = row[nspKey];

        if (
          volume === undefined ||
          volume === null ||
          Number.isNaN(Number(volume)) ||
          Number(volume) < 0
        ) {
          hasYearError = true;
          break;
        }
        if (
          nsp === undefined ||
          nsp === null ||
          Number.isNaN(Number(nsp)) ||
          Number(nsp) < 0
        ) {
          hasYearError = true;
          break;
        }
      }

      if (hasYearError) {
        wouldError++;
        if (progressIdx >= 0) {
          rowProgress[progressIdx].status = "error";
          rowProgress[progressIdx].message =
            "Year data validation would fail: Volume and NSP must be 0 or greater (cannot be negative)";
        }
      } else {
        // Simulate successful import
        if (isUpdate) {
          wouldUpdate++;
          if (progressIdx >= 0) {
            rowProgress[progressIdx].status = "updated";
            rowProgress[progressIdx].message =
              "Would create new version (existing business case would be archived)";
          }
        } else {
          wouldCreate++;
          if (progressIdx >= 0) {
            rowProgress[progressIdx].status = "created";
            rowProgress[progressIdx].message = "Would create new business case";
          }
        }
      }
    } catch (error) {
      wouldError++;
      if (progressIdx >= 0) {
        rowProgress[progressIdx].status = "error";
        rowProgress[progressIdx].message =
          error instanceof Error ? error.message : "Preview simulation failed";
      }
    }
  }

  return {
    totalRows: rows.length,
    validRows: validRows.length,
    invalidRows: invalidRows.length,
    created: wouldCreate,
    updated: wouldUpdate,
    skipped: 0,
    errors: wouldError,
    rowValidations,
    rowProgress,
  };
}

/**
 * Imports business cases from validated rows.
 * Creates new business cases or new versions of existing ones.
 */
export async function importBusinessCases(
  rows: BusinessCaseImportRow[],
): Promise<BusinessCaseImportResult> {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canCreate) {
    return {
      totalRows: rows.length,
      validRows: 0,
      invalidRows: rows.length,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: 0,
      rowValidations: [],
      rowProgress: [],
      error: "Unauthorized: You don't have permission to import business cases",
    };
  }

  const supabase = await createClient();
  const userName = await getCurrentUserName();

  // Step 1: Validate all rows
  const rowValidations: BusinessCaseImportRowValidation[] = [];
  for (let i = 0; i < rows.length; i++) {
    const validation = await validateImportRow(rows[i], i, supabase);
    rowValidations.push(validation);
  }

  const validRows = rowValidations.filter((v) => v.isValid);
  const invalidRows = rowValidations.filter((v) => !v.isValid);

  // Initialize progress tracking
  const rowProgress: BusinessCaseImportRowProgress[] = rowValidations.map(
    (v) => ({
      rowIndex: v.rowIndex,
      status: v.isValid ? "valid" : "invalid",
      message: v.isValid ? undefined : v.errors.join("; "),
    }),
  );

  let created = 0;
  let updated = 0;
  let importErrors = 0;

  // Step 2: Import valid rows
  for (const validation of validRows) {
    const { row, rowIndex, resolved } = validation;
    if (!resolved) continue;

    const progressIdx = rowProgress.findIndex((p) => p.rowIndex === rowIndex);
    if (progressIdx >= 0) {
      rowProgress[progressIdx].status = "importing";
    }

    try {
      // Build FormData for createBusinessCaseGroupAction
      const formData = new FormData();
      formData.append("formulation_id", resolved.formulation_id);
      formData.append("country_id", resolved.country_id);
      formData.append(
        "use_group_ids",
        resolved.formulation_country_use_group_id,
      );

      if (row.business_case_name?.trim()) {
        formData.append("business_case_name", row.business_case_name.trim());
      }
      if (row.change_reason?.trim()) {
        formData.append("change_reason", row.change_reason.trim());
      }

      // Add year data
      for (let year = 1; year <= 10; year++) {
        const volumeKey = `year_${year}_volume` as keyof BusinessCaseImportRow;
        const nspKey = `year_${year}_nsp` as keyof BusinessCaseImportRow;
        const cogsKey = `year_${year}_cogs` as keyof BusinessCaseImportRow;

        // Preserve 0 values explicitly (validation ensures these values exist)
        const volume = row[volumeKey] ?? 0;
        const nsp = row[nspKey] ?? 0;
        formData.append(`year_${year}_volume`, String(volume));
        formData.append(`year_${year}_nsp`, String(nsp));

        const cogsValue = row[cogsKey];
        if (
          cogsValue !== undefined &&
          cogsValue !== null &&
          Number(cogsValue) > 0
        ) {
          formData.append(`year_${year}_cogs`, String(cogsValue));
        }
      }

      // Call existing create action (handles both create and update)
      const result = await createBusinessCaseGroupAction(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      // Track success
      const isUpdate = !!resolved.existing_business_case_group_id;
      if (isUpdate) {
        updated++;
        rowProgress[progressIdx].status = "updated";
        rowProgress[progressIdx].message = "New version created";
      } else {
        created++;
        rowProgress[progressIdx].status = "created";
        rowProgress[progressIdx].message = "Business case created";
      }
      rowProgress[progressIdx].businessCaseGroupId =
        result.data?.business_case_group_id;
    } catch (error) {
      importErrors++;
      if (progressIdx >= 0) {
        rowProgress[progressIdx].status = "error";
        rowProgress[progressIdx].message =
          error instanceof Error ? error.message : "Import failed";
      }
    }
  }

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // No cache to invalidate - direct database queries

  return {
    totalRows: rows.length,
    validRows: validRows.length,
    invalidRows: invalidRows.length,
    created,
    updated,
    skipped: 0,
    errors: importErrors,
    rowValidations,
    rowProgress,
  };
}

/**
 * Exports business cases to CSV format matching the import template.
 * Returns CSV string that can be downloaded.
 */
export async function exportBusinessCasesToCSV(
  businessCaseGroups: Array<{
    formulation_code: string | null;
    country_code: string;
    use_group_variant: string | null;
    effective_start_fiscal_year: string | null;
    business_case_name?: string | null;
    change_reason?: string | null;
    years_data: Record<
      string,
      {
        volume: number | null;
        nsp: number | null;
        cogs_per_unit: number | null;
      }
    >;
  }>,
): Promise<string> {
  // Permission check
  const canView = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canView) {
    throw new Error(
      "Unauthorized: You don't have permission to export business cases",
    );
  }

  const headers = [
    "formulation_code",
    "country_code",
    "use_group_variant",
    "effective_start_fiscal_year",
    "business_case_name",
    "change_reason",
    ...Array.from({ length: 10 }, (_, i) => [
      `year_${i + 1}_volume`,
      `year_${i + 1}_nsp`,
      `year_${i + 1}_cogs`,
    ]).flat(),
  ];

  const rows: string[] = [];

  for (const group of businessCaseGroups) {
    const row: string[] = [
      group.formulation_code || "",
      group.country_code || "",
      group.use_group_variant || "",
      group.effective_start_fiscal_year || "",
      group.business_case_name || "",
      group.change_reason || "",
    ];

    // Calculate fiscal years for years 1-10 based on effective_start_fiscal_year
    let startYear = CURRENT_FISCAL_YEAR;
    if (group.effective_start_fiscal_year) {
      const match = group.effective_start_fiscal_year.match(/FY(\d{2})/);
      if (match) {
        startYear = parseInt(match[1], 10);
      }
    }

    // Add year data (years 1-10) - years_data is keyed by fiscal year strings like "FY26"
    for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
      const fiscalYearNum = startYear + (yearOffset - 1);
      const fiscalYearStr = `FY${String(fiscalYearNum).padStart(2, "0")}`;
      const yearData = group.years_data[fiscalYearStr];

      if (yearData) {
        row.push(String(yearData.volume || ""));
        row.push(String(yearData.nsp || ""));
        row.push(String(yearData.cogs_per_unit || ""));
      } else {
        row.push("", "", "");
      }
    }

    rows.push(
      row
        .map((cell) => {
          // Escape commas and quotes in CSV
          if (cell.includes(",") || cell.includes('"') || cell.includes("\n")) {
            return `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(","),
    );
  }

  return [headers.join(","), ...rows].join("\n");
}

/**
 * Generates a CSV template with example rows showing how to import
 * the same formulation across multiple countries.
 * Returns CSV string that can be downloaded.
 */
export async function generateBusinessCaseImportTemplate(): Promise<string> {
  // Permission check
  const canView = await hasPermission(PERMISSIONS.BUSINESS_CASE_CREATE);
  if (!canView) {
    throw new Error(
      "Unauthorized: You don't have permission to download templates",
    );
  }

  const headers = [
    "formulation_code",
    "country_code",
    "use_group_variant",
    "effective_start_fiscal_year",
    "business_case_name",
    "change_reason",
    ...Array.from({ length: 10 }, (_, i) => [
      `year_${i + 1}_volume`,
      `year_${i + 1}_nsp`,
      `year_${i + 1}_cogs`,
    ]).flat(),
  ];

  // Generate example rows showing the same formulation in different countries
  // This demonstrates that each row = one formulation-country-use_group combination
  const exampleRows = [
    // Row 1: Ireland
    [
      "323-01", // formulation_code
      "IE", // country_code
      "001", // use_group_variant
      "FY26", // effective_start_fiscal_year
      "Ireland Market Expansion", // business_case_name
      "Initial import", // change_reason
      ...Array.from({ length: 10 }, (_, i) => [
        String(50000 + i * 5000), // volume (increasing)
        String(12.5 + i * 0.25), // nsp (increasing)
        "", // cogs (optional - auto-looked up if empty)
      ]).flat(),
    ],
    // Row 2: UK - same formulation, different country
    [
      "323-01", // Same formulation_code
      "UK", // Different country_code
      "001", // use_group_variant
      "FY26", // effective_start_fiscal_year
      "UK Market Entry", // business_case_name
      "Initial import", // change_reason
      ...Array.from({ length: 10 }, (_, i) => [
        String(30000 + i * 3000), // Different volume
        String(13.0 + i * 0.3), // Different nsp
        "", // cogs (optional)
      ]).flat(),
    ],
    // Row 3: Germany - same formulation, different country
    [
      "323-01", // Same formulation_code
      "DE", // Different country_code
      "001", // use_group_variant
      "FY26", // effective_start_fiscal_year
      "Germany Market", // business_case_name
      "Initial import", // change_reason
      ...Array.from({ length: 10 }, (_, i) => [
        String(40000 + i * 4000), // Different volume
        String(12.75 + i * 0.25), // Different nsp
        "", // cogs (optional)
      ]).flat(),
    ],
  ];

  // Format rows with proper CSV escaping
  const formattedRows = exampleRows.map((row) =>
    row
      .map((cell) => {
        // Escape commas and quotes in CSV
        const cellStr = String(cell);
        if (
          cellStr.includes(",") ||
          cellStr.includes('"') ||
          cellStr.includes("\n")
        ) {
          return `"${cellStr.replace(/"/g, '""')}"`;
        }
        return cellStr;
      })
      .join(","),
  );

  // Add comment rows to explain the format
  const commentRows = [
    "# Business Case Import Template",
    "# Each row represents ONE formulation-country-use_group combination",
    "# You can import the same formulation across multiple countries by adding multiple rows",
    "# Example: Rows 1-3 show formulation '323-01' in Ireland, UK, and Germany",
    "#",
    "# REQUIRED FORMAT:",
    "#   use_group_variant: Must be zero-padded (e.g. '001' '002' NOT '1' or '2')",
    "#   All monetary values: EUR only (no currency conversion)",
    "#   All volume values: Litres or KG (base units)",
    "#   Volume and NSP: Must be 0 or greater (negative values will be rejected)",
    "#   change_reason: Required when updating existing business cases",
    "#",
    "# Required fields: formulation_code, country_code, use_group_variant, year_1-10_volume, year_1-10_nsp",
    "# Optional fields: effective_start_fiscal_year, business_case_name, change_reason, year_N_cogs",
    "#",
  ];

  return [...commentRows, headers.join(","), ...formattedRows].join("\n");
}
