"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  createFormulationIngredients,
  updateFormulationIngredients,
  type IngredientInput,
} from "./formulation-ingredients";
import { getCurrentUserName } from "@/lib/utils/user-context";

export async function createFormulation(formData: FormData) {
  const supabase = await createClient();
  const userName = await getCurrentUserName();

  const formulationName = formData.get("formulation_name") as string;
  const formulationCategory = formData.get("formulation_category") as string;
  const formulationType = formData.get("formulation_type") as string | null;
  const uom = formData.get("uom") as string | null;
  const shortName = formData.get("short_name") as string | null;
  const status = (formData.get("status") as string) || "Not Yet Considered";
  const statusRationale = formData.get("status_rationale") as string | null;

  if (!formulationName || !formulationCategory || !formulationType || !uom) {
    return { error: "Formulation name, category, type, and unit of measure are required" };
  }

  const { data, error } = await supabase
    .from("formulations")
    .insert({
      formulation_name: formulationName,
      formulation_category: formulationCategory,
      formulation_type: formulationType,
      uom: uom || "L",
      short_name: shortName,
      status,
      status_rationale: statusRationale,
      created_by: userName,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Handle ingredients - REQUIRED
  const ingredientsJson = formData.get("ingredients") as string | null;
  let assignedCode: string | null = null;
  let duplicateWarning: string | null = null;

  // Validate: Ingredients are required
  if (!ingredientsJson) {
    await supabase
      .from("formulations")
      .delete()
      .eq("formulation_id", data.formulation_id);
    return { error: "At least one ingredient is required" };
  }

  if (data?.formulation_id) {
    try {
      const ingredients: IngredientInput[] = JSON.parse(ingredientsJson);
      
      // Validate: Require at least one ingredient
      if (ingredients.length === 0) {
        await supabase
          .from("formulations")
          .delete()
          .eq("formulation_id", data.formulation_id);
        return { error: "At least one ingredient is required" };
      }
      
      // Validate: Require at least one active ingredient
      // Fetch ingredient types to check for active ingredients
      const ingredientIds = ingredients.map(ing => ing.ingredient_id);
      const { data: ingredientData } = await supabase
        .from("ingredients")
        .select("ingredient_id, ingredient_type")
        .in("ingredient_id", ingredientIds);

      const hasActiveIngredient = ingredientData?.some(
        (ing) => ing.ingredient_type === "Active"
      );

      if (!hasActiveIngredient) {
        // Delete the formulation since validation failed
        await supabase
          .from("formulations")
          .delete()
          .eq("formulation_id", data.formulation_id);
        
        return { error: "At least one active ingredient is required" };
      }

      // Add ingredients
      const ingredientResult = await createFormulationIngredients(
        data.formulation_id,
        ingredients
      );
      
      if (ingredientResult.error) {
        // If duplicate detected, we should delete the formulation and return error
        if (ingredientResult.duplicateFormulationId) {
          await supabase
            .from("formulations")
            .delete()
            .eq("formulation_id", data.formulation_id);
          
          return {
            error: ingredientResult.error,
            duplicateFormulationId: ingredientResult.duplicateFormulationId,
            duplicateFormulationCode: ingredientResult.duplicateFormulationCode,
          };
        }
        
        // Other errors - formulation is already created
        return {
          error: `Formulation created but failed to add ingredients: ${ingredientResult.error}`,
          data,
        };
      }

      assignedCode = ingredientResult.formulationCode || null;
    } catch (parseError) {
      console.error("Failed to parse ingredients:", parseError);
      // Continue anyway - formulation is created
    }
  }

  // Note: Crops and targets are now managed separately via EPPO selectors
  // They are not required during formulation creation

  // Refresh formulation data to get assigned code
  const { data: updatedFormulation } = await supabase
    .from("formulations")
    .select("formulation_code, base_code, variant_suffix")
    .eq("formulation_id", data.formulation_id)
    .single();

  revalidatePath("/formulations");
  revalidatePath("/");
  return {
    data: updatedFormulation || data,
    success: true,
    formulationCode: updatedFormulation?.formulation_code || assignedCode,
    baseCode: updatedFormulation?.base_code || null,
    variantSuffix: updatedFormulation?.variant_suffix || null,
  };
}

export async function updateFormulation(formulationId: string, formData: FormData) {
  const supabase = await createClient();
  const userName = await getCurrentUserName();

  const formulationName = formData.get("formulation_name") as string;
  const formulationCategory = formData.get("formulation_category") as string;
  const formulationType = formData.get("formulation_type") as string | null;
  const uom = formData.get("uom") as string | null;
  const shortName = formData.get("short_name") as string | null;
  const status = formData.get("status") as string;
  const statusRationale = formData.get("status_rationale") as string | null;

  if (!formulationName || !formulationCategory || !formulationType || !uom || !status) {
    return { error: "Formulation name, category, type, unit of measure, and status are required" };
  }

  // Get current status to track changes
  const { data: current } = await supabase
    .from("formulations")
    .select("formulation_status")
    .eq("formulation_id", formulationId)
    .single();

  const updateData: any = {
    formulation_name: formulationName,
    formulation_category: formulationCategory,
    formulation_type: formulationType,
    uom: uom || "L",
    short_name: shortName,
    status_rationale: statusRationale,
    updated_at: new Date().toISOString(),
  };

  // Only update status if it changed
  if (current?.formulation_status !== status) {
    updateData.formulation_status = status;
    // The trigger should log this, but we ensure changed_by is set
    // Note: The trigger should handle logging, but we'll ensure status_rationale is available
  }

  const { data, error } = await supabase
    .from("formulations")
    .update(updateData)
    .eq("formulation_id", formulationId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Handle ingredients if provided
  const ingredientsJson = formData.get("ingredients") as string | null;
  let assignedCode: string | null = null;

  if (ingredientsJson) {
    try {
      const ingredients: IngredientInput[] = JSON.parse(ingredientsJson);
      
      // Validate: Require at least one active ingredient
      if (ingredients.length > 0) {
        // Fetch ingredient types to check for active ingredients
        const ingredientIds = ingredients.map(ing => ing.ingredient_id);
        const { data: ingredientData } = await supabase
          .from("ingredients")
          .select("ingredient_id, ingredient_type")
          .in("ingredient_id", ingredientIds);

        const hasActiveIngredient = ingredientData?.some(
          (ing) => ing.ingredient_type === "Active"
        );

        if (!hasActiveIngredient) {
          return { error: "At least one active ingredient is required" };
        }
      }
      
      const ingredientResult = await updateFormulationIngredients(formulationId, ingredients);
      if (ingredientResult.error) {
        // Check if it's a duplicate error
        if (ingredientResult.duplicateFormulationId && ingredientResult.duplicateFormulationId !== formulationId) {
          return {
            error: ingredientResult.error,
            duplicateFormulationId: ingredientResult.duplicateFormulationId,
            duplicateFormulationCode: ingredientResult.duplicateFormulationCode,
          };
        }
        return { error: `Formulation updated but failed to update ingredients: ${ingredientResult.error}` };
      }
      assignedCode = ingredientResult.formulationCode || null;
    } catch (parseError) {
      console.error("Failed to parse ingredients:", parseError);
      // Continue anyway - formulation is updated
    }
  }

  // Note: Crops and targets are now managed separately via EPPO selectors
  // They are not updated through this function

  // Refresh formulation data to get assigned code
  const { data: updatedFormulation } = await supabase
    .from("formulations")
    .select("formulation_code, base_code, variant_suffix")
    .eq("formulation_id", formulationId)
    .single();

  // If status changed, the trigger will log it automatically
  revalidatePath("/formulations");
  revalidatePath(`/formulations/${formulationId}`);
  revalidatePath("/");
  return {
    data: updatedFormulation || data,
    success: true,
    formulationCode: updatedFormulation?.formulation_code || assignedCode,
  };
}

export async function deleteFormulation(formulationId: string) {
  const supabase = await createClient();

  // Check if formulation has related data
  const { data: countryDetails } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId)
    .limit(1);

  if (countryDetails && countryDetails.length > 0) {
    return {
      error: "Cannot delete formulation with existing country registrations. Please remove registrations first.",
    };
  }

  const { error } = await supabase.from("formulations").delete().eq("formulation_id", formulationId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  revalidatePath("/");
  return { success: true };
}

/**
 * Add a crop to a formulation (normal use - global superset)
 * Note: cropId parameter is now an EPPO code ID
 * @deprecated Use addFormulationCrop from eppo-codes.ts instead
 */
export async function addFormulationCrop(
  formulationId: string,
  cropId: string, // Now expects eppo_code_id
  notes?: string | null
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_eppo_crops")
    .insert({
      formulation_id: formulationId,
      eppo_code_id: cropId,
      notes: notes || null,
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/formulations/${formulationId}`);
  revalidatePath("/formulations");
  return { success: true };
}

/**
 * Remove a crop from a formulation
 * Validates that crop is not used in any child use group first
 */
export async function removeFormulationCrop(formulationId: string, cropId: string) {
  const supabase = await createClient();

  // Check if crop is used in any use group (database trigger will also enforce this)
  // First get all formulation_country_ids for this formulation
  const { data: fcRecords } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId);

  if (!fcRecords || fcRecords.length === 0) {
    // No formulation countries, safe to delete
    const { error } = await supabase
      .from("formulation_eppo_crops")
      .delete()
      .eq("formulation_id", formulationId)
      .eq("eppo_code_id", cropId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/formulations/${formulationId}`);
    revalidatePath("/formulations");
    return { success: true };
  }

  const fcIds = fcRecords.map(fc => fc.formulation_country_id);
  const { data: useGroups } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id")
    .in("formulation_country_id", fcIds);

  if (useGroups && useGroups.length > 0) {
    const useGroupIds = useGroups.map(ug => ug.formulation_country_use_group_id);
    const { data: usedInGroups } = await supabase
      .from("formulation_country_use_group_eppo_crops")
      .select("formulation_country_use_group_id")
      .eq("eppo_code_id", cropId)
      .in("formulation_country_use_group_id", useGroupIds);

    if (usedInGroups && usedInGroups.length > 0) {
      return {
        error: "Cannot remove crop because it is used in one or more use groups. Please remove it from all use groups first.",
      };
    }
  }

  const { error } = await supabase
    .from("formulation_eppo_crops")
    .delete()
    .eq("formulation_id", formulationId)
    .eq("eppo_code_id", cropId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/formulations/${formulationId}`);
  revalidatePath("/formulations");
  return { success: true };
}

/**
 * Add a target to a formulation (normal use - global superset)
 * Note: targetId parameter is now an EPPO code ID
 * @deprecated Use addFormulationTarget from eppo-codes.ts instead
 */
export async function addFormulationTarget(
  formulationId: string,
  targetId: string, // Now expects eppo_code_id
  notes?: string | null
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_eppo_targets")
    .insert({
      formulation_id: formulationId,
      eppo_code_id: targetId,
      notes: notes || null,
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/formulations/${formulationId}`);
  revalidatePath("/formulations");
  return { success: true };
}

/**
 * Remove a target from a formulation
 * Validates that target is not used in any child use group first
 */
export async function removeFormulationTarget(formulationId: string, targetId: string) {
  const supabase = await createClient();

  // Check if target is used in any use group (database trigger will also enforce this)
  // First get all formulation_country_ids for this formulation
  const { data: fcRecords } = await supabase
    .from("formulation_country")
    .select("formulation_country_id")
    .eq("formulation_id", formulationId);

  if (!fcRecords || fcRecords.length === 0) {
    // No formulation countries, safe to delete
    const { error } = await supabase
      .from("formulation_eppo_targets")
      .delete()
      .eq("formulation_id", formulationId)
      .eq("eppo_code_id", targetId);

    if (error) {
      return { error: error.message };
    }

    revalidatePath(`/formulations/${formulationId}`);
    revalidatePath("/formulations");
    return { success: true };
  }

  const fcIds = fcRecords.map(fc => fc.formulation_country_id);
  const { data: useGroups } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id")
    .in("formulation_country_id", fcIds);

  if (useGroups && useGroups.length > 0) {
    const useGroupIds = useGroups.map(ug => ug.formulation_country_use_group_id);
    const { data: usedInGroups } = await supabase
      .from("formulation_country_use_group_eppo_targets")
      .select("formulation_country_use_group_id")
      .eq("eppo_code_id", targetId)
      .in("formulation_country_use_group_id", useGroupIds);

    if (usedInGroups && usedInGroups.length > 0) {
      return {
        error: "Cannot remove target because it is used in one or more use groups. Please remove it from all use groups first.",
      };
    }
  }

  const { error } = await supabase
    .from("formulation_eppo_targets")
    .delete()
    .eq("formulation_id", formulationId)
    .eq("eppo_code_id", targetId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/formulations/${formulationId}`);
  revalidatePath("/formulations");
  return { success: true };
}

