"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/database.types";

type EPPOCode = Database["public"]["Tables"]["eppo_codes"]["Row"];

// Memoize columns outside component to prevent recreation on every render
const createColumns = (): ColumnDef<EPPOCode>[] => [
  {
    accessorKey: "eppo_code",
    header: "EPPO Code",
    cell: ({ row }) => {
      return (
        <span className="font-mono font-medium text-sm">{row.getValue("eppo_code") as string}</span>
      );
    },
  },
  {
    accessorKey: "display_name",
    header: "Display Name",
    cell: ({ row }) => {
      const name = row.getValue("display_name") as string | null;
      return <span className="font-medium">{name || "—"}</span>;
    },
  },
  {
    accessorKey: "latin_name",
    header: "Latin Name",
    cell: ({ row }) => {
      const name = row.getValue("latin_name") as string | null;
      return <span className="text-sm italic text-muted-foreground">{name || "—"}</span>;
    },
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
      return <Badge variant={variant} className="text-xs">{classification}</Badge>;
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
      return parentCode ? (
        <span className="font-mono text-sm text-muted-foreground">{parentCode}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "is_parent",
    header: "Is Parent",
    cell: ({ row }) => {
      const isParent = row.getValue("is_parent") as boolean | null;
      return isParent ? (
        <Badge variant="outline" className="text-xs">Yes</Badge>
      ) : (
        <span className="text-sm text-muted-foreground">No</span>
      );
    },
  },
];

// Memoize columns array - only recreate if needed
const columns = createColumns();

interface EPPOCodesTableProps {
  eppoCodes: EPPOCode[];
  classification?: "crop" | "insect" | "disease" | "weed";
}

export function EPPOCodesTable({ eppoCodes, classification }: EPPOCodesTableProps) {
  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);
  
  const searchPlaceholder = classification
    ? `Search ${classification}s by name or code...`
    : "Search EPPO codes by name or code...";

  return (
    <EnhancedDataTable
      columns={memoizedColumns}
      data={eppoCodes}
      searchKey="display_name"
      searchPlaceholder={searchPlaceholder}
      pageSize={25}
      showPageSizeSelector={true}
      tableId={`eppo-codes-${classification || "all"}`}
    />
  );
}
