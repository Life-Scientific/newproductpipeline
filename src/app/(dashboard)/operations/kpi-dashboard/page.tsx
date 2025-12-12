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
    // Show placeholder page instead of redirecting (user is already in Operations workspace)
    return (
      <PageLayout
        title="KPI Dashboard"
        description="Operations-focused KPI dashboard"
        variant="single"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Access Restricted</h2>
            <p className="text-muted-foreground">
              You don't have permission to view the KPI Dashboard.
            </p>
            <p className="text-sm text-muted-foreground">
              Please contact your administrator to request access. You need the{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">kpi.view</code> permission
              or a KPI Contributor/Manager role.
            </p>
          </div>
        </div>
      </PageLayout>
    );
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

