import {
  getFormulationById,
  getFormulationCountryDetails,
  getFormulationIngredients,
  getFormulationCOGS,
  getFormulationBusinessCases,
  getFormulationStatusHistory,
  getFormulationProtectionStatus,
  getFormulationUseGroups,
} from "@/lib/db/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { FormulationIngredients } from "@/components/formulations/FormulationIngredients";
import { FormulationCOGS } from "@/components/formulations/FormulationCOGS";
import { FormulationBusinessCases } from "@/components/formulations/FormulationBusinessCases";
import { FormulationStatusHistory } from "@/components/formulations/FormulationStatusHistory";
import { FormulationRegulatory } from "@/components/formulations/FormulationRegulatory";
import { FormulationTimeline } from "@/components/formulations/FormulationTimeline";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import { FormulationTreeView } from "@/components/navigation/FormulationTreeView";
import { getFormulationBusinessCasesForTree } from "@/lib/db/queries";
import Link from "next/link";
import { Network, Package, Globe, DollarSign, FileText, Shield, History } from "lucide-react";

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
    cogs,
    businessCases,
    statusHistory,
    protectionStatus,
    useGroups,
    businessCasesForTree,
  ] = await Promise.all([
    getFormulationById(id),
    getFormulationCountryDetails(id),
    getFormulationIngredients(id),
    getFormulationCOGS(id),
    getFormulationBusinessCases(id),
    getFormulationStatusHistory(id),
    getFormulationProtectionStatus(id),
    getFormulationUseGroups(id),
    getFormulationBusinessCasesForTree(id),
  ]);

  if (!formulation) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Formulations", href: "/formulations" },
    { label: formulation.formulation_code || ("formulation_name" in formulation ? formulation.formulation_name : "") || "Formulation" },
  ];

  // Calculate summary metrics
  const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
  const totalMargin = businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
  const avgMarginPercent = businessCases.length > 0
    ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / businessCases.length
    : 0;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />
        
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{"formulation_name" in formulation ? formulation.formulation_name : formulation.formulation_code || "Formulation"}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {formulation.formulation_code || "—"}{"formulation_category" in formulation && formulation.formulation_category ? ` • ${formulation.formulation_category}` : ""}
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href={`/formulations/${id}/hierarchy`}>
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
              <div className="text-2xl font-bold">{businessCases.length}</div>
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-lg font-semibold">{formatCurrency(totalRevenue)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Total Margin</p>
                      <p className="text-lg font-semibold">{formatCurrency(totalMargin)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Avg Margin %</p>
                      <p className="text-lg font-semibold">{avgMarginPercent.toFixed(1)}%</p>
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
            <FormulationBusinessCases businessCases={businessCases} />

            {/* COGS */}
            <FormulationCOGS cogs={cogs} />

            {/* Countries */}
            {countryDetails.length > 0 && (
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Countries ({countryDetails.length})</CardTitle>
                  <CardDescription>Formulation registrations by country</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {countryDetails.map((detail) => (
                      <div
                        key={detail.formulation_country_id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                      >
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="font-medium text-sm">{detail.country_name}</div>
                          <div className="text-xs text-muted-foreground">
                            {detail.likely_registration_pathway || "No pathway"} • {detail.target_market_entry_fy || "No target FY"}
                            {detail.earliest_market_entry_date && ` • EMD: ${new Date(detail.earliest_market_entry_date).toLocaleDateString()}`}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {detail.country_status && (
                            <Badge variant="outline" className="text-xs">
                              {detail.country_status}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            {useGroups.filter(ug => ug.formulation_country_id === detail.formulation_country_id).length} use groups
                          </Badge>
                        </div>
                      </div>
                    ))}
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
