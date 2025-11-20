"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import type { Database } from "@/lib/supabase/database.types";
import { TableUtils } from "@/lib/utils/table-utils";

type IngredientUsage = Database["public"]["Views"]["vw_ingredient_usage"]["Row"];

// Memoize columns outside component to prevent recreation on every render
const createColumns = (): ColumnDef<IngredientUsage>[] => [
  {
    accessorKey: "ingredient_name",
    header: "Ingredient Name",
    meta: { sticky: "left", minWidth: "200px" }, // Freeze this column on the left
    cell: ({ row }) => {
      const name = row.getValue("ingredient_name") as string;
      const id = row.original.ingredient_id;
      const type = row.original.ingredient_type;
      
      // Only link if it's an active ingredient
      if (type === "Active") {
        return TableUtils.renderLink(`/active-ingredients/${id}`, name);
      }
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "cas_number",
    header: "CAS Number",
    meta: { minWidth: "140px" },
    cell: ({ row }) => TableUtils.renderCASNumber(row.original.cas_number),
  },
  {
    accessorKey: "standard_density_g_per_l",
    header: "Density (g/L)",
    meta: { minWidth: "120px" },
    cell: ({ row }) => {
      const density = row.getValue("standard_density_g_per_l") as number | null;
      return density ? (
        <span className="text-sm">{Number(density).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "ingredient_type",
    header: "Type",
    meta: { minWidth: "100px" },
    cell: ({ row }) => {
      const type = row.getValue("ingredient_type") as string | null;
      return <Badge variant="outline" className="text-xs">{type || "—"}</Badge>;
    },
  },
  TableUtils.createNumberColumn("formulation_count", "Formulations", {
    minWidth: "120px",
    decimals: 0,
  }),
  {
    accessorKey: "selected_formulations",
    header: "Selected",
    meta: { minWidth: "100px", align: "right" },
    cell: ({ row }) => {
      const count = row.getValue("selected_formulations") as number | null;
      return (
        <div className="text-right">
          {count && count > 0 ? (
            <Badge variant="default" className="text-xs">{count}</Badge>
          ) : (
            <span className="text-sm text-muted-foreground">0</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "supply_risk",
    header: "Supply Risk",
    meta: { minWidth: "120px" },
    cell: ({ row }) => TableUtils.renderSupplyRisk(row.getValue("supply_risk") as string | null),
  },
  {
    accessorKey: "is_eu_approved",
    header: "EU Approved",
    meta: { minWidth: "100px" },
    cell: ({ row }) => TableUtils.renderBoolean(row.getValue("is_eu_approved") as boolean | null),
  },
  {
    accessorKey: "suppliers",
    header: "Suppliers",
    meta: { minWidth: "200px" },
    cell: ({ row }) => {
      const suppliers = row.getValue("suppliers") as string | null;
      return (
        <span className="text-sm text-muted-foreground max-w-[200px] truncate block">
          {suppliers || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "formulations_used_in",
    header: "Used In",
    meta: { minWidth: "300px" },
    cell: ({ row }) => {
      const formulations = row.getValue("formulations_used_in") as string | null;
      return (
        <span className="text-sm text-muted-foreground max-w-[300px] truncate block">
          {formulations || "—"}
        </span>
      );
    },
  },
];

// Memoize columns array - only recreate if needed
const columns = createColumns();

interface IngredientUsageProps {
  ingredients: IngredientUsage[];
}

export function IngredientUsage({ ingredients }: IngredientUsageProps) {
  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);

  // Group by supply risk
  const byRisk = useMemo(() => ingredients.reduce(
    (acc, ing) => {
      const risk = ing.supply_risk || "Unknown";
      if (!acc[risk]) {
        acc[risk] = [];
      }
      acc[risk].push(ing);
      return acc;
    },
    {} as Record<string, IngredientUsage[]>
  ), [ingredients]);

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
        columns={memoizedColumns}
        data={ingredients}
        searchKey="ingredient_name"
        searchPlaceholder="Search ingredients..."
        pageSize={25}
        showPageSizeSelector={true}
        tableId="ingredients-usage"
        enableColumnReordering={true}
        enableViewManagement={true}
      />
    </div>
  );
}

