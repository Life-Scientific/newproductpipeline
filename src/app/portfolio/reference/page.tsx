import { getCountries } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Database } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import { CountriesTable } from "@/components/reference/CountriesTable";
import { EPPOCodesTable } from "@/components/reference/EPPOCodesTable";
import { IngredientsTable } from "@/components/reference/IngredientsTable";
import { ExchangeRatesTable } from "@/components/reference/ExchangeRatesTable";
import { CountryFormButton } from "@/components/forms/CountryFormButton";
import { IngredientFormButton } from "@/components/forms/IngredientFormButton";
import { ExchangeRateFormButton } from "@/components/forms/ExchangeRateFormButton";
import { getExchangeRates } from "@/lib/db/queries";

type EPPOCode = Database["public"]["Tables"]["eppo_codes"]["Row"];
type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

export default async function ReferenceDataPage() {
  const [countries, exchangeRates] = await Promise.all([
    getCountries(),
    getExchangeRates(),
  ]);
  const supabase = await createClient();

  // Fetch EPPO codes by classification
  const [cropsResult, insectsResult, diseasesResult, weedsResult, ingredientsResult] =
    await Promise.all([
      supabase
        .from("eppo_codes")
        .select("*")
        .eq("is_active", true)
        .eq("classification", "crop")
        .order("display_name")
        .limit(10000),
      supabase
        .from("eppo_codes")
        .select("*")
        .eq("is_active", true)
        .eq("classification", "insect")
        .order("display_name")
        .limit(10000),
      supabase
        .from("eppo_codes")
        .select("*")
        .eq("is_active", true)
        .eq("classification", "disease")
        .order("display_name")
        .limit(10000),
      supabase
        .from("eppo_codes")
        .select("*")
        .eq("is_active", true)
        .eq("classification", "weed")
        .order("display_name")
        .limit(10000),
      supabase
        .from("ingredients")
        .select("*")
        .eq("is_active", true)
        .order("ingredient_name")
        .limit(10000),
    ]);

  const eppoCrops = (cropsResult.data || []) as EPPOCode[];
  const eppoInsects = (insectsResult.data || []) as EPPOCode[];
  const eppoDiseases = (diseasesResult.data || []) as EPPOCode[];
  const eppoWeeds = (weedsResult.data || []) as EPPOCode[];
  const ingredients = (ingredientsResult.data || []) as Ingredient[];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Reference Data</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage countries, exchange rates, EPPO codes (crops, insects, diseases, weeds), and ingredients
          </p>
        </div>

        <Tabs defaultValue="countries" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="exchange-rates">Exchange Rates</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
            <TabsTrigger value="insects">Insects</TabsTrigger>
            <TabsTrigger value="diseases">Diseases</TabsTrigger>
            <TabsTrigger value="weeds">Weeds</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          </TabsList>

          <TabsContent value="countries">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Countries</CardTitle>
                    <CardDescription>Manage country reference data</CardDescription>
                  </div>
                  <CountryFormButton />
                </div>
              </CardHeader>
              <CardContent>
                <CountriesTable countries={countries} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exchange-rates">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Exchange Rates</CardTitle>
                    <CardDescription>
                      Manage exchange rates to EUR. EUR is the rollup currency for reporting.
                      ({exchangeRates.length} rates)
                    </CardDescription>
                  </div>
                  <ExchangeRateFormButton />
                </div>
              </CardHeader>
              <CardContent>
                <ExchangeRatesTable exchangeRates={exchangeRates} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crops">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>EPPO Crops</CardTitle>
                    <CardDescription>
                      EPPO crop codes ({eppoCrops.length} active codes)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EPPOCodesTable eppoCodes={eppoCrops} classification="crop" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insects">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>EPPO Insects</CardTitle>
                    <CardDescription>
                      EPPO insect codes ({eppoInsects.length} active codes)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EPPOCodesTable eppoCodes={eppoInsects} classification="insect" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diseases">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>EPPO Diseases</CardTitle>
                    <CardDescription>
                      EPPO disease codes ({eppoDiseases.length} active codes)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EPPOCodesTable eppoCodes={eppoDiseases} classification="disease" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weeds">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>EPPO Weeds</CardTitle>
                    <CardDescription>
                      EPPO weed codes ({eppoWeeds.length} active codes)
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EPPOCodesTable eppoCodes={eppoWeeds} classification="weed" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ingredients</CardTitle>
                    <CardDescription>Manage ingredient reference data</CardDescription>
                  </div>
                  <IngredientFormButton />
                </div>
              </CardHeader>
              <CardContent>
                <IngredientsTable ingredients={(ingredients || []) as Ingredient[]} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AnimatedPage>
    </div>
  );
}

