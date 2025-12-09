"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type FormulationIngredient =
  Database["public"]["Tables"]["formulation_ingredients"]["Row"];
type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

interface FormulationIngredientsProps {
  ingredients: Array<
    FormulationIngredient & { ingredients: Ingredient | null }
  >;
}

const supplyRiskColors: Record<string, string> = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
};

export function FormulationIngredients({
  ingredients,
}: FormulationIngredientsProps) {
  const activeIngredients = ingredients.filter(
    (ing) => ing.ingredients?.ingredient_type === "Active",
  );
  const otherIngredients = ingredients.filter(
    (ing) => ing.ingredients?.ingredient_type !== "Active",
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

  const renderIngredientTable = (
    ingredientList: typeof ingredients,
    title: string,
  ) => {
    if (ingredientList.length === 0) return null;

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Ingredient Name</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[120px]">Quantity</TableHead>
                <TableHead className="w-[120px]">Role</TableHead>
                <TableHead className="w-[140px]">CAS Number</TableHead>
                <TableHead className="w-[120px]">Supply Risk</TableHead>
                <TableHead className="w-[100px]">EU Approved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredientList.map((ing) => (
                <TableRow key={ing.formulation_ingredient_id}>
                  <TableCell className="font-medium">
                    {ing.ingredients?.ingredient_name || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {ing.ingredients?.ingredient_type || "—"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {ing.quantity
                        ? ing.quantity.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                        : "—"}{" "}
                      {ing.quantity_unit || ""}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {ing.ingredient_role || "—"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {ing.ingredients?.cas_number ? (
                      <span className="font-mono text-sm text-muted-foreground">
                        {ing.ingredients.cas_number}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {ing.ingredients?.supply_risk ? (
                      <Badge
                        variant={
                          (supplyRiskColors[
                            ing.ingredients.supply_risk
                          ] as any) || "outline"
                        }
                        className="text-xs"
                      >
                        {ing.ingredients.supply_risk}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {ing.ingredients?.is_eu_approved ? (
                      <Badge variant="default" className="text-xs">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        No
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
