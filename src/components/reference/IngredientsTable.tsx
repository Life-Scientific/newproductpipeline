"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { Database } from "@/lib/supabase/database.types";

type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "ingredient_name",
    header: "Ingredient",
  },
  {
    accessorKey: "ingredient_type",
    header: "Type",
  },
  {
    accessorKey: "cas_number",
    header: "CAS Number",
  },
  {
    accessorKey: "supply_risk",
    header: "Supply Risk",
  },
  {
    accessorKey: "is_eu_approved",
    header: "EU Approved",
    cell: ({ row }) => {
      const approved = row.getValue("is_eu_approved") as boolean | null;
      return approved ? "Yes" : "No";
    },
  },
];

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

export function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={ingredients}
      searchKey="ingredient_name"
      searchPlaceholder="Search ingredients..."
    />
  );
}

