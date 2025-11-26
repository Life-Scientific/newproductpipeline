import { getPipelineTrackerData } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { PipelineTrackerDashboard } from "@/components/dashboard/PipelineTrackerDashboard";

export default async function PipelineTrackerPage() {
  const { formulations, countries, useGroups, businessCases } = await getPipelineTrackerData();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Pipeline Tracker</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Scalable view of your entire portfolio with sortable, filterable metrics
            </p>
          </div>
        </div>

        <PipelineTrackerDashboard
          formulations={formulations}
          countries={countries}
          useGroups={useGroups}
          businessCases={businessCases}
        />
      </AnimatedPage>
    </div>
  );
}

