"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import { FormulationCountryEditModal } from "@/components/formulations/FormulationCountryEditModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EnhancedDataTable,
  type FilterConfig,
} from "@/components/ui/enhanced-data-table";
import { usePermissions } from "@/hooks/use-permissions";
import { getStatusVariant } from "@/lib/design-system";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountryDetail =
  Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

// Extended type with grouping info
type FormulationCountryWithGroup = FormulationCountryDetail & {
  _isFirstInGroup?: boolean;
  _isLastInGroup?: boolean;
  _groupSize?: number;
};

interface FormulationCountriesListProps {
  countries: FormulationCountryDetail[];
}

// Memoized action cell component
const FormulationCountryActionCell = memo(
  function FormulationCountryActionCell({
    countryId,
    onEdit,
  }: {
    countryId: string;
    onEdit: (id: string) => void;
  }) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(countryId)}
        className="h-8 w-8 p-0"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    );
  },
);

// Memoize columns creation function - takes onEdit callback and permission flag
const createColumns = (
  onEdit: (id: string) => void,
  canEdit: boolean,
): ColumnDef<FormulationCountryWithGroup>[] => [
  {
    accessorKey: "formulation_code",
    header: "Formulation",
    cell: ({ row }) => {
      const isFirst = row.original._isFirstInGroup;
      const groupSize = row.original._groupSize || 1;
      const code = row.getValue("formulation_code") as string;
      const productName = row.original.product_name;
      const id = row.original.formulation_country_id;
      
      // Only show on first row of group
      if (!isFirst) {
        return <span className="text-muted-foreground/30">│</span>;
      }
      
      return (
        <div className="space-y-0.5">
          <Link
            href={`/formulation-countries/${id}`}
            className="font-semibold text-primary hover:underline"
          >
            {code || "—"}
          </Link>
          {productName && (
            <p className="text-xs text-muted-foreground truncate max-w-[180px]">
              {productName}
            </p>
          )}
          {groupSize > 1 && (
            <p className="text-[10px] text-muted-foreground/60">
              {groupSize} countries
            </p>
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
      const countryCode = row.original.country_code;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{countryName || "—"}</span>
          {countryCode && (
            <span className="text-xs text-muted-foreground">
              ({countryCode})
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "country_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("country_status") as string | null;
      const readiness = row.original.readiness as string | null;
      
      return (
        <div className="flex flex-col gap-1">
          {status ? (
            <Badge variant={getStatusVariant(status, "country")} className="w-fit text-xs">
              {status}
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          )}
          {readiness && (
            <span className="text-[10px] text-muted-foreground truncate max-w-[140px]">
              {readiness}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "target_market_entry_fy",
    header: "Target FY",
    cell: ({ row }) => {
      const fy = row.original.target_market_entry_fy as string | null;
      return <span className="text-sm font-medium">{fy || "—"}</span>;
    },
  },
  {
    accessorKey: "product_category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.product_category as string | null;
      if (!category) return <span className="text-xs text-muted-foreground">—</span>;
      return <span className="text-xs">{category}</span>;
    },
  },
  {
    accessorKey: "earliest_market_entry_date",
    header: "EMD",
    enableHiding: true,
    cell: ({ row }) => {
      const emd = row.original.earliest_market_entry_date;
      if (!emd) return <span className="text-sm text-muted-foreground">—</span>;
      try {
        const date = new Date(emd);
        return <span className="text-sm">{date.toLocaleDateString()}</span>;
      } catch {
        return <span className="text-sm text-muted-foreground">—</span>;
      }
    },
  },
  {
    accessorKey: "likely_registration_pathway",
    header: "Pathway",
    enableHiding: true,
    cell: ({ row }) => {
      const pathway = row.original.likely_registration_pathway as string | null;
      if (!pathway)
        return <span className="text-sm text-muted-foreground">—</span>;
      return <span className="text-xs">{pathway}</span>;
    },
  },
  ...(canEdit
    ? [
        {
          id: "actions",
          header: "",
          cell: ({ row }: { row: { original: FormulationCountryWithGroup } }) => {
            return (
              <FormulationCountryActionCell
                countryId={row.original.formulation_country_id || ""}
                onEdit={onEdit}
              />
            );
          },
          meta: {
            enableReordering: false, // Keep actions column at the end
          },
        },
      ]
    : []),
];

// Build a lookup map for formulation code -> product name for better filter labels
function buildFormulationLabelMap(data: FormulationCountryDetail[]): Map<string, string> {
  const map = new Map<string, string>();
  data.forEach((row) => {
    if (row.formulation_code) {
      const label = row.product_name 
        ? `${row.formulation_code} - ${row.product_name}`
        : row.formulation_code;
      map.set(row.formulation_code, label);
    }
  });
  return map;
}

// Filter configurations for the formulation-countries table
// Note: getLabel is set dynamically in the component to include formulation names
const createFilterConfigs = (
  formulationLabelMap: Map<string, string>
): FilterConfig<FormulationCountryWithGroup>[] => [
  {
    columnKey: "formulation_code",
    label: "Formulation",
    paramKey: "formulations",
    getLabel: (value) => formulationLabelMap.get(value) || value,
  },
  {
    columnKey: "country_name",
    label: "Country",
    paramKey: "countries",
  },
  {
    columnKey: "country_status",
    label: "Status",
    paramKey: "statuses",
  },
  {
    columnKey: "product_category",
    label: "Category",
    paramKey: "categories",
  },
];

// Add grouping metadata to rows
function addGroupingInfo(data: FormulationCountryDetail[]): FormulationCountryWithGroup[] {
  // Sort by formulation_code first to ensure groups are together
  const sorted = [...data].sort((a, b) => {
    const codeA = a.formulation_code || "";
    const codeB = b.formulation_code || "";
    if (codeA !== codeB) return codeA.localeCompare(codeB);
    // Then by country name within each formulation
    const countryA = a.country_name || "";
    const countryB = b.country_name || "";
    return countryA.localeCompare(countryB);
  });
  
  // Count group sizes
  const groupCounts = new Map<string, number>();
  sorted.forEach((row) => {
    const code = row.formulation_code || "";
    groupCounts.set(code, (groupCounts.get(code) || 0) + 1);
  });
  
  // Mark first and last in each group
  const seenCodes = new Set<string>();
  return sorted.map((row, index) => {
    const code = row.formulation_code || "";
    const isFirst = !seenCodes.has(code);
    seenCodes.add(code);
    
    // Check if this is the last row in its group
    const nextRow = sorted[index + 1];
    const isLast = !nextRow || nextRow.formulation_code !== code;
    
    return {
      ...row,
      _isFirstInGroup: isFirst,
      _isLastInGroup: isLast,
      _groupSize: isFirst ? groupCounts.get(code) : undefined,
    };
  });
}

export function FormulationCountriesList({
  countries,
}: FormulationCountriesListProps) {
  const router = useRouter();
  const { canEditFormulationCountries, isLoading: permissionsLoading } =
    usePermissions();
  const [editingCountryId, setEditingCountryId] = useState<string | null>(null);
  const editingCountry = countries.find(
    (c) => c.formulation_country_id === editingCountryId,
  );

  // Add grouping info to data
  const groupedData = useMemo(() => addGroupingInfo(countries), [countries]);

  // Build formulation label map for filter display (includes product names)
  const formulationLabelMap = useMemo(
    () => buildFormulationLabelMap(countries),
    [countries]
  );

  // Create filter configs with dynamic labels
  const filterConfigs = useMemo(
    () => createFilterConfigs(formulationLabelMap),
    [formulationLabelMap]
  );

  // Memoize the edit handler
  const handleEdit = useCallback((id: string) => {
    setEditingCountryId(id);
  }, []);

  // Memoize columns with the edit handler and permission
  const columns = useMemo(
    () =>
      createColumns(
        handleEdit,
        canEditFormulationCountries && !permissionsLoading,
      ),
    [handleEdit, canEditFormulationCountries, permissionsLoading],
  );

  // Memoize columns array to prevent recreation
  const memoizedColumns = useMemo(() => columns, [columns]);

  // Default hidden columns
  const defaultHiddenColumns = {
    earliest_market_entry_date: false,
    likely_registration_pathway: false,
  };

  // Row class function to remove borders between grouped rows
  const getRowClassName = useCallback((row: FormulationCountryWithGroup, index: number) => {
    // Remove bottom border if not the last in group
    if (!row._isLastInGroup) {
      return "border-b-0";
    }
    // Add thicker border for group separator
    return "border-b-2 border-border/60";
  }, []);

  return (
    <>
      <EnhancedDataTable
        columns={memoizedColumns}
        data={groupedData}
        searchKey="country_name"
        searchPlaceholder="Search countries..."
        pageSize={25}
        showPageSizeSelector={true}
        tableId="formulation-countries"
        enableUrlPagination={true}
        filterConfigs={filterConfigs}
        defaultColumnVisibility={defaultHiddenColumns}
        getRowClassName={getRowClassName}
      />

      {editingCountry && (
        <FormulationCountryEditModal
          formulationCountry={{
            formulation_country_id: editingCountry.formulation_country_id || "",
            country_status: editingCountry.country_status || null,
            country_readiness: editingCountry.readiness || null,
            country_readiness_notes: null, // Not in view, would need to fetch separately if needed
            likely_registration_pathway:
              editingCountry.likely_registration_pathway || null,
            earliest_market_entry_date:
              editingCountry.earliest_market_entry_date || null,
            is_novel: ("is_novel" in editingCountry
              ? (editingCountry as any).is_novel
              : null) as boolean | null,
            is_eu_approved_formulation: ("is_eu_approved_formulation" in
            editingCountry
              ? (editingCountry as any).is_eu_approved_formulation
              : null) as boolean | null,
            is_active: ("is_active" in editingCountry
              ? (editingCountry as any).is_active
              : true) as boolean | null,
            country_name: editingCountry.country_name || undefined,
            formulation_name:
              ("product_name" in editingCountry
                ? (editingCountry as any).product_name
                : "formulation_code" in editingCountry
                  ? (editingCountry as any).formulation_code
                  : null) ||
              ("formulation_code" in editingCountry
                ? (editingCountry as any).formulation_code
                : null) ||
              undefined,
          }}
          open={!!editingCountryId}
          onOpenChange={(open) => {
            if (!open) setEditingCountryId(null);
          }}
          onSuccess={() => {
            setEditingCountryId(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
