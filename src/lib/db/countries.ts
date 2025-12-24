import { createClient } from "@/lib/supabase/server";
import { log, warn, error, table } from "@/lib/logger";
import type {
  Country,
  FormulationCountryDetail,
  BusinessCase,
  FormulationCountryUseGroup,
} from "./types";

export async function getCountries() {
  const supabase = await createClient();
  const { data, error: supabaseError } = await supabase
    .from("countries")
    .select("*")
    .eq("is_active", true)
    .order("country_name", { ascending: true });

  if (supabaseError) {
    throw new Error(`Failed to fetch countries: ${supabaseError.message}`);
  }

  return data as Country[];
}

/**
 * Get a single country by ID
 */
export async function getCountryById(countryId: string) {
  const supabase = await createClient();
  const { data, error: supabaseError } = await supabase
    .from("countries")
    .select("*")
    .eq("country_id", countryId)
    .single();

  if (supabaseError) {
    throw new Error(`Failed to fetch country: ${supabaseError.message}`);
  }

  return data as Country;
}

/**
 * Helper to fetch all records with pagination (Supabase has 10k row limit)
 */
async function fetchAllPaginated<T>(
  supabase: any,
  tableName: string,
  selectQuery: string = "*",
  filters?: { column: string; value: string }[],
): Promise<T[]> {
  let allData: T[] = [];
  let page = 0;
  const pageSize = 10000;
  let hasMore = true;

  while (hasMore) {
    let query = supabase.from(tableName).select(selectQuery);

    // Apply filters
    filters?.forEach((f) => {
      query = query.eq(f.column, f.value);
    });

    const { data, error } = await query.range(
      page * pageSize,
      (page + 1) * pageSize - 1,
    );

    if (supabaseError) {
      error(`Failed to fetch ${tableName}:`, supabaseError.message);
      break;
    }

    if (!data || data.length === 0) {
      hasMore = false;
    } else {
      allData = [...allData, ...data];
      hasMore = data.length === pageSize;
      page++;
    }
  }

  return allData;
}

/**
 * Get all countries with aggregated stats (formulation count, revenue, etc.)
 */
export async function getCountriesWithStats() {
  const supabase = await createClient();

  // Get all active countries
  const { data: countries, error: countriesError } = await supabase
    .from("countries")
    .select("*")
    .eq("is_active", true)
    .order("country_name", { ascending: true });

  if (countriesError || !countries) {
    throw new Error(`Failed to fetch countries: ${countriesError?.message}`);
  }

  // Get formulation-country data with pagination
  const formCountries = await fetchAllPaginated<FormulationCountryDetail>(
    supabase,
    "vw_formulation_country_detail",
  );

  // Get business case data with pagination
  const businessCases = await fetchAllPaginated<BusinessCase>(
    supabase,
    "vw_business_case",
  );

  // Aggregate stats by country
  const countryStats = new Map<
    string,
    {
      formulations_count: number;
      use_groups_count: number;
      total_revenue: number;
      total_margin: number;
      approved_count: number;
    }
  >();

  // Initialize stats for all countries
  countries.forEach((country) => {
    countryStats.set(country.country_name, {
      formulations_count: 0,
      use_groups_count: 0,
      total_revenue: 0,
      total_margin: 0,
      approved_count: 0,
    });
  });

  // Count formulation-country relationships
  const countedFormulations = new Map<string, Set<string>>();
  formCountries.forEach((fc: FormulationCountryDetail) => {
    if (!fc.country_name) return;
    const stats = countryStats.get(fc.country_name);
    if (stats) {
      if (!countedFormulations.has(fc.country_name)) {
        countedFormulations.set(fc.country_name, new Set());
      }
      if (
        fc.formulation_code &&
        !countedFormulations.get(fc.country_name)!.has(fc.formulation_code)
      ) {
        countedFormulations.get(fc.country_name)!.add(fc.formulation_code);
        stats.formulations_count++;
      }
      if (fc.country_status === "Approved") {
        stats.approved_count++;
      }
    }
  });

  // Aggregate business case data by country (just revenue/margin, skip counting)
  businessCases.forEach((bc: BusinessCase) => {
    if (!bc.country_name) return;
    const stats = countryStats.get(bc.country_name);
    if (stats) {
      stats.total_revenue += bc.total_revenue || 0;
      stats.total_margin += bc.total_margin || 0;
    }
  });

  // Merge stats into countries
  return countries.map((country) => ({
    ...country,
    ...countryStats.get(country.country_name),
  }));
}

