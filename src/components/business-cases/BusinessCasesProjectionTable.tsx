"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import type { BusinessCaseGroupData } from "@/lib/db/queries";
import { BusinessCaseEditModal } from "./BusinessCaseEditModal";

interface BusinessCasesProjectionTableProps {
  businessCases: BusinessCaseGroupData[];
}

export function BusinessCasesProjectionTable({ businessCases }: BusinessCasesProjectionTableProps) {
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

  // Helper function to get effective start fiscal year
  // If target_market_entry is in the past, start from current fiscal year
  const getEffectiveStartFiscalYear = (targetMarketEntry: string | null): number => {
    const CURRENT_FISCAL_YEAR = 26; // FY26 - update this as time progresses
    
    if (!targetMarketEntry) {
      return CURRENT_FISCAL_YEAR;
    }
    
    const match = targetMarketEntry.match(/FY(\d{2})/);
    if (!match) {
      return CURRENT_FISCAL_YEAR;
    }
    
    const targetYear = parseInt(match[1], 10);
    return targetYear < CURRENT_FISCAL_YEAR ? CURRENT_FISCAL_YEAR : targetYear;
  };

  // Calculate dynamic fiscal year columns
  const fiscalYearColumns = useMemo(() => {
    const currentFY = 26; // FY26 - update this as time progresses
    const minFY = currentFY;

    // Find the maximum effective start year across all business cases
    // This accounts for cases where target_market_entry is in the past
    const maxEffectiveStartYear = businessCases.reduce((max, bc) => {
      const effectiveStartYear = getEffectiveStartFiscalYear(bc.target_market_entry);
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

  // Helper function to format currency
  const formatCurrency = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "—";
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${formatNumber(value, 0)}`;
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
              <TableHead className="sticky left-[420px] bg-background z-10 min-w-[120px]">Target</TableHead>
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
              const currency = bc.currency_code || "USD";

              // Create 6 rows per business case group (one for each metric)
              const metricRows = [
                {
                  label: `Volume (${uom})`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatNumber(bc.years_data[fyStr]?.volume);
                  },
                },
                {
                  label: `NSP (${currency}/unit)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatCurrency(bc.years_data[fyStr]?.nsp);
                  },
                },
                {
                  label: `COGS (${currency}/unit)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatCurrency(bc.years_data[fyStr]?.cogs_per_unit);
                  },
                },
                {
                  label: `Total Revenue (${currency})`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatCurrency(bc.years_data[fyStr]?.total_revenue);
                  },
                },
                {
                  label: `Total Gross Margin (${currency})`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatCurrency(bc.years_data[fyStr]?.total_margin);
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
                // Calculate effective start year (current year if target is in the past)
                const effectiveStartYear = getEffectiveStartFiscalYear(bc.target_market_entry);
                
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
                    <TableCell className="font-medium">{metric.label}</TableCell>
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

