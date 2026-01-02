import {
  getIngredientById,
  getIngredientFormulations,
  getIngredientSuppliers,
} from "@/lib/db/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  CheckCircle,
  Building2,
  FlaskConical,
} from "lucide-react";
import { IngredientFormButton } from "@/components/forms/IngredientFormButton";
import { ChemicalEnrichment } from "@/components/ingredients/ChemicalEnrichment";
import { IngredientFormulationsTable } from "@/components/ingredients/IngredientFormulationsTable";
import { IngredientSuppliersTable } from "@/components/ingredients/IngredientSuppliersTable";

interface ActiveIngredientDetailPageProps {
  params: Promise<{ id: string }>;
}

const supplyRiskColors: Record<string, string> = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
};

export default async function ActiveIngredientDetailPage({
  params,
}: ActiveIngredientDetailPageProps) {
  const { id } = await params;

  const [ingredient, formulations, suppliers] = await Promise.all([
    getIngredientById(id),
    getIngredientFormulations(id),
    getIngredientSuppliers(id),
  ]);

  if (!ingredient) {
    notFound();
  }

  if (ingredient.ingredient_type !== "Active") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Active Ingredients", href: "/portfolio/active-ingredients" },
    { label: ingredient.ingredient_name },
  ];

  const totalFormulations = formulations.length;
  const selectedFormulations = formulations.filter(
    (fi: any) => fi.formulations?.formulation_status === "Selected",
  ).length;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {ingredient.ingredient_name}
              </h1>
              <Badge
                variant={ingredient.is_active ? "default" : "secondary"}
                className="text-base px-3"
              >
                {ingredient.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-muted-foreground">Active Ingredient Portfolio</p>
          </div>
          <IngredientFormButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Identity & Core Data */}
          <div className="lg:col-span-4 space-y-6">
            {ingredient.cas_number && (
              <ChemicalEnrichment
                casNumber={ingredient.cas_number}
                ingredientName={ingredient.ingredient_name}
              />
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">
                  System Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Type
                    </p>
                    <Badge variant="outline">
                      {ingredient.ingredient_type}
                    </Badge>
                  </div>
                  {ingredient.cas_number && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        CAS Number
                      </p>
                      <p className="text-sm font-mono">
                        {ingredient.cas_number}
                      </p>
                    </div>
                  )}
                  {ingredient.standard_density_g_per_l && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Density
                      </p>
                      <p className="text-sm">
                        {ingredient.standard_density_g_per_l} g/L
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" /> Formulations
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">
                    {totalFormulations}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedFormulations} selected
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> Suppliers
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{suppliers.length}</span>
                  <span className="text-xs text-muted-foreground">
                    {suppliers.filter((s: any) => s.is_primary).length} primary
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Supply Risk
                </p>
                <div>
                  <Badge
                    variant={
                      (supplyRiskColors[ingredient.supply_risk || ""] as any) ||
                      "secondary"
                    }
                  >
                    {ingredient.supply_risk || "Not Set"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" /> Regulatory
                </p>
                <div>
                  <Badge
                    variant={ingredient.is_eu_approved ? "default" : "outline"}
                  >
                    {ingredient.is_eu_approved ? "EU Approved" : "Not Approved"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="formulations">
                  Formulations ({totalFormulations})
                </TabsTrigger>
                <TabsTrigger value="suppliers">
                  Suppliers ({suppliers.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk & Regulatory Details</CardTitle>
                    <CardDescription>
                      Compliance and risk assessment information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                          Supply Chain Risk
                        </h4>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Risk Level
                            </span>
                            <Badge
                              variant={
                                (supplyRiskColors[
                                  ingredient.supply_risk || ""
                                ] as any) || "secondary"
                              }
                            >
                              {ingredient.supply_risk || "Not Set"}
                            </Badge>
                          </div>
                          {ingredient.supply_risk_notes ? (
                            <p className="text-sm mt-2 pt-2 border-t border-dashed">
                              {ingredient.supply_risk_notes}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground italic mt-2">
                              No risk notes provided.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-medium flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-muted-foreground" />
                          Regulatory Status
                        </h4>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              EU Approval
                            </span>
                            <Badge
                              variant={
                                ingredient.is_eu_approved
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {ingredient.is_eu_approved
                                ? "Approved"
                                : "Not Approved"}
                            </Badge>
                          </div>
                          {ingredient.regulatory_notes ? (
                            <p className="text-sm mt-2 pt-2 border-t border-dashed">
                              {ingredient.regulatory_notes}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground italic mt-2">
                              No regulatory notes provided.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="formulations">
                <Card>
                  <CardHeader>
                    <CardTitle>Formulations Using This Ingredient</CardTitle>
                    <CardDescription>
                      All formulations that include this active ingredient
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IngredientFormulationsTable formulations={formulations} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="suppliers">
                <Card>
                  <CardHeader>
                    <CardTitle>Suppliers</CardTitle>
                    <CardDescription>
                      Suppliers providing this ingredient
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IngredientSuppliersTable suppliers={suppliers} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </AnimatedPage>
    </div>
  );
}
