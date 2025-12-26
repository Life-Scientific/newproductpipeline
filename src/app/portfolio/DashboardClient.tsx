"use client";

import { Suspense, useMemo, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { log, warn, error, table } from "@/lib/logger";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { TenYearProjectionChart } from "@/components/charts/TenYearProjectionChart";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import {
  useFilterOptions,
  type ReferenceFormulation,
  type ReferenceCountry,
} from "@/hooks/use-filter-options";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import { computeFilteredCounts } from "@/lib/utils/filter-counts";
import {
  fetchBusinessCasesForChartAction,
  fetchBusinessCasesForChartFilteredAction,
  fetchBusinessCaseChartAggregatesAction,
} from "@/lib/actions/chart-actions";
import type { Database } from "@/lib/supabase/database.types";
import type { Country } from "@/lib/db/types";
import type { Formulation } from "@/lib/db/types";
import type {
  FormulationCountryDetail,
  FormulationCountryUseGroup,
} from "@/lib/db/types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"] & {
  country_id?: string | null;
  country_status?: string | null;
  formulation_country_id?: string | null;
  formulation_status?: string | null;
};

interface DashboardClientProps {
  businessCases: BusinessCase[];
  formulations: Formulation[];
  countries: Country[];
  formulationCountries: (FormulationCountryDetail & {
    formulation_status?: string | null;
  })[];
  useGroups?: (FormulationCountryUseGroup & {
    formulation_status?: string | null;
    country_status?: string | null;
  })[];
}

