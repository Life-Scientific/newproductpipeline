import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function IngredientsLoading() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Search */}
      <div className="mb-6">
        <Skeleton className="h-10 w-80" />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {/* Table header */}
          <div className="flex items-center gap-4 p-3 border-b bg-muted/50">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>

          {/* Table rows */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 border-b last:border-0"
            >
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-8" />
              <Skeleton className="h-8 w-8 rounded ml-auto" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
