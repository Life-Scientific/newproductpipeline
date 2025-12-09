"use client";

import {
  AnimatedPage,
  AnimatedPageStagger,
  AnimatedItem,
} from "@/components/layout/AnimatedPage";
import { cn } from "@/lib/utils";
import { Children, type ReactNode } from "react";
import { triggerEasterEgg } from "@/components/easter-eggs/KonamiCode";

export interface PageLayoutProps {
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: "single" | "multi";
  children: ReactNode;
  className?: string;
  /** Enable staggered entrance animation for children (default: true for multi variant) */
  stagger?: boolean;
}

export function PageLayout({
  title,
  description,
  action,
  variant = "multi",
  children,
  className,
  stagger,
}: PageLayoutProps) {
  const containerClass =
    variant === "single"
      ? "container mx-auto p-4 sm:p-6"
      : "container mx-auto p-4 sm:p-6";

  // Default stagger to true for multi variant
  const shouldStagger = stagger ?? variant === "multi";

  // Wrap children in AnimatedItem for staggered animation
  const staggeredChildren = shouldStagger ? (
    <AnimatedPageStagger
      className={variant === "multi" ? "flex flex-col" : ""}
      style={
        variant === "multi"
          ? ({ gap: "24px" } as React.CSSProperties)
          : undefined
      }
    >
      {Children.map(children, (child, index) => (
        <AnimatedItem key={index}>{child}</AnimatedItem>
      ))}
    </AnimatedPageStagger>
  ) : (
    <div
      className={variant === "multi" ? "flex flex-col" : ""}
      style={
        variant === "multi"
          ? ({ gap: "24px" } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );

  return (
    <div className={cn(containerClass, className)}>
      <AnimatedPage>
        <div
          className={cn(
            "space-y-2",
            variant === "single" && "mb-6",
            variant === "multi" && "mb-6 sm:mb-8",
            action && "flex items-center justify-between",
          )}
        >
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            {description && (
              <p
                className={cn(
                  "text-sm sm:text-base text-muted-foreground",
                  description.includes("Navigator") &&
                    "cursor-pointer hover:text-muted-foreground/80 transition-colors select-none",
                )}
                onClick={
                  description.includes("Navigator")
                    ? triggerEasterEgg
                    : undefined
                }
                title={description.includes("Navigator") ? "👀" : undefined}
              >
                {description}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
        {staggeredChildren}
      </AnimatedPage>
    </div>
  );
}
