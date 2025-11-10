import { getLabelById, getFormulationBusinessCases } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
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

interface LabelDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatCurrency(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(2)}`;
}

export default async function LabelDetailPage({
  params,
}: LabelDetailPageProps) {
  const { id } = await params;
  const label = await getLabelById(id);

  if (!label) {
    notFound();
  }

  // Get business cases for this label
  let businessCases: BusinessCase[] = [];
  if (label.formulation_id) {
    const allBusinessCases = await getFormulationBusinessCases(label.formulation_id);
    businessCases = allBusinessCases.filter(
      (bc) => bc.formulation_country_label_id === id
    );
  }

  // Calculate totals
  const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
  const totalMargin = businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
  const avgMarginPercent = businessCases.length > 0
    ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / businessCases.length
    : 0;

  const breadcrumbs = [
    { label: "Labels", href: "/labels" },
    ...(label.formulation_id
      ? [
          {
            label: label.formulation_code || "Formulation",
            href: `/formulations/${label.formulation_id}`,
          },
        ]
      : []),
    {
      label: label.label_name || `Label ${label.label_variant || ""}`,
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {label.label_name || `Label ${label.label_variant || ""}`}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Label details and business case information
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
                {formatCurrency(totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                Across {businessCases.length} business case{businessCases.length !== 1 ? "s" : ""}
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
                {formatCurrency(totalMargin)}
              </div>
              <p className="text-xs text-muted-foreground">
                {avgMarginPercent > 0 ? `${avgMarginPercent.toFixed(1)}% avg margin` : "—"}
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
              <p className="text-xs text-muted-foreground">Active projections</p>
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
              {label.registration_status ? (
                <Badge
                  variant={
                    label.registration_status === "Approved"
                      ? "default"
                      : label.registration_status === "Submitted"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-sm"
                >
                  {label.registration_status}
                </Badge>
              ) : (
                <p className="text-sm text-muted-foreground">Not Started</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Label Information */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Label Information</CardTitle>
              <CardDescription>Label details and variant information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Label Name</p>
                  <p className="text-sm font-medium">{label.label_name || "—"}</p>
                </div>

                {label.label_variant && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Variant</p>
                    <Badge variant="secondary">{label.label_variant}</Badge>
                  </div>
                )}

                {label.formulation_id && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Formulation</p>
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link href={`/formulations/${label.formulation_id}`}>
                        <Package className="mr-2 h-4 w-4" />
                        {label.formulation_code}
                        {label.formulation_name && ` - ${label.formulation_name}`}
                      </Link>
                    </Button>
                  </div>
                )}

                {label.formulation_country_id && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Formulation-Country</p>
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link href={`/formulation-countries/${label.formulation_country_id}`}>
                        <Globe className="mr-2 h-4 w-4" />
                        {label.country_name}
                        {label.formulation_code && ` - ${label.formulation_code}`}
                      </Link>
                    </Button>
                  </div>
                )}

                {label.country_name && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Country</p>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{label.country_name}</p>
                      {label.country_code && (
                        <Badge variant="outline" className="text-xs">
                          {label.country_code}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {label.reference_product_name && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Reference Product</p>
                    <p className="text-sm">{label.reference_product_name}</p>
                    {label.reference_manufacturer && (
                      <p className="text-xs text-muted-foreground">
                        {label.reference_manufacturer}
                      </p>
                    )}
                  </div>
                )}

                {label.label_crops && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Crops</p>
                    <p className="text-sm">{label.label_crops}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Registration Timeline */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Registration Timeline</CardTitle>
              <CardDescription>Submission, approval, and market entry dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Registration Status</p>
                  {label.registration_status ? (
                    <Badge
                      variant={
                        label.registration_status === "Approved"
                          ? "default"
                          : label.registration_status === "Submitted"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {label.registration_status}
                    </Badge>
                  ) : (
                    <p className="text-sm">Not Started</p>
                  )}
                </div>

                {label.earliest_submission_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Earliest Submission Date</p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(label.earliest_submission_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {label.actual_submission_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Actual Submission Date</p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(label.actual_submission_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {label.earliest_approval_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Earliest Approval Date</p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(label.earliest_approval_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {label.actual_approval_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Actual Approval Date</p>
                    <p className="text-sm flex items-center gap-2">
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                      {new Date(label.actual_approval_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {label.earliest_market_entry_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Earliest Market Entry</p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(label.earliest_market_entry_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {label.actual_market_entry_date && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Actual Market Entry</p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(label.actual_market_entry_date).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {label.is_active !== null && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Is Active</p>
                    <Badge variant={label.is_active ? "default" : "outline"}>
                      {label.is_active ? "Yes" : "No"}
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
              <CardDescription>Financial projections for this label</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {businessCases.map((bc) => (
                  <Link
                    key={bc.business_case_id}
                    href={`/business-cases/${bc.business_case_id}`}
                    className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {bc.display_name || bc.business_case_name || "Business Case"}
                          </h4>
                          {bc.scenario_name && (
                            <Badge variant="outline" className="text-xs">
                              {bc.scenario_name}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {bc.fiscal_year} • Year {bc.year_offset}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-semibold">{formatCurrency(bc.total_revenue)}</div>
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

