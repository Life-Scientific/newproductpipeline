"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

export interface ScatterDataPoint {
  x: number;
  y: number;
  z?: number; // Bubble size
  name: string;
  category?: string;
  fill?: string;
  [key: string]: any;
}

interface ScatterPlotChartProps {
  data: ScatterDataPoint[];
  xAxisLabel: string;
  yAxisLabel: string;
  zAxisLabel?: string;
  xAxisDomain?: [number | string, number | string];
  yAxisDomain?: [number | string, number | string];
  height?: number;
  className?: string;
  onClick?: (point: ScatterDataPoint) => void;
  categories?: string[];
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

export function ScatterPlotChart({
  data,
  xAxisLabel,
  yAxisLabel,
  zAxisLabel,
  xAxisDomain = ["auto", "auto"],
  yAxisDomain = ["auto", "auto"],
  height = 400,
  className,
  onClick,
  categories = [],
}: ScatterPlotChartProps) {
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-md shadow-md p-2 text-sm">
          <p className="font-semibold">{data.name}</p>
          <p className="text-muted-foreground">
            {xAxisLabel}: {data.x}
          </p>
          <p className="text-muted-foreground">
            {yAxisLabel}: {data.y}
          </p>
          {zAxisLabel && data.z && (
            <p className="text-muted-foreground">
              {zAxisLabel}: {data.z}
            </p>
          )}
          {data.category && (
            <p className="text-xs mt-1 opacity-70">{data.category}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
          onClick={(state: any) => {
            if (state && state.activePayload && state.activePayload[0]) {
              onClick?.(state.activePayload[0].payload);
            }
          }}
          style={{ cursor: onClick ? "pointer" : "default" }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name={xAxisLabel} 
            domain={xAxisDomain}
            label={{ 
              value: xAxisLabel, 
              position: "insideBottom", 
              offset: -15, 
              fill: "var(--color-muted-foreground)",
              style: { fontSize: '12px' }
            }}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name={yAxisLabel} 
            domain={yAxisDomain}
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: "insideLeft", 
              offset: 10,
              fill: "var(--color-muted-foreground)",
              style: { fontSize: '12px', textAnchor: 'middle' }
            }}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <ZAxis type="number" dataKey="z" range={[50, 400]} name={zAxisLabel} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
          {categories.length > 0 && (
            <Legend 
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
              iconSize={10}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          )}
          
          {categories.length > 0 ? (
            categories.map((cat, index) => (
              <Scatter
                key={cat}
                name={cat}
                data={data.filter(d => d.category === cat)}
                fill={COLORS[index % COLORS.length]}
              />
            ))
          ) : (
            <Scatter name="Items" data={data} fill="var(--color-chart-1)">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
              ))}
            </Scatter>
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
