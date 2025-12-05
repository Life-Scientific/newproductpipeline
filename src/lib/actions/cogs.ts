"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserName } from "@/lib/utils/user-context";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

/**
 * Helper: Validate COGS breakdown for a single year
 */
function validateYearBreakdown(
  total: number | null,
  raw: number | null,
  mfg: number | null,
  pkg: number | null,
  other: number | null,
  yearLabel: string
): string | null {
  if (total === null || total <= 0) {
    return `${yearLabel}: Total COGS is required and must be greater than 0`;
  }

  const hasAnyBreakdown = raw !== null || mfg !== null || pkg !== null || other !== null;

  if (hasAnyBreakdown) {
    // If ANY breakdown field provided, ALL must be provided
    if (raw === null || mfg === null || pkg === null || other === null) {
      return `${yearLabel}: All breakdown fields (Raw Materials, Manufacturing, Packaging, Other) must be provided when any breakdown is entered`;
    }

    // Must sum to total (within tolerance)
    const sum = raw + mfg + pkg + other;
    if (Math.abs(sum - total) > 0.01) {
      return `${yearLabel}: Breakdown costs (${sum.toFixed(2)}) must equal Total COGS (${total.toFixed(2)})`;
    }
  }

  return null; // Valid
}

/**
 * Helper: Get available COGS fiscal years for a formulation+country
 */
