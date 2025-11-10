"use client";

import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import type { Database } from "@/lib/supabase/database.types";

type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];

const columns: ColumnDef<COGS>[] = [
  {
    accessorKey: "formulation_code",
    header: "Formulation Code",
  },
  {
    accessorKey: "formulation_name",
    header: "Formulation",
  },
  {
    accessorKey: "country_name",
    header: "Country",
    cell: ({ row }) => {
      const countryName = row.getValue("country_name") as string | null;
      const countryCode = row.original.country_code;
      if (!countryName) {
        return <Badge variant="outline">Global</Badge>;
      }
      return (
        <div>
          <div>{countryName}</div>
          {countryCode && (
            <div className="text-xs text-muted-foreground">{countryCode}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "is_country_specific",
    header: "Type",
    cell: ({ row }) => {
      const isCountrySpecific = row.getValue("is_country_specific") as boolean;
      return isCountrySpecific ? (
        <Badge variant="default">Country-Specific</Badge>
      ) : (
        <Badge variant="secondary">Global</Badge>
      );
    },
  },
  {
    accessorKey: "fiscal_year",
    header: "Fiscal Year",
  },
  {
    accessorKey: "cogs_value",
    header: "Total COGS",
    cell: ({ row }) => {
      const value = row.getValue("cogs_value") as number | null;
      return value
        ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "—";
    },
  },
  {
    accessorKey: "raw_material_cost",
    header: "Raw Materials",
    cell: ({ row }) => {
      const value = row.getValue("raw_material_cost") as number | null;
      return value
        ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "—";
    },
  },
  {
    accessorKey: "manufacturing_cost",
    header: "Manufacturing",
    cell: ({ row }) => {
      const value = row.getValue("manufacturing_cost") as number | null;
      return value
        ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "—";
    },
  },
  {
    accessorKey: "packaging_cost",
    header: "Packaging",
    cell: ({ row }) => {
      const value = row.getValue("packaging_cost") as number | null;
      return value
        ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "—";
    },
  },
  {
    accessorKey: "other_costs",
    header: "Other Costs",
    cell: ({ row }) => {
      const value = row.getValue("other_costs") as number | null;
      return value
        ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : "—";
    },
  },
  {
    accessorKey: "last_updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.getValue("last_updated_at") as string | null;
      return date ? new Date(date).toLocaleDateString() : "—";
    },
  },
  {
    accessorKey: "last_updated_by",
    header: "Updated By",
  },
];

interface COGSListProps {
  cogs: COGS[];
}

export function COGSList({ cogs }: COGSListProps) {
  return (
    <EnhancedDataTable
      columns={columns}
      data={cogs}
      searchKey="formulation_name"
      searchPlaceholder="Search COGS..."
      pageSize={25}
      showPageSizeSelector={true}
    />
  );
}

