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
import { IngredientFormButton } from "@/components/forms/IngredientFormButton";

export default async function ActiveIngredientsPage() {
  const allIngredients = await getIngredientUsage();

  // Filter to only active ingredients
  const activeIngredients = allIngredients.filter(
    (ing) => ing.ingredient_type === "Active",
  );

  // Calculate summary statistics for active ingredients only
  const totalActiveIngredients = activeIngredients.length;
  const criticalRisk = activeIngredients.filter(
    (ing) => ing.supply_risk === "Critical",
  ).length;
  const highRisk = activeIngredients.filter(
    (ing) => ing.supply_risk === "High",
  ).length;
  const mediumRisk = activeIngredients.filter(
    (ing) => ing.supply_risk === "Medium",
  ).length;
  const lowRisk = activeIngredients.filter(
    (ing) => ing.supply_risk === "Low",
  ).length;
  const euApproved = activeIngredients.filter(
    (ing) => ing.is_eu_approved,
  ).length;
  const totalFormulations = activeIngredients.reduce(
    (sum, ing) => sum + (ing.formulation_count || 0),
    0,
  );
  const selectedFormulations = activeIngredients.reduce(
    (sum, ing) => sum + (ing.selected_formulations || 0),
    0,
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <AnimatedPage>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Active Ingredients
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage and analyze active ingredients used in formulations
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <IngredientFormButton />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total Active Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{totalActiveIngredients}</div>
              <p className="text-xs text-muted-foreground">
                Active ingredients in portfolio
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
                {selectedFormulations} in selected formulations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Supply Risk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold text-destructive">
                {criticalRisk}
              </div>
              <p className="text-xs text-muted-foreground">
                {highRisk} high, {mediumRisk} medium, {lowRisk} low
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
                {totalActiveIngredients > 0
                  ? ((euApproved / totalActiveIngredients) * 100).toFixed(1)
                  : 0}
                % approved
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Ingredients</CardTitle>
            <CardDescription>
              View active ingredient usage across formulations, supply risk
              indicators, and supplier relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6 pt-0">
              <IngredientUsage ingredients={activeIngredients} />
            </div>
          </CardContent>
        </Card>
      </AnimatedPage>
    </div>
  );
}
