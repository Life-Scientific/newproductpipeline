import { getUseGroupById, getFormulationBusinessCases } from "@/lib/db/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import { FormattedCurrency } from "@/components/ui/formatted-currency";
import Link from "next/link";
import {
  FileText,
  Package,
  Globe,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  Building2,
} from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface UseGroupDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UseGroupDetailPage({
  params,
}: UseGroupDetailPageProps) {
  const { id } = await params;
  const useGroup = await getUseGroupById(id);

  if (!useGroup) {
    notFound();
  }

  // Get business cases for this use group
  let businessCases: BusinessCase[] = [];
  if (useGroup.formulation_id) {
    const allBusinessCases = await getFormulationBusinessCases(
      useGroup.formulation_id,
    );
    businessCases = allBusinessCases.filter(
      (bc) => bc.formulation_country_use_group_id === id,
    );
  }

  // Calculate totals
  const totalRevenue = businessCases.reduce(
    (sum, bc) => sum + (bc.total_revenue || 0),
    0,
  );
  const totalMargin = businessCases.reduce(
    (sum, bc) => sum + (bc.total_margin || 0),
    0,
  );
  const avgMarginPercent =
    businessCases.length > 0
      ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) /
        businessCases.length
      : 0;

  const breadcrumbs = [
    { label: "Use Groups", href: "/use-groups" },
    ...(useGroup.formulation_id
      ? [
          {
            label: useGroup.formulation_code || "Formulation",
            href: `/formulations/${useGroup.formulation_id}`,
          },
        ]
      : []),
    {
      label:
        useGroup.use_group_name ||
        `Use Group ${useGroup.use_group_variant || ""}`,
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {useGroup.use_group_name ||
                `Use Group ${useGroup.use_group_variant || ""}`}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Use group details and business case information
            </p>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">
                <FormattedCurrency value={totalRevenue} />
              </div>
              <p className="text-xs text-muted-foreground">
                Across {businessCases.length} business case
                {businessCases.length !== 1 ? "s" : ""}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Margin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">
                <FormattedCurrency value={totalMargin} />
              </div>
              <p className="text-xs text-muted-foreground">
                {avgMarginPercent > 0
                  ? `${avgMarginPercent.toFixed(1)}% avg margin`
                  : "—"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Business Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{businessCases.length}</div>
              <p className="text-xs text-muted-foreground">
                Active projections
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Registration Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {useGroup.use_group_status ? (
                <Badge
                  variant={
                    useGroup.use_group_status === "Approved"
                      ? "default"
                      : useGroup.use_group_status === "Submitted"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-sm"
                >
                  {useGroup.use_group_status}
                </Badge>
              ) : (
                <p className="text-sm text-muted-foreground">Not Started</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Use Group Information */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Use Group Information</CardTitle>
              <CardDescription>
                Use group details and variant information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Use Group Name
                  </p>
                  <p className="text-sm font-medium">
                    {useGroup.use_group_name || "—"}
                  </p>
                </div>

                {useGroup.use_group_variant && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Variant
                    </p>
                    <Badge variant="secondary">
                      {useGroup.use_group_variant}
                    </Badge>
                  </div>
                )}

                {useGroup.formulation_id && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Formulation
                    </p>
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link
                        href={`/portfolio/formulations/${useGroup.formulation_id}`}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        {useGroup.formulation_code}
                        {useGroup.formulation_name &&
                          ` - ${useGroup.formulation_name}`}
                      </Link>
                    </Button>
                  </div>
                )}

                {useGroup.formulation_country_id && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Formulation-Country
                    </p>
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link
                        href={`/formulation-countries/${useGroup.formulation_country_id}`}
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        {useGroup.country_name}
                        {useGroup.formulation_code &&
                          ` - ${useGroup.formulation_code}`}
                      </Link>
                    </Button>
                  </div>
                )}

                {useGroup.country_name && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Country
                    </p>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{useGroup.country_name}</p>
                      {useGroup.country_code && (
                        <Badge variant="outline" className="text-xs">
                          {useGroup.country_code}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {useGroup.reference_product_name && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Reference Product
                    </p>
                    <p className="text-sm">{useGroup.reference_product_name}</p>
                    {useGroup.reference_manufacturer && (
                      <p className="text-xs text-muted-foreground">
                        {useGroup.reference_manufacturer}
                      </p>
                    )}
                  </div>
                )}

                {useGroup.use_group_crops && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Crops
                    </p>
                    <p className="text-sm">{useGroup.use_group_crops}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Registration Timeline */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Registration Timeline</CardTitle>
              <CardDescription>
                Submission, approval, and market entry dates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Registration Status
                  </p>
                  {useGroup.use_group_status ? (
                    <Badge
                      variant={
                        useGroup.use_group_status === "Approved"
                          ? "default"
                          : useGroup.use_group_status === "Submitted"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {useGroup.use_group_status}
                    </Badge>
                  ) : (
                    <p className="text-sm">Not Started</p>
                  )}
                </div>

                {useGroup.earliest_actual_submission_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Earliest Submission Date
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(
                        useGroup.earliest_actual_submission_date,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {useGroup.earliest_actual_submission_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Actual Submission Date
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(
                        useGroup.earliest_actual_submission_date,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {useGroup.earliest_actual_approval_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Earliest Approval Date
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(
                        useGroup.earliest_actual_approval_date,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {useGroup.earliest_actual_approval_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Actual Approval Date
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      {new Date(
                        useGroup.earliest_actual_approval_date,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {/* earliest_market_entry_date field not available in use group view */}

                {/* actual_market_entry_date field not available in use group view */}

                {useGroup.is_active !== null && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Is Active
                    </p>
                    <Badge variant={useGroup.is_active ? "default" : "outline"}>
                      {useGroup.is_active ? "Yes" : "No"}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Cases */}
        {businessCases.length > 0 && (
          <Card className="mt-6">
            <CardHeader className="space-y-1.5">
              <CardTitle>Business Cases</CardTitle>
              <CardDescription>
                Financial projections for this use group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {businessCases.map((bc) => (
                  <Link
                    key={bc.business_case_id}
                    href={`/portfolio/business-cases/${bc.business_case_id}`}
                    className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {bc.display_name ||
                              bc.business_case_name ||
                              "Business Case"}
                          </h4>
                          {/* scenario_name field removed from schema */}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {bc.fiscal_year} • Year {bc.year_offset}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-semibold">
                          <FormattedCurrency value={bc.total_revenue} />
                        </div>
                        {bc.margin_percent !== null && (
                          <div className="text-sm text-muted-foreground">
                            {bc.margin_percent.toFixed(1)}% margin
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </AnimatedPage>
    </div>
  );
}
