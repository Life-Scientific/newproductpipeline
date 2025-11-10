"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { COGSForm } from "@/components/forms/COGSForm";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import { Pencil, Trash2 } from "lucide-react";

type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];
type COGSTable = Database["public"]["Tables"]["cogs"]["Row"];

function COGSActionsCell({ cogs }: { cogs: COGS }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cogsData, setCogsData] = useState<COGSTable | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleEdit = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("cogs")
      .select("*")
      .eq("cogs_id", cogs.cogs_id)
      .single();
    if (data) {
      setCogsData(data);
      setEditOpen(true);
    }
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const { deleteCOGS } = await import("@/lib/actions/cogs");
        const result = await deleteCOGS(cogs.cogs_id!);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "COGS deleted successfully",
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
          onClick={handleEdit}
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
      {cogsData && (
        <COGSForm
          cogs={cogsData}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete COGS"
        description="Are you sure you want to delete this COGS entry?"
        itemName={cogs.display_name || undefined}
      />
    </>
  );
}

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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <COGSActionsCell cogs={row.original} />,
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

