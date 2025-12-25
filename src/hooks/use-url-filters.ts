"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";

/**
 * Hook to manage filter state via URL search params for persistence across navigation.
 * Filters are stored in the URL as comma-separated values.
 *
 * Example URL: /business-cases?countries=id1,id2&formulations=id3
 */
export interface FilterState {
  countryIds: string[];
  formulationIds: string[];
  useGroupIds: string[];
}

const PARAM_KEYS = {
  countries: "countries",
  formulations: "formulations",
  useGroups: "useGroups",
} as const;

export function useUrlFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Parse filters from URL
  const filters: FilterState = useMemo(() => {
    const parseParam = (key: string): string[] => {
      const value = searchParams.get(key);
      if (!value) return [];
      return value.split(",").filter(Boolean);
    };

    return {
      countryIds: parseParam(PARAM_KEYS.countries),
      formulationIds: parseParam(PARAM_KEYS.formulations),
      useGroupIds: parseParam(PARAM_KEYS.useGroups),
    };
  }, [searchParams]);

  // Update filters in URL
  const setFilters = useCallback(
    (newFilters: FilterState) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());

        // Helper to set or delete param
        const updateParam = (key: string, values: string[]) => {
          if (values.length > 0) {
            params.set(key, values.join(","));
          } else {
            params.delete(key);
          }
        };

        updateParam(PARAM_KEYS.countries, newFilters.countryIds);
        updateParam(PARAM_KEYS.formulations, newFilters.formulationIds);
        updateParam(PARAM_KEYS.useGroups, newFilters.useGroupIds);

        // Use replace to avoid adding to browser history for each filter change
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl, { scroll: false });
      });
    },
    [searchParams, pathname, router],
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(PARAM_KEYS.countries);
      params.delete(PARAM_KEYS.formulations);
      params.delete(PARAM_KEYS.useGroups);
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    });
  }, [searchParams, pathname, router]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.countryIds.length > 0 ||
      filters.formulationIds.length > 0 ||
      filters.useGroupIds.length > 0
    );
  }, [filters]);

  return {
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
    isPending,
  };
}

/**
 * Generic hook for single filter persistence in URL
 */
export function useUrlParam(paramName: string, defaultValue: string = "") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const value = useMemo(() => {
    return searchParams.get(paramName) ?? defaultValue;
  }, [searchParams, paramName, defaultValue]);

  const setValue = useCallback(
    (newValue: string) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (newValue && newValue !== defaultValue) {
          params.set(paramName, newValue);
        } else {
          params.delete(paramName);
        }
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl, { scroll: false });
      });
    },
    [searchParams, pathname, router, paramName, defaultValue],
  );

  return [value, setValue, isPending] as const;
}

/**
 * Hook for array filter persistence in URL (comma-separated)
 */
export function useUrlArrayParam(paramName: string) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const values = useMemo(() => {
    const param = searchParams.get(paramName);
    if (!param) return [];
    return param.split(",").filter(Boolean);
  }, [searchParams, paramName]);

  const setValues = useCallback(
    (newValues: string[]) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (newValues.length > 0) {
          params.set(paramName, newValues.join(","));
        } else {
          params.delete(paramName);
        }
        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname;
        router.replace(newUrl, { scroll: false });
      });
    },
    [searchParams, pathname, router, paramName],
  );

  return [values, setValues, isPending] as const;
}