const DashboardContent = memo(function DashboardContent({
  businessCases: initialBusinessCases,
  formulations,
  countries,
  formulationCountries,
  useGroups = [],
}: DashboardClientProps) {
  const { filters } = usePortfolioFilters();

  const hasFilters =
    filters.countries.length > 0 ||
    filters.formulations.length > 0 ||
    filters.useGroups.length > 0 ||
    filters.formulationStatuses.length > 0 ||
    filters.countryStatuses.length > 0;

  // Keep fetching business cases for filter counts (needed for GlobalFilterBar)
  // These are pre-filtered by the server, so no redundant client-side filtering
  const {
    data: businessCases = initialBusinessCases,
    isLoading: isLoadingBusinessCases,
  } = useQuery({
    queryKey: ["businessCases-chart", filters],
    queryFn: () => {
      return hasFilters
        ? fetchBusinessCasesForChartFilteredAction(filters)
        : fetchBusinessCasesForChartAction();
    },
    initialData: !hasFilters ? initialBusinessCases : undefined,
    staleTime: 5 * 60 * 1000,
  });

  // OPTIMIZED: Use aggregated chart data (99%+ payload reduction)
  // Returns pre-aggregated data by fiscal year instead of raw rows
  // This reduces the chart rendering payload from ~2-3MB to ~2KB
  const {
    data: chartAggregates = [],
    isLoading: isLoadingChartData,
  } = useQuery({
    queryKey: ["businessCases-chart-aggregates", filters],
    queryFn: () => fetchBusinessCaseChartAggregatesAction(filters),
    staleTime: 5 * 60 * 1000,
  });

  const formulationStatusMap = useMemo(() => {
    const map = new Map<string, string>();
    formulations.forEach((f) => {
      if (f.formulation_code && f.status) {
        map.set(f.formulation_code, f.status);
      }
    });
    return map;
  }, [formulations]);

  const enrichedBusinessCases = useMemo(() => {
    return businessCases.map((bc) => ({
      ...bc,
      formulation_status: bc.formulation_code
        ? formulationStatusMap.get(bc.formulation_code) || null
        : null,
    }));
  }, [businessCases, formulationStatusMap]);

  // Transform reference data for filter options hook
  const referenceFormulations: ReferenceFormulation[] = useMemo(() => {
    return formulations.map((f) => ({
      formulation_code: f.formulation_code || "",
      formulation_name: f.product_name || null,
      status: f.status || null,
    }));
  }, [formulations]);

  const referenceCountries: ReferenceCountry[] = useMemo(() => {
    return countries.map((c) => ({
      country_code: c.country_code,
      country_name: c.country_name,
    }));
  }, [countries]);

  // Convert business cases to filterable format
  const filterableBusinessCases = useMemo(() => {
    return enrichedBusinessCases.map((bc) => ({
      business_case_group_id: bc.business_case_group_id || null,
      country_id: bc.country_id || null,
      country_code: bc.country_code || null,
      country_name: bc.country_name || null,
      country_status: bc.country_status || null,
      formulation_id: bc.formulation_id || null,
      formulation_code: bc.formulation_code || null,
      formulation_name: bc.formulation_name || null,
      formulation_country_id: bc.formulation_country_id || null,
      use_group_name: bc.use_group_name || null,
    }));
  }, [enrichedBusinessCases]);

  // Compute filter options with cascading logic using standardized reference data
  // Pass formulationCountries to ensure country options are available even when business cases are filtered out
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountries,
    filterableBusinessCases,
    formulationCountries.length > 0
      ? formulationCountries.map((fc) => ({
          formulation_country_id: fc.formulation_country_id || null,
          formulation_id: null,
          formulation_code: fc.formulation_code || null,
          country_id: null,
          country_code: fc.country_code || null,
          country_name: fc.country_name || null,
          country_status: fc.country_status || null,
        }))
      : null,
    filters,
  );

  // filters.formulations now contains codes directly
  const selectedFormulationCodes = filters.formulations;

  // Filter formulation-country data based on global filters
  const filteredFormulationCountries = useMemo(() => {
    return formulationCountries.filter((fc) => {
      // Country filter - filters.countries now contains country codes
      if (filters.countries.length > 0) {
        if (!fc.country_code || !filters.countries.includes(fc.country_code)) {
          return false;
        }
      }
      // Formulation filter - filters.formulations now contains codes
      if (selectedFormulationCodes.length > 0) {
        if (
          !fc.formulation_code ||
          !selectedFormulationCodes.includes(fc.formulation_code)
        ) {
          return false;
        }
      }
      // Formulation status filter
      if (filters.formulationStatuses.length > 0) {
        const status = fc.formulation_status || "Not Yet Evaluated";
        if (!filters.formulationStatuses.includes(status)) {
          return false;
        }
      }
      // Country status filter
      if (filters.countryStatuses.length > 0) {
        const countryStatus = fc.country_status || "Not yet evaluated";
        if (!filters.countryStatuses.includes(countryStatus)) {
          return false;
        }
      }
      return true;
    });
  }, [formulationCountries, filters, selectedFormulationCodes]);

  // REMOVED: Client-side filtering is redundant - server already filters via fetchBusinessCasesForChartFilteredAction
  // enrichedBusinessCases already contains the correctly filtered data from the server
  const filteredBusinessCases = enrichedBusinessCases;

  // Filter use groups based on global filters
  const filteredUseGroups = useMemo(() => {
    if (!useGroups || useGroups.length === 0) return [];

    return useGroups.filter((ug) => {
      // Country filter
      if (filters.countries.length > 0) {
        if (!ug.country_code || !filters.countries.includes(ug.country_code)) {
          return false;
        }
      }
      // Formulation filter
      if (selectedFormulationCodes.length > 0) {
        if (
          !ug.formulation_code ||
          !selectedFormulationCodes.includes(ug.formulation_code)
        ) {
          return false;
        }
      }
      // Use group filter (by name)
      if (filters.useGroups.length > 0) {
        if (
          !ug.use_group_name ||
          !filters.useGroups.includes(ug.use_group_name)
        ) {
          return false;
        }
      }
      // Formulation status filter
      if (filters.formulationStatuses.length > 0) {
        const status = ug.formulation_status || "Not Yet Evaluated";
        if (!filters.formulationStatuses.includes(status)) {
          return false;
        }
      }
      // Country status filter
      if (filters.countryStatuses.length > 0) {
        const countryStatus = ug.country_status || "Not yet evaluated";
        if (!filters.countryStatuses.includes(countryStatus)) {
          return false;
        }
      }
      return true;
    });
  }, [useGroups, filters, selectedFormulationCodes]);

  // Compute filtered counts for summary using unified counting utility
  const filteredCounts = useMemo(() => {
    return computeFilteredCounts(
      formulations,
      filteredFormulationCountries,
      filters,
      { includeOrphanFormulations: false }, // Dashboard only shows counts, not orphan display
      {
        useGroups: filteredUseGroups,
        businessCases: filteredBusinessCases,
      },
    );
  }, [
    formulations,
    filteredFormulationCountries,
    filters,
    filteredUseGroups,
    filteredBusinessCases,
  ]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Integrated Filters */}
        <GlobalFilterBar
          filterOptions={filterOptions}
          defaultExpanded={true}
          filteredCounts={filteredCounts}
          inline={true}
          integrated={true}
        />

        {/* Chart - using optimized aggregated data */}
        <TenYearProjectionChart
          chartData={chartAggregates}
          formulations={formulations}
          uniqueFormulations={filteredCounts.formulations}
          uniqueBusinessCaseGroups={filteredCounts.businessCases ? countUniqueBusinessCaseGroups(filteredBusinessCases) : undefined}
          noCard={true}
        />
      </CardContent>
    </Card>
  );
});

function DashboardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Integrated Filters Skeleton */}
        <div className="border-b border-border/50 pb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-muted/20 -mt-4 sm:-mt-6 pt-4 sm:pt-6 rounded-t-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-7 rounded-md" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* Filter Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>

          {/* Results Summary */}
          <div className="pt-4 border-t bg-muted/30 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-md mt-4">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="space-y-4">
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-80" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-px" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          {/* Chart Area */}
          <Skeleton className="h-[400px] sm:h-[500px] w-full rounded-lg" />

          {/* Table Skeleton */}
          <div className="pt-4 border-t space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Wrap in Suspense for useSearchParams
export function DashboardClient(props: DashboardClientProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent {...props} />
    </Suspense>
  );
}
