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
      created_by: userName,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  // Handle ingredients if provided
  const ingredientsJson = formData.get("ingredients") as string | null;
  let assignedCode: string | null = null;
  let duplicateWarning: string | null = null;

  if (ingredientsJson && data?.formulation_id) {
    try {
      const ingredients: IngredientInput[] = JSON.parse(ingredientsJson);
      
      // Check for active ingredients before proceeding
      const activeIngredients = ingredients.filter((ing) => {
        // We need to check if ingredient is active type
        // This will be verified in the database function
        return ing.ingredient_id;
      });

      if (activeIngredients.length > 0) {
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
      } else {
        // No active ingredients - just add non-active ingredients
        const ingredientResult = await createFormulationIngredients(
          data.formulation_id,
          ingredients
        );
        if (ingredientResult.error) {
          return {
            error: `Formulation created but failed to add ingredients: ${ingredientResult.error}`,
            data,
          };
        }
      }
    } catch (parseError) {
      console.error("Failed to parse ingredients:", parseError);
      // Continue anyway - formulation is created
    }
  }

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

