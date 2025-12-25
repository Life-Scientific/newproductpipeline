"use server";

import {
  getFormulationsWithNestedDataProgressive,
  getFormulationsWithNestedDataRemaining,
  getBusinessCasesForProjectionTableProgressive,
  getBusinessCasesForProjectionTableRemaining,
  type PortfolioFilters,
} from "@/lib/db/progressive-queries";

/**
 * Server action: Fetch initial batch of formulations with nested data
 */
export async function fetchFormulationsInitial(limit: number = 100) {
  return await getFormulationsWithNestedDataProgressive(limit);
}

/**
 * Server action: Fetch remaining formulations (for background loading)
 */
export async function fetchFormulationsRemaining(offset: number) {
  return await getFormulationsWithNestedDataRemaining(offset);
}

/**
 * Server action: Fetch initial batch of business cases
 */
export async function fetchBusinessCasesInitial(limit: number = 100) {
  return await getBusinessCasesForProjectionTableProgressive(limit);
}

/**
 * Server action: Fetch remaining business cases (for background loading)
 */
export async function fetchBusinessCasesRemaining(
  offset: number,
  filters?: PortfolioFilters,
) {
  return await getBusinessCasesForProjectionTableRemaining(offset, filters);
}
