import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PipelineTrackerLoading() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-40" />
          </div>
        </CardContent>
      </Card>

      {/* Pipeline stages */}
      <div className="grid gap-4 md:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-6 w-8 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="p-2 border rounded bg-muted/30">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

