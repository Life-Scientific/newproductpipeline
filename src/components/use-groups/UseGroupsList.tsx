"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";
import { FileText, Globe, Package, Pencil } from "lucide-react";
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

  if (useGroups.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No use groups found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Use Group</TableHead>
              <TableHead className="min-w-[120px]">Formulation</TableHead>
              <TableHead className="min-w-[100px]">Country</TableHead>
              <TableHead className="w-[100px]">Variant</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="min-w-[150px]">Reference Product</TableHead>
              <TableHead className="w-[120px]">Submission Date</TableHead>
              <TableHead className="w-[120px]">Approval Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
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
                    <span className="text-sm">{useGroup.use_group_name || `Use Group ${useGroup.use_group_variant}`}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  {useGroup.formulation_id ? (
                    <Link
                      href={`/formulations/${useGroup.formulation_id}`}
                      className="flex items-center gap-1 hover:text-primary hover:underline"
                    >
                      <Package className="h-3 w-3" />
                      <span className="text-sm font-medium">{useGroup.formulation_code || "—"}</span>
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
                      variant={getStatusVariant(useGroup.registration_status, "registration")}
                      className="text-xs"
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
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingUseGroupId(useGroup.formulation_country_use_group_id)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingUseGroup && (
        <UseGroupEditModal
          useGroup={{
            formulation_country_use_group_id: editingUseGroup.formulation_country_use_group_id,
            use_group_variant: editingUseGroup.use_group_variant || null,
            use_group_name: editingUseGroup.use_group_name || null,
            use_group_status: editingUseGroup.use_group_status || null,
            target_market_entry_fy: editingUseGroup.target_market_entry_fy || null,
            earliest_planned_submission_date: editingUseGroup.earliest_submission_date || null,
            earliest_planned_approval_date: editingUseGroup.earliest_approval_date || null,
            earliest_actual_submission_date: editingUseGroup.actual_submission_date || null,
            earliest_actual_approval_date: editingUseGroup.actual_approval_date || null,
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
