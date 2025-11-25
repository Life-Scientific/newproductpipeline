"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, AlertTriangle } from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface FormulationBusinessCasesProps {
  businessCases: BusinessCase[];
  exchangeRates?: Map<string, number>; // country_id -> exchange_rate_to_eur
}

// Helper function to convert to EUR
function convertToEUR(
  value: number | null | undefined,
  countryId: string | null,
  currencyCode: string | null,
  exchangeRates?: Map<string, number>
): number | null {
  if (value === null || value === undefined) return null;
  
  // If already in EUR, no conversion needed
  if (currencyCode?.toUpperCase() === "EUR") {
    return value;
  }
  
  // Convert using exchange rate
  if (exchangeRates && countryId) {
    const rate = exchangeRates.get(countryId);
    if (rate && rate > 0) {
      return value / rate;
    }
  }
  
  // If no rate found, assume already EUR
  return value;
}

function formatCurrency(value: number | null | undefined): string {
  if (!value && value !== 0) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatNumber(value: number | null | undefined): string {
  if (!value && value !== 0) return "—";
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function FormulationBusinessCases({ businessCases, exchangeRates }: FormulationBusinessCasesProps) {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  // Group business cases by country
  const groupedByCountry = useMemo(() => {
    const groups = new Map<string, BusinessCase[]>();
    
    businessCases.forEach((bc) => {
      const countryName = bc.country_name || "Unknown";
      if (!groups.has(countryName)) {
        groups.set(countryName, []);
      }
      groups.get(countryName)!.push(bc);
    });

    // Sort each group by year_offset, then fiscal_year
    groups.forEach((cases, country) => {
      cases.sort((a, b) => {
        const yearDiff = (a.year_offset || 0) - (b.year_offset || 0);
        if (yearDiff !== 0) return yearDiff;
        return (a.fiscal_year || "").localeCompare(b.fiscal_year || "");
      });
    });

    // Sort countries alphabetically
    return new Map([...groups.entries()].sort((a, b) => a[0].localeCompare(b[0])));
  }, [businessCases]);

  // Calculate summary for a country (converted to EUR)
  const calculateCountrySummary = (cases: BusinessCase[]) => {
    let totalRevenue = 0;
    let totalMargin = 0;
    const totalVolume = cases.reduce((sum, bc) => sum + (bc.volume || 0), 0);
    const uniqueUseGroups = new Set(cases.map(bc => bc.use_group_name || bc.formulation_country_use_group_id).filter(Boolean));
    
    cases.forEach((bc) => {
      const countryId = (bc as any).country_id || null;
      const currencyCode = (bc as any).currency_code || null;
      
      const revenueEUR = convertToEUR(bc.total_revenue, countryId, currencyCode, exchangeRates) || 0;
      const marginEUR = convertToEUR(bc.total_margin, countryId, currencyCode, exchangeRates) || 0;
      
      totalRevenue += revenueEUR;
      totalMargin += marginEUR;
    });
    
    const avgMarginPercent = cases.length > 0
      ? cases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / cases.length
      : 0;
    return { totalRevenue, totalMargin, totalVolume, avgMarginPercent, useGroupCount: uniqueUseGroups.size };
  };

  const toggleCountry = (country: string) => {
    setExpandedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(country)) {
        next.delete(country);
      } else {
        next.add(country);
      }
      return next;
    });
  };

  if (businessCases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Cases</CardTitle>
          <CardDescription>Financial projections</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No business cases found. Create projections for this formulation in specific markets.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Cases</CardTitle>
        <CardDescription>
          Financial projections and business case analysis ({businessCases.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Array.from(groupedByCountry.entries()).map(([country, cases]) => {
            const isExpanded = expandedCountries.has(country);
            const summary = calculateCountrySummary(cases);
            
            return (
              <Collapsible
                key={country}
                open={isExpanded}
                onOpenChange={() => toggleCountry(country)}
              >
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div className="text-left">
                          <div className="font-semibold text-sm">{country}</div>
                          <div className="text-xs text-muted-foreground">
                            {cases.length} business case{cases.length !== 1 ? "s" : ""}
                            {summary.useGroupCount > 0 && (
                              <span> • {summary.useGroupCount} use group{summary.useGroupCount !== 1 ? "s" : ""}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Total Revenue</div>
                          <div className="font-semibold">{formatCurrency(summary.totalRevenue)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Total Margin</div>
                          <div className="font-semibold">{formatCurrency(summary.totalMargin)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Avg Margin %</div>
                          <div className="font-semibold">{summary.avgMarginPercent.toFixed(1)}%</div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="min-w-[120px]">Formulation</TableHead>
                            <TableHead className="min-w-[120px]">Use Group</TableHead>
                            <TableHead className="w-[80px] text-right">Year</TableHead>
                            <TableHead className="w-[100px] text-right">Fiscal Year</TableHead>
                            <TableHead className="w-[100px] text-right">Volume</TableHead>
                            <TableHead className="w-[100px] text-right">NSP</TableHead>
                            <TableHead className="w-[100px] text-right">COGS/Unit</TableHead>
                            <TableHead className="w-[120px] text-right">Revenue</TableHead>
                            <TableHead className="w-[120px] text-right">Margin</TableHead>
                            <TableHead className="w-[100px] text-right">Margin %</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cases.map((bc) => {
                            return (
                              <TableRow key={bc.business_case_id}>
                                <TableCell className="font-medium">
                                  <span className="text-sm">{bc.formulation_name || "—"}</span>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm font-medium">
                                    {bc.use_group_name || bc.use_group_variant || "—"}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="text-sm">{bc.year_offset || "—"}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="text-sm font-mono">{bc.fiscal_year || "—"}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <span className="text-sm font-medium">{formatNumber(bc.volume)}</span>
                                  {bc.volume_last_updated_by && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      by {bc.volume_last_updated_by}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {(() => {
                                    const countryId = (bc as any).country_id || null;
                                    const currencyCode = (bc as any).currency_code || null;
                                    const eurValue = convertToEUR(bc.nsp, countryId, currencyCode, exchangeRates);
                                    return <span className="text-sm font-medium">{formatCurrency(eurValue)}</span>;
                                  })()}
                                  {bc.nsp_last_updated_by && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      by {bc.nsp_last_updated_by}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {(() => {
                                    const countryId = (bc as any).country_id || null;
                                    const currencyCode = (bc as any).currency_code || null;
                                    const eurValue = convertToEUR(bc.cogs_per_unit, countryId, currencyCode, exchangeRates);
                                    return <span className="text-sm font-medium">{formatCurrency(eurValue)}</span>;
                                  })()}
                                  {bc.cogs_last_updated_by && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      by {bc.cogs_last_updated_by}
                                    </div>
                                  )}
                                </TableCell>
                                <TableCell className="text-right">
                                  {(() => {
                                    const countryId = (bc as any).country_id || null;
                                    const currencyCode = (bc as any).currency_code || null;
                                    const eurValue = convertToEUR(bc.total_revenue, countryId, currencyCode, exchangeRates);
                                    return <span className="text-sm font-semibold">{formatCurrency(eurValue)}</span>;
                                  })()}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    {(bc.total_margin || 0) < 0 && (
                                      <span title="Negative margin: COGS exceeds NSP">
                                        <AlertTriangle className="h-3 w-3 text-destructive" />
                                      </span>
                                    )}
                                    {(() => {
                                      const countryId = (bc as any).country_id || null;
                                      const currencyCode = (bc as any).currency_code || null;
                                      const eurValue = convertToEUR(bc.total_margin, countryId, currencyCode, exchangeRates);
                                      return (
                                        <span className={cn("text-sm font-semibold", (eurValue || 0) < 0 && "text-destructive")}>
                                          {formatCurrency(eurValue)}
                                        </span>
                                      );
                                    })()}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  {bc.margin_percent !== null && bc.margin_percent !== undefined ? (
                                    <Badge
                                      variant={
                                        bc.margin_percent >= 40
                                          ? "default"
                                          : bc.margin_percent >= 20
                                            ? "secondary"
                                            : bc.margin_percent >= 0
                                              ? "outline"
                                              : "destructive"
                                      }
                                      className="text-xs"
                                    >
                                      {bc.margin_percent.toFixed(1)}%
                                    </Badge>
                                  ) : (
                                    <span className="text-sm text-muted-foreground">—</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
        {businessCases.some((bc) => bc.assumptions) && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Assumptions</h4>
            {businessCases
              .filter((bc) => bc.assumptions)
              .map((bc) => (
                <div key={bc.business_case_id} className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{bc.formulation_name || bc.business_case_name}:</strong> {bc.assumptions}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
