"use client";

import type { TooltipProps } from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {
  formatter?: (value: number, name: string) => [string, string];
}

export function ChartTooltip({ active, payload, label, formatter }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      className="rounded-md px-2.5 py-1.5 text-xs font-medium"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        border: "none",
      }}
    >
      <p className="text-gray-300 mb-1 font-semibold">{label}</p>
      <div className="space-y-0.5">
        {payload.map((entry, index) => {
          const [formattedValue, formattedName] = formatter
            ? formatter(entry.value as number, entry.name as string)
            : [entry.value, entry.name];
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-400">{formattedName}:</span>
              <span className="text-white font-semibold">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Shared tooltip style for Recharts
export const tooltipStyle = {
  contentStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    border: "none",
    borderRadius: "6px",
    padding: "8px 10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: 1.3,
  },
  itemStyle: {
    color: "#fff",
    padding: "2px 0",
  },
  labelStyle: {
    color: "#9ca3af",
    fontWeight: 600,
    marginBottom: "4px",
  },
};

