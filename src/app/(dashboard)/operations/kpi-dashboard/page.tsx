import { PageLayout } from "@/components/layout/PageLayout";
import { KPIDashboard } from "@/components/kpi-dashboard/KPIDashboard";
import { getAllUsers } from "@/lib/actions/user-management";
import type { UserManagementData } from "@/lib/actions/user-management";

export default async function KPIDashboardPage() {
  // Fetch users for owner assignment
  // If this fails (e.g., no permission), we'll use an empty array
  let users: UserManagementData[] = [];
  try {
    users = await getAllUsers();
  } catch (error) {
    // Silently fail - demo will work without users, just can't assign owners
    console.warn("Could not fetch users for KPI dashboard:", error);
  }

  return (
    <PageLayout
      title="KPI Dashboard"
      description="Operations-focused KPI dashboard - One Pager Health Report"
      variant="single"
    >
      <KPIDashboard users={users} />
    </PageLayout>
  );
}

