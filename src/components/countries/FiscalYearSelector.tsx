"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiscalYearSelectorProps {
  selectedFY: number;
  onFYChange: (fy: number) => void;
  minFY?: number;
  maxFY?: number;
  className?: string;
}

/**
 * Fiscal Year Selector Component
 * Displays a dropdown to select a fiscal year with hover prefetching
 * Prefetches routes when dropdown opens for faster navigation
 */
export function FiscalYearSelector({
  selectedFY,
  onFYChange,
  minFY = 26,
  maxFY = 35,
  className,
}: FiscalYearSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefetchedRef = useRef<Set<number>>(new Set());

  const yearOptions = useMemo(
    () => Array.from({ length: maxFY - minFY + 1 }, (_, i) => minFY + i),
    [minFY, maxFY],
  );

  // Build URL for a given fiscal year
  const buildFYUrl = useCallback(
    (fy: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("fy", fy.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  // Prefetch all FY routes when dropdown opens
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        // Prefetch all years that haven't been prefetched yet
        yearOptions.forEach((year) => {
          if (year !== selectedFY && !prefetchedRef.current.has(year)) {
            router.prefetch(buildFYUrl(year));
            prefetchedRef.current.add(year);
          }
        });
      }
    },
    [yearOptions, selectedFY, router, buildFYUrl],
  );

  // Prefetch on hover over individual item (belt and suspenders)
  const handleItemHover = useCallback(
    (year: number) => {
      if (!prefetchedRef.current.has(year)) {
        router.prefetch(buildFYUrl(year));
        prefetchedRef.current.add(year);
      }
    },
    [router, buildFYUrl],
  );

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Label htmlFor="fiscal-year-select" className="text-sm font-medium">
          Fiscal Year:
        </Label>
        <Select
          value={selectedFY.toString()}
          onValueChange={(value) => onFYChange(Number.parseInt(value, 10))}
          onOpenChange={handleOpenChange}
        >
          <SelectTrigger id="fiscal-year-select" className="w-24 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem
                key={year}
                value={year.toString()}
                onMouseEnter={() => handleItemHover(year)}
                onFocus={() => handleItemHover(year)}
              >
                FY{year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
