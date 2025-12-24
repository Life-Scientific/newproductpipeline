"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserName } from "@/lib/utils/user-context";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

export async function createExchangeRate(formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.EXCHANGE_RATE_EDIT);
  if (!canEdit) {
    return {
      error: "Unauthorized: You don't have permission to manage exchange rates",
    };
  }

  const supabase = await createClient();
  const userName = await getCurrentUserName();

  const countryId = formData.get("country_id") as string;
  const currencyCode = formData.get("currency_code") as string;
  const exchangeRateToEur = formData.get("exchange_rate_to_eur") as string;
  const effectiveDate = formData.get("effective_date") as string;
  const isActive = formData.get("is_active") === "true";
  const notes = formData.get("notes") as string | null;

  if (!countryId || !currencyCode || !exchangeRateToEur || !effectiveDate) {
    return {
      error:
        "Country, currency code, exchange rate, and effective date are required",
    };
  }

  const rate = parseFloat(exchangeRateToEur);
  if (isNaN(rate) || rate <= 0) {
    return { error: "Exchange rate must be a positive number" };
  }

  const { data, error: supabaseError } = await supabase
    .from("exchange_rates")
    .insert({
      country_id: countryId,
      currency_code: currencyCode.toUpperCase(),
      exchange_rate_to_eur: rate,
      effective_date: effectiveDate,
      is_active: isActive,
      notes: notes || null,
      created_by: userName,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        error:
          "An exchange rate already exists for this country and effective date",
      };
    }
    return { error: `Failed to create exchange rate: ${error.message}` };
  }

  revalidatePath("/reference");
  return { data };
}

export async function updateExchangeRate(
  exchangeRateId: string,
  formData: FormData,
) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.EXCHANGE_RATE_EDIT);
  if (!canEdit) {
    return {
      error: "Unauthorized: You don't have permission to manage exchange rates",
    };
  }

  const supabase = await createClient();

  const currencyCode = formData.get("currency_code") as string;
  const exchangeRateToEur = formData.get("exchange_rate_to_eur") as string;
  const effectiveDate = formData.get("effective_date") as string;
  const isActive = formData.get("is_active") === "true";
  const notes = formData.get("notes") as string | null;

  if (!currencyCode || !exchangeRateToEur || !effectiveDate) {
    return {
      error: "Currency code, exchange rate, and effective date are required",
    };
  }

  const rate = parseFloat(exchangeRateToEur);
  if (isNaN(rate) || rate <= 0) {
    return { error: "Exchange rate must be a positive number" };
  }

  const { data, error: supabaseError } = await supabase
    .from("exchange_rates")
    .update({
      currency_code: currencyCode.toUpperCase(),
      exchange_rate_to_eur: rate,
      effective_date: effectiveDate,
      is_active: isActive,
      notes: notes || null,
    })
    .eq("exchange_rate_id", exchangeRateId)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return {
        error:
          "An exchange rate already exists for this country and effective date",
      };
    }
    return { error: `Failed to update exchange rate: ${error.message}` };
  }

  revalidatePath("/reference");
  return { data };
}

export async function deleteExchangeRate(exchangeRateId: string) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.EXCHANGE_RATE_EDIT);
  if (!canEdit) {
    return {
      error: "Unauthorized: You don't have permission to manage exchange rates",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("exchange_rates")
    .delete()
    .eq("exchange_rate_id", exchangeRateId);

  if (error) {
    return { error: `Failed to delete exchange rate: ${error.message}` };
  }

  revalidatePath("/reference");
  return { success: true };
}
