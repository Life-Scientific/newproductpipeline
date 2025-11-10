"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  createFormulationIngredients,
  updateFormulationIngredients,
  type IngredientInput,
} from "./formulation-ingredients";

export async function createFormulation(formData: FormData) {
  const supabase = await createClient();

  const productName = formData.get("product_name") as string;
  const productCategory = formData.get("product_category") as string;
  const formulationType = formData.get("formulation_type") as string | null;
  const uom = formData.get("uom") as string | null;
  const shortName = formData.get("short_name") as string | null;
  const status = (formData.get("status") as string) || "Not Yet Considered";
  const statusRationale = formData.get("status_rationale") as string | null;

  if (!productName || !productCategory) {
    return { error: "Product name and category are required" };
  }

  const { data, error } = await supabase
    .from("formulations")
    .insert({
      product_name: productName,
      product_category: productCategory,
      formulation_type: formulationType,
      uom: uom || "L",
      short_name: shortName,
      status,
      status_rationale: statusRationale,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Handle ingredients if provided
  const ingredientsJson = formData.get("ingredients") as string | null;
  if (ingredientsJson && data?.formulation_id) {
    try {
      const ingredients: IngredientInput[] = JSON.parse(ingredientsJson);
      const ingredientResult = await createFormulationIngredients(
        data.formulation_id,
        ingredients
      );
      if (ingredientResult.error) {
        // Note: Formulation is already created, but ingredients failed
        // In production, you might want to rollback or handle this differently
        return { error: `Formulation created but failed to add ingredients: ${ingredientResult.error}` };
      }
    } catch (parseError) {
      console.error("Failed to parse ingredients:", parseError);
      // Continue anyway - formulation is created
    }
  }

  revalidatePath("/formulations");
  revalidatePath("/");
  return { data, success: true };
}

export async function updateFormulation(formulationId: string, formData: FormData) {
  const supabase = await createClient();

  const productName = formData.get("product_name") as string;
  const productCategory = formData.get("product_category") as string;
  const formulationType = formData.get("formulation_type") as string | null;
  const uom = formData.get("uom") as string | null;
  const shortName = formData.get("short_name") as string | null;
  const status = formData.get("status") as string;
  const statusRationale = formData.get("status_rationale") as string | null;

  if (!productName || !productCategory || !status) {
    return { error: "Product name, category, and status are required" };
  }

  // Get current status to track changes
  const { data: current } = await supabase
    .from("formulations")
    .select("status")
    .eq("formulation_id", formulationId)
    .single();

  const updateData: any = {
    product_name: productName,
    product_category: productCategory,
    formulation_type: formulationType,
    uom: uom || "L",
    short_name: shortName,
    status_rationale: statusRationale,
    updated_at: new Date().toISOString(),
  };

  // Only update status if it changed
  if (current?.status !== status) {
    updateData.status = status;
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
  if (ingredientsJson) {
    try {
      const ingredients: IngredientInput[] = JSON.parse(ingredientsJson);
      const ingredientResult = await updateFormulationIngredients(formulationId, ingredients);
      if (ingredientResult.error) {
        return { error: `Formulation updated but failed to update ingredients: ${ingredientResult.error}` };
      }
    } catch (parseError) {
      console.error("Failed to parse ingredients:", parseError);
      // Continue anyway - formulation is updated
    }
  }

  // If status changed, the trigger will log it automatically
  revalidatePath("/formulations");
  revalidatePath(`/formulations/${formulationId}`);
  revalidatePath("/");
  return { data, success: true };
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

