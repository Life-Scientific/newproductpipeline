"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { type ColumnDef } from "@tanstack/react-table";
import type { Database } from "@/lib/supabase/database.types";
import { FileText, Globe, Package, Pencil, Beaker } from "lucide-react";
import { UseGroupEditModal } from "@/components/use-groups/UseGroupEditModal";
import { getStatusVariant } from "@/lib/design-system";

type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

interface UseGroupWithFormulationId extends FormulationCountryUseGroup {
  formulation_id?: string | null;
}

interface UseGroupsListProps {
  useGroups: UseGroupWithFormulationId[];
}

export function UseGroupsList({ useGroups }: UseGroupsListProps) {
  const [editingUseGroupId, setEditingUseGroupId] = useState<string | null>(null);
  const editingUseGroup = useGroups.find((ug) => ug.formulation_country_use_group_id === editingUseGroupId);

  const columns = useMemo<ColumnDef<UseGroupWithFormulationId>[]>(() => [
    {
      accessorKey: "use_group_name",
      header: "Use Group",
      cell: ({ row }) => {
        const useGroup = row.original;
        return (
          <Link
            href={`/use-groups/${useGroup.formulation_country_use_group_id}`}
            className="flex items-center gap-2 hover:text-primary hover:underline font-medium"
          >
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{useGroup.use_group_name || `Use Group ${useGroup.use_group_variant}`}</span>
          </Link>
        );
      },
    },
    {
      accessorKey: "formulation_code",
      header: "Formulation",
      cell: ({ row }) => {
        const useGroup = row.original;
        const formulationDisplay = useGroup.formulation_name && useGroup.formulation_code
          ? `${useGroup.formulation_name} (${useGroup.formulation_code})`
          : useGroup.formulation_code || "—";
        const countryName = useGroup.country_name || "";
        
        return useGroup.formulation_id ? (
          <div className="flex flex-col gap-1">
            <Link
              href={`/formulations/${useGroup.formulation_id}`}
              className="flex items-center gap-1 hover:text-primary hover:underline"
            >
              <Beaker className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm font-medium">{formulationDisplay}</span>
            </Link>
            {countryName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4">
                <Globe className="h-2.5 w-2.5" />
                <span>{countryName}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">{formulationDisplay}</span>
            {countryName && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4">
                <Globe className="h-2.5 w-2.5" />
                <span>{countryName}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "country_name",
      header: "Country",
      cell: ({ row }) => {
        const countryName = row.getValue("country_name") as string | null;
        return (
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span className="text-sm">{countryName || "—"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "use_group_variant",
      header: "Variant",
      cell: ({ row }) => {
        const variant = row.getValue("use_group_variant") as string | null;
        return (
          <Badge variant="outline" className="text-xs">
            {variant || "—"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "registration_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("registration_status") as string | null;
        return status ? (
          <Badge
            variant={getStatusVariant(status, "registration")}
            className="text-xs"
          >
            {status}
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        );
      },
    },
    {
      accessorKey: "reference_product_name",
      header: "Reference Product",
      cell: ({ row }) => {
        const name = row.getValue("reference_product_name") as string | null;
        return <span className="text-sm">{name || "—"}</span>;
      },
    },
    {
      accessorKey: "earliest_actual_submission_date",
      header: "Submission Date",
      cell: ({ row }) => {
        const actual = row.getValue("earliest_actual_submission_date") as string | null;
        const planned = row.original.earliest_planned_submission_date;
        const date = actual || planned;
        return (
          <span className="text-sm text-muted-foreground">
            {date ? new Date(date).toLocaleDateString() : "—"}
          </span>
        );
      },
    },
    {
      accessorKey: "earliest_actual_approval_date",
      header: "Approval Date",
      cell: ({ row }) => {
        const actual = row.getValue("earliest_actual_approval_date") as string | null;
        const planned = row.original.earliest_planned_approval_date;
        const date = actual || planned;
        return (
          <span className="text-sm text-muted-foreground">
            {date ? new Date(date).toLocaleDateString() : "—"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditingUseGroupId(row.original.formulation_country_use_group_id)}
          className="h-8 w-8 p-0"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      ),
    },
  ], []);

  return (
    <>
      <EnhancedDataTable
        columns={columns}
        data={useGroups}
        searchKey="use_group_name"
        searchPlaceholder="Search use groups..."
        pageSize={25}
        showPageSizeSelector={true}
        tableId="use-groups"
        emptyMessage="No use groups found. Use groups are created when you register a formulation in a country for specific crops/pests."
        enableColumnReordering={true}
        enableViewManagement={true}
      />

      {editingUseGroup && (
        <UseGroupEditModal
          useGroup={{
            formulation_country_use_group_id: editingUseGroup.formulation_country_use_group_id || "",
            use_group_variant: editingUseGroup.use_group_variant || "",
            use_group_name: editingUseGroup.use_group_name || null,
            use_group_status: editingUseGroup.use_group_status || null,
            target_market_entry_fy: editingUseGroup.target_market_entry_fy || null,
            earliest_planned_submission_date: editingUseGroup.earliest_planned_submission_date || null,
            earliest_planned_approval_date: editingUseGroup.earliest_planned_approval_date || null,
            earliest_actual_submission_date: editingUseGroup.earliest_actual_submission_date || null,
            earliest_actual_approval_date: editingUseGroup.earliest_actual_approval_date || null,
            reference_product_id: editingUseGroup.reference_product_id || null,
            country_name: editingUseGroup.country_name || undefined,
            formulation_name: editingUseGroup.formulation_code || undefined,
          }}
          open={!!editingUseGroupId}
          onOpenChange={(open) => {
            if (!open) setEditingUseGroupId(null);
          }}
          onSuccess={() => {
            setEditingUseGroupId(null);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}
