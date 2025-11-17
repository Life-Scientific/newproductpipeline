"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import type { Database } from "@/lib/supabase/database.types";

type RegistrationPipeline = Database["public"]["Views"]["vw_registration_pipeline"]["Row"];

const columns: ColumnDef<RegistrationPipeline>[] = [
  {
    accessorKey: "display_name",
    header: "Product",
    cell: ({ row }) => {
      const name = row.getValue("display_name") as string;
      return <span className="font-medium">{name || "—"}</span>;
    },
  },
  {
    accessorKey: "formulation_code",
    header: "Code",
  },
  {
    accessorKey: "country_name",
    header: "Country",
  },
  {
    accessorKey: "product_category",
    header: "Category",
  },
  {
    accessorKey: "registration_pathway",
    header: "Pathway",
    cell: ({ row }) => {
      const pathway = row.getValue("registration_pathway") as string | null;
      if (!pathway) return "—";
      return (
        <Badge variant={pathway.includes("33") ? "default" : "secondary"}>
          {pathway}
        </Badge>
      );
    },
  },
  {
    accessorKey: "registration_status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("registration_status") as string | null;
      if (!status) return "—";
      const statusColors: Record<string, string> = {
        Approved: "default",
        Submitted: "outline",
        "In Progress": "secondary",
        Rejected: "destructive",
        Withdrawn: "outline",
      };
      return (
        <Badge variant={statusColors[status] as any || "outline"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_in_active_portfolio",
    header: "Active Portfolio",
    cell: ({ row }) => {
      const active = row.getValue("is_in_active_portfolio") as boolean | null;
      return active ? "Yes" : "No";
    },
  },
  {
    accessorKey: "has_approval",
    header: "Has Approval",
    cell: ({ row }) => {
      const approved = row.getValue("has_approval") as boolean | null;
      return approved ? "Yes" : "No";
    },
  },
  {
    accessorKey: "use_group_count",
    header: "Use Groups",
  },
  {
    accessorKey: "earliest_submission_date",
    header: "Submission Date",
    cell: ({ row }) => {
      const date = row.getValue("earliest_submission_date") as string | null;
      return date ? new Date(date).toLocaleDateString() : "—";
    },
  },
  {
    accessorKey: "earliest_approval_date",
    header: "Approval Date",
    cell: ({ row }) => {
      const date = row.getValue("earliest_approval_date") as string | null;
      return date ? new Date(date).toLocaleDateString() : "—";
    },
  },
  {
    accessorKey: "earliest_market_entry_date",
    header: "Market Entry",
    cell: ({ row }) => {
      const date = row.getValue("earliest_market_entry_date") as string | null;
      return date ? new Date(date).toLocaleDateString() : "—";
    },
  },
  {
    accessorKey: "target_market_entry_fy",
    header: "Target FY",
  },
];

interface RegistrationPipelineListProps {
  pipeline: RegistrationPipeline[];
}

export function RegistrationPipelineList({
  pipeline,
}: RegistrationPipelineListProps) {
  return (
    <DataTable
      columns={columns}
      data={pipeline}
      searchKey="display_name"
      searchPlaceholder="Search registrations..."
    />
  );
}

