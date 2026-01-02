import { getFormulations, getFormulationCountries } from "@/lib/db/queries";
import { getCountries } from "@/lib/db/countries";
import { getBusinessCasesForProjectionTableProgressive } from "@/lib/db/progressive-queries";
import { createClient } from "@/lib/supabase/server";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { BusinessCasesPageClient } from "./BusinessCasesPageClient";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";

// Use ISR with 60 second revalidation instead of force-dynamic
// Business cases don't need real-time updates - 1 min cache improves performance significantly
export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{
    countries?: string;
    formulations?: string;
    useGroups?: string;
    formulationStatuses?: string;
    countryStatuses?: string;
  }>;
}

/**
 * Parse filter array from URL param (comma-separated codes)
 */
function parseFilterParam(param: string | undefined): string[] {
  if (!param) return [];
  return param.split(",").filter(Boolean);
}

export default async function BusinessCasesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Parse filters from URL for server-side filtering
  const countryCodes = parseFilterParam(params.countries);
  const formulationCodes = parseFilterParam(params.formulations);
  const useGroupNames = parseFilterParam(params.useGroups);
  const formulationStatuses = parseFilterParam(params.formulationStatuses);
  const countryStatuses = parseFilterParam(params.countryStatuses);

  // Build filter object for server-side query
  const filters = {
    countries: countryCodes,
    formulations: formulationCodes,
    useGroups: useGroupNames,
    formulationStatuses,
    countryStatuses,
  };

  // OPTIMIZATION: Fetch formulation_country statuses in parallel with other queries
  const fetchFormulationCountryStatuses = async () => {
    let allStatuses: any[] = [];
    let page = 0;
    const pageSize = 10000;
    let hasMore = true;

    while (hasMore) {
      let query = supabase
        .from("formulation_country")
        .select("formulation_id, country_id, country_status")
        .eq("is_active", true);

      // Server-side filter by country codes if provided
      if (countryCodes.length > 0) {
        // First get formulation_country_ids for these countries
        const { data: fcData } = await supabase
          .from("formulation_country")
          .select("formulation_country_id")
          .eq("is_active", true)
          .in("country_id", countryCodes);

        if (fcData && fcData.length > 0) {
          const fcIds = fcData.map((fc) => fc.formulation_country_id);
          query = query.in("formulation_country_id", fcIds);
        } else {
          // No matching countries - return empty
          return [];
        }
      }

      const { data: pageData } = await query.range(
        page * pageSize,
        (page + 1) * pageSize - 1,
      );

      if (!pageData || pageData.length === 0) {
        hasMore = false;
      } else {
        allStatuses = [...allStatuses, ...pageData];
        hasMore = pageData.length === pageSize;
        page++;
      }
    }
    return allStatuses;
  };

  // OPTIMIZATION: Fetch initial batch (100 business case groups) for fast first load
  // Now with server-side filtering based on URL params
  const INITIAL_LIMIT = 100;
  const [
    initialDataResult,
    formulations,
    countries,
    formulationCountriesData,
    formulationCountriesRaw,
  ] = await Promise.all([
    getBusinessCasesForProjectionTableProgressive(INITIAL_LIMIT, filters),
    getFormulations(), // Reference data for filter lookups
    getCountries(), // Reference data for filter lookups
    getFormulationCountries(), // For accurate filter counts
    fetchFormulationCountryStatuses(), // Country status lookup - now parallel and filtered!
  ]);

  // Build status lookup maps
  const formulationStatusMap = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_id && f.status) {
      formulationStatusMap.set(f.formulation_id, f.status);
    }
  });

  const countryStatusMap = new Map<string, string>();
  formulationCountriesRaw.forEach((fc: any) => {
    if (fc.formulation_id && fc.country_id && fc.country_status) {
      const key = `${fc.formulation_id}-${fc.country_id}`;
      countryStatusMap.set(key, fc.country_status);
    }
  });

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 sm:p-6">
        <AnimatedPage>
          <div className="space-y-6">
            <div className="mb-6">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Product Portfolio Long Range Plan
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  10-year revenue and margin projections. Each row represents a
                  formulation registered in a country for a specific use.
                </p>
              </div>
            </div>

            <BusinessCasesPageClient
              initialBusinessCases={initialDataResult.initialData}
              totalCount={initialDataResult.totalCount}
              hasMore={initialDataResult.hasMore}
              formulationStatuses={formulationStatusMap}
              countryStatuses={countryStatusMap}
              formulations={formulations}
              countries={countries}
              formulationCountries={formulationCountriesData}
            />
          </div>
        </AnimatedPage>
      </div>
    </ErrorBoundary>
  );
}
