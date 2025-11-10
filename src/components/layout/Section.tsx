import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  spacing?: "tight" | "normal" | "loose";
  className?: string;
}

const spacingClasses = {
  tight: "space-y-4 sm:space-y-6",
  normal: "space-y-6 sm:space-y-8",
  loose: "space-y-8 sm:space-y-10",
};

export function Section({
  title,
  description,
  children,
  spacing = "normal",
  className,
}: SectionProps) {
  return (
    <section className={cn(spacingClasses[spacing], className)}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
          )}
          {description && (
            <p className="text-sm sm:text-base text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

