"use client";

import { Suspense, useMemo } from "react";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { UseGroupsList } from "@/components/use-groups/UseGroupsList";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import { useFilterOptions, type ReferenceFormulation, type ReferenceCountry, type FilterableFormulationCountry } from "@/hooks/use-filter-options";
import type { FormulationCountryUseGroup } from "@/lib/db/types";
import type { Formulation } from "@/lib/db/types";
import type { Country } from "@/lib/db/types";

interface UseGroupWithEnrichment extends FormulationCountryUseGroup {
  formulation_id?: string | null;
  formulation_status?: string | null;
  country_id?: string | null;
  country_status?: string | null;
}

interface UseGroupsClientProps {
  useGroups: UseGroupWithEnrichment[];
  formulations: Formulation[];
  countries: Country[];
}

function UseGroupsContent({
  useGroups,
  formulations,
  countries,
}: UseGroupsClientProps) {
  // Use global portfolio filters from URL
  const { filters } = usePortfolioFilters();

  // Transform reference data for filter options hook
  const referenceFormulations: ReferenceFormulation[] = useMemo(() => {
    return formulations.map((f) => ({
      formulation_code: f.formulation_code || "",
      formulation_name: f.product_name || null,
      status: f.status || null,
    }));
  }, [formulations]);

  const referenceCountriesData: ReferenceCountry[] = useMemo(() => {
    return countries.map((c) => ({
      country_code: c.country_code,
      country_name: c.country_name,
    }));
  }, [countries]);

  // Convert use groups to filterable formulation-country format for useFilterOptions
  const filterableFormulationCountries: FilterableFormulationCountry[] = useMemo(() => {
    return useGroups.map((ug) => ({
      formulation_country_id: ug.formulation_country_id || null,
      formulation_id: ug.formulation_id || null,
      formulation_code: ug.formulation_code || null,
      country_id: ug.country_id || null,
      country_code: ug.country_code || null,
      country_name: ug.country_name || null,
      country_status: ug.country_status || null,
    }));
  }, [useGroups]);

  // Convert to filterable business cases format (empty - not needed for this page)
  const filterableBusinessCases = useMemo(() => {
    return [];
  }, []);

  // Compute filter options with cascading logic
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountriesData,
    filterableBusinessCases,
    filterableFormulationCountries,
    filters
  );

  // Filter use groups based on global filters
  const filteredUseGroups = useMemo(() => {
    return useGroups.filter((ug) => {
      // Country filter - filters.countries contains country codes
      if (filters.countries.length > 0) {
        if (!ug.country_code || !filters.countries.includes(ug.country_code)) {
          return false;
        }
      }

      // Formulation filter - filters.formulations contains codes
      if (filters.formulations.length > 0) {
        if (!ug.formulation_code || !filters.formulations.includes(ug.formulation_code)) {
          return false;
        }
      }

      // Use group filter (by name)
      if (filters.useGroups.length > 0) {
        if (!ug.use_group_name || !filters.useGroups.includes(ug.use_group_name)) {
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
  }, [useGroups, filters]);

  // Compute filtered counts for summary
  const filteredCounts = useMemo(() => {
    const uniqueCountries = new Set<string>();
    const uniqueFormulations = new Set<string>();
    const uniqueFormulationCountries = new Set<string>();

    filteredUseGroups.forEach((ug) => {
      if (ug.country_code) {
        uniqueCountries.add(ug.country_code);
      }
      if (ug.formulation_code) {
        uniqueFormulations.add(ug.formulation_code);
      }
      if (ug.formulation_code && ug.country_code) {
        uniqueFormulationCountries.add(`${ug.formulation_code}|${ug.country_code}`);
      }
    });

    return {
      countries: uniqueCountries.size,
      formulations: uniqueFormulations.size,
      formulationCountries: uniqueFormulationCountries.size,
      businessCases: undefined, // Not directly available
    };
  }, [filteredUseGroups]);

  return (
    <>
      <GlobalFilterBar filterOptions={filterOptions} defaultExpanded={true} filteredCounts={filteredCounts} />
      <Card>
        <CardContent className="p-0">
          <div className="p-6">
            <UseGroupsList useGroups={filteredUseGroups} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function UseGroupsSkeleton() {
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
export function UseGroupsClient(props: UseGroupsClientProps) {
  return (
    <Suspense fallback={<UseGroupsSkeleton />}>
      <UseGroupsContent {...props} />
    </Suspense>
  );
}
