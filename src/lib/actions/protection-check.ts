"use server";

import { createClient } from "@/lib/supabase/server";

export interface LaunchEligibilityResult {
  canLaunch: boolean;
  earliestLaunchDate: Date | null;
  blockers: ProtectionBlocker[];
  countryName: string;
  countryId: string;
}

export interface ProtectionBlocker {
  type: "active_patent" | "active_data_protection" | "formulation_patent" | "formulation_data_protection";
  ingredientName?: string;
  expiryDate: Date;
  description: string;
}

/**
 * Check if a formulation can launch in a specific country in a given year
 * Returns eligibility status and earliest possible launch date
 */
export async function checkLaunchEligibility(
  formulationId: string,
  countryId: string,
  targetYear?: number
): Promise<LaunchEligibilityResult> {
  const supabase = await createClient();

  // Get formulation details
  const { data: formulation, error: formError } = await supabase
    .from("formulations")
    .select("formulation_id, formulation_code, formulation_name")
    .eq("formulation_id", formulationId)
    .single();

  if (formError || !formulation) {
    throw new Error(`Formulation not found: ${formulationId}`);
  }

  // Get country name
  const { data: country } = await supabase
    .from("countries")
    .select("country_name")
    .eq("country_id", countryId)
    .single();

  const countryName = country?.country_name || "Unknown";

  // Get all active ingredients for this formulation
  const { data: activeIngredients } = await supabase
    .from("formulation_ingredients")
    .select(
      `
      ingredient_id,
      ingredients!inner (
        ingredient_id,
        ingredient_name,
        ingredient_type
      )
    `
    )
    .eq("formulation_id", formulationId)
    .eq("ingredients.ingredient_type", "Active");

  if (!activeIngredients || activeIngredients.length === 0) {
    // No active ingredients - can launch (but unusual)
    return {
      canLaunch: true,
      earliestLaunchDate: targetYear ? new Date(targetYear, 0, 1) : new Date(),
      blockers: [],
      countryName,
      countryId,
    };
  }

  const blockers: ProtectionBlocker[] = [];
  let latestExpiryDate: Date | null = null;

  // Check active ingredient protections
  for (const fi of activeIngredients) {
    const ingredientId = fi.ingredient_id;
    const ingredientName = (fi.ingredients as any)?.ingredient_name || "Unknown";

    // Check data protections
    const { data: dataProtections } = await supabase
      .from("data_protections")
      .select("expiry_date, reference_number")
      .eq("ingredient_id", ingredientId)
      .eq("country_id", countryId)
      .gte("expiry_date", new Date().toISOString().split("T")[0]);

    if (dataProtections && dataProtections.length > 0) {
      for (const dp of dataProtections) {
        const expiryDate = new Date(dp.expiry_date);
        if (!latestExpiryDate || expiryDate > latestExpiryDate) {
          latestExpiryDate = expiryDate;
        }
        blockers.push({
          type: "active_data_protection",
          ingredientName,
          expiryDate,
          description: `${ingredientName} data protection expires ${expiryDate.toLocaleDateString()}`,
        });
      }
    }

    // Check patent protections
    const { data: patents } = await supabase
      .from("patent_protections")
      .select("expiry_date, patent_number, patent_type")
      .eq("ingredient_id", ingredientId)
      .eq("country_id", countryId)
      .gte("expiry_date", new Date().toISOString().split("T")[0]);

    if (patents && patents.length > 0) {
      for (const patent of patents) {
        const expiryDate = new Date(patent.expiry_date);
        if (!latestExpiryDate || expiryDate > latestExpiryDate) {
          latestExpiryDate = expiryDate;
        }
        blockers.push({
          type: "active_patent",
          ingredientName,
          expiryDate,
          description: `${ingredientName} patent (${patent.patent_type || "Unknown"}) expires ${expiryDate.toLocaleDateString()}`,
        });
      }
    }
  }

  // Check formulation-level protections
  // Get all formulation_country records for this formulation in this country
  const { data: formulationCountries } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId)
    .eq("country_id", countryId);

  if (formulationCountries && formulationCountries.length > 0) {
    const fcIds = formulationCountries.map((fc) => fc.formulation_country_id);

    // Check formulation data protections
    const { data: formDataProtections } = await supabase
      .from("formulation_data_protections")
      .select("expiry_date, reference_number")
      .in("formulation_country_id", fcIds)
      .gte("expiry_date", new Date().toISOString().split("T")[0]);

    if (formDataProtections && formDataProtections.length > 0) {
      for (const fdp of formDataProtections) {
        const expiryDate = new Date(fdp.expiry_date);
        if (!latestExpiryDate || expiryDate > latestExpiryDate) {
          latestExpiryDate = expiryDate;
        }
        blockers.push({
          type: "formulation_data_protection",
          expiryDate,
          description: `Formulation data protection expires ${expiryDate.toLocaleDateString()}`,
        });
      }
    }

    // Check formulation patents
    const { data: formPatents } = await supabase
      .from("formulation_patents")
      .select("expiry_date, patent_number, patent_type")
      .in("formulation_country_id", fcIds)
      .gte("expiry_date", new Date().toISOString().split("T")[0]);

    if (formPatents && formPatents.length > 0) {
      for (const fp of formPatents) {
        const expiryDate = new Date(fp.expiry_date);
        if (!latestExpiryDate || expiryDate > latestExpiryDate) {
          latestExpiryDate = expiryDate;
        }
        blockers.push({
          type: "formulation_patent",
          expiryDate,
          description: `Formulation patent (${fp.patent_type || "Unknown"}) expires ${expiryDate.toLocaleDateString()}`,
        });
      }
    }
  }

  // Determine if can launch
  const canLaunch = blockers.length === 0;
  const earliestLaunchDate = latestExpiryDate
    ? new Date(latestExpiryDate.getTime() + 24 * 60 * 60 * 1000) // Day after expiry
    : targetYear
    ? new Date(targetYear, 0, 1)
    : new Date();

  // If target year specified, check if launch is possible in that year
  const canLaunchInTargetYear =
    canLaunch || Boolean(targetYear && latestExpiryDate && latestExpiryDate.getFullYear() < targetYear);

  return {
    canLaunch: canLaunchInTargetYear,
    earliestLaunchDate,
    blockers,
    countryName,
    countryId,
  };
}

/**
 * Get launch eligibility for all countries for a formulation
 */
export async function getFormulationLaunchEligibility(
  formulationId: string
): Promise<LaunchEligibilityResult[]> {
  const supabase = await createClient();

  // Get all countries
  const { data: countries } = await supabase
    .from("countries")
    .select("country_id, country_name")
    .eq("is_active", true)
    .order("country_name");

  if (!countries) {
    return [];
  }

  // Check eligibility for each country
  const results: LaunchEligibilityResult[] = [];
  for (const country of countries) {
    try {
      const eligibility = await checkLaunchEligibility(
        formulationId,
        country.country_id
      );
      results.push(eligibility);
    } catch (error) {
      console.error(`Error checking eligibility for ${country.country_name}:`, error);
    }
  }

  return results;
}

