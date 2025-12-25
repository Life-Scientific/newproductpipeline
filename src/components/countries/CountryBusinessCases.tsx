"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormattedCurrency } from "@/components/ui/formatted-currency";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import type { EnrichedBusinessCase } from "@/lib/db/types";
import { cn } from "@/lib/utils";

type BusinessCase = EnrichedBusinessCase;

interface CountryBusinessCasesProps {
  businessCases: BusinessCase[];
  countryName: string;
}

/**
 * Parse effective_start_fiscal_year string (e.g., "FY26") to numeric year (e.g., 26)
 */
function parseEffectiveStartFY(effectiveStartFY: string | null): number | null {
  if (!effectiveStartFY) return null;
  const match = effectiveStartFY.match(/FY(\d{2})/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

/**
 * Check if a business case matches the selected fiscal year
 * Formula: effective_start_fiscal_year + year_offset - 1 = selected_FY
 */
function matchesFiscalYear(bc: BusinessCase, selectedFY: number): boolean {
  const effectiveStart = parseEffectiveStartFY(bc.effective_start_fiscal_year);
  if (effectiveStart === null || bc.year_offset === null) return false;
  return effectiveStart + bc.year_offset - 1 === selectedFY;
}

export function CountryBusinessCases({
  businessCases,
  countryName,
}: CountryBusinessCasesProps) {
  const searchParams = useSearchParams();
  const {
    formatCurrencyCompact,
    formatPerUnit,
    getDisplayUnit,
    isWetProduct,
    isDryProduct,
    convertVolume,
    convertWeight,
    volumeUnit,
    weightUnit,
    preferences,
  } = useDisplayPreferences();

  // Get selected FY from URL params, default to FY30
  const selectedFY = parseInt(searchParams.get("fy") || "30", 10);

  // Filter business cases by selected FY
  const filteredBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => matchesFiscalYear(bc, selectedFY));
  }, [businessCases, selectedFY]);

  // Calculate totals for filtered business cases
  const totals = useMemo(() => {
    const totalRevenue = filteredBusinessCases.reduce(
      (sum, bc) => sum + (bc.total_revenue || 0),
      0,
    );
    const totalMargin = filteredBusinessCases.reduce(
      (sum, bc) => sum + (bc.total_margin || 0),
      0,
    );
    const avgMarginPercent =
      filteredBusinessCases.length > 0
        ? filteredBusinessCases.reduce(
            (sum, bc) => sum + (bc.margin_percent || 0),
            0,
          ) / filteredBusinessCases.length
        : 0;
    return { totalRevenue, totalMargin, avgMarginPercent };
  }, [filteredBusinessCases]);

  const columns = useMemo<ColumnDef<BusinessCase>[]>(
    () => [
      {
        accessorKey: "formulation_code",
        header: "Formulation",
        cell: ({ row }) => {
          const code = row.getValue("formulation_code") as string | null;
          const formId = row.original.formulation_id;
          const name = row.original.formulation_name;
          return (
            <div>
              {formId ? (
                <Link
                  href={`/portfolio/formulations/${formId}`}
                  className="font-medium text-primary hover:underline"
                >
                  {code || "—"}
                </Link>
              ) : (
                <span className="text-sm font-medium">{code || "—"}</span>
              )}
              {name && (
                <p className="text-xs text-muted-foreground mt-0.5">{name}</p>
              )}
            </div>
          );
        },
      },
      // Use group column removed - business cases can now link to multiple use groups via junction table
      // TODO: Implement junction table-based display if needed
      {
        accessorKey: "fiscal_year",
        header: "FY",
        cell: ({ row }) => {
          const fy = row.getValue("fiscal_year") as string | null;
          return <span className="text-sm">{fy || "—"}</span>;
        },
      },
      {
        accessorKey: "year_offset",
        header: "Year",
        cell: ({ row }) => {
          const offset = row.getValue("year_offset") as number | null;
          return <span className="text-sm">Y{offset ?? "—"}</span>;
        },
      },
      {
        accessorKey: "volume",
        header: "Volume",
        cell: ({ row }) => {
          const volume = row.getValue("volume") as number | null;
          const uom = "units";
          if (!volume)
            return <span className="text-sm text-muted-foreground">—</span>;

          // Convert based on product type
          const productIsWet = isWetProduct(uom);
          const productIsDry = isDryProduct(uom);
          const converted = productIsWet
            ? convertVolume(volume)
            : productIsDry
              ? convertWeight(volume)
              : volume;
          const displayUnit = getDisplayUnit(uom);

          return (
            <span className="text-sm">
              {converted.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              {displayUnit}
            </span>
          );
        },
      },
      {
        accessorKey: "nsp",
        header: "NSP",
        cell: ({ row }) => {
          const nsp = row.getValue("nsp") as number | null;
          const uom = "units";
          if (!nsp)
            return <span className="text-sm text-muted-foreground">—</span>;
          const displayUnit = getDisplayUnit(uom);
          return (
            <span className="text-sm">
              {formatPerUnit(nsp, uom, { decimals: 2 })}/{displayUnit}
            </span>
          );
        },
      },
      {
        accessorKey: "cogs_per_unit",
        header: "COGS",
        cell: ({ row }) => {
          const cogs = row.original.cogs_per_unit as number | null;
          const uom = "units";
          if (!cogs)
            return <span className="text-sm text-muted-foreground">—</span>;
          const displayUnit = getDisplayUnit(uom);
          return (
            <span className="text-sm">
              {formatPerUnit(cogs, uom, { decimals: 2 })}/{displayUnit}
            </span>
          );
        },
      },
      {
        accessorKey: "total_revenue",
        header: "Revenue",
        cell: ({ row }) => {
          const revenue = row.getValue("total_revenue") as number | null;
          return (
            <span className="text-sm font-medium">
              <FormattedCurrency value={revenue} compact />
            </span>
          );
        },
      },
      {
        accessorKey: "total_cogs",
        header: "Total COGS",
        cell: ({ row }) => {
          const cogs = row.original.total_cogs as number | null;
          return (
            <span className="text-sm">
              <FormattedCurrency value={cogs} compact />
            </span>
          );
        },
      },
      {
        accessorKey: "total_margin",
        header: "Margin",
        cell: ({ row }) => {
          const margin = row.getValue("total_margin") as number | null;
          return (
            <span
              className={cn(
                "text-sm font-medium",
                margin && margin < 0 && "text-destructive",
              )}
            >
              <FormattedCurrency value={margin} compact />
            </span>
          );
        },
      },
      {
        accessorKey: "margin_percent",
        header: "Margin %",
        cell: ({ row }) => {
          const percent = row.getValue("margin_percent") as number | null;
          if (percent === null || percent === undefined) {
            return <span className="text-sm text-muted-foreground">—</span>;
          }
          return (
            <Badge
              variant={
                percent >= 40
                  ? "success"
                  : percent >= 20
                    ? "info"
                    : percent >= 0
                      ? "warning"
                      : "destructive"
              }
              className="text-xs"
            >
              {percent.toFixed(1)}%
            </Badge>
          );
        },
      },
    ],
    [
      formatPerUnit,
      getDisplayUnit,
      isWetProduct,
      isDryProduct,
      convertVolume,
      convertWeight,
      preferences.currency,
      preferences.volumeUnit,
      preferences.weightUnit,
    ],
  );

  return (
    <Card>
      <CardHeader className="space-y-1.5">
        <CardTitle>
          Business Cases in {countryName} (FY{selectedFY})
        </CardTitle>
        <CardDescription>
          {filteredBusinessCases.length} business case
          {filteredBusinessCases.length !== 1 ? "s" : ""} • Revenue:{" "}
          {formatCurrencyCompact(totals.totalRevenue)} • Margin:{" "}
          {formatCurrencyCompact(totals.totalMargin)} (
          {totals.avgMarginPercent.toFixed(1)}% avg)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnhancedDataTable
          key={`${preferences.currency}-${preferences.volumeUnit}-${preferences.weightUnit}`}
          columns={columns}
          data={filteredBusinessCases}
          searchKey="formulation_code"
          searchPlaceholder="Search by formulation..."
          pageSize={10}
          showPageSizeSelector={true}
          tableId="country-business-cases"
        />
      </CardContent>
    </Card>
  );
}
