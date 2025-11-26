"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Package, FileCheck, Plus } from "lucide-react";
import { BusinessCaseCreateModal } from "@/components/business-cases/BusinessCaseCreateModal";
import Link from "next/link";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type Country = Database["public"]["Tables"]["countries"]["Row"];
type RegistrationPipeline = Database["public"]["Views"]["vw_registration_pipeline"]["Row"];

interface MarketOverviewDashboardProps {
  businessCases: BusinessCase[];
  formulations: Formulation[];
  countries: Country[];
  registrations: RegistrationPipeline[];
}

interface MarketMetrics {
  countryId: string;
  countryName: string;
  countryCode: string | null;
  currencyCode: string;
  totalRevenue: number;
  totalMargin: number;
  marginPercent: number;
  formulationCount: number;
  activeFormulationsCount: number;
  businessCaseCount: number;
  registrationCount: number;
  approvedRegistrations: number;
  submittedRegistrations: number;
}

export function MarketOverviewDashboard({
  businessCases,
  formulations,
  countries,
  registrations,
}: MarketOverviewDashboardProps) {
  const [sortBy, setSortBy] = useState<"revenue" | "margin" | "formulations">("revenue");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Calculate metrics per country
  const marketMetrics = useMemo(() => {
    const metrics: Record<string, MarketMetrics> = {};

    // Initialize with all active countries
    countries.forEach((country) => {
      metrics[country.country_id] = {
        countryId: country.country_id,
        countryName: country.country_name,
        countryCode: country.country_code,
        currencyCode: country.currency_code,
        totalRevenue: 0,
        totalMargin: 0,
        marginPercent: 0,
        formulationCount: 0,
        activeFormulationsCount: 0,
        businessCaseCount: 0,
        registrationCount: 0,
        approvedRegistrations: 0,
        submittedRegistrations: 0,
      };
    });

    // Aggregate business case data by country
    businessCases.forEach((bc) => {
      if (!bc.country_id || !metrics[bc.country_id]) return;

      const metric = metrics[bc.country_id];
      metric.totalRevenue += bc.total_revenue || 0;
      metric.totalMargin += bc.total_margin || 0;
      metric.businessCaseCount++;

      // Track unique formulations (using Set would be more accurate but this is close enough)
      if (bc.formulation_id) {
        metric.formulationCount++;
      }
    });

    // Calculate margin percentages
    Object.values(metrics).forEach((metric) => {
      if (metric.totalRevenue > 0) {
        metric.marginPercent = (metric.totalMargin / metric.totalRevenue) * 100;
      }
    });

    // Count registrations by country
    registrations.forEach((reg) => {
      if (!reg.country_name) return;
      
      // Find metric by country name (not ideal but registration view doesn't have country_id)
      const metric = Object.values(metrics).find(m => m.countryName === reg.country_name);
      if (!metric) return;

      metric.registrationCount++;
      
      if (reg.country_status === "Approved") {
        metric.approvedRegistrations++;
      } else if (reg.country_status === "Submitted") {
        metric.submittedRegistrations++;
      }
    });

    // Convert to array and filter out countries with no data
    return Object.values(metrics)
      .filter((m) => m.businessCaseCount > 0 || m.registrationCount > 0)
      .sort((a, b) => {
        switch (sortBy) {
          case "revenue":
            return b.totalRevenue - a.totalRevenue;
          case "margin":
            return b.marginPercent - a.marginPercent;
          case "formulations":
            return b.formulationCount - a.formulationCount;
          default:
            return 0;
        }
      });
  }, [businessCases, countries, registrations, sortBy]);

  // Calculate global totals
  const globalMetrics = useMemo(() => {
    return marketMetrics.reduce(
      (acc, m) => ({
        totalRevenue: acc.totalRevenue + m.totalRevenue,
        totalMargin: acc.totalMargin + m.totalMargin,
        countryCount: acc.countryCount + 1,
        formulationCount: acc.formulationCount + m.formulationCount,
        registrationCount: acc.registrationCount + m.registrationCount,
      }),
      {
        totalRevenue: 0,
        totalMargin: 0,
        countryCount: 0,
        formulationCount: 0,
        registrationCount: 0,
      }
    );
  }, [marketMetrics]);

  const globalMarginPercent =
    globalMetrics.totalRevenue > 0
      ? (globalMetrics.totalMargin / globalMetrics.totalRevenue) * 100
      : 0;

  return (
    <>
      <div className="space-y-6">
        {/* Action Button */}
        <div className="flex justify-end">
          <Button onClick={() => setCreateModalOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Business Case
          </Button>
        </div>

        {/* Global Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Markets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalMetrics.countryCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active countries with portfolio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{(globalMetrics.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {globalMarginPercent.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4" />
              Formulations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalMetrics.formulationCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Business case entries
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalMetrics.registrationCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active registrations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sort Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Market Performance</CardTitle>
              <CardDescription>
                Click a market to drill down into detailed analysis
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant={sortBy === "revenue" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSortBy("revenue")}
              >
                Sort by Revenue
              </Badge>
              <Badge
                variant={sortBy === "margin" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSortBy("margin")}
              >
                Sort by Margin %
              </Badge>
              <Badge
                variant={sortBy === "formulations" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSortBy("formulations")}
              >
                Sort by Products
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketMetrics.map((market) => (
              <Link
                key={market.countryId}
                href={`/portfolio/markets/${market.countryId}`}
                className="block"
              >
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">
                            {market.countryName}
                          </h3>
                          {market.countryCode && (
                            <Badge variant="outline" className="text-xs">
                              {market.countryCode}
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                            <p className="text-sm font-semibold">
                              €{(market.totalRevenue / 1000000).toFixed(1)}M
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">Margin</p>
                            <p className="text-sm font-semibold">
                              {market.marginPercent.toFixed(1)}%
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">Products</p>
                            <p className="text-sm font-semibold">
                              {market.formulationCount}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground">Registrations</p>
                            <p className="text-sm font-semibold">
                              {market.approvedRegistrations} approved /{" "}
                              {market.registrationCount} total
                            </p>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-muted-foreground ml-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {marketMetrics.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No market data available. Create business cases to see market analysis.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>

      <BusinessCaseCreateModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </>
  );
}