async function getAvailableCOGSFiscalYears(
  formulationId: string,
  countryId: string | null
): Promise<string[]> {
  const supabase = await createClient();

  const query = supabase
    .from("cogs")
    .select("fiscal_year")
    .eq("formulation_id", formulationId)
    .eq("status", "active")
    .order("fiscal_year");

  if (countryId) {
    query.eq("formulation_country_id", countryId);
  } else {
    query.is("formulation_country_id", null);
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  return data.map((row) => row.fiscal_year).filter(Boolean) as string[];
}

/**
 * Helper: Lookup COGS value for a specific fiscal year
 * Priority: country-specific > global
 */
export async function lookupCOGSForBusinessCase(
  formulationId: string,
  countryId: string | null,
  fiscalYear: string
): Promise<number | null> {
  const supabase = await createClient();

  // Build query with priority: country-specific first, then global
  const query = supabase
    .from("cogs")
    .select("cogs_value, formulation_country_id")
    .eq("formulation_id", formulationId)
    .eq("fiscal_year", fiscalYear)
    .eq("status", "active");

  if (countryId) {
    // Look for country-specific or global, prioritize country-specific
    query.or(`formulation_country_id.eq.${countryId},formulation_country_id.is.null`);
  } else {
    // Only global
    query.is("formulation_country_id", null);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return null;
  }

  // If we have multiple results, prefer country-specific over global
  if (data.length > 1 && countryId) {
    const countrySpecific = data.find((row) => row.formulation_country_id === countryId);
    if (countrySpecific) {
      return countrySpecific.cogs_value;
    }
  }

  return data[0].cogs_value;
}

/**
 * Helper: Lookup COGS with carry-forward logic
 * If exact fiscal year not found, use the last available COGS year
 */
export async function lookupCOGSWithCarryForward(
  formulationId: string,
  countryId: string | null,
  fiscalYear: string
): Promise<number | null> {
  // Try exact match first
  let cogsValue = await lookupCOGSForBusinessCase(formulationId, countryId, fiscalYear);

  if (cogsValue !== null) {
    return cogsValue;
  }

  // Carry-forward: Use last available COGS year
  const availableYears = await getAvailableCOGSFiscalYears(formulationId, countryId);

  if (availableYears.length === 0) {
    return null;
  }

  // Sort years and get the last one
  const sortedYears = availableYears.sort();
  const lastYear = sortedYears[sortedYears.length - 1];

  // If requested year is before our earliest COGS, don't carry forward
  if (fiscalYear < sortedYears[0]) {
    return null;
  }

  return await lookupCOGSForBusinessCase(formulationId, countryId, lastYear);
}

/**
 * Create a new COGS group (5 years of COGS data)
 */
export async function createCOGSGroupAction(formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.COGS_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage COGS data" };
  }

  const supabase = await createClient();
  const userName = await getCurrentUserName();

  const formulationId = formData.get("formulation_id") as string | null;
  const formulationCountryId = formData.get("formulation_country_id") as string | null;

  if (!formulationId) {
    return { error: "Formulation is required" };
  }

  // Check for existing COGS group
  const existingGroupId = await checkExistingCOGSGroup(
    formulationId,
    formulationCountryId
  );

  if (existingGroupId) {
    return { data: { cogs_group_id: existingGroupId }, exists: true };
  }

  // Extract and validate 5 years of data
  const fiscalYearStart = CURRENT_FISCAL_YEAR;
  const yearData: Array<{
    fiscal_year: string;
    total: number;
    raw: number | null;
    mfg: number | null;
    pkg: number | null;
    other: number | null;
  }> = [];

  for (let offset = 0; offset < 5; offset++) {
    const yearNum = fiscalYearStart + offset;
    const fiscalYear = `FY${String(yearNum).padStart(2, "0")}`;

    const total = formData.get(`year_${offset + 1}_total`)
      ? Number(formData.get(`year_${offset + 1}_total`))
      : null;
    const raw = formData.get(`year_${offset + 1}_raw`)
      ? Number(formData.get(`year_${offset + 1}_raw`))
      : null;
    const mfg = formData.get(`year_${offset + 1}_mfg`)
      ? Number(formData.get(`year_${offset + 1}_mfg`))
      : null;
    const pkg = formData.get(`year_${offset + 1}_pkg`)
      ? Number(formData.get(`year_${offset + 1}_pkg`))
      : null;
    const other = formData.get(`year_${offset + 1}_other`)
      ? Number(formData.get(`year_${offset + 1}_other`))
      : null;

    // Validate this year
    const validationError = validateYearBreakdown(total, raw, mfg, pkg, other, fiscalYear);
    if (validationError) {
      return { error: validationError };
    }

    yearData.push({ fiscal_year: fiscalYear, total: total!, raw, mfg, pkg, other });
  }

  // Generate a single UUID for the group
  const groupId = crypto.randomUUID();

  // Create 5 COGS records
  const cogsInserts = yearData.map((year) => ({
    cogs_group_id: groupId,
    formulation_id: formulationId,
    formulation_country_id: formulationCountryId || null,
    fiscal_year: year.fiscal_year,
    cogs_value: year.total,
    raw_material_cost: year.raw,
    manufacturing_cost: year.mfg,
    packaging_cost: year.pkg,
    other_costs: year.other,
    status: "active" as const,
    created_by: userName,
  }));

  const { data: cogsRecords, error: cogsError } = await supabase
    .from("cogs")
    .insert(cogsInserts)
    .select();

  if (cogsError || !cogsRecords || cogsRecords.length !== 5) {
    return { error: cogsError?.message || "Failed to create COGS group" };
  }

  revalidatePath("/portfolio/cogs");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio");
  return { data: { cogs_group_id: groupId }, success: true };
}

/**
 * Update an existing COGS group (versioning + cascade)
 */