export type CountryWithStats = Country & {
  formulations_count: number;
  use_groups_count: number;
  total_revenue: number;
  total_margin: number;
  approved_count: number;
};

/**
 * Get detailed data for a specific country:
 * - All formulations registered/targeting this country
 * - Business cases for this country
 * - Use groups in this country
 */
export async function getCountryDetails(countryId: string) {
  const supabase = await createClient();

  // Get country basic info
  const { data: country, error: countryError } = await supabase
    .from("countries")
    .select("*")
    .eq("country_id", countryId)
    .single();

  if (countryError || !country) {
    throw new Error(`Failed to fetch country: ${countryError?.message}`);
  }

  // Get all related data with pagination (filter by country_name)
  const [formulations, businessCases, useGroups] = await Promise.all([
    fetchAllPaginated<FormulationCountryDetail>(
      supabase,
      "vw_formulation_country_detail",
      "*",
      [{ column: "country_name", value: country.country_name }],
    ),
    fetchAllPaginated<BusinessCase>(supabase, "vw_business_case", "*", [
      { column: "country_name", value: country.country_name },
    ]),
    fetchAllPaginated<FormulationCountryUseGroup>(
      supabase,
      "vw_formulation_country_use_group",
      "*",
      [{ column: "country_name", value: country.country_name }],
    ),
  ]);

  // Sort results (since pagination loses ordering)
  formulations.sort((a, b) =>
    (a.formulation_code || "").localeCompare(b.formulation_code || ""),
  );
  businessCases.sort((a, b) =>
    (a.fiscal_year || "").localeCompare(b.fiscal_year || ""),
  );
  useGroups.sort((a, b) =>
    (a.formulation_code || "").localeCompare(b.formulation_code || ""),
  );

  // Calculate summary stats
  const totalRevenue = businessCases.reduce(
    (sum, bc) => sum + (bc.total_revenue || 0),
    0,
  );
  const totalMargin = businessCases.reduce(
    (sum, bc) => sum + (bc.total_margin || 0),
    0,
  );
  const avgMarginPercent =
    businessCases.length > 0
      ? businessCases.reduce((sum, bc) => sum + (bc.margin_percent || 0), 0) /
        businessCases.length
      : 0;

  // Get unique formulations count
  const uniqueFormulations = new Set(
    formulations.map((f) => f.formulation_code).filter(Boolean),
  );
  const approvedCount = formulations.filter(
    (f) => f.country_status === "Approved",
  ).length;

  return {
    country: country as Country,
    formulations,
    businessCases,
    useGroups,
    stats: {
      totalFormulations: uniqueFormulations.size,
      approvedFormulations: approvedCount,
      totalUseGroups: useGroups.length,
      totalRevenue,
      totalMargin,
      avgMarginPercent,
      totalBusinessCases: businessCases.length,
    },
  };
}

export async function getExchangeRates() {
  const supabase = await createClient();
  const { data, error: supabaseError } = await supabase
    .from("exchange_rates")
    .select(
      `
      *,
      countries (
        country_name,
        currency_code
      )
    `,
    )
    .order("effective_date", { ascending: false })
    .order("country_id", { ascending: true });

  if (supabaseError) {
    throw new Error(`Failed to fetch exchange rates: ${supabaseError.message}`);
  }

  return data || [];
}

export async function getLatestExchangeRate(
  countryId: string,
  date: Date = new Date(),
): Promise<number | null> {
  const supabase = await createClient();
  const dateStr = date.toISOString().split("T")[0];

  const { data, error: supabaseError } = await supabase
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
