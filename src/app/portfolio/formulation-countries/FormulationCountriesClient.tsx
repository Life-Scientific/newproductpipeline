"use client";

import { Suspense, useMemo } from "react";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { FormulationCountriesList } from "@/components/formulations/FormulationCountriesList";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import { useFilterOptions, type ReferenceFormulation, type ReferenceCountry, type FilterableFormulationCountry } from "@/hooks/use-filter-options";
import type { FormulationCountryDetail } from "@/lib/db/queries";
import type { Formulation } from "@/lib/db/types";
import type { Country } from "@/lib/db/types";

interface FormulationCountriesClientProps {
  countries: (FormulationCountryDetail & {
    formulation_id?: string | null;
    formulation_status?: string | null;
    formulation_name?: string | null;
    country_id?: string | null;
  })[];
  formulations: Formulation[];
  referenceCountries: Country[];
}

function FormulationCountriesContent({
  countries,
  formulations,
  referenceCountries,
}: FormulationCountriesClientProps) {
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
    return referenceCountries.map((c) => ({
      country_code: c.country_code,
      country_name: c.country_name,
    }));
  }, [referenceCountries]);

  // Convert formulation countries to filterable format
  const filterableFormulationCountries: FilterableFormulationCountry[] = useMemo(() => {
    return countries.map((fc) => ({
      formulation_country_id: fc.formulation_country_id || null,
      formulation_id: fc.formulation_id || null,
      formulation_code: fc.formulation_code || null,
      country_id: fc.country_id || null,
      country_code: fc.country_code || null,
      country_name: fc.country_name || null,
      country_status: fc.country_status || null,
    }));
  }, [countries]);

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

  // Filter formulation countries based on global filters
  const filteredCountries = useMemo(() => {
    return countries.filter((fc) => {
      // Country filter - filters.countries contains country codes
      if (filters.countries.length > 0) {
        if (!fc.country_code || !filters.countries.includes(fc.country_code)) {
          return false;
        }
      }

      // Formulation filter - filters.formulations contains codes
      if (filters.formulations.length > 0) {
        if (!fc.formulation_code || !filters.formulations.includes(fc.formulation_code)) {
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
  }, [countries, filters]);

  // Compute filtered counts for summary
  const filteredCounts = useMemo(() => {
    const uniqueCountries = new Set<string>();
    const uniqueFormulations = new Set<string>();

    filteredCountries.forEach((fc) => {
      if (fc.country_code) {
        uniqueCountries.add(fc.country_code);
      }
      if (fc.formulation_code) {
        uniqueFormulations.add(fc.formulation_code);
      }
    });

    return {
      countries: uniqueCountries.size,
      formulations: uniqueFormulations.size,
      formulationCountries: filteredCountries.length,
      businessCases: undefined, // Not directly available
    };
  }, [filteredCountries]);

  return (
    <>
      <GlobalFilterBar filterOptions={filterOptions} defaultExpanded={true} filteredCounts={filteredCounts} />
      <Card>
        <CardContent className="p-0">
          <div className="p-6">
            <FormulationCountriesList countries={filteredCountries} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function FormulationCountriesSkeleton() {
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
export function FormulationCountriesClient(props: FormulationCountriesClientProps) {
  return (
    <Suspense fallback={<FormulationCountriesSkeleton />}>
      <FormulationCountriesContent {...props} />
    </Suspense>
  );
}
