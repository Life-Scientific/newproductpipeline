"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface RevenueProjectionsProps {
  businessCases: BusinessCase[];
}

export function RevenueProjections({ businessCases }: RevenueProjectionsProps) {
  // Group by fiscal year
  const byFiscalYear = businessCases.reduce((acc, bc) => {
    const fy = bc.fiscal_year || "Unknown";
    if (!acc[fy]) {
      acc[fy] = {
        revenue: 0,
        margin: 0,
        cogs: 0,
        count: 0,
        cases: [] as BusinessCase[],
      };
    }
    acc[fy].revenue += bc.total_revenue || 0;
    acc[fy].margin += bc.total_margin || 0;
    acc[fy].cogs += bc.total_cogs || 0;
    acc[fy].count += 1;
    acc[fy].cases.push(bc);
    return acc;
  }, {} as Record<string, { revenue: number; margin: number; cogs: number; count: number; cases: BusinessCase[] }>);

  const fiscalYears = Object.keys(byFiscalYear).sort();

  // Calculate totals
  const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
  const totalMargin = businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
  const totalCOGS = businessCases.reduce((sum, bc) => sum + (bc.total_cogs || 0), 0);

  // Group by scenario if available
  const scenarios = new Set(businessCases.map((bc) => bc.scenario_name).filter(Boolean));
  const hasScenarios = scenarios.size > 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="space-y-1.5">
          <CardTitle>Revenue Projections Summary</CardTitle>
          <CardDescription>Aggregated financial projections by fiscal year</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(2)}M</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Margin</p>
              <p className="text-2xl font-bold">${(totalMargin / 1000000).toFixed(2)}M</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total COGS</p>
              <p className="text-2xl font-bold">${(totalCOGS / 1000000).toFixed(2)}M</p>
            </div>
          </div>

          {fiscalYears.length > 0 ? (
            <div className="border-t pt-6">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fiscal Year</TableHead>
                  <TableHead>Business Cases</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>COGS</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Margin %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fiscalYears.map((fy) => {
                  const data = byFiscalYear[fy];
                  const marginPercent = data.revenue > 0 ? (data.margin / data.revenue) * 100 : 0;
                  return (
                    <TableRow key={fy}>
                      <TableCell className="font-medium">{fy}</TableCell>
                      <TableCell>{data.count}</TableCell>
                      <TableCell className="font-medium">
                        ${(data.revenue / 1000000).toFixed(2)}M
                      </TableCell>
                      <TableCell>${(data.cogs / 1000000).toFixed(2)}M</TableCell>
                      <TableCell>${(data.margin / 1000000).toFixed(2)}M</TableCell>
                      <TableCell>{marginPercent.toFixed(1)}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No business cases found.</p>
          )}
        </CardContent>
      </Card>

      {hasScenarios && (
        <Card>
          <CardHeader className="space-y-1.5">
            <CardTitle>Scenarios</CardTitle>
            <CardDescription>Business cases grouped by scenario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {Array.from(scenarios).map((scenario) => {
                const scenarioCases = businessCases.filter((bc) => bc.scenario_name === scenario);
                const scenarioRevenue = scenarioCases.reduce(
                  (sum, bc) => sum + (bc.total_revenue || 0),
                  0
                );
                const scenarioMargin = scenarioCases.reduce(
                  (sum, bc) => sum + (bc.total_margin || 0),
                  0
                );
                return (
                  <div key={scenario} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-4">
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="font-medium text-sm truncate">{scenario}</p>
                      <p className="text-xs text-muted-foreground">
                        {scenarioCases.length} business cases
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-0.5">
                      <p className="font-semibold text-sm">${(scenarioRevenue / 1000000).toFixed(2)}M</p>
                      <p className="text-xs text-muted-foreground">
                        Margin: ${(scenarioMargin / 1000000).toFixed(2)}M
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

