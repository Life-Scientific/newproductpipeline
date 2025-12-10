"use client";

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

interface ArticleSubmissionsChartProps {
  articleType: "34" | "33";
  height?: number;
}

export function ArticleSubmissionsChart({
  articleType,
  height = 200,
}: ArticleSubmissionsChartProps) {
  const data = articleType === "34" ? ARTICLE_34_DATA : ARTICLE_33_DATA;
  const title = `Article ${articleType} Submissions`;

  // Calculate totals for summary
  const totalApproved = data.reduce((sum, d) => sum + d.approved, 0);
  const totalNotApproved = data.reduce((sum, d) => sum + d.notApproved, 0);
  const overallSuccessRate = Math.round(
    (totalApproved / (totalApproved + totalNotApproved)) * 100,
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">{title}</span>
        <div className="flex gap-4">
          <span>
            Total: <strong>{totalApproved + totalNotApproved}</strong>
          </span>
          <span>
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
            margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
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
