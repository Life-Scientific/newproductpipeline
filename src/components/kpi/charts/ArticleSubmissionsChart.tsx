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
import { ARTICLE_34_DATA, ARTICLE_33_DATA } from "@/lib/kpi-dummy-data";
import { tooltipStyle } from "./ChartTooltip";

interface ArticleSubmissionsChartProps {
  articleType: "34" | "33";
}

export function ArticleSubmissionsChart({ articleType }: ArticleSubmissionsChartProps) {
  const data = articleType === "34" ? ARTICLE_34_DATA : ARTICLE_33_DATA;
  const title = `Article ${articleType} Submissions`;

  // Calculate totals for summary
  const totalApproved = data.reduce((sum, d) => sum + d.approved, 0);
  const totalNotApproved = data.reduce((sum, d) => sum + d.notApproved, 0);
  const overallSuccessRate = Math.round(
    (totalApproved / (totalApproved + totalNotApproved)) * 100
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
            Success Rate: <strong className="text-green-600">{overallSuccessRate}%</strong>
          </span>
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fontWeight: 500 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 10, fontWeight: 500 }}
              className="text-muted-foreground"
              allowDecimals={false}
            />
            <Tooltip
              {...tooltipStyle}
              formatter={(value: number, name: string) => [
                value.toString(),
                name === "approved" ? "Approved" : "Not Approved",
              ]}
            />
            <Legend
              wrapperStyle={{ 
                fontSize: "10px", 
                fontWeight: 600,
              }}
              formatter={(value) =>
                value === "approved" ? "Approved" : "Not Approved"
              }
            />
            <Bar
              dataKey="approved"
              stackId="a"
              fill="#22c55e"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="notApproved"
              stackId="a"
              fill="#ef4444"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
