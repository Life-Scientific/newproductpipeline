"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TREND_COLORS } from "@/lib/kpi-dashboard/chart-constants";

interface TrendIndicatorProps {
  value: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function TrendIndicator({
  value,
  label,
  size = "md",
  showIcon = true,
  className,
}: TrendIndicatorProps) {
  const isPositive = value >= 0;
  const isNeutral = value === 0;

  const colors = isNeutral
    ? TREND_COLORS.neutral
    : isPositive
      ? TREND_COLORS.positive
      : TREND_COLORS.negative;

  const TrendIcon = isPositive ? TrendingUp : isNeutral ? Minus : TrendingDown;

  const sizeClasses = {
    sm: {
      container: "px-1.5 py-0.5 text-[10px] gap-0.5",
      icon: "h-2.5 w-2.5",
    },
    md: {
      container: "px-2 py-1 text-[10px] gap-1",
      icon: "h-3 w-3",
    },
    lg: {
      container: "px-2.5 py-1 text-xs gap-1",
      icon: "h-3.5 w-3.5",
    },
  };

  const sizeClass = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border backdrop-blur-sm shrink-0",
        sizeClass.container,
        colors.bg,
        colors.text,
        colors.border,
        className,
      )}
    >
      {showIcon && <TrendIcon className={cn(sizeClass.icon, colors.icon)} />}
      <span className="tabular-nums font-semibold">
        {isPositive ? "+" : ""}
        {value.toFixed(1)}%
      </span>
      {label && (
        <span className="text-muted-foreground font-normal ml-0.5">
          {label}
        </span>
      )}
    </div>
  );
}

