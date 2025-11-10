"use client";

import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import type { Database } from "@/lib/supabase/database.types";

type IngredientUsage = Database["public"]["Views"]["vw_ingredient_usage"]["Row"];

const supplyRiskColors: Record<string, string> = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
};

const columns: ColumnDef<IngredientUsage>[] = [
  {
    accessorKey: "ingredient_name",
    header: "Ingredient Name",
  },
  {
    accessorKey: "ingredient_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("ingredient_type") as string | null;
      return <Badge variant="outline">{type || "—"}</Badge>;
    },
  },
  {
    accessorKey: "formulation_count",
    header: "Formulations",
    cell: ({ row }) => {
      const count = row.getValue("formulation_count") as number | null;
      return <span className="font-medium">{count || 0}</span>;
    },
  },
  {
    accessorKey: "selected_formulations",
    header: "Selected",
    cell: ({ row }) => {
      const count = row.getValue("selected_formulations") as number | null;
      return count ? <Badge variant="default">{count}</Badge> : "0";
    },
  },
  {
    accessorKey: "supply_risk",
    header: "Supply Risk",
    cell: ({ row }) => {
      const risk = row.getValue("supply_risk") as string | null;
      if (!risk) return "—";
      return (
        <Badge variant={(supplyRiskColors[risk] as any) || "outline"}>{risk}</Badge>
      );
    },
  },
  {
    accessorKey: "is_eu_approved",
    header: "EU Approved",
    cell: ({ row }) => {
      const approved = row.getValue("is_eu_approved") as boolean | null;
      return approved ? (
        <Badge variant="default">Yes</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      );
    },
  },
  {
    accessorKey: "suppliers",
    header: "Suppliers",
    cell: ({ row }) => {
      const suppliers = row.getValue("suppliers") as string | null;
      return (
        <span className="text-sm text-muted-foreground">
          {suppliers || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "formulations_used_in",
    header: "Used In",
    cell: ({ row }) => {
      const formulations = row.getValue("formulations_used_in") as string | null;
      return (
        <span className="text-sm text-muted-foreground max-w-md truncate block">
          {formulations || "—"}
        </span>
      );
    },
  },
];

interface IngredientUsageProps {
  ingredients: IngredientUsage[];
}

export function IngredientUsage({ ingredients }: IngredientUsageProps) {
  // Group by supply risk
  const byRisk = ingredients.reduce(
    (acc, ing) => {
      const risk = ing.supply_risk || "Unknown";
      if (!acc[risk]) {
        acc[risk] = [];
      }
      acc[risk].push(ing);
      return acc;
    },
    {} as Record<string, IngredientUsage[]>
  );

  const criticalIngredients = byRisk["Critical"] || [];
  const highRiskIngredients = byRisk["High"] || [];

  return (
    <div className="space-y-4">
      {(criticalIngredients.length > 0 || highRiskIngredients.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {criticalIngredients.length > 0 && (
            <div className="border border-destructive rounded-lg p-4 bg-destructive/5">
              <h3 className="font-semibold text-destructive mb-2">
                Critical Supply Risk ({criticalIngredients.length})
              </h3>
              <ul className="space-y-1 text-sm">
                {criticalIngredients.slice(0, 5).map((ing) => (
                  <li key={ing.ingredient_id}>
                    {ing.ingredient_name} ({ing.formulation_count} formulations)
                  </li>
                ))}
                {criticalIngredients.length > 5 && (
                  <li className="text-muted-foreground">
                    +{criticalIngredients.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          )}

          {highRiskIngredients.length > 0 && (
            <div className="border border-orange-500 rounded-lg p-4 bg-orange-500/5">
              <h3 className="font-semibold text-orange-600 mb-2">
                High Supply Risk ({highRiskIngredients.length})
              </h3>
              <ul className="space-y-1 text-sm">
                {highRiskIngredients.slice(0, 5).map((ing) => (
                  <li key={ing.ingredient_id}>
                    {ing.ingredient_name} ({ing.formulation_count} formulations)
                  </li>
                ))}
                {highRiskIngredients.length > 5 && (
                  <li className="text-muted-foreground">
                    +{highRiskIngredients.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      <EnhancedDataTable
        columns={columns}
        data={ingredients}
        searchKey="ingredient_name"
        searchPlaceholder="Search ingredients..."
        pageSize={25}
        showPageSizeSelector={true}
      />
    </div>
  );
}

