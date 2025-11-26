import { getFormulations } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationComparison } from "@/components/formulations/FormulationComparison";
import { Suspense } from "react";

export default async function FormulationComparePage() {
  const formulations = await getFormulations();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Compare Formulations</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Compare multiple formulations side-by-side
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <FormulationComparison formulations={formulations} />
        </Suspense>
      </AnimatedPage>
    </div>
  );
}

