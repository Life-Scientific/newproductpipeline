import { redirect } from "next/navigation";
import { hasPermission } from "@/lib/actions/user-management";
import { PERMISSIONS } from "@/lib/permissions";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock } from "lucide-react";

/**
 * Operations Workspace Root Page
 * 
 * NOTE: Currently, Operations workspace only contains the KPI Dashboard.
 * As more pages are added to Operations, this page should be updated to:
 * - Check for ANY Operations-related permissions (not just kpi.view)
 * - Redirect to the first accessible page (or show overview if multiple pages exist)
 * - Show placeholder only if user has no access to ANY Operations pages
 * 
 * See docs/OPERATIONS_WORKSPACE.md for details on adding new Operations pages.
 */
export default async function OperationsPage() {
  // Check if user has permission to view KPIs (or any Operations content)
  // TODO: When more Operations pages are added, check for ANY Operations permissions
  const canViewKPIs = await hasPermission(PERMISSIONS.KPI_VIEW);
  
  // If user has permission, redirect to KPI Dashboard
  // TODO: When multiple Operations pages exist, redirect to first accessible page
  if (canViewKPIs) {
    redirect("/operations/kpi-dashboard");
  }

  // Otherwise, show placeholder page - this is the valid state for users without permission
  // DO NOT redirect - let them stay here (they may have access to other Operations pages in future)
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
              <strong>Note:</strong> As more pages are added to the Operations workspace, they will
              have their own permission requirements. You'll be able to access Operations pages you
              have permission for, even if you don't have KPI access.
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

