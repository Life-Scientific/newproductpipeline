"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartSkeletonProps {
  title?: string;
  description?: string;
  height?: number;
}

/**
 * Loading skeleton for chart components.
 * Used as a placeholder while heavy chart libraries are being loaded.
 */
export function ChartSkeleton({
  title = "Loading chart...",
  description,
  height = 400,
}: ChartSkeletonProps) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filter skeletons */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-16" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Chart area skeleton */}
        <div
          className="w-full relative bg-muted/30 rounded-md flex items-center justify-center"
          style={{ height }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Summary stats skeleton */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

