import { Suspense } from "react";
import { DashboardClient } from "../DashboardClient";
import { getDashboardData } from "@/lib/db/dashboard-data";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ChartSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Filters skeleton */}
        <div className="border-b border-border/50 pb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 bg-muted/20 -mt-4 sm:-mt-6 pt-4 sm:pt-6 rounded-t-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-7 w-7 rounded-md" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* Filter controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="pt-4 border-t bg-muted/30 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-md mt-4">
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Chart skeleton with subtle animation */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-2">
              <Skeleton className="h-6 w-80" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-px" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          {/* Chart bars with shimmer effect */}
          <div className="h-[400px] sm:h-[500px] w-full rounded-lg bg-muted/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
                 style={{ animation: 'shimmer 2s infinite' }} />
          </div>

          {/* Table skeleton */}
          <div className="pt-4 border-t space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function ChartContent() {
  const dashboardData = await getDashboardData();
  const {
    formulations,
    countries,
    businessCases,
    formulationCountries,
    useGroups,
  } = dashboardData;

  // Enrich data
  const formulationCodeToStatus = new Map<string, string>();
  formulations.forEach((f) => {
    if (f.formulation_code && f.status) {
      formulationCodeToStatus.set(f.formulation_code, f.status);
    }
  });

  const enrichedFormulationCountries = formulationCountries.map((fc: any) => ({
    ...fc,
    formulation_status: fc.formulation_code
      ? formulationCodeToStatus.get(fc.formulation_code) || null
      : null,
  }));

  const formulationCountryIdToStatus = new Map<string, string>();
  formulationCountries.forEach((fc: any) => {
    if (fc.formulation_country_id && fc.country_status) {
      formulationCountryIdToStatus.set(
        fc.formulation_country_id,
        fc.country_status,
      );
    }
  });

  const enrichedUseGroups = useGroups.map((ug: any) => ({
    ...ug,
    formulation_status: ug.formulation_code
      ? formulationCodeToStatus.get(ug.formulation_code) || null
      : null,
    country_status: ug.formulation_country_id
      ? formulationCountryIdToStatus.get(ug.formulation_country_id) || null
      : null,
  }));

  return (
    <DashboardClient
      businessCases={businessCases}
      formulations={formulations}
      countries={countries}
      formulationCountries={enrichedFormulationCountries}
      useGroups={enrichedUseGroups}
    />
  );
}

export function DashboardChart() {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <ChartContent />
    </Suspense>
  );
}
