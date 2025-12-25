"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import type { BusinessCaseYearData } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import { formatCurrencyInput, formatVolumeInput } from "@/lib/utils/currency";

interface FiscalYearColumn {
  yearOffset: number;
  fiscalYear: string;
}

interface BusinessCaseYearEditorProps {
  fiscalYearColumns: FiscalYearColumn[];
  yearDataRecord: Record<number, { volume: string; nsp: string; cogs: string }>;
  yearDataArray: BusinessCaseYearData[];
  isEditMode: boolean;
  displayUnit: string;
  currencySymbol: string;
  rawInputs: Record<number, { volume?: string; nsp?: string; cogs?: string }>;
  focusedInputs: Set<string>;
  onChanged: (
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
    value: string,
  ) => void;
  onRawInputChange: (
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
    value: string,
  ) => void;
  onFocus: (
    inputKey: string,
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
    currentValue: number,
  ) => void;
  onBlur: (
    inputKey: string,
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
    currentValue: number,
  ) => void;
  onCellChange?: (
    yearOffset: number,
    field: "volume" | "nsp" | "cogs_per_unit",
    value: string,
  ) => void;
  convertQuantityForDisplay: (value: number) => number;
  convertQuantityToBase: (value: number) => number;
  convertPerUnitForDisplay: (value: number) => number;
  convertPerUnitToBase: (value: number) => number;
  shadowData: Record<
    number,
    { volume: number | null; nsp: number | null; cogs: number | null }
  >;
  changedCells: Set<string>;
  calculateMetrics: (yearOffset: number) => {
    revenue: number;
    margin: number;
    marginPercent: number;
  };
}

