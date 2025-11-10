"use client";

import { useState, useTransition } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { FormulationForm } from "@/components/forms/FormulationForm";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

interface FormulationsListWithActionsProps {
  formulations: Formulation[];
}

export function FormulationsListWithActions({ formulations }: FormulationsListWithActionsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [editFormulation, setEditFormulation] = useState<FormulationTable | null>(null);
  const [deleteFormulation, setDeleteFormulation] = useState<{ id: string; name: string } | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        const { deleteFormulation: deleteAction } = await import("@/lib/actions/formulations");
        const result = await deleteAction(id);
        
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Formulation deleted successfully",
          });
          setIsDeleteOpen(false);
          setDeleteFormulation(null);
          router.refresh();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

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
      cell: ({ row }) => {
        const formulation = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/formulations/${formulation.formulation_id}`);
                    if (res.ok) {
                      const data = await res.json();
                      setEditFormulation(data);
                    } else {
                      // Fallback: create minimal formulation object from view data
                      setEditFormulation({
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
                    }
                  } catch {
                    // Fallback on error
                    setEditFormulation({
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
                  }
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (!formulation.formulation_id) return;
                  setDeleteFormulation({
                    id: formulation.formulation_id,
                    name: formulation.product_name || formulation.formulation_code || "Unknown",
                  });
                  setIsDeleteOpen(true);
                }}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <EnhancedDataTable
        columns={columns}
        data={formulations}
        searchKey="product_name"
        searchPlaceholder="Search formulations..."
        pageSize={25}
        showPageSizeSelector={true}
      />
      {editFormulation && (
        <FormulationForm
          formulation={editFormulation}
          open={!!editFormulation}
          onOpenChange={(open) => !open && setEditFormulation(null)}
          onSuccess={() => setEditFormulation(null)}
        />
      )}
      {deleteFormulation && (
        <DeleteConfirmDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={() => handleDelete(deleteFormulation.id)}
          title="Delete Formulation"
          description="Are you sure you want to delete this formulation?"
          itemName={deleteFormulation.name}
        />
      )}
    </>
  );
}

