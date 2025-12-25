import { createClient } from "@/lib/supabase/server";
import type {
  BusinessCase,
  BusinessCaseGroupData,
  BusinessCaseYearData,
  BusinessCaseVersionHistoryEntry,
  EnrichedBusinessCase,
} from "./types";
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
  businessCases: Array<BusinessCase & { year_offset: number | null }>,
): Array<BusinessCase & { year_offset: number | null }> {
  const latestByGroup = new Map<
    string,
    BusinessCase & { year_offset: number | null }
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
): Promise<EnrichedBusinessCase[]> {
  const supabase = await createClient();

  // In the new JSONB structure, formulation_id and country_id are already in the business case
  // Extract unique IDs for batch lookup of display names
  const allFormulationIds = [
    ...new Set(
      businessCases
        .map((bc) => bc.formulation_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  const allCountryIds = [
    ...new Set(
      businessCases
        .map((bc) => bc.country_id)
        .filter((id): id is string => Boolean(id)),
    ),
  ];

  // Fetch formulation details
  const { data: formulationData } = allFormulationIds.length > 0
    ? await supabase
        .from("formulation")
        .select("formulation_id, formulation_code, formulation_name")
        .in("formulation_id", allFormulationIds)
    : { data: null };

  // Fetch country details
  const { data: countryData } = allCountryIds.length > 0
    ? await supabase
        .from("country")
        .select("country_id, country_name, country_code")
        .in("country_id", allCountryIds)
    : { data: null };

  // Create lookup maps
  const formulationMap = new Map(
    formulationData?.map(f => [f.formulation_id, f]) ?? []
  );
  const countryMap = new Map(
    countryData?.map(c => [c.country_id, c]) ?? []
  );

  // Enrich business cases
  // Enrich business cases with display names
  return businessCases.map((bc) => {
    const formulationId = bc.formulation_id || null;
    const countryId = bc.country_id || null;

    const formulation = formulationId ? formulationMap.get(formulationId) : null;
    const country = countryId ? countryMap.get(countryId) : null;

    return {
      ...bc,
      formulation_id: formulationId,
      country_id: countryId,
      formulation_code: formulation?.formulation_code ?? null,
      formulation_name: formulation?.formulation_name ?? null,
      country_name: country?.country_name ?? null,
      country_code: country?.country_code ?? null,
    };
  });
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
  const { count } = await (baseQuery as any).clone().select("*", { count: "exact", head: true });

  const pageSize = 10000;
  const totalPages = Math.ceil((count || 0) / pageSize);

  // Early exit for single page results
  if (totalPages <= 1) {
    const { data, error } = await baseQuery;
    if (error) throw new Error(`Failed to fetch business cases: ${error.message}`);
    return (data as T[]) || [];
  }

  // Fetch all pages in parallel
  const pagePromises: Promise<T[]>[] = [];

  for (let page = 0; page < totalPages; page++) {
    pagePromises.push(
      (baseQuery as any)
        .clone()
        .range(page * pageSize, (page + 1) * pageSize - 1)
        .then(({ data, error }: { data: T[] | null; error: Error | null }) => {
          if (error) throw new Error(`Failed to fetch business cases: ${error.message}`);
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
export async function getBusinessCases(): Promise<EnrichedBusinessCase[]> {
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
 * Get business case version history for a use group
 * Returns all versions (active and inactive) grouped by business_case_group_id
 */
export async function getBusinessCaseVersionHistory(
  useGroupId: string,
): Promise<BusinessCaseVersionHistoryEntry[]> {
  const supabase = await createClient();

  // Get all business case IDs linked to this use group
  const { data: junctionData, error: junctionError } = await supabase
    .from("business_case_use_groups")
    .select("business_case_id")
    .eq("formulation_country_use_group_id", useGroupId);

  if (junctionError || !junctionData || junctionData.length === 0) {
    return [];
  }

  const businessCaseIds = junctionData.map((j) => j.business_case_id);

  // Get all business cases (both active and inactive) with their details
  const { data: businessCases, error: bcError } = await supabase
    .from("business_case")
    .select(
      "business_case_group_id, status, created_at, created_by, updated_at, year_offset, volume, nsp, total_revenue, change_reason, change_summary, previous_group_id",
    )
    .in("business_case_id", businessCaseIds)
    .order("created_at", { ascending: false });

  if (bcError || !businessCases) {
    error("Error fetching business cases for version history:", bcError);
    return [];
  }

  // Group by business_case_group_id and get summary from year 1
  const groupMap = new Map<string, BusinessCaseVersionHistoryEntry>();

  businessCases.forEach((bc) => {
    if (!bc.business_case_group_id) return;

    if (!groupMap.has(bc.business_case_group_id)) {
      groupMap.set(bc.business_case_group_id, {
        business_case_group_id: bc.business_case_group_id,
        status: bc.status || "active",
        created_at: bc.created_at,
        created_by: bc.created_by,
        updated_at: bc.updated_at,
        version_number: 0, // Will be calculated after
        year_1_summary: {
          volume: null,
          nsp: null,
          total_revenue: null,
        },
        // Audit fields
        change_reason: bc.change_reason || null,
        change_summary: bc.change_summary || null,
        previous_group_id: bc.previous_group_id || null,
      });
    }

    // Use year 1 data for summary
    if (bc.year_offset === 1) {
      const entry = groupMap.get(bc.business_case_group_id);
      if (entry) {
        entry.year_1_summary = {
          volume: bc.volume,
          nsp: bc.nsp,
          total_revenue: bc.total_revenue,
        };
      }
    }
  });

  // Convert to array and sort by created_at descending
  const versions = Array.from(groupMap.values()).sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
    return bTime - aTime;
  });

  // Assign version numbers (newest = highest number)
  const totalVersions = versions.length;
  versions.forEach((v, index) => {
    v.version_number = totalVersions - index;
  });

  return versions;
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

