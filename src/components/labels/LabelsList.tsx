"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";
import { FileText, Globe, Package } from "lucide-react";

type FormulationCountryLabel = Database["public"]["Views"]["vw_formulation_country_label"]["Row"];

interface LabelWithFormulationId extends FormulationCountryLabel {
  formulation_id?: string | null;
}

interface LabelsListProps {
  labels: LabelWithFormulationId[];
}

const statusColors: Record<string, string> = {
  Approved: "default",
  Submitted: "secondary",
  "In Progress": "outline",
  "Not Started": "outline",
  Rejected: "destructive",
  Withdrawn: "destructive",
};

export function LabelsList({ labels }: LabelsListProps) {
  if (labels.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No labels found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Formulation</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Variant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reference Product</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Approval Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {labels.map((label) => (
            <TableRow key={label.formulation_country_label_id}>
              <TableCell className="font-medium">
                <Link
                  href={`/labels/${label.formulation_country_label_id}`}
                  className="flex items-center gap-2 hover:text-primary hover:underline"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {label.label_name || `Label ${label.label_variant}`}
                </Link>
              </TableCell>
              <TableCell>
                {label.formulation_id ? (
                  <Link
                    href={`/formulations/${label.formulation_id}`}
                    className="flex items-center gap-1 hover:text-primary hover:underline"
                  >
                    <Package className="h-3 w-3" />
                    <span className="text-sm">{label.formulation_code || "—"}</span>
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {label.formulation_code || "—"}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{label.country_name || "—"}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {label.label_variant || "—"}
                </Badge>
              </TableCell>
              <TableCell>
                {label.registration_status ? (
                  <Badge
                    variant={
                      (statusColors[label.registration_status] as any) || "secondary"
                    }
                  >
                    {label.registration_status}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-sm">
                {label.reference_product_name || "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {label.actual_submission_date
                  ? new Date(label.actual_submission_date).toLocaleDateString()
                  : label.earliest_submission_date
                  ? new Date(label.earliest_submission_date).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {label.actual_approval_date
                  ? new Date(label.actual_approval_date).toLocaleDateString()
                  : label.earliest_approval_date
                  ? new Date(label.earliest_approval_date).toLocaleDateString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

