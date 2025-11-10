import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

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
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  href,
  className,
}: MetricCardProps) {
  const content = (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <div
            className={cn(
              "text-xs flex items-center gap-1",
              trend.direction === "up" && "text-green-600 dark:text-green-400",
              trend.direction === "down" && "text-red-600 dark:text-red-400",
              trend.direction === "neutral" && "text-muted-foreground"
            )}
          >
            <span>{trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}</span>
            <span>{trend.value}%</span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-80 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}

