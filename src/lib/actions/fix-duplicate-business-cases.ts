"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Finds and fixes duplicate active business case records.
 * For each group with multiple active records, keeps only the most recent one active
 * and marks all others as superseded.
 */
export async function fixDuplicateBusinessCases(): Promise<{
  success: boolean;
  message: string;
  fixed: number;
  duplicates: Array<{
    groupId: string;
    formulationCode: string;
    countryCode: string;
    useGroupVariant: string;
    activeCount: number;
    keptVersion: string;
    supersededVersions: string[];
  }>;
}> {
  const supabase = await createClient();

  try {
    // Find all business case groups that have multiple active records
    // Group by business_case_group_id and count active records
    const { data: allActiveRecords, error: fetchError } = await supabase
      .from("business_case")
      .select(
        "business_case_id, business_case_group_id, created_at, updated_at, status, formulation_country_use_groups(formulation_country_use_group_id, formulation_country_use_group(formulation_country_id, formulation_country(formulation_id, formulation_code), country_id, country(country_code)), use_group_variant)",
      )
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (fetchError) {
      return {
        success: false,
        message: `Failed to fetch business cases: ${fetchError.message}`,
        fixed: 0,
        duplicates: [],
      };
    }

    if (!allActiveRecords || allActiveRecords.length === 0) {
      return {
        success: true,
        message: "No active business cases found.",
        fixed: 0,
        duplicates: [],
      };
    }

    // Group by business_case_group_id
    const groupsMap = new Map<
      string,
      Array<{
        business_case_id: string;
        business_case_group_id: string;
        created_at: string;
        updated_at: string;
        status: string;
      }>
    >();

    allActiveRecords.forEach((record) => {
      const groupId = record.business_case_group_id;
      if (!groupId) return;

      if (!groupsMap.has(groupId)) {
        groupsMap.set(groupId, []);
      }
      groupsMap.get(groupId)!.push({
        business_case_id: record.business_case_id,
        business_case_group_id: groupId,
        created_at: record.created_at,
        updated_at: record.updated_at,
        status: record.status,
      });
    });

    // Find groups with duplicates (more than 10 records - should only have 10 per group)
    const duplicateGroups: Array<{
      groupId: string;
      records: Array<{
        business_case_id: string;
        created_at: string;
        updated_at: string;
      }>;
    }> = [];

    groupsMap.forEach((records, groupId) => {
      if (records.length > 10) {
        // Group by year_offset to find duplicates for same year
        const byYearOffset = new Map<
          number,
          Array<{
            business_case_id: string;
            created_at: string;
            updated_at: string;
          }>
        >();

        // We need to get year_offset - let's fetch it
        duplicateGroups.push({
          groupId,
          records: records.map((r) => ({
            business_case_id: r.business_case_id,
            created_at: r.created_at,
            updated_at: r.updated_at,
          })),
        });
      }
    });

    // Actually, let's use a better approach - find groups with duplicate year_offsets
    // Get all active records with year_offset
    const { data: recordsWithYear, error: yearError } = await supabase
      .from("business_case")
      .select("business_case_id, business_case_group_id, year_offset, created_at, updated_at")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (yearError) {
      return {
        success: false,
        message: `Failed to fetch business cases with year_offset: ${yearError.message}`,
        fixed: 0,
        duplicates: [],
      };
    }

    // Group by (business_case_group_id, year_offset) to find duplicates
    const duplicateMap = new Map<
      string,
      Array<{
        business_case_id: string;
        year_offset: number;
        created_at: string;
        updated_at: string;
      }>
    >();

    recordsWithYear?.forEach((record) => {
      if (!record.business_case_group_id || record.year_offset === null) return;
      const key = `${record.business_case_group_id}_${record.year_offset}`;
      if (!duplicateMap.has(key)) {
        duplicateMap.set(key, []);
      }
      duplicateMap.get(key)!.push({
        business_case_id: record.business_case_id,
        year_offset: record.year_offset,
        created_at: record.created_at,
        updated_at: record.updated_at,
      });
    });

    // Find actual duplicates (more than 1 record for same group+year)
    const duplicatesToFix: Array<{
      groupId: string;
      yearOffset: number;
      records: Array<{
        business_case_id: string;
        created_at: string;
        updated_at: string;
      }>;
    }> = [];

    duplicateMap.forEach((records, key) => {
      if (records.length > 1) {
        const [groupId, yearOffsetStr] = key.split("_");
        const yearOffset = parseInt(yearOffsetStr, 10);
        duplicatesToFix.push({
          groupId,
          yearOffset,
          records: records.sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
          ), // Most recent first
        });
      }
    });

    if (duplicatesToFix.length === 0) {
      return {
        success: true,
        message: "No duplicate active records found.",
        fixed: 0,
        duplicates: [],
      };
    }

    // Group by business_case_group_id to fix all duplicates in a group together
    const groupsToFix = new Map<
      string,
      Array<{
        yearOffset: number;
        records: Array<{
          business_case_id: string;
          created_at: string;
          updated_at: string;
        }>;
      }>
    >();

    duplicatesToFix.forEach((dup) => {
      if (!groupsToFix.has(dup.groupId)) {
        groupsToFix.set(dup.groupId, []);
      }
      groupsToFix.get(dup.groupId)!.push({
        yearOffset: dup.yearOffset,
        records: dup.records,
      });
    });

    // Fix duplicates: keep most recent, mark others as superseded
    // Strategy: For each group, find the most recent complete set (all 10 years) and keep that active
    // Mark all older records as superseded
    let totalFixed = 0;
    const fixedDuplicates: Array<{
      groupId: string;
      formulationCode: string;
      countryCode: string;
      useGroupVariant: string;
      activeCount: number;
      keptVersion: string;
      supersededVersions: string[];
    }> = [];

    // Get unique group IDs
    const uniqueGroupIds = Array.from(groupsToFix.keys());

    for (const groupId of uniqueGroupIds) {
      // Get all active records for this group with their info
      const { data: groupRecords, error: groupError } = await supabase
        .from("business_case")
        .select(
          "business_case_id, year_offset, created_at, updated_at, business_case_use_groups(formulation_country_use_group_id, formulation_country_use_group(formulation_country_id, formulation_country(formulation_id, formulation_code), country_id, country(country_code)), use_group_variant)",
        )
        .eq("business_case_group_id", groupId)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (groupError || !groupRecords || groupRecords.length === 0) {
        console.error(`Failed to fetch records for group ${groupId}:`, groupError);
        continue;
      }

      // Get formulation/country info from first record
      const firstRecord = groupRecords[0];
      const formulationCode =
        (firstRecord as any)?.business_case_use_groups?.[0]
          ?.formulation_country_use_group?.formulation_country?.formulation_code ||
        "Unknown";
      const countryCode =
        (firstRecord as any)?.business_case_use_groups?.[0]
          ?.formulation_country_use_group?.country?.country_code || "Unknown";
      const useGroupVariant =
        (firstRecord as any)?.business_case_use_groups?.[0]
          ?.formulation_country_use_group?.use_group_variant || "Unknown";

      // Group records by created_at to find the most recent complete set
      // A complete set should have all 10 year_offsets (1-10)
      const recordsByCreatedAt = new Map<
        string,
        Array<{
          business_case_id: string;
          year_offset: number;
          created_at: string;
        }>
      >();

      groupRecords.forEach((record) => {
        const createdAt = record.created_at;
        if (!recordsByCreatedAt.has(createdAt)) {
          recordsByCreatedAt.set(createdAt, []);
        }
        recordsByCreatedAt.get(createdAt)!.push({
          business_case_id: record.business_case_id,
          year_offset: record.year_offset || 0,
          created_at: createdAt,
        });
      });

      // Find the most recent complete set (has all 10 years)
      let mostRecentCompleteSet: string | null = null;
      const sortedCreatedAts = Array.from(recordsByCreatedAt.keys()).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime(),
      );

      for (const createdAt of sortedCreatedAts) {
        const records = recordsByCreatedAt.get(createdAt)!;
        const yearOffsets = new Set(records.map((r) => r.year_offset));
        if (yearOffsets.size === 10) {
          mostRecentCompleteSet = createdAt;
          break;
        }
      }

      // If no complete set found, use the most recent one
      if (!mostRecentCompleteSet && sortedCreatedAts.length > 0) {
        mostRecentCompleteSet = sortedCreatedAts[0];
      }

      if (!mostRecentCompleteSet) {
        continue;
      }

      // Collect IDs to keep (from most recent set) and IDs to supersede (all others)
      const idsToKeep = new Set<string>();
      const idsToSupersede: string[] = [];

      recordsByCreatedAt.forEach((records, createdAt) => {
        if (createdAt === mostRecentCompleteSet) {
          records.forEach((r) => idsToKeep.add(r.business_case_id));
        } else {
          records.forEach((r) => idsToSupersede.push(r.business_case_id));
        }
      });

      if (idsToSupersede.length > 0) {
        // Mark old records as superseded
        const { error: updateError } = await supabase
          .from("business_case")
          .update({
            status: "superseded",
            updated_at: new Date().toISOString(),
          })
          .in("business_case_id", idsToSupersede);

        if (updateError) {
          console.error(
            `Failed to supersede records for group ${groupId}:`,
            updateError,
          );
          continue;
        }

        totalFixed += idsToSupersede.length;
        fixedDuplicates.push({
          groupId,
          formulationCode,
          countryCode,
          useGroupVariant,
          activeCount: idsToKeep.size + idsToSupersede.length,
          keptVersion: Array.from(idsToKeep)[0] || "Unknown",
          supersededVersions: idsToSupersede,
        });
      }
    }

    // Revalidate caches
    revalidatePath("/portfolio/business-cases");
    revalidatePath("/portfolio/analytics");
    revalidatePath("/portfolio/formulations");
    revalidatePath("/portfolio");
    revalidatePath("/");
    // No cache to invalidate - direct database queries

    return {
      success: true,
      message: `Fixed ${totalFixed} duplicate records across ${fixedDuplicates.length} business case groups.`,
      fixed: totalFixed,
      duplicates: fixedDuplicates,
    };
  } catch (error) {
    console.error("Error fixing duplicate business cases:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unknown error occurred while fixing duplicates",
      fixed: 0,
      duplicates: [],
    };
  }
}

