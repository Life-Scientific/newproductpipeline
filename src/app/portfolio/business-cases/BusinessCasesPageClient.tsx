"use client";

import { GitBranch, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { BusinessCaseModal } from "@/components/business-cases/BusinessCaseModal";
import { BusinessCasesProjectionTable } from "@/components/business-cases/BusinessCasesProjectionTable";
import { GlobalFilterBar } from "@/components/filters/GlobalFilterBar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePermissions } from "@/hooks/use-permissions";
import { usePortfolioFilters } from "@/hooks/use-portfolio-filters";
import { useFilterOptions, type ReferenceFormulation, type ReferenceCountry } from "@/hooks/use-filter-options";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import { computeFilteredCounts } from "@/lib/utils/filter-counts";
import type { BusinessCaseGroupData } from "@/lib/db/queries";
import type { Country } from "@/lib/db/types";
import type { Formulation } from "@/lib/db/types";
import type { FormulationCountryDetail } from "@/lib/db/types";

// Extended type for business cases with formulation/country status
interface BusinessCaseWithStatus extends BusinessCaseGroupData {
  formulation_status?: string | null;
  country_status?: string | null;
  // country_code is already in BusinessCaseGroupData as required string
}

interface BusinessCasesPageClientProps {
  initialBusinessCases: BusinessCaseGroupData[];
  formulationStatuses?: Map<string, string>; // formulation_id -> status
  countryStatuses?: Map<string, string>; // formulation_country_id or composite key -> status
  formulations: Formulation[]; // Reference data for filter lookups
  countries: Country[]; // Reference data for filter lookups
  formulationCountries?: FormulationCountryDetail[]; // For accurate filter counts
}

function BusinessCasesContent({
  initialBusinessCases,
  formulationStatuses,
  countryStatuses,
  formulations,
  countries,
  formulationCountries,
}: BusinessCasesPageClientProps) {
  // Use global portfolio filters from URL
  const { filters } = usePortfolioFilters();

  // Create formulation status lookup map for enrichment
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
        ? (formulationStatusMap.get(fc.formulation_code) || null)
        : null,
    }));
  }, [formulationCountries, formulationStatusMap]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();

  // Permission checks
  const {
    canCreateBusinessCases,
    canEditBusinessCases,
    isLoading: permissionsLoading,
  } = usePermissions();

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

  // Enrich business cases with status fields from lookup maps
  const businessCases: BusinessCaseWithStatus[] = useMemo(() => {
    return initialBusinessCases.map((bc) => ({
      ...bc,
      formulation_status: formulationStatuses?.get(bc.formulation_id) || null,
      country_status: countryStatuses?.get(`${bc.formulation_id}-${bc.country_id}`) || null,
      // country_code is already available in BusinessCaseGroupData
    }));
  }, [initialBusinessCases, formulationStatuses, countryStatuses]);

  // Convert business cases to filterable format
  const filterableBusinessCases = useMemo(() => {
    return businessCases.map((bc) => ({
      business_case_group_id: bc.business_case_group_id,
      country_id: bc.country_id,
      country_code: bc.country_code || null,
      country_name: bc.country_name,
      country_status: bc.country_status || null,
      formulation_id: bc.formulation_id,
      formulation_code: bc.formulation_code,
      formulation_name: bc.formulation_name,
      formulation_country_id: null, // Not available in BusinessCaseGroupData
      use_group_name: bc.use_group_name || null,
    }));
  }, [businessCases]);

  // Compute filter options with cascading logic using standardized reference data
  const filterOptions = useFilterOptions(
    referenceFormulations,
    referenceCountries,
    filterableBusinessCases, // Filterable data for cascading logic
    null,
    filters
  );

  // filters.formulations now contains codes directly
  const selectedFormulationCodes = filters.formulations;

  // Filter business cases based on global filters
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => {
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
  }, [businessCases, filters, selectedFormulationCodes]);

  // Filter formulation-countries based on global filters for accurate counts
  const filteredFormulationCountries = useMemo(() => {
    return enrichedFormulationCountries.filter((fc) => {
      // Country filter
      if (filters.countries.length > 0) {
        if (!fc.country_code || !filters.countries.includes(fc.country_code)) {
          return false;
        }
      }
      // Formulation filter
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
  }, [enrichedFormulationCountries, filters, selectedFormulationCodes]);

  // Compute filtered counts for summary using unified counting utility
  const filteredCounts = useMemo(() => {
    return computeFilteredCounts(
      formulations,
      filteredFormulationCountries,
      filters,
      { includeOrphanFormulations: false }, // Business Cases page only shows intersection
      {
        businessCases: filteredBusinessCases,
      }
    );
  }, [formulations, filteredFormulationCountries, filters, filteredBusinessCases]);

  return (
    <>
      <GlobalFilterBar filterOptions={filterOptions} defaultExpanded={true} filteredCounts={filteredCounts} />

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Business Cases</CardTitle>
              <CardDescription className="flex items-center gap-2">
                View and manage financial projections
                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100">
                  <GitBranch className="h-3 w-3" />
                  Git-style field tracking
                </span>
              </CardDescription>
            </div>
            {canCreateBusinessCases && !permissionsLoading && (
              <Button
                onClick={() => setCreateModalOpen(true)}
                size="lg"
                className="h-12 px-6"
              >
                <Plus className="mr-2 h-5 w-5" />
                New Business Case
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 sm:p-6 pt-0">
            <BusinessCasesProjectionTable
              businessCases={filteredBusinessCases}
              canEdit={canEditBusinessCases}
            />
          </div>
        </CardContent>
      </Card>

      {canCreateBusinessCases && (
        <BusinessCaseModal
          open={createModalOpen}
          onOpenChange={setCreateModalOpen}
          onSuccess={() => {
            router.refresh();
          }}
        />
      )}
    </>
  );
}

function BusinessCasesSkeleton() {
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
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    </>
  );
}

// Wrap in Suspense for useSearchParams
export function BusinessCasesPageClient({
  initialBusinessCases,
  formulationStatuses,
  countryStatuses,
  formulations,
  countries,
}: BusinessCasesPageClientProps) {
  return (
    <Suspense fallback={<BusinessCasesSkeleton />}>
      <BusinessCasesContent 
        initialBusinessCases={initialBusinessCases}
        formulationStatuses={formulationStatuses}
        countryStatuses={countryStatuses}
        formulations={formulations}
        countries={countries}
      />
    </Suspense>
  );
}
