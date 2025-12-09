"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ForesightManager, type ForesightRegisterOptions } from "js.foresight";

// Track if ForesightManager has been initialized
let isInitialized = false;

/**
 * Initialize ForesightManager singleton.
 * Should be called once at app level, but safe to call multiple times.
 */
export function initializeForesight() {
  if (typeof window === "undefined" || isInitialized) return;

  ForesightManager.initialize({
    // Predict 100ms ahead for snappy prefetching
    trajectoryPredictionTime: 100,
    // Enable all prediction modes
    enableMousePrediction: true,
    enableTabPrediction: true,
    enableScrollPrediction: true,
    // Default hit slop - expand clickable area for earlier detection
    defaultHitSlop: { top: 20, right: 20, bottom: 40, left: 20 },
    // Tab offset for keyboard navigation
    tabOffset: 2,
    // Touch device strategy - prefetch on touch start
    touchDeviceStrategy: "onTouchStart",
    // Only disable prefetching on very slow connections
    minimumConnectionType: "2g",
  });

  isInitialized = true;
}

/**
 * Hook to prefetch a route when ForesightJS predicts user intent.
 * Registers the element with ForesightManager and prefetches on predicted interaction.
 *
 * @param href - The route to prefetch
 * @param options - Optional ForesightJS registration options (without element and callback)
 * @returns ref callback to attach to the element
 *
 * @example
 * ```tsx
 * const prefetchRef = usePrefetchOnIntent("/dashboard");
 * return <Link ref={prefetchRef} href="/dashboard">Dashboard</Link>
 * ```
 */
export function usePrefetchOnIntent(
  href: string,
  options?: Omit<ForesightRegisterOptions, "element" | "callback">,
) {
  const router = useRouter();
  const elementRef = useRef<Element | null>(null);
  const prefetchedRef = useRef(false);

  // Prefetch callback - memoized to avoid re-registration
  const prefetchCallback = useCallback(() => {
    if (prefetchedRef.current) return;

    // Prefetch the route
    router.prefetch(href);
    prefetchedRef.current = true;
  }, [href, router]);

  // Reset prefetched state when href changes
  useEffect(() => {
    prefetchedRef.current = false;
  }, [href]);

  // Register/unregister element with ForesightManager
  useEffect(() => {
    // Ensure ForesightManager is initialized
    initializeForesight();

    const element = elementRef.current;
    if (!element || !ForesightManager.isInitiated) return;

    // Register the element
    ForesightManager.instance.register({
      element,
      callback: prefetchCallback,
      name: `prefetch-${href}`,
      // Allow re-prefetching after 30 seconds (in case route data becomes stale)
      reactivateAfter: 30000,
      ...options,
    });

    // Cleanup on unmount
    return () => {
      if (element && ForesightManager.isInitiated) {
        ForesightManager.instance.unregister(element, "apiCall");
      }
    };
  }, [href, prefetchCallback, options]);

  // Ref callback to capture the element
  const setRef = useCallback((node: Element | null) => {
    elementRef.current = node;
  }, []);

  return setRef;
}

/**
 * Hook to initialize ForesightManager at the app level.
 * Call this once in a layout or root component.
 */
export function useForesightInit() {
  useEffect(() => {
    initializeForesight();
  }, []);
}
