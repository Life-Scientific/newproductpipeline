"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/database.types";
import { TrendingUp, TrendingDown } from "lucide-react";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface FormulationTimelineProps {
  businessCases: BusinessCase[];
}

interface FiscalYearData {
  fiscalYear: string;
  revenue: number;
  margin: number;
  marginPercent: number;
  volume: number;
  nsp: number;
  cogs: number;
  yearOffset: number;
  countries: Set<string>;
  useGroups: Set<string>;
  businessCaseCount: number;
}

function formatCurrency(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
}

function formatNumber(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString();
}

export function FormulationTimeline({ businessCases }: FormulationTimelineProps) {
  if (businessCases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>10-Year Financial Timeline</CardTitle>
          <CardDescription>Projected revenue and margin by fiscal year</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No business case data available.</p>
        </CardContent>
      </Card>
    );
  }

  // Aggregate business cases by fiscal year
  const fiscalYearMap = new Map<string, FiscalYearData>();

  businessCases.forEach((bc) => {
    const fy = bc.fiscal_year || "Unknown";
    const revenue = bc.total_revenue || 0;
    const margin = bc.total_margin || 0;
    const volume = bc.volume || 0;
    const nsp = bc.nsp || 0;
    const cogs = bc.total_cogs || 0;
    const marginPercent = bc.margin_percent || 0;
    const yearOffset = bc.year_offset || 0;

    if (!fiscalYearMap.has(fy)) {
      fiscalYearMap.set(fy, {
        fiscalYear: fy,
        revenue: 0,
        margin: 0,
        marginPercent: 0,
        volume: 0,
        nsp: 0,
        cogs: 0,
        yearOffset: yearOffset,
        countries: new Set(),
        useGroups: new Set(),
        businessCaseCount: 0,
      });
    }

    const fyData = fiscalYearMap.get(fy)!;
    fyData.revenue += revenue;
    fyData.margin += margin;
    fyData.volume += volume;
    fyData.cogs += cogs;
    fyData.businessCaseCount += 1;

    // Track countries and use groups
    if (bc.country_name) {
      fyData.countries.add(bc.country_name);
    }
    if (bc.use_group_name) {
      fyData.useGroups.add(bc.use_group_name);
    }

    // Track NSP for weighted average calculation
    // We'll calculate weighted average NSP after all data is aggregated
    if (volume > 0 && nsp > 0) {
      // Store weighted sum: nsp * volume
      if (fyData.nsp === 0) {
        fyData.nsp = nsp * volume; // Store weighted sum
      } else {
        fyData.nsp += nsp * volume; // Accumulate weighted sum
      }
    }
  });

  // Convert to array and calculate final values
  const timelineData = Array.from(fiscalYearMap.values()).map((data) => {
    // Calculate weighted average NSP
    if (data.volume > 0 && data.nsp > 0) {
      data.nsp = data.nsp / data.volume; // Convert weighted sum to average
    }

    // Calculate margin percent from aggregated values
    if (data.revenue > 0) {
      data.marginPercent = (data.margin / data.revenue) * 100;
    }

    return data;
  }).sort((a, b) => {
    // Try to sort by year offset first
    if (a.yearOffset !== b.yearOffset) {
      return a.yearOffset - b.yearOffset;
    }
    // Fallback to fiscal year string comparison
    return a.fiscalYear.localeCompare(b.fiscalYear);
  });

  // Calculate totals
  const totalRevenue = timelineData.reduce((sum, d) => sum + d.revenue, 0);
  const totalMargin = timelineData.reduce((sum, d) => sum + d.margin, 0);
  const totalMarginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

  // Calculate trend (comparing last two years)
  let trend: "up" | "down" | "neutral" = "neutral";
  let trendValue = 0;
  if (timelineData.length >= 2) {
    const lastYear = timelineData[timelineData.length - 1];
    const prevYear = timelineData[timelineData.length - 2];
    if (prevYear.revenue > 0) {
      trendValue = ((lastYear.revenue - prevYear.revenue) / prevYear.revenue) * 100;
      trend = trendValue > 0 ? "up" : trendValue < 0 ? "down" : "neutral";
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>10-Year Financial Timeline</CardTitle>
            <CardDescription>Projected revenue and margin by fiscal year</CardDescription>
          </div>
          {trend !== "neutral" && (
            <Badge variant={trend === "up" ? "default" : "destructive"} className="gap-1">
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(trendValue).toFixed(1)}%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-lg font-semibold">{formatCurrency(totalRevenue)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Total Margin</p>
              <p className="text-lg font-semibold">{formatCurrency(totalMargin)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Avg Margin %</p>
              <p className="text-lg font-semibold">{totalMarginPercent.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Years Covered</p>
              <p className="text-lg font-semibold">{timelineData.length}</p>
            </div>
          </div>

          {/* Horizontal Timeline */}
          <div className="border rounded-lg overflow-x-auto">
            <div className="min-w-full inline-block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky left-0 bg-background z-10 min-w-[120px]">Metric</TableHead>
                    {timelineData.map((data) => (
                      <TableHead key={data.fiscalYear} className="text-center min-w-[140px]">
                        <div className="space-y-1">
                          <div className="font-medium">{data.fiscalYear}</div>
                          {data.yearOffset > 0 && (
                            <Badge variant="outline" className="text-xs">
                              Y{data.yearOffset}
                            </Badge>
                          )}
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center font-medium bg-muted min-w-[120px]">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Volume</TableCell>
                    {timelineData.map((data) => (
                      <TableCell key={`volume-${data.fiscalYear}`} className="text-center">
                        {formatNumber(data.volume)}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-medium bg-muted">
                      {formatNumber(timelineData.reduce((sum, d) => sum + d.volume, 0))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">NSP</TableCell>
                    {timelineData.map((data) => (
                      <TableCell key={`nsp-${data.fiscalYear}`} className="text-center">
                        {data.nsp > 0 ? formatCurrency(data.nsp) : "—"}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-medium bg-muted">—</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">COGS</TableCell>
                    {timelineData.map((data) => (
                      <TableCell key={`cogs-${data.fiscalYear}`} className="text-center">
                        {formatCurrency(data.cogs)}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-medium bg-muted">
                      {formatCurrency(totalMargin > 0 ? totalRevenue - totalMargin : 0)}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/30">
                    <TableCell className="font-semibold sticky left-0 bg-background z-10">Revenue</TableCell>
                    {timelineData.map((data, index) => {
                      const prevRevenue = index > 0 ? timelineData[index - 1].revenue : null;
                      const revenueChange = prevRevenue && prevRevenue > 0
                        ? ((data.revenue - prevRevenue) / prevRevenue) * 100
                        : null;
                      return (
                        <TableCell key={`revenue-${data.fiscalYear}`} className="text-center font-semibold">
                          <div className="flex flex-col items-center gap-1">
                            <span>{formatCurrency(data.revenue)}</span>
                            {revenueChange !== null && revenueChange !== 0 && (
                              <span
                                className={`text-xs ${
                                  revenueChange > 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {revenueChange > 0 ? "+" : ""}
                                {revenueChange.toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center font-semibold bg-muted">
                      {formatCurrency(totalRevenue)}
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/30">
                    <TableCell className="font-semibold sticky left-0 bg-background z-10">Margin</TableCell>
                    {timelineData.map((data) => (
                      <TableCell key={`margin-${data.fiscalYear}`} className="text-center font-semibold">
                        {formatCurrency(data.margin)}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-semibold bg-muted">
                      {formatCurrency(totalMargin)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Margin %</TableCell>
                    {timelineData.map((data) => (
                      <TableCell key={`marginpct-${data.fiscalYear}`} className="text-center">
                        <Badge
                          variant={
                            data.marginPercent >= 50
                              ? "default"
                              : data.marginPercent >= 30
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {data.marginPercent.toFixed(1)}%
                        </Badge>
                      </TableCell>
                    ))}
                    <TableCell className="text-center bg-muted">
                      <Badge
                        variant={
                          totalMarginPercent >= 50
                            ? "default"
                            : totalMarginPercent >= 30
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {totalMarginPercent.toFixed(1)}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Countries</TableCell>
                    {timelineData.map((data) => (
                      <TableCell key={`countries-${data.fiscalYear}`} className="text-center text-sm text-muted-foreground">
                        {data.countries.size}
                      </TableCell>
                    ))}
                    <TableCell className="text-center text-sm text-muted-foreground bg-muted">
                      {new Set(businessCases.map((bc) => bc.country_name).filter(Boolean)).size}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium sticky left-0 bg-background z-10">Use Groups</TableCell>
                    {timelineData.map((data) => (
                      <TableCell key={`use-groups-${data.fiscalYear}`} className="text-center text-sm text-muted-foreground">
                        {data.useGroups.size}
                      </TableCell>
                    ))}
                    <TableCell className="text-center text-sm text-muted-foreground bg-muted">—</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Additional Info */}
          {timelineData.length > 0 && (
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Note:</strong> Data aggregated from {businessCases.length} business case
                {businessCases.length !== 1 ? "s" : ""} across{" "}
                {new Set(businessCases.map((bc) => bc.country_name).filter(Boolean)).size}{" "}
                countr{new Set(businessCases.map((bc) => bc.country_name).filter(Boolean)).size !== 1 ? "ies" : "y"}.
              </p>
              {timelineData.some((d) => d.businessCaseCount > 1) && (
                <p>
                  Multiple business cases may exist per fiscal year (e.g., different countries or
                  use groups).
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

