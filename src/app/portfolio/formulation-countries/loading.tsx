import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FormulationCountriesLoading() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-72" />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 15 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
