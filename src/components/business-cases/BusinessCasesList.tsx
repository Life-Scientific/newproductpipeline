"use client";

import { useState, useTransition, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { BusinessCaseModal } from "@/components/business-cases/BusinessCaseModal";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from "@/hooks/use-supabase";
import { usePermissions } from "@/hooks/use-permissions";
import { FormattedCurrency } from "@/components/ui/formatted-currency";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import type { Database } from "@/lib/supabase/database.types";
import type { EnrichedBusinessCase } from "@/lib/db/queries";
import { Pencil, Trash2 } from "lucide-react";

// Cell components that use hooks for proper conversion
// Note: Not using memo because these need to re-render when display preferences change
function VolumeCell({
  volume,
  uom,
}: {
  volume: number | null;
  uom: string | null;
}) {
  const {
    isWetProduct,
    isDryProduct,
    convertVolume,
    convertWeight,
    getDisplayUnit,
  } = useDisplayPreferences();
  if (!volume) return <span className="text-muted-foreground">—</span>;

  const unitOfMeasure = uom || "L";
  const productIsWet = isWetProduct(unitOfMeasure);
  const productIsDry = isDryProduct(unitOfMeasure);
  const converted = productIsWet
    ? convertVolume(volume)
    : productIsDry
      ? convertWeight(volume)
      : volume;
  const displayUnit = getDisplayUnit(unitOfMeasure);

  return (
    <span>
      {converted.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
      {displayUnit}
    </span>
  );
}

function PerUnitCell({
  value,
  uom,
}: {
  value: number | null;
  uom: string | null;
}) {
  const { formatPerUnit, getDisplayUnit } = useDisplayPreferences();
  if (!value) return <span className="text-muted-foreground">—</span>;

  const unitOfMeasure = uom || "L";
  const displayUnit = getDisplayUnit(unitOfMeasure);

  return (
    <span>
      {formatPerUnit(value, unitOfMeasure, { decimals: 2 })}/{displayUnit}
    </span>
  );
}

const BusinessCaseActionsCell = memo(function BusinessCaseActionsCell({
  businessCase,
}: {
  businessCase: EnrichedBusinessCase;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const {
    canEditBusinessCases,
    canDeleteBusinessCases,
    isLoading: permissionsLoading,
  } = usePermissions();

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
    // Get the business_case_group_id from the business case
    const { data } = await supabase
      .from("business_case")
      .select("business_case_group_id")
      .eq("business_case_id", businessCase.business_case_id)
      .single();
    if (data?.business_case_group_id) {
      setGroupId(data.business_case_group_id);
      setEditOpen(true);
    } else {
      toast({
        title: "Error",
        description: "Could not find business case group",
        variant: "destructive",
      });
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
        const { deleteBusinessCase } = await import(
          "@/lib/actions/business-cases"
        );
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
          // No router.refresh() - revalidatePath in server action handles cache invalidation
        }
      } catch (supabaseError) {
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
      {groupId && (
        <BusinessCaseModal
          groupId={groupId}
          open={editOpen}
          onOpenChange={setEditOpen}
          onSuccess={() => {
            // Server action already calls revalidatePath() - no need for router.refresh()
            // The page will automatically refetch on next navigation or component remount
          }}
        />
      )}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Business Case"
        description="Are you sure you want to delete this business case?"
        itemName={
          businessCase.formulation_name ||
          businessCase.business_case_name ||
          undefined
        }
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
      const uom = row.original.uom;
      return <VolumeCell volume={volume} uom={uom} />;
    },
  },
  {
    accessorKey: "nsp",
    header: "NSP",
    cell: ({ row }) => {
      const nsp = row.getValue("nsp") as number | null;
      const uom = row.original.uom;
      return <PerUnitCell value={nsp} uom={uom} />;
    },
  },
  {
    accessorKey: "cogs_per_unit",
    header: "COGS/Unit",
    cell: ({ row }) => {
      const cogs = row.getValue("cogs_per_unit") as number | null;
      const uom = row.original.uom;
      return <PerUnitCell value={cogs} uom={uom} />;
    },
  },
  {
    accessorKey: "total_revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const revenue = row.getValue("total_revenue") as number | null;
      return <FormattedCurrency value={revenue} compact />;
    },
  },
  {
    accessorKey: "total_cogs",
    header: "Total COGS",
    cell: ({ row }) => {
      const cogs = row.getValue("total_cogs") as number | null;
      return <FormattedCurrency value={cogs} compact />;
    },
  },
  {
    accessorKey: "total_margin",
    header: "Margin",
    cell: ({ row }) => {
      const margin = row.getValue("total_margin") as number | null;
      return <FormattedCurrency value={margin} compact />;
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
  const { preferences } = useDisplayPreferences();

  // Memoize columns to prevent recreation
  const memoizedColumns = useMemo(() => columns, []);

  // Key forces table re-render when preferences change
  const tableKey = `${preferences.currency}-${preferences.volumeUnit}-${preferences.weightUnit}`;

  return (
    <EnhancedDataTable
      key={tableKey}
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
