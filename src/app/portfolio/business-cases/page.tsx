import { getBusinessCasesForProjectionTable } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { BusinessCasesPageClient } from "./BusinessCasesPageClient";

// Use dynamic rendering to ensure fresh data after mutations
export const dynamic = "force-dynamic";

export default async function BusinessCasesPage() {
  const businessCases = await getBusinessCasesForProjectionTable();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Product Portfolio Long Range Plan</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                10-year revenue and margin projections. Each row represents a formulation registered in a country for a specific use.
              </p>
            </div>
          </div>

          <BusinessCasesPageClient 
            initialBusinessCases={businessCases} 
          />
        </div>
      </AnimatedPage>
    </div>
  );
}

