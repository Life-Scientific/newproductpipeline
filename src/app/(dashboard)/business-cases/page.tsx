import { getBusinessCases } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { BusinessCasesList } from "@/components/business-cases/BusinessCasesList";
import { BusinessCaseFormButton } from "@/components/forms/BusinessCaseFormButton";

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BusinessCasesPage() {
  const businessCases = await getBusinessCases();

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Business Cases</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Financial projections and business case analysis
            </p>
          </div>
          <BusinessCaseFormButton />
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Business Cases</CardTitle>
            <CardDescription>
              View and manage financial projections
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 sm:p-6 pt-0">
              <BusinessCasesList businessCases={businessCases} />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}

