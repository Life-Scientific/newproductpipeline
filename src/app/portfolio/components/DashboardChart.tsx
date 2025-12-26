import { DashboardClient } from "../DashboardClient";
import type { DashboardData } from "@/lib/db/dashboard-data";

interface DashboardChartProps {
  formulations: DashboardData["formulations"];
  countries: DashboardData["countries"];
  businessCases: DashboardData["businessCases"];
  formulationCountries: any[];
  useGroups: any[];
}

/**
 * DashboardChart - Receives data from page.tsx instead of fetching
 * PERFORMANCE FIX: Eliminated duplicate getDashboardData() call
 * Was fetching all dashboard data twice - now receives as props
 */
export function DashboardChart({
  formulations,
  countries,
  businessCases,
  formulationCountries,
  useGroups,
}: DashboardChartProps) {
  return (
    <DashboardClient
      businessCases={businessCases}
      formulations={formulations}
      countries={countries}
      formulationCountries={formulationCountries}
      useGroups={useGroups}
    />
  );
}
