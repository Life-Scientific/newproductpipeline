"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Package, FileCheck, DollarSign, Plus } from "lucide-react";
import { BusinessCaseCreateModal } from "@/components/business-cases/BusinessCaseCreateModal";
import { countUniqueBusinessCaseGroups } from "@/lib/utils/business-case-utils";
import Link from "next/link";
import { RevenueTrendChart } from "@/components/charts/RevenueTrendChart";
import { CountryMarginChart } from "@/components/charts/CountryMarginChart";
import type { Database } from "@/lib/supabase/database.types";

type Country = Database["public"]["Tables"]["countries"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type RegistrationPipeline = Database["public"]["Views"]["vw_registration_pipeline"]["Row"];

interface MarketDetailDashboardProps {
  country: Country;
  businessCases: BusinessCase[];
  formulations: Formulation[];
  registrations: RegistrationPipeline[];
}

export function MarketDetailDashboard({
  country,
  businessCases,
  formulations,
  registrations,
}: MarketDetailDashboardProps) {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Calculate market metrics
  const metrics = useMemo(() => {
    const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
    const totalMargin = businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
    const marginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

    // Get unique formulations
    const uniqueFormulations = new Set(
      businessCases.map((bc) => bc.formulation_id).filter(Boolean)
    );

    // Count registrations by status
    const approvedCount = registrations.filter(
      (r) => r.country_status === "Approved"
    ).length;
    const submittedCount = registrations.filter(
      (r) => r.country_status === "Submitted"
    ).length;

    // Get formulation details
    const formulationDetails = Array.from(uniqueFormulations)
      .map((formId) => {
        const formulation = formulations.find((f) => f.formulation_id === formId);
        const formBCs = businessCases.filter((bc) => bc.formulation_id === formId);
        const formRevenue = formBCs.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
        const formMargin = formBCs.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
        const formMarginPercent = formRevenue > 0 ? (formMargin / formRevenue) * 100 : 0;

        const name = formulation ? ("formulation_name" in formulation ? (formulation as any).formulation_name : ("product_name" in formulation ? formulation.product_name : null)) as string | null : null;
        const category = formulation ? ("formulation_category" in formulation ? (formulation as any).formulation_category : ("product_category" in formulation ? formulation.product_category : null)) as string | null : null;
        const status = formulation ? ("formulation_status" in formulation ? (formulation as any).formulation_status : ("status" in formulation ? formulation.status : null)) as string | null : null;
        return {
          id: formId,
          code: formulation?.formulation_code || "—",
          name: name || "—",
          category: category || "—",
          status: status || "—",
          revenue: formRevenue,
          marginPercent: formMarginPercent,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);

    return {
      totalRevenue,
      totalMargin,
      marginPercent,
      formulationCount: uniqueFormulations.size,
      businessCaseCount: countUniqueBusinessCaseGroups(businessCases),
      registrationCount: registrations.length,
      approvedCount,
      submittedCount,
      formulationDetails,
    };
  }, [businessCases, formulations, registrations]);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Link href="/markets">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Markets
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold">{country.country_name}</h1>
              <Badge variant="outline">{country.country_code}</Badge>
              <Badge variant="outline">{country.currency_code}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Market analysis and portfolio performance
            </p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)} size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Create Business Case
          </Button>
        </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {country.currency_code === "EUR" ? "€" : country.currency_code}
              {(metrics.totalRevenue / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.marginPercent.toFixed(1)}% margin
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
            <div className="text-2xl font-bold">{metrics.formulationCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.businessCaseCount} business cases
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
            <div className="text-2xl font-bold">{metrics.registrationCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.approvedCount} approved, {metrics.submittedCount} submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Avg Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.marginPercent.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {country.currency_code === "EUR" ? "€" : country.currency_code}
              {(metrics.totalMargin / 1000000).toFixed(1)}M total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueTrendChart businessCases={businessCases} />
        <CountryMarginChart businessCases={businessCases} />
      </div>

      {/* Formulations in this Market */}
      <Card>
        <CardHeader>
          <CardTitle>Formulations in {country.country_name}</CardTitle>
          <CardDescription>
            Products with business cases in this market, sorted by revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {metrics.formulationDetails.map((form) => (
              <Link
                key={form.id}
                href={`/portfolio/formulations/${form.id}`}
                className="block"
              >
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-semibold">
                            {form.code}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {form.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {form.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{form.name}</p>

                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Revenue</p>
                            <p className="text-sm font-semibold">
                              {country.currency_code === "EUR" ? "€" : country.currency_code}
                              {(form.revenue / 1000000).toFixed(1)}M
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Margin</p>
                            <p className="text-sm font-semibold">
                              {form.marginPercent.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {metrics.formulationDetails.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No formulations with business cases in this market yet.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Registration Pipeline */}
      {registrations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Registration Pipeline</CardTitle>
            <CardDescription>
              Active registrations in {country.country_name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {registrations.slice(0, 10).map((reg) => (
                <div
                  key={`${reg.formulation_code}-${reg.formulation_country_id}`}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold">
                        {reg.formulation_code || "—"}
                      </span>
                      {reg.use_group_count && reg.use_group_count > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {reg.use_group_count} use group{reg.use_group_count > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge variant={reg.country_status === "Approved" ? "default" : "secondary"}>
                    {reg.country_status || "—"}
                  </Badge>
                </div>
              ))}
              {registrations.length > 10 && (
                <p className="text-sm text-center text-muted-foreground pt-2">
                  + {registrations.length - 10} more registrations
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
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

