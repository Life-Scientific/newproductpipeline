import { createClient } from "@/lib/supabase/server";
import type { Country } from "./types";

export async function getCountries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("countries")
    .select("*")
    .eq("is_active", true)
    .order("country_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }

  return data as Country[];
}

export async function getExchangeRates() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("exchange_rates")
    .select(
      `
      *,
      countries (
        country_name,
        currency_code
      )
    `
    )
    .order("effective_date", { ascending: false })
    .order("country_id", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch exchange rates: ${error.message}`);
  }

  return data || [];
}

export async function getLatestExchangeRate(
  countryId: string,
  date: Date = new Date()
): Promise<number | null> {
  const supabase = await createClient();
  const dateStr = date.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("exchange_rates")
    .select("exchange_rate_to_eur")
    .eq("country_id", countryId)
    .lte("effective_date", dateStr)
    .eq("is_active", true)
    .order("effective_date", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data.exchange_rate_to_eur;
}

