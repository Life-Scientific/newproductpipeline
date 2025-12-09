"use client";

import { useState, useTransition, useEffect } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateFormulationCountryUseGroup } from "@/lib/actions/formulation-country-use-group";
import { getReferenceProducts } from "@/lib/actions/reference-products";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/lib/design-system";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
import { usePermissions } from "@/hooks/use-permissions";

interface UseGroupEditModalProps {
  useGroup: {
    formulation_country_use_group_id: string;
    use_group_variant: string | null;
    use_group_name: string | null;
    use_group_status: string | null;
    target_market_entry_fy: string | null;
    earliest_planned_submission_date: string | null;
    earliest_planned_approval_date: string | null;
    earliest_actual_submission_date: string | null;
    earliest_actual_approval_date: string | null;
    reference_product_id: string | null;
    country_name?: string;
    formulation_name?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const USE_GROUP_STATUS_OPTIONS = ["Active", "Inactive"];

const REGISTRATION_STATUS_OPTIONS = [
  "Planning",
  "In Progress",
  "Submitted",
  "Under Review",
  "Approved",
  "Rejected",
  "Withdrawn",
];

export function UseGroupEditModal({
  useGroup,
  open,
  onOpenChange,
  onSuccess,
}: UseGroupEditModalProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { canEditUseGroups, isLoading: permissionsLoading } = usePermissions();

  const [variant, setVariant] = useState(useGroup.use_group_variant || "");
  const [name, setName] = useState(useGroup.use_group_name || "");
  const [status, setStatus] = useState(useGroup.use_group_status || "Active");
  // Note: There seems to be a confusion in the schema/actions vs requirements.
  // Schema has `use_group_status` (Active/Inactive).
  // But typically users want to track "Registration Status" (Approved, Submitted etc).
  // In `formulation_country` there is `country_status` and `country_readiness`.
  // In `formulation_country_use_group` there is NO registration_status column in the schema I checked earlier?
  // Wait, let me re-check schema for `formulation_country_use_group`.
  // Columns: `use_group_variant`, `use_group_name`, `target_market_entry_fy`, `use_group_status` (Active/Inactive check constraint?).
  // There IS NO `registration_status` column in `formulation_country_use_group` in the schema dump I got.
  // BUT the action `createFormulationCountryUseGroup` uses `registration_status`.
  // And I updated the action to use `use_group_status` instead of `registration_status` because I thought it was a rename.
  // If the requirement is to track registration status (Approved etc) on the use group, and the column is missing, that's a problem.
  // But `formulation_country` has `country_readiness`. Maybe that's enough?
  // However, different use groups (e.g. different crops) might have different approval timelines.
  // Let's check if `registration_status` exists in `formulation_country_use_group`.
  // Schema dump earlier: `use_group_status` check ANY (ARRAY['Active', 'Inactive']).
  // So `use_group_status` is indeed Active/Inactive.
  // There is NO registration status column on use group in the schema dump I saw.
  // Wait, checking `submissions` table? `formulation_country_use_group_id` FK.
  // Submissions track dates.
  // Maybe `formulation_country_use_group` relies on `country_readiness`? No.

  // I will proceed with available fields.

  const [targetFy, setTargetFy] = useState(
    useGroup.target_market_entry_fy || "",
  );
  const [planSubDate, setPlanSubDate] = useState(
    useGroup.earliest_planned_submission_date || "",
  );
  const [planAppDate, setPlanAppDate] = useState(
    useGroup.earliest_planned_approval_date || "",
  );
  const [actSubDate, setActSubDate] = useState(
    useGroup.earliest_actual_submission_date || "",
  );
  const [actAppDate, setActAppDate] = useState(
    useGroup.earliest_actual_approval_date || "",
  );
  const [refProdId, setRefProdId] = useState(
    useGroup.reference_product_id || "none",
  );

  const [referenceProducts, setReferenceProducts] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      getReferenceProducts().then(setReferenceProducts);
    }
  }, [open]);

  // Generate FY options
  const fyOptions = Array.from({ length: 10 }, (_, i) => {
    const year = CURRENT_FISCAL_YEAR + i;
    return `FY${String(year).slice(-2)}`;
  });

  const handleSave = () => {
    if (!canEditUseGroups) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit use groups",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("use_group_variant", variant);
      formData.append("use_group_name", name);
      formData.append("use_group_status", status);
      formData.append("target_market_entry_fy", targetFy);

      if (planSubDate) formData.append("earliest_submission_date", planSubDate);
      if (planAppDate) formData.append("earliest_approval_date", planAppDate);
      if (actSubDate) formData.append("actual_submission_date", actSubDate);
      if (actAppDate) formData.append("actual_approval_date", actAppDate);

      if (refProdId && refProdId !== "none") {
        formData.append("reference_product_id", refProdId);
      }

      const result = await updateFormulationCountryUseGroup(
        useGroup.formulation_country_use_group_id,
        formData,
      );

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Use group details updated successfully",
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      }
    });
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Edit Use Group - ${variant}`}
      description={
        useGroup.country_name
          ? `${useGroup.country_name} | ${useGroup.formulation_name || ""}`
          : undefined
      }
      onSave={handleSave}
      isSaving={isPending}
      saveDisabled={permissionsLoading || !canEditUseGroups}
    >
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Basic Information
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="variant">Variant Code</Label>
              <Input
                id="variant"
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                placeholder="e.g. A, B, C"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {USE_GROUP_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Description/Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Cereals - Spring Application"
            />
          </div>
        </div>

        {/* Market & Reference */}
        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Market & Strategy
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetFy">Target Market Entry</Label>
              <Select value={targetFy} onValueChange={setTargetFy}>
                <SelectTrigger id="targetFy">
                  <SelectValue placeholder="Select FY" />
                </SelectTrigger>
                <SelectContent>
                  {fyOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refProd">Reference Product</Label>
              <Select value={refProdId} onValueChange={setRefProdId}>
                <SelectTrigger id="refProd">
                  <SelectValue placeholder="Select reference product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {referenceProducts.map((prod) => (
                    <SelectItem
                      key={prod.reference_product_id}
                      value={prod.reference_product_id}
                    >
                      {prod.product_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Timeline
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="planSub">Planned Submission</Label>
              <Input
                id="planSub"
                type="date"
                value={planSubDate}
                onChange={(e) => setPlanSubDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planApp">Planned Approval</Label>
              <Input
                id="planApp"
                type="date"
                value={planAppDate}
                onChange={(e) => setPlanAppDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actSub">Actual Submission</Label>
              <Input
                id="actSub"
                type="date"
                value={actSubDate}
                onChange={(e) => setActSubDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actApp">Actual Approval</Label>
              <Input
                id="actApp"
                type="date"
                value={actAppDate}
                onChange={(e) => setActAppDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
