"use client";

import { useState, useTransition, useMemo, memo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { FormulationForm } from "@/components/forms/FormulationForm";
import { usePermissions } from "@/hooks/use-permissions";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

const FormulationActionsCell = memo(function FormulationActionsCell({ 
  formulation,
  canEdit 
}: { 
  formulation: Formulation;
  canEdit: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [formulationData, setFormulationData] = useState<FormulationTable | null>(null);
  const [isPending, startTransition] = useTransition();

  // Don't render if no edit permission
  if (!canEdit) {
    return null;
  }

  const handleEdit = async () => {
    if (!formulation.formulation_id) return;
    startTransition(async () => {
      try {
        const res = await fetch(`/api/formulations/${formulation.formulation_id}`);
        if (res.ok) {
          const data = await res.json();
          setFormulationData(data);
          setEditOpen(true);
        } else {
          // Fallback: create minimal formulation object from view data
          const name = ("formulation_name" in formulation ? (formulation as any).formulation_name : ("product_name" in formulation ? formulation.product_name : null)) as string | null;
          const category = ("formulation_category" in formulation ? (formulation as any).formulation_category : ("product_category" in formulation ? formulation.product_category : null)) as string | null;
          const status = ("formulation_status" in formulation ? (formulation as any).formulation_status : ("status" in formulation ? formulation.status : null)) as string | null;
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
        const name = ("formulation_name" in formulation ? (formulation as any).formulation_name : ("product_name" in formulation ? formulation.product_name : null)) as string | null;
        const category = ("formulation_category" in formulation ? (formulation as any).formulation_category : ("product_category" in formulation ? formulation.product_category : null)) as string | null;
        const status = ("formulation_status" in formulation ? (formulation as any).formulation_status : ("status" in formulation ? formulation.status : null)) as string | null;
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
const createColumns = (canEdit: boolean): ColumnDef<Formulation>[] => {
  const cols: ColumnDef<Formulation>[] = [
    {
      accessorKey: "formulation_code",
      header: "Code",
      cell: ({ row }) => {
        const code = row.getValue("formulation_code") as string;
        const id = row.original.formulation_id;
        return (
          <Link
            href={`/formulations/${id}`}
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
        const name = ("formulation_name" in formulation ? (formulation as any).formulation_name : ("product_name" in formulation ? formulation.product_name : null)) as string | null;
        const id = formulation.formulation_id;
        return (
          <Link
            href={`/formulations/${id}`}
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
        return <span className="text-sm text-muted-foreground">{shortName || "—"}</span>;
      },
    },
    {
      accessorKey: "product_category",
      header: "Category",
      cell: ({ row }) => {
        const formulation = row.original;
        const category = ("formulation_category" in formulation ? (formulation as any).formulation_category : ("product_category" in formulation ? formulation.product_category : null)) as string | null;
        return <span>{category || "—"}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const formulation = row.original;
        const status = ("formulation_status" in formulation ? (formulation as any).formulation_status : ("status" in formulation ? formulation.status : null)) as string | null;
        const statusValue = status || "Not Yet Considered";
        return (
          <Badge variant={statusColors[statusValue] as any || "secondary"}>
            {statusValue}
          </Badge>
        );
      },
    },
  ];

  // Only add actions column if user can edit
  if (canEdit) {
    cols.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <FormulationActionsCell formulation={row.original} canEdit={canEdit} />,
    });
  }

  return cols;
};

interface FormulationsListWithActionsProps {
  formulations: Formulation[];
}

export function FormulationsListWithActions({ formulations }: FormulationsListWithActionsProps) {
  const { canEditFormulations, isLoading } = usePermissions();
  
  // Memoize columns to prevent recreation
  const columns = useMemo(() => createColumns(canEditFormulations), [canEditFormulations]);

  return (
    <EnhancedDataTable
      columns={columns}
      data={formulations}
      searchKey="product_name"
      searchPlaceholder="Search formulations..."
      pageSize={25}
      showPageSizeSelector={true}
      tableId="formulations"
    />
  );
}
