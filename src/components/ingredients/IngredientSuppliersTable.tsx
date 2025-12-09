"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  EnhancedDataTable,
  type FilterConfig,
} from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { Building2 } from "lucide-react";

interface IngredientSupplier {
  ingredient_id: string;
  supplier_id: string;
  is_primary: boolean | null;
  cost_per_kg: number | null;
  suppliers: {
    supplier_name: string | null;
    supplier_code: string | null;
    countries: {
      country_name: string | null;
      country_code: string | null;
    } | null;
  } | null;
}

// Flatten the data for the table
interface FlatSupplier {
  id: string;
  supplier_name: string;
  supplier_code: string;
  country: string;
  is_primary: boolean;
  cost_per_kg: number | null;
}

const createColumns = (): ColumnDef<FlatSupplier>[] => [
  {
    accessorKey: "supplier_name",
    header: "Supplier Name",
    meta: { sticky: "left", minWidth: "180px" },
    cell: ({ row }) => (
      <span className="font-medium text-sm">
        {row.getValue("supplier_name") || "—"}
      </span>
    ),
  },
  {
    accessorKey: "supplier_code",
    header: "Code",
    meta: { minWidth: "100px" },
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.getValue("supplier_code") || "—"}
      </span>
    ),
  },
  {
    accessorKey: "country",
    header: "Country",
    meta: { minWidth: "140px" },
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("country") || "—"}</span>
    ),
  },
  {
    accessorKey: "is_primary",
    header: "Primary",
    meta: { minWidth: "100px" },
    cell: ({ row }) => {
      const isPrimary = row.getValue("is_primary") as boolean;
      return isPrimary ? (
        <Badge variant="default" className="text-xs">
          Primary
        </Badge>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "cost_per_kg",
    header: "Cost per kg",
    meta: { minWidth: "120px", align: "right" },
    cell: ({ row }) => {
      const cost = row.getValue("cost_per_kg") as number | null;
      return (
        <div className="text-right">
          {cost ? (
            <span className="text-sm font-medium">
              €
              {Number(cost).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">—</span>
          )}
        </div>
      );
    },
  },
];

const columns = createColumns();

const filterConfigs: FilterConfig<FlatSupplier>[] = [
  {
    columnKey: "country",
    label: "Country",
    paramKey: "country",
  },
  {
    columnKey: "is_primary",
    label: "Primary",
    paramKey: "primary",
    getValue: (row) => (row.is_primary ? "Yes" : "No"),
  },
];

interface IngredientSuppliersTableProps {
  suppliers: IngredientSupplier[];
}

export function IngredientSuppliersTable({
  suppliers,
}: IngredientSuppliersTableProps) {
  // Flatten and filter the data
  const flatData = useMemo(() => {
    return suppliers
      .filter((is) => is.suppliers)
      .map((is) => ({
        id: `${is.ingredient_id}-${is.supplier_id}`,
        supplier_name: is.suppliers!.supplier_name || "",
        supplier_code: is.suppliers!.supplier_code || "",
        country:
          is.suppliers!.countries?.country_name ||
          is.suppliers!.countries?.country_code ||
          "",
        is_primary: is.is_primary || false,
        cost_per_kg: is.cost_per_kg,
      }));
  }, [suppliers]);

  if (flatData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No suppliers found for this ingredient.</p>
      </div>
    );
  }

  return (
    <EnhancedDataTable
      columns={columns}
      data={flatData}
      searchKey="supplier_name"
      searchPlaceholder="Search suppliers..."
      pageSize={10}
      showPageSizeSelector={true}
      tableId="ingredient-suppliers"
      filterConfigs={filterConfigs}
      showFilterCount={true}
    />
  );
}
