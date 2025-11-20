import {
  getIngredientById,
  getIngredientFormulations,
  getIngredientSuppliers,
} from "@/lib/db/queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import { HierarchicalBreadcrumb } from "@/components/navigation/HierarchicalBreadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Package, AlertTriangle, CheckCircle, Building2, FlaskConical, FileText } from "lucide-react";
import { getStatusVariant } from "@/lib/design-system";
import { IngredientFormButton } from "@/components/forms/IngredientFormButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

  // Filter to only active ingredients
  if (ingredient.ingredient_type !== "Active") {
    notFound();
  }

  const breadcrumbs = [
    { label: "Active Ingredients", href: "/active-ingredients" },
    { label: ingredient.ingredient_name },
  ];

  // Calculate statistics
  const totalFormulations = formulations.length;
  const selectedFormulations = formulations.filter(
    (fi) => fi.formulations?.formulation_status === "Selected"
  ).length;
  const monitoringFormulations = formulations.filter(
    (fi) => fi.formulations?.formulation_status === "Being Monitored"
  ).length;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <AnimatedPage>
        <HierarchicalBreadcrumb items={breadcrumbs} />
        
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">{ingredient.ingredient_name}</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Active Ingredient Details
            </p>
          </div>
          <IngredientFormButton />
        </div>

        {/* Summary Metrics */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Formulations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{totalFormulations}</div>
              <p className="text-xs text-muted-foreground">
                {selectedFormulations} selected, {monitoringFormulations} monitoring
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Supply Risk
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Badge
                variant={
                  (supplyRiskColors[ingredient.supply_risk || ""] as any) || "secondary"
                }
                className="text-lg px-3 py-1"
              >
                {ingredient.supply_risk || "Not Set"}
              </Badge>
              {ingredient.supply_risk_notes && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {ingredient.supply_risk_notes}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Regulatory Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Badge variant={ingredient.is_eu_approved ? "default" : "outline"} className="text-lg px-3 py-1">
                {ingredient.is_eu_approved ? "EU Approved" : "Not Approved"}
              </Badge>
              {ingredient.regulatory_notes && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {ingredient.regulatory_notes}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-bold">{suppliers.length}</div>
              <p className="text-xs text-muted-foreground">
                {suppliers.filter((s) => s.is_primary).length} primary
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="formulations">Formulations ({totalFormulations})</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers ({suppliers.length})</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {/* Basic Information */}
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Ingredient Name</p>
                      <p className="text-sm font-medium">{ingredient.ingredient_name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Type</p>
                      <Badge variant="outline">{ingredient.ingredient_type}</Badge>
                    </div>
                    {ingredient.cas_number && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">CAS Number</p>
                        <p className="text-sm font-mono">{ingredient.cas_number}</p>
                      </div>
                    )}
                    {ingredient.standard_density_g_per_l && (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Density</p>
                        <p className="text-sm">{ingredient.standard_density_g_per_l} g/L</p>
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Status</p>
                      <Badge variant={ingredient.is_active ? "default" : "secondary"}>
                        {ingredient.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk & Regulatory */}
              <Card>
                <CardHeader className="space-y-1.5">
                  <CardTitle>Risk & Regulatory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Supply Risk</p>
                      <Badge
                        variant={
                          (supplyRiskColors[ingredient.supply_risk || ""] as any) || "secondary"
                        }
                      >
                        {ingredient.supply_risk || "Not Set"}
                      </Badge>
                      {ingredient.supply_risk_notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {ingredient.supply_risk_notes}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">EU Approval</p>
                      <Badge variant={ingredient.is_eu_approved ? "default" : "outline"}>
                        {ingredient.is_eu_approved ? "Approved" : "Not Approved"}
                      </Badge>
                      {ingredient.regulatory_notes && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {ingredient.regulatory_notes}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Formulations Tab */}
          <TabsContent value="formulations" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Formulations Using This Ingredient</CardTitle>
                <CardDescription>
                  All formulations that include this active ingredient
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formulations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No formulations found using this ingredient.</p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[150px]">Formulation Code</TableHead>
                          <TableHead className="min-w-[200px]">Product Name</TableHead>
                          <TableHead className="w-[120px]">Category</TableHead>
                          <TableHead className="w-[120px]">Status</TableHead>
                          <TableHead className="w-[100px] text-right">Quantity</TableHead>
                          <TableHead className="w-[80px]">Unit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {formulations.map((fi) => {
                          const formulation = fi.formulations;
                          if (!formulation) return null;
                          
                          return (
                            <TableRow key={fi.formulation_ingredient_id}>
                              <TableCell className="font-medium">
                                {formulation.formulation_id ? (
                                  <Link
                                    href={`/formulations/${formulation.formulation_id}`}
                                    className="text-primary hover:underline text-sm"
                                  >
                                    {formulation.formulation_code || "—"}
                                  </Link>
                                ) : (
                                  <span className="text-sm">{formulation.formulation_code || "—"}</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <span className="text-sm">{formulation.formulation_name || "—"}</span>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">
                                  {formulation.formulation_category || "—"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    getStatusVariant(formulation.formulation_status || "", "formulation")
                                  }
                                  className="text-xs"
                                >
                                  {formulation.formulation_status || "—"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <span className="text-sm font-medium">
                                  {fi.quantity ? fi.quantity.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="text-sm text-muted-foreground">
                                  {fi.quantity_unit || "—"}
                                </span>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suppliers</CardTitle>
                <CardDescription>
                  Suppliers providing this ingredient
                </CardDescription>
              </CardHeader>
              <CardContent>
                {suppliers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No suppliers found for this ingredient.</p>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">Supplier Name</TableHead>
                          <TableHead className="w-[120px]">Code</TableHead>
                          <TableHead className="w-[150px]">Country</TableHead>
                          <TableHead className="w-[100px]">Primary</TableHead>
                          <TableHead className="w-[120px] text-right">Cost per kg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {suppliers.map((is) => {
                          const supplier = is.suppliers;
                          if (!supplier) return null;
                          
                          return (
                            <TableRow key={`${is.ingredient_id}-${is.supplier_id}`}>
                              <TableCell className="font-medium">
                                <span className="text-sm">{supplier.supplier_name || "—"}</span>
                              </TableCell>
                              <TableCell>
                                <span className="font-mono text-sm text-muted-foreground">
                                  {supplier.supplier_code || "—"}
                                </span>
                              </TableCell>
                              <TableCell>
                                {supplier.countries ? (
                                  <span className="text-sm">
                                    {supplier.countries.country_name || supplier.countries.country_code || "—"}
                                  </span>
                                ) : (
                                  <span className="text-sm text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                {is.is_primary ? (
                                  <Badge variant="default" className="text-xs">Primary</Badge>
                                ) : (
                                  <span className="text-sm text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {is.cost_per_kg ? (
                                  <span className="text-sm font-medium">
                                    €{Number(is.cost_per_kg).toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                ) : (
                                  <span className="text-sm text-muted-foreground">—</span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AnimatedPage>
    </div>
  );
}

