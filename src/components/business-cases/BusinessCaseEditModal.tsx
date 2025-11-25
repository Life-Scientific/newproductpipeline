"use client";

import { useState, useEffect, useTransition } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { updateBusinessCaseGroupAction, getBusinessCaseGroupAction } from "@/lib/actions/business-cases";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrencySymbol } from "@/lib/utils/currency";
import type { BusinessCaseYearData } from "@/lib/db/types";
import { GitBranch, Edit3, History } from "lucide-react";
import { BusinessCaseVersionHistory } from "./BusinessCaseVersionHistory";

// Re-export for backward compatibility
export type { BusinessCaseYearData };

// The BusinessCaseYearData now includes target_market_entry_fy and effective_start_fiscal_year
type BusinessCaseYearDataExtended = BusinessCaseYearData;

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
  const [originalValues, setOriginalValues] = useState<Record<number, { volume: number | null; nsp: number | null; cogs: number | null }>>({});
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
            // Store original values for change tracking (including COGS)
            const originals: Record<number, { volume: number | null; nsp: number | null; cogs: number | null }> = {};
            result.data.forEach((year) => {
              originals[year.year_offset] = {
                volume: year.volume,
                nsp: year.nsp,
                cogs: year.cogs_per_unit,
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
  const handleCellChange = (yearOffset: number, field: "volume" | "nsp" | "cogs_per_unit", value: string) => {
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
    const originalField = field === "cogs_per_unit" ? "cogs" : field;
    const original = originalValues[yearOffset]?.[originalField as "volume" | "nsp" | "cogs"];
    
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
      
      // Add year data including COGS
      yearData.forEach((year) => {
        formData.append(`year_${year.year_offset}_volume`, String(year.volume || 0));
        formData.append(`year_${year.year_offset}_nsp`, String(year.nsp || 0));
        // Include COGS if present
        if (year.cogs_per_unit !== null && year.cogs_per_unit !== undefined) {
          formData.append(`year_${year.year_offset}_cogs`, String(year.cogs_per_unit));
        }
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
          title: "New Version Created",
          description: `Business case version saved successfully. Previous version archived.`,
        });
        onOpenChange(false);
        // Refresh the page to show new version
        window.location.reload();
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
      title={
        <div className="flex items-center gap-2">
          <span>Update Business Case - {formulationName}</span>
          <Badge variant="outline" className="text-xs font-normal gap-1">
            <GitBranch className="h-3 w-3" />
            Creates New Version
          </Badge>
        </div>
      }
      description={
        <div className="flex flex-col gap-1">
          <span>{countryName} | {useGroupName} | Target Market Entry: {targetMarketEntry}</span>
          {effectiveStartFiscalYear && effectiveStartFiscalYear !== targetMarketEntry && (
            <span className="text-xs text-muted-foreground">Effective Start: {effectiveStartFiscalYear}</span>
          )}
          <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
            <GitBranch className="h-3 w-3" />
            Saving will create a new version in the history. Previous versions are preserved.
          </span>
          {changedCells.size > 0 && (
            <span className="text-xs text-amber-600 dark:text-amber-400 mt-1">
              {changedCells.size} {changedCells.size === 1 ? "cell" : "cells"} modified from current version
            </span>
          )}
        </div>
      }
      onSave={handleSave}
      isSaving={isPending}
      saveText="Save New Version"
      maxWidth="max-w-[90vw]"
    >
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="edit" className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Data
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            Version History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          {/* Mobile/Tablet: Card-based vertical layout */}
          <div className="block xl:hidden space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {fiscalYearColumns.map((col) => {
                const year = yearData.find((y) => y.year_offset === col.yearOffset);
                const metrics = year ? calculateMetrics(year) : { revenue: 0, margin: 0, marginPercent: 0 };
                const volumeChanged = changedCells.has(`${col.yearOffset}_volume`);
                const nspChanged = changedCells.has(`${col.yearOffset}_nsp`);
                const cogsChanged = changedCells.has(`${col.yearOffset}_cogs_per_unit`);
                
                return (
                  <Card key={col.yearOffset} className="overflow-hidden">
                    <div className="bg-muted/50 px-3 py-2 border-b">
                      <span className="font-semibold text-sm">{col.fiscalYear}</span>
                    </div>
                    <CardContent className="p-3 space-y-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Volume ({uom})</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={year?.volume || ""}
                          onChange={(e) => handleCellChange(col.yearOffset, "volume", e.target.value)}
                          className={`h-8 text-sm ${volumeChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">NSP ({currency})</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={year?.nsp || ""}
                          onChange={(e) => handleCellChange(col.yearOffset, "nsp", e.target.value)}
                          className={`h-8 text-sm ${nspChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">COGS ({currency})</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={year?.cogs_per_unit || ""}
                          onChange={(e) => handleCellChange(col.yearOffset, "cogs_per_unit", e.target.value)}
                          className={`h-8 text-sm ${cogsChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                        />
                      </div>
                      <div className="pt-2 border-t space-y-1.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Revenue</span>
                          <span className="font-medium">
                            {metrics.revenue > 0 ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Margin</span>
                          <span className="font-medium">
                            {metrics.margin > 0 ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Margin %</span>
                          <span className="font-medium">
                            {metrics.marginPercent > 0 ? `${metrics.marginPercent.toFixed(1)}%` : "-"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Desktop: Traditional table layout with sticky first column */}
          <div className="hidden xl:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[180px] sticky left-0 bg-background z-10">Metric</TableHead>
                  {fiscalYearColumns.map((col) => (
                    <TableHead key={col.yearOffset} className="min-w-[100px] text-center">
                      {col.fiscalYear}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Volume row */}
                <TableRow>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">Volume ({uom})</TableCell>
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
                          className={`h-8 text-sm ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* NSP row */}
                <TableRow>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">NSP ({currency}/unit)</TableCell>
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
                          className={`h-8 text-sm ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* COGS row (editable) */}
                <TableRow>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">COGS ({currency}/unit)</TableCell>
                  {fiscalYearColumns.map((col) => {
                    const year = yearData.find((y) => y.year_offset === col.yearOffset);
                    const cellKey = `${col.yearOffset}_cogs_per_unit`;
                    const isChanged = changedCells.has(cellKey);
                    
                    return (
                      <TableCell key={col.yearOffset} className="p-1">
                        <Input
                          type="number"
                          step="0.01"
                          value={year?.cogs_per_unit || ""}
                          onChange={(e) => handleCellChange(col.yearOffset, "cogs_per_unit", e.target.value)}
                          className={`h-8 text-sm ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* Revenue row (calculated, read-only) */}
                <TableRow>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">Total Revenue ({currency})</TableCell>
                  {fiscalYearColumns.map((col) => {
                    const year = yearData.find((y) => y.year_offset === col.yearOffset);
                    const metrics = year ? calculateMetrics(year) : { revenue: 0 };
                    return (
                      <TableCell key={col.yearOffset} className="p-1 text-center">
                        <span className="text-sm">
                          {metrics.revenue > 0 ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* Margin row (calculated, read-only) */}
                <TableRow>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">Gross Margin ({currency})</TableCell>
                  {fiscalYearColumns.map((col) => {
                    const year = yearData.find((y) => y.year_offset === col.yearOffset);
                    const metrics = year ? calculateMetrics(year) : { margin: 0 };
                    return (
                      <TableCell key={col.yearOffset} className="p-1 text-center">
                        <span className="text-sm">
                          {metrics.margin > 0 ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "-"}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>

                {/* Margin % row (calculated, read-only) */}
                <TableRow>
                  <TableCell className="font-medium sticky left-0 bg-background z-10">Margin %</TableCell>
                  {fiscalYearColumns.map((col) => {
                    const year = yearData.find((y) => y.year_offset === col.yearOffset);
                    const metrics = year ? calculateMetrics(year) : { marginPercent: 0 };
                    return (
                      <TableCell key={col.yearOffset} className="p-1 text-center">
                        <span className="text-sm">
                          {metrics.marginPercent > 0 ? `${metrics.marginPercent.toFixed(1)}%` : "-"}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          {yearData[0]?.formulation_country_use_group_id ? (
            <BusinessCaseVersionHistory
              useGroupId={yearData[0].formulation_country_use_group_id}
              currentGroupId={groupId}
              formulationName={formulationName}
              countryName={countryName}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Version history is not available for this business case.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </BaseModal>
  );
}
