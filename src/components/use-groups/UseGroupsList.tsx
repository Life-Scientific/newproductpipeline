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

type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

interface UseGroupWithFormulationId extends FormulationCountryUseGroup {
  formulation_id?: string | null;
}

interface UseGroupsListProps {
  useGroups: UseGroupWithFormulationId[];
}

const statusColors: Record<string, string> = {
  Approved: "default",
  Submitted: "secondary",
  "In Progress": "outline",
  "Not Started": "outline",
  Rejected: "destructive",
  Withdrawn: "destructive",
};

export function UseGroupsList({ useGroups }: UseGroupsListProps) {
  if (useGroups.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No use groups found.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Use Group</TableHead>
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
          {useGroups.map((useGroup) => (
            <TableRow key={useGroup.formulation_country_use_group_id}>
              <TableCell className="font-medium">
                <Link
                  href={`/use-groups/${useGroup.formulation_country_use_group_id}`}
                  className="flex items-center gap-2 hover:text-primary hover:underline"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {useGroup.use_group_name || `Use Group ${useGroup.use_group_variant}`}
                </Link>
              </TableCell>
              <TableCell>
                {useGroup.formulation_id ? (
                  <Link
                    href={`/formulations/${useGroup.formulation_id}`}
                    className="flex items-center gap-1 hover:text-primary hover:underline"
                  >
                    <Package className="h-3 w-3" />
                    <span className="text-sm">{useGroup.formulation_code || "—"}</span>
                  </Link>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {useGroup.formulation_code || "—"}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm">{useGroup.country_name || "—"}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {useGroup.use_group_variant || "—"}
                </Badge>
              </TableCell>
              <TableCell>
                {useGroup.registration_status ? (
                  <Badge
                    variant={
                      (statusColors[useGroup.registration_status] as any) || "secondary"
                    }
                  >
                    {useGroup.registration_status}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-sm">
                {useGroup.reference_product_name || "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {useGroup.actual_submission_date
                  ? new Date(useGroup.actual_submission_date).toLocaleDateString()
                  : useGroup.earliest_submission_date
                  ? new Date(useGroup.earliest_submission_date).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {useGroup.actual_approval_date
                  ? new Date(useGroup.actual_approval_date).toLocaleDateString()
                  : useGroup.earliest_approval_date
                  ? new Date(useGroup.earliest_approval_date).toLocaleDateString()
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

