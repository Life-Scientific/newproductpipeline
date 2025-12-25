"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import type { FormulationMetrics } from "./comparison-utils";
import { formatNumber } from "./comparison-utils";

interface ComparisonSummaryProps {
  formulationId: string;
  formulationCode: string | null;
  productName: string | null;
  metrics: FormulationMetrics;
  formatCurrency: (value: number) => string;
}

export const ComparisonSummary = memo(
  ({
    formulationId,
    formulationCode,
    productName,
    metrics,
    formatCurrency,
  }: ComparisonSummaryProps) => {
    return (
      <div className="space-y-3">
        <div>
          <div className="font-semibold text-sm">
            {formulationCode || productName}
          </div>
          {productName && productName !== formulationCode && (
            <div className="text-xs text-muted-foreground">{productName}</div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Total Revenue</div>
            <div className="font-semibold text-sm">
              {formatCurrency(metrics.totalRevenue)}
            </div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Total Margin</div>
            <div className="font-semibold text-sm">
              {formatCurrency(metrics.totalMargin)}
            </div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Avg Margin</div>
            <Badge
              variant={
                metrics.avgMarginPercent >= 50
                  ? "default"
                  : metrics.avgMarginPercent >= 30
                    ? "secondary"
                    : "outline"
              }
              className="mt-1"
            >
              {metrics.avgMarginPercent.toFixed(1)}%
            </Badge>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Approved Countries</div>
            <div className="font-semibold text-sm">
              <Badge
                variant={metrics.approvedCountries > 0 ? "default" : "outline"}
              >
                {metrics.approvedCountries}
              </Badge>
            </div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Active Ingredients</div>
            <div className="font-semibold text-sm">
              {metrics.activeIngredients.length}
            </div>
          </div>
          <div className="bg-muted/30 p-2 rounded">
            <div className="text-muted-foreground">Target Crops</div>
            <div className="font-semibold text-sm">
              {metrics.cropsList.length}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ComparisonSummary.displayName = "ComparisonSummary";
