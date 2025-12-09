import { getAllUseGroups, getFormulations } from "@/lib/db/queries";
import { getCountries } from "@/lib/db/countries";
import { createClient } from "@/lib/supabase/server";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationCountryUseGroupFormButton } from "@/components/forms/FormulationCountryUseGroupFormButton";
import { UseGroupsClient } from "./UseGroupsClient";

export default async function UseGroupsPage() {
  const [useGroups, formulations, countries] = await Promise.all([
    getAllUseGroups(),
    getFormulations(), // Reference data for filter lookups
    getCountries(), // Reference data for filter lookups
  ]);

  // Also fetch country_id and country_status from formulation_country (with pagination)
  const supabase = await createClient();
  let fcData: any[] = [];
  let page = 0;
  const pageSize = 10000;
  let hasMore = true;
  
  while (hasMore) {
    const { data: pageData } = await supabase
      .from("formulation_country")
      .select("formulation_country_id, country_id, country_status")
      .eq("is_active", true)
      .range(page * pageSize, (page + 1) * pageSize - 1);
    
    if (!pageData || pageData.length === 0) {
      hasMore = false;
    } else {
      fcData = [...fcData, ...pageData];
      hasMore = pageData.length === pageSize;
      page++;
    }
  }

  const fcIdToCountryId = new Map<string, string>();
  const fcIdToCountryStatus = new Map<string, string>();
  fcData.forEach((fc) => {
    if (fc.formulation_country_id) {
      if (fc.country_id) {
        fcIdToCountryId.set(fc.formulation_country_id, fc.country_id);
      }
      fcIdToCountryStatus.set(fc.formulation_country_id, fc.country_status || "Not yet evaluated");
    }
  });

  // Build lookup maps from formulations
  const formulationCodeToId = new Map<string, string>();
  const formulationCodeToStatus = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_code) {
      if (f.formulation_id) {
        formulationCodeToId.set(f.formulation_code, f.formulation_id);
      }
      if (f.status) {
        formulationCodeToStatus.set(f.formulation_code, f.status);
      }
    }
  });

  // Enrich use groups with formulation_id, formulation_status, country_id, country_status
  const enrichedUseGroups = useGroups.map((ug) => ({
    ...ug,
    formulation_id: ug.formulation_code ? formulationCodeToId.get(ug.formulation_code) || null : null,
    formulation_status: ug.formulation_code ? formulationCodeToStatus.get(ug.formulation_code) || null : null,
    country_id: ug.formulation_country_id ? fcIdToCountryId.get(ug.formulation_country_id) || null : null,
    country_status: ug.formulation_country_id ? fcIdToCountryStatus.get(ug.formulation_country_id) || null : null,
  }));

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Use Groups</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Registration applications organized by crop/pest combination. Each use group represents a specific registration pathway for a formulation in a country.
            </p>
          </div>
          <FormulationCountryUseGroupFormButton />
        </div>

        <UseGroupsClient 
          useGroups={enrichedUseGroups}
          formulations={formulations}
          countries={countries}
        />
      </AnimatedPage>
    </div>
  );
}

