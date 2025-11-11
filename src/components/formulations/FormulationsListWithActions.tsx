"use client";

import { useState, useTransition } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { FormulationForm } from "@/components/forms/FormulationForm";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

function FormulationActionsCell({ formulation }: { formulation: Formulation }) {
  const [editOpen, setEditOpen] = useState(false);
  const [formulationData, setFormulationData] = useState<FormulationTable | null>(null);
  const [isPending, startTransition] = useTransition();

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
          setFormulationData({
            formulation_id: formulation.formulation_id,
            product_name: formulation.product_name || "",
            product_category: formulation.product_category || "",
            formulation_type: formulation.formulation_type || null,
            uom: formulation.uom || "L",
            short_name: formulation.short_name || null,
            status: formulation.status || "Not Yet Considered",
            status_rationale: null,
            base_code: "",
            variant_suffix: "",
            formulation_code: formulation.formulation_code || null,
            active_signature: null,
            is_active: true,
            created_by: null,
            created_at: null,
            updated_at: null,
          } as FormulationTable);
          setEditOpen(true);
        }
      } catch {
        // Fallback on error
        setFormulationData({
          formulation_id: formulation.formulation_id,
          product_name: formulation.product_name || "",
          product_category: formulation.product_category || "",
          formulation_type: formulation.formulation_type || null,
          uom: formulation.uom || "L",
          short_name: formulation.short_name || null,
          status: formulation.status || "Not Yet Considered",
          status_rationale: null,
          base_code: "",
          variant_suffix: "",
          formulation_code: formulation.formulation_code || null,
          active_signature: null,
          is_active: true,
          created_by: null,
          created_at: null,
          updated_at: null,
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
}

interface FormulationsListWithActionsProps {
  formulations: Formulation[];
}

export function FormulationsListWithActions({ formulations }: FormulationsListWithActionsProps) {

  const columns: ColumnDef<Formulation>[] = [
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
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={statusColors[status] as any || "secondary"}>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <FormulationActionsCell formulation={row.original} />,
    },
  ];

  return (
    <EnhancedDataTable
      columns={columns}
      data={formulations}
      searchKey="product_name"
      searchPlaceholder="Search formulations..."
      pageSize={25}
      showPageSizeSelector={true}
    />
  );
}

