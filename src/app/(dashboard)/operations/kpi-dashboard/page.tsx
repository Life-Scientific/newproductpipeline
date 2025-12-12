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
    // Show placeholder page - DO NOT redirect to avoid loops
    // This is the final destination for unauthorized users trying to access KPI dashboard
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
            <p className="text-xs text-muted-foreground mt-2">
              <strong>Note:</strong> The Operations workspace will include additional pages in the
              future. You'll be able to access Operations pages you have permission for, even if
              you don't have KPI access.
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              <a href="/operations" className="underline hover:text-foreground">
                Return to Operations workspace
              </a>
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
  // But we've already checked permission above, so this should never fail
  let kpiData: KPIData = { coreDrivers: [] };
  try {
    kpiData = await getKPIDashboardData();
  } catch (error) {
    // If permission error, show placeholder instead of redirecting (avoid loops)
    if (error instanceof Error && error.message.includes("Unauthorized")) {
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
                Please contact your administrator to request access.
              </p>
            </div>
          </div>
        </PageLayout>
      );
    }
    console.error("Error fetching KPI dashboard data:", error);
    // For other errors, still show placeholder rather than crashing
    // This prevents redirect loops
    return (
      <PageLayout
        title="KPI Dashboard"
        description="Operations-focused KPI dashboard"
        variant="single"
      >
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Error Loading Dashboard</h2>
            <p className="text-muted-foreground">
              Unable to load KPI dashboard data. Please try again later.
            </p>
          </div>
        </div>
      </PageLayout>
    );
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

