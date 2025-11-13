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

    // Check patent protections (ingredient-level: molecule, polymorph, intermediate, root_of_synthesis)
    const { data: patents } = await supabase
      .from("patents")
      .select("expiration_date, patent_number, patent_type, legal_status")
      .eq("ingredient_id", ingredientId)
      .in("patent_type", ["molecule", "polymorph", "intermediate", "root_of_synthesis"])
      .in("legal_status", ["valid", "under_examination"])
      .gte("expiration_date", new Date().toISOString().split("T")[0])
      .or(`country_id.is.null,country_id.eq.${countryId}`); // EP patents (country_id NULL) apply to all EU countries

    if (patents && patents.length > 0) {
      for (const patent of patents) {
        const expiryDate = new Date(patent.expiration_date);
        if (!latestExpiryDate || expiryDate > latestExpiryDate) {
          latestExpiryDate = expiryDate;
        }
        blockers.push({
          type: "active_patent",
          ingredientName,
          expiryDate,
          description: `${ingredientName} patent (${patent.patent_type || "Unknown"}) ${patent.patent_number || ""} expires ${expiryDate.toLocaleDateString()}`,
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

    // Check formulation-level patents (formulation and combination patents)
    // Get combination patents that apply to this formulation's active ingredients
    const ingredientIds = activeIngredients.map((fi) => fi.ingredient_id);

    if (ingredientIds.length > 0) {

      // Get combination patents that cover these ingredients
      const { data: combinationPatents } = await supabase
        .from("patent_combination_ingredients")
        .select(`
          patent_id,
          patents!inner (
            patent_id,
            expiration_date,
            patent_number,
            patent_type,
            legal_status,
            country_id
          )
        `)
        .in("ingredient_id", ingredientIds);

      if (combinationPatents && combinationPatents.length > 0) {
        // Group by patent_id and check if all required ingredients are covered
        const patentGroups = new Map<string, Set<string>>();
        for (const cp of combinationPatents) {
          const patentId = cp.patent_id;
          if (!patentGroups.has(patentId)) {
            patentGroups.set(patentId, new Set());
          }
          patentGroups.get(patentId)!.add(cp.ingredient_id);
        }

        // Get full patent details for combination patents that cover all ingredients
        const fullCombinationPatents = await Promise.all(
          Array.from(patentGroups.keys()).map(async (patentId) => {
            const { data: patent } = await supabase
              .from("patents")
              .select("*")
              .eq("patent_id", patentId)
              .eq("patent_type", "combination")
              .in("legal_status", ["valid", "under_examination"])
              .gte("expiration_date", new Date().toISOString().split("T")[0])
              .single();

            if (patent) {
              // Check if this patent covers ALL ingredients in the formulation
              const { data: requiredIngredients } = await supabase
                .from("patent_combination_ingredients")
                .select("ingredient_id")
                .eq("patent_id", patentId);

              if (requiredIngredients) {
                const requiredIds = new Set(requiredIngredients.map((ri) => ri.ingredient_id));
                const hasAllIngredients = ingredientIds.every((id) => requiredIds.has(id));
                if (hasAllIngredients) {
                  return patent;
                }
              }
            }
            return null;
          })
        );

        for (const patent of fullCombinationPatents.filter((p) => p !== null)) {
          if (!patent) continue;
          const expiryDate = new Date(patent.expiration_date);
          const appliesToCountry =
            patent.country_id === null || patent.country_id === countryId;
          if (appliesToCountry && (!latestExpiryDate || expiryDate > latestExpiryDate)) {
            latestExpiryDate = expiryDate;
          }
          if (appliesToCountry) {
            blockers.push({
              type: "formulation_patent",
              expiryDate,
              description: `Combination patent ${patent.patent_number || ""} expires ${expiryDate.toLocaleDateString()}`,
            });
          }
        }
      }
    }

    // Check formulation patents (direct formulation-level patents)
    const { data: formPatents } = await supabase
      .from("patents")
      .select("expiration_date, patent_number, patent_type, legal_status, country_id")
      .eq("patent_type", "formulation")
      .in("legal_status", ["valid", "under_examination"])
      .in("formulation_country_id", fcIds)
      .gte("expiration_date", new Date().toISOString().split("T")[0]);

    if (formPatents && formPatents.length > 0) {
      for (const fp of formPatents) {
        const expiryDate = new Date(fp.expiration_date);
        const appliesToCountry =
          fp.country_id === null || fp.country_id === countryId;
        if (appliesToCountry && (!latestExpiryDate || expiryDate > latestExpiryDate)) {
          latestExpiryDate = expiryDate;
        }
        if (appliesToCountry) {
          blockers.push({
            type: "formulation_patent",
            expiryDate,
            description: `Formulation patent ${fp.patent_number || ""} expires ${expiryDate.toLocaleDateString()}`,
          });
        }
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

