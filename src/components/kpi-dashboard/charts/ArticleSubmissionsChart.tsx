"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ARTICLE_34_DATA, ARTICLE_33_DATA } from "@/lib/kpi-dashboard/chart-data";
import {
  getAxisProps,
  getTooltipProps,
  chartTheme,
  chartColors,
} from "@/lib/utils/chart-theme";
import {
  CHART_MARGINS,
  CHART_HEIGHTS,
  CHART_TYPOGRAPHY,
} from "@/lib/kpi-dashboard/chart-constants";

interface ArticleSubmissionsChartProps {
  articleType: "34" | "33";
  height?: number;
}

export function ArticleSubmissionsChart({
  articleType,
  height = CHART_HEIGHTS.medium,
}: ArticleSubmissionsChartProps) {
  const data = articleType === "34" ? ARTICLE_34_DATA : ARTICLE_33_DATA;
  const title = `Article ${articleType} Submissions`;

  const { totalApproved, totalNotApproved, overallSuccessRate } = useMemo(() => {
    const approved = data.reduce((sum, d) => sum + d.approved, 0);
    const notApproved = data.reduce((sum, d) => sum + d.notApproved, 0);
    const total = approved + notApproved;
    const successRate = total > 0 ? Math.round((approved / total) * 100) : 0;
    return {
      totalApproved: approved,
      totalNotApproved: notApproved,
      overallSuccessRate: successRate,
    };
  }, [data]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className={CHART_TYPOGRAPHY.label}>{title}</span>
        <div className="flex gap-4">
          <span className={CHART_TYPOGRAPHY.description}>
            Total: <strong className="text-foreground">{totalApproved + totalNotApproved}</strong>
          </span>
          <span className={CHART_TYPOGRAPHY.description}>
            Success Rate:{" "}
            <strong className="text-green-600 dark:text-green-400">
              {overallSuccessRate}%
            </strong>
          </span>
        </div>
      </div>
      <div className="w-full" style={{ height, minHeight: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={CHART_MARGINS.standard}
          >
            <CartesianGrid {...chartTheme.grid} />
            <XAxis dataKey="month" {...getAxisProps()} />
            <YAxis {...getAxisProps()} allowDecimals={false} />
            <Tooltip
              {...getTooltipProps()}
              formatter={(value: number, name: string) => [
                value.toString(),
                name === "approved" ? "Approved" : "Not Approved",
              ]}
            />
            <Legend
              wrapperStyle={chartTheme.legend.wrapperStyle}
              formatter={(value) =>
                value === "approved" ? "Approved" : "Not Approved"
              }
            />
            <Bar
              dataKey="approved"
              stackId="a"
              fill={chartColors.success}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="notApproved"
              stackId="a"
              fill={chartColors.destructive}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
