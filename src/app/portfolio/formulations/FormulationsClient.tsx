"use client";

import { Suspense, useMemo } from "react";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { FormulationsPageContent } from "@/components/formulations/FormulationsPageContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import {
  useFilterOptions,
  type ReferenceFormulation,
  type ReferenceCountry,
  type FilterableFormulationCountry,
} from "@/hooks/use-filter-options";
import { computeFilteredCounts } from "@/lib/utils/filter-counts";
import { useFormulationsWithPortfolioFilters } from "@/lib/queries/formulations";
import type { FormulationWithNestedData } from "@/lib/db/queries";
import type { Formulation } from "@/lib/db/types";
import type { Country } from "@/lib/db/types";
import type { FormulationCountryDetail } from "@/lib/db/types";

interface FormulationsClientProps {
  initialFormulations: FormulationWithNestedData[];
  totalCount: number;
  hasMore: boolean;
  formulations: Formulation[];
  countries: Country[];
  formulationCountries: FormulationCountryDetail[];
}

function FormulationsContent({
  initialFormulations,
  totalCount: initialTotalCount,
  hasMore: initialHasMore,
  formulations,
  countries,
  formulationCountries,
}: FormulationsClientProps) {
  // Use global portfolio filters from URL
  const { filters } = usePortfolioFilters();

  // Fetch formulations with server-side filtering based on URL filters
  // Uses SSR data as initialData, then refetches with filters on client
  const {
    data: formulationsWithNested = initialFormulations,
    isLoading,
    isFetching,
  } = useFormulationsWithPortfolioFilters(filters);

  const isBackgroundLoading = isFetching && !isLoading;

  // Create formulation status lookup map
  const formulationStatusMap = useMemo(() => {
    const map = new Map<string, string>();
    formulations.forEach((f) => {
      if (f.formulation_code && f.status) {
        map.set(f.formulation_code, f.status);
      }
    });
    return map;
  }, [formulations]);

  // Enrich formulation-country data with formulation status
  const enrichedFormulationCountries = useMemo(() => {
    if (!formulationCountries || !Array.isArray(formulationCountries)) {
      return [];
    }
    return formulationCountries.map((fc) => ({
      ...fc,
      formulation_status: fc.formulation_code
        ? formulationStatusMap.get(fc.formulation_code) || null
        : null,
    }));
  }, [formulationCountries, formulationStatusMap]);

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

  // Convert formulations to filterable format for useFilterOptions
  const filterableBusinessCases = useMemo(() => {
    // Return empty array - formulations page doesn't need business case filtering
    return [];
  }, []);

  // Convert formulationCountries prop to FilterableFormulationCountry format for useFilterOptions
  const filterableFormulationCountries: FilterableFormulationCountry[] =
    useMemo(() => {
      return enrichedFormulationCountries.map((fc) => ({
        formulation_country_id: fc.formulation_country_id || null,
        formulation_id: null, // FormulationCountryDetail doesn't have formulation_id, only formulation_code
        formulation_code: fc.formulation_code || null,
        country_id: null, // FormulationCountryDetail doesn't have country_id, only country_code
        country_code: fc.country_code || null,
        country_name: fc.country_name || null,
        country_status: fc.country_status || null,
      }));
    }, [enrichedFormulationCountries]);

  // Compute filter options with cascading logic
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountries,
    filterableBusinessCases,
    filterableFormulationCountries.length > 0
      ? filterableFormulationCountries
      : null,
    filters,
  );

  // Server-side filtering applied - formulationsWithNested is already filtered
  // No need for client-side filtering anymore (80%+ data reduction on server)
  const filteredFormulations = formulationsWithNested;

  // Still need to filter formulation-countries for accurate counts
  // This is a smaller dataset and needed for filter cascading
  const filteredFormulationCountries = useMemo(() => {
    return enrichedFormulationCountries.filter((fc) => {
      // Country filter
      if (filters.countries.length > 0) {
        if (!fc.country_code || !filters.countries.includes(fc.country_code)) {
          return false;
        }
      }
      // Formulation filter
      if (filters.formulations.length > 0) {
        if (
          !fc.formulation_code ||
          !filters.formulations.includes(fc.formulation_code)
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
  }, [enrichedFormulationCountries, filters]);

  // Compute filtered counts for summary using unified counting utility
  const filteredCounts = useMemo(() => {
    return computeFilteredCounts(
      formulations,
      filteredFormulationCountries,
      filters,
      { includeOrphanFormulations: true }, // Formulations page should include orphans
    );
  }, [formulations, filteredFormulationCountries, filters]);

  return (
    <>
      <GlobalFilterBar
        filterOptions={filterOptions}
        defaultExpanded={true}
        filteredCounts={filteredCounts}
      />
      {isBackgroundLoading && (
        <div className="mb-4 text-sm text-muted-foreground text-center">
          Applying filters...
        </div>
      )}
      {isLoading ? (
        <Card>
          <CardContent>
            <Skeleton className="h-[400px] w-full" />
          </CardContent>
        </Card>
      ) : (
        <FormulationsPageContent formulationsWithNested={filteredFormulations} />
      )}
    </>
  );
}

function FormulationsSkeleton() {
  return (
    <>
      <Card className="mb-6 p-4">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="flex gap-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-24" />
        </div>
      </Card>
      <Card>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    </>
  );
}

// Wrap in Suspense for useSearchParams
export function FormulationsClient(props: FormulationsClientProps) {
  return (
    <Suspense fallback={<FormulationsSkeleton />}>
      <FormulationsContent {...props} />
    </Suspense>
  );
}
