import { getCountries } from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Database } from "@/lib/supabase/database.types";
import { createClient } from "@/lib/supabase/server";
import { CountriesTable } from "@/components/reference/CountriesTable";
import { CropsTable } from "@/components/reference/CropsTable";
import { IngredientsTable } from "@/components/reference/IngredientsTable";
import { CountryFormButton } from "@/components/forms/CountryFormButton";
import { CropFormButton } from "@/components/forms/CropFormButton";
import { IngredientFormButton } from "@/components/forms/IngredientFormButton";

type Crop = Database["public"]["Tables"]["crops"]["Row"];
type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

export default async function ReferenceDataPage() {
  const countries = await getCountries();
  const supabase = await createClient();

  const { data: crops } = await supabase
    .from("crops")
    .select("*")
    .eq("is_active", true)
    .order("crop_name")
    .limit(10000);

  const { data: ingredients } = await supabase
    .from("ingredients")
    .select("*")
    .eq("is_active", true)
    .order("ingredient_name")
    .limit(10000);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Reference Data</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage countries, crops, ingredients, and suppliers
          </p>
        </div>

        <Tabs defaultValue="countries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="crops">Crops</TabsTrigger>
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

          <TabsContent value="crops">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Crops</CardTitle>
                    <CardDescription>Manage crop reference data</CardDescription>
                  </div>
                  <CropFormButton />
                </div>
              </CardHeader>
              <CardContent>
                <CropsTable crops={(crops || []) as Crop[]} />
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

