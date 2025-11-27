"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, ChevronDown, ChevronsDown, Calendar } from "lucide-react";
import type { BusinessCaseGroupData } from "@/lib/db/queries";
import { BusinessCaseEditModal } from "./BusinessCaseEditModal";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getBusinessCaseGroupAction } from "@/lib/actions/business-cases";

interface BusinessCasesProjectionTableProps {
  businessCases: BusinessCaseGroupData[];
  exchangeRates: Map<string, number>; // country_id -> exchange_rate_to_eur
  canEdit?: boolean; // Permission to edit business cases
}

const DEFAULT_PAGE_SIZE = 25;
const LOAD_MORE_INCREMENT = 25;

// Default year range is 10 years from current fiscal year
const DEFAULT_YEAR_RANGE = 10;

export function BusinessCasesProjectionTable({ businessCases, exchangeRates, canEdit = false }: BusinessCasesProjectionTableProps) {
  const router = useRouter();
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(DEFAULT_PAGE_SIZE);
  const [loadingGroupId, setLoadingGroupId] = useState<string | null>(null);
  
  // Year range selection state
  const [startYear, setStartYear] = useState<number>(CURRENT_FISCAL_YEAR);
  const [endYear, setEndYear] = useState<number>(CURRENT_FISCAL_YEAR + DEFAULT_YEAR_RANGE - 1);

  // Helper function to get effective start fiscal year from stored value
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

  // Calculate the available range of fiscal years from data
  const availableYearRange = useMemo(() => {
    const currentFY = CURRENT_FISCAL_YEAR;
    const minFY = currentFY;

    const maxEffectiveStartYear = businessCases.reduce((max, bc) => {
      const effectiveStartYear = getEffectiveStartFiscalYear(bc.effective_start_fiscal_year);
      return Math.max(max, effectiveStartYear);
    }, currentFY);

    const maxFY = Math.max(maxEffectiveStartYear + 10, currentFY + 10);

    return { minFY, maxFY };
  }, [businessCases]);

  // Calculate dynamic fiscal year columns based on selected range
  const fiscalYearColumns = useMemo(() => {
    const columns: Array<{ key: string; label: string; fiscalYear: number }> = [];
    for (let fy = startYear; fy <= endYear; fy++) {
      columns.push({
        key: `FY${fy}`,
        label: `FY${fy}`,
        fiscalYear: fy,
      });
    }

    return columns;
  }, [startYear, endYear]);

  // Generate year options for dropdowns
  const yearOptions = useMemo(() => {
    const options: number[] = [];
    for (let fy = availableYearRange.minFY; fy <= availableYearRange.maxFY; fy++) {
      options.push(fy);
    }
    return options;
  }, [availableYearRange]);

  // Paginated business cases
  const displayedBusinessCases = useMemo(() => {
    return businessCases.slice(0, displayCount);
  }, [businessCases, displayCount]);

  const hasMore = displayCount < businessCases.length;
  const remainingCount = businessCases.length - displayCount;

  // Helper function to parse fiscal year
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

  // Helper function to convert to EUR
  const convertToEUR = (value: number | null | undefined, countryId: string, currencyCode: string): number | null => {
    if (value === null || value === undefined) return null;
    
    if (currencyCode?.toUpperCase() === "EUR") {
      return value;
    }
    
    const rate = exchangeRates.get(countryId);
    if (rate && rate > 0) {
      return value / rate;
    }
    
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

  // Load more handler
  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_MORE_INCREMENT, businessCases.length));
  };

  // Load all handler
  const handleLoadAll = () => {
    setDisplayCount(businessCases.length);
  };

  // Handle row click to navigate to business case detail
  const handleRowClick = async (groupId: string, e: React.MouseEvent) => {
    // Don't navigate if clicking on edit button or other interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }

    setLoadingGroupId(groupId);
    try {
      const result = await getBusinessCaseGroupAction(groupId);
      if (result.data && result.data.length > 0) {
        // Navigate to the first business case in the group (year 1)
        const firstBusinessCase = result.data[0];
        if (firstBusinessCase.business_case_id) {
          router.push(`/business-cases/${firstBusinessCase.business_case_id}`);
        }
      }
    } catch (error) {
      console.error('Error fetching business case group:', error);
    } finally {
      setLoadingGroupId(null);
    }
  };

  if (businessCases.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No business cases found.</p>
        <p className="text-xs mt-1">Create projections for formulations registered in specific markets.</p>
      </div>
    );
  }

  // Handle year range changes
  const handleStartYearChange = (value: string) => {
    const newStartYear = parseInt(value, 10);
    setStartYear(newStartYear);
    // Ensure end year is not before start year
    if (endYear < newStartYear) {
      setEndYear(newStartYear);
    }
  };

  const handleEndYearChange = (value: string) => {
    const newEndYear = parseInt(value, 10);
    setEndYear(newEndYear);
    // Ensure start year is not after end year
    if (startYear > newEndYear) {
      setStartYear(newEndYear);
    }
  };

  return (
    <>
      {/* Year Range Selector */}
      <div className="flex flex-wrap items-center gap-4 mb-4 p-3 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Year Range</span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="start-year" className="text-sm text-muted-foreground">From</Label>
          <Select value={startYear.toString()} onValueChange={handleStartYearChange}>
            <SelectTrigger id="start-year" className="w-24 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.filter(y => y <= endYear).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  FY{year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="end-year" className="text-sm text-muted-foreground">To</Label>
          <Select value={endYear.toString()} onValueChange={handleEndYearChange}>
            <SelectTrigger id="end-year" className="w-24 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.filter(y => y >= startYear).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  FY{year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-xs text-muted-foreground">
          ({endYear - startYear + 1} years)
        </span>
      </div>

      {/* Summary bar */}
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>
          Showing {displayedBusinessCases.length.toLocaleString()} of {businessCases.length.toLocaleString()} business cases
        </span>
        {hasMore && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadMore}
              className="h-8 text-xs"
            >
              <ChevronDown className="h-3 w-3 mr-1" />
              Load {Math.min(LOAD_MORE_INCREMENT, remainingCount)} More
            </Button>
            {remainingCount > LOAD_MORE_INCREMENT && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoadAll}
                className="h-8 text-xs"
              >
                <ChevronsDown className="h-3 w-3 mr-1" />
                Load All ({remainingCount.toLocaleString()})
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-scroll overflow-y-auto max-h-[calc(100vh-400px)] [&>div]:overflow-visible">
          <Table className="w-max">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="sticky left-0 top-0 bg-muted z-30 min-w-[150px]">Formulation</TableHead>
              <TableHead className="sticky left-[150px] top-0 bg-muted z-30 min-w-[120px]">Country</TableHead>
              <TableHead className="sticky left-[270px] top-0 bg-muted z-30 min-w-[150px]">Use Group</TableHead>
              <TableHead className="sticky left-[420px] top-0 bg-muted z-30 min-w-[100px]">Eff. FY Start</TableHead>
              <TableHead className="sticky left-[520px] top-0 bg-muted z-30 min-w-[120px]">Metric</TableHead>
              {fiscalYearColumns.map((col) => (
                <TableHead key={col.key} className="sticky top-0 bg-muted z-10 min-w-[90px] text-center text-xs">
                  {col.label}
                </TableHead>
              ))}
              {canEdit && <TableHead className="sticky top-0 bg-muted z-10 min-w-[80px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedBusinessCases.map((bc, bcIndex) => {
              const targetYear = parseFiscalYear(bc.target_market_entry);
              const uom = bc.uom || "L";
              const isNewFormulation = bcIndex === 0 || displayedBusinessCases[bcIndex - 1].formulation_id !== bc.formulation_id;
              const rowGroupClass = isNewFormulation ? "border-t-2 border-border" : "";

              const metricRows = [
                {
                  label: `Volume (${uom})`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    return formatNumber(bc.years_data[fyStr]?.volume);
                  },
                },
                {
                  label: `NSP (€/unit)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    const localValue = bc.years_data[fyStr]?.nsp;
                    const eurValue = convertToEUR(localValue, bc.country_id, bc.currency_code);
                    return formatCurrencyEUR(eurValue);
                  },
                },
                {
                  label: `COGS (€/unit)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    const localValue = bc.years_data[fyStr]?.cogs_per_unit;
                    const eurValue = convertToEUR(localValue, bc.country_id, bc.currency_code);
                    return formatCurrencyEUR(eurValue);
                  },
                },
                {
                  label: `Revenue (€)`,
                  getValue: (fy: number) => {
                    const fyStr = `FY${fy.toString().padStart(2, "0")}`;
                    const localValue = bc.years_data[fyStr]?.total_revenue;
                    const eurValue = convertToEUR(localValue, bc.country_id, bc.currency_code);
                    return formatCurrencyEUR(eurValue);
                  },
                },
                {
                  label: `Margin (€)`,
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
                const effectiveStartYear = getEffectiveStartFiscalYear(bc.effective_start_fiscal_year);
                
                const isLoading = loadingGroupId === bc.business_case_group_id;
                
                return (
                  <TableRow 
                    key={`${bc.business_case_group_id}-${metricIndex}`} 
                    className={cn(
                      metricIndex === 0 ? rowGroupClass : "",
                      "hover:bg-muted/30 transition-colors",
                      metricIndex === 0 && "cursor-pointer",
                      isLoading && "opacity-50"
                    )}
                    onClick={metricIndex === 0 ? (e) => handleRowClick(bc.business_case_group_id, e) : undefined}
                  >
                    {metricIndex === 0 ? (
                      <>
                        <TableCell className="sticky left-0 bg-background z-20 font-medium text-sm" rowSpan={6}>
                          <div className="max-w-[140px] truncate" title={bc.formulation_name || bc.formulation_code || ""}>
                            {bc.formulation_name || bc.formulation_code || "—"}
                          </div>
                          {bc.formulation_code && bc.formulation_name && (
                            <div className="text-xs text-muted-foreground">{bc.formulation_code}</div>
                          )}
                        </TableCell>
                        <TableCell className="sticky left-[150px] bg-background z-20 text-sm" rowSpan={6}>
                          {bc.country_name || "—"}
                        </TableCell>
                        <TableCell className="sticky left-[270px] bg-background z-20 text-sm" rowSpan={6}>
                          <div className="flex items-center gap-1.5">
                            <div className="max-w-[130px] truncate" title={bc.use_group_name || bc.use_group_variant || ""}>
                              {bc.use_group_name || bc.use_group_variant || "—"}
                            </div>
                            {bc.use_group_status && (
                              <span 
                                className={cn(
                                  "h-2 w-2 rounded-full flex-shrink-0",
                                  bc.use_group_status === "Active" ? "bg-green-500" : "bg-amber-500"
                                )}
                                title={bc.use_group_status}
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="sticky left-[420px] bg-background z-20 text-sm" rowSpan={6}>
                          {bc.effective_start_fiscal_year || "—"}
                        </TableCell>
                      </>
                    ) : null}
                    <TableCell className="sticky left-[520px] bg-background z-20 font-medium text-sm">{metric.label}</TableCell>
                    {fiscalYearColumns.map((col) => {
                      const isBeforeEffectiveStart = col.fiscalYear < effectiveStartYear;
                      return (
                        <TableCell
                          key={col.key}
                          className={cn(
                            "text-center text-sm tabular-nums",
                            isBeforeEffectiveStart && "bg-muted/50 text-muted-foreground"
                          )}
                        >
                          {isBeforeEffectiveStart ? "—" : metric.getValue(col.fiscalYear)}
                        </TableCell>
                      );
                    })}
                    {canEdit && metricIndex === 0 ? (
                      <TableCell rowSpan={6} className="align-middle">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingGroupId(bc.business_case_group_id)}
                          className="h-8"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
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
      </div>

      {/* Bottom load more */}
      {hasMore && (
        <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="gap-2"
          >
            <ChevronDown className="h-4 w-4" />
            Load {Math.min(LOAD_MORE_INCREMENT, remainingCount)} More
          </Button>
          {remainingCount > LOAD_MORE_INCREMENT && (
            <Button
              variant="ghost"
              onClick={handleLoadAll}
              className="gap-2"
            >
              <ChevronsDown className="h-4 w-4" />
              Load All Remaining ({remainingCount.toLocaleString()})
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {remainingCount.toLocaleString()} more to load
          </span>
        </div>
      )}

      {canEdit && editingGroupId && (
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
