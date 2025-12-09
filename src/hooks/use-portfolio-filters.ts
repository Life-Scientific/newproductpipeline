"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";

/**
 * Portfolio filter state interface
 * Uses codes for compact URLs (country codes, formulation codes)
 */
export interface PortfolioFilters {
  countries: string[]; // Country codes (e.g., "IE", "FR")
  formulations: string[]; // Formulation codes (e.g., "312-01", "001-01")
  useGroups: string[]; // Use group names
  formulationStatuses: string[]; // "Selected", "Monitoring", etc.
  countryStatuses: string[]; // "Selected for entry", etc.
}

/**
 * Default filter values applied when no URL params are present
 */
const DEFAULT_FILTERS: Partial<PortfolioFilters> = {
  formulationStatuses: ["Selected"],
  countryStatuses: ["Selected for entry"],
};

const PARAM_KEYS = {
  countries: "countries",
  formulations: "formulations",
  useGroups: "useGroups",
  formulationStatuses: "formulationStatuses",
  countryStatuses: "countryStatuses",
} as const;

/**
 * Hook to manage global portfolio filters via URL search params.
 * Filters persist across navigation and can be shared across pages.
 *
 * @param defaultOverrides - Optional overrides for default filter values per page
 * @returns Filter state and update functions
 *
 * @example
 * ```tsx
 * const { filters, setFilters, clearFilters, hasActiveFilters } = usePortfolioFilters();
 *
 * // Apply filters using codes
 * setFilters({ ...filters, countries: ["IE", "FR"], formulations: ["001-01", "312-01"] });
 * ```
 */
export function usePortfolioFilters(
  defaultOverrides?: Partial<PortfolioFilters>,
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Merge defaults with overrides
  const effectiveDefaults = useMemo(() => {
    return { ...DEFAULT_FILTERS, ...defaultOverrides };
  }, [defaultOverrides]);

  // Check if any filter params exist in URL
  const hasAnyParams = useMemo(() => {
    return Array.from(Object.values(PARAM_KEYS)).some((key) =>
      searchParams.has(key),
    );
  }, [searchParams]);

  // Track if we've already redirected to add defaults
  const hasRedirected = useRef(false);

  // Parse filters from URL - always parse what's in URL, defaults are added via redirect
  const filters: PortfolioFilters = useMemo(() => {
    const parseParam = (key: string): string[] => {
      const value = searchParams.get(key);
      if (!value) return [];
      // URLSearchParams already handles decoding, no need for manual decodeURIComponent
      return value.split(",").filter(Boolean);
    };

    return {
      countries: parseParam(PARAM_KEYS.countries),
      formulations: parseParam(PARAM_KEYS.formulations),
      useGroups: parseParam(PARAM_KEYS.useGroups),
      formulationStatuses: parseParam(PARAM_KEYS.formulationStatuses),
      countryStatuses: parseParam(PARAM_KEYS.countryStatuses),
    };
  }, [searchParams]);

  // On first load with no params, redirect to URL with defaults (makes defaults explicit)
  useEffect(() => {
    if (!hasAnyParams && !hasRedirected.current) {
      hasRedirected.current = true;

      // Build URL with default params
      const params = new URLSearchParams();
      if (effectiveDefaults.formulationStatuses?.length) {
        params.set(
          PARAM_KEYS.formulationStatuses,
          effectiveDefaults.formulationStatuses.join(","),
        );
      }
      if (effectiveDefaults.countryStatuses?.length) {
        params.set(
          PARAM_KEYS.countryStatuses,
          effectiveDefaults.countryStatuses.join(","),
        );
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    }
  }, [hasAnyParams, effectiveDefaults, pathname, router]);

  // Update filters in URL - use push for immediate URL update and state refresh
  const setFilters = useCallback(
    (newFilters: Partial<PortfolioFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Helper to set or delete param
      const updateParam = (key: string, values: string[]) => {
        if (values.length > 0) {
          // URLSearchParams handles encoding automatically - don't double-encode
          params.set(key, values.join(","));
        } else {
          params.delete(key);
        }
      };

      // Update only the filters that are provided
      if (newFilters.countries !== undefined) {
        updateParam(PARAM_KEYS.countries, newFilters.countries);
      }
      if (newFilters.formulations !== undefined) {
        updateParam(PARAM_KEYS.formulations, newFilters.formulations);
      }
      if (newFilters.useGroups !== undefined) {
        updateParam(PARAM_KEYS.useGroups, newFilters.useGroups);
      }
      if (newFilters.formulationStatuses !== undefined) {
        updateParam(
          PARAM_KEYS.formulationStatuses,
          newFilters.formulationStatuses,
        );
      }
      if (newFilters.countryStatuses !== undefined) {
        updateParam(PARAM_KEYS.countryStatuses, newFilters.countryStatuses);
      }

      // Build new URL
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      // Use push instead of replace for better state synchronization
      // scroll: false prevents jumping to top
      router.push(newUrl, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  // Update a single filter type
  const setFilter = useCallback(
    <K extends keyof PortfolioFilters>(key: K, value: PortfolioFilters[K]) => {
      setFilters({ [key]: value } as Partial<PortfolioFilters>);
    },
    [setFilters],
  );

  // Reset filters to defaults
  const resetToDefaults = useCallback(() => {
    const params = new URLSearchParams();
    // Set default values explicitly in URL
    if (effectiveDefaults.formulationStatuses?.length) {
      params.set(
        PARAM_KEYS.formulationStatuses,
        effectiveDefaults.formulationStatuses.join(","),
      );
    }
    if (effectiveDefaults.countryStatuses?.length) {
      params.set(
        PARAM_KEYS.countryStatuses,
        effectiveDefaults.countryStatuses.join(","),
      );
    }
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.push(newUrl, { scroll: false });
  }, [effectiveDefaults, pathname, router]);

  // Clear ALL filters completely (including status filters to empty)
  const clearAllFilters = useCallback(() => {
    // Set all filters to empty - this removes all filters including defaults
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.countries.length > 0 ||
      filters.formulations.length > 0 ||
      filters.useGroups.length > 0 ||
      filters.formulationStatuses.length > 0 ||
      filters.countryStatuses.length > 0
    );
  }, [filters]);

  return {
    filters,
    setFilters,
    setFilter,
    resetToDefaults,
    clearAllFilters,
    hasActiveFilters,
  };
}
