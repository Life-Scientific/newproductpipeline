"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

export async function createFormulationCountryUseGroup(formData: FormData) {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.USE_GROUP_CREATE);
  if (!canCreate) {
    return { error: "Unauthorized: You don't have permission to create use groups" };
  }

  const supabase = await createClient();

  const formulationCountryId = formData.get("formulation_country_id") as string;
  const useGroupVariant = formData.get("use_group_variant") as string;
  const useGroupName = formData.get("use_group_name") as string | null;
  const referenceProductId = formData.get("reference_product_id") as string | null;
  const useGroupStatus = formData.get("use_group_status") as string | null;
  const targetMarketEntryFy = formData.get("target_market_entry_fy") as string | null;
  
  const earliestSubmissionDate = formData.get("earliest_submission_date") as string | null;
  const earliestApprovalDate = formData.get("earliest_approval_date") as string | null;
  const actualSubmissionDate = formData.get("actual_submission_date") as string | null;
  const actualApprovalDate = formData.get("actual_approval_date") as string | null;

  const eppoCropIdsJson = formData.get("eppo_crop_ids") as string | null;
  const eppoTargetIdsJson = formData.get("eppo_target_ids") as string | null;
  const eppoCropsCriticalJson = formData.get("eppo_crops_critical") as string | null; // Map of eppoCodeId -> is_critical
  const eppoTargetsCriticalJson = formData.get("eppo_targets_critical") as string | null; // Map of eppoCodeId -> is_critical

  if (!formulationCountryId || !useGroupVariant) {
    return { error: "Formulation-country and use group variant are required" };
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id")
    .eq("formulation_country_id", formulationCountryId)
    .eq("use_group_variant", useGroupVariant)
    .single();

  if (existing) {
    return { error: "This use group variant already exists for this formulation-country" };
  }

  // Get formulation_id for validation
  const { data: fcData } = await supabase
    .from("formulation_country")
    .select("formulation_id")
    .eq("formulation_country_id", formulationCountryId)
    .single();

  if (!fcData) {
    return { error: "Formulation country not found" };
  }

  // Parse EPPO crops and targets
  let eppoCropIds: string[] = [];
  let eppoTargetIds: string[] = [];
  let eppoCropsCriticalMap: Record<string, boolean> = {};
  let eppoTargetsCriticalMap: Record<string, boolean> = {};

  if (eppoCropIdsJson) {
    try {
      eppoCropIds = JSON.parse(eppoCropIdsJson);
    } catch (parseError) {
      return { error: "Failed to parse EPPO crops" };
    }
  }

  if (eppoTargetIdsJson) {
    try {
      eppoTargetIds = JSON.parse(eppoTargetIdsJson);
    } catch (parseError) {
      return { error: "Failed to parse EPPO targets" };
    }
  }

  if (eppoCropsCriticalJson) {
    try {
      eppoCropsCriticalMap = JSON.parse(eppoCropsCriticalJson);
    } catch (parseError) {
      return { error: "Failed to parse EPPO crops critical flags" };
    }
  }

  if (eppoTargetsCriticalJson) {
    try {
      eppoTargetsCriticalMap = JSON.parse(eppoTargetsCriticalJson);
    } catch (parseError) {
      return { error: "Failed to parse EPPO targets critical flags" };
    }
  }

  // Validate at least one crop AND one target
  if (eppoCropIds.length === 0) {
    return { error: "At least one crop must be selected" };
  }

  if (eppoTargetIds.length === 0) {
    return { error: "At least one target must be selected" };
  }

  const { data, error } = await supabase
    .from("formulation_country_use_group")
    .insert({
      formulation_country_id: formulationCountryId,
      use_group_variant: useGroupVariant,
      use_group_name: useGroupName,
      reference_product_id: referenceProductId || null,
      use_group_status: useGroupStatus || "Active",
      target_market_entry_fy: targetMarketEntryFy,
      earliest_planned_submission_date: earliestSubmissionDate || null,
      earliest_planned_approval_date: earliestApprovalDate || null,
      earliest_actual_submission_date: actualSubmissionDate || null,
      earliest_actual_approval_date: actualApprovalDate || null,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Add EPPO crops with critical flags
  if (eppoCropIds.length > 0) {
    const eppoCropInserts = eppoCropIds.map((eppoCodeId) => ({
      formulation_country_use_group_id: data.formulation_country_use_group_id,
      eppo_code_id: eppoCodeId,
      is_critical: eppoCropsCriticalMap[eppoCodeId] ?? true, // Default to critical if not specified
    }));
    const { error: cropsError } = await supabase
      .from("formulation_country_use_group_eppo_crops")
      .insert(eppoCropInserts);
    if (cropsError) {
      // Rollback use group creation
      await supabase
        .from("formulation_country_use_group")
        .delete()
        .eq("formulation_country_use_group_id", data.formulation_country_use_group_id);
      return { error: `Failed to add EPPO crops: ${cropsError.message}` };
    }
  }

  // Add EPPO targets with critical flags
  if (eppoTargetIds.length > 0) {
    const eppoTargetInserts = eppoTargetIds.map((eppoCodeId) => ({
      formulation_country_use_group_id: data.formulation_country_use_group_id,
      eppo_code_id: eppoCodeId,
      is_critical: eppoTargetsCriticalMap[eppoCodeId] ?? true, // Default to critical if not specified
    }));
    const { error: targetsError } = await supabase
      .from("formulation_country_use_group_eppo_targets")
      .insert(eppoTargetInserts);
    if (targetsError) {
      // Rollback use group creation and crops
      await supabase
        .from("formulation_country_use_group")
        .delete()
        .eq("formulation_country_use_group_id", data.formulation_country_use_group_id);
      return { error: `Failed to add EPPO targets: ${targetsError.message}` };
    }
  }

  revalidatePath("/registration");
  revalidatePath("/formulations");
  revalidatePath("/use-groups");
  return { data, success: true };
}

export async function updateFormulationCountryUseGroup(
  formulationCountryUseGroupId: string,
  formData: FormData
) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.USE_GROUP_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to edit use groups" };
  }

  const supabase = await createClient();

  const useGroupVariant = formData.get("use_group_variant") as string | null;
  const useGroupName = formData.get("use_group_name") as string | null;
  const referenceProductId = formData.get("reference_product_id") as string | null;
  const useGroupStatus = formData.get("use_group_status") as string | null;
  const targetMarketEntryFy = formData.get("target_market_entry_fy") as string | null;
  
  const earliestSubmissionDate = formData.get("earliest_submission_date") as string | null;
  const earliestApprovalDate = formData.get("earliest_approval_date") as string | null;
  const actualSubmissionDate = formData.get("actual_submission_date") as string | null;
  const actualApprovalDate = formData.get("actual_approval_date") as string | null;

  const eppoCropIdsJson = formData.get("eppo_crop_ids") as string | null;
  const eppoTargetIdsJson = formData.get("eppo_target_ids") as string | null;
  const eppoCropsCriticalJson = formData.get("eppo_crops_critical") as string | null;
  const eppoTargetsCriticalJson = formData.get("eppo_targets_critical") as string | null;

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (useGroupVariant !== null) updateData.use_group_variant = useGroupVariant;
  if (useGroupName !== null) updateData.use_group_name = useGroupName;
  if (referenceProductId !== null) updateData.reference_product_id = referenceProductId || null;
  if (useGroupStatus !== null) updateData.use_group_status = useGroupStatus;
  if (targetMarketEntryFy !== null) updateData.target_market_entry_fy = targetMarketEntryFy;
  
  if (earliestSubmissionDate !== null)
    updateData.earliest_planned_submission_date = earliestSubmissionDate || null;
  if (earliestApprovalDate !== null)
    updateData.earliest_planned_approval_date = earliestApprovalDate || null;
  if (actualSubmissionDate !== null) 
    updateData.earliest_actual_submission_date = actualSubmissionDate || null;
  if (actualApprovalDate !== null) 
    updateData.earliest_actual_approval_date = actualApprovalDate || null;

  const { data, error } = await supabase
    .from("formulation_country_use_group")
    .update(updateData)
    .eq("formulation_country_use_group_id", formulationCountryUseGroupId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Update EPPO crops - delete all and reinsert
  if (eppoCropIdsJson !== null) {
    try {
      const eppoCropIds: string[] = JSON.parse(eppoCropIdsJson);
      const eppoCropsCriticalMap: Record<string, boolean> = eppoCropsCriticalJson
        ? JSON.parse(eppoCropsCriticalJson)
        : {};

      // Validate at least one crop
      if (eppoCropIds.length === 0) {
        return { error: "At least one crop must be selected" };
      }

      await supabase
        .from("formulation_country_use_group_eppo_crops")
        .delete()
        .eq("formulation_country_use_group_id", formulationCountryUseGroupId);

      if (eppoCropIds.length > 0) {
        const eppoCropInserts = eppoCropIds.map((eppoCodeId) => ({
          formulation_country_use_group_id: formulationCountryUseGroupId,
          eppo_code_id: eppoCodeId,
          is_critical: eppoCropsCriticalMap[eppoCodeId] ?? false,
        }));
        const { error: cropsError } = await supabase
          .from("formulation_country_use_group_eppo_crops")
          .insert(eppoCropInserts);
        if (cropsError) {
          return { error: `Failed to update EPPO crops: ${cropsError.message}` };
        }
      }
    } catch (parseError) {
      return { error: "Failed to parse EPPO crops data" };
    }
  }

  // Update EPPO targets - delete all and reinsert
  if (eppoTargetIdsJson !== null) {
    try {
      const eppoTargetIds: string[] = JSON.parse(eppoTargetIdsJson);
      const eppoTargetsCriticalMap: Record<string, boolean> = eppoTargetsCriticalJson
        ? JSON.parse(eppoTargetsCriticalJson)
        : {};

      // Validate at least one target
      if (eppoTargetIds.length === 0) {
        return { error: "At least one target must be selected" };
      }

      await supabase
        .from("formulation_country_use_group_eppo_targets")
        .delete()
        .eq("formulation_country_use_group_id", formulationCountryUseGroupId);

      if (eppoTargetIds.length > 0) {
        const eppoTargetInserts = eppoTargetIds.map((eppoCodeId) => ({
          formulation_country_use_group_id: formulationCountryUseGroupId,
          eppo_code_id: eppoCodeId,
          is_critical: eppoTargetsCriticalMap[eppoCodeId] ?? false,
        }));
        const { error: targetsError } = await supabase
          .from("formulation_country_use_group_eppo_targets")
          .insert(eppoTargetInserts);
        if (targetsError) {
          return { error: `Failed to update EPPO targets: ${targetsError.message}` };
        }
      }
    } catch (parseError) {
      return { error: "Failed to parse EPPO targets data" };
    }
  }

  revalidatePath("/registration");
  revalidatePath("/formulations");
  revalidatePath("/use-groups");
  return { data, success: true };
}

export async function deleteFormulationCountryUseGroup(formulationCountryUseGroupId: string) {
  // Permission check
  const canDelete = await hasPermission(PERMISSIONS.USE_GROUP_DELETE);
  if (!canDelete) {
    return { error: "Unauthorized: You don't have permission to delete use groups" };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_country_use_group")
    .delete()
    .eq("formulation_country_use_group_id", formulationCountryUseGroupId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/registration");
  revalidatePath("/formulations");
  revalidatePath("/use-groups");
  return { success: true };
}
