"use client";

import { useState, useTransition, useEffect } from "react";
import { BaseModal } from "@/components/ui/BaseModal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateFormulationCountry } from "@/lib/actions/formulation-country";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { getStatusVariant } from "@/lib/design-system";
import { usePermissions } from "@/hooks/use-permissions";

interface FormulationCountryEditModalProps {
  formulationCountry: {
    formulation_country_id: string;
    country_status: string | null;
    country_readiness: string | null;
    country_readiness_notes: string | null;
    likely_registration_pathway: string | null;
    earliest_market_entry_date: string | null;
    is_novel: boolean | null;
    is_eu_approved_formulation: boolean | null;
    is_active: boolean | null;
    country_name?: string;
    formulation_name?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const COUNTRY_STATUS_OPTIONS = [
  "Not yet evaluated",
  "Not selected for entry",
  "Selected for entry",
  "On hold",
  "Withdrawn",
];

const READINESS_OPTIONS = [
  "Nominated for Review",
  "Under Preparation",
  "Ready for Review",
  "Completed Review",
];

const PATHWAY_OPTIONS = [
  "Article 33 - New",
  "Article 34 - Me-too",
  "Other",
];

export function FormulationCountryEditModal({
  formulationCountry,
  open,
  onOpenChange,
  onSuccess,
}: FormulationCountryEditModalProps) {
  const { toast } = useToast();
  const { canEditFormulationCountries, isLoading: permissionsLoading } = usePermissions();
  const [isPending, startTransition] = useTransition();
  
  const [status, setStatus] = useState(formulationCountry.country_status || "Not yet evaluated");
  const [readiness, setReadiness] = useState(formulationCountry.country_readiness || "Nominated for Review");
  const [notes, setNotes] = useState(formulationCountry.country_readiness_notes || "");
  const [pathway, setPathway] = useState(formulationCountry.likely_registration_pathway || "");
  const [entryDate, setEntryDate] = useState(formulationCountry.earliest_market_entry_date || "");
  const [isNovel, setIsNovel] = useState(formulationCountry.is_novel || false);
  const [isEuApproved, setIsEuApproved] = useState(formulationCountry.is_eu_approved_formulation || false);
  const [isActive, setIsActive] = useState(formulationCountry.is_active ?? true);

  const handleSave = () => {
    if (!canEditFormulationCountries) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit country registrations",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("country_status", status);
      formData.append("country_readiness", readiness);
      formData.append("country_readiness_notes", notes);
      if (pathway) formData.append("likely_registration_pathway", pathway);
      if (entryDate) formData.append("earliest_market_entry_date", entryDate);
      
      if (isNovel) formData.append("is_novel", "true");
      if (isEuApproved) formData.append("is_eu_approved_formulation", "true");
      if (isActive) formData.append("is_active", "true");
      // Note: actions handle boolean presence differently, updateFormulationCountry checks if key exists for updates?
      // Actually the update action checks: if (formData.has("is_novel")) updateData.is_novel = isNovel;
      // So we need to append them regardless of value if we want to update them, or just append true/false strings and let action parse
      // My updated action: const isNovel = formData.get("is_novel") === "true"; ... if (formData.has("is_novel")) ...
      // So if I want to set to false, I should append "false" and ensure the action handles it.
      // Action logic: const isNovel = formData.get("is_novel") === "true"; 
      // If I append "false", isNovel becomes false. Then formData.has("is_novel") is true. So it updates to false. Correct.

      formData.append("is_novel", String(isNovel));
      formData.append("is_eu_approved_formulation", String(isEuApproved));
      formData.append("is_active", String(isActive));

      const result = await updateFormulationCountry(formulationCountry.formulation_country_id, formData);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Country details updated successfully",
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
      title={`Edit ${formulationCountry.country_name || "Country Details"}`}
      description={formulationCountry.formulation_name ? `Formulation: ${formulationCountry.formulation_name}` : undefined}
      onSave={handleSave}
      isSaving={isPending}
      saveDisabled={permissionsLoading || !canEditFormulationCountries}
    >
      <div className="space-y-6">
        {/* Status & Readiness Section */}
        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Status & Readiness</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Country Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusVariant(opt, "country")}>{opt}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="readiness">Readiness</Label>
              <Select value={readiness} onValueChange={setReadiness}>
                <SelectTrigger id="readiness">
                  <SelectValue placeholder="Select readiness" />
                </SelectTrigger>
                <SelectContent>
                  {READINESS_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Readiness Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about readiness status..."
              className="h-20"
            />
          </div>
        </div>

        {/* Registration Details Section */}
        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Registration Details</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pathway">Registration Pathway</Label>
              <Select value={pathway} onValueChange={setPathway}>
                <SelectTrigger id="pathway">
                  <SelectValue placeholder="Select pathway" />
                </SelectTrigger>
                <SelectContent>
                  {PATHWAY_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryDate">Earliest Market Entry</Label>
              <Input
                id="entryDate"
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Flags Section */}
        <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Configuration</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isNovel">Novel Formulation</Label>
              <div className="text-xs text-muted-foreground">Is this a novel formulation?</div>
            </div>
            <Switch id="isNovel" checked={isNovel} onCheckedChange={setIsNovel} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isEuApproved">EU Approved</Label>
              <div className="text-xs text-muted-foreground">Is this formulation approved in EU?</div>
            </div>
            <Switch id="isEuApproved" checked={isEuApproved} onCheckedChange={setIsEuApproved} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isActive">Active</Label>
              <div className="text-xs text-muted-foreground">Is this country entry active?</div>
            </div>
            <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

