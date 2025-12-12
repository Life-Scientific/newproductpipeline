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
  if (canViewKPIs) {
    redirect("/operations/kpi-dashboard");
  }

  // Otherwise, show placeholder page
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
            Access Restricted
          </CardTitle>
          <CardDescription>
            You don't have permission to access Operations content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Permission Required</AlertTitle>
            <AlertDescription>
              To access the Operations workspace, you need the <code className="text-xs bg-muted px-1 py-0.5 rounded">kpi.view</code> permission.
              Please contact your administrator to request access.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

