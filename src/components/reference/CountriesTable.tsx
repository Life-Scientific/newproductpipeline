"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { Database } from "@/lib/supabase/database.types";

type Country = Database["public"]["Tables"]["countries"]["Row"];

const columns: ColumnDef<Country>[] = [
  {
    accessorKey: "country_name",
    header: "Country",
  },
  {
    accessorKey: "country_code",
    header: "Code",
  },
  {
    accessorKey: "currency_code",
    header: "Currency",
  },
  {
    accessorKey: "has_tariffs",
    header: "Has Tariffs",
    cell: ({ row }) => {
      const hasTariffs = row.getValue("has_tariffs") as boolean | null;
      return hasTariffs ? "Yes" : "No";
    },
  },
];

interface CountriesTableProps {
  countries: Country[];
}

export function CountriesTable({ countries }: CountriesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={countries}
      searchKey="country_name"
      searchPlaceholder="Search countries..."
    />
  );
}

