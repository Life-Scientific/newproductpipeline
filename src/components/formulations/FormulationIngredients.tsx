"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type FormulationIngredient = Database["public"]["Tables"]["formulation_ingredients"]["Row"];
type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

interface FormulationIngredientsProps {
  ingredients: Array<FormulationIngredient & { ingredients: Ingredient | null }>;
}

const supplyRiskColors: Record<string, string> = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
};

export function FormulationIngredients({ ingredients }: FormulationIngredientsProps) {
  const activeIngredients = ingredients.filter(
    (ing) => ing.ingredients?.ingredient_type === "Active"
  );
  const otherIngredients = ingredients.filter(
    (ing) => ing.ingredients?.ingredient_type !== "Active"
  );

  if (ingredients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
          <CardDescription>Formulation composition</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No ingredients found.</p>
        </CardContent>
      </Card>
    );
  }

  const renderIngredientTable = (ingredientList: typeof ingredients, title: string) => {
    if (ingredientList.length === 0) return null;

    return (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold">{title}</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>CAS Number</TableHead>
              <TableHead>Supply Risk</TableHead>
              <TableHead>EU Approved</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredientList.map((ing) => (
              <TableRow key={ing.formulation_ingredient_id}>
                <TableCell className="font-medium">
                  {ing.ingredients?.ingredient_name || "—"}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{ing.ingredients?.ingredient_type || "—"}</Badge>
                </TableCell>
                <TableCell>
                  {ing.quantity} {ing.quantity_unit}
                </TableCell>
                <TableCell>{ing.ingredient_role || "—"}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {ing.ingredients?.cas_number || "—"}
                </TableCell>
                <TableCell>
                  {ing.ingredients?.supply_risk ? (
                    <Badge
                      variant={
                        (supplyRiskColors[ing.ingredients.supply_risk] as any) || "outline"
                      }
                    >
                      {ing.ingredients.supply_risk}
                    </Badge>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>
                  {ing.ingredients?.is_eu_approved ? (
                    <Badge variant="default">Yes</Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
        <CardDescription>Formulation composition</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderIngredientTable(activeIngredients, "Active Ingredients")}
        {renderIngredientTable(otherIngredients, "Other Ingredients")}
      </CardContent>
    </Card>
  );
}

