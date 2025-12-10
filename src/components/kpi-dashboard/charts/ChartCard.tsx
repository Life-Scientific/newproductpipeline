"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
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
    glow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
    border: "hover:border-blue-500/30",
    icon: "text-blue-500",
    bg: "from-blue-500/5 to-transparent",
  },
  green: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]",
    border: "hover:border-green-500/30",
    icon: "text-green-500",
    bg: "from-green-500/5 to-transparent",
  },
  amber: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.3)]",
    border: "hover:border-amber-500/30",
    icon: "text-amber-500",
    bg: "from-amber-500/5 to-transparent",
  },
  purple: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
    border: "hover:border-purple-500/30",
    icon: "text-purple-500",
    bg: "from-purple-500/5 to-transparent",
  },
  rose: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]",
    border: "hover:border-rose-500/30",
    icon: "text-rose-500",
    bg: "from-rose-500/5 to-transparent",
  },
  cyan: {
    glow: "hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]",
    border: "hover:border-cyan-500/30",
    icon: "text-cyan-500",
    bg: "from-cyan-500/5 to-transparent",
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
  const [mounted, setMounted] = useState(false);
  const accent = accentStyles[accentColor];

  useEffect(() => {
    setMounted(true);
  }, []);

  const TrendIcon = trend
    ? trend.value >= 0
      ? TrendingUp
      : TrendingDown
    : Minus;

  return (
    <>
      <motion.div
        initial={mounted ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: mounted ? 0.4 : 0, ease: "easeOut" }}
        className={cn(colSpanClasses[colSpan], className)}
      >
        <div
          className={cn(
            "group relative rounded-xl border bg-card overflow-hidden transition-all duration-300",
            accent.glow,
            accent.border,
          )}
        >
          {/* Gradient overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
              accent.bg,
            )}
          />

          {/* Card Header */}
          <div className="relative flex items-start justify-between p-4 pb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold truncate">{title}</h3>
                {trend && (
                  <motion.div
                    initial={mounted ? { scale: 0.8, opacity: 0 } : false}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: mounted ? 0.2 : 0 }}
                    className={cn(
                      "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full",
                      trend.value >= 0
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400",
                    )}
                  >
                    <TrendIcon className="h-3 w-3" />
                    {trend.value >= 0 ? "+" : ""}
                    {trend.value.toFixed(1)}%
                  </motion.div>
                )}
              </div>
              {description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {description}
                </p>
              )}
            </div>

            {/* Expand Button - Always visible */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 shrink-0 rounded-lg transition-all",
                "bg-muted/50 hover:bg-muted",
                "opacity-60 group-hover:opacity-100",
              )}
              onClick={() => setIsExpanded(true)}
            >
              <Expand className="h-4 w-4" />
            </Button>
          </div>

          {/* Card Content */}
          <div className="relative px-4 pb-4">
            {children}
          </div>

          {/* Bottom accent line */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              `bg-gradient-to-r from-transparent via-${accentColor}-500/50 to-transparent`,
            )}
          />
        </div>
      </motion.div>

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

