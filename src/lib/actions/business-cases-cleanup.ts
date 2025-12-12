"use server";

import { createClient } from "@/lib/supabase/server";
import { withUserContext } from "@/lib/supabase/user-context";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

interface DuplicateRecord {
  business_case_id: string;
  business_case_group_id: string;
  year_offset: number;
  created_at: string;
  status: string;
  formulation_code?: string;
  country_code?: string;
}

interface DuplicateGroup {
  business_case_group_id: string;
  year_offset: number;
  duplicateCount: number;
  records: DuplicateRecord[];
  mostRecentRecordId: string;
  recordsToSupersede: string[];
}

/**
 * Finds all business case groups with duplicate active records for the same year_offset
 */
export async function findDuplicateActiveBusinessCases(): Promise<{
  duplicates: DuplicateGroup[];
  totalGroupsAffected: number;
  totalRecordsToFix: number;
  error?: string;
}> {
  const canEdit = await hasPermission(PERMISSIONS.BUSINESS_CASE_EDIT);
  if (!canEdit) {
    return {
      duplicates: [],
      totalGroupsAffected: 0,
      totalRecordsToFix: 0,
      error: "Unauthorized: You don't have permission to view business cases",
    };
  }

  const supabase = await createClient();

  // Get all active business cases grouped by business_case_group_id and year_offset
  const { data: allActiveRecords, error: fetchError } = await supabase
    .from("business_case")
    .select(
      "business_case_id, business_case_group_id, year_offset, created_at, status, updated_at",
    )
    .eq("status", "active")
    .order("business_case_group_id", { ascending: true })
    .order("year_offset", { ascending: true })
    .order("created_at", { ascending: false });

  if (fetchError) {
    return {
      duplicates: [],
      totalGroupsAffected: 0,
      totalRecordsToFix: 0,
      error: `Failed to fetch business cases: ${fetchError.message}`,
    };
  }

  if (!allActiveRecords || allActiveRecords.length === 0) {
    return {
      duplicates: [],
      totalGroupsAffected: 0,
      totalRecordsToFix: 0,
    };
  }

  // Group by business_case_group_id + year_offset to find duplicates
  const groupMap = new Map<string, DuplicateRecord[]>();
  for (const record of allActiveRecords) {
    const key = `${record.business_case_group_id}_${record.year_offset}`;
    if (!groupMap.has(key)) {
      groupMap.set(key, []);
    }
    groupMap.get(key)!.push({
      business_case_id: record.business_case_id,
      business_case_group_id: record.business_case_group_id,
      year_offset: record.year_offset,
      created_at: record.created_at,
      status: record.status,
    });
  }

  // Find groups with duplicates (more than 1 record)
  const duplicates: DuplicateGroup[] = [];
  const processedGroups = new Set<string>();

  for (const [key, records] of groupMap.entries()) {
    if (records.length > 1) {
      // Sort by created_at descending (most recent first)
      const sortedRecords = [...records].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      const mostRecent = sortedRecords[0];
      const olderRecords = sortedRecords.slice(1);

      // Get group info for display
      const groupKey = `${mostRecent.business_case_group_id}_${mostRecent.year_offset}`;
      if (!processedGroups.has(groupKey)) {
        processedGroups.add(groupKey);

        // Get formulation and country info for display
        const { data: bcData } = await supabase
          .from("business_case")
          .select(
            "business_case_id, business_case_use_groups(formulation_country_use_group(formulation_country(formulation(formulation_code), country(country_code))))",
          )
          .eq("business_case_id", mostRecent.business_case_id)
          .single();

        let formulationCode: string | undefined;
        let countryCode: string | undefined;

        if (bcData) {
          const useGroups = bcData.business_case_use_groups as any[];
          if (useGroups && useGroups.length > 0) {
            const useGroup = useGroups[0]?.formulation_country_use_group;
            if (useGroup) {
              formulationCode =
                useGroup.formulation_country?.formulation?.formulation_code;
              countryCode = useGroup.formulation_country?.country?.country_code;
            }
          }
        }

        duplicates.push({
          business_case_group_id: mostRecent.business_case_group_id,
          year_offset: mostRecent.year_offset,
          duplicateCount: records.length,
          records: sortedRecords.map((r) => ({
            ...r,
            formulation_code: formulationCode,
            country_code: countryCode,
          })),
          mostRecentRecordId: mostRecent.business_case_id,
          recordsToSupersede: olderRecords.map((r) => r.business_case_id),
        });
      }
    }
  }

  // Group by business_case_group_id to count unique groups
  const uniqueGroups = new Set(
    duplicates.map((d) => d.business_case_group_id),
  );

  const totalRecordsToFix = duplicates.reduce(
    (sum, d) => sum + d.recordsToSupersede.length,
    0,
  );

  return {
    duplicates,
    totalGroupsAffected: uniqueGroups.size,
    totalRecordsToFix,
  };
}

/**
 * Fixes duplicate active business case records by marking older ones as superseded
 */
export async function fixDuplicateActiveBusinessCases(): Promise<{
  success: boolean;
  fixed: number;
  errors: number;
  details: Array<{
    groupId: string;
    yearOffset: number;
    fixed: number;
    error?: string;
  }>;
  error?: string;
}> {
  const canEdit = await hasPermission(PERMISSIONS.BUSINESS_CASE_EDIT);
  if (!canEdit) {
    return {
      success: false,
      fixed: 0,
      errors: 0,
      details: [],
      error: "Unauthorized: You don't have permission to edit business cases",
    };
  }

  // First, find all duplicates
  const { duplicates, error: findError } =
    await findDuplicateActiveBusinessCases();

  if (findError || !duplicates || duplicates.length === 0) {
    return {
      success: true,
      fixed: 0,
      errors: 0,
      details: [],
      error: findError || "No duplicates found",
    };
  }

  const result = await withUserContext(async (supabase) => {
    let totalFixed = 0;
    let totalErrors = 0;
    const details: Array<{
      groupId: string;
      yearOffset: number;
      fixed: number;
      error?: string;
    }> = [];

    // Process each duplicate group
    for (const duplicate of duplicates) {
      try {
        // Mark older records as superseded
        const { data: updatedData, error: updateError } = await supabase
          .from("business_case")
          .update({
            status: "superseded",
            updated_at: new Date().toISOString(),
          })
          .in("business_case_id", duplicate.recordsToSupersede)
          .eq("status", "active")
          .select();

        if (updateError) {
          totalErrors++;
          details.push({
            groupId: duplicate.business_case_group_id,
            yearOffset: duplicate.year_offset,
            fixed: 0,
            error: updateError.message,
          });
        } else {
          const fixedCount = updatedData?.length || 0;
          totalFixed += fixedCount;
          details.push({
            groupId: duplicate.business_case_group_id,
            yearOffset: duplicate.year_offset,
            fixed: fixedCount,
          });
        }
      } catch (error) {
        totalErrors++;
        details.push({
          groupId: duplicate.business_case_group_id,
          yearOffset: duplicate.year_offset,
          fixed: 0,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    return {
      success: true,
      fixed: totalFixed,
      errors: totalErrors,
      details,
    };
  });

  // Revalidate all relevant paths
  revalidatePath("/portfolio/business-cases");
  revalidatePath("/portfolio/analytics");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // No cache to invalidate - direct database queries

  return result;
}

