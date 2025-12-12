"use client";

import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Hook for managing progressive data loading
 * Fetches initial data, then loads remaining data in background
 */
export function useProgressiveLoad<T>(
  initialData: T[],
  initialTotalCount: number,
  initialHasMore: boolean,
  fetchRemaining: (offset: number) => Promise<T[]>,
  options: {
    onProgress?: (loaded: number, total: number) => void;
  } = {},
) {
  const { onProgress } = options;
  
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading] = useState(false); // Initial data is already loaded
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(false);
  const [totalCount] = useState(initialTotalCount);
  const [error, setError] = useState<Error | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Initialize with server-provided data and start background loading if needed
  useEffect(() => {
    setData(initialData);
    
    // Start background loading if there's more data
    if (initialHasMore && initialData.length > 0) {
      loadRemaining(initialData.length);
    }
  }, [initialData, initialHasMore]);

  const loadRemaining = useCallback(async (offset: number) => {
    // Cancel any existing background load
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    setIsBackgroundLoading(true);
    
    try {
      const remainingData = await fetchRemaining(offset);
      
      if (!isMountedRef.current || abortControllerRef.current.signal.aborted) {
        return;
      }
      
      setData((prev) => [...prev, ...remainingData]);
      setIsBackgroundLoading(false);
      
      if (onProgress) {
        onProgress(offset + remainingData.length, initialTotalCount);
      }
    } catch (err) {
      if (!isMountedRef.current || abortControllerRef.current.signal.aborted) {
        return;
      }
      
      // Don't set error for background load failures - just log
      console.error("Background load failed:", err);
      setIsBackgroundLoading(false);
    }
  }, [fetchRemaining, onProgress, initialTotalCount]);

  return {
    data,
    isLoading,
    isBackgroundLoading,
    totalCount,
    error,
    refresh: () => {
      // Refresh would need to be handled by parent component
      console.warn("Refresh not implemented - reload page to refresh");
    },
    loadRemaining: () => loadRemaining(data.length),
  };
}

