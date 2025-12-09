"use client";

import { useMemo } from "react";
import type { PortfolioFilters } from "./use-portfolio-filters";

/**
 * Raw data types for filter computation
 */
export interface FilterableBusinessCase {
  business_case_group_id?: string | null;
  country_id?: string | null;
  country_code?: string | null;
  country_name?: string | null;
  country_status?: string | null;
  formulation_id?: string | null;
  formulation_code?: string | null;
  formulation_name?: string | null;
  formulation_country_id?: string | null;
  use_group_name?: string | null;
}

export interface FilterableFormulation {
  formulation_id?: string | null;
  formulation_code?: string | null;
  formulation_name?: string | null;
  status?: string | null;
}

export interface FilterableFormulationCountry {
  formulation_country_id?: string | null;
  formulation_id?: string | null;
  formulation_code?: string | null;
  country_id?: string | null;
  country_code?: string | null;
  country_name?: string | null;
  country_status?: string | null;
}

/**
 * Computed filter options with cascading logic
 */
export interface ComputedFilterOptions {
  // Available options for dropdown display (names/display values)
  countries: string[]; // Country names for display
  countryCodes: string[]; // Country codes for URL
  formulations: string[]; // Display names for dropdown
  formulationCodes: string[]; // Codes for URL
  useGroups: string[];
  formulationStatuses: string[];
  countryStatuses: string[];
  // Lookup maps for code <-> display name conversion
  countryCodeToName: Map<string, string>;
  countryNameToCode: Map<string, string>;
  formulationCodeToDisplay: Map<string, string>;
  displayToFormulationCode: Map<string, string>;
  // Dynamic counts (only for status filters)
  formulationStatusCounts: Map<string, number>;
  countryStatusCounts: Map<string, number>;
  // Use group disabled state
  useGroupsDisabled: boolean;
}

// Status constants
const ALL_COUNTRY_STATUSES = [
  "Not yet evaluated",
  "Not selected for entry",
  "Selected for entry",
  "On hold",
  "Withdrawn",
];

const ALL_FORMULATION_STATUSES = [
  "Not Yet Evaluated",
  "Selected",
  "Being Monitored",
  "Killed",
];

/**
 * Reference country data for building lookup maps
 */
export interface ReferenceCountry {
  country_code: string;
  country_name: string;
}

/**
 * Reference formulation data for building lookup maps
 */
export interface ReferenceFormulation {
  formulation_code: string;
  formulation_name: string | null;
  status: string | null;
}

/**
 * Hook to compute filter options with cascading/union logic.
 * All filters pre-filter each other so that only relevant options are shown.
 *
 * @param referenceFormulations - Complete list of formulations for building display name lookups
 * @param referenceCountries - Complete list of countries for building code/name lookups
 * @param filterableData - Page-specific data for cascading filter logic (business cases, formulation-countries)
 * @param formulationCountries - All formulation-country relationships (optional, for more accurate country status)
 * @param filters - Current filter state from usePortfolioFilters
 */
