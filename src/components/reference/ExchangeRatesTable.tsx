"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/database.types";
import { format } from "date-fns";

type ExchangeRate = Database["public"]["Tables"]["exchange_rates"]["Row"] & {
  countries?: {
    country_name: string;
    currency_code: string;
  } | null;
};

const columns: ColumnDef<ExchangeRate>[] = [
  {
    id: "country_name",
    accessorFn: (row) => row.countries?.country_name || "",
    header: "Country",
    cell: ({ row }) => {
      const country = row.original.countries;
      return country?.country_name || "—";
    },
  },
  {
    accessorKey: "currency_code",
    header: "Currency",
  },
  {
    accessorKey: "exchange_rate_to_eur",
    header: "Rate to EUR",
    cell: ({ row }) => {
      const rate = row.getValue("exchange_rate_to_eur") as number;
      return rate.toFixed(6);
    },
  },
  {
    accessorKey: "effective_date",
    header: "Effective Date",
    cell: ({ row }) => {
      const date = row.getValue("effective_date") as string;
      return date ? format(new Date(date), "MMM d, yyyy") : "—";
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean;
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
];

interface ExchangeRatesTableProps {
  exchangeRates: ExchangeRate[];
}

export function ExchangeRatesTable({ exchangeRates }: ExchangeRatesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={exchangeRates}
      searchKey="country_name"
      searchPlaceholder="Search by country..."
    />
  );
}

