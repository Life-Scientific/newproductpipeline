"use client";

import { Suspense, useMemo } from "react";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { TenYearProjectionChart } from "@/components/charts/TenYearProjectionChart";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import { useFilterOptions, type ReferenceFormulation, type ReferenceCountry } from "@/hooks/use-filter-options";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import { computeFilteredCounts } from "@/lib/utils/filter-counts";
import type { Database } from "@/lib/supabase/database.types";
import type { Country } from "@/lib/db/types";
import type { Formulation } from "@/lib/db/types";
import type { FormulationCountryDetail, FormulationCountryUseGroup } from "@/lib/db/types";

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

function DashboardContent({
  businessCases,
  formulations,
  countries,
  formulationCountries,
  useGroups = [],
}: DashboardClientProps) {
  // Use global portfolio filters from URL
  const { filters } = usePortfolioFilters();

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

  // Enrich business cases with formulation status
  const enrichedBusinessCases = useMemo(() => {
    return businessCases.map((bc) => ({
      ...bc,
      formulation_status: bc.formulation_code 
        ? (formulationStatusMap.get(bc.formulation_code) || null)
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
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountries,
    filterableBusinessCases,
    null,
    filters
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
        if (!fc.formulation_code || !selectedFormulationCodes.includes(fc.formulation_code)) {
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

  // Filter business cases based on global filters
  const filteredBusinessCases = useMemo(() => {
    return enrichedBusinessCases.filter((bc) => {
      // Country filter - filters.countries now contains country codes
      if (filters.countries.length > 0) {
        if (!bc.country_code || !filters.countries.includes(bc.country_code)) {
          return false;
        }
      }
      // Formulation filter - filters.formulations now contains codes
      if (selectedFormulationCodes.length > 0) {
        if (!bc.formulation_code || !selectedFormulationCodes.includes(bc.formulation_code)) {
          return false;
        }
      }
      // Use group filter (by name)
      if (filters.useGroups.length > 0) {
        if (!bc.use_group_name || !filters.useGroups.includes(bc.use_group_name)) {
          return false;
        }
      }
      // Formulation status filter - now properly applied
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
  }, [enrichedBusinessCases, filters, selectedFormulationCodes]);

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
        if (!ug.formulation_code || !selectedFormulationCodes.includes(ug.formulation_code)) {
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
      }
    );
  }, [formulations, filteredFormulationCountries, filters, filteredUseGroups, filteredBusinessCases]);

  return (
    <>
      <GlobalFilterBar filterOptions={filterOptions} defaultExpanded={true} filteredCounts={filteredCounts} />
      <Card>
        <CardContent className="p-4 sm:p-6">
          <TenYearProjectionChart
            businessCases={filteredBusinessCases}
            formulations={formulations}
          />
        </CardContent>
      </Card>
    </>
  );
}

function DashboardSkeleton() {
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
export function DashboardClient(props: DashboardClientProps) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent {...props} />
    </Suspense>
  );
}
