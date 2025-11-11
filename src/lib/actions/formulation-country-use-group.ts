"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  validateUseGroupCropsSubset,
  validateUseGroupTargetsSubset,
} from "@/lib/db/queries";

export async function createFormulationCountryUseGroup(formData: FormData) {
  const supabase = await createClient();

  const formulationCountryId = formData.get("formulation_country_id") as string;
  const useGroupVariant = formData.get("use_group_variant") as string;
  const useGroupName = formData.get("use_group_name") as string | null;
  const referenceProductId = formData.get("reference_product_id") as string | null;
  const registrationStatus = formData.get("registration_status") as string | null;
  const earliestSubmissionDate = formData.get("earliest_submission_date") as string | null;
  const earliestApprovalDate = formData.get("earliest_approval_date") as string | null;
  const earliestMarketEntryDate = formData.get("earliest_market_entry_date") as string | null;
  const actualSubmissionDate = formData.get("actual_submission_date") as string | null;
  const actualApprovalDate = formData.get("actual_approval_date") as string | null;
  const actualMarketEntryDate = formData.get("actual_market_entry_date") as string | null;

  const cropsJson = formData.get("crops") as string | null;
  const targetsJson = formData.get("targets") as string | null;
  const cropsCriticalJson = formData.get("crops_critical") as string | null; // Map of cropId -> is_critical
  const targetsCriticalJson = formData.get("targets_critical") as string | null; // Map of targetId -> is_critical

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

  // Parse crops and targets
  let cropIds: string[] = [];
  let targetIds: string[] = [];
  let cropsCriticalMap: Record<string, boolean> = {};
  let targetsCriticalMap: Record<string, boolean> = {};

  if (cropsJson) {
    try {
      cropIds = JSON.parse(cropsJson);
    } catch (parseError) {
      return { error: "Failed to parse crops" };
    }
  }

  if (targetsJson) {
    try {
      targetIds = JSON.parse(targetsJson);
    } catch (parseError) {
      return { error: "Failed to parse targets" };
    }
  }

  if (cropsCriticalJson) {
    try {
      cropsCriticalMap = JSON.parse(cropsCriticalJson);
    } catch (parseError) {
      return { error: "Failed to parse crops critical flags" };
    }
  }

  if (targetsCriticalJson) {
    try {
      targetsCriticalMap = JSON.parse(targetsCriticalJson);
    } catch (parseError) {
      return { error: "Failed to parse targets critical flags" };
    }
  }

  // Validate at least one crop AND one target
  if (cropIds.length === 0) {
    return { error: "At least one crop must be selected" };
  }

  if (targetIds.length === 0) {
    return { error: "At least one target must be selected" };
  }

  // Validate crops/targets are subset of formulation crops/targets
  // Note: We'll create the use group first, then validate
  // Database triggers will also enforce this

  const { data, error } = await supabase
    .from("formulation_country_use_group")
    .insert({
      formulation_country_id: formulationCountryId,
      use_group_variant: useGroupVariant,
      use_group_name: useGroupName,
      reference_product_id: referenceProductId || null,
      registration_status: registrationStatus,
      earliest_submission_date: earliestSubmissionDate || null,
      earliest_approval_date: earliestApprovalDate || null,
      earliest_market_entry_date: earliestMarketEntryDate || null,
      actual_submission_date: actualSubmissionDate || null,
      actual_approval_date: actualApprovalDate || null,
      actual_market_entry_date: actualMarketEntryDate || null,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Validate crops subset
  const cropsValidation = await validateUseGroupCropsSubset(
    data.formulation_country_use_group_id,
    cropIds
  );
  if (!cropsValidation.isValid) {
    // Rollback use group creation
    await supabase
      .from("formulation_country_use_group")
      .delete()
      .eq("formulation_country_use_group_id", data.formulation_country_use_group_id);
    return { error: cropsValidation.error || "Invalid crops" };
  }

  // Validate targets subset
  const targetsValidation = await validateUseGroupTargetsSubset(
    data.formulation_country_use_group_id,
    targetIds
  );
  if (!targetsValidation.isValid) {
    // Rollback use group creation
    await supabase
      .from("formulation_country_use_group")
      .delete()
      .eq("formulation_country_use_group_id", data.formulation_country_use_group_id);
    return { error: targetsValidation.error || "Invalid targets" };
  }

  // Add crops with critical flags
  if (cropIds.length > 0) {
    const cropInserts = cropIds.map((cropId) => ({
      formulation_country_use_group_id: data.formulation_country_use_group_id,
      crop_id: cropId,
      is_critical: cropsCriticalMap[cropId] ?? true, // Default to critical if not specified
    }));
    const { error: cropsError } = await supabase
      .from("formulation_country_use_group_crops")
      .insert(cropInserts);
    if (cropsError) {
      return { error: `Failed to add crops: ${cropsError.message}` };
    }
  }

  // Add targets with critical flags
  if (targetIds.length > 0) {
    const targetInserts = targetIds.map((targetId) => ({
      formulation_country_use_group_id: data.formulation_country_use_group_id,
      target_id: targetId,
      is_critical: targetsCriticalMap[targetId] ?? true, // Default to critical if not specified
    }));
    const { error: targetsError } = await supabase
      .from("formulation_country_use_group_targets")
      .insert(targetInserts);
    if (targetsError) {
      return { error: `Failed to add targets: ${targetsError.message}` };
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
  const supabase = await createClient();

  const useGroupVariant = formData.get("use_group_variant") as string | null;
  const useGroupName = formData.get("use_group_name") as string | null;
  const referenceProductId = formData.get("reference_product_id") as string | null;
  const registrationStatus = formData.get("registration_status") as string | null;
  const earliestSubmissionDate = formData.get("earliest_submission_date") as string | null;
  const earliestApprovalDate = formData.get("earliest_approval_date") as string | null;
  const earliestMarketEntryDate = formData.get("earliest_market_entry_date") as string | null;
  const actualSubmissionDate = formData.get("actual_submission_date") as string | null;
  const actualApprovalDate = formData.get("actual_approval_date") as string | null;
  const actualMarketEntryDate = formData.get("actual_market_entry_date") as string | null;

  const cropsJson = formData.get("crops") as string | null;
  const targetsJson = formData.get("targets") as string | null;
  const cropsCriticalJson = formData.get("crops_critical") as string | null;
  const targetsCriticalJson = formData.get("targets_critical") as string | null;

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (useGroupVariant !== null) updateData.use_group_variant = useGroupVariant;
  if (useGroupName !== null) updateData.use_group_name = useGroupName;
  if (referenceProductId !== null) updateData.reference_product_id = referenceProductId || null;
  if (registrationStatus !== null) updateData.registration_status = registrationStatus;
  if (earliestSubmissionDate !== null)
    updateData.earliest_submission_date = earliestSubmissionDate || null;
  if (earliestApprovalDate !== null)
    updateData.earliest_approval_date = earliestApprovalDate || null;
  if (earliestMarketEntryDate !== null)
    updateData.earliest_market_entry_date = earliestMarketEntryDate || null;
  if (actualSubmissionDate !== null) updateData.actual_submission_date = actualSubmissionDate || null;
  if (actualApprovalDate !== null) updateData.actual_approval_date = actualApprovalDate || null;
  if (actualMarketEntryDate !== null)
    updateData.actual_market_entry_date = actualMarketEntryDate || null;

  const { data, error } = await supabase
    .from("formulation_country_use_group")
    .update(updateData)
    .eq("formulation_country_use_group_id", formulationCountryUseGroupId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Update crops - delete all and reinsert
  if (cropsJson !== null) {
    try {
      const cropIds: string[] = JSON.parse(cropsJson);
      const cropsCriticalMap: Record<string, boolean> = cropsCriticalJson
        ? JSON.parse(cropsCriticalJson)
        : {};

      // Validate at least one crop
      if (cropIds.length === 0) {
        return { error: "At least one crop must be selected" };
      }

      // Validate crops subset
      const cropsValidation = await validateUseGroupCropsSubset(
        formulationCountryUseGroupId,
        cropIds
      );
      if (!cropsValidation.isValid) {
        return { error: cropsValidation.error || "Invalid crops" };
      }

      await supabase
        .from("formulation_country_use_group_crops")
        .delete()
        .eq("formulation_country_use_group_id", formulationCountryUseGroupId);

      if (cropIds.length > 0) {
        const cropInserts = cropIds.map((cropId) => ({
          formulation_country_use_group_id: formulationCountryUseGroupId,
          crop_id: cropId,
          is_critical: cropsCriticalMap[cropId] ?? false,
        }));
        const { error: cropsError } = await supabase
          .from("formulation_country_use_group_crops")
          .insert(cropInserts);
        if (cropsError) {
          return { error: `Failed to update crops: ${cropsError.message}` };
        }
      }
    } catch (parseError) {
      return { error: "Failed to parse crops data" };
    }
  }

  // Update targets - delete all and reinsert
  if (targetsJson !== null) {
    try {
      const targetIds: string[] = JSON.parse(targetsJson);
      const targetsCriticalMap: Record<string, boolean> = targetsCriticalJson
        ? JSON.parse(targetsCriticalJson)
        : {};

      // Validate at least one target
      if (targetIds.length === 0) {
        return { error: "At least one target must be selected" };
      }

      // Validate targets subset
      const targetsValidation = await validateUseGroupTargetsSubset(
        formulationCountryUseGroupId,
        targetIds
      );
      if (!targetsValidation.isValid) {
        return { error: targetsValidation.error || "Invalid targets" };
      }

      await supabase
        .from("formulation_country_use_group_targets")
        .delete()
        .eq("formulation_country_use_group_id", formulationCountryUseGroupId);

      if (targetIds.length > 0) {
        const targetInserts = targetIds.map((targetId) => ({
          formulation_country_use_group_id: formulationCountryUseGroupId,
          target_id: targetId,
          is_critical: targetsCriticalMap[targetId] ?? false,
        }));
        const { error: targetsError } = await supabase
          .from("formulation_country_use_group_targets")
          .insert(targetInserts);
        if (targetsError) {
          return { error: `Failed to update targets: ${targetsError.message}` };
        }
      }
    } catch (parseError) {
      return { error: "Failed to parse targets data" };
    }
  }

  revalidatePath("/registration");
  revalidatePath("/formulations");
  revalidatePath("/use-groups");
  return { data, success: true };
}

export async function deleteFormulationCountryUseGroup(formulationCountryUseGroupId: string) {
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

