import { createClient } from "@/lib/supabase/server";
import type { BusinessCase, BusinessCaseGroupData, BusinessCaseYearData } from "./types";
import type { Database } from "@/lib/supabase/database.types";
import { error } from "@/lib/logger";

// =============================================================================
// Helper Functions (kept here to avoid moving too much code at once)
// =============================================================================

/**
 * Deduplicate business cases by business_case_group_id
 * Returns only the latest version (highest year_offset) for each group
 */
function deduplicateBusinessCases(
  businessCases: Array<BusinessCase & { year_offset?: number }>,
): Array<BusinessCase & { year_offset?: number }> {
  const latestByGroup = new Map<
    string,
    BusinessCase & { year_offset?: number }
  >();

  for (const bc of businessCases) {
    const groupId = bc.business_case_group_id;
    if (!groupId) continue;

    const existing = latestByGroup.get(groupId);
    // Higher year_offset means newer version
    if (!existing || (bc.year_offset ?? 0) > (existing.year_offset ?? 0)) {
      latestByGroup.set(groupId, bc);
    }
  }

  return Array.from(latestByGroup.values());
}

/**
 * Enrich business cases with additional computed fields
 */
async function enrichBusinessCases(
  businessCases: Array<BusinessCase & { formulation_id?: string | null; country_id?: string | null }>,
): Promise<Array<BusinessCase & { formulation_id: string | null; country_id: string | null }>> {
  const supabase = await createClient();

  // Extract IDs for batch lookup
  const formulationCountryIds = [
    ...new Set(
      businessCases
        .map((bc) => bc.formulation_country_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  const useGroupIds = [
    ...new Set(
      businessCases
        .map((bc) => bc.formulation_country_use_group_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  // Fetch formulation_country data for direct links
  const { data: directFcData } = formulationCountryIds.length > 0
    ? await supabase
        .from("formulation_country")
        .select("formulation_country_id, formulation_id, country_id")
        .in("formulation_country_id", formulationCountryIds)
    : { data: null };

  // Create maps for O(1) lookup
  const directFormulationCountryToFormulationId = new Map<string, string>();
  const directFormulationCountryToCountryId = new Map<string, string>();

  directFcData?.forEach((fc) => {
    if (fc.formulation_country_id) {
      directFormulationCountryToFormulationId.set(
        fc.formulation_country_id,
        fc.formulation_id,
      );
      directFormulationCountryToCountryId.set(
        fc.formulation_country_id,
        fc.country_id,
      );
    }
  });

  // Fetch use group data for indirect links
  const { data: junctionData } = useGroupIds.length > 0
    ? await supabase
        .from("formulation_country_use_group")
        .select("formulation_country_use_group_id, formulation_country_id")
        .in("formulation_country_use_group_id", useGroupIds)
    : { data: null };

  // Create map for use group -> formulation country
  const useGroupToFormulationCountry = new Map<string, string>();

  // Also get formulation_country -> formulation_id mapping for use group links
  const formulationCountryToFormulationId = new Map<string, string>();
  const formulationCountryToCountryId = new Map<string, string>();

  // Get all formulation_country records for use group links
  const fcIdsFromUseGroups = [
    ...new Set(junctionData?.map((j) => j.formulation_country_id).filter(Boolean) ?? []),
  ];

  if (fcIdsFromUseGroups.length > 0) {
    const { data: fcDataForUseGroups } = await supabase
      .from("formulation_country")
      .select("formulation_country_id, formulation_id, country_id")
      .in("formulation_country_id", fcIdsFromUseGroups);

    fcDataForUseGroups?.forEach((fc) => {
      if (fc.formulation_country_id) {
        formulationCountryToFormulationId.set(
          fc.formulation_country_id,
          fc.formulation_id,
        );
        formulationCountryToCountryId.set(
          fc.formulation_country_id,
          fc.country_id,
        );
      }
    });
  }

  junctionData?.forEach((j) => {
    if (j.formulation_country_use_group_id && j.formulation_country_id) {
      useGroupToFormulationCountry.set(
        j.formulation_country_use_group_id,
        j.formulation_country_id,
      );
    }
  });

  // Create maps for business cases
  const businessCaseToFormulationId = new Map<string, string>();
  const businessCaseToCountryId = new Map<string, string>();

  // First, handle direct links
  businessCases.forEach((bc) => {
    if (bc.business_case_id && bc.formulation_country_id) {
      if (!businessCaseToFormulationId.has(bc.business_case_id)) {
        businessCaseToFormulationId.set(
          bc.business_case_id,
          directFormulationCountryToFormulationId.get(
            bc.formulation_country_id,
          ) || "",
        );
        businessCaseToCountryId.set(
          bc.business_case_id,
          directFormulationCountryToCountryId.get(bc.formulation_country_id) ||
            "",
        );
      }
    }
  });

  // Then, handle use group links (only if not already set)
  junctionData?.forEach((j) => {
    if (j.business_case_id && j.formulation_country_use_group_id) {
      if (!businessCaseToFormulationId.has(j.business_case_id)) {
        const fcId = useGroupToFormulationCountry.get(
          j.formulation_country_use_group_id,
        );
        if (fcId) {
          businessCaseToFormulationId.set(
            j.business_case_id,
            formulationCountryToFormulationId.get(fcId) || "",
          );
          businessCaseToCountryId.set(
            j.business_case_id,
            formulationCountryToCountryId.get(fcId) || "",
          );
        }
      }
    }
  });

  // Enrich business cases
  return businessCases.map((bc) => ({
    ...bc,
    formulation_id: bc.business_case_id
      ? (businessCaseToFormulationId.get(bc.business_case_id) ?? null)
      : null,
    country_id: bc.business_case_id
      ? (businessCaseToCountryId.get(bc.business_case_id) ?? null)
      : null,
  }));
}

// =============================================================================
// Query Functions
// =============================================================================

/**
 * Parallel pagination helper for business case views
 */
async function fetchBusinessCasesPaginated<T>(
  selectQuery: string,
  options: {
    status?: "active" | "all";
    orderBy?: { column: string; ascending: boolean };
  } = {},
): Promise<T[]> {
  const supabase = await createClient();
  const { status = "active", orderBy } = options;

  const baseQuery = supabase
    .from("vw_business_case")
    .select(selectQuery)
    .eq("status", status);

  if (orderBy) {
    baseQuery.order(orderBy.column, { ascending: orderBy.ascending });
  }

  // Get count
  const { count } = await baseQuery.clone().select("*", { count: "exact", head: true });

  const pageSize = 10000;
  const totalPages = Math.ceil((count || 0) / pageSize);

  // Early exit for single page results
  if (totalPages <= 1) {
    const { data, error } = await baseQuery;
    if (error) throw new Error(`Failed to fetch business cases: ${supabaseError.message}`);
    return (data as T[]) || [];
  }

  // Fetch all pages in parallel
  const pagePromises: Promise<T[]>[] = [];

  for (let page = 0; page < totalPages; page++) {
    pagePromises.push(
      baseQuery
        .clone()
        .range(page * pageSize, (page + 1) * pageSize - 1)
        .then(({ data, error }) => {
          if (error) throw new Error(`Failed to fetch business cases: ${supabaseError.message}`);
          return (data as T[]) || [];
        }),
    );
  }

  const allPages = await Promise.all(pagePromises);
  return allPages.flat();
}

/**
 * Get all business cases with parallel pagination
 */
export async function getBusinessCases(): Promise<
  Array<BusinessCase & { formulation_id: string | null; country_id: string | null }>
> {
  const data = await fetchBusinessCasesPaginated<BusinessCase>("*", {
    status: "active",
    orderBy: { column: "fiscal_year", ascending: true },
  });

  const deduplicated = deduplicateBusinessCases(data);
  const enriched = await enrichBusinessCases(deduplicated);

  return enriched.filter((bc) => bc.formulation_code && bc.country_name);
}

/**
 * Get business case by ID
 */
export async function getBusinessCaseById(id: string) {
  const supabase = await createClient();

  // First try to find by business_case_id
  let { data, error } = await supabase
    .from("vw_business_case")
    .select("*")
    .eq("business_case_id", id)
    .single();

  // If not found, try by business_case_group_id
  if (error?.code === "PGRST116" || !data) {
    const groupResult = await supabase
      .from("vw_business_case")
      .select("*")
      .eq("business_case_group_id", id)
      .order("year_offset", { ascending: true })
      .limit(1)
      .single();

    data = groupResult.data;
    error = groupResult.error;
  }

  if (error || !data) return null;

  const enriched = await enrichBusinessCases([data]);
  return enriched[0] || null;
}

/**
 * Get business case version history
 */
export async function getBusinessCaseVersionHistory(
  groupId: string,
): Promise<BusinessCaseYearData[]> {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("vw_business_case")
    .select(
      `
      business_case_id,
      business_case_group_id,
      year_offset,
      fiscal_year,
      target_market_entry_fy,
      effective_start_fiscal_year,
      volume,
      nsp,
      cogs_per_unit,
      total_revenue,
      total_cogs,
      total_margin,
      margin_percent,
      formulation_name,
      uom,
      country_name,
      currency_code,
      use_group_name,
      use_group_variant,
      formulation_country_use_group_id
    `,
    )
    .eq("business_case_group_id", groupId)
    .order("year_offset", { ascending: true });

  if (supabaseError) {
    error("Error fetching version history:", error);
    return [];
  }

  return (data as BusinessCaseYearData[]) || [];
}

/**
 * Get business case groups for a specific formulation
 */
export async function getBusinessCaseGroupsUsingFormulation(
  formulationId: string,
): Promise<BusinessCaseGroupData[]> {
  const supabase = await createClient();

  const { data: bcData, error: bcError } = await supabase
    .from("vw_business_case")
    .select(
      `
      business_case_group_id,
      formulation_id,
      formulation_name,
      formulation_code,
      uom,
      country_id,
      country_name,
      country_code,
      currency_code,
      use_group_id,
      use_group_name,
      use_group_variant,
      use_group_status,
      target_market_entry,
      effective_start_fiscal_year,
      years_data,
      updated_at,
      created_by,
      change_reason,
      change_summary
    `,
    )
    .eq("formulation_id", formulationId)
    .eq("status", "active")
    .order("country_name", { ascending: true })
    .order("use_group_name", { ascending: true });

  if (bcError) {
    error("Error fetching business case groups:", bcError);
    return [];
  }

  // Group by business_case_group_id and build years_data
  const groupsMap = new Map<string, BusinessCaseGroupData>();

  for (const row of bcData || []) {
    if (!row.business_case_group_id) continue;

    let group = groupsMap.get(row.business_case_group_id);

    if (!group) {
      group = {
        business_case_group_id: row.business_case_group_id,
        formulation_id: row.formulation_id,
        formulation_name: row.formulation_name,
        formulation_code: row.formulation_code,
        uom: row.uom,
        country_id: row.country_id,
        country_name: row.country_name,
        country_code: row.country_code,
        currency_code: row.currency_code,
        use_group_id: row.use_group_id,
        use_group_name: row.use_group_name,
        use_group_variant: row.use_group_variant,
        use_group_status: row.use_group_status,
        target_market_entry: row.target_market_entry,
        effective_start_fiscal_year: row.effective_start_fiscal_year,
        years_data: {},
        updated_at: row.updated_at,
        created_by: row.created_by,
        change_reason: row.change_reason,
        change_summary: row.change_summary,
      };
      groupsMap.set(row.business_case_group_id, group);
    }
  }

  return Array.from(groupsMap.values());
}

/**
 * Get aggregated chart data by fiscal year
 */
export async function getBusinessCaseSummaryByFiscalYear() {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("vw_business_case")
    .select("fiscal_year, total_revenue, total_margin, total_cogs, margin_percent")
    .eq("status", "active");

  if (supabaseError) {
    error("Error fetching chart summary:", error);
    return [];
  }

  // Aggregate in memory
  const summary = new Map<
    string,
    {
      total_revenue: number;
      total_margin: number;
      total_cogs: number;
      count: number;
    }
  >();

  for (const row of data || []) {
    const fy = row.fiscal_year || "Unknown";
    const existing = summary.get(fy) || {
      total_revenue: 0,
      total_margin: 0,
      total_cogs: 0,
      count: 0,
    };

    summary.set(fy, {
      total_revenue: existing.total_revenue + (row.total_revenue || 0),
      total_margin: existing.total_margin + (row.total_margin || 0),
      total_cogs: existing.total_cogs + (row.total_cogs || 0),
      count: existing.count + 1,
    });
  }

  return Array.from(summary.entries()).map(([fiscal_year, totals]) => ({
    fiscal_year,
    ...totals,
    avg_margin_percent:
      totals.total_revenue > 0
        ? (totals.total_margin / totals.total_revenue) * 100
        : 0,
  }));
}

// Re-export types
export type { BusinessCaseGroupData, BusinessCaseYearData };

