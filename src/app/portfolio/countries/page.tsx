import { getCountriesWithStats, getBusinessCasesForChart, getFormulations, getFormulationCountries } from "@/lib/db/queries";
import { getCountries } from "@/lib/db/countries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import type { CountryWithStats } from "@/lib/db/countries";
import { CountriesClient } from "./CountriesClient";

export default async function CountriesPage() {
  const [countriesWithStats, businessCases, formulations, referenceCountries, formulationCountries] = await Promise.all([
    getCountriesWithStats() as Promise<CountryWithStats[]>,
    getBusinessCasesForChart(), // Use enriched version with country_status
    getFormulations(), // Reference data for filter lookups
    getCountries(), // Reference data for filter lookups
    getFormulationCountries(), // For accurate filter counts
  ]);

  // Build formulation status lookup map (using formulation_code for reliable lookup)
  const formulationStatusMap = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_code && f.status) {
      formulationStatusMap.set(f.formulation_code, f.status);
    }
  });

  // Enrich business cases with formulation_status
  const enrichedBusinessCases = businessCases.map((bc) => ({
    ...bc,
    formulation_status: bc.formulation_code ? formulationStatusMap.get(bc.formulation_code) || null : null,
  }));

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Countries</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore markets by country with formulation and revenue data
            </p>
          </div>
        </div>

        <CountriesClient 
          countries={countriesWithStats} 
          businessCases={enrichedBusinessCases}
          formulations={formulations}
          referenceCountries={referenceCountries}
          formulationCountries={formulationCountries || []}
        />
      </AnimatedPage>
    </div>
  );
}

