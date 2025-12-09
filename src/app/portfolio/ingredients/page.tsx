import { getIngredientUsage } from "@/lib/db/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { IngredientUsage } from "@/components/ingredients/IngredientUsage";

export default async function IngredientsPage() {
  const ingredients = await getIngredientUsage();

  // Calculate summary statistics
  const totalIngredients = ingredients.length;
  const activeIngredients = ingredients.filter(
    (ing) => ing.ingredient_type === "Active",
  ).length;
  const criticalRisk = ingredients.filter(
    (ing) => ing.supply_risk === "Critical",
  ).length;
  const highRisk = ingredients.filter(
    (ing) => ing.supply_risk === "High",
  ).length;
  const euApproved = ingredients.filter((ing) => ing.is_eu_approved).length;
  const totalFormulations = ingredients.reduce(
    (sum, ing) => sum + (ing.formulation_count || 0),
    0,
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <AnimatedPage>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Ingredient Analysis
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Ingredient usage across formulations and supply risk analysis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{totalIngredients}</div>
              <p className="text-xs text-muted-foreground">
                {activeIngredients} active ingredients
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{totalFormulations}</div>
              <p className="text-xs text-muted-foreground">
                Formulation references
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Critical Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-destructive">
                {criticalRisk}
              </div>
              <p className="text-xs text-muted-foreground">
                Ingredients at risk
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">EU Approved</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{euApproved}</div>
              <p className="text-xs text-muted-foreground">
                {highRisk} high risk, {criticalRisk} critical
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Ingredient Usage</CardTitle>
            <CardDescription>
              View ingredient usage across formulations, supply risk indicators,
              and supplier relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6 pt-0">
              <IngredientUsage ingredients={ingredients} />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}
