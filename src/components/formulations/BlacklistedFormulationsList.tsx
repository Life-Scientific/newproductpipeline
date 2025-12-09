"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Tables"]["formulations"]["Row"];

const columns: ColumnDef<Formulation>[] = [
  {
    accessorKey: "formulation_code",
    header: "Code",
    cell: ({ row }) => {
      const code = row.getValue("formulation_code") as string | null;
      return <span className="font-mono font-medium">{code || "—"}</span>;
    },
  },
  {
    accessorKey: "formulation_name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("formulation_name") as string;
      return <span className="text-sm">{name || "—"}</span>;
    },
  },
  {
    accessorKey: "base_code",
    header: "Base Code",
    cell: ({ row }) => {
      const baseCode = row.getValue("base_code") as string | null;
      return (
        <span className="font-mono text-sm text-muted-foreground">
          {baseCode || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "variant_suffix",
    header: "Variant",
    cell: ({ row }) => {
      const variant = row.getValue("variant_suffix") as string | null;
      return (
        <span className="font-mono text-sm text-muted-foreground">
          {variant || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "formulation_category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("formulation_category") as string | null;
      return <span className="text-sm">{category || "—"}</span>;
    },
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
    accessorKey: "formulation_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("formulation_status") as string;
      return (
        <Badge variant="destructive" className="text-xs">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "formulation_readiness",
    header: "Readiness",
    cell: ({ row }) => {
      const readiness = row.getValue("formulation_readiness") as string | null;
      return (
        <span className="text-sm text-muted-foreground">
          {readiness || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "status_rationale",
    header: "Rationale",
    cell: ({ row }) => {
      const rationale = row.getValue("status_rationale") as string | null;
      return (
        <span
          className="text-sm text-muted-foreground max-w-md truncate block"
          title={rationale || undefined}
        >
          {rationale || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string | null;
      return date ? (
        <span className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </span>
      ) : (
        "—"
      );
    },
  },
];

interface BlacklistedFormulationsListProps {
  formulations: Formulation[];
}

export function BlacklistedFormulationsList({
  formulations,
}: BlacklistedFormulationsListProps) {
  return (
    <DataTable
      columns={columns}
      data={formulations}
      searchKey="formulation_name"
      searchPlaceholder="Search by code or name..."
    />
  );
}
