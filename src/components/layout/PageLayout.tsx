import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface PageLayoutProps {
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: "single" | "multi";
  children: ReactNode;
  className?: string;
}

export function PageLayout({
  title,
  description,
  action,
  variant = "multi",
  children,
  className,
}: PageLayoutProps) {
  const containerClass =
    variant === "single"
      ? "container mx-auto p-4 sm:p-6"
      : "container mx-auto p-4 sm:p-6";

  return (
    <div className={cn(containerClass, className)}>
      <AnimatedPage>
        <div
          className={cn(
            "space-y-2",
            variant === "single" && "mb-6",
            variant === "multi" && "mb-6 sm:mb-8",
            action && "flex items-center justify-between"
          )}
        >
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
        <div 
          className={variant === "multi" ? "flex flex-col" : ""}
          style={variant === "multi" ? {
            gap: "24px",
          } as React.CSSProperties : undefined}
        >
          {children}
        </div>
      </AnimatedPage>
    </div>
  );
}

