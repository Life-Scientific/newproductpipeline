import { getCountryDetails, getExchangeRates } from "@/lib/db/queries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import Link from "next/link";
import {
  Globe,
  Package,
  DollarSign,
  FileText,
  Target,
  TrendingUp,
  Building2,
  Banknote,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStatusVariant } from "@/lib/design-system";
import { CountryFormulationsTable } from "@/components/countries/CountryFormulationsTable";
import { CountryBusinessCases } from "@/components/countries/CountryBusinessCases";
import { CountryUseGroups } from "@/components/countries/CountryUseGroups";

interface CountryDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatCurrency(value: number | null) {
  if (!value) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(2)}`;
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const { id } = await params;

  let countryData;
  try {
    countryData = await getCountryDetails(id);
  } catch (error) {
    notFound();
  }

  if (!countryData || !countryData.country) {
    notFound();
  }

  const { country, formulations, businessCases, useGroups, stats } = countryData;

  // Get exchange rates for currency display
  const allExchangeRates = await getExchangeRates();
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

  const breadcrumbs = [
    { label: "Countries", href: "/countries" },
    { label: country.country_name },
  ];

  // Group business cases by formulation for analysis
  const bcByFormulation = new Map<string, { revenue: number; margin: number; count: number }>();
  businessCases.forEach((bc) => {
    const key = bc.formulation_code || "Unknown";
    const existing = bcByFormulation.get(key) || { revenue: 0, margin: 0, count: 0 };
    bcByFormulation.set(key, {
      revenue: existing.revenue + (bc.total_revenue || 0),
      margin: existing.margin + (bc.total_margin || 0),
      count: existing.count + 1,
    });
  });

  // Top formulations by revenue
  const topFormulations = Array.from(bcByFormulation.entries())
    .map(([code, data]) => ({ code, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold">{country.country_name}</h1>
              <Badge variant="outline" className="text-sm">
                {country.country_code}
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Currency: {country.currency_code}
              {country.has_tariffs && " • Has Tariffs"}
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4" />
                Formulations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{stats.totalFormulations}</div>
              <p className="text-xs text-muted-foreground">
                {stats.approvedFormulations} approved
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
              <div className="text-2xl font-bold">{stats.totalUseGroups}</div>
              <p className="text-xs text-muted-foreground">
                Across {stats.totalFormulations} formulations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalBusinessCases} business cases
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
              <div className={cn(
                "text-2xl font-bold",
                stats.totalMargin < 0 && "text-destructive"
              )}>
                {formatCurrency(stats.totalMargin)}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.avgMarginPercent.toFixed(1)}% avg margin
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="formulations">Formulations</TabsTrigger>
            <TabsTrigger value="business-cases">Business Cases</TabsTrigger>
            <TabsTrigger value="use-groups">Use Groups</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {/* Country Details */}
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Country Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Country Code</p>
                      <p className="text-sm font-medium">{country.country_code}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Currency</p>
                      <p className="text-sm font-medium">{country.currency_code}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Has Tariffs</p>
                      <Badge variant={country.has_tariffs ? "warning" : "success"}>
                        {country.has_tariffs ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Status</p>
                      <Badge variant={country.is_active ? "success" : "muted"}>
                        {country.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
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
                      <p className="text-lg font-semibold">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Total Margin</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        stats.totalMargin < 0 && "text-destructive"
                      )}>
                        {formatCurrency(stats.totalMargin)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Avg Margin %</p>
                      <p className={cn(
                        "text-lg font-semibold",
                        stats.avgMarginPercent < 0 && "text-destructive"
                      )}>
                        {stats.avgMarginPercent.toFixed(1)}%
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Business Cases</p>
                      <p className="text-lg font-semibold">{stats.totalBusinessCases}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Formulations */}
            {topFormulations.length > 0 && (
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Top Formulations by Revenue</CardTitle>
                  <CardDescription>Highest performing formulations in this country</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topFormulations.map((f, index) => {
                      const formulation = formulations.find(fc => fc.formulation_code === f.code);
                      const marginPercent = f.revenue > 0 ? (f.margin / f.revenue) * 100 : 0;
                      
                      return (
                        <div
                          key={f.code}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <Link
                                href={formulation?.formulation_country_id 
                                  ? `/formulation-countries/${formulation.formulation_country_id}`
                                  : "#"
                                }
                                className="font-medium text-primary hover:underline"
                              >
                                {f.code}
                              </Link>
                              {formulation?.product_name && (
                                <p className="text-xs text-muted-foreground">
                                  {formulation.product_name}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(f.revenue)}</div>
                            <div className="text-xs text-muted-foreground">
                              <Badge
                                variant={
                                  marginPercent >= 40 ? "success" :
                                  marginPercent >= 20 ? "info" :
                                  marginPercent >= 0 ? "warning" : "destructive"
                                }
                                className="text-xs"
                              >
                                {marginPercent.toFixed(1)}% margin
                              </Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Registration Status Breakdown */}
            <Card>
              <CardHeader className="space-y-1.5">
                <CardTitle>Registration Status Breakdown</CardTitle>
                <CardDescription>Formulation registration statuses in {country.country_name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {(() => {
                    const statusCounts = new Map<string, number>();
                    formulations.forEach((f) => {
                      const status = f.country_status || "Not Started";
                      statusCounts.set(status, (statusCounts.get(status) || 0) + 1);
                    });
                    
                    return Array.from(statusCounts.entries()).map(([status, count]) => (
                      <div key={status} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <Badge variant={getStatusVariant(status, 'registration')}>
                            {status}
                          </Badge>
                          <span className="text-2xl font-bold">{count}</span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Formulations Tab */}
          <TabsContent value="formulations" className="space-y-4 sm:space-y-6">
            <CountryFormulationsTable formulations={formulations} countryName={country.country_name} />
          </TabsContent>

          {/* Business Cases Tab */}
          <TabsContent value="business-cases" className="space-y-4 sm:space-y-6">
            <CountryBusinessCases businessCases={businessCases} countryName={country.country_name} />
          </TabsContent>

          {/* Use Groups Tab */}
          <TabsContent value="use-groups" className="space-y-4 sm:space-y-6">
            <CountryUseGroups useGroups={useGroups} countryName={country.country_name} />
          </TabsContent>
        </Tabs>
      </AnimatedPage>
    </div>
  );
}


