"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/database.types";

type EPPOCode = Database["public"]["Tables"]["eppo_codes"]["Row"];

const columns: ColumnDef<EPPOCode>[] = [
  {
    accessorKey: "eppo_code",
    header: "EPPO Code",
    cell: ({ row }) => {
      return <span className="font-mono font-medium">{row.getValue("eppo_code")}</span>;
    },
  },
  {
    accessorKey: "display_name",
    header: "Display Name",
  },
  {
    accessorKey: "latin_name",
    header: "Latin Name",
  },
  {
    accessorKey: "classification",
    header: "Classification",
    cell: ({ row }) => {
      const classification = row.getValue("classification") as string;
      const variant =
        classification === "crop"
          ? "default"
          : classification === "insect"
            ? "secondary"
            : classification === "disease"
              ? "destructive"
              : "outline";
      return <Badge variant={variant}>{classification}</Badge>;
    },
  },
  {
    accessorKey: "eppo_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("eppo_type") as string;
      const displayType = type
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return <span className="text-sm text-muted-foreground">{displayType}</span>;
    },
  },
  {
    accessorKey: "parent_eppo_code",
    header: "Parent Code",
    cell: ({ row }) => {
      const parentCode = row.getValue("parent_eppo_code") as string | null;
      return parentCode ? <span className="font-mono text-sm">{parentCode}</span> : <span className="text-muted-foreground">—</span>;
    },
  },
  {
    accessorKey: "is_parent",
    header: "Is Parent",
    cell: ({ row }) => {
      const isParent = row.getValue("is_parent") as boolean | null;
      return isParent ? (
        <Badge variant="outline">Yes</Badge>
      ) : (
        <span className="text-muted-foreground">No</span>
      );
    },
  },
];

interface EPPOCodesTableProps {
  eppoCodes: EPPOCode[];
  classification?: "crop" | "insect" | "disease" | "weed";
}

export function EPPOCodesTable({ eppoCodes, classification }: EPPOCodesTableProps) {
  const searchPlaceholder = classification
    ? `Search ${classification}s by name or code...`
    : "Search EPPO codes by name or code...";

  return (
    <DataTable
      columns={columns}
      data={eppoCodes}
      searchKey="display_name"
      searchPlaceholder={searchPlaceholder}
    />
  );
}

