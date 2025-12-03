"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/lib/supabase/database.types";
import { getStatusVariant } from "@/lib/design-system";

type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface CountryFormulationsTableProps {
  formulations: FormulationCountryDetail[];
  countryName: string;
}

export function CountryFormulationsTable({ formulations, countryName }: CountryFormulationsTableProps) {
  const columns = useMemo<ColumnDef<FormulationCountryDetail>[]>(() => [
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
        const name = row.getValue("product_name") as string | null;
        return <span className="text-sm">{name || "—"}</span>;
      },
    },
    {
      accessorKey: "product_category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("product_category") as string | null;
        return <span className="text-sm">{category || "—"}</span>;
      },
    },
    {
      accessorKey: "country_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("country_status") as string | null;
        if (!status) return <span className="text-sm text-muted-foreground">Not Started</span>;
        return (
          <Badge variant={getStatusVariant(status, 'registration')}>
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
        const fy = row.original.target_market_entry_fy;
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
        const pathway = row.original.likely_registration_pathway;
        if (!pathway) return <span className="text-sm text-muted-foreground">—</span>;
        return <span className="text-xs">{pathway}</span>;
      },
    },
  ], []);

  return (
    <Card>
      <CardHeader className="space-y-1.5">
        <CardTitle>Formulations in {countryName}</CardTitle>
        <CardDescription>
          {formulations.length} formulation{formulations.length !== 1 ? "s" : ""} registered or targeted for this country
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EnhancedDataTable
          columns={columns}
          data={formulations}
          searchKey="formulation_code"
          searchPlaceholder="Search formulations..."
          pageSize={10}
          showPageSizeSelector={true}
          tableId="country-formulations"
        />
      </CardContent>
    </Card>
  );
}








