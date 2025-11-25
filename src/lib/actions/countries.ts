"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

export async function createCountry(formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.COUNTRY_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage countries" };
  }

  const supabase = await createClient();

  const countryCode = formData.get("country_code") as string;
  const countryName = formData.get("country_name") as string;
  const currencyCode = formData.get("currency_code") as string;
  const hasTariffs = formData.get("has_tariffs") === "true";

  if (!countryCode || !countryName || !currencyCode) {
    return { error: "Country code, name, and currency code are required" };
  }

  const { data, error } = await supabase
    .from("countries")
    .insert({
      country_code: countryCode,
      country_name: countryName,
      currency_code: currencyCode,
      has_tariffs: hasTariffs,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function updateCountry(countryId: string, formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.COUNTRY_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage countries" };
  }

  const supabase = await createClient();

  const countryCode = formData.get("country_code") as string | null;
  const countryName = formData.get("country_name") as string | null;
  const currencyCode = formData.get("currency_code") as string | null;
  const hasTariffs = formData.get("has_tariffs") === "true";
  const isActive = formData.get("is_active") === "true";

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (countryCode !== null) updateData.country_code = countryCode;
  if (countryName !== null) updateData.country_name = countryName;
  if (currencyCode !== null) updateData.currency_code = currencyCode;
  updateData.has_tariffs = hasTariffs;
  updateData.is_active = isActive;

  const { data, error } = await supabase
    .from("countries")
    .update(updateData)
    .eq("country_id", countryId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function deleteCountry(countryId: string) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.COUNTRY_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage countries" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("countries").delete().eq("country_id", countryId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { success: true };
}

