"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import { FormulationCountryEditModal } from "@/components/formulations/FormulationCountryEditModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EnhancedDataTable,
  type FilterConfig,
} from "@/components/ui/enhanced-data-table";
import { usePermissions } from "@/hooks/use-permissions";
import { getStatusVariant } from "@/lib/design-system";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountryDetail =
  Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface FormulationCountriesListProps {
  countries: FormulationCountryDetail[];
}

// Memoized action cell component
const FormulationCountryActionCell = memo(
  function FormulationCountryActionCell({
    countryId,
    onEdit,
  }: {
    countryId: string;
    onEdit: (id: string) => void;
  }) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(countryId)}
        className="h-8 w-8 p-0"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    );
  },
);

// Memoize columns creation function - takes onEdit callback and permission flag
const createColumns = (
  onEdit: (id: string) => void,
  canEdit: boolean,
): ColumnDef<FormulationCountryDetail>[] => [
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
            <span className="text-xs text-muted-foreground">
              ({countryCode})
            </span>
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
      if (!status)
        return <span className="text-sm text-muted-foreground">—</span>;
      return (
        <Badge variant={getStatusVariant(status, "country")}>{status}</Badge>
      );
    },
  },
  {
    accessorKey: "readiness",
    header: "Readiness",
    cell: ({ row }) => {
      const readiness = row.getValue("readiness") as string | null;
      if (!readiness)
        return <span className="text-sm text-muted-foreground">—</span>;
      return (
        <Badge variant={getStatusVariant(readiness, "country")}>
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
      if (!pathway)
        return <span className="text-sm text-muted-foreground">—</span>;
      return <span className="text-xs">{pathway}</span>;
    },
  },
  ...(canEdit
    ? [
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }: { row: { original: FormulationCountryDetail } }) => {
            return (
              <FormulationCountryActionCell
                countryId={row.original.formulation_country_id || ""}
                onEdit={onEdit}
              />
            );
          },
        },
      ]
    : []),
];

// Filter configurations for the formulation-countries table
const filterConfigs: FilterConfig<FormulationCountryDetail>[] = [
  {
    columnKey: "formulation_code",
    label: "Formulation",
    paramKey: "formulations",
    getLabel: (value) => value, // Could enhance to show product name
  },
  {
    columnKey: "country_name",
    label: "Country",
    paramKey: "countries",
  },
  {
    columnKey: "country_status",
    label: "Status",
    paramKey: "statuses",
  },
  {
    columnKey: "readiness",
    label: "Readiness",
    paramKey: "readiness",
  },
  {
    columnKey: "likely_registration_pathway",
    label: "Pathway",
    paramKey: "pathways",
  },
];

export function FormulationCountriesList({
  countries,
}: FormulationCountriesListProps) {
  const router = useRouter();
  const { canEditFormulationCountries, isLoading: permissionsLoading } =
    usePermissions();
  const [editingCountryId, setEditingCountryId] = useState<string | null>(null);
  const editingCountry = countries.find(
    (c) => c.formulation_country_id === editingCountryId,
  );

  // Memoize the edit handler
  const handleEdit = useCallback((id: string) => {
    setEditingCountryId(id);
  }, []);

  // Memoize columns with the edit handler and permission
  const columns = useMemo(
    () =>
      createColumns(
        handleEdit,
        canEditFormulationCountries && !permissionsLoading,
      ),
    [handleEdit, canEditFormulationCountries, permissionsLoading],
  );

  // Memoize columns array to prevent recreation
  const memoizedColumns = useMemo(() => columns, [columns]);

  return (
    <>
      <EnhancedDataTable
        columns={memoizedColumns}
        data={countries}
        searchKey="country_name"
        searchPlaceholder="Search countries..."
        pageSize={25}
        showPageSizeSelector={true}
        tableId="formulation-countries"
        enableUrlPagination={true}
        filterConfigs={filterConfigs}
      />

      {editingCountry && (
        <FormulationCountryEditModal
          formulationCountry={{
            formulation_country_id: editingCountry.formulation_country_id || "",
            country_status: editingCountry.country_status || null,
            country_readiness: editingCountry.readiness || null,
            country_readiness_notes: null, // Not in view, would need to fetch separately if needed
            likely_registration_pathway:
              editingCountry.likely_registration_pathway || null,
            earliest_market_entry_date:
              editingCountry.earliest_market_entry_date || null,
            is_novel: ("is_novel" in editingCountry
              ? (editingCountry as any).is_novel
              : null) as boolean | null,
            is_eu_approved_formulation: ("is_eu_approved_formulation" in
            editingCountry
              ? (editingCountry as any).is_eu_approved_formulation
              : null) as boolean | null,
            is_active: ("is_active" in editingCountry
              ? (editingCountry as any).is_active
              : true) as boolean | null,
            country_name: editingCountry.country_name || undefined,
            formulation_name:
              ("product_name" in editingCountry
                ? (editingCountry as any).product_name
                : "formulation_code" in editingCountry
                  ? (editingCountry as any).formulation_code
                  : null) ||
              ("formulation_code" in editingCountry
                ? (editingCountry as any).formulation_code
                : null) ||
              undefined,
          }}
          open={!!editingCountryId}
          onOpenChange={(open) => {
            if (!open) setEditingCountryId(null);
          }}
          onSuccess={() => {
            setEditingCountryId(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
