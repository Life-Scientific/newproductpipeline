import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface CardGridProps {
  children: ReactNode;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: "sm" | "md" | "lg";
  minCardWidth?: string;
  className?: string;
}

// Explicit gap classes - Tailwind needs to see these statically
const gapClasses = {
  sm: "gap-4 sm:gap-5",
  md: "gap-6",
  lg: "gap-6 sm:gap-8",
} as const;

const columnClasses = {
  mobile: {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  },
  tablet: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  },
  desktop: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  },
};

export function CardGrid({
  children,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  gap = "md",
  minCardWidth = "minmax(0, 1fr)",
  className,
}: CardGridProps) {
  const { mobile = 1, tablet = 2, desktop = 4 } = columns;

  const mobileClass =
    columnClasses.mobile[
      (mobile as keyof typeof columnClasses.mobile) || 1
    ] || columnClasses.mobile[1];
  const tabletClass =
    columnClasses.tablet[
      (tablet as keyof typeof columnClasses.tablet) || 2
    ] || columnClasses.tablet[2];
  const desktopClass =
    columnClasses.desktop[
      (desktop as keyof typeof columnClasses.desktop) || 4
    ] || columnClasses.desktop[4];

  // Gap values in pixels - using inline styles to ensure they work
  const gapPixels = {
    sm: 16,
    md: 24,
    lg: 24,
  };

  return (
    <div
      className={cn(
        "grid",
        mobileClass,
        tabletClass,
        desktopClass,
        className
      )}
      style={{
        gap: `${gapPixels[gap]}px`,
      }}
    >
      {children}
    </div>
  );
}

