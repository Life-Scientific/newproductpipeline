import { Suspense } from "react";
import { FormulationFormButton } from "@/components/forms/FormulationFormButton";
import { FormulationsViewSwitcher } from "@/components/formulations/FormulationsViewSwitcher";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { getFormulationsWithNestedData, getFormulations } from "@/lib/db/queries";
import { getCountries } from "@/lib/db/countries";
import { FormulationsClient } from "./FormulationsClient";

// Cache formulations data for 60 seconds
export const revalidate = 60;

export default async function FormulationsPage() {
  const [formulationsWithNested, formulations, countries] = await Promise.all([
    getFormulationsWithNestedData(),
    getFormulations(), // Reference data for filter lookups
    getCountries(), // Reference data for filter lookups
  ]);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Formulations</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your product portfolio formulations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Suspense fallback={<div className="h-9 w-32" />}>
              <FormulationsViewSwitcher />
            </Suspense>
            <FormulationFormButton />
          </div>
        </div>

        <FormulationsClient 
          formulationsWithNested={formulationsWithNested}
          formulations={formulations}
          countries={countries}
        />
      </AnimatedPage>
    </div>
  );
}
