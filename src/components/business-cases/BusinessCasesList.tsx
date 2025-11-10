"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { BusinessCaseForm } from "@/components/forms/BusinessCaseForm";
import { DeleteConfirmDialog } from "@/components/forms/DeleteConfirmDialog";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/database.types";
import { Pencil, Trash2 } from "lucide-react";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];
type BusinessCaseTable = Database["public"]["Tables"]["business_case"]["Row"];

function BusinessCaseActionsCell({ businessCase }: { businessCase: BusinessCase }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [businessCaseData, setBusinessCaseData] = useState<BusinessCaseTable | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleEdit = async () => {
    const supabase = createClient();
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
    startTransition(async () => {
      try {
        const { deleteBusinessCase } = await import("@/lib/actions/business-cases");
        const result = await deleteBusinessCase(businessCase.business_case_id);
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
        itemName={businessCase.display_name || undefined}
      />
    </>
  );
}

const columns: ColumnDef<BusinessCase>[] = [
  {
    accessorKey: "display_name",
    header: "Business Case",
    cell: ({ row }) => {
      const name = row.getValue("display_name") as string;
      const businessCaseId = row.original.business_case_id;
      return (
        <Link
          href={`/business-cases/${businessCaseId}`}
          className="font-medium text-primary hover:underline"
        >
          {name || "—"}
        </Link>
      );
    },
  },
  {
    accessorKey: "formulation_code",
    header: "Formulation Code",
    cell: ({ row }) => {
      const code = row.getValue("formulation_code") as string | null;
      const formulationId = row.original.formulation_id;
      if (!code || !formulationId) return "—";
      return (
        <Link
          href={`/formulations/${formulationId}`}
          className="font-medium text-primary hover:underline"
        >
          {code}
        </Link>
      );
    },
  },
  {
    accessorKey: "formulation_name",
    header: "Formulation",
    cell: ({ row }) => {
      const name = row.getValue("formulation_name") as string | null;
      const formulationId = row.original.formulation_id;
      if (!name || !formulationId) return "—";
      return (
        <Link
          href={`/formulations/${formulationId}`}
          className="text-primary hover:underline"
        >
          {name}
        </Link>
      );
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
    accessorKey: "label_name",
    header: "Label",
  },
  {
    accessorKey: "label_variant",
    header: "Variant",
  },
  {
    accessorKey: "business_case_type",
    header: "Type",
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
    accessorKey: "scenario_name",
    header: "Scenario",
  },
  {
    accessorKey: "confidence_level",
    header: "Confidence",
    cell: ({ row }) => {
      const level = row.getValue("confidence_level") as string | null;
      if (!level) return "—";
      const colors: Record<string, string> = {
        High: "default",
        Medium: "secondary",
        Low: "outline",
      };
      return (
        <Badge variant={colors[level] as any || "outline"}>{level}</Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <BusinessCaseActionsCell businessCase={row.original} />,
  },
];

interface BusinessCasesListProps {
  businessCases: BusinessCase[];
}

export function BusinessCasesList({ businessCases }: BusinessCasesListProps) {
  return (
    <EnhancedDataTable
      columns={columns}
      data={businessCases}
      searchKey="display_name"
      searchPlaceholder="Search business cases..."
      pageSize={25}
      showPageSizeSelector={true}
    />
  );
}
