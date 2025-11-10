import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface ContentCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "default" | "table" | "chart" | "list";
  action?: ReactNode;
  className?: string;
}

const variantClasses = {
  default: {
    content: "p-4 sm:p-6",
  },
  table: {
    content: "p-0",
    inner: "p-4 sm:p-6 pt-0",
  },
  chart: {
    content: "p-4 sm:p-6",
  },
  list: {
    content: "p-4 sm:p-6",
  },
};

export function ContentCard({
  title,
  description,
  children,
  variant = "default",
  action,
  className,
}: ContentCardProps) {
  const variantClass = variantClasses[variant];

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </CardHeader>
      <CardContent className={variantClass.content}>
        {variant === "table" ? (
          <div className={variantClasses.table.inner}>{children}</div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}

