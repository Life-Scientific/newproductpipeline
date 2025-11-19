"use client";

import { useRef, useCallback } from "react";

/**
 * Simple request cache for deduplicating identical API calls.
 * Prevents multiple components from making the same request simultaneously.
 */
class RequestCache {
  private cache = new Map<string, Promise<any>>();

  get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const promise = fetcher().finally(() => {
      // Remove from cache after request completes (success or failure)
      // Keep it short-lived to allow refetching if needed
      setTimeout(() => {
        this.cache.delete(key);
      }, 1000); // 1 second cache
    });

    this.cache.set(key, promise);
    return promise;
  }

  clear() {
    this.cache.clear();
  }
}

const globalCache = new RequestCache();

/**
 * Hook for deduplicating API requests.
 * Returns a cached promise if the same request is already in flight.
 */
export function useRequestCache() {
  const cacheRef = useRef(globalCache);

  const cachedFetch = useCallback(
    <T>(key: string, fetcher: () => Promise<T>): Promise<T> => {
      return cacheRef.current.get(key, fetcher);
    },
    []
  );

  return { cachedFetch };
}



