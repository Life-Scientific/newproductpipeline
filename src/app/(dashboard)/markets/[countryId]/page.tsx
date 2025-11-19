import { getBusinessCases, getFormulations } from "@/lib/db/queries";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { MarketDetailDashboard } from "@/components/markets/MarketDetailDashboard";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface MarketDetailPageProps {
  params: {
    countryId: string;
  };
}

export default async function MarketDetailPage({ params }: MarketDetailPageProps) {
  const supabase = await createClient();
  
  // Get country details
  const { data: country, error: countryError } = await supabase
    .from("countries")
    .select("*")
    .eq("country_id", params.countryId)
    .single();

  if (countryError || !country) {
    notFound();
  }

  // Get all data for this country
  const [formulations, allBusinessCases, registrationPipeline] = await Promise.all([
    getFormulations(),
    getBusinessCases(),
    supabase
      .from("vw_registration_pipeline")
      .select("*")
      .eq("country_name", country.country_name),
  ]);

  // Filter business cases for this country
  const businessCases = allBusinessCases.filter((bc) => bc.country_id === params.countryId);

  const registrations = registrationPipeline.data || [];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <MarketDetailDashboard
          country={country}
          businessCases={businessCases}
          formulations={formulations}
          registrations={registrations}
        />
      </AnimatedPage>
    </div>
  );
}

