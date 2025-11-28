"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { memo, useMemo, useState, useTransition } from "react";
import { FormulationForm } from "@/components/forms/FormulationForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EnhancedDataTable,
  type FilterConfig,
} from "@/components/ui/enhanced-data-table";
import { usePermissions } from "@/hooks/use-permissions";
import type { FormulationWithNestedData } from "@/lib/db/queries";
import type { Database } from "@/lib/supabase/database.types";

type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

const FormulationActionsCell = memo(function FormulationActionsCell({
  formulation,
  canEdit,
}: {
  formulation: FormulationWithNestedData;
  canEdit: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [formulationData, setFormulationData] =
    useState<FormulationTable | null>(null);
  const [isPending, startTransition] = useTransition();

  // Don't render if no edit permission
  if (!canEdit) {
    return null;
  }

  const handleEdit = async () => {
    if (!formulation.formulation_id) return;
    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/formulations/${formulation.formulation_id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setFormulationData(data);
          setEditOpen(true);
        } else {
          // Fallback: create minimal formulation object from view data
          const name = (
            "formulation_name" in formulation
              ? (formulation as any).formulation_name
              : "product_name" in formulation
                ? formulation.product_name
                : null
          ) as string | null;
          const category = (
            "formulation_category" in formulation
              ? (formulation as any).formulation_category
              : "product_category" in formulation
                ? formulation.product_category
                : null
          ) as string | null;
          const status = (
            "formulation_status" in formulation
              ? (formulation as any).formulation_status
              : "status" in formulation
                ? formulation.status
                : null
          ) as string | null;
          setFormulationData({
            formulation_id: formulation.formulation_id || "",
            formulation_name: name || "",
            formulation_category: category || "",
            formulation_type: formulation.formulation_type || null,
            uom: formulation.uom || "L",
            short_name: formulation.short_name || null,
            formulation_status: status || "Not Yet Considered",
            status_rationale: null,
            base_code: "",
            variant_suffix: "",
            formulation_code: formulation.formulation_code || null,
            active_signature: null,
            is_active: true,
            created_by: null,
            created_at: null,
            updated_at: null,
            formulation_readiness: "",
            formulation_readiness_notes: null,
          } as FormulationTable);
          setEditOpen(true);
        }
      } catch {
        // Fallback on error
        const name = (
          "formulation_name" in formulation
            ? (formulation as any).formulation_name
            : "product_name" in formulation
              ? formulation.product_name
              : null
        ) as string | null;
        const category = (
          "formulation_category" in formulation
            ? (formulation as any).formulation_category
            : "product_category" in formulation
              ? formulation.product_category
              : null
        ) as string | null;
        const status = (
          "formulation_status" in formulation
            ? (formulation as any).formulation_status
            : "status" in formulation
              ? formulation.status
              : null
        ) as string | null;
        setFormulationData({
          formulation_id: formulation.formulation_id || "",
          formulation_name: name || "",
          formulation_category: category || "",
          formulation_type: formulation.formulation_type || null,
          uom: formulation.uom || "L",
          short_name: formulation.short_name || null,
          formulation_status: status || "Not Yet Considered",
          status_rationale: null,
          base_code: "",
          variant_suffix: "",
          formulation_code: formulation.formulation_code || null,
          active_signature: null,
          is_active: true,
          created_by: null,
          created_at: null,
          updated_at: null,
          formulation_readiness: "",
          formulation_readiness_notes: null,
        } as FormulationTable);
        setEditOpen(true);
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEdit}
          className="h-8 w-8 p-0"
          disabled={isPending}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      {formulationData && (
        <FormulationForm
          formulation={formulationData}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSuccess={() => {
            setEditOpen(false);
            setFormulationData(null);
          }}
        />
      )}
    </>
  );
});

