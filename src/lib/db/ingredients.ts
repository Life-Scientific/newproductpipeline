import { createClient } from "@/lib/supabase/server";
import type { Ingredient, IngredientUsage } from "./types";

export async function getIngredientUsage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("vw_ingredient_usage")
    .select("*")
    .order("ingredient_name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch ingredient usage: ${error.message}`);
  }

  return data as IngredientUsage[];
}

export async function getIngredientById(ingredientId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .eq("ingredient_id", ingredientId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch ingredient: ${error.message}`);
  }

  return data as Ingredient | null;
}

export async function getIngredientFormulations(ingredientId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("formulation_ingredients")
    .select(`
      *,
      formulations!inner(
        formulation_id,
        formulation_code,
        formulation_name,
        formulation_category,
        formulation_status,
        is_active
      )
    `)
    .eq("ingredient_id", ingredientId)
    .eq("formulations.is_active", true);

  if (error) {
    throw new Error(`Failed to fetch ingredient formulations: ${error.message}`);
  }

  // Filter out any formulations that aren't active (as a safety check)
  return (data || []).filter((fi: any) => fi.formulations?.is_active !== false);
}

export async function getIngredientSuppliers(ingredientId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ingredient_suppliers")
    .select("*, suppliers(*)")
    .eq("ingredient_id", ingredientId)
    .eq("suppliers.is_active", true);

  if (error) {
    throw new Error(`Failed to fetch ingredient suppliers: ${error.message}`);
  }

  return data || [];
}

