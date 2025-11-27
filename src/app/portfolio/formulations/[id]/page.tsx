import {
  getFormulationById,
  getFormulationCountryDetails,
  getFormulationIngredients,
  getFormulationBusinessCases,
  getFormulationStatusHistory,
  getFormulationProtectionStatus,
  getFormulationUseGroups,
  getExchangeRates,
} from "@/lib/db/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationIngredients } from "@/components/formulations/FormulationIngredients";
import { FormulationBusinessCases } from "@/components/formulations/FormulationBusinessCases";
import { FormulationStatusHistory } from "@/components/formulations/FormulationStatusHistory";
import { FormulationRegulatory } from "@/components/formulations/FormulationRegulatory";
import { FormulationTimeline } from "@/components/formulations/FormulationTimeline";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import { FormulationTreeView } from "@/components/navigation/FormulationTreeView";
import { getFormulationBusinessCasesForTree } from "@/lib/db/queries";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import Link from "next/link";
import { Network, Package, Globe, DollarSign, FileText, Shield, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormulationDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

export default async function FormulationDetailPage({
  params,
}: FormulationDetailPageProps) {
  const { id } = await params;
  
  const [
    formulation,
    countryDetails,
    ingredients,
    businessCases,
    statusHistory,
    protectionStatus,
    useGroups,
    businessCasesForTree,
    allExchangeRates,
  ] = await Promise.all([
    getFormulationById(id),
    getFormulationCountryDetails(id),
    getFormulationIngredients(id),
    getFormulationBusinessCases(id),
    getFormulationStatusHistory(id),
    getFormulationProtectionStatus(id),
    getFormulationUseGroups(id),
    getFormulationBusinessCasesForTree(id),
    getExchangeRates(),
  ]);

  // Create exchange rate map: country_id -> exchange_rate_to_eur
  const exchangeRateMap = new Map<string, number>();
  const countryToLatestRate = new Map<string, { rate: number; date: string }>();
  
  allExchangeRates.forEach((er: any) => {
    if (er.country_id && er.exchange_rate_to_eur && er.is_active) {
      const existing = countryToLatestRate.get(er.country_id);
      if (!existing || er.effective_date > existing.date) {
        countryToLatestRate.set(er.country_id, {
          rate: er.exchange_rate_to_eur,
          date: er.effective_date,
        });
      }
    }
  });
  
  countryToLatestRate.forEach((value, countryId) => {
    exchangeRateMap.set(countryId, value.rate);
  });

  if (!formulation) {
    notFound();
  }

  const formulationDisplayName = 
    ("formulation_name" in formulation && formulation.formulation_name)
      ? formulation.formulation_name
      : ("product_name" in formulation && formulation.product_name)
        ? formulation.product_name
        : formulation.formulation_code || "Formulation";
  
  const breadcrumbs = [
    { label: "Formulations", href: "/formulations" },
    { label: formulationDisplayName },
  ];

  // Calculate summary metrics
  const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
  const totalMargin = businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
  const avgMarginPercent = businessCases.length > 0
    ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / businessCases.length
    : 0;
  
  // Check for negative margins
  const hasNegativeMargins = businessCases.some((bc) => (bc.total_margin || 0) < 0);
  const negativeMarginCount = businessCases.filter((bc) => (bc.total_margin || 0) < 0).length;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />
        
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {"formulation_name" in formulation && formulation.formulation_name
                ? formulation.formulation_name
                : "product_name" in formulation && formulation.product_name
                  ? formulation.product_name
                  : formulation.formulation_code || "Formulation"}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {formulation.formulation_code ? `Code: ${formulation.formulation_code}` : "—"}
              {"formulation_category" in formulation && formulation.formulation_category
                ? ` • ${formulation.formulation_category}`
                : "product_category" in formulation && formulation.product_category
                  ? ` • ${formulation.product_category}`
                  : ""}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/portfolio/formulations/${id}/hierarchy`}>
              <Network className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">View Tree</span>
              <span className="sm:hidden">Tree</span>
            </Link>
          </Button>
        </div>

        {/* Overview Section - Show key info upfront */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Countries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{countryDetails.length}</div>
              <p className="text-xs text-muted-foreground">
                {countryDetails.filter(c => c.country_status === "Approved").length} approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Use Groups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{useGroups.length}</div>
              <p className="text-xs text-muted-foreground">
                {useGroups.filter(l => l.use_group_status === "Approved").length} approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Business Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{countUniqueBusinessCaseGroups(businessCases)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(totalRevenue)} revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{ingredients.length}</div>
              <p className="text-xs text-muted-foreground">
                {ingredients.filter(i => i.ingredients?.ingredient_type === "Active").length} active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Consolidated tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tree">Tree View</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab - All consolidated info */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {/* Basic Details */}
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Formulation Code</p>
                      <p className="text-sm font-medium">{formulation.formulation_code || "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Status</p>
                      <Badge variant={"formulation_status" in formulation ? (statusColors[formulation.formulation_status] as any) || "secondary" : "secondary"}>
                        {"formulation_status" in formulation ? formulation.formulation_status : "—"}
                      </Badge>
                    </div>
                    {"formulation_category" in formulation && (<div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Formulation Category</p>
                      <p className="text-sm">{formulation.formulation_category || "—"}</p>
                    </div>)}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Formulation Type</p>
                      <p className="text-sm">{formulation.formulation_type || "—"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">UOM</p>
                      <p className="text-sm">{formulation.uom || "—"}</p>
                    </div>
                    {formulation.short_name && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Short Name</p>
                        <p className="text-sm">{formulation.short_name}</p>
                      </div>
                    )}
                  </div>
                  {"status_rationale" in formulation && formulation.status_rationale && (
                    <div className="space-y-1 pt-2 border-t">
                      <p className="text-xs font-medium text-muted-foreground">Status Rationale</p>
                      <p className="text-sm">{formulation.status_rationale}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Financial Summary */}
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Financial Summary</CardTitle>
                  {hasNegativeMargins && (
                    <CardDescription className="text-destructive">
                      ⚠️ Warning: {negativeMarginCount} business case{negativeMarginCount !== 1 ? "s" : ""} with negative margins (COGS &gt; NSP)
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {hasNegativeMargins && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg mb-4">
                      <p className="text-sm text-destructive font-medium">
                        ⚠️ Negative margins detected: Some business cases have COGS exceeding NSP. Please review pricing or cost assumptions.
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-lg font-semibold">{formatCurrency(totalRevenue)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Total Margin</p>
                      <p className={cn("text-lg font-semibold", totalMargin < 0 && "text-destructive")}>
                        {formatCurrency(totalMargin)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Avg Margin %</p>
                      <p className={cn("text-lg font-semibold", avgMarginPercent < 0 && "text-destructive")}>
                        {avgMarginPercent.toFixed(1)}%
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Business Cases</p>
                      <p className="text-lg font-semibold">{businessCases.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 10-Year Timeline */}
            {businessCases.length > 0 && (
              <FormulationTimeline businessCases={businessCases} />
            )}

            {/* Ingredients */}
            <FormulationIngredients ingredients={ingredients} />

            {/* Business Cases */}
            <FormulationBusinessCases businessCases={businessCases} exchangeRates={exchangeRateMap} />

            {/* Country Portfolio Overview */}
            {countryDetails.length > 0 && (
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Country Portfolio ({countryDetails.length})</CardTitle>
                  <CardDescription>Revenue and margin breakdown by country</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {countryDetails.map((detail) => {
                      // Calculate country-specific metrics from business cases
                      const countryBusinessCases = businessCases.filter(
                        (bc) => bc.country_name === detail.country_name
                      );
                      const countryRevenue = countryBusinessCases.reduce(
                        (sum, bc) => sum + (bc.total_revenue || 0),
                        0
                      );
                      const countryMargin = countryBusinessCases.reduce(
                        (sum, bc) => sum + (bc.total_margin || 0),
                        0
                      );
                      const countryMarginPercent = countryRevenue > 0 
                        ? (countryMargin / countryRevenue) * 100 
                        : 0;
                      const countryUseGroups = useGroups.filter(
                        (ug) => ug.formulation_country_id === detail.formulation_country_id
                      );

                      return (
                        <Link
                          key={detail.formulation_country_id}
                          href={`/portfolio/formulations/${id}?country=${encodeURIComponent(detail.country_name || '')}`}
                          className="block"
                        >
                          <div className="p-4 border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-all cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-sm">{detail.country_name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {detail.target_market_entry_fy || "No target FY"}
                                </p>
                              </div>
                              {detail.country_status && (
                                <Badge 
                                  variant={detail.country_status === "Approved" ? "default" : "outline"} 
                                  className="text-xs"
                                >
                                  {detail.country_status}
                                </Badge>
                              )}
                            </div>
                            
                            {countryBusinessCases.length > 0 ? (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Revenue</span>
                                  <span className="font-medium">{formatCurrency(countryRevenue)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Margin</span>
                                  <span className={cn(
                                    "font-medium",
                                    countryMargin < 0 && "text-destructive"
                                  )}>
                                    {formatCurrency(countryMargin)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">Margin %</span>
                                  <Badge 
                                    variant={
                                      countryMarginPercent >= 40 ? "default" :
                                      countryMarginPercent >= 20 ? "secondary" :
                                      countryMarginPercent >= 0 ? "outline" : "destructive"
                                    }
                                    className="text-xs"
                                  >
                                    {countryMarginPercent.toFixed(1)}%
                                  </Badge>
                                </div>
                                <div className="pt-2 border-t mt-2 flex justify-between text-xs text-muted-foreground">
                                  <span>{countryBusinessCases.length} business cases</span>
                                  <span>{countryUseGroups.length} use groups</span>
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-muted-foreground">
                                <p>No business cases yet</p>
                                <p className="text-xs mt-1">{countryUseGroups.length} use groups</p>
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Regulatory - Use Groups & Protection */}
            <FormulationRegulatory
              protectionStatus={protectionStatus}
              useGroups={useGroups}
            />
          </TabsContent>

          {/* Tree View Tab */}
          <TabsContent value="tree" className="space-y-4 sm:space-y-6">
            <FormulationTreeView
              formulationId={id}
              formulationCode={formulation.formulation_code || ""}
              formulationName={"formulation_name" in formulation ? formulation.formulation_name || "" : formulation.formulation_code || ""}
              countries={countryDetails}
              useGroups={useGroups}
              businessCases={businessCasesForTree}
            />
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 sm:space-y-6">
            <FormulationStatusHistory history={statusHistory} />
          </TabsContent>
        </Tabs>
      </AnimatedPage>
    </div>
  );
}

function formatCurrency(value: number | null) {
  if (!value) return "—";
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  return `$${(value / 1000).toFixed(0)}K`;
}
