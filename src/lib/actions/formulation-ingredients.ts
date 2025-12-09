"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface IngredientInput {
  ingredient_id: string;
  quantity: string;
  quantity_unit: string;
  ingredient_role: string;
  notes: string;
}

export async function createFormulationIngredients(
  formulationId: string,
  ingredients: IngredientInput[]
) {
  const supabase = await createClient();

  if (ingredients.length === 0) {
    return { success: true };
  }

  const ingredientInserts = ingredients.map((ing) => ({
    formulation_id: formulationId,
    ingredient_id: ing.ingredient_id,
    quantity: parseFloat(ing.quantity),
    quantity_unit: ing.quantity_unit,
    ingredient_role: ing.ingredient_role || null,
    notes: ing.notes || null,
  }));

  const { error } = await supabase
    .from("formulation_ingredients")
    .insert(ingredientInserts);

  if (error) {
    return { error: error.message };
  }

  // Trigger code generation by calling the database function
  // The trigger should handle this automatically, but we'll also call it explicitly
  // to ensure code is assigned immediately
  const { data: signature, error: sigError } = await supabase.rpc(
    "calculate_active_signature_from_table",
    { p_formulation_id: formulationId }
  );

  if (sigError) {
    console.error("Failed to calculate active signature:", sigError);
    // Don't fail the whole operation, but log the error
  }

  // Check for duplicate before assigning code
  const { data: duplicateId, error: dupError } = await supabase.rpc(
    "check_duplicate_formulation",
    { p_temp_formulation_id: formulationId }
  );

  if (dupError) {
    console.error("Failed to check for duplicates:", dupError);
  }

  // If duplicate found, return error with existing formulation code
  if (duplicateId) {
    const { data: existingFormulation } = await supabase
      .from("formulations")
      .select("formulation_code, product_name")
      .eq("formulation_id", duplicateId)
      .single();

    if (existingFormulation) {
      return {
        error: `This product already exists as ${existingFormulation.formulation_code} (${existingFormulation.product_name}). Please use the existing product or change the concentration.`,
        duplicateFormulationId: duplicateId,
        duplicateFormulationCode: existingFormulation.formulation_code,
      };
    }
  }

  // The trigger trg_assign_formulation_code should handle code assignment
  // But we'll verify it worked by checking the formulation
  const { data: updatedFormulation } = await supabase
    .from("formulations")
    .select("formulation_code, base_code, variant_suffix")
    .eq("formulation_id", formulationId)
    .single();

  // Revalidate paths for fresh data
  revalidatePath(`/portfolio/formulations/${formulationId}`);
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");

  return {
    success: true,
    formulationCode: updatedFormulation?.formulation_code || null,
    baseCode: updatedFormulation?.base_code || null,
    variantSuffix: updatedFormulation?.variant_suffix || null,
  };
}

export async function updateFormulationIngredients(
  formulationId: string,
  ingredients: IngredientInput[]
) {
  const supabase = await createClient();

  // Delete all existing ingredients
  const { error: deleteError } = await supabase
    .from("formulation_ingredients")
    .delete()
    .eq("formulation_id", formulationId);

  if (deleteError) {
    return { error: deleteError.message };
  }

  // Insert new ingredients
  if (ingredients.length > 0) {
    const result = await createFormulationIngredients(formulationId, ingredients);
    if (result.error) {
      return result;
    }
    // Return the code information if available
    return result;
  }

  // If no ingredients, clear the code
  const { error: updateError } = await supabase
    .from("formulations")
    .update({
      base_code: "",
      variant_suffix: "",
      active_signature: null,
    })
    .eq("formulation_id", formulationId);

  if (updateError) {
    return { error: updateError.message };
  }

  // Revalidate paths for fresh data
  revalidatePath(`/portfolio/formulations/${formulationId}`);
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");

  return { success: true };
}

export async function deleteFormulationIngredient(ingredientId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_ingredients")
    .delete()
    .eq("formulation_ingredient_id", ingredientId);

  if (error) {
    return { error: error.message };
  }

  // Revalidate paths for fresh data
  revalidatePath("/portfolio/formulations");
  revalidatePath("/portfolio");

  return { success: true };
}

