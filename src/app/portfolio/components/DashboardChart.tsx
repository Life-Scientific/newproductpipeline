import { DashboardClient } from "../DashboardClient";
import type { DashboardData } from "@/lib/db/dashboard-data";

interface DashboardChartProps {
  formulations: DashboardData["formulations"];
  countries: DashboardData["countries"];
  businessCases: DashboardData["businessCases"];
  formulationCountries: any[];
  useGroups: any[];
  initialChartAggregates: any[];
}

/**
 * DashboardChart - Receives data from page.tsx instead of fetching
 * PERFORMANCE FIX: Eliminated duplicate getDashboardData() call
 * Was fetching all dashboard data twice - now receives as props
 * PERFORMANCE FIX (2025-12-26): Now receives pre-fetched chart aggregates from server
 * Eliminates client-side chart redraw on initial load
 */
export function DashboardChart({
  formulations,
  countries,
  businessCases,
  formulationCountries,
  useGroups,
  initialChartAggregates,
}: DashboardChartProps) {
  return (
    <DashboardClient
      businessCases={businessCases}
      formulations={formulations}
      countries={countries}
      formulationCountries={formulationCountries}
      useGroups={useGroups}
      initialChartAggregates={initialChartAggregates}
    />
  );
}
