"use client";

import { Suspense, useMemo } from "react";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { FormulationsPageContent } from "@/components/formulations/FormulationsPageContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import { useFilterOptions, type ReferenceFormulation, type ReferenceCountry, type FilterableFormulationCountry } from "@/hooks/use-filter-options";
import type { FormulationWithNestedData } from "@/lib/db/queries";
import type { Formulation } from "@/lib/db/types";
import type { Country } from "@/lib/db/types";

interface FormulationsClientProps {
  formulationsWithNested: FormulationWithNestedData[];
  formulations: Formulation[];
  countries: Country[];
}

function FormulationsContent({
  formulationsWithNested,
  formulations,
  countries,
}: FormulationsClientProps) {
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

  const referenceCountries: ReferenceCountry[] = useMemo(() => {
    return countries.map((c) => ({
      country_code: c.country_code,
      country_name: c.country_name,
    }));
  }, [countries]);

  // Convert formulations to filterable format for useFilterOptions
  // Since we don't have direct formulation_country data, we'll create empty filterable data
  // The filter options will still work for formulation and status filters
  const filterableBusinessCases = useMemo(() => {
    // Return empty array - formulations page doesn't need business case filtering
    // The useFilterOptions hook will still compute formulation and country options
    return [];
  }, []);

  // Build formulation_country data from formulationsWithNested
  // Extract country information from countries_list string if available
  const formulationCountries: FilterableFormulationCountry[] = useMemo(() => {
    const fcData: FilterableFormulationCountry[] = [];
    
    formulationsWithNested.forEach((f) => {
      if (f.countries_list && f.formulation_code) {
        // Parse countries_list (format might be comma-separated country names)
        const countryNames = f.countries_list.split(",").map((name) => name.trim()).filter(Boolean);
        
        countryNames.forEach((countryName) => {
          // Find country code from country name
          const country = countries.find((c) => c.country_name === countryName);
          if (country) {
            fcData.push({
              formulation_country_id: null, // Not available in nested data
              formulation_id: f.formulation_id || null,
              formulation_code: f.formulation_code || null,
              country_id: country.country_id || null,
              country_code: country.country_code || null,
              country_name: countryName,
              country_status: null, // Not available in nested data
            });
          }
        });
      }
    });
    
    return fcData;
  }, [formulationsWithNested, countries]);

  // Compute filter options with cascading logic
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountries,
    filterableBusinessCases,
    formulationCountries.length > 0 ? formulationCountries : null,
    filters
  );

  // Filter formulations based on global filters
  const filteredFormulations = useMemo(() => {
    return formulationsWithNested.filter((f) => {
      // Formulation filter - filters.formulations contains codes
      if (filters.formulations.length > 0) {
        if (!f.formulation_code || !filters.formulations.includes(f.formulation_code)) {
          return false;
        }
      }

      // Formulation status filter
      if (filters.formulationStatuses.length > 0) {
        const status = f.status || "Not Yet Evaluated";
        if (!filters.formulationStatuses.includes(status)) {
          return false;
        }
      }

      // Country filter - check if formulation has any countries matching selected country codes
      if (filters.countries.length > 0) {
        if (!f.countries_list) {
          return false; // No countries associated
        }
        
        // Parse countries_list and check if any match selected country codes
        const countryNames = f.countries_list.split(",").map((name) => name.trim()).filter(Boolean);
        const matchingCountries = countryNames.some((countryName) => {
          const country = countries.find((c) => c.country_name === countryName);
          return country && filters.countries.includes(country.country_code);
        });
        
        if (!matchingCountries) {
          return false;
        }
      }

      // Country status filter - this is more complex as we don't have country_status in nested data
      // For now, we'll skip this filter for formulations page
      // It would require fetching formulation_country data with status

      return true;
    });
  }, [formulationsWithNested, filters, countries]);

  // Compute filtered counts for summary
  const filteredCounts = useMemo(() => {
    const uniqueCountries = new Set<string>();
    const uniqueFormulationCountries = new Set<string>();

    filteredFormulations.forEach((f) => {
      if (f.formulation_code) {
        // Parse countries_list to get unique countries
        if (f.countries_list) {
          const countryNames = f.countries_list.split(",").map((name) => name.trim()).filter(Boolean);
          countryNames.forEach((countryName) => {
            const country = countries.find((c) => c.country_name === countryName);
            if (country?.country_code) {
              uniqueCountries.add(country.country_code);
              if (f.formulation_code) {
                uniqueFormulationCountries.add(`${f.formulation_code}|${country.country_code}`);
              }
            }
          });
        }
      }
    });

    return {
      countries: uniqueCountries.size,
      formulations: filteredFormulations.length,
      formulationCountries: uniqueFormulationCountries.size,
      businessCases: undefined, // Not available on this page
    };
  }, [filteredFormulations, countries]);

  return (
    <>
      <GlobalFilterBar filterOptions={filterOptions} defaultExpanded={true} filteredCounts={filteredCounts} />
      <FormulationsPageContent formulationsWithNested={filteredFormulations} />
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
