/**
 * Chart data caching utilities using sessionStorage
 * Implements stale-while-revalidate pattern for instant chart rendering
 */

import type { PortfolioFilters } from "@/hooks/use-portfolio-filters";

const CACHE_PREFIX = "chart-data-";
const CACHE_VERSION = "1"; // Increment to invalidate old caches

interface CachedChartData {
  data: any[];
  filters: PortfolioFilters;
  timestamp: number;
  version: string;
}

/**
 * Generate a stable cache key from filters
 * Normalizes filters by sorting arrays to ensure consistent keys
 */
function getCacheKey(filters: PortfolioFilters): string {
  // Sort all filter arrays to ensure consistent keys regardless of order
  const normalized = {
    countries: [...filters.countries].sort(),
    formulations: [...filters.formulations].sort(),
    useGroups: [...filters.useGroups].sort(),
    formulationStatuses: [...filters.formulationStatuses].sort(),
    countryStatuses: [...filters.countryStatuses].sort(),
  };

  // Create a stable string representation
  const keyString = JSON.stringify(normalized);
  
  // Use a simple hash for shorter keys (optional, but helps with storage)
  // For now, just use the JSON string directly - sessionStorage can handle it
  return `${CACHE_PREFIX}${keyString}`;
}

/**
 * Get cached chart data for the given filters
 * Returns null if no cache exists or cache is invalid
 */
export function getCachedChartData(
  filters: PortfolioFilters,
): any[] | null {
  if (typeof window === "undefined") {
    return null; // Server-side, no cache
  }

  try {
    const cacheKey = getCacheKey(filters);
    const cached = sessionStorage.getItem(cacheKey);

    if (!cached) {
      return null;
    }

    const parsed: CachedChartData = JSON.parse(cached);

    // Check version compatibility
    if (parsed.version !== CACHE_VERSION) {
      // Version mismatch - clear old cache
      sessionStorage.removeItem(cacheKey);
      return null;
    }

    // Verify filters match (should always match due to key, but double-check)
    const filtersMatch =
      JSON.stringify(parsed.filters) === JSON.stringify(filters);

    if (!filtersMatch) {
      // Filters don't match - shouldn't happen, but clear cache
      sessionStorage.removeItem(cacheKey);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("[ChartCache] Error reading cache:", error);
    return null;
  }
}

/**
 * Cache chart data for the given filters
 */
export function setCachedChartData(
  filters: PortfolioFilters,
  data: any[],
): void {
  if (typeof window === "undefined") {
    return; // Server-side, no cache
  }

  try {
    const cacheKey = getCacheKey(filters);
    const cached: CachedChartData = {
      data,
      filters,
      timestamp: Date.now(),
      version: CACHE_VERSION,
    };

    sessionStorage.setItem(cacheKey, JSON.stringify(cached));
  } catch (error) {
    // Handle quota exceeded errors gracefully
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.warn(
        "[ChartCache] Storage quota exceeded - clearing old caches",
      );
      // Clear all chart caches and try again
      clearAllChartCaches();
      try {
        const cacheKey = getCacheKey(filters);
        const cached: CachedChartData = {
          data,
          filters,
          timestamp: Date.now(),
          version: CACHE_VERSION,
        };
        sessionStorage.setItem(cacheKey, JSON.stringify(cached));
      } catch (retryError) {
        console.error("[ChartCache] Failed to cache after clearing:", retryError);
      }
    } else {
      console.error("[ChartCache] Error setting cache:", error);
    }
  }
}

/**
 * Clear all chart caches
 */
export function clearAllChartCaches(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => sessionStorage.removeItem(key));
  } catch (error) {
    console.error("[ChartCache] Error clearing caches:", error);
  }
}

/**
 * Clear cached chart data for specific filters
 */
export function clearCachedChartData(filters: PortfolioFilters): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const cacheKey = getCacheKey(filters);
    sessionStorage.removeItem(cacheKey);
  } catch (error) {
    console.error("[ChartCache] Error clearing cache:", error);
  }
}





