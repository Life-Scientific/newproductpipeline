import { Suspense } from "react";
import { FormulationFormButton } from "@/components/forms/FormulationFormButton";
import { FormulationsViewSwitcher } from "@/components/formulations/FormulationsViewSwitcher";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { getFormulationReferenceData, getCountryReferenceData, getFormulationCountries } from "@/lib/db/queries";
import { getFormulationsWithNestedDataProgressive } from "@/lib/db/progressive-queries";
import { FormulationsClient } from "./FormulationsClient";

// Cache formulations data for 60 seconds
export const revalidate = 60;

export default async function FormulationsPage() {
  // OPTIMIZATION: Fetch initial batch (100 formulations) for fast first load
  // Use lightweight reference queries for filters (only fetch needed fields)
  const INITIAL_LIMIT = 100;
  const [initialDataResult, formulations, countries, formulationCountries] =
    await Promise.all([
      getFormulationsWithNestedDataProgressive(INITIAL_LIMIT),
      getFormulationReferenceData(), // OPTIMIZED: Only formulation_code, product_name, status
      getCountryReferenceData(), // OPTIMIZED: Only country_code, country_name
      getFormulationCountries(), // For accurate filter counts
    ]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4 sm:p-6">
        <AnimatedPage>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Formulations</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage your product portfolio formulations
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Suspense fallback={<div className="h-10 w-32" />}>
                <FormulationsViewSwitcher />
              </Suspense>
              <FormulationFormButton />
            </div>
          </div>

          <FormulationsClient
            initialFormulations={initialDataResult.initialData}
            totalCount={initialDataResult.totalCount}
            hasMore={initialDataResult.hasMore}
            formulations={formulations}
            countries={countries}
            formulationCountries={formulationCountries || []}
          />
        </AnimatedPage>
      </div>
    </ErrorBoundary>
  );
}
