import { getBusinessCasesForProjectionTable } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { ScenarioPlanningClient } from "./ScenarioPlanningClient";

// Cache business cases data for 60 seconds
export const revalidate = 60;

export default async function ScenarioPlanningPage() {
  const businessCases = await getBusinessCasesForProjectionTable();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Scenario Planning</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Model &ldquo;what-if&rdquo; scenarios by adjusting COGS, NSP, and Volume. Compare multiple scenarios against your baseline.
            </p>
          </div>

          <ScenarioPlanningClient 
            businessCases={businessCases} 
          />
        </div>
      </AnimatedPage>
    </div>
  );
}


