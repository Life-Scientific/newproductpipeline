"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import type { BusinessCaseGroupData } from "@/lib/db/queries";
import { BusinessCaseEditModal } from "./BusinessCaseEditModal";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";

interface BusinessCasesProjectionTableProps {
  businessCases: BusinessCaseGroupData[];
  exchangeRates: Map<string, number>; // country_id -> exchange_rate_to_eur
}

export function BusinessCasesProjectionTable({ businessCases, exchangeRates }: BusinessCasesProjectionTableProps) {
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  // Helper function to get effective start fiscal year from stored value
  // Use effective_start_fiscal_year from database (preserves creation context)
  const getEffectiveStartFiscalYear = (effectiveStartFiscalYear: string | null): number => {
    if (!effectiveStartFiscalYear) {
      return CURRENT_FISCAL_YEAR;
    }
    
    const match = effectiveStartFiscalYear.match(/FY(\d{2})/);
    if (!match) {
      return CURRENT_FISCAL_YEAR;
    }
    
    return parseInt(match[1], 10);
  };

  // Calculate dynamic fiscal year columns
  const fiscalYearColumns = useMemo(() => {
    const currentFY = CURRENT_FISCAL_YEAR;
    const minFY = currentFY;

    // Find the maximum effective start year across all business cases
    // Use stored effective_start_fiscal_year (preserves creation context)
    const maxEffectiveStartYear = businessCases.reduce((max, bc) => {
      const effectiveStartYear = getEffectiveStartFiscalYear(bc.effective_start_fiscal_year);
      return Math.max(max, effectiveStartYear);
    }, currentFY);

    // Calculate max fiscal year needed (latest effective start + 10 years for projection)
    const maxFY = Math.max(maxEffectiveStartYear + 10, currentFY + 10);

    // Generate fiscal year columns
    const columns: Array<{ key: string; label: string; fiscalYear: number }> = [];
    for (let fy = minFY; fy <= maxFY; fy++) {
      columns.push({
        key: `FY${fy}`,
        label: `FY${fy}`,
        fiscalYear: fy,
      });
    }

    return columns;
  }, [businessCases]);

  // Helper function to parse fiscal year (e.g., "FY26" -> 26)
  const parseFiscalYear = (fy: string | null): number | null => {
    if (!fy) return null;
    const match = fy.match(/FY(\d{2})/);
    return match ? parseInt(match[1], 10) : null;
  };

  // Helper function to format numbers
  const formatNumber = (value: number | null | undefined, decimals = 0): string => {
    if (value === null || value === undefined) return "—";
    return value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  // Helper function to convert to EUR and format
  const convertToEUR = (value: number | null | undefined, countryId: string, currencyCode: string): number | null => {
    if (value === null || value === undefined) return null;
    
    // If already in EUR, no conversion needed
    if (currencyCode?.toUpperCase() === "EUR") {
      return value;
    }
    
    // Look up exchange rate for this country
    const rate = exchangeRates.get(countryId);
    if (rate && rate > 0) {
      // exchange_rate_to_eur is the multiplier: local_currency / rate = EUR
      // Example: if rate = 1.10 (USD to EUR), then $110 / 1.10 = €100
      return value / rate;
    }
    
    // If no rate found, assume it's already EUR (might be missing exchange rate data)
    // In production, you might want to log a warning here
    return value;
  };

  // Helper function to format currency in EUR
  const formatCurrencyEUR = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "—";
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    }
    return `€${formatNumber(value, 0)}`;
  };

  // Helper function to format percentage
  const formatPercent = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "—";
    return `${value.toFixed(1)}%`;
  };

  if (businessCases.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No business cases found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background z-10 min-w-[150px]">Formulation</TableHead>
              <TableHead className="sticky left-[150px] bg-background z-10 min-w-[120px]">Country</TableHead>
              <TableHead className="sticky left-[270px] bg-background z-10 min-w-[150px]">Use Group</TableHead>
              <TableHead className="sticky left-[420px] bg-background z-10 min-w-[120px]">Target Market Year</TableHead>
              <TableHead className="min-w-[220px]">Metric</TableHead>
              {fiscalYearColumns.map((col) => (
                <TableHead key={col.key} className="min-w-[100px] text-center">
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="min-w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessCases.map((bc) => {
              const targetYear = parseFiscalYear(bc.target_market_entry);
              const uom = bc.uom || "L";

              // Create 6 rows per business case group (one for each metric)
              // All currency values are converted to EUR
              const metricRows = [
                {
                  label: `Volume (${uom})`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatNumber(bc.years_data[fyStr]?.volume);
                  },
                },
                {
                  label: `NSP (EUR/unit)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    const localValue = bc.years_data[fyStr]?.nsp;
                    const eurValue = convertToEUR(localValue, bc.country_id, bc.currency_code);
                    return formatCurrencyEUR(eurValue);
                  },
                },
                {
                  label: `COGS (EUR/unit)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    const localValue = bc.years_data[fyStr]?.cogs_per_unit;
                    const eurValue = convertToEUR(localValue, bc.country_id, bc.currency_code);
                    return formatCurrencyEUR(eurValue);
                  },
                },
                {
                  label: `Total Revenue (EUR)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    const localValue = bc.years_data[fyStr]?.total_revenue;
                    const eurValue = convertToEUR(localValue, bc.country_id, bc.currency_code);
                    return formatCurrencyEUR(eurValue);
                  },
                },
                {
                  label: `Total Gross Margin (EUR)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    const localValue = bc.years_data[fyStr]?.total_margin;
                    const eurValue = convertToEUR(localValue, bc.country_id, bc.currency_code);
                    return formatCurrencyEUR(eurValue);
                  },
                },
                {
                  label: "Margin %",
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatPercent(bc.years_data[fyStr]?.margin_percent);
                  },
                },
              ];

              return metricRows.map((metric, metricIndex) => {
                // Use stored effective_start_fiscal_year (preserves creation context)
                const effectiveStartYear = getEffectiveStartFiscalYear(bc.effective_start_fiscal_year);
                
                return (
                  <TableRow key={`${bc.business_case_group_id}-${metricIndex}`}>
                    {metricIndex === 0 ? (
                      <>
                        <TableCell className="sticky left-0 bg-background z-10 font-medium" rowSpan={6}>
                          {bc.formulation_name || bc.formulation_code || "—"}
                        </TableCell>
                        <TableCell className="sticky left-[150px] bg-background z-10" rowSpan={6}>
                          {bc.country_name || "—"}
                        </TableCell>
                        <TableCell className="sticky left-[270px] bg-background z-10" rowSpan={6}>
                          {bc.use_group_name || bc.use_group_variant || "—"}
                        </TableCell>
                        <TableCell className="sticky left-[420px] bg-background z-10" rowSpan={6}>
                          {bc.target_market_entry || "—"}
                        </TableCell>
                      </>
                    ) : null}
                    <TableCell className="font-medium min-w-[220px]">{metric.label}</TableCell>
                    {fiscalYearColumns.map((col) => {
                      // Gray out cells before effective start year (not target_market_entry)
                      const isBeforeEffectiveStart = col.fiscalYear < effectiveStartYear;
                      return (
                        <TableCell
                          key={col.key}
                          className={`text-center ${isBeforeEffectiveStart ? "bg-muted/50 text-muted-foreground" : ""}`}
                        >
                          {isBeforeEffectiveStart ? "—" : metric.getValue(col.fiscalYear)}
                        </TableCell>
                      );
                    })}
                    {metricIndex === 0 ? (
                      <TableCell rowSpan={6} className="align-middle">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingGroupId(bc.business_case_group_id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      </div>

      {editingGroupId && (
        <BusinessCaseEditModal
          groupId={editingGroupId}
          open={!!editingGroupId}
          onOpenChange={(open) => {
            if (!open) setEditingGroupId(null);
          }}
        />
      )}
    </>
  );
}

