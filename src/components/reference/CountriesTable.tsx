"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/database.types";

type Country = Database["public"]["Tables"]["countries"]["Row"];

// Memoize columns outside component to prevent recreation on every render
const createColumns = (): ColumnDef<Country>[] => [
  {
    accessorKey: "country_name",
    header: "Country Name",
    cell: ({ row }) => {
      const name = row.getValue("country_name") as string;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "country_code",
    header: "Code",
    cell: ({ row }) => {
      const code = row.getValue("country_code") as string | null;
      return (
        <span className="font-mono text-sm text-muted-foreground">{code || "—"}</span>
      );
    },
  },
  {
    accessorKey: "currency_code",
    header: "Currency",
    cell: ({ row }) => {
      const currency = row.getValue("currency_code") as string | null;
      return <span className="text-sm">{currency || "—"}</span>;
    },
  },
  {
    accessorKey: "has_tariffs",
    header: "Has Tariffs",
    cell: ({ row }) => {
      const hasTariffs = row.getValue("has_tariffs") as boolean | null;
      return hasTariffs ? (
        <Badge variant="default" className="text-xs">Yes</Badge>
      ) : (
        <Badge variant="outline" className="text-xs">No</Badge>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean | null;
      return isActive ? (
        <Badge variant="default" className="text-xs">Active</Badge>
      ) : (
        <Badge variant="secondary" className="text-xs">Inactive</Badge>
      );
    },
  },
];

// Memoize columns array - only recreate if needed
const columns = createColumns();

interface CountriesTableProps {
  countries: Country[];
}

export function CountriesTable({ countries }: CountriesTableProps) {
  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);

  return (
    <EnhancedDataTable
      columns={memoizedColumns}
      data={countries}
      searchKey="country_name"
      searchPlaceholder="Search countries..."
      pageSize={25}
      showPageSizeSelector={true}
      tableId="countries"
    />
  );
}