export function BusinessCaseYearEditor({
  fiscalYearColumns,
  yearDataRecord,
  yearDataArray,
  isEditMode,
  displayUnit,
  currencySymbol,
  rawInputs,
  focusedInputs,
  onChanged,
  onRawInputChange,
  onFocus,
  onBlur,
  onCellChange,
  convertQuantityForDisplay,
  convertQuantityToBase,
  convertPerUnitForDisplay,
  convertPerUnitToBase,
  shadowData,
  changedCells,
  calculateMetrics,
}: BusinessCaseYearEditorProps) {
  const getYearValue = (
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
  ): number => {
    if (isEditMode) {
      const year = yearDataArray.find((y) => y.year_offset === yearOffset);
      if (field === "cogs") {
        return parseFloat(String(year?.cogs_per_unit || 0)) || 0;
      }
      return parseFloat(String(year?.[field] || 0)) || 0;
    }
    return parseFloat(yearDataRecord[yearOffset]?.[field] || "0") || 0;
  };

  const renderInput = (
    yearOffset: number,
    field: "volume" | "nsp" | "cogs",
    inputKey: string,
    _rawValue: number,
    displayValue: number,
    placeholder?: string,
    isCurrency = false,
  ) => {
    const isFocused = focusedInputs.has(inputKey);
    const inputValue =
      isFocused && rawInputs[yearOffset]?.[field] !== undefined
        ? rawInputs[yearOffset]?.[field]!
        : isCurrency
          ? formatCurrencyInput(displayValue)
          : formatVolumeInput(displayValue);

    const cellKey =
      isEditMode && field === "cogs"
        ? `${yearOffset}_cogs_per_unit`
        : `${yearOffset}_${field}`;
    const isChanged = isEditMode ? changedCells.has(cellKey) : false;

    return (
      <Input
        type="text"
        inputMode={field === "volume" ? "numeric" : "decimal"}
        value={inputValue}
        placeholder={placeholder}
        onFocus={() => onFocus(inputKey, yearOffset, field, displayValue)}
        onChange={(e) => onRawInputChange(yearOffset, field, e.target.value)}
        onBlur={() => onBlur(inputKey, yearOffset, field, displayValue)}
        className={cn(
          "h-8 text-sm text-right tabular-nums",
          isCurrency && "pl-6",
          isChanged &&
            "bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-700",
        )}
      />
    );
  };

  return (
    <>
      <div className="hidden xl:block overflow-x-auto">
        <table className="w-full">
          <tbody>
            {Object.keys(shadowData).length > 0 && (
              <TableRow className="bg-muted/30">
                <TableCell className="text-xs text-muted-foreground italic sticky left-0 bg-muted/30 z-10 min-w-[180px]">
                  ↳ prev
                </TableCell>
                {fiscalYearColumns.map((col) => {
                  const shadowVolume = convertQuantityForDisplay(
                    shadowData[col.yearOffset]?.volume || 0,
                  );
                  return (
                    <TableCell
                      key={col.yearOffset}
                      className="p-1 text-right text-xs text-muted-foreground/70 italic tabular-nums min-w-[100px]"
                    >
                      {shadowVolume > 0
                        ? Math.round(shadowVolume).toLocaleString()
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            )}

            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10 min-w-[180px]">
                Volume ({displayUnit})
              </TableCell>
              {fiscalYearColumns.map((col) => {
                const rawValue = getYearValue(col.yearOffset, "volume");
                const displayValue = convertQuantityForDisplay(rawValue);
                const inputKey = `${col.yearOffset}-volume`;

                return (
                  <TableCell key={col.yearOffset} className="p-1 min-w-[100px]">
                    {renderInput(
                      col.yearOffset,
                      "volume",
                      inputKey,
                      rawValue,
                      displayValue,
                      "0",
                    )}
                  </TableCell>
                );
              })}
            </TableRow>

            {Object.keys(shadowData).length > 0 && (
              <TableRow className="bg-muted/30">
                <TableCell className="text-xs text-muted-foreground italic sticky left-0 bg-muted/30 z-10">
                  ↳ prev
                </TableCell>
                {fiscalYearColumns.map((col) => {
                  const shadowNsp = convertPerUnitForDisplay(
                    shadowData[col.yearOffset]?.nsp || 0,
                  );
                  return (
                    <TableCell
                      key={col.yearOffset}
                      className="p-1 text-right text-xs text-muted-foreground/70 italic tabular-nums"
                    >
                      {shadowNsp > 0
                        ? shadowNsp.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            )}

            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                NSP ({currencySymbol}/{displayUnit})
              </TableCell>
              {fiscalYearColumns.map((col) => {
                const rawValue = getYearValue(col.yearOffset, "nsp");
                const displayValue = convertPerUnitForDisplay(rawValue);
                const inputKey = `${col.yearOffset}-nsp`;

                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                        {currencySymbol}
                      </span>
                      {renderInput(
                        col.yearOffset,
                        "nsp",
                        inputKey,
                        rawValue,
                        displayValue,
                        "0",
                        true,
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>

            {Object.keys(shadowData).length > 0 && (
              <TableRow className="bg-muted/30">
                <TableCell className="text-xs text-muted-foreground italic sticky left-0 bg-muted/30 z-10">
                  ↳ prev
                </TableCell>
                {fiscalYearColumns.map((col) => {
                  const shadowCogs = convertPerUnitForDisplay(
                    shadowData[col.yearOffset]?.cogs || 0,
                  );
                  return (
                    <TableCell
                      key={col.yearOffset}
                      className="p-1 text-right text-xs text-muted-foreground/70 italic tabular-nums"
                    >
                      {shadowCogs > 0
                        ? shadowCogs.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            )}

            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div className="flex flex-col">
                  <span>
                    COGS ({currencySymbol}/{displayUnit})
                  </span>
                  {!isEditMode && (
                    <span className="text-xs text-muted-foreground font-normal">
                      Optional override
                    </span>
                  )}
                </div>
              </TableCell>
              {fiscalYearColumns.map((col) => {
                const rawValue = getYearValue(col.yearOffset, "cogs");
                const displayValue =
                  rawValue > 0 ? convertPerUnitForDisplay(rawValue) : 0;
                const inputKey = `${col.yearOffset}-cogs`;

                return (
                  <TableCell key={col.yearOffset} className="p-1">
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                        {currencySymbol}
                      </span>
                      {renderInput(
                        col.yearOffset,
                        "cogs",
                        inputKey,
                        rawValue,
                        displayValue,
                        isEditMode ? "0" : "Auto",
                        true,
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                Total Revenue ({currencySymbol})
              </TableCell>
              {fiscalYearColumns.map((col) => {
                const metrics = calculateMetrics(col.yearOffset);
                return (
                  <TableCell key={col.yearOffset} className="p-1 text-right">
                    <span className="text-sm tabular-nums">
                      {metrics.revenue > 0
                        ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                        : "-"}
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                Gross Margin ({currencySymbol})
              </TableCell>
              {fiscalYearColumns.map((col) => {
                const metrics = calculateMetrics(col.yearOffset);
                return (
                  <TableCell key={col.yearOffset} className="p-1 text-right">
                    <span className="text-sm tabular-nums">
                      {metrics.margin > 0
                        ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                        : "-"}
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                Margin %
              </TableCell>
              {fiscalYearColumns.map((col) => {
                const metrics = calculateMetrics(col.yearOffset);
                return (
                  <TableCell key={col.yearOffset} className="p-1 text-right">
                    <span className="text-sm tabular-nums">
                      {metrics.marginPercent > 0
                        ? `${metrics.marginPercent.toFixed(1)}%`
                        : "-"}
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>
          </tbody>
        </table>
      </div>

      <div className="block xl:hidden space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {fiscalYearColumns.map((col) => {
            const metrics = calculateMetrics(col.yearOffset);
            const _volumeChanged = changedCells.has(`${col.yearOffset}_volume`);
            const _nspChanged = changedCells.has(`${col.yearOffset}_nsp`);
            const _cogsChanged = changedCells.has(
              `${col.yearOffset}_cogs_per_unit`,
            );

            const displayVolume = convertQuantityForDisplay(
              getYearValue(col.yearOffset, "volume"),
            );
            const displayNsp = convertPerUnitForDisplay(
              getYearValue(col.yearOffset, "nsp"),
            );
            const rawCogs = getYearValue(col.yearOffset, "cogs");
            const displayCogs =
              rawCogs > 0 ? convertPerUnitForDisplay(rawCogs) : 0;

            return (
              <Card key={col.yearOffset} className="overflow-hidden">
                <div className="bg-muted/50 px-3 py-2 border-b">
                  <span className="font-semibold text-sm">
                    {col.fiscalYear}
                  </span>
                </div>
                <CardContent className="p-3 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Volume ({displayUnit})
                    </Label>
                    {renderInput(
                      col.yearOffset,
                      "volume",
                      `card-${col.yearOffset}-volume`,
                      getYearValue(col.yearOffset, "volume"),
                      displayVolume,
                      "0",
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      NSP ({currencySymbol}/{displayUnit})
                    </Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                        {currencySymbol}
                      </span>
                      {renderInput(
                        col.yearOffset,
                        "nsp",
                        `card-${col.yearOffset}-nsp`,
                        getYearValue(col.yearOffset, "nsp"),
                        displayNsp,
                        "0",
                        true,
                      )}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      COGS ({currencySymbol}/{displayUnit})
                    </Label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                        {currencySymbol}
                      </span>
                      {renderInput(
                        col.yearOffset,
                        "cogs",
                        `card-${col.yearOffset}-cogs`,
                        rawCogs,
                        displayCogs,
                        isEditMode ? "0" : "Auto",
                        true,
                      )}
                    </div>
                  </div>
                  <div className="pt-2 border-t space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-medium tabular-nums">
                        {metrics.revenue > 0
                          ? `${currencySymbol}${metrics.revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Margin</span>
                      <span className="font-medium tabular-nums">
                        {metrics.margin > 0
                          ? `${currencySymbol}${metrics.margin.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Margin %</span>
                      <span className="font-medium">
                        {metrics.marginPercent > 0
                          ? `${metrics.marginPercent.toFixed(1)}%`
                          : "-"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
