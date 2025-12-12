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
  
  console.log("[KPIDashboardPage] Permission check:", { canViewKPIs });
  
  if (!canViewKPIs) {
    console.log("[KPIDashboardPage] No permission, redirecting to /");
    redirect("/");
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
  let kpiData: KPIData = { coreDrivers: [] };
  try {
    kpiData = await getKPIDashboardData();
  } catch (error) {
    console.error("Error fetching KPI dashboard data:", error);
    // Continue with empty data - component will handle gracefully
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

