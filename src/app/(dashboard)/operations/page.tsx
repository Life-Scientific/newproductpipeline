import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/actions/user-management";
import { PERMISSIONS } from "@/lib/permissions";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

export default async function OperationsPage() {
  // Check if user has permission to view KPIs (or any Operations content)
  const canViewKPIs = await hasPermission(PERMISSIONS.KPI_VIEW);
  
  // If user has permission, redirect to KPI Dashboard
  // But only redirect if we're sure they can access it (avoid loops)
  if (canViewKPIs) {
    redirect("/operations/kpi-dashboard");
  }

  // Otherwise, show placeholder page - this is the valid state for users without permission
  // DO NOT redirect - let them stay here
  return (
    <PageLayout
      title="Operations"
      description="Operations-focused workspace"
      variant="single"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Operations Workspace
          </CardTitle>
          <CardDescription>
            Welcome to the Operations workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Permission Required</AlertTitle>
            <AlertDescription>
              You don't have permission to view Operations content. To access the KPI Dashboard
              and other Operations features, you need the{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">kpi.view</code> permission
              or a KPI Contributor/Manager role.
              <br />
              <br />
              Please contact your administrator to request access.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

