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
  Cell,
  ReferenceLine,
} from "recharts";
import { cn } from "@/lib/utils";

export interface WaterfallDataPoint {
  name: string;
  value: number;
  isTotal?: boolean; // If true, it's a total column (starts from 0)
  fill?: string;
}

interface WaterfallChartProps {
  data: WaterfallDataPoint[];
  title?: string;
  height?: number;
  className?: string;
  currencySymbol?: string;
}

export function WaterfallChart({
  data,
  title,
  height = 400,
  className,
  currencySymbol = "$",
}: WaterfallChartProps) {
  
  // Process data to calculate start and end points for floating bars
  let currentTotal = 0;
  const processedData = data.map((item) => {
    const prevTotal = currentTotal;
    
    if (item.isTotal) {
      currentTotal = item.value; // Reset current total if it's a hard total
      return {
        ...item,
        uv: item.value, // The visible bar height
        pv: 0,          // The invisible placeholder height
        valueDisplay: item.value,
        isPositive: true, // Totals are usually positive in display
      };
    }

    currentTotal += item.value;
    
    // For positive values: bar starts at prevTotal, goes up to currentTotal
    // For negative values: bar starts at currentTotal, goes up to prevTotal
    
    const isPositive = item.value >= 0;
    const lower = Math.min(prevTotal, currentTotal);
    const upper = Math.max(prevTotal, currentTotal);
    const range = upper - lower;
    
    return {
      ...item,
      uv: range, // Visible height
      pv: lower, // Placeholder height (bottom offset)
      valueDisplay: item.value,
      isPositive,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[1]?.payload || payload[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-md shadow-md p-2 text-sm">
          <p className="font-semibold">{data.name}</p>
          <p className={cn(
            "font-medium",
            data.isTotal ? "text-foreground" : data.isPositive ? "text-success" : "text-destructive"
          )}>
            {data.isTotal ? "Total: " : "Change: "}
            {currencySymbol}{Math.abs(data.valueDisplay).toLocaleString()}
            {(!data.isTotal && !data.isPositive) && " (decrease)"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Cumulative: {currencySymbol}{(data.pv + (data.isPositive || data.isTotal ? data.uv : 0)).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn("w-full", className)}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: "var(--color-muted-foreground)" }}
            axisLine={{ stroke: "var(--color-border)" }}
          />
          <YAxis 
            tick={{ fill: "var(--color-muted-foreground)" }}
            axisLine={{ stroke: "var(--color-border)" }}
            tickFormatter={(val) => `${currencySymbol}${val}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-muted)', opacity: 0.1 }} />
          
          {/* Invisible placeholder bar */}
          <Bar dataKey="pv" stackId="a" fill="transparent" />
          
          {/* Visible value bar */}
          <Bar dataKey="uv" stackId="a" radius={[2, 2, 2, 2]}>
            {processedData.map((entry, index) => {
              let fill = "var(--color-primary)";
              if (entry.isTotal) fill = "var(--color-chart-5)"; // Total column color
              else if (entry.isPositive) fill = "var(--color-success)";
              else fill = "var(--color-destructive)";
              
              if (entry.fill) fill = entry.fill; // Override
              
              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
