"use client";

import { useState, useTransition, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IngredientForm } from "@/components/forms/IngredientForm";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/lib/supabase/database.types";
import { Pencil, Trash2 } from "lucide-react";

type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

const supplyRiskColors: Record<string, string> = {
  Low: "default",
  Medium: "secondary",
  High: "outline",
  Critical: "destructive",
};

const IngredientActionsCell = memo(function IngredientActionsCell({ ingredient }: { ingredient: Ingredient }) {
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
});

// Memoize columns outside component to prevent recreation on every render
const createColumns = (): ColumnDef<Ingredient>[] => [
  {
    accessorKey: "ingredient_name",
    header: "Ingredient Name",
    cell: ({ row }) => {
      const name = row.getValue("ingredient_name") as string;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "cas_number",
    header: "CAS Number",
    cell: ({ row }) => {
      const cas = row.getValue("cas_number") as string | null;
      return cas ? (
        <span className="font-mono text-sm text-muted-foreground">{cas}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "ingredient_type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("ingredient_type") as string | null;
      return <Badge variant="outline" className="text-xs">{type || "—"}</Badge>;
    },
  },
  {
    accessorKey: "standard_density_g_per_l",
    header: "Density (g/L)",
    cell: ({ row }) => {
      const density = row.getValue("standard_density_g_per_l") as number | null;
      return density ? (
        <span className="text-sm">{density.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      );
    },
  },
  {
    accessorKey: "supply_risk",
    header: "Supply Risk",
    cell: ({ row }) => {
      const risk = row.getValue("supply_risk") as string | null;
      if (!risk) return <span className="text-sm text-muted-foreground">—</span>;
      return (
        <Badge variant={(supplyRiskColors[risk] as any) || "outline"} className="text-xs">
          {risk}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_eu_approved",
    header: "EU Approved",
    cell: ({ row }) => {
      const approved = row.getValue("is_eu_approved") as boolean | null;
      return approved ? (
        <Badge variant="default" className="text-xs">Yes</Badge>
      ) : (
        <Badge variant="outline" className="text-xs">No</Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <IngredientActionsCell ingredient={row.original} />,
  },
];

// Memoize columns array - only recreate if needed
const columns = createColumns();

interface IngredientsTableProps {
  ingredients: Ingredient[];
}

export function IngredientsTable({ ingredients }: IngredientsTableProps) {
  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);

  return (
    <EnhancedDataTable
      columns={memoizedColumns}
      data={ingredients}
      searchKey="ingredient_name"
      searchPlaceholder="Search ingredients..."
      pageSize={25}
      showPageSizeSelector={true}
      tableId="ingredients"
    />
  );
}
