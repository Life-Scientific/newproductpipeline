import { redirect } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { KPIDashboard } from "@/components/kpi-dashboard/KPIDashboard";
import { getAllUsers } from "@/lib/actions/user-management";
import { getKPIDashboardData } from "@/lib/db/kpi-queries";
import { hasPermission } from "@/lib/actions/user-management";
import { PERMISSIONS } from "@/lib/permissions";
import type { UserManagementData } from "@/lib/actions/user-management";
import type { KPIData } from "@/lib/kpi-dashboard/types";

export default async function KPIDashboardPage() {
  // Check if user has permission to view KPIs
  const canViewKPIs = await hasPermission(PERMISSIONS.KPI_VIEW);
  
  if (!canViewKPIs) {
    // Redirect to Operations placeholder page instead of home
    redirect("/operations");
  }
  // Fetch users for owner assignment
  // If this fails (e.g., no permission), we'll use an empty array
  let users: UserManagementData[] = [];
  try {
    users = await getAllUsers();
  } catch (error) {
    // Silently fail - demo will work without users, just can't assign owners
    console.warn("Could not fetch users for KPI dashboard:", error);
  }

  // Fetch KPI data from database
  // This will throw if user doesn't have permission (enforced by RLS + explicit check)
  let kpiData: KPIData = { coreDrivers: [] };
  try {
    kpiData = await getKPIDashboardData();
  } catch (error) {
    // If permission error, redirect (shouldn't happen due to check above, but safety net)
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      redirect("/operations");
    }
    console.error("Error fetching KPI dashboard data:", error);
    // Don't continue with empty data on permission errors
    throw error;
  }

  return (
    <PageLayout
      title="KPI Dashboard"
      description="Operations-focused KPI dashboard - One Pager Health Report"
      variant="single"
    >
      <KPIDashboard users={users} initialData={kpiData} />
    </PageLayout>
  );
}

