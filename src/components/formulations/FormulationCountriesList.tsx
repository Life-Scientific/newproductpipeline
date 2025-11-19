"use client";

import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import type { Database } from "@/lib/supabase/database.types";
import { getStatusVariant } from "@/lib/design-system";

type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface FormulationCountriesListProps {
  countries: FormulationCountryDetail[];
}

export function FormulationCountriesList({ countries }: FormulationCountriesListProps) {
  const columns: ColumnDef<FormulationCountryDetail>[] = [
    {
      accessorKey: "formulation_code",
      header: "Formulation Code",
      cell: ({ row }) => {
        const code = row.getValue("formulation_code") as string;
        const id = row.original.formulation_country_id;
        return (
          <Link
            href={`/formulation-countries/${id}`}
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
        const productName = row.getValue("product_name") as string | null;
        return <span className="text-sm">{productName || "—"}</span>;
      },
    },
    {
      accessorKey: "country_name",
      header: "Country",
      cell: ({ row }) => {
        const countryName = row.getValue("country_name") as string | null;
        const countryCode = row.original.country_code;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{countryName || "—"}</span>
            {countryCode && (
              <span className="text-xs text-muted-foreground">({countryCode})</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "country_status",
      header: "Country Status",
      cell: ({ row }) => {
        const status = row.getValue("country_status") as string | null;
        if (!status) return <span className="text-sm text-muted-foreground">—</span>;
        return (
          <Badge variant={getStatusVariant(status, 'country')}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "readiness",
      header: "Readiness",
      cell: ({ row }) => {
        const readiness = row.getValue("readiness") as string | null;
        if (!readiness) return <span className="text-sm text-muted-foreground">—</span>;
        return (
          <Badge variant={getStatusVariant(readiness, 'country')}>
            {readiness}
          </Badge>
        );
      },
    },
    {
      accessorKey: "target_market_entry_fy",
      header: "Target FY",
      cell: ({ row }) => {
        const fy = row.original.target_market_entry_fy as string | null;
        return <span className="text-sm">{fy || "—"}</span>;
      },
    },
    {
      accessorKey: "earliest_market_entry_date",
      header: "EMD",
      cell: ({ row }) => {
        const emd = row.original.earliest_market_entry_date;
        if (!emd) return <span className="text-sm text-muted-foreground">—</span>;
        try {
          const date = new Date(emd);
          return <span className="text-sm">{date.toLocaleDateString()}</span>;
        } catch {
          return <span className="text-sm text-muted-foreground">—</span>;
        }
      },
    },
    {
      accessorKey: "likely_registration_pathway",
      header: "Pathway",
      cell: ({ row }) => {
        const pathway = row.original.likely_registration_pathway as string | null;
        if (!pathway) return <span className="text-sm text-muted-foreground">—</span>;
        return <span className="text-xs">{pathway}</span>;
      },
    },
  ];

  return (
    <EnhancedDataTable
      columns={columns}
      data={countries}
      searchKey="country_name"
      searchPlaceholder="Search countries..."
      pageSize={25}
      showPageSizeSelector={true}
    />
  );
}
