import type { PortfolioFilters } from "@/hooks/use-portfolio-filters";
import type { Formulation } from "@/lib/db/types";
import type { FormulationCountryDetail } from "@/lib/db/types";
import { countUniqueBusinessCaseGroups } from "./business-case-utils";

export interface FilteredCounts {
  countries?: number;
  formulations?: number;
  formulationCountries?: number;
  useGroups?: number;
  businessCases?: number;
}

export interface CountingContext {
  includeOrphanFormulations: boolean; // Only true for Formulations page
}

/**
 * Compute filtered counts for portfolio pages.
 *
 * This utility implements the filtering logic from the filtering document:
 * - When formulation filters are active and no country filters: count from formulations table (includes orphans)
 * - When country-related filters are active: count from junction table (intersection only)
 *
 * @param formulations - All formulations from the database
 * @param filteredFormulationCountries - Already filtered formulation-country pairs
 * @param filters - Active portfolio filters
 * @param context - Context about whether to include orphan formulations
 * @param additionalData - Optional additional data for counts (useGroups, businessCases)
 */
export function computeFilteredCounts(
  formulations: Formulation[],
  filteredFormulationCountries: (FormulationCountryDetail & {
    formulation_status?: string | null;
  })[],
  filters: PortfolioFilters,
  context: CountingContext,
  additionalData?: {
    useGroups?: Array<{
      formulation_code?: string | null;
      country_code?: string | null;
    }>;
    businessCases?: Array<{
      business_case_group_id?: string | null;
      country_code?: string | null;
      formulation_code?: string | null;
    }>;
  },
): FilteredCounts {
  // Determine filter types
  const hasCountryRelatedFilters =
    filters.countries.length > 0 ||
    filters.countryStatuses.length > 0 ||
    filters.useGroups.length > 0;

  const hasFormulationFilters =
    filters.formulations.length > 0 || filters.formulationStatuses.length > 0;

  const hasAnyFilter = hasCountryRelatedFilters || hasFormulationFilters;

  // Compute unique countries and formulations from filtered junction data
  const uniqueCountries = new Set<string>();
  const uniqueFormulations = new Set<string>();

  filteredFormulationCountries.forEach((fc) => {
    if (fc.country_code) uniqueCountries.add(fc.country_code);
    if (fc.formulation_code) uniqueFormulations.add(fc.formulation_code);
  });

  // Also count from business cases if provided (they represent actual relationships)
  if (additionalData?.businessCases) {
    additionalData.businessCases.forEach((bc) => {
      if (bc.country_code) uniqueCountries.add(bc.country_code);
      if (bc.formulation_code) uniqueFormulations.add(bc.formulation_code);
    });
  }

  // Determine formulation count
  let formulationCount: number;

  if (!hasAnyFilter) {
    // No filters: show totals from formulations table
    formulationCount = formulations.length;
  } else if (
    context.includeOrphanFormulations &&
    hasFormulationFilters &&
    !hasCountryRelatedFilters
  ) {
    // PATH A: Formulation-centric (include formulations without country entries)
    // Filter formulations table to get count including orphans
    const filteredFormulations = formulations.filter((f) => {
      // Formulation filter
      if (filters.formulations.length > 0) {
        if (
          !f.formulation_code ||
          !filters.formulations.includes(f.formulation_code)
        ) {
          return false;
        }
      }
      // Formulation status filter
      if (filters.formulationStatuses.length > 0) {
        const status = f.status || "Not Yet Evaluated";
        if (!filters.formulationStatuses.includes(status)) {
          return false;
        }
      }
      return true;
    });
    formulationCount = filteredFormulations.length;
  } else {
    // PATH B: Country-centric (intersection from junction data)
    formulationCount = uniqueFormulations.size;
  }

  // Compute use groups count if provided
  let useGroupsCount: number | undefined;
  if (additionalData?.useGroups) {
    useGroupsCount = additionalData.useGroups.length;
  }

  // Compute business cases count if provided
  let businessCasesCount: number | undefined;
  if (additionalData?.businessCases) {
    businessCasesCount = countUniqueBusinessCaseGroups(
      additionalData.businessCases,
    );
  }

  return {
    countries: uniqueCountries.size,
    formulations: formulationCount,
    formulationCountries: filteredFormulationCountries.length,
    useGroups: useGroupsCount,
    businessCases: businessCasesCount,
  };
}
