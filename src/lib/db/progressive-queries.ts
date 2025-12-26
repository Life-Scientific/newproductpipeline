/**
 * Progressive loading utilities for fetching initial data quickly
 * and loading remaining data in the background.
 */

import { createClient } from "@/lib/supabase/server";
import type { FormulationWithNestedData } from "./queries";
import type { BusinessCaseGroupData } from "./queries";

/**
 * Portfolio filters interface for server-side filtering
 */
export interface PortfolioFilters {
  countries: string[];
  formulations: string[];
  useGroups: string[];
  formulationStatuses: string[];
  countryStatuses: string[];
}

/**
 * Result structure for progressive queries
 */
export interface ProgressiveQueryResult<T> {
  initialData: T[];
  totalCount: number;
  hasMore: boolean;
}

/**
 * Fetch initial batch of formulations with nested data
 * Returns first N formulations + their related data for fast initial load
 */
export async function getFormulationsWithNestedDataProgressive(
  limit: number = 100,
): Promise<ProgressiveQueryResult<FormulationWithNestedData>> {
  // Import here to avoid circular dependency
  const { getFormulationsWithNestedData } = await import("./queries");
  const { createClient } = await import("../supabase/server");

  // Get total count first (fast query)
  const supabase = await createClient();
  const { count } = await supabase
    .from("vw_formulations_with_ingredients")
    .select("*", { count: "exact", head: true });

  const totalCount = count || 0;

  // Fetch initial batch with limit (optimized - only aggregates for initial batch)
  const initialData = await getFormulationsWithNestedData(limit);

  return {
    initialData,
    totalCount,
    hasMore: totalCount > limit,
  };
}

/**
 * Fetch remaining formulations with nested data (for background loading)
 * Note: This fetches ALL data and slices - could be optimized further
 */
export async function getFormulationsWithNestedDataRemaining(
  offset: number,
): Promise<FormulationWithNestedData[]> {
  const { getFormulationsWithNestedData } = await import("./queries");
  // Fetch all data (no limit) and return remaining portion
  const allData = await getFormulationsWithNestedData();
  return allData.slice(offset);
}

/**
 * Build Supabase query with server-side filters applied
 */
function buildFilteredBusinessCaseQuery(
  supabase: Awaited<ReturnType<typeof createClient>>,
  filters: PortfolioFilters,
) {
  let query = supabase
    .from("vw_business_case")
    .select("*")
    .eq("status", "active");

  // Filter by country codes
  if (filters.countries.length > 0) {
    query = query.in("country_code", filters.countries);
  }

  // Filter by formulation codes
  if (filters.formulations.length > 0) {
    query = query.in("formulation_code", filters.formulations);
  }

  // Filter by use group names (use_group_names is an array column)
  if (filters.useGroups.length > 0) {
    // Use overlaps operator (&&) to check if any of the filter values exist in the array
    query = query.overlaps("use_group_names", filters.useGroups);
  }

  // Filter by formulation statuses (requires join - simplified here)
  if (filters.formulationStatuses.length > 0) {
    // This would need a join or separate lookup
    // For now, we'll filter client-side for statuses
  }

  return query;
}

/**
 * Fetch initial batch of business cases for projection table
 * Returns first N business case groups for fast initial load
 * Now supports server-side filtering based on portfolio filters
 */
export async function getBusinessCasesForProjectionTableProgressive(
  limit: number = 100,
  filters?: PortfolioFilters,
): Promise<ProgressiveQueryResult<BusinessCaseGroupData>> {
  // Import here to avoid circular dependency
  const { getBusinessCasesForProjectionTable } = await import("./queries");
  const supabase = await createClient();

  // Build filtered query
  const baseQuery = filters
    ? buildFilteredBusinessCaseQuery(supabase, filters)
    : supabase
        .from("vw_business_case")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

  // Get total count with filters applied
  const { count } = await baseQuery;
  const totalCount = count || 0;

  // Fetch initial batch with limit (optimized - only processes initial batch)
  const initialData = await getBusinessCasesForProjectionTable(limit, filters);

  return {
    initialData,
    totalCount,
    hasMore: totalCount > limit,
  };
}

/**
 * Fetch remaining business cases (for background loading)
 */
export async function getBusinessCasesForProjectionTableRemaining(
  offset: number,
  filters?: PortfolioFilters,
): Promise<BusinessCaseGroupData[]> {
  const { getBusinessCasesForProjectionTable } = await import("./queries");
  const allData = await getBusinessCasesForProjectionTable(undefined, filters);
  return allData.slice(offset);
}