export async function updateCOGSGroupAction(groupId: string, formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.COGS_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage COGS data" };
  }

  const supabase = await createClient();
  const userName = await getCurrentUserName();

  // Get old COGS group info
  const { data: oldCOGS, error: fetchError } = await supabase
    .from("cogs")
    .select("formulation_id, formulation_country_id, fiscal_year")
    .eq("cogs_group_id", groupId)
    .eq("status", "active")
    .order("fiscal_year");

  if (fetchError || !oldCOGS || oldCOGS.length === 0) {
    return { error: "COGS group not found" };
  }

  const formulationId = oldCOGS[0].formulation_id;
  const formulationCountryId = oldCOGS[0].formulation_country_id;

  // Extract and validate new data
  const yearData: Array<{
    fiscal_year: string;
    total: number;
    raw: number | null;
    mfg: number | null;
    pkg: number | null;
    other: number | null;
  }> = [];

  // Use the fiscal years from the old COGS group
  for (let i = 0; i < oldCOGS.length; i++) {
    const fiscalYear = oldCOGS[i].fiscal_year;

    const total = formData.get(`year_${i + 1}_total`)
      ? Number(formData.get(`year_${i + 1}_total`))
      : null;
    const raw = formData.get(`year_${i + 1}_raw`)
      ? Number(formData.get(`year_${i + 1}_raw`))
      : null;
    const mfg = formData.get(`year_${i + 1}_mfg`)
      ? Number(formData.get(`year_${i + 1}_mfg`))
      : null;
    const pkg = formData.get(`year_${i + 1}_pkg`)
      ? Number(formData.get(`year_${i + 1}_pkg`))
      : null;
    const other = formData.get(`year_${i + 1}_other`)
      ? Number(formData.get(`year_${i + 1}_other`))
      : null;

    const validationError = validateYearBreakdown(total, raw, mfg, pkg, other, fiscalYear);
    if (validationError) {
      return { error: validationError };
    }

    yearData.push({ fiscal_year: fiscalYear, total: total!, raw, mfg, pkg, other });
  }

  // Mark old COGS group as inactive
  const { error: inactiveError } = await supabase
    .from("cogs")
    .update({ status: "inactive", updated_at: new Date().toISOString() })
    .eq("cogs_group_id", groupId);

  if (inactiveError) {
    return { error: `Failed to deactivate old COGS: ${inactiveError.message}` };
  }

  // Create new COGS group
  const newGroupId = crypto.randomUUID();

  const newCogsInserts = yearData.map((year) => ({
    cogs_group_id: newGroupId,
    formulation_id: formulationId,
    formulation_country_id: formulationCountryId,
    fiscal_year: year.fiscal_year,
    cogs_value: year.total,
    raw_material_cost: year.raw,
    manufacturing_cost: year.mfg,
    packaging_cost: year.pkg,
    other_costs: year.other,
    status: "active" as const,
    created_by: userName,
  }));

  const { error: createError } = await supabase
    .from("cogs")
    .insert(newCogsInserts);

  if (createError) {
    // Rollback: reactivate old COGS
    await supabase
      .from("cogs")
      .update({ status: "active" })
      .eq("cogs_group_id", groupId);
    return { error: `Failed to create new COGS: ${createError.message}` };
  }

  // Cascade update to business cases
  const cascadeResult = await cascadeBusinessCaseUpdatesFromCOGS(
    formulationId,
    formulationCountryId
  );

  if (cascadeResult.error) {
    console.error("Cascade update failed:", cascadeResult.error);
    // Don't fail the whole operation, just log it
  }

  revalidatePath("/portfolio/cogs");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio");
  return {
    data: { cogs_group_id: newGroupId, business_cases_updated: cascadeResult.count },
    success: true,
  };
}

/**
 * Cascade updates to business cases when COGS changes
 */
