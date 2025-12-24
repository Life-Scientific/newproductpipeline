import { getBusinessCaseById } from "@/lib/db/queries";
import { log, warn, error, table } from "@/lib/logger";
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
  DollarSign,
  TrendingUp,
  Package,
  Globe,
  FileText,
  Calendar,
  User,
  AlertCircle,
} from "lucide-react";

interface BusinessCaseDetailPageProps {
  params: Promise<{ id: string }>;
}

const confidenceColors: Record<string, string> = {
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

function formatNumber(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString();
}

export default async function BusinessCaseDetailPage({
  params,
}: BusinessCaseDetailPageProps) {
  const { id } = await params;

  let businessCase;
  try {
    businessCase = await getBusinessCaseById(id);
  } catch (error) {
    error("Error fetching business case:", error);
    notFound();
  }

  if (!businessCase) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Business Cases", href: "/business-cases" },
    {
      label:
        businessCase.display_name ||
        businessCase.business_case_name ||
        "Business Case",
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {businessCase.display_name ||
                businessCase.business_case_name ||
                "Business Case"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Financial projection and business case analysis
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
                <FormattedCurrency value={businessCase.total_revenue} />
              </div>
              <p className="text-xs text-muted-foreground">
                {businessCase.fiscal_year || "—"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Margin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">
                <FormattedCurrency value={businessCase.total_margin} />
              </div>
              <p className="text-xs text-muted-foreground">
                {businessCase.margin_percent !== null &&
                businessCase.margin_percent !== undefined
                  ? `${businessCase.margin_percent.toFixed(1)}%`
                  : "—"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Volume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">
                {formatNumber(businessCase.volume)}
              </div>
              <p className="text-xs text-muted-foreground">
                {businessCase.uom || "units"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                NSP per Unit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">
                <FormattedCurrency
                  value={businessCase.nsp}
                  compact={false}
                  decimals={2}
                />
              </div>
              <p className="text-xs text-muted-foreground">Net Sales Price</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Details Card */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Details</CardTitle>
              <CardDescription>Business case information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Year Offset
                  </p>
                  <p className="text-sm">
                    {businessCase.year_offset
                      ? `Year ${businessCase.year_offset}`
                      : "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Fiscal Year
                  </p>
                  <p className="text-sm font-medium">
                    {businessCase.fiscal_year || "—"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    COGS per Unit
                  </p>
                  <p className="text-sm">
                    <FormattedCurrency
                      value={businessCase.cogs_per_unit}
                      compact={false}
                      decimals={2}
                    />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Context Card */}
          <Card>
            <CardHeader className="space-y-1.5">
              <CardTitle>Context</CardTitle>
              <CardDescription>Related entities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {businessCase.formulation_code ? (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Formulation
                    </p>
                    {businessCase.formulation_id ? (
                      <Button variant="link" className="h-auto p-0" asChild>
                        <Link
                          href={`/portfolio/formulations/${businessCase.formulation_id}`}
                        >
                          <Package className="mr-2 h-4 w-4" />
                          {businessCase.formulation_code}
                          {businessCase.formulation_name &&
                            ` - ${businessCase.formulation_name}`}
                        </Link>
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {businessCase.formulation_code}
                          {businessCase.formulation_name &&
                            ` - ${businessCase.formulation_name}`}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null}

                {businessCase.country_name &&
                  businessCase.formulation_country_id && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Country
                      </p>
                      <Button variant="link" className="h-auto p-0" asChild>
                        <Link
                          href={`/formulation-countries/${businessCase.formulation_country_id}`}
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          {businessCase.country_name}
                          {businessCase.country_code && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              {businessCase.country_code}
                            </Badge>
                          )}
                        </Link>
                      </Button>
                    </div>
                  )}

                {businessCase.use_group_name &&
                  businessCase.formulation_country_use_group_id && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Use Group
                      </p>
                      <Button variant="link" className="h-auto p-0" asChild>
                        <Link
                          href={`/portfolio/use-groups/${businessCase.formulation_country_use_group_id}`}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {businessCase.use_group_name}
                          {businessCase.use_group_variant && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {businessCase.use_group_variant}
                            </Badge>
                          )}
                        </Link>
                      </Button>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Breakdown */}
        <Card className="mt-6">
          <CardHeader className="space-y-1.5">
            <CardTitle>Financial Breakdown</CardTitle>
            <CardDescription>
              Revenue, COGS, and margin calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground">
                    Revenue Calculation
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Volume:</span>
                      <span className="font-medium">
                        {formatNumber(businessCase.volume)}{" "}
                        {businessCase.uom || "units"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>NSP:</span>
                      <span className="font-medium">
                        <FormattedCurrency
                          value={businessCase.nsp}
                          compact={false}
                          decimals={2}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                      <span>Total Revenue:</span>
                      <span>
                        <FormattedCurrency value={businessCase.total_revenue} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground">
                    COGS Calculation
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Volume:</span>
                      <span className="font-medium">
                        {formatNumber(businessCase.volume)}{" "}
                        {businessCase.uom || "units"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>COGS per Unit:</span>
                      <span className="font-medium">
                        <FormattedCurrency
                          value={businessCase.cogs_per_unit}
                          compact={false}
                          decimals={2}
                        />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                      <span>Total COGS:</span>
                      <span>
                        <FormattedCurrency value={businessCase.total_cogs} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 p-4 bg-muted/50 rounded-lg">
                  <p className="text-xs font-medium text-muted-foreground">
                    Margin Analysis
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Revenue:</span>
                      <span className="font-medium">
                        <FormattedCurrency value={businessCase.total_revenue} />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>COGS:</span>
                      <span className="font-medium">
                        <FormattedCurrency value={businessCase.total_cogs} />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                      <span>Margin:</span>
                      <span className="text-green-600">
                        <FormattedCurrency value={businessCase.total_margin} />
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-1">
                      <span>Margin %:</span>
                      <Badge
                        variant={
                          (businessCase.margin_percent || 0) >= 50
                            ? "default"
                            : (businessCase.margin_percent || 0) >= 30
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {businessCase.margin_percent !== null &&
                        businessCase.margin_percent !== undefined
                          ? `${businessCase.margin_percent.toFixed(1)}%`
                          : "—"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assumptions */}
        {businessCase.assumptions && (
          <Card className="mt-6">
            <CardHeader className="space-y-1.5">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Assumptions
              </CardTitle>
              <CardDescription>
                Key assumptions and notes for this business case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">
                {businessCase.assumptions}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Metadata */}
        <Card className="mt-6">
          <CardHeader className="space-y-1.5">
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Metadata
            </CardTitle>
            <CardDescription>Creation and update information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessCase.created_by && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Created By
                  </p>
                  <p className="text-sm">{businessCase.created_by}</p>
                </div>
              )}
              {businessCase.created_at && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Created At
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {businessCase.created_at
                      ? new Date(businessCase.created_at).toLocaleString()
                      : "—"}
                  </p>
                </div>
              )}
              {businessCase.volume_last_updated_by && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Volume Last Updated By
                  </p>
                  <p className="text-sm">
                    {businessCase.volume_last_updated_by}
                  </p>
                  {businessCase.volume_last_updated_at && (
                    <p className="text-xs text-muted-foreground">
                      {businessCase.volume_last_updated_at
                        ? new Date(
                            businessCase.volume_last_updated_at,
                          ).toLocaleString()
                        : "—"}
                    </p>
                  )}
                </div>
              )}
              {businessCase.nsp_last_updated_by && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    NSP Last Updated By
                  </p>
                  <p className="text-sm">{businessCase.nsp_last_updated_by}</p>
                  {businessCase.nsp_last_updated_at && (
                    <p className="text-xs text-muted-foreground">
                      {businessCase.nsp_last_updated_at
                        ? new Date(
                            businessCase.nsp_last_updated_at,
                          ).toLocaleString()
                        : "—"}
                    </p>
                  )}
                </div>
              )}
              {businessCase.cogs_last_updated_by && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    COGS Last Updated By
                  </p>
                  <p className="text-sm">{businessCase.cogs_last_updated_by}</p>
                  {businessCase.cogs_last_updated_at && (
                    <p className="text-xs text-muted-foreground">
                      {businessCase.cogs_last_updated_at
                        ? new Date(
                            businessCase.cogs_last_updated_at,
                          ).toLocaleString()
                        : "—"}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}
