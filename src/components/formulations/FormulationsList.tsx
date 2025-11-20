"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

const columns: ColumnDef<Formulation>[] = [
  {
    accessorKey: "formulation_code",
    header: "Code",
    cell: ({ row }) => {
      const code = row.getValue("formulation_code") as string;
      const id = row.original.formulation_id;
      return (
        <Link
          href={`/formulations/${id}`}
          className="font-medium text-primary hover:underline"
        >
          {code || "—"}
        </Link>
      );
    },
  },
  {
    accessorKey: "product_name",
    header: "Product Name",
    cell: ({ row }) => {
      const name = row.getValue("product_name") as string;
      const id = row.original.formulation_id;
      return (
        <Link
          href={`/formulations/${id}`}
          className="font-medium text-primary hover:underline"
        >
          {name || "—"}
        </Link>
      );
    },
  },
  {
    accessorKey: "short_name",
    header: "Short Name",
    cell: ({ row }) => {
      const shortName = row.getValue("short_name") as string | null;
      return <span className="text-sm text-muted-foreground">{shortName || "—"}</span>;
    },
  },
  {
    accessorKey: "product_category",
    header: "Category",
  },
  {
    accessorKey: "formulation_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("formulation_type") as string | null;
      return <span className="text-sm">{type || "—"}</span>;
    },
  },
  {
    accessorKey: "uom",
    header: "UOM",
    cell: ({ row }) => {
      const uom = row.getValue("uom") as string | null;
      return <span className="text-sm">{uom || "—"}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Link
          href={`/formulations?status=${encodeURIComponent(status)}`}
          className="inline-block"
        >
          <Badge
            variant={statusColors[status] as any || "secondary"}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            {status}
          </Badge>
        </Link>
      );
    },
  },
  {
    accessorKey: "active_ingredients",
    header: "Active Ingredients",
    cell: ({ row }) => {
      const ingredients = row.getValue("active_ingredients") as string | null;
      return (
        <span className="text-sm text-muted-foreground">
          {ingredients || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string | null;
      return date ? new Date(date).toLocaleDateString() : "—";
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }) => {
      const date = row.getValue("updated_at") as string | null;
      return date ? new Date(date).toLocaleDateString() : "—";
    },
  },
];

interface FormulationsListProps {
  formulations: Formulation[];
}

export function FormulationsList({ formulations }: FormulationsListProps) {
  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);

  return (
    <EnhancedDataTable
      columns={memoizedColumns}
      data={formulations}
      searchKey="product_name"
      searchPlaceholder="Search formulations..."
      pageSize={25}
      showPageSizeSelector={true}
      tableId="formulations"
      enableColumnReordering={true}
      enableViewManagement={true}
    />
  );
}
