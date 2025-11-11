import { getBusinessCasesForProjectionTable } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { BusinessCasesPageClient } from "./BusinessCasesPageClient";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
                Financial projections and business case analysis
              </p>
            </div>
          </div>

          <BusinessCasesPageClient initialBusinessCases={businessCases} />
        </div>
      </AnimatedPage>
    </div>
  );
}

