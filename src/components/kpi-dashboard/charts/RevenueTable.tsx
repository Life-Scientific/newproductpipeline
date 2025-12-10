"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { REVENUE_BY_TERRITORY } from "@/lib/kpi-dashboard/chart-data";
import { chartColors } from "@/lib/utils/chart-theme";
import { cn } from "@/lib/utils";

const TERRITORY_COLORS: Record<string, string> = {
  "North America": chartColors.primary,
  France: chartColors.secondary,
  "UK & Ireland": chartColors.tertiary,
  Other: chartColors.quaternary,
};

export function RevenueTable() {
  const getTrendIcon = (trend: string) => {
    if (trend.startsWith("+")) {
      return <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />;
    }
    if (trend.startsWith("-")) {
      return <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />;
    }
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend.startsWith("+")) return "text-green-600 dark:text-green-400";
    if (trend.startsWith("-")) return "text-red-600 dark:text-red-400";
    return "text-muted-foreground";
  };

  return (
    <div className="rounded-lg border bg-muted/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="h-9 text-xs font-semibold">Territory</TableHead>
            <TableHead className="h-9 text-xs font-semibold text-right">% of Revenue</TableHead>
            <TableHead className="h-9 text-xs font-semibold text-right">vs Last Period</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {REVENUE_BY_TERRITORY.map((row, idx) => (
            <motion.tr
              key={row.territory}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group hover:bg-muted/40 transition-colors"
            >
              <TableCell className="py-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-background"
                    style={{ backgroundColor: TERRITORY_COLORS[row.territory] }}
                  />
                  <span className="text-sm font-medium">{row.territory}</span>
                </div>
              </TableCell>
              <TableCell className="py-2.5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div
                    className="h-1.5 rounded-full transition-all group-hover:h-2"
                    style={{
                      width: `${Math.min(row.percentage * 2, 100)}px`,
                      backgroundColor: TERRITORY_COLORS[row.territory],
                      opacity: 0.8,
                    }}
                  />
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs min-w-[48px] justify-end bg-muted/60"
                  >
                    {row.percentage}%
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="py-2.5 text-right">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium",
                    getTrendColor(row.trend),
                  )}
                >
                  {getTrendIcon(row.trend)}
                  {row.trend}
                </span>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
