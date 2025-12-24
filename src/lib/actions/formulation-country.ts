"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

export async function createFormulationCountry(formData: FormData) {
  // Permission check
  const canCreate = await hasPermission(PERMISSIONS.FORMULATION_COUNTRY_CREATE);
  if (!canCreate) {
    return {
      error:
        "Unauthorized: You don't have permission to create country registrations",
    };
  }

  const supabase = await createClient();

  const formulationId = formData.get("formulation_id") as string;
  const countryId = formData.get("country_id") as string;

  // Fields matching schema
  const likelyRegistrationPathway = formData.get(
    "likely_registration_pathway",
  ) as string | null;
  const countryStatus = formData.get("country_status") as string | null;
  const countryReadiness = formData.get("country_readiness") as string | null;
  const countryReadinessNotes = formData.get("country_readiness_notes") as
    | string
    | null;
  const earliestMarketEntryDate = formData.get("earliest_market_entry_date") as
    | string
    | null;
  const lastDateAvailableForSale = formData.get(
    "last_date_available_for_sale",
  ) as string | null;

  const isNovel = formData.get("is_novel") === "true";
  const isEuApprovedFormulation =
    formData.get("is_eu_approved_formulation") === "true";
  const isActive = formData.get("is_active") !== "false"; // Default true
  // Default to true if not specified
  const includeInFinancialPlan =
    formData.get("include_in_financial_plan") !== "false";

  if (!formulationId || !countryId) {
    return { error: "Formulation and country are required" };
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId)
    .eq("country_id", countryId)
    .single();

  if (existing) {
    return { error: "This formulation is already registered in this country" };
  }

  const { data, error: supabaseError } = await supabase
    .from("formulation_country")
    .insert({
      formulation_id: formulationId,
      country_id: countryId,
      likely_registration_pathway: likelyRegistrationPathway,
      country_status: countryStatus || "Not yet evaluated",
      country_readiness: countryReadiness || "Nominated for Review",
      country_readiness_notes: countryReadinessNotes,
      earliest_market_entry_date: earliestMarketEntryDate || null,
      is_novel: isNovel,
      is_eu_approved_formulation: isEuApprovedFormulation,
      is_active: isActive,
      include_in_financial_plan: includeInFinancialPlan,
      last_date_available_for_sale: lastDateAvailableForSale || null,
    })
    .select()
    .single();

  if (supabaseError) {
    return { error: supabaseError.message };
  }

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/formulation-countries");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio/registration");
  revalidatePath("/portfolio/countries");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { data, success: true };
}

export async function updateFormulationCountry(
  formulationCountryId: string,
  formData: FormData,
) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.FORMULATION_COUNTRY_EDIT);
  if (!canEdit) {
    return {
      error:
        "Unauthorized: You don't have permission to edit country registrations",
    };
  }

  const supabase = await createClient();

  const likelyRegistrationPathway = formData.get(
    "likely_registration_pathway",
  ) as string | null;
  const countryStatus = formData.get("country_status") as string | null;
  const countryReadiness = formData.get("country_readiness") as string | null;
  const countryReadinessNotes = formData.get("country_readiness_notes") as
    | string
    | null;
  const earliestMarketEntryDate = formData.get("earliest_market_entry_date") as
    | string
    | null;
  const lastDateAvailableForSale = formData.get(
    "last_date_available_for_sale",
  ) as string | null;

  const isNovel = formData.get("is_novel") === "true";
  const isEuApprovedFormulation =
    formData.get("is_eu_approved_formulation") === "true";
  const isActive = formData.get("is_active") === "true";
  const includeInFinancialPlan =
    formData.get("include_in_financial_plan") === "true";

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (likelyRegistrationPathway !== null)
    updateData.likely_registration_pathway = likelyRegistrationPathway;
  if (countryStatus !== null) updateData.country_status = countryStatus;
  if (countryReadiness !== null)
    updateData.country_readiness = countryReadiness;
  if (countryReadinessNotes !== null)
    updateData.country_readiness_notes = countryReadinessNotes;
  if (earliestMarketEntryDate !== null)
    updateData.earliest_market_entry_date = earliestMarketEntryDate || null;
  if (lastDateAvailableForSale !== null)
    updateData.last_date_available_for_sale = lastDateAvailableForSale || null;

  // Booleans - update if present in form data (checked usually sends 'true', unchecked might send 'false' or nothing if not handled)
  // Assuming the caller handles boolean logic correctly
  if (formData.has("is_novel")) updateData.is_novel = isNovel;
  if (formData.has("is_eu_approved_formulation"))
    updateData.is_eu_approved_formulation = isEuApprovedFormulation;
  if (formData.has("is_active")) updateData.is_active = isActive;
  if (formData.has("include_in_financial_plan"))
    updateData.include_in_financial_plan = includeInFinancialPlan;

  const { data, error: supabaseError } = await supabase
    .from("formulation_country")
    .update(updateData)
    .eq("formulation_country_id", formulationCountryId)
    .select()
    .single();

  if (supabaseError) {
    return { error: supabaseError.message };
  }

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/formulation-countries");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio/registration");
  revalidatePath("/portfolio/countries");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { data, success: true };
}

export async function deleteFormulationCountry(formulationCountryId: string) {
  // Permission check
  const canDelete = await hasPermission(PERMISSIONS.FORMULATION_COUNTRY_DELETE);
  if (!canDelete) {
    return {
      error:
        "Unauthorized: You don't have permission to delete country registrations",
    };
  }

  const supabase = await createClient();

  const { error: supabaseError } = await supabase
    .from("formulation_country")
    .delete()
    .eq("formulation_country_id", formulationCountryId);
    if (supabaseError) {
    return { error: supabaseError.message };
  }

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/formulation-countries");
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio/registration");
  revalidatePath("/portfolio/countries");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true };
}
