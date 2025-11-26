"use client";

import { useState, useTransition, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { BusinessCaseForm } from "@/components/forms/BusinessCaseForm";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from "@/hooks/use-supabase";
import { usePermissions } from "@/hooks/use-permissions";
import type { Database } from "@/lib/supabase/database.types";
import type { EnrichedBusinessCase } from "@/lib/db/queries";
import { Pencil, Trash2 } from "lucide-react";

type BusinessCaseTable = Database["public"]["Tables"]["business_case"]["Row"];

const BusinessCaseActionsCell = memo(function BusinessCaseActionsCell({ businessCase }: { businessCase: EnrichedBusinessCase }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [businessCaseData, setBusinessCaseData] = useState<BusinessCaseTable | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const { canEditBusinessCases, canDeleteBusinessCases, isLoading: permissionsLoading } = usePermissions();

  const handleEdit = async () => {
    if (!canEditBusinessCases) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit business cases",
        variant: "destructive",
      });
      return;
    }
    if (!businessCase.business_case_id) return;
    const { data } = await supabase
      .from("business_case")
      .select("*")
      .eq("business_case_id", businessCase.business_case_id)
      .single();
    if (data) {
      setBusinessCaseData(data);
      setEditOpen(true);
    }
  };

  const handleDelete = () => {
    if (!canDeleteBusinessCases) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to delete business cases",
        variant: "destructive",
      });
      return;
    }
    if (!businessCase.business_case_id) return;
    startTransition(async () => {
      try {
        const { deleteBusinessCase } = await import("@/lib/actions/business-cases");
        const result = await deleteBusinessCase(businessCase.business_case_id!);
        if (result.error) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Business case deleted successfully",
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

  // Don't render action buttons if user lacks both permissions
  if (!permissionsLoading && !canEditBusinessCases && !canDeleteBusinessCases) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {canEditBusinessCases && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="h-8 w-8 p-0"
            disabled={isPending || permissionsLoading}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        {canDeleteBusinessCases && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            disabled={isPending || permissionsLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      {businessCaseData && (
        <BusinessCaseForm
          businessCase={businessCaseData}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Business Case"
        description="Are you sure you want to delete this business case?"
        itemName={businessCase.formulation_name || businessCase.business_case_name || undefined}
      />
    </>
  );
});

// Memoize columns outside component to prevent recreation on every render
const createColumns = (): ColumnDef<EnrichedBusinessCase>[] => [
  {
    accessorKey: "formulation_name",
    header: "Formulation",
    cell: ({ row }) => {
      const name = row.getValue("formulation_name") as string | null;
      const businessCaseId = row.original.business_case_id;
      const formulationId = row.original.formulation_id;
      if (!name) return "—";
      if (businessCaseId && formulationId) {
        return (
          <Link
            href={`/portfolio/business-cases/${businessCaseId}`}
            className="font-medium text-primary hover:underline"
          >
            {name}
          </Link>
        );
      }
      return <span>{name}</span>;
    },
  },
  {
    accessorKey: "country_name",
    header: "Country",
    cell: ({ row }) => {
      const country = row.getValue("country_name") as string | null;
      const countryId = row.original.country_id;
      if (!country) return "—";
      if (countryId) {
        return (
          <Link
            href={`/business-cases?country=${countryId}`}
            className="text-primary hover:underline"
          >
            {country}
          </Link>
        );
      }
      return <span>{country}</span>;
    },
  },
  {
    accessorKey: "use_group_name",
    header: "Use Group",
  },
  {
    accessorKey: "year_offset",
    header: "Year Offset",
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => {
      const volume = row.getValue("volume") as number | null;
      return volume ? volume.toLocaleString() : "—";
    },
  },
  {
    accessorKey: "nsp",
    header: "NSP",
    cell: ({ row }) => {
      const nsp = row.getValue("nsp") as number | null;
      return nsp ? `$${nsp.toLocaleString()}` : "—";
    },
  },
  {
    accessorKey: "cogs_per_unit",
    header: "COGS/Unit",
    cell: ({ row }) => {
      const cogs = row.getValue("cogs_per_unit") as number | null;
      return cogs ? `$${cogs.toLocaleString()}` : "—";
    },
  },
  {
    accessorKey: "total_revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const revenue = row.getValue("total_revenue") as number | null;
      return revenue ? `$${revenue.toLocaleString()}` : "—";
    },
  },
  {
    accessorKey: "total_cogs",
    header: "Total COGS",
    cell: ({ row }) => {
      const cogs = row.getValue("total_cogs") as number | null;
      return cogs ? `$${cogs.toLocaleString()}` : "—";
    },
  },
  {
    accessorKey: "total_margin",
    header: "Margin",
    cell: ({ row }) => {
      const margin = row.getValue("total_margin") as number | null;
      return margin ? `$${margin.toLocaleString()}` : "—";
    },
  },
  {
    accessorKey: "margin_percent",
    header: "Margin %",
    cell: ({ row }) => {
      const percent = row.getValue("margin_percent") as number | null;
      return percent ? `${percent.toFixed(1)}%` : "—";
    },
  },
  {
    accessorKey: "fiscal_year",
    header: "Fiscal Year",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <BusinessCaseActionsCell businessCase={row.original} />,
  },
];

// Memoize columns array - only recreate if needed
const columns = createColumns();

interface BusinessCasesListProps {
  businessCases: EnrichedBusinessCase[];
}

export function BusinessCasesList({ businessCases }: BusinessCasesListProps) {
  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);

  return (
    <EnhancedDataTable
      columns={memoizedColumns}
      data={businessCases}
      searchKey="formulation_name"
      searchPlaceholder="Search business cases..."
      pageSize={25}
      showPageSizeSelector={true}
      tableId="business-cases"
    />
  );
}
