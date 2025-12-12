import {
  getBusinessCasesForProjectionTable,
  getFormulations,
  getFormulationCountries,
} from "@/lib/db/queries";
import { getCountries } from "@/lib/db/countries";
import { createClient } from "@/lib/supabase/server";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { BusinessCasesPageClient } from "./BusinessCasesPageClient";

// Use dynamic rendering to ensure fresh data after mutations
export const dynamic = "force-dynamic";

export default async function BusinessCasesPage() {
  const supabase = await createClient();
  
  // OPTIMIZATION: Fetch all data in parallel, including formulation_country status lookup
  // This eliminates the sequential loop that was causing slowness
  const fetchFormulationCountryStatuses = async () => {
    let allStatuses: any[] = [];
    let page = 0;
    const pageSize = 10000;
    let hasMore = true;

    while (hasMore) {
      const { data: pageData } = await supabase
        .from("formulation_country")
        .select("formulation_id, country_id, country_status")
        .eq("is_active", true)
        .range(page * pageSize, (page + 1) * pageSize - 1);

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

  // Fetch everything in parallel - this is much faster than sequential
  const [
    businessCases,
    formulations,
    countries,
    formulationCountriesData,
    formulationCountriesRaw,
  ] = await Promise.all([
    getBusinessCasesForProjectionTable(),
    getFormulations(), // Reference data for filter lookups
    getCountries(), // Reference data for filter lookups
    getFormulationCountries(), // For accurate filter counts
    fetchFormulationCountryStatuses(), // Country status lookup - now parallel!
  ]);

  // Build status lookup maps
  const formulationStatuses = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_id && f.status) {
      formulationStatuses.set(f.formulation_id, f.status);
    }
  });

  const countryStatuses = new Map<string, string>();
  formulationCountriesRaw.forEach((fc: any) => {
    if (fc.formulation_id && fc.country_id && fc.country_status) {
      const key = `${fc.formulation_id}-${fc.country_id}`;
      countryStatuses.set(key, fc.country_status);
    }
  });

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
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
            initialBusinessCases={businessCases}
            formulationStatuses={formulationStatuses}
            countryStatuses={countryStatuses}
            formulations={formulations}
            countries={countries}
            formulationCountries={formulationCountriesData}
          />
        </div>
      </AnimatedPage>
    </div>
  );
}