// Memoize columns outside component to prevent recreation on every render
const createColumns = (
  canEdit: boolean,
): ColumnDef<FormulationWithNestedData>[] => {
  const cols: ColumnDef<FormulationWithNestedData>[] = [
    {
      accessorKey: "formulation_code",
      header: "Code",
      cell: ({ row }) => {
        const code = row.getValue("formulation_code") as string;
        const id = row.original.formulation_id;
        return (
          <Link
            href={`/portfolio/formulations/${id}`}
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
        const formulation = row.original;
        const name = (
          "formulation_name" in formulation
            ? (formulation as any).formulation_name
            : "product_name" in formulation
              ? formulation.product_name
              : null
        ) as string | null;
        const id = formulation.formulation_id;
        return (
          <Link
            href={`/portfolio/formulations/${id}`}
            className="text-primary hover:underline"
          >
            {name || "—"}
          </Link>
        );
      },
    },
    {
      accessorKey: "short_name",
      header: "Short Name",
      cell: ({ row }) => {
        const shortName = row.getValue("short_name") as string | null;
        return (
          <span className="text-sm text-muted-foreground">
            {shortName || "—"}
          </span>
        );
      },
    },
    {
      accessorKey: "product_category",
      header: "Category",
      cell: ({ row }) => {
        const formulation = row.original;
        const category = (
          "formulation_category" in formulation
            ? (formulation as any).formulation_category
            : "product_category" in formulation
              ? formulation.product_category
              : null
        ) as string | null;
        return <span>{category || "—"}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const formulation = row.original;
        const status = (
          "formulation_status" in formulation
            ? (formulation as any).formulation_status
            : "status" in formulation
              ? formulation.status
              : null
        ) as string | null;
        const statusValue = status || "Not Yet Considered";
        return (
          <Badge variant={(statusColors[statusValue] as any) || "secondary"}>
            {statusValue}
          </Badge>
        );
      },
    },
    // Roll-up columns from sub-items
    {
      accessorKey: "countries_count",
      header: "Countries",
      cell: ({ row }) => {
        const count = row.original.countries_count;
        return (
          <span className="font-medium text-center block">{count || 0}</span>
        );
      },
      meta: {
        align: "center",
      },
    },
    {
      accessorKey: "use_groups_count",
      header: "Use Groups",
      cell: ({ row }) => {
        const count = row.original.use_groups_count;
        return (
          <span className="font-medium text-center block">{count || 0}</span>
        );
      },
      meta: {
        align: "center",
      },
    },
    {
      accessorKey: "total_revenue",
      header: "Total Revenue",
      cell: ({ row }) => {
        const revenue = row.original.total_revenue;
        if (!revenue) return <span className="text-muted-foreground">—</span>;
        return (
          <span className="font-medium">€{(revenue / 1000).toFixed(0)}K</span>
        );
      },
      meta: {
        align: "right",
      },
    },
    {
      accessorKey: "total_margin",
      header: "Total Margin",
      cell: ({ row }) => {
        const margin = row.original.total_margin;
        if (!margin) return <span className="text-muted-foreground">—</span>;
        return (
          <span className="font-medium">€{(margin / 1000).toFixed(0)}K</span>
        );
      },
      meta: {
        align: "right",
      },
    },
  ];

  // Only add actions column if user can edit
  if (canEdit) {
    cols.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <FormulationActionsCell formulation={row.original} canEdit={canEdit} />
      ),
    });
  }

  return cols;
};

interface FormulationsListWithActionsProps {
  formulations: FormulationWithNestedData[];
}

// Filter configurations for the formulations table
const filterConfigs: FilterConfig<FormulationWithNestedData>[] = [
  {
    columnKey: "product_category",
    label: "Category",
    paramKey: "categories",
    getValue: (row) =>
      "formulation_category" in row
        ? (row as any).formulation_category
        : "product_category" in row
          ? row.product_category
          : null,
  },
  {
    columnKey: "status",
    label: "Status",
    paramKey: "statuses",
    getValue: (row) =>
      "formulation_status" in row
        ? (row as any).formulation_status
        : "status" in row
          ? row.status
          : null,
  },
  {
    columnKey: "formulation_type",
    label: "Type",
    paramKey: "types",
  },
];

export function FormulationsListWithActions({
  formulations,
}: FormulationsListWithActionsProps) {
  const { canEditFormulations, isLoading } = usePermissions();

  // Memoize columns to prevent recreation
  const columns = useMemo(
    () => createColumns(canEditFormulations),
    [canEditFormulations],
  );

  return (
    <EnhancedDataTable
      columns={columns}
      data={formulations}
      searchKey="product_name"
      searchPlaceholder="Search formulations..."
      pageSize={25}
      showPageSizeSelector={true}
      tableId="formulations"
      enableUrlPagination={true}
      filterConfigs={filterConfigs}
    />
  );
}
