import { PageLayout } from "@/components/layout/PageLayout";
import { KPIDashboardClient } from "@/components/kpi/KPIDashboardClient";
import { getKPIData } from "@/lib/actions/kpi-actions";
import { createClient } from "@/lib/supabase/server";

export default async function KPIDashboardPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check if user is admin
  let isAdmin = false;
  if (user) {
    const { data: userRole } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .single();
    isAdmin = userRole?.role === "admin";
  }

  // For prototype: simple user list (in production this would come from DB)
  const users: { id: string; email: string }[] = [];
  if (user) {
    users.push({ id: user.id, email: user.email || "Unknown" });
  }

  // Fetch default KPI structure
  const { sections, metrics, history } = await getKPIData();

  return (
    <PageLayout
      title="KPI Dashboard"
      description="Track key performance indicators across the organization. Click any metric to edit."
      variant="multi"
    >
      <KPIDashboardClient
        sections={sections}
        metrics={metrics}
        history={history}
        currentUserId={user?.id || null}
        currentUserEmail={user?.email || null}
        isAdmin={isAdmin}
        users={users}
      />
    </PageLayout>
  );
}
