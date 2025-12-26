import { getFormulations } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load FormulationComparison (~1,173 lines)
// This reduces initial bundle size by ~150KB+ and improves initial page load
const FormulationComparison = lazy(() =>
  import("@/components/formulations/FormulationComparison").then((mod) => ({
    default: mod.FormulationComparison,
  })),
);

export default async function FormulationComparePage() {
  const formulations = await getFormulations();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Compare Formulations
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Compare multiple formulations side-by-side
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          }
        >
          <FormulationComparison formulations={formulations} />
        </Suspense>
      </AnimatedPage>
    </div>
  );
}
