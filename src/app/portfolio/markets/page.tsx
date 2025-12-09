import { getBusinessCases, getFormulations } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { MarketOverviewDashboard } from "@/components/markets/MarketOverviewDashboard";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function MarketsPage() {
  const supabase = await createClient();
  
  const [formulations, businessCases, countriesResult] = await Promise.all([
    getFormulations(),
    getBusinessCases(),
    supabase.from("countries").select("*").eq("is_active", true).order("country_name"),
  ]);

  const countries = countriesResult.data || [];
  
  // Fetch registration pipeline with pagination
  let registrations: any[] = [];
  let page = 0;
  const pageSize = 10000;
  let hasMore = true;
  
  while (hasMore) {
    const { data: pageData } = await supabase
      .from("vw_registration_pipeline")
      .select("*")
      .range(page * pageSize, (page + 1) * pageSize - 1);
    
    if (!pageData || pageData.length === 0) {
      hasMore = false;
    } else {
      registrations = [...registrations, ...pageData];
      hasMore = pageData.length === pageSize;
      page++;
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Markets Overview</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Portfolio performance and opportunity by country
            </p>
          </div>
        </div>

        <MarketOverviewDashboard
          businessCases={businessCases}
          formulations={formulations}
          countries={countries}
          registrations={registrations}
        />
      </AnimatedPage>
    </div>
  );
}