export function useFilterOptions(
  referenceFormulations: ReferenceFormulation[],
  referenceCountries: ReferenceCountry[],
  filterableData: FilterableBusinessCase[],
  formulationCountries: FilterableFormulationCountry[] | null,
  filters: PortfolioFilters,
): ComputedFilterOptions {
  return useMemo(() => {
    // Build formulation lookup maps from REFERENCE data (complete list)
    const formulationCodeToDisplay = new Map<string, string>();
    const formulationCodeToStatus = new Map<string, string>();
    const displayToFormulationCode = new Map<string, string>();
    const allFormulationCodes = new Set<string>();

    referenceFormulations.forEach((f) => {
      if (f.formulation_code) {
        const display = f.formulation_name
          ? `${f.formulation_name} (${f.formulation_code})`
          : f.formulation_code;
        formulationCodeToDisplay.set(f.formulation_code, display);
        displayToFormulationCode.set(display, f.formulation_code);
        allFormulationCodes.add(f.formulation_code);
        // Store status - use "Not Yet Evaluated" for null/undefined status
        const status = f.status || "Not Yet Evaluated";
        formulationCodeToStatus.set(f.formulation_code, status);
      }
    });

    // Build country lookup maps from REFERENCE data (complete list)
    const countryCodeToName = new Map<string, string>();
    const countryNameToCode = new Map<string, string>();
    const allCountryCodes = new Set<string>();

    referenceCountries.forEach((c) => {
      if (c.country_code && c.country_name) {
        countryCodeToName.set(c.country_code, c.country_name);
        countryNameToCode.set(c.country_name, c.country_code);
        allCountryCodes.add(c.country_code);
      }
    });

    // Build relationships from FILTERABLE DATA (for cascading logic)
    // country_code -> Set<formulation_code>
    const countryCodeToFormulations = new Map<string, Set<string>>();
    // formulation_code -> Set<country_code>
    const formulationToCountryCodes = new Map<string, Set<string>>();
    // country_code -> Set<country_status>
    const countryCodeToStatuses = new Map<string, Set<string>>();
    // formulation_code -> Set<country_status>
    const formulationToCountryStatuses = new Map<string, Set<string>>();
    // Use groups by formulation+country_code
    const formulationCountryToUseGroups = new Map<string, Set<string>>();

    filterableData.forEach((bc) => {
      const countryCode = bc.country_code;
      const formCode = bc.formulation_code;
      const useGroupName = bc.use_group_name;
      const countryStatus = bc.country_status || "Not yet evaluated";

      if (countryCode && formCode) {
        // Country -> Formulations (using code)
        if (!countryCodeToFormulations.has(countryCode)) {
          countryCodeToFormulations.set(countryCode, new Set());
        }
        countryCodeToFormulations.get(countryCode)!.add(formCode);

        // Formulation -> Countries (using code)
        if (!formulationToCountryCodes.has(formCode)) {
          formulationToCountryCodes.set(formCode, new Set());
        }
        formulationToCountryCodes.get(formCode)!.add(countryCode);

        // Track country statuses
        if (!countryCodeToStatuses.has(countryCode)) {
          countryCodeToStatuses.set(countryCode, new Set());
        }
        countryCodeToStatuses.get(countryCode)!.add(countryStatus);

        if (!formulationToCountryStatuses.has(formCode)) {
          formulationToCountryStatuses.set(formCode, new Set());
        }
        formulationToCountryStatuses.get(formCode)!.add(countryStatus);

        // Use groups (using country code)
        if (useGroupName) {
          const key = `${formCode}|${countryCode}`;
          if (!formulationCountryToUseGroups.has(key)) {
            formulationCountryToUseGroups.set(key, new Set());
          }
          formulationCountryToUseGroups.get(key)!.add(useGroupName);
        }
      }
    });

    // If we have formulation countries data, use it for more accurate status mapping
    // AND to build country-formulation relationships (needed when filterableData is empty)
    if (formulationCountries) {
      formulationCountries.forEach((fc) => {
        const countryCode = fc.country_code;
        const countryName = fc.country_name;
        const formCode = fc.formulation_code;
        const status = fc.country_status || "Not yet evaluated";

        // Build country code <-> name mapping
        if (countryCode && countryName) {
          countryCodeToName.set(countryCode, countryName);
          countryNameToCode.set(countryName, countryCode);
        }

        if (countryCode && formCode) {
          // Build country -> formulations relationship (needed for country filter options)
          if (!countryCodeToFormulations.has(countryCode)) {
            countryCodeToFormulations.set(countryCode, new Set());
          }
          countryCodeToFormulations.get(countryCode)!.add(formCode);

          // Build formulation -> countries relationship
          if (!formulationToCountryCodes.has(formCode)) {
            formulationToCountryCodes.set(formCode, new Set());
          }
          formulationToCountryCodes.get(formCode)!.add(countryCode);

          // Track country statuses
          if (!countryCodeToStatuses.has(countryCode)) {
            countryCodeToStatuses.set(countryCode, new Set());
          }
          countryCodeToStatuses.get(countryCode)!.add(status);

          if (!formulationToCountryStatuses.has(formCode)) {
            formulationToCountryStatuses.set(formCode, new Set());
          }
          formulationToCountryStatuses.get(formCode)!.add(status);
        }
      });
    }

    // filters.formulations now contains CODES directly (not display names)
    const selectedFormulationCodes = filters.formulations;
    const hasCountryData = countryCodeToFormulations.size > 0;

    // === CASCADING LOGIC ===
    // Each filter constrains the others using union logic
    // Note: filters.countries and filters.formulations now contain CODES

    // Start with all available options from reference data
    // For formulations: if formulations are selected, show ALL formulations (don't constrain dropdown)
    // The actual filtering happens in the component, not here
    // We only constrain dropdown options for cross-type filters (country -> formulation, country status -> formulation)
    let validFormulationCodes = new Set<string>(allFormulationCodes);
    // Start with all reference countries, then constrain based on filterable data relationships
    // If there's no filterable data, show all countries from reference data
    let validCountryCodes =
      countryCodeToFormulations.size > 0
        ? new Set<string>(countryCodeToFormulations.keys())
        : new Set<string>(allCountryCodes);

    // === STEP 1: Apply CROSS-TYPE filters first (for dropdown options) ===

    // If countries are selected, constrain formulations to those available in selected countries
    if (filters.countries.length > 0) {
      const formulationsInSelectedCountries = new Set<string>();
      filters.countries.forEach((countryCode) => {
        const forms = countryCodeToFormulations.get(countryCode);
        if (forms) {
          forms.forEach((f) => formulationsInSelectedCountries.add(f));
        }
      });
      validFormulationCodes = new Set(
        Array.from(validFormulationCodes).filter((code) =>
          formulationsInSelectedCountries.has(code),
        ),
      );
    }

    // If formulations are selected, constrain countries to those where selected formulations exist
    // BUT don't constrain formulation options - users should be able to select any formulation
    // The actual filtering happens in the component, not here
    if (selectedFormulationCodes.length > 0) {
      const countryCodesWithSelectedFormulations = new Set<string>();
      selectedFormulationCodes.forEach((code) => {
        const countryCodes = formulationToCountryCodes.get(code);
        if (countryCodes) {
          countryCodes.forEach((c) =>
            countryCodesWithSelectedFormulations.add(c),
          );
        }
      });
      validCountryCodes = new Set(
        Array.from(validCountryCodes).filter((countryCode) =>
          countryCodesWithSelectedFormulations.has(countryCode),
        ),
      );
      // Note: We intentionally DON'T constrain validFormulationCodes here
      // Users should be able to select any formulation regardless of what's already selected
    }

    // === STEP 2: Compute status counts BEFORE applying same-type status filters ===
    // This lets users see "if I select this status, how many would match?"

    // For formulation status counts: use formulations constrained by country/formulation selection
    // but NOT by formulation status filter (we want to show alternatives)
    const formulationStatusCounts = new Map<string, number>();
    ALL_FORMULATION_STATUSES.forEach((status) => {
      // Count formulations that:
      // 1. Are in the valid set (constrained by country selection if any)
      // 2. Have this specific status
      // 3. Pass country status filter if any (cross-type constraint)
      let countableFormulations = Array.from(validFormulationCodes);

      // Apply country status filter as cross-type constraint
      if (filters.countryStatuses.length > 0 && hasCountryData) {
        countableFormulations = countableFormulations.filter((code) => {
          const statuses = formulationToCountryStatuses.get(code);
          return (
            statuses && filters.countryStatuses.some((s) => statuses.has(s))
          );
        });
      }

      const count = countableFormulations.filter((code) => {
        const formStatus =
          formulationCodeToStatus.get(code) || "Not Yet Evaluated";
        return formStatus === status;
      }).length;
      formulationStatusCounts.set(status, count);
    });

    // For country status counts: use formulation-countries constrained by country/formulation selection
    // but NOT by country status filter (we want to show alternatives)
    const countryStatusCounts = new Map<string, number>();
    const fcCountedByStatus = new Map<string, Set<string>>();
    ALL_COUNTRY_STATUSES.forEach((status) =>
      fcCountedByStatus.set(status, new Set()),
    );

    // Get formulations constrained by formulation status (cross-type constraint for country status counts)
    let formulationsForCountryStatusCount = Array.from(validFormulationCodes);
    if (filters.formulationStatuses.length > 0) {
      formulationsForCountryStatusCount =
        formulationsForCountryStatusCount.filter((code) => {
          const status =
            formulationCodeToStatus.get(code) || "Not Yet Evaluated";
          return filters.formulationStatuses.includes(status);
        });
    }

    // Count formulation-countries by status
    formulationsForCountryStatusCount.forEach((code) => {
      const countryCodes = formulationToCountryCodes.get(code);
      if (countryCodes) {
        countryCodes.forEach((countryCode) => {
          if (validCountryCodes.has(countryCode)) {
            const statuses = countryCodeToStatuses.get(countryCode);
            if (statuses) {
              statuses.forEach((status) => {
                const key = `${code}|${countryCode}`;
                fcCountedByStatus.get(status)?.add(key);
              });
            }
          }
        });
      }
    });

    ALL_COUNTRY_STATUSES.forEach((status) => {
      countryStatusCounts.set(status, fcCountedByStatus.get(status)?.size || 0);
    });

    // === STEP 3: Apply SAME-TYPE status filters for dropdown options ===

    // Apply formulation status filter to constrain valid formulations
    if (filters.formulationStatuses.length > 0) {
      validFormulationCodes = new Set(
        Array.from(validFormulationCodes).filter((code) => {
          const status =
            formulationCodeToStatus.get(code) || "Not Yet Evaluated";
          return filters.formulationStatuses.includes(status);
        }),
      );
    }

    // Apply country status filter to constrain valid countries and formulations
    if (filters.countryStatuses.length > 0 && hasCountryData) {
      validCountryCodes = new Set(
        Array.from(validCountryCodes).filter((countryCode) => {
          const statuses = countryCodeToStatuses.get(countryCode);
          return (
            statuses && filters.countryStatuses.some((s) => statuses.has(s))
          );
        }),
      );
      // Also filter formulations - only those with at least one country having matching status
      validFormulationCodes = new Set(
        Array.from(validFormulationCodes).filter((code) => {
          const statuses = formulationToCountryStatuses.get(code);
          return (
            statuses && filters.countryStatuses.some((s) => statuses.has(s))
          );
        }),
      );
    }

    // === STEP 4: Compute available use groups (only when both country AND formulation selected) ===
    const availableUseGroups = new Set<string>();
    const useGroupsDisabled =
      filters.countries.length === 0 || filters.formulations.length === 0;

    if (!useGroupsDisabled) {
      // For each selected country code + formulation code combination, add their use groups
      filters.countries.forEach((countryCode) => {
        selectedFormulationCodes.forEach((formCode) => {
          const key = `${formCode}|${countryCode}`;
          const useGroups = formulationCountryToUseGroups.get(key);
          if (useGroups) {
            useGroups.forEach((ug) => availableUseGroups.add(ug));
          }
        });
      });
    }

    // Convert to final options
    // Country codes sorted, with names for display
    // Ensure we only include countries that have names in the lookup map
    const sortedCountryCodes = Array.from(validCountryCodes)
      .filter((code) => countryCodeToName.has(code)) // Only include countries with names
      .sort((a, b) => {
        const nameA = countryCodeToName.get(a) || a;
        const nameB = countryCodeToName.get(b) || b;
        return nameA.localeCompare(nameB);
      });
    const countryNames = sortedCountryCodes
      .map((code) => countryCodeToName.get(code))
      .filter((name): name is string => !!name);

    // Formulation codes sorted by display name
    const sortedFormulationCodes = Array.from(validFormulationCodes).sort(
      (a, b) => {
        const displayA = formulationCodeToDisplay.get(a) || a;
        const displayB = formulationCodeToDisplay.get(b) || b;
        return displayA.localeCompare(displayB);
      },
    );
    const formulationDisplayNames = sortedFormulationCodes
      .map((code) => formulationCodeToDisplay.get(code))
      .filter((display): display is string => !!display);

    const useGroupOptions = Array.from(availableUseGroups).sort();

    return {
      // Display values for dropdowns
      countries: countryNames,
      countryCodes: sortedCountryCodes,
      formulations: formulationDisplayNames,
      formulationCodes: sortedFormulationCodes,
      useGroups: useGroupOptions,
      formulationStatuses: ALL_FORMULATION_STATUSES,
      countryStatuses: ALL_COUNTRY_STATUSES,
      // Lookup maps for code <-> display conversion
      countryCodeToName,
      countryNameToCode,
      formulationCodeToDisplay,
      displayToFormulationCode,
      // Counts and state
      formulationStatusCounts,
      countryStatusCounts,
      useGroupsDisabled,
    };
  }, [
    referenceFormulations,
    referenceCountries,
    filterableData,
    formulationCountries,
    filters,
  ]);
}
