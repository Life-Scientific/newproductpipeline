/**
 * Progressive loading utilities for fetching initial data quickly
 * and loading remaining data in the background.
 */

import { createClient } from "@/lib/supabase/server";
import type { FormulationWithNestedData } from "./queries";
import type { BusinessCaseGroupData } from "./queries";

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
 * Fetch initial batch of business cases for projection table
 * Returns first N business case groups for fast initial load
 */
export async function getBusinessCasesForProjectionTableProgressive(
  limit: number = 100,
): Promise<ProgressiveQueryResult<BusinessCaseGroupData>> {
  // Import here to avoid circular dependency
  const { getBusinessCasesForProjectionTable } = await import("./queries");
  const { createClient } = await import("../supabase/server");
  
  // Get total count first (fast query)
  const supabase = await createClient();
  const { count } = await supabase
    .from("vw_business_case")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");
  
  const totalCount = count || 0;
  
  // Fetch initial batch with limit (optimized - only processes initial batch)
  const initialData = await getBusinessCasesForProjectionTable(limit);
  
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
): Promise<BusinessCaseGroupData[]> {
  const { getBusinessCasesForProjectionTable } = await import("./queries");
  const allData = await getBusinessCasesForProjectionTable();
  return allData.slice(offset);
}

