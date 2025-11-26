"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface CountryBusinessCasesProps {
  businessCases: BusinessCase[];
  countryName: string;
}

function formatCurrency(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(2)}`;
}

export function CountryBusinessCases({ businessCases, countryName }: CountryBusinessCasesProps) {
  // Calculate totals
  const totals = useMemo(() => {
    const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
    const totalMargin = businessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
    const avgMarginPercent = businessCases.length > 0
      ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / businessCases.length
      : 0;
    return { totalRevenue, totalMargin, avgMarginPercent };
  }, [businessCases]);

  const columns = useMemo<ColumnDef<BusinessCase>[]>(() => [
    {
      accessorKey: "formulation_code",
      header: "Formulation",
      cell: ({ row }) => {
        const code = row.getValue("formulation_code") as string | null;
        const formId = row.original.formulation_id;
        return formId ? (
          <Link
            href={`/formulations/${formId}`}
            className="font-medium text-primary hover:underline"
          >
            {code || "—"}
          </Link>
        ) : (
          <span className="text-sm">{code || "—"}</span>
        );
      },
    },
    {
      accessorKey: "use_group_name",
      header: "Use Group",
      cell: ({ row }) => {
        const name = row.getValue("use_group_name") as string | null;
        const variant = row.original.use_group_variant;
        return (
          <div>
            <span className="text-sm">{name || "—"}</span>
            {variant && (
              <span className="text-xs text-muted-foreground ml-1">({variant})</span>
            )}
          </div>
        );
      },
    },
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
        const uom = row.original.uom;
        if (!volume) return <span className="text-sm text-muted-foreground">—</span>;
        return (
          <span className="text-sm">
            {volume.toLocaleString()} {uom || ""}
          </span>
        );
      },
    },
    {
      accessorKey: "nsp",
      header: "NSP",
      cell: ({ row }) => {
        const nsp = row.getValue("nsp") as number | null;
        if (!nsp) return <span className="text-sm text-muted-foreground">—</span>;
        return <span className="text-sm">{formatCurrency(nsp)}</span>;
      },
    },
    {
      accessorKey: "total_revenue",
      header: "Revenue",
      cell: ({ row }) => {
        const revenue = row.getValue("total_revenue") as number | null;
        return (
          <span className="text-sm font-medium">
            {formatCurrency(revenue)}
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
          <span className={cn(
            "text-sm font-medium",
            margin && margin < 0 && "text-destructive"
          )}>
            {formatCurrency(margin)}
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
              percent >= 40 ? "success" :
              percent >= 20 ? "info" :
              percent >= 0 ? "warning" : "destructive"
            }
            className="text-xs"
          >
            {percent.toFixed(1)}%
          </Badge>
        );
      },
    },
  ], []);

  return (
    <Card>
      <CardHeader className="space-y-1.5">
        <CardTitle>Business Cases in {countryName}</CardTitle>
        <CardDescription>
          {businessCases.length} business case{businessCases.length !== 1 ? "s" : ""} • 
          Total Revenue: {formatCurrency(totals.totalRevenue)} • 
          Total Margin: {formatCurrency(totals.totalMargin)} ({totals.avgMarginPercent.toFixed(1)}% avg)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnhancedDataTable
          columns={columns}
          data={businessCases}
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


