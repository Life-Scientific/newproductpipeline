"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { Package, FileText, DollarSign, TrendingUp } from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface CountrySummaryCardsProps {
  stats: {
    totalFormulations: number;
    approvedFormulations: number;
    totalUseGroups: number;
    totalBusinessCases: number;
  };
  businessCases: BusinessCase[];
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

export function CountrySummaryCards({ stats, businessCases }: CountrySummaryCardsProps) {
  const searchParams = useSearchParams();
  
  // Get selected FY from URL params, default to FY30
  const selectedFY = parseInt(searchParams.get("fy") || "30", 10);

  // Filter business cases by selected FY and calculate totals
  const fyFinancials = useMemo(() => {
    const filteredBCs = businessCases.filter((bc) => matchesFiscalYear(bc, selectedFY));
    const totalRevenue = filteredBCs.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
    const totalMargin = filteredBCs.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
    const avgMarginPercent = filteredBCs.length > 0
      ? filteredBCs.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) / filteredBCs.length
      : 0;
    return { totalRevenue, totalMargin, avgMarginPercent, count: filteredBCs.length };
  }, [businessCases, selectedFY]);

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            Formulations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-2xl font-bold">{stats.totalFormulations}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Use Groups
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-2xl font-bold">{stats.totalUseGroups}</div>
          <p className="text-xs text-muted-foreground">
            Across {stats.totalFormulations} formulations
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            FY{selectedFY} Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-2xl font-bold">{formatCurrencyCompact(fyFinancials.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            {fyFinancials.count} business cases
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            FY{selectedFY} Margin
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className={cn(
            "text-2xl font-bold",
            fyFinancials.totalMargin < 0 && "text-destructive"
          )}>
            {formatCurrencyCompact(fyFinancials.totalMargin)}
          </div>
          <p className="text-xs text-muted-foreground">
            {fyFinancials.avgMarginPercent.toFixed(1)}% avg margin
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

