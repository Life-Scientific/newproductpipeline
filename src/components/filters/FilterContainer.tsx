"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FilterContainerProps {
  children: ReactNode;
  /** If true, applies integrated styling (background, padding, border) */
  integrated?: boolean;
  /** Custom className for the container */
  className?: string;
}

/**
 * Standardized container for filter components
 * Handles consistent spacing, borders, and background styling
 */
export function FilterContainer({
  children,
  integrated = false,
  className,
}: FilterContainerProps) {
  if (integrated) {
    return (
      <div
        className={cn(
          "border-b border-border/50 pb-6",
          "-mx-4 sm:-mx-6 px-4 sm:px-6",
          "bg-muted/20 -mt-4 sm:-mt-6 pt-4 sm:pt-6",
          "rounded-t-lg",
          className
        )}
      >
        {children}
      </div>
    );
  }

  return <div className={cn("w-full", className)}>{children}</div>;
}

