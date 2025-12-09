"use client";

import { Suspense, useMemo } from "react";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { CountryList } from "@/components/countries/CountryList";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import {
  useFilterOptions,
  type ReferenceFormulation,
  type ReferenceCountry,
  type FilterableBusinessCase,
} from "@/hooks/use-filter-options";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import { computeFilteredCounts } from "@/lib/utils/filter-counts";
import type { CountryWithStats } from "@/lib/db/countries";
import type { Database } from "@/lib/supabase/database.types";
import type { Formulation } from "@/lib/db/types";
import type { Country } from "@/lib/db/types";
import type { FormulationCountryDetail } from "@/lib/db/types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"] & {
  formulation_status?: string | null;
  country_status?: string | null;
};

interface CountriesClientProps {
  countries: CountryWithStats[];
  businessCases: BusinessCase[];
  formulations: Formulation[];
  referenceCountries: Country[];
  formulationCountries: FormulationCountryDetail[];
}

function CountriesContent({
  countries,
  businessCases,
  formulations,
  referenceCountries,
  formulationCountries,
}: CountriesClientProps) {
  // Use global portfolio filters from URL - Countries page doesn't need default status filters
  // since it's focused on geographic data, not formulation selection status
  const { filters } = usePortfolioFilters({
    formulationStatuses: [], // No default formulation status filter for countries page
    countryStatuses: [], // No default country status filter - show all countries
  });

  // Ensure filters object is fully initialized (defensive check)
  const safeFilters = {
    countries: filters?.countries ?? [],
    formulations: filters?.formulations ?? [],
    useGroups: filters?.useGroups ?? [],
    formulationStatuses: filters?.formulationStatuses ?? [],
    countryStatuses: filters?.countryStatuses ?? [],
  };

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

  const referenceCountriesData: ReferenceCountry[] = useMemo(() => {
    return referenceCountries.map((c) => ({
      country_code: c.country_code,
      country_name: c.country_name,
    }));
  }, [referenceCountries]);

  // Convert business cases to filterable format
  const filterableBusinessCases: FilterableBusinessCase[] = useMemo(() => {
    return businessCases.map((bc) => ({
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
  }, [businessCases]);

  // Compute filter options with cascading logic
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountriesData,
    filterableBusinessCases,
    null, // No formulation_country data needed for countries page
    safeFilters,
  );

  // Filter business cases based on global filters
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => {
      // Country filter - safeFilters.countries contains country codes
      if (safeFilters.countries.length > 0) {
        if (
          !bc.country_code ||
          !safeFilters.countries.includes(bc.country_code)
        ) {
          return false;
        }
      }

      // Formulation filter - safeFilters.formulations contains codes
      if (safeFilters.formulations.length > 0) {
        if (
          !bc.formulation_code ||
          !safeFilters.formulations.includes(bc.formulation_code)
        ) {
          return false;
        }
      }

      // Use group filter (by name)
      if (safeFilters.useGroups.length > 0) {
        if (
          !bc.use_group_name ||
          !safeFilters.useGroups.includes(bc.use_group_name)
        ) {
          return false;
        }
      }

      // Formulation status filter
      if (safeFilters.formulationStatuses.length > 0) {
        const status = bc.formulation_status || "Not Yet Evaluated";
        if (!safeFilters.formulationStatuses.includes(status)) {
          return false;
        }
      }

      // Country status filter
      if (safeFilters.countryStatuses.length > 0) {
        const countryStatus = bc.country_status || "Not yet evaluated";
        if (!safeFilters.countryStatuses.includes(countryStatus)) {
          return false;
        }
      }

      return true;
    });
  }, [businessCases, safeFilters]);

  // Filter countries based on global filters
  // A country is shown if:
  // 1. It matches country filter (if any)
  // 2. It has business cases matching formulation/formulation status filters (if any)
  // 3. It has business cases matching country status filters (if any)
  const filteredCountries = useMemo(() => {
    // First, get unique country codes from filtered business cases
    const countryCodesWithFilteredBCs = new Set<string>();
    filteredBusinessCases.forEach((bc) => {
      if (bc.country_code) {
        countryCodesWithFilteredBCs.add(bc.country_code);
      }
    });

    return countries.filter((country) => {
      // Country filter - direct match
      if (safeFilters.countries.length > 0) {
        if (
          !country.country_code ||
          !safeFilters.countries.includes(country.country_code)
        ) {
          return false;
        }
      }

      // If we have formulation/formulation status/country status/use group filters,
      // only show countries that have matching business cases
      const hasFormulationFilters =
        safeFilters.formulations.length > 0 ||
        safeFilters.formulationStatuses.length > 0 ||
        safeFilters.useGroups.length > 0;
      const hasCountryStatusFilters = safeFilters.countryStatuses.length > 0;

      if (hasFormulationFilters || hasCountryStatusFilters) {
        if (!countryCodesWithFilteredBCs.has(country.country_code)) {
          return false;
        }
      }

      return true;
    });
  }, [countries, filteredBusinessCases, safeFilters]);

  // Filter formulation-countries based on global filters for accurate counts
  const filteredFormulationCountries = useMemo(() => {
    return enrichedFormulationCountries.filter((fc) => {
      // Country filter
      if (safeFilters.countries.length > 0) {
        if (
          !fc.country_code ||
          !safeFilters.countries.includes(fc.country_code)
        ) {
          return false;
        }
      }
      // Formulation filter
      if (safeFilters.formulations.length > 0) {
        if (
          !fc.formulation_code ||
          !safeFilters.formulations.includes(fc.formulation_code)
        ) {
          return false;
        }
      }
      // Formulation status filter
      if (safeFilters.formulationStatuses.length > 0) {
        const status = fc.formulation_status || "Not Yet Evaluated";
        if (!safeFilters.formulationStatuses.includes(status)) {
          return false;
        }
      }
      // Country status filter
      if (safeFilters.countryStatuses.length > 0) {
        const countryStatus = fc.country_status || "Not yet evaluated";
        if (!safeFilters.countryStatuses.includes(countryStatus)) {
          return false;
        }
      }
      return true;
    });
  }, [enrichedFormulationCountries, safeFilters]);

  // Compute filtered counts for summary using unified counting utility
  const filteredCounts = useMemo(() => {
    return computeFilteredCounts(
      formulations,
      filteredFormulationCountries,
      safeFilters,
      { includeOrphanFormulations: false }, // Countries page only shows intersection
      {
        businessCases: filteredBusinessCases,
      },
    );
  }, [
    formulations,
    filteredFormulationCountries,
    safeFilters,
    filteredBusinessCases,
  ]);

  return (
    <>
      <GlobalFilterBar
        filterOptions={filterOptions}
        defaultExpanded={true}
        filteredCounts={filteredCounts}
      />
      <Card>
        <CardContent className="p-0">
          <div className="p-6">
            <CountryList
              countries={filteredCountries}
              businessCases={filteredBusinessCases}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function CountriesSkeleton() {
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
export function CountriesClient(props: CountriesClientProps) {
  return (
    <Suspense fallback={<CountriesSkeleton />}>
      <CountriesContent {...props} />
    </Suspense>
  );
}
