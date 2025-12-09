"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AnimatedNumber,
  AnimatedPercentage,
} from "@/components/ui/animated-number";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down" | "neutral";
  };
  href?: string;
  className?: string;
  /** Disable number animation (useful for non-numeric values) */
  disableAnimation?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  href,
  className,
  disableAnimation = false,
}: MetricCardProps) {
  // Determine if value is a number that can be animated
  const numericValue = typeof value === "number" ? value : null;
  const isPercentage = typeof value === "string" && value.endsWith("%");
  const percentageValue = isPercentage ? parseFloat(value) : null;

  const content = (
    <Card interactive={!!href} className={cn(className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold tabular-nums">
          {!disableAnimation && numericValue !== null ? (
            <AnimatedNumber value={numericValue} />
          ) : !disableAnimation && percentageValue !== null ? (
            <AnimatedPercentage value={percentageValue} decimals={1} />
          ) : (
            value
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <div
            className={cn(
              "text-xs flex items-center gap-1 font-medium",
              trend.direction === "up" && "text-green-600 dark:text-green-400",
              trend.direction === "down" && "text-red-600 dark:text-red-400",
              trend.direction === "neutral" && "text-muted-foreground",
            )}
          >
            <span className="text-base">
              {trend.direction === "up"
                ? "↑"
                : trend.direction === "down"
                  ? "↓"
                  : "→"}
            </span>
            <span>{trend.value}%</span>
            <span className="text-muted-foreground font-normal">
              {trend.label}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }

  return content;
}
