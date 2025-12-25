"use client";

import { useMemo } from "react";
import { MarketOverviewDashboard } from "@/components/markets/MarketOverviewDashboard";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import {
  useFilterOptions,
  type ReferenceFormulation,
  type ReferenceCountry,
} from "@/hooks/use-filter-options";
import { computeFilteredCounts } from "@/lib/utils/filter-counts";
import type { Database } from "@/lib/supabase/database.types";
import type { FilterableBusinessCase } from "@/hooks/use-filter-options";
import type { EnrichedBusinessCase } from "@/lib/db/types";

// Extended type for enriched business cases (with status fields added by page.tsx)
type BusinessCase = EnrichedBusinessCase & {
  country_status?: string | null;
  formulation_status?: string | null;
};
type Formulation =
  Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];
type RegistrationPipeline =
  Database["public"]["Views"]["vw_registration_pipeline"]["Row"];

interface MarketsClientProps {
  businessCases: BusinessCase[];
  formulations: Formulation[];
  countries: Country[];
  registrations: RegistrationPipeline[];
}

export function MarketsClient({
  businessCases,
  formulations,
  countries,
  registrations,
}: MarketsClientProps) {
  const { filters } = usePortfolioFilters();

  // Convert formulations to reference format
  const referenceFormulations: ReferenceFormulation[] = useMemo(() => {
    return formulations.map((f) => ({
      formulation_id: f.formulation_id || "",
      formulation_code: f.formulation_code || "",
      formulation_name: f.product_name || "",
      status: f.status || null,
    }));
  }, [formulations]);

  // Convert countries to reference format
  const referenceCountries: ReferenceCountry[] = useMemo(() => {
    return countries.map((c) => ({
      country_id: c.country_id,
      country_code: c.country_code || "",
      country_name: c.country_name,
    }));
  }, [countries]);

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
      formulation_country_id: null, // Removed in JSONB migration
      use_group_name: null, // Not available in enriched business cases
    }));
  }, [businessCases]);

  // Compute filter options
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountries,
    filterableBusinessCases,
    null, // No formulation_country data for markets page
    filters,
  );

  // Filter business cases based on global filters
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => {
      // Country filter
      if (filters.countries.length > 0) {
        if (!bc.country_code || !filters.countries.includes(bc.country_code)) {
          return false;
        }
      }
      // Formulation filter
      if (filters.formulations.length > 0) {
        if (
          !bc.formulation_code ||
          !filters.formulations.includes(bc.formulation_code)
        ) {
          return false;
        }
      }
      // Use group filter - disabled (business cases can now link to multiple use groups via junction table)
      // TODO: Implement junction table-based filtering if needed
      // if (filters.useGroups.length > 0) { ... }
      // Formulation status filter
      if (filters.formulationStatuses.length > 0) {
        const status = bc.formulation_status || "Not Yet Evaluated";
        if (!filters.formulationStatuses.includes(status)) {
          return false;
        }
      }
      // Country status filter
      if (filters.countryStatuses.length > 0) {
        const countryStatus = bc.country_status || "Not yet evaluated";
        if (!filters.countryStatuses.includes(countryStatus)) {
          return false;
        }
      }
      return true;
    });
  }, [businessCases, filters]);

  // Filter formulations based on global filters
  const filteredFormulations = useMemo(() => {
    return formulations.filter((f) => {
      // Formulation status filter
      if (filters.formulationStatuses.length > 0) {
        const status = f.status || "Not Yet Evaluated";
        if (!filters.formulationStatuses.includes(status)) {
          return false;
        }
      }
      // Formulation filter
      if (filters.formulations.length > 0) {
        if (
          !f.formulation_code ||
          !filters.formulations.includes(f.formulation_code)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [formulations, filters]);

  // Filter countries based on global filters
  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      // Country filter
      if (filters.countries.length > 0) {
        if (!c.country_code || !filters.countries.includes(c.country_code)) {
          return false;
        }
      }
      return true;
    });
  }, [countries, filters]);

  // Compute filtered counts
  const filteredCounts = useMemo(() => {
    // Create a minimal formulation-country array from business cases for counting
    // We pass an empty array since markets page doesn't have proper formulation_country data
    // The counts will be based on formulations and business cases instead
    return computeFilteredCounts(
      filteredFormulations,
      [], // Markets page doesn't have formulation_country junction data
      filters,
      { includeOrphanFormulations: false },
      {
        businessCases: filteredBusinessCases.map((bc) => ({
          business_case_group_id: bc.business_case_group_id,
          country_code: bc.country_code,
          formulation_code: bc.formulation_code,
        })),
      },
    );
  }, [filteredFormulations, filteredBusinessCases, filters]);

  return (
    <>
      <GlobalFilterBar
        filterOptions={filterOptions}
        defaultExpanded={true}
        filteredCounts={filteredCounts}
      />
      <MarketOverviewDashboard
        businessCases={filteredBusinessCases}
        formulations={filteredFormulations}
        countries={filteredCountries}
        registrations={registrations}
      />
    </>
  );
}
