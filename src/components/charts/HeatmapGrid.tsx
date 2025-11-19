"use client";

import React from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
  label?: string; // Display text inside cell
  context?: string; // Additional tooltip info
  meta?: any; // Any other data
}

interface HeatmapGridProps {
  data: HeatmapDataPoint[];
  xLabels: string[];
  yLabels: string[];
  title?: string;
  description?: string;
  valueFormatter?: (value: number) => string;
  colorScale?: (value: number) => string;
  height?: number | string;
  onClick?: (point: HeatmapDataPoint) => void;
  className?: string;
}

export function HeatmapGrid({
  data,
  xLabels,
  yLabels,
  title,
  description,
  valueFormatter = (v) => v.toFixed(1),
  colorScale,
  height = "auto",
  onClick,
  className,
}: HeatmapGridProps) {
  // Default color scale (green intensity) if none provided
  const defaultColorScale = (value: number) => {
    // Normalize value 0-100 for opacity
    const opacity = Math.max(0.1, Math.min(1, value / 100));
    return `rgba(16, 185, 129, ${opacity})`; // emerald-500
  };

  const getColor = colorScale || defaultColorScale;

  // Create a lookup map for data points
  const dataMap = new Map<string, HeatmapDataPoint>();
  data.forEach((point) => {
    dataMap.set(`${point.x}:${point.y}`, point);
  });

  return (
    <div className={cn("w-full overflow-auto", className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="relative min-w-[600px]">
        {/* Grid */}
        <div 
          className="grid gap-1"
          style={{
            gridTemplateColumns: `minmax(120px, auto) repeat(${xLabels.length}, minmax(80px, 1fr))`,
          }}
        >
          {/* Header Row */}
          <div className="sticky left-0 top-0 z-10 bg-background/95 p-2 font-medium text-sm text-muted-foreground">
            {/* Empty corner */}
          </div>
          {xLabels.map((xLabel) => (
            <div key={xLabel} className="p-2 text-center text-xs font-medium text-muted-foreground break-words">
              {xLabel}
            </div>
          ))}

          {/* Rows */}
          {yLabels.map((yLabel) => (
            <React.Fragment key={yLabel}>
              {/* Y-Axis Label */}
              <div className="sticky left-0 z-10 bg-background/95 p-2 text-xs font-medium flex items-center">
                {yLabel}
              </div>
              
              {/* Cells */}
              {xLabels.map((xLabel) => {
                const point = dataMap.get(`${xLabel}:${yLabel}`);
                const hasData = !!point;
                const backgroundColor = hasData ? getColor(point.value) : "transparent";
                
                return (
                  <TooltipProvider key={`${xLabel}-${yLabel}`}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            "h-12 rounded-sm flex items-center justify-center text-xs transition-all border border-transparent hover:border-primary/50",
                            hasData ? "cursor-pointer" : "bg-muted/10"
                          )}
                          style={{ backgroundColor }}
                          onClick={() => hasData && onClick?.(point)}
                        >
                          {hasData && (
                            <span className={cn(
                              "font-medium truncate px-1",
                              // Dynamic text color based on background brightness approximation could be better
                              // For now assuming darker backgrounds for higher values needs light text
                              point.value > 50 ? "text-white" : "text-foreground"
                            )}>
                              {point.label || valueFormatter(point.value)}
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>
                      {hasData && (
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-semibold">{yLabel} - {xLabel}</p>
                            <p>Value: {valueFormatter(point.value)}</p>
                            {point.context && <p className="text-xs text-muted-foreground">{point.context}</p>}
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
