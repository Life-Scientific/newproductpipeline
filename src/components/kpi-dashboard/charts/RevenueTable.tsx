"use client";

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
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Territory</TableHead>
            <TableHead className="text-right">% of Revenue</TableHead>
            <TableHead className="text-right">vs Last Period</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {REVENUE_BY_TERRITORY.map((row) => (
            <TableRow key={row.territory}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: TERRITORY_COLORS[row.territory] }}
                  />
                  {row.territory}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${row.percentage * 2}px`,
                      backgroundColor: TERRITORY_COLORS[row.territory],
                      opacity: 0.7,
                    }}
                  />
                  <Badge variant="secondary" className="font-mono min-w-[50px]">
                    {row.percentage}%
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={`inline-flex items-center gap-1 text-sm ${getTrendColor(row.trend)}`}
                >
                  {getTrendIcon(row.trend)}
                  {row.trend}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
