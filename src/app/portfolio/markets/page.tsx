import { getBusinessCases, getFormulations } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { MarketsClient } from "./MarketsClient";
import { createClient } from "@/lib/supabase/server";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MarketsPage() {
  const supabase = await createClient();

  const [formulations, businessCases, countriesResult, registrationPipeline] =
    await Promise.all([
      getFormulations(),
      getBusinessCases(),
      supabase
        .from("countries")
        .select("*")
        .eq("is_active", true)
        .order("country_name"),
      supabase.from("vw_registration_pipeline").select("*"),
    ]);

  const countries = countriesResult.data || [];
  const registrations = registrationPipeline.data || [];

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

        <MarketsClient
          businessCases={businessCases}
          formulations={formulations}
          countries={countries}
          registrations={registrations}
        />
      </AnimatedPage>
    </div>
  );
}
