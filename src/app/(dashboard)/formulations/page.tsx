import { getFormulations } from "@/lib/db/queries";
import { FormulationsPageContent } from "@/components/formulations/FormulationsPageContent";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationFormButton } from "@/components/forms/FormulationFormButton";
import { FormulationsViewSwitcher } from "@/components/formulations/FormulationsViewSwitcher";
import { Suspense } from "react";

export default async function FormulationsPage() {
  const formulations = await getFormulations();

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
          <FormulationsPageContent formulations={formulations} />
        </Suspense>
      </AnimatedPage>
    </div>
  );
}

