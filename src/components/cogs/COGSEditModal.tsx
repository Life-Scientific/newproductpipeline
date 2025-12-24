"use client";

import { useState, useEffect, useTransition } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  updateCOGSGroupAction,
  createCOGSGroupAction,
  getCOGSGroupAction,
} from "@/lib/actions/cogs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";

interface COGSYearData {
  cogs_id?: string;
  cogs_group_id: string;
  fiscal_year: string;
  cogs_value: number | null;
  raw_material_cost: number | null;
  manufacturing_cost: number | null;
  packaging_cost: number | null;
  other_costs: number | null;
  formulation_code?: string;
  country_name?: string;
}

interface COGSValueSnapshot {
  total: number | null;
  raw: number | null;
  mfg: number | null;
  pkg: number | null;
  other: number | null;
}

interface COGSEditModalProps {
  groupId?: string; // If provided, edit mode; otherwise create mode
  formulationId?: string;
  formulationName?: string;
  formulationCountryId?: string | null;
  countryName?: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function COGSEditModal({
  groupId,
  formulationId,
  formulationName,
  formulationCountryId,
  countryName,
  open,
  onOpenChange,
  onSuccess,
}: COGSEditModalProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [yearData, setYearData] = useState<COGSYearData[]>([]);
  const [originalValues, setOriginalValues] = useState<Record<string, COGSValueSnapshot>>({});
  const [changedCells, setChangedCells] = useState<Set<string>>(new Set());
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [loading, setLoading] = useState(false);

  const isEditMode = !!groupId;

  // Generate fiscal years for columns (FY26-FY30 currently)
  const fiscalYearColumns = Array.from({ length: 5 }, (_, i) => {
    const yearNum = CURRENT_FISCAL_YEAR + i;
    return `FY${String(yearNum).padStart(2, "0")}`;
  });

  // Load COGS data when in edit mode
  useEffect(() => {
    if (open && isEditMode && groupId) {
      setLoading(true);
      getCOGSGroupAction(groupId)
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
            setYearData(result.data as COGSYearData[]);
            // Store original values for change tracking
            const originals: Record<string, COGSValueSnapshot> = {};
            result.data.forEach((year: COGSYearData) => {
              originals[year.fiscal_year] = {
                total: year.cogs_value,
                raw: year.raw_material_cost,
                mfg: year.manufacturing_cost,
                pkg: year.packaging_cost,
                other: year.other_costs,
              };
            });
            setOriginalValues(originals);
            setChangedCells(new Set());
          }
        })
        .catch((error: unknown) => {
          toast({
            title: "Error",
            description: `Failed to load COGS: ${error instanceof Error ? error.message : "Unknown error"}`,
            variant: "destructive",
          });
          onOpenChange(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (open && !isEditMode) {
      // Create mode: Initialize empty data
      const emptyData: COGSYearData[] = fiscalYearColumns.map((fy) => ({
        cogs_group_id: "",
        fiscal_year: fy,
        cogs_value: null,
        raw_material_cost: null,
        manufacturing_cost: null,
        packaging_cost: null,
        other_costs: null,
      }));
      setYearData(emptyData);
      setOriginalValues({});
      setChangedCells(new Set());
      setValidationErrors({});
    }
  }, [open, isEditMode, groupId, toast, onOpenChange]);

  // Handle cell value change
  const handleCellChange = (
    fiscalYear: string,
    field: "total" | "raw" | "mfg" | "pkg" | "other",
    value: string,
  ) => {
    const numValue = value === "" ? null : parseFloat(value);

    setYearData((prev) =>
      prev.map((year) => {
        if (year.fiscal_year !== fiscalYear) return year;

        const updated = { ...year };
        if (field === "total") {
          updated.cogs_value = numValue;
        } else if (field === "raw") {
          updated.raw_material_cost = numValue;
        } else if (field === "mfg") {
          updated.manufacturing_cost = numValue;
        } else if (field === "pkg") {
          updated.packaging_cost = numValue;
        } else if (field === "other") {
          updated.other_costs = numValue;
        }

        return updated;
      }),
    );

    // Update change tracking
    const cellKey = `${fiscalYear}_${field}`;
    const original = originalValues[fiscalYear]?.[field];

    if (numValue !== original) {
      setChangedCells((prev) => new Set(prev).add(cellKey));
    } else {
      setChangedCells((prev) => {
        const next = new Set(prev);
        next.delete(cellKey);
        return next;
      });
    }

    // Clear validation error for this year
    setValidationErrors((prev) => {
      const next = { ...prev };
      delete next[fiscalYear];
      return next;
    });
  };

  // Real-time validation and auto-calculation
  // Only validate after user has made changes to avoid blocking on load
  useEffect(() => {
    // Skip validation if no cells have been changed (initial load)
    if (changedCells.size === 0) {
      return;
    }

    const errors: Record<string, string> = {};

    yearData.forEach((year) => {
      const {
        fiscal_year,
        cogs_value,
        raw_material_cost,
        manufacturing_cost,
        packaging_cost,
        other_costs,
      } = year;

      const hasAnyBreakdown =
        raw_material_cost !== null ||
        manufacturing_cost !== null ||
        packaging_cost !== null ||
        other_costs !== null;

      if (hasAnyBreakdown) {
        // If ANY breakdown field provided, ALL must be provided
        if (
          raw_material_cost === null ||
          manufacturing_cost === null ||
          packaging_cost === null ||
          other_costs === null
        ) {
          errors[fiscal_year] =
            "All breakdown fields required when any breakdown is entered";
        } else {
          // Check if they sum to total
          const sum =
            raw_material_cost +
            manufacturing_cost +
            packaging_cost +
            other_costs;
          if (cogs_value !== null && Math.abs(sum - cogs_value) > 0.01) {
            errors[fiscal_year] =
              `Breakdown (${sum.toFixed(2)}) must equal Total COGS (${cogs_value.toFixed(2)})`;
          }
        }
      }
    });

    setValidationErrors(errors);
  }, [yearData, changedCells]);

  // Auto-calculate total from breakdown
  const autoCalculateTotal = (fiscalYear: string) => {
    const year = yearData.find((y) => y.fiscal_year === fiscalYear);
    if (!year) return;

    const {
      raw_material_cost,
      manufacturing_cost,
      packaging_cost,
      other_costs,
    } = year;

    if (
      raw_material_cost !== null &&
      manufacturing_cost !== null &&
      packaging_cost !== null &&
      other_costs !== null
    ) {
      const total =
        raw_material_cost + manufacturing_cost + packaging_cost + other_costs;
      handleCellChange(fiscalYear, "total", total.toFixed(2));
    }
  };

  // Handle save
  const handleSave = () => {
    // Validate all 5 years have Total COGS
    const missingData: string[] = [];
    yearData.forEach((year) => {
      if (!year.cogs_value || year.cogs_value <= 0) {
        missingData.push(
          `${year.fiscal_year}: Total COGS is required and must be greater than 0`,
        );
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

    // Check for validation errors
    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Validation Error",
        description: Object.values(validationErrors).join("\n"),
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();

      if (!isEditMode) {
        // Create mode: add formulation info
        if (!formulationId) {
          toast({
            title: "Error",
            description: "Formulation ID is required",
            variant: "destructive",
          });
          return;
        }
        formData.append("formulation_id", formulationId);
        if (formulationCountryId) {
          formData.append("formulation_country_id", formulationCountryId);
        }
      }

      // Add year data (year_1_total, year_1_raw, etc.)
      yearData.forEach((year, index) => {
        const yearNum = index + 1;
        formData.append(`year_${yearNum}_total`, String(year.cogs_value || 0));
        if (year.raw_material_cost !== null) {
          formData.append(
            `year_${yearNum}_raw`,
            String(year.raw_material_cost),
          );
        }
        if (year.manufacturing_cost !== null) {
          formData.append(
            `year_${yearNum}_mfg`,
            String(year.manufacturing_cost),
          );
        }
        if (year.packaging_cost !== null) {
          formData.append(`year_${yearNum}_pkg`, String(year.packaging_cost));
        }
        if (year.other_costs !== null) {
          formData.append(`year_${yearNum}_other`, String(year.other_costs));
        }
      });

      const result = isEditMode && groupId
        ? await updateCOGSGroupAction(groupId, formData)
        : await createCOGSGroupAction(formData);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        const successMsg = isEditMode
          ? `COGS updated successfully (${changedCells.size} cells modified)`
          : "COGS created successfully";

        if (
          isEditMode &&
          result.data &&
          "business_cases_updated" in result.data &&
          result.data.business_cases_updated
        ) {
          toast({
            title: "Success",
            description: `${successMsg}. ${result.data.business_cases_updated} business case group(s) updated.`,
          });
        } else {
          toast({
            title: "Success",
            description: successMsg,
          });
        }

        onOpenChange(false);
        if (onSuccess) onSuccess();
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
      title={`${isEditMode ? "Edit COGS" : "Create COGS"} - ${formulationName || ""}`}
      description={
        <div className="flex flex-col gap-1">
          <span>
            {countryName || "Global"} | Fiscal Years: {fiscalYearColumns[0]}-
            {fiscalYearColumns[4]} | Currency: EUR
          </span>
          {changedCells.size > 0 && (
            <div className="text-xs text-blue-600 dark:text-blue-400">
              ℹ️ {changedCells.size} cells changed from original values
            </div>
          )}
          {Object.keys(validationErrors).length > 0 && (
            <div className="text-xs text-red-600 dark:text-red-400">
              ⚠️ {Object.values(validationErrors)[0]}
            </div>
          )}
        </div>
      }
      onSave={handleSave}
      isSaving={isPending}
      saveDisabled={Object.keys(validationErrors).length > 0}
      maxWidth="max-w-[90vw]"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Cost Component</TableHead>
              {fiscalYearColumns.map((fy) => (
                <TableHead key={fy} className="min-w-[140px] text-center">
                  {fy}
                  {validationErrors[fy] && (
                    <span className="text-red-500 ml-1">⚠️</span>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Raw Materials row */}
            <TableRow>
              <TableCell className="font-medium">
                Raw Materials (EUR/unit)
              </TableCell>
              {fiscalYearColumns.map((fy) => {
                const year = yearData.find((y) => y.fiscal_year === fy);
                const cellKey = `${fy}_raw`;
                const isChanged = changedCells.has(cellKey);

                return (
                  <TableCell key={fy} className="p-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={year?.raw_material_cost ?? ""}
                      onChange={(e) =>
                        handleCellChange(fy, "raw", e.target.value)
                      }
                      onBlur={() => autoCalculateTotal(fy)}
                      className={`h-9 ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                      placeholder="Optional"
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Manufacturing row */}
            <TableRow>
              <TableCell className="font-medium">
                Manufacturing (EUR/unit)
              </TableCell>
              {fiscalYearColumns.map((fy) => {
                const year = yearData.find((y) => y.fiscal_year === fy);
                const cellKey = `${fy}_mfg`;
                const isChanged = changedCells.has(cellKey);

                return (
                  <TableCell key={fy} className="p-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={year?.manufacturing_cost ?? ""}
                      onChange={(e) =>
                        handleCellChange(fy, "mfg", e.target.value)
                      }
                      onBlur={() => autoCalculateTotal(fy)}
                      className={`h-9 ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                      placeholder="Optional"
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Packaging row */}
            <TableRow>
              <TableCell className="font-medium">
                Packaging (EUR/unit)
              </TableCell>
              {fiscalYearColumns.map((fy) => {
                const year = yearData.find((y) => y.fiscal_year === fy);
                const cellKey = `${fy}_pkg`;
                const isChanged = changedCells.has(cellKey);

                return (
                  <TableCell key={fy} className="p-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={year?.packaging_cost ?? ""}
                      onChange={(e) =>
                        handleCellChange(fy, "pkg", e.target.value)
                      }
                      onBlur={() => autoCalculateTotal(fy)}
                      className={`h-9 ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                      placeholder="Optional"
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Other Costs row */}
            <TableRow>
              <TableCell className="font-medium">
                Other Costs (EUR/unit)
              </TableCell>
              {fiscalYearColumns.map((fy) => {
                const year = yearData.find((y) => y.fiscal_year === fy);
                const cellKey = `${fy}_other`;
                const isChanged = changedCells.has(cellKey);

                return (
                  <TableCell key={fy} className="p-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={year?.other_costs ?? ""}
                      onChange={(e) =>
                        handleCellChange(fy, "other", e.target.value)
                      }
                      onBlur={() => autoCalculateTotal(fy)}
                      className={`h-9 ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""}`}
                      placeholder="Optional"
                    />
                  </TableCell>
                );
              })}
            </TableRow>

            {/* Total COGS row (required) */}
            <TableRow className="bg-muted/50">
              <TableCell className="font-bold">
                Total COGS (EUR/unit) *
              </TableCell>
              {fiscalYearColumns.map((fy) => {
                const year = yearData.find((y) => y.fiscal_year === fy);
                const cellKey = `${fy}_total`;
                const isChanged = changedCells.has(cellKey);

                return (
                  <TableCell key={fy} className="p-1">
                    <Input
                      type="number"
                      step="0.01"
                      value={year?.cogs_value ?? ""}
                      onChange={(e) =>
                        handleCellChange(fy, "total", e.target.value)
                      }
                      className={`h-9 font-bold ${isChanged ? "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700" : ""} ${validationErrors[fy] ? "border-red-500" : ""}`}
                      placeholder="Required"
                      required
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        * Total COGS is required for all years. Breakdown fields are optional,
        but if any are entered, all must be entered and sum to Total COGS.
      </div>
    </BaseModal>
  );
}
