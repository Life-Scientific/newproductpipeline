"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  EnhancedDataTable,
  type FilterConfig,
} from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { getStatusVariant } from "@/lib/design-system";
import { TableUtils } from "@/lib/utils/table-utils";
import { Package } from "lucide-react";

interface FormulationIngredient {
  formulation_ingredient_id: string;
  quantity: number | null;
  quantity_unit: string | null;
  formulations: {
    formulation_id: string;
    formulation_code: string | null;
    formulation_name: string | null;
    formulation_category: string | null;
    formulation_status: string | null;
  } | null;
}

// Flatten the data for the table
interface FlatFormulation {
  id: string;
  formulation_id: string;
  formulation_code: string;
  formulation_name: string;
  formulation_category: string;
  formulation_status: string;
  quantity: number | null;
  quantity_unit: string | null;
}

const createColumns = (): ColumnDef<FlatFormulation>[] => [
  {
    accessorKey: "formulation_code",
    header: "Code",
    meta: { sticky: "left", minWidth: "120px" },
    cell: ({ row }) => {
      const code = row.getValue("formulation_code") as string;
      const id = row.original.formulation_id;
      return (
        <Link
          href={`/portfolio/formulations/${id}`}
          className="text-primary hover:underline font-medium text-sm"
        >
          {code || "—"}
        </Link>
      );
    },
  },
  {
    accessorKey: "formulation_name",
    header: "Product Name",
    meta: { minWidth: "200px" },
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("formulation_name") || "—"}</span>
    ),
  },
  {
    accessorKey: "formulation_category",
    header: "Category",
    meta: { minWidth: "120px" },
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.getValue("formulation_category") || "—"}
      </Badge>
    ),
  },
  {
    accessorKey: "formulation_status",
    header: "Status",
    meta: { minWidth: "130px" },
    cell: ({ row }) => {
      const status = row.getValue("formulation_status") as string;
      return (
        <Badge
          variant={getStatusVariant(status || "", "formulation")}
          className="text-xs"
        >
          {status || "—"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    meta: { minWidth: "100px", align: "right" },
    cell: ({ row }) => {
      const qty = row.getValue("quantity") as number | null;
      return (
        <div className="text-right text-sm font-medium">
          {qty
            ? qty.toLocaleString(undefined, { maximumFractionDigits: 2 })
            : "—"}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity_unit",
    header: "Unit",
    meta: { minWidth: "80px" },
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("quantity_unit") || "—"}
      </span>
    ),
  },
];

const columns = createColumns();

const filterConfigs: FilterConfig<FlatFormulation>[] = [
  {
    columnKey: "formulation_status",
    label: "Status",
    paramKey: "status",
  },
  {
    columnKey: "formulation_category",
    label: "Category",
    paramKey: "category",
  },
];

interface IngredientFormulationsTableProps {
  formulations: FormulationIngredient[];
}

export function IngredientFormulationsTable({
  formulations,
}: IngredientFormulationsTableProps) {
  // Flatten and filter the data
  const flatData = useMemo(() => {
    return formulations
      .filter((fi) => fi.formulations)
      .map((fi) => ({
        id: fi.formulation_ingredient_id,
        formulation_id: fi.formulations!.formulation_id,
        formulation_code: fi.formulations!.formulation_code || "",
        formulation_name: fi.formulations!.formulation_name || "",
        formulation_category: fi.formulations!.formulation_category || "",
        formulation_status: fi.formulations!.formulation_status || "",
        quantity: fi.quantity,
        quantity_unit: fi.quantity_unit,
      }));
  }, [formulations]);

  if (flatData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No formulations found using this ingredient.</p>
      </div>
    );
  }

  return (
    <EnhancedDataTable
      columns={columns}
      data={flatData}
      searchKey="formulation_name"
      searchPlaceholder="Search formulations..."
      pageSize={10}
      showPageSizeSelector={true}
      tableId="ingredient-formulations"
      filterConfigs={filterConfigs}
      showFilterCount={true}
    />
  );
}
