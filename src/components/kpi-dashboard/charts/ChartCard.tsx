"use client";

import { useState, useMemo, type ReactNode } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Button } from "@/components/ui/button";
import { Expand, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  /** Content to show in expanded modal - can include drill-down data */
  expandedContent?: ReactNode;
  /** Optional trend indicator */
  trend?: {
    value: number;
    label?: string;
  };
  /** Optional accent color for the card glow */
  accentColor?: "blue" | "green" | "amber" | "purple" | "rose" | "cyan";
  /** Grid column span */
  colSpan?: 1 | 2 | 3;
  className?: string;
}

const accentStyles = {
  blue: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]",
    border: "hover:border-blue-500/40 dark:hover:border-blue-400/40",
    icon: "text-blue-500",
    bg: "from-blue-500/8 to-transparent dark:from-blue-500/12",
    accentLine: "via-blue-500/60",
  },
  green: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)] dark:hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)]",
    border: "hover:border-green-500/40 dark:hover:border-green-400/40",
    icon: "text-green-500",
    bg: "from-green-500/8 to-transparent dark:from-green-500/12",
    accentLine: "via-green-500/60",
  },
  amber: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)] dark:hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]",
    border: "hover:border-amber-500/40 dark:hover:border-amber-400/40",
    icon: "text-amber-500",
    bg: "from-amber-500/8 to-transparent dark:from-amber-500/12",
    accentLine: "via-amber-500/60",
  },
  purple: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] dark:hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]",
    border: "hover:border-purple-500/40 dark:hover:border-purple-400/40",
    icon: "text-purple-500",
    bg: "from-purple-500/8 to-transparent dark:from-purple-500/12",
    accentLine: "via-purple-500/60",
  },
  rose: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)] dark:hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.4)]",
    border: "hover:border-rose-500/40 dark:hover:border-rose-400/40",
    icon: "text-rose-500",
    bg: "from-rose-500/8 to-transparent dark:from-rose-500/12",
    accentLine: "via-rose-500/60",
  },
  cyan: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] dark:hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]",
    border: "hover:border-cyan-500/40 dark:hover:border-cyan-400/40",
    icon: "text-cyan-500",
    bg: "from-cyan-500/8 to-transparent dark:from-cyan-500/12",
    accentLine: "via-cyan-500/60",
  },
};

const colSpanClasses = {
  1: "",
  2: "md:col-span-2",
  3: "xl:col-span-3",
};

export function ChartCard({
  title,
  description,
  children,
  expandedContent,
  trend,
  accentColor = "blue",
  colSpan = 1,
  className,
}: ChartCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const accent = accentStyles[accentColor];

  const TrendIcon = useMemo(() => {
    if (!trend) return Minus;
    return trend.value >= 0 ? TrendingUp : TrendingDown;
  }, [trend]);

  return (
    <>
      <div className={cn(colSpanClasses[colSpan], className)}>
        <div
          className={cn(
            "group relative rounded-xl border bg-card/50 backdrop-blur-sm overflow-hidden h-full flex flex-col",
            "transition-all duration-200",
            "hover:bg-card hover:shadow-md",
            accent.glow,
            accent.border,
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0",
              accent.bg,
            )}
          />

          <div className="relative flex items-start justify-between p-4 pb-3 z-10 flex-shrink-0">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {title}
                </h3>
                {trend && (
                  <div
                    className={cn(
                      "flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0",
                      trend.value >= 0
                        ? "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/20"
                        : "bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20",
                    )}
                  >
                    <TrendIcon className="h-2.5 w-2.5" />
                    <span className="tabular-nums">
                      {trend.value >= 0 ? "+" : ""}
                      {trend.value.toFixed(1)}%
                    </span>
                  </div>
                )}
              </div>
              {description && (
                <p className="text-[11px] text-muted-foreground mt-1.5 line-clamp-1">
                  {description}
                </p>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 shrink-0 rounded-md transition-all",
                "bg-muted/40 hover:bg-muted/80",
                "border border-border/50 hover:border-border",
                "opacity-70 group-hover:opacity-100",
              )}
              onClick={() => setIsExpanded(true)}
            >
              <Expand className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="relative px-4 pb-4 z-10 flex-1 flex flex-col min-h-0">
            {children}
          </div>

          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10",
              `bg-gradient-to-r from-transparent ${accent.accentLine} to-transparent`,
            )}
          />
        </div>
      </div>

      {/* Expanded Modal with Drill-Down */}
      <BaseModal
        open={isExpanded}
        onOpenChange={setIsExpanded}
        title={title}
        description={description}
        maxWidth="max-w-5xl"
        showCancel={false}
        showSave={false}
      >
        <div className="space-y-6">
          {expandedContent || children}
        </div>
      </BaseModal>
    </>
  );
}
