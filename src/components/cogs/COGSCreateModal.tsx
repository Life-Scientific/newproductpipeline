"use client";

import { useState, useEffect, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from "@/hooks/use-supabase";
import { checkExistingCOGSGroupAction } from "@/lib/actions/cogs";
import { COGSEditModal } from "./COGSEditModal";
import type { Database } from "@/lib/supabase/database.types";
import { usePermissions } from "@/hooks/use-permissions";
import { Loader2 } from "lucide-react";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationCountry = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];

interface COGSCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  defaultFormulationId?: string;
}

export function COGSCreateModal({
  open,
  onOpenChange,
  onSuccess,
  defaultFormulationId,
}: COGSCreateModalProps) {
  const { toast } = useToast();
  const { canEditCOGS, isLoading: permissionsLoading } = usePermissions();
  const supabase = useSupabase();
  const [isPending, startTransition] = useTransition();
  const [formulations, setFormulations] = useState<Formulation[]>([]);
  const [formulationCountries, setFormulationCountries] = useState<FormulationCountry[]>([]);
  const [selectedFormulationId, setSelectedFormulationId] = useState<string>(defaultFormulationId || "");
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [existingGroupId, setExistingGroupId] = useState<string | null>(null);

  // Load formulations on mount
  useEffect(() => {
    if (open) {
      supabase
        .from("vw_formulations_with_ingredients")
        .select("formulation_id, formulation_code, product_name")
        .order("formulation_code")
        .then(({ data }) => {
          if (data) setFormulations(data as Formulation[]);
        });
    }
  }, [open]);

  // Load formulation countries when formulation selected
  useEffect(() => {
    if (selectedFormulationId) {
      loadFormulationCountries(selectedFormulationId);
    } else {
      setFormulationCountries([]);
      setSelectedCountryId(null);
    }
  }, [selectedFormulationId]);

  const loadFormulationCountries = async (formulationId: string) => {
    const { data: formulation } = await supabase
      .from("formulations")
      .select("formulation_code")
      .eq("formulation_id", formulationId)
      .single();

    if ((formulation as any)?.formulation_code) {
      const { data } = await supabase
        .from("vw_formulation_country_detail")
        .select("formulation_country_id, display_name, country_name")
        .eq("formulation_code", (formulation as any).formulation_code)
        .order("country_name");

      if (data) setFormulationCountries(data as FormulationCountry[]);
    }
  };

  const handleNext = () => {
    if (!canEditCOGS) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to manage COGS data",
        variant: "destructive",
      });
      return;
    }

    if (!selectedFormulationId) {
      toast({
        title: "Error",
        description: "Please select a formulation",
        variant: "destructive",
      });
      return;
    }

    // Check if COGS already exists
    startTransition(async () => {
      const result = await checkExistingCOGSGroupAction(selectedFormulationId, selectedCountryId);

      if (result.data) {
        // Existing COGS found - switch to edit mode
        setExistingGroupId(result.data);
        toast({
          title: "Existing COGS Found",
          description: "Opening existing COGS in edit mode. Updates will create a new version.",
          duration: 5000,
        });
      } else {
        // No existing COGS - create mode
        setExistingGroupId(null);
      }

      setShowEditModal(true);
    });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    if (onSuccess) onSuccess();
  };

  // Get selected formulation details
  const selectedFormulation = formulations.find((f) => f.formulation_id === selectedFormulationId);
  const selectedCountryName = selectedCountryId
    ? formulationCountries.find((fc) => fc.formulation_country_id === selectedCountryId)?.country_name
    : null;

  return (
    <>
      <Dialog open={open && !showEditModal} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create COGS</DialogTitle>
            <DialogDescription>
              Select a formulation and optionally a country to create or edit COGS data.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="formulation_id">
                Formulation <span className="text-destructive">*</span>
              </Label>
              <Select value={selectedFormulationId} onValueChange={setSelectedFormulationId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select formulation" />
                </SelectTrigger>
                <SelectContent>
                  {formulations
                    .filter((f) => f.formulation_id)
                    .map((f) => (
                      <SelectItem key={f.formulation_id!} value={f.formulation_id!}>
                        {f.formulation_code} - {("formulation_name" in f ? (f as any).formulation_name : f.formulation_code) || f.formulation_code}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country_id">Country (Optional)</Label>
              <Select
                value={selectedCountryId || "__none__"}
                onValueChange={(value) => setSelectedCountryId(value === "__none__" ? null : value)}
                disabled={!selectedFormulationId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Global (no country)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">Global (no country)</SelectItem>
                  {formulationCountries
                    .filter((fc) => fc.formulation_country_id)
                    .map((fc) => (
                      <SelectItem key={fc.formulation_country_id!} value={fc.formulation_country_id!}>
                        {fc.country_name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Leave as "Global" for formulation-level COGS, or select a country for country-specific override.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!selectedFormulationId || isPending || permissionsLoading || !canEditCOGS}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : permissionsLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Next"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* COGS Edit Modal */}
      {showEditModal && (
        <COGSEditModal
          groupId={existingGroupId || undefined}
          formulationId={selectedFormulationId}
          formulationName={"formulation_name" in (selectedFormulation || {}) ? (selectedFormulation as any).formulation_name : selectedFormulation?.formulation_code || ""}
          formulationCountryId={selectedCountryId}
          countryName={selectedCountryName}
          open={showEditModal}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              handleEditModalClose();
            }
          }}
          onSuccess={() => {
            onOpenChange(false);
            if (onSuccess) onSuccess();
          }}
        />
      )}
    </>
  );
}

