"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/supabase/database.types";
import { format } from "date-fns";

type ExchangeRate = Database["public"]["Tables"]["exchange_rates"]["Row"] & {
  countries?: {
    country_name: string;
    currency_code: string;
  } | null;
};

// Memoize columns outside component to prevent recreation on every render
const createColumns = (): ColumnDef<ExchangeRate>[] => [
  {
    id: "country_name",
    accessorFn: (row) => row.countries?.country_name || "",
    header: "Country",
    cell: ({ row }) => {
      const country = row.original.countries;
      return (
        <span className="font-medium">{country?.country_name || "—"}</span>
      );
    },
  },
  {
    accessorKey: "currency_code",
    header: "Currency",
    cell: ({ row }) => {
      const currency = row.getValue("currency_code") as string | null;
      return (
        <span className="font-mono text-sm text-muted-foreground">
          {currency || "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "exchange_rate_to_eur",
    header: "Rate to EUR",
    cell: ({ row }) => {
      const rate = row.getValue("exchange_rate_to_eur") as number | null;
      return rate ? (
        <div className="text-right">
          <span className="text-sm font-medium">{rate.toFixed(6)}</span>
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "effective_date",
    header: "Effective Date",
    cell: ({ row }) => {
      const date = row.getValue("effective_date") as string | null;
      return date ? (
        <span className="text-sm">{format(new Date(date), "MMM d, yyyy")}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active") as boolean | null;
      return isActive ? (
        <Badge variant="default" className="text-xs">
          Active
        </Badge>
      ) : (
        <Badge variant="secondary" className="text-xs">
          Inactive
        </Badge>
      );
    },
  },
];

// Memoize columns array - only recreate if needed
const columns = createColumns();

interface ExchangeRatesTableProps {
  exchangeRates: ExchangeRate[];
}

export function ExchangeRatesTable({ exchangeRates }: ExchangeRatesTableProps) {
  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);

  return (
    <EnhancedDataTable
      columns={memoizedColumns}
      data={exchangeRates}
      searchKey="country_name"
      searchPlaceholder="Search by country..."
      pageSize={25}
      showPageSizeSelector={true}
      tableId="exchange-rates"
    />
  );
}
