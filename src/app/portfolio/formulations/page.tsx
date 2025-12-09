import { Suspense } from "react";
import { FormulationFormButton } from "@/components/forms/FormulationFormButton";
import { FormulationsPageContent } from "@/components/formulations/FormulationsPageContent";
import { FormulationsViewSwitcher } from "@/components/formulations/FormulationsViewSwitcher";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { getFormulationsWithNestedData } from "@/lib/db/queries";

// Use cache tags for invalidation instead of time-based revalidation
// This ensures data is fresh when changed via actions while still allowing caching
export const revalidate = 30; // Short revalidation as a fallback

export default async function FormulationsPage() {
  const formulationsWithNested = await getFormulationsWithNestedData();

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

        <Suspense fallback={<div>Loading...</div>}>
          <FormulationsPageContent
            formulationsWithNested={formulationsWithNested}
          />
        </Suspense>
      </AnimatedPage>
    </div>
  );
}
