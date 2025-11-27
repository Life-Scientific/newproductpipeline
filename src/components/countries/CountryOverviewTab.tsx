"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { getStatusVariant } from "@/lib/design-system";
import { FiscalYearSelector } from "@/components/countries/FiscalYearSelector";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface CountryOverviewTabProps {
  country: {
    country_id: string;
    country_name: string;
    country_code: string;
    is_active: boolean | null;
  };
  formulations: FormulationCountryDetail[];
  businessCases: BusinessCase[];
  stats: {
    totalFormulations: number;
    approvedFormulations: number;
    totalUseGroups: number;
    totalBusinessCases: number;
  };
}

/**
 * Parse effective_start_fiscal_year string (e.g., "FY26") to numeric year (e.g., 26)
 */
function parseEffectiveStartFY(effectiveStartFY: string | null): number | null {
  if (!effectiveStartFY) return null;
  const match = effectiveStartFY.match(/FY(\d{2})/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * Check if a business case matches the selected fiscal year
 * Formula: effective_start_fiscal_year + year_offset - 1 = selected_FY
 */
function matchesFiscalYear(bc: BusinessCase, selectedFY: number): boolean {
  const effectiveStart = parseEffectiveStartFY(bc.effective_start_fiscal_year);
  if (effectiveStart === null || bc.year_offset === null) return false;
  return effectiveStart + bc.year_offset - 1 === selectedFY;
}

export function CountryOverviewTab({
  country,
  formulations,
  businessCases,
  stats,
}: CountryOverviewTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get selected FY from URL params, default to FY30
  const selectedFY = parseInt(searchParams.get("fy") || "30", 10);

  // Update URL when FY changes
  const handleFYChange = (fy: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("fy", fy.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Filter business cases by selected FY
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => matchesFiscalYear(bc, selectedFY));
  }, [businessCases, selectedFY]);

  // Calculate FY-specific financial stats
  const fyStats = useMemo(() => {
    const totalRevenue = filteredBusinessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
    const totalMargin = filteredBusinessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
    const avgMarginPercent = filteredBusinessCases.length > 0
      ? filteredBusinessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / filteredBusinessCases.length
      : 0;
    return { totalRevenue, totalMargin, avgMarginPercent };
  }, [filteredBusinessCases]);

  // Group business cases by formulation for top formulations
  const bcByFormulation = useMemo(() => {
    const map = new Map<string, { revenue: number; margin: number; count: number }>();
    filteredBusinessCases.forEach((bc) => {
      const key = bc.formulation_code || "Unknown";
      const existing = map.get(key) || { revenue: 0, margin: 0, count: 0 };
      map.set(key, {
        revenue: existing.revenue + (bc.total_revenue || 0),
        margin: existing.margin + (bc.total_margin || 0),
        count: existing.count + 1,
      });
    });
    return map;
  }, [filteredBusinessCases]);

  // Top formulations by revenue (FY-specific)
  const topFormulations = useMemo(() => {
    return Array.from(bcByFormulation.entries())
      .map(([code, data]) => ({ code, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [bcByFormulation]);

  // Formulation country status breakdown
  const statusCounts = useMemo(() => {
    const counts = new Map<string, number>();
    formulations.forEach((f) => {
      const status = f.country_status || "Not yet evaluated";
      counts.set(status, (counts.get(status) || 0) + 1);
    });
    return counts;
  }, [formulations]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Fiscal Year Selector */}
      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border-2 border-primary/20">
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold">
            Showing financial data for:
          </span>
          <FiscalYearSelector
            selectedFY={selectedFY}
            onFYChange={handleFYChange}
            minFY={26}
            maxFY={35}
            className="[&_button]:text-base [&_button]:font-bold [&_button]:h-10 [&_button]:w-28 [&_button]:bg-primary/10 [&_button]:border-primary/30"
          />
        </div>
      </div>

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
            <CardTitle>Financial Summary (FY{selectedFY})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Revenue</p>
                <p className="text-lg font-semibold">{formatCurrencyCompact(fyStats.totalRevenue)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Margin</p>
                <p className={cn(
                  "text-lg font-semibold",
                  fyStats.totalMargin < 0 && "text-destructive"
                )}>
                  {formatCurrencyCompact(fyStats.totalMargin)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Avg Margin %</p>
                <p className={cn(
                  "text-lg font-semibold",
                  fyStats.avgMarginPercent < 0 && "text-destructive"
                )}>
                  {fyStats.avgMarginPercent.toFixed(1)}%
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Business Cases</p>
                <p className="text-lg font-semibold">{filteredBusinessCases.length}</p>
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
            <CardDescription>Highest performing formulations in this country (FY{selectedFY})</CardDescription>
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
                      <div className="font-semibold">{formatCurrencyCompact(f.revenue)}</div>
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

      {/* Formulation Country Breakdown */}
      <Card>
        <CardHeader className="space-y-1.5">
          <CardTitle>Formulation Country Breakdown</CardTitle>
          <CardDescription>Formulation country statuses in {country.country_name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from(statusCounts.entries()).map(([status, count]) => (
              <div key={status} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <Badge variant={getStatusVariant(status, 'country')}>
                    {status}
                  </Badge>
                  <span className="text-2xl font-bold">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

