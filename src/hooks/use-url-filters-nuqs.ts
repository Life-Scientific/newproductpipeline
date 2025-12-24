"use client";

import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";

/**
 * Portfolio filter state managed via URL search params using nuqs.
 * Provides type-safe URL state with automatic serialization/deserialization.
 *
 * Benefits:
 * - Type-safe URL state management
 * - Server-side rendering compatible
 * - Automatic URL sync without manual router manipulation
 * - Browser history integration
 */
export function useUrlFilters() {
  const [countries, setCountries] = useQueryState(
    "countries",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [formulations, setFormulations] = useQueryState(
    "formulations",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [fiscalYears, setFiscalYears] = useQueryState(
    "fiscalYears",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [statuses, setStatuses] = useQueryState(
    "statuses",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );

  // Helper to check if any filters are active
  const hasActiveFilters =
    countries.length > 0 ||
    formulations.length > 0 ||
    fiscalYears.length > 0 ||
    statuses.length > 0 ||
    searchQuery.length > 0;

  // Helper to toggle a single country
  const toggleCountry = (countryId: string) => {
    setCountries((prev) =>
      prev.includes(countryId)
        ? prev.filter((id) => id !== countryId)
        : [...prev, countryId],
    );
  };

  // Helper to toggle a single formulation
  const toggleFormulation = (formulationId: string) => {
    setFormulations((prev) =>
      prev.includes(formulationId)
        ? prev.filter((id) => id !== formulationId)
        : [...prev, formulationId],
    );
  };

  // Helper to toggle a single fiscal year
  const toggleFiscalYear = (year: string) => {
    setFiscalYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  // Helper to toggle a single status
  const toggleStatus = (status: string) => {
    setStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setCountries([]);
    setFormulations([]);
    setFiscalYears([]);
    setStatuses([]);
    setSearchQuery("");
  };

  return {
    // State
    countries,
    formulations,
    fiscalYears,
    statuses,
    searchQuery,
    hasActiveFilters,

    // Setters
    setCountries,
    setFormulations,
    setFiscalYears,
    setStatuses,
    setSearchQuery,

    // Toggle helpers
    toggleCountry,
    toggleFormulation,
    toggleFiscalYear,
    toggleStatus,

    // Reset
    resetFilters,
  };
}


