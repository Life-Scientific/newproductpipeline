"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { forwardRef, type ComponentPropsWithRef } from "react";

/**
 * Filter parameter keys that should be preserved when navigating between pages
 */
const FILTER_PARAM_KEYS = [
  "countries",
  "formulations",
  "useGroups",
  "formulationStatuses",
  "countryStatuses",
] as const;

interface FilterPreservingLinkProps extends Omit<ComponentPropsWithRef<typeof Link>, "href"> {
  href: string;
  preserveFilters?: boolean;
}

/**
 * A Link component that automatically preserves filter query parameters
 * when navigating between portfolio pages.
 * 
 * Only preserves filters when navigating to other /portfolio/* pages.
 */
export const FilterPreservingLink = forwardRef<
  HTMLAnchorElement,
  FilterPreservingLinkProps
>(function FilterPreservingLink({ href, preserveFilters = true, children, ...props }, ref) {
  const searchParams = useSearchParams();

  // Build the final href with preserved filter params
  const finalHref = (() => {
    // Only preserve filters for portfolio pages
    if (!preserveFilters || !href.startsWith("/portfolio")) {
      return href;
    }

    // Parse the target URL
    const [basePath, existingQuery] = href.split("?");
    const params = new URLSearchParams(existingQuery || "");

    // Copy filter params from current URL (if not already in target)
    FILTER_PARAM_KEYS.forEach((key) => {
      if (!params.has(key)) {
        const value = searchParams.get(key);
        if (value) {
          params.set(key, value);
        }
      }
    });

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  })();

  return (
    <Link ref={ref} href={finalHref} {...props}>
      {children}
    </Link>
  );
});




