"use client";

import { useMemo } from "react";
import { PipelineTrackerDashboard } from "@/components/dashboard/PipelineTrackerDashboard";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import {
  useFilterOptions,
  type ReferenceFormulation,
  type ReferenceCountry,
} from "@/hooks/use-filter-options";
import { computeFilteredCounts } from "@/lib/utils/filter-counts";
import type { Database } from "@/lib/supabase/database.types";
import type {
  FilterableBusinessCase,
  FilterableFormulationCountry,
} from "@/hooks/use-filter-options";

type Formulation =
  Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationCountryDetail =
  Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationCountryUseGroup =
  Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];
type BusinessCaseBase = Database["public"]["Views"]["vw_business_case"]["Row"];
// Extended type for enriched business cases
type BusinessCase = BusinessCaseBase & {
  country_status?: string | null;
  formulation_status?: string | null;
};

interface PipelineTrackerClientProps {
  formulations: Formulation[];
  countries: FormulationCountryDetail[];
  useGroups: FormulationCountryUseGroup[];
  businessCases: BusinessCase[];
}

export function PipelineTrackerClient({
  formulations,
  countries,
  useGroups,
  businessCases,
}: PipelineTrackerClientProps) {
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

  // Get unique countries from countries array (using country_code as unique key)
  const uniqueCountries = useMemo(() => {
    const countryMap = new Map<
      string,
      { country_code: string; country_name: string }
    >();
    countries.forEach((c) => {
      if (c.country_code && c.country_name) {
        countryMap.set(c.country_code, {
          country_code: c.country_code,
          country_name: c.country_name,
        });
      }
    });
    return Array.from(countryMap.values());
  }, [countries]);

  // Convert countries to reference format
  const referenceCountries: ReferenceCountry[] = useMemo(() => {
    return uniqueCountries.map((c) => ({
      country_code: c.country_code,
      country_name: c.country_name,
    }));
  }, [uniqueCountries]);

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

  // Convert formulation-countries to filterable format
  const filterableFormulationCountries: FilterableFormulationCountry[] =
    useMemo(() => {
      return countries.map((fc) => ({
        formulation_country_id: fc.formulation_country_id || null,
        formulation_code: fc.formulation_code || null,
        country_code: fc.country_code || null,
        country_name: fc.country_name || null,
        country_status: fc.country_status || null,
      }));
    }, [countries]);

  // Compute filter options
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountries,
    filterableBusinessCases,
    filterableFormulationCountries,
    filters,
  );

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

  // Create a map of formulation_code to status for efficient lookup
  const formulationStatusMap = useMemo(() => {
    const map = new Map<string, string>();
    formulations.forEach((f) => {
      if (f.formulation_code) {
        map.set(f.formulation_code, f.status || "Not Yet Evaluated");
      }
    });
    return map;
  }, [formulations]);

  // Filter formulation-countries based on global filters
  const filteredCountries = useMemo(() => {
    return countries.filter((fc) => {
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
      // Formulation status filter (lookup from formulations)
      if (filters.formulationStatuses.length > 0) {
        const status =
          (fc.formulation_code && formulationStatusMap.get(fc.formulation_code)) ||
          "Not Yet Evaluated";
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
  }, [countries, filters, formulationStatusMap]);

  // Filter use groups based on global filters
  const filteredUseGroups = useMemo(() => {
    return useGroups.filter((ug) => {
      // Find the corresponding formulation-country for this use group
      const fc = countries.find(
        (c) => c.formulation_country_id === ug.formulation_country_id,
      );
      if (!fc) return true; // Include if we can't find the parent

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
      // Use group filter
      if (filters.useGroups.length > 0) {
        if (
          !ug.use_group_name ||
          !filters.useGroups.includes(ug.use_group_name)
        ) {
          return false;
        }
      }
      // Formulation status filter (lookup from formulations)
      if (filters.formulationStatuses.length > 0) {
        const status =
          (fc.formulation_code && formulationStatusMap.get(fc.formulation_code)) ||
          "Not Yet Evaluated";
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
  }, [useGroups, countries, filters, formulationStatusMap]);

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
      // Use group filter
      if (filters.useGroups.length > 0) {
        if (
          !bc.use_group_name ||
          !filters.useGroups.includes(bc.use_group_name)
        ) {
          return false;
        }
      }
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

  // Compute filtered counts
  const filteredCounts = useMemo(() => {
    return computeFilteredCounts(
      filteredFormulations,
      filteredCountries,
      filters,
      { includeOrphanFormulations: true },
      {
        useGroups: filteredUseGroups.map((ug) => ({
          formulation_code:
            countries.find(
              (c) => c.formulation_country_id === ug.formulation_country_id,
            )?.formulation_code || null,
          country_code:
            countries.find(
              (c) => c.formulation_country_id === ug.formulation_country_id,
            )?.country_code || null,
        })),
        businessCases: filteredBusinessCases.map((bc) => ({
          business_case_group_id: bc.business_case_group_id,
          country_code: bc.country_code,
          formulation_code: bc.formulation_code,
        })),
      },
    );
  }, [
    filteredFormulations,
    filteredCountries,
    filteredUseGroups,
    filteredBusinessCases,
    filters,
    countries,
  ]);

  return (
    <>
      <GlobalFilterBar
        filterOptions={filterOptions}
        defaultExpanded={true}
        filteredCounts={filteredCounts}
      />
      <PipelineTrackerDashboard
        formulations={filteredFormulations}
        countries={filteredCountries}
        useGroups={filteredUseGroups}
        businessCases={filteredBusinessCases}
      />
    </>
  );
}
