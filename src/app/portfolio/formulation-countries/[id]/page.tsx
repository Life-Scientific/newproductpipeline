import {
  getFormulationCountryById,
  getFormulationBusinessCases,
} from "@/lib/db/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Force dynamic rendering to ensure fresh data
export const dynamic = "force-dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { FormattedCurrency } from "@/components/ui/formatted-currency";
import Link from "next/link";
import {
  Globe,
  Package,
  FileText,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface FormulationCountryDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatNumber(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString();
}

export default async function FormulationCountryDetailPage({
  params,
}: FormulationCountryDetailPageProps) {
  const { id } = await params;
  const formulationCountry = await getFormulationCountryById(id);

  if (!formulationCountry) {
    notFound();
  }

  // Get business cases for this formulation-country
  let businessCases: BusinessCase[] = [];
  if (formulationCountry.formulation_id) {
    const allBusinessCases = await getFormulationBusinessCases(
      formulationCountry.formulation_id,
    );
    businessCases = allBusinessCases.filter(
      (bc) => bc.formulation_country_id === id,
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
    { label: "Formulations", href: "/formulations" },
    ...(formulationCountry.formulation_id
      ? [
          {
            label: formulationCountry.formulation_code || "Formulation",
            href: `/formulations/${formulationCountry.formulation_id}`,
          },
        ]
      : []),
    {
      label: `${formulationCountry.country_name || "Country"} - ${formulationCountry.formulation_code || ""}`,
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {formulationCountry.display_name ||
                `${formulationCountry.formulation_code || ""} - ${formulationCountry.country_name || ""}`}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Formulation registration and business case details for{" "}
              {formulationCountry.country_name}
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
                <Globe className="h-4 w-4" />
                Registration Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {formulationCountry.country_status ? (
                <Badge
                  variant={
                    formulationCountry.country_status === "Approved"
                      ? "default"
                      : formulationCountry.country_status === "Submitted"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-sm"
                >
                  {formulationCountry.country_status}
                </Badge>
              ) : (
                <p className="text-sm text-muted-foreground">Not Started</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Formulation & Country Info */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Formulation & Country</CardTitle>
              <CardDescription>Product and market information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {formulationCountry.formulation_id && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Formulation
                    </p>
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link
                        href={`/portfolio/formulations/${formulationCountry.formulation_id}`}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        {formulationCountry.formulation_code}
                        {formulationCountry.product_name &&
                          ` - ${formulationCountry.product_name}`}
                      </Link>
                    </Button>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Country
                  </p>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{formulationCountry.country_name}</p>
                    {formulationCountry.country_code && (
                      <Badge variant="outline" className="text-xs">
                        {formulationCountry.country_code}
                      </Badge>
                    )}
                  </div>
                </div>

                {formulationCountry.product_category && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Product Category
                    </p>
                    <p className="text-sm">
                      {formulationCountry.product_category}
                    </p>
                  </div>
                )}

                {formulationCountry.formulation_type && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Formulation Type
                    </p>
                    <p className="text-sm">
                      {formulationCountry.formulation_type}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Registration Details */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Registration Details</CardTitle>
              <CardDescription>
                Regulatory and market entry information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Registration Status
                  </p>
                  {formulationCountry.country_status ? (
                    <Badge
                      variant={
                        formulationCountry.country_status === "Approved"
                          ? "default"
                          : formulationCountry.country_status === "Submitted"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {formulationCountry.country_status}
                    </Badge>
                  ) : (
                    <p className="text-sm">Not Started</p>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Has Approval
                  </p>
                  {formulationCountry.country_status ? (
                    <Badge
                      variant="default"
                      className="flex items-center gap-1 w-fit"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Yes
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 w-fit"
                    >
                      <XCircle className="h-3 w-3" />
                      No
                    </Badge>
                  )}
                </div>

                {formulationCountry.likely_registration_pathway && (
                  <div className="space-y-1 col-span-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Registration Pathway
                    </p>
                    <p className="text-sm">
                      {formulationCountry.likely_registration_pathway}
                    </p>
                  </div>
                )}

                {formulationCountry.target_market_entry_fy && (
                  <div className="space-y-1 col-span-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      Target Market Entry
                    </p>
                    <p className="text-sm font-medium">
                      {formulationCountry.target_market_entry_fy}
                    </p>
                  </div>
                )}

                {formulationCountry.earliest_market_entry_date && (
                  <div className="space-y-1 col-span-2">
                    <p className="text-xs font-medium text-muted-foreground">
                      EMD
                    </p>
                    <p className="text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(
                        formulationCountry.earliest_market_entry_date,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {formulationCountry.is_novel !== null && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Is Novel
                    </p>
                    <Badge
                      variant={
                        formulationCountry.is_novel ? "default" : "outline"
                      }
                    >
                      {formulationCountry.is_novel ? "Yes" : "No"}
                    </Badge>
                  </div>
                )}

                {/* Active Portfolio field removed from schema */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart */}
        {businessCases.length > 0 && (
          <Card className="mt-6">
            <CardHeader className="space-y-1.5">
              <CardTitle>Revenue Projections</CardTitle>
              <CardDescription>
                Financial projections by fiscal year for this
                formulation-country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RevenueChart businessCases={businessCases} />
            </CardContent>
          </Card>
        )}

        {/* Business Cases */}
        {businessCases.length > 0 && (
          <Card className="mt-6">
            <CardHeader className="space-y-1.5">
              <CardTitle>Business Cases</CardTitle>
              <CardDescription>
                Financial projections for this formulation-country
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

        {/* Additional Info */}
        {(formulationCountry.targets_treated ||
          formulationCountry.crop_categories) && (
          <Card className="mt-6">
            <CardHeader className="space-y-1.5">
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formulationCountry.targets_treated && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Targets Treated
                  </p>
                  <p className="text-sm">
                    {formulationCountry.targets_treated}
                  </p>
                </div>
              )}
              {formulationCountry.crop_categories && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Crop Categories
                  </p>
                  <p className="text-sm">
                    {formulationCountry.crop_categories}
                  </p>
                </div>
              )}
              {/* reference_product_name field removed from schema */}
            </CardContent>
          </Card>
        )}
      </AnimatedPage>
    </div>
  );
}
