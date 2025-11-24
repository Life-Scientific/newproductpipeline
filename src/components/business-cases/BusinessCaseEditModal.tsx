"use client";

import { useState, useEffect, useTransition } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateBusinessCaseGroupAction, getBusinessCaseGroupAction } from "@/lib/actions/business-cases";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrencySymbol } from "@/lib/utils/currency";
import type { BusinessCaseYearData } from "@/lib/db/types";

// Re-export for backward compatibility
export type { BusinessCaseYearData };

interface BusinessCaseYearDataExtended extends BusinessCaseYearData {
  target_market_entry_fy: string | null; // Original target market entry from use group
  effective_start_fiscal_year: string | null; // Effective start fiscal year at creation time (preserves context)
}

interface BusinessCaseEditModalProps {
  groupId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BusinessCaseEditModal({
  groupId,
  open,
  onOpenChange,
}: BusinessCaseEditModalProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [yearData, setYearData] = useState<BusinessCaseYearDataExtended[]>([]);
  const [originalValues, setOriginalValues] = useState<Record<number, { volume: number | null; nsp: number | null }>>({});
  const [changedCells, setChangedCells] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Load business case data when modal opens
  useEffect(() => {
    if (open && groupId) {
      setLoading(true);
      getBusinessCaseGroupAction(groupId)
        .then((result) => {
          if (result.error) {
            toast({
              title: "Error",
              description: result.error,
              variant: "destructive",
            });
            onOpenChange(false);
            return;
          }
          if (result.data) {
            setYearData(result.data as BusinessCaseYearDataExtended[]);
            // Store original values for change tracking
            const originals: Record<number, { volume: number | null; nsp: number | null }> = {};
            result.data.forEach((year) => {
              originals[year.year_offset] = {
                volume: year.volume,
                nsp: year.nsp,
              };
            });
            setOriginalValues(originals);
            setChangedCells(new Set());
          }
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: `Failed to load business case: ${error.message}`,
            variant: "destructive",
          });
          onOpenChange(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, groupId, toast, onOpenChange]);

  // Calculate fiscal year columns using stored effective_start_fiscal_year
  // This preserves the fiscal year context when data was created
  const fiscalYearColumns = yearData.length > 0 && yearData[0].effective_start_fiscal_year
    ? (() => {
        const effectiveStartFiscalYear = yearData[0].effective_start_fiscal_year;
        const match = effectiveStartFiscalYear?.match(/FY(\d{2})/);
        if (!match) return [];
        const startYear = parseInt(match[1], 10);
        return Array.from({ length: 10 }, (_, i) => ({
          yearOffset: i + 1,
          fiscalYear: `FY${String(startYear + i).padStart(2, "0")}`,
        }));
      })()
    : [];

  // Get UOM and currency from first year data
  const uom = yearData[0]?.uom || "L";
  const currency = yearData[0]?.currency_code || "USD";
  const currencySymbol = getCurrencySymbol(currency);
  const formulationName = yearData[0]?.formulation_name || "";
  const countryName = yearData[0]?.country_name || "";
  const useGroupName = yearData[0]?.use_group_name || yearData[0]?.use_group_variant || "";
  // Use target_market_entry_fy from use group (original)
  const targetMarketEntry = yearData[0]?.target_market_entry_fy || "";
  // Use effective_start_fiscal_year (preserves creation context)
  const effectiveStartFiscalYear = yearData[0]?.effective_start_fiscal_year || "";

  // Handle cell value change
  const handleCellChange = (yearOffset: number, field: "volume" | "nsp", value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    
    setYearData((prev) =>
      prev.map((year) =>
        year.year_offset === yearOffset
          ? { ...year, [field]: numValue }
          : year
      )
    );

    // Update change tracking
    const cellKey = `${yearOffset}_${field}`;
    const original = originalValues[yearOffset]?.[field];
    
    if (numValue !== original) {
      setChangedCells((prev) => new Set(prev).add(cellKey));
    } else {
      setChangedCells((prev) => {
        const next = new Set(prev);
        next.delete(cellKey);
        return next;
      });
    }
  };

  // Real-time calculations
  const calculateMetrics = (year: BusinessCaseYearData) => {
    const volume = year.volume || 0;
    const nsp = year.nsp || 0;
    const cogs = year.cogs_per_unit || 0;

    const revenue = volume * nsp;
    const margin = revenue - volume * cogs;
    const marginPercent = revenue > 0 ? (margin / revenue) * 100 : 0;

    return {
      revenue,
      margin,
      marginPercent,
    };
  };

  // Handle save
  const handleSave = () => {
    // Validate all 10 years have data
    const missingData: string[] = [];
    yearData.forEach((year) => {
      if (!year.volume || year.volume <= 0) {
        missingData.push(`Year ${year.year_offset}: Volume is required`);
      }
      if (!year.nsp || year.nsp <= 0) {
        missingData.push(`Year ${year.year_offset}: NSP is required`);
      }
    });

    if (missingData.length > 0) {
      toast({
        title: "Validation Error",
        description: missingData.join("\n"),
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      
      // Add year data
      yearData.forEach((year) => {
        formData.append(`year_${year.year_offset}_volume`, String(year.volume || 0));
        formData.append(`year_${year.year_offset}_nsp`, String(year.nsp || 0));
      });

      const result = await updateBusinessCaseGroupAction(groupId, formData);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Business case updated successfully (${changedCells.size} cells modified)`,
        });
        onOpenChange(false);
      }
    });
  };

  if (loading) {
    return (
      <BaseModal open={open} onOpenChange={onOpenChange} title="Loading...">
        <div className="py-8 text-center">Loading...</div>
      </BaseModal>
    );
  }

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit Business Case - ${formulationName}`}
      description={
        <div className="flex flex-col gap-1">
          <span>{countryName} | {useGroupName} | Target Market Entry: {targetMarketEntry}</span>
          {effectiveStartFiscalYear && effectiveStartFiscalYear !== targetMarketEntry && (
            <span className="text-xs text-muted-foreground">Effective Start: {effectiveStartFiscalYear}</span>
          )}
          {changedCells.size > 0 && (
            <span className="text-xs text-blue-600 dark:text-blue-400">
              ℹ️ {changedCells.size} cells changed from original values
            </span>
          )}
        </div>
      }
      onSave={handleSave}
      isSaving={isPending}
      maxWidth="max-w-[90vw]"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Metric</TableHead>
              {fiscalYearColumns.map((col) => (
                <TableHead key={col.yearOffset} className="min-w-[120px] text-center">
                  {col.fiscalYear}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Volume row */}
            <TableRow>
              <TableCell className="font-medium">Volume ({uom})</TableCell>
              {fiscalYearColumns.map((col) => {
                const year = yearData.find((y) => y.year_offset === col.yearOffset);
                const cellKey = `${col.yearOffset}_volume`;
                const isChanged = changedCells.has(cellKey);
                
                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={year?.volume || ""}
                      onChange={(e) => handleCellChange(col.yearOffset, "volume", e.target.value)}
                      className={`h-9 ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* NSP row */}
            <TableRow>
              <TableCell className="font-medium">NSP ({currency}/unit)</TableCell>
              {fiscalYearColumns.map((col) => {
                const year = yearData.find((y) => y.year_offset === col.yearOffset);
                const cellKey = `${col.yearOffset}_nsp`;
                const isChanged = changedCells.has(cellKey);
                
                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={year?.nsp || ""}
                      onChange={(e) => handleCellChange(col.yearOffset, "nsp", e.target.value)}
                      className={`h-9 ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* COGS row (read-only) */}
            <TableRow>
              <TableCell className="font-medium">COGS ({currency}/unit)</TableCell>
              {fiscalYearColumns.map((col) => {
                const year = yearData.find((y) => y.year_offset === col.yearOffset);
                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <Input
                      type="number"
                      value={year?.cogs_per_unit || ""}
                      disabled
                      className="h-9 bg-muted cursor-not-allowed opacity-70"
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Revenue row (calculated, read-only) */}
            <TableRow>
              <TableCell className="font-medium">Total Revenue ({currency})</TableCell>
              {fiscalYearColumns.map((col) => {
                const year = yearData.find((y) => y.year_offset === col.yearOffset);
                const metrics = year ? calculateMetrics(year) : { revenue: null };
                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <Input
                      type="text"
                      value={metrics.revenue !== null ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                      disabled
                      className="h-9 bg-muted cursor-not-allowed opacity-70"
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Margin row (calculated, read-only) */}
            <TableRow>
              <TableCell className="font-medium">Total Gross Margin ({currency})</TableCell>
              {fiscalYearColumns.map((col) => {
                const year = yearData.find((y) => y.year_offset === col.yearOffset);
                const metrics = year ? calculateMetrics(year) : { margin: null };
                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <Input
                      type="text"
                      value={metrics.margin !== null ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                      disabled
                      className="h-9 bg-muted cursor-not-allowed opacity-70"
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Margin % row (calculated, read-only) */}
            <TableRow>
              <TableCell className="font-medium">Margin %</TableCell>
              {fiscalYearColumns.map((col) => {
                const year = yearData.find((y) => y.year_offset === col.yearOffset);
                const metrics = year ? calculateMetrics(year) : { marginPercent: null };
                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <Input
                      type="text"
                      value={metrics.marginPercent !== null ? `${metrics.marginPercent.toFixed(2)}%` : ""}
                      disabled
                      className="h-9 bg-muted cursor-not-allowed opacity-70"
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </BaseModal>
  );
}
