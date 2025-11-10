"use server";

import { createClient } from "@/lib/supabase/server";

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

  return { success: true };
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
  }

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

  return { success: true };
}