async function cascadeBusinessCaseUpdatesFromCOGS(
  formulationId: string,
  formulationCountryId: string | null
): Promise<{ count: number; error?: string }> {
  const supabase = await createClient();
  const userName = await getCurrentUserName();

  // Find all active business case groups for this formulation+country
  const { data: businessCases, error: fetchError } = await supabase
    .from("vw_business_case_projections")
    .select("business_case_group_id, formulation_id, country_id")
    .eq("formulation_id", formulationId)
    .eq("status", "active");

  if (fetchError) {
    return { count: 0, error: fetchError.message };
  }

  if (!businessCases || businessCases.length === 0) {
    return { count: 0 }; // No business cases to update
  }

  // Filter to matching country
  const matchingBCs = businessCases.filter((bc) => {
    // Need to check if bc.country_id matches the formulation_country_id
    // This requires joining through formulation_country table
    return true; // For now, update all business cases for this formulation
  });

  // Get unique group IDs
  const groupIds = Array.from(
    new Set(matchingBCs.map((bc) => bc.business_case_group_id).filter(Boolean))
  );

  let updatedCount = 0;

  for (const groupId of groupIds) {
    // Fetch all 10 business case records for this group
    const { data: bcRecords, error: bcError } = await supabase
      .from("business_case")
      .select("*")
      .eq("business_case_group_id", groupId)
      .eq("status", "active")
      .order("year_offset");

    if (bcError || !bcRecords || bcRecords.length === 0) {
      continue;
    }

    // Mark old business cases as inactive
    const { error: inactiveError } = await supabase
      .from("business_case")
      .update({ status: "inactive", updated_at: new Date().toISOString() })
      .eq("business_case_group_id", groupId);

    if (inactiveError) {
      console.error(`Failed to deactivate business case group ${groupId}:`, inactiveError);
      continue;
    }

    // Create new business case group with updated COGS
    const newGroupId = crypto.randomUUID();
    const newBCInserts = [];

    for (const bc of bcRecords) {
      // Calculate fiscal year for this business case year
      const effectiveStartFY = bc.effective_start_fiscal_year;
      if (!effectiveStartFY) continue;

      const match = effectiveStartFY.match(/FY(\d{2})/);
      if (!match) continue;

      const startYear = parseInt(match[1], 10);
      const fiscalYear = `FY${String(startYear + bc.year_offset - 1).padStart(2, "0")}`;

      // Lookup new COGS value with carry-forward
      const newCOGSValue = await lookupCOGSWithCarryForward(
        formulationId,
        formulationCountryId,
        fiscalYear
      );

      newBCInserts.push({
        business_case_group_id: newGroupId,
        business_case_name: bc.business_case_name,
        year_offset: bc.year_offset,
        volume: bc.volume,
        nsp: bc.nsp,
        cogs_per_unit: newCOGSValue,
        effective_start_fiscal_year: bc.effective_start_fiscal_year,
        status: "active" as const,
        created_by: userName,
      });
    }

    // Insert new business cases
    const { error: insertError } = await supabase
      .from("business_case")
      .insert(newBCInserts);

    if (insertError) {
      console.error(`Failed to create new business case group:`, insertError);
      continue;
    }

    // Copy use group linkages
    const { data: oldUseGroups } = await supabase
      .from("business_case_use_groups")
      .select("formulation_country_use_group_id")
      .in(
        "business_case_id",
        bcRecords.map((bc) => bc.business_case_id)
      );

    if (oldUseGroups && oldUseGroups.length > 0) {
      // Get new business case IDs
      const { data: newBCRecords } = await supabase
        .from("business_case")
        .select("business_case_id")
        .eq("business_case_group_id", newGroupId);

      if (newBCRecords) {
        const useGroupInserts = newBCRecords.flatMap((bc) =>
          oldUseGroups.map((ug) => ({
            business_case_id: bc.business_case_id,
            formulation_country_use_group_id: ug.formulation_country_use_group_id,
          }))
        );

        await supabase.from("business_case_use_groups").insert(useGroupInserts);
      }
    }

    updatedCount++;
  }

  return { count: updatedCount };
}

/**
 * Get COGS group data
 */
export async function getCOGSGroupAction(groupId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("vw_cogs")
    .select("*")
    .eq("cogs_group_id", groupId)
    .order("fiscal_year");

  if (error) {
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

/**
 * Check if COGS group already exists for formulation+country
 */
export async function checkExistingCOGSGroupAction(
  formulationId: string,
  countryId: string | null
) {
  const groupId = await checkExistingCOGSGroup(formulationId, countryId);
  return { data: groupId, error: null };
}

/**
 * Helper: Check for existing COGS group
 */
async function checkExistingCOGSGroup(
  formulationId: string,
  countryId: string | null
): Promise<string | null> {
  const supabase = await createClient();

  const query = supabase
    .from("cogs")
    .select("cogs_group_id")
    .eq("formulation_id", formulationId)
    .eq("status", "active")
    .limit(1);

  if (countryId) {
    query.eq("formulation_country_id", countryId);
  } else {
    query.is("formulation_country_id", null);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return null;
  }

  return data[0].cogs_group_id;
}

// Legacy functions for backward compatibility (can be removed later)
export async function createCOGS(formData: FormData) {
  return { error: "This function is deprecated. Use createCOGSGroupAction instead." };
}

export async function updateCOGS(cogsId: string, formData: FormData) {
  return { error: "This function is deprecated. Use updateCOGSGroupAction instead." };
}

export async function deleteCOGS(cogsId: string) {
  return { error: "Deletion is not allowed. Updates create new versions automatically." };
}
