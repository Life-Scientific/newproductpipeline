import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { getFormulationCountries, getFormulations } from "@/lib/db/queries";
import { getCountries } from "@/lib/db/countries";
import { createClient } from "@/lib/supabase/server";
import { FormulationCountriesClient } from "./FormulationCountriesClient";

export default async function FormulationCountriesPage() {
  const [formulationCountries, formulations, referenceCountries] = await Promise.all([
    getFormulationCountries(),
    getFormulations(), // Reference data for filter lookups
    getCountries(), // Reference data for filter lookups
  ]);

  // Also fetch country IDs for formulation-country records (with pagination)
  const supabase = await createClient();
  let fcWithIds: any[] = [];
  let page = 0;
  const pageSize = 10000;
  let hasMore = true;
  
  while (hasMore) {
    const { data: pageData } = await supabase
      .from("formulation_country")
      .select("formulation_country_id, country_id")
      .eq("is_active", true)
      .range(page * pageSize, (page + 1) * pageSize - 1);
    
    if (!pageData || pageData.length === 0) {
      hasMore = false;
    } else {
      fcWithIds = [...fcWithIds, ...pageData];
      hasMore = pageData.length === pageSize;
      page++;
    }
  }
  
  const fcIdToCountryId = new Map<string, string>();
  fcWithIds.forEach((fc) => {
    if (fc.formulation_country_id && fc.country_id) {
      fcIdToCountryId.set(fc.formulation_country_id, fc.country_id);
    }
  });

  // Build lookup maps for enrichment
  const formulationCodeToId = new Map<string, string>();
  const formulationCodeToStatus = new Map<string, string>();
  const formulationCodeToName = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_code) {
      if (f.formulation_id) {
        formulationCodeToId.set(f.formulation_code, f.formulation_id);
      }
      if (f.status) {
        formulationCodeToStatus.set(f.formulation_code, f.status);
      }
      if (f.product_name) {
        formulationCodeToName.set(f.formulation_code, f.product_name);
      }
    }
  });

  // Enrich countries with formulation_id, formulation_status, formulation_name, and country_id
  const enrichedCountries = formulationCountries.map((fc) => ({
    ...fc,
    formulation_id: fc.formulation_code ? formulationCodeToId.get(fc.formulation_code) || null : null,
    formulation_status: fc.formulation_code ? formulationCodeToStatus.get(fc.formulation_code) || null : null,
    formulation_name: fc.formulation_code ? formulationCodeToName.get(fc.formulation_code) || null : null,
    country_id: fc.formulation_country_id ? fcIdToCountryId.get(fc.formulation_country_id) || null : null,
  }));

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Formulation-Countries
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              View all formulation-country registrations and their status.
              Filter by formulation, country, status, or registration pathway.
            </p>
          </div>
        </div>

        <FormulationCountriesClient 
          countries={enrichedCountries}
          formulations={formulations}
          referenceCountries={referenceCountries}
        />
      </AnimatedPage>
    </div>
  );
}
