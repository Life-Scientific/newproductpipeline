"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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

  // Add crops (intended use)
  if (cropsJson && data?.formulation_country_use_group_id) {
    try {
      const crops: string[] = JSON.parse(cropsJson);
      if (crops.length > 0) {
        const cropInserts = crops.map((cropId) => ({
          formulation_country_use_group_id: data.formulation_country_use_group_id,
          crop_id: cropId,
        }));
        await supabase.from("formulation_country_use_group_crops").insert(cropInserts);
      }
    } catch (parseError) {
      console.error("Failed to parse crops:", parseError);
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
    await supabase
      .from("formulation_country_use_group_crops")
      .delete()
      .eq("formulation_country_use_group_id", formulationCountryUseGroupId);

    try {
      const crops: string[] = JSON.parse(cropsJson);
      if (crops.length > 0) {
        const cropInserts = crops.map((cropId) => ({
          formulation_country_use_group_id: formulationCountryUseGroupId,
          crop_id: cropId,
        }));
        await supabase.from("formulation_country_use_group_crops").insert(cropInserts);
      }
    } catch (parseError) {
      console.error("Failed to parse crops:", parseError);
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

