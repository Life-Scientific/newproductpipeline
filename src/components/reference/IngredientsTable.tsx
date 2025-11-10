"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { IngredientForm } from "@/components/forms/IngredientForm";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/lib/supabase/database.types";
import { Pencil, Trash2 } from "lucide-react";

type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

function IngredientActionsCell({ ingredient }: { ingredient: Ingredient }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const { deleteIngredient } = await import("@/lib/actions/ingredients");
        const result = await deleteIngredient(ingredient.ingredient_id);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Ingredient deleted successfully",
          });
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
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditOpen(true)}
          className="h-8 w-8 p-0"
          disabled={isPending}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDeleteOpen(true)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <IngredientForm ingredient={ingredient} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Ingredient"
        description="Are you sure you want to delete this ingredient?"
        itemName={ingredient.ingredient_name}
      />
    </>
  );
}

const columns: ColumnDef<Ingredient>[] = [
  {
    accessorKey: "ingredient_name",
    header: "Ingredient",
  },
  {
    accessorKey: "ingredient_type",
    header: "Type",
  },
  {
    accessorKey: "cas_number",
    header: "CAS Number",
  },
  {
    accessorKey: "supply_risk",
    header: "Supply Risk",
  },
  {
    accessorKey: "is_eu_approved",
    header: "EU Approved",
    cell: ({ row }) => {
      const approved = row.getValue("is_eu_approved") as boolean | null;
      return approved ? "Yes" : "No";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <IngredientActionsCell ingredient={row.original} />,
  },
];

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

export function IngredientsTable({ ingredients }: IngredientsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={ingredients}
      searchKey="ingredient_name"
      searchPlaceholder="Search ingredients..."
    />
  );
}

