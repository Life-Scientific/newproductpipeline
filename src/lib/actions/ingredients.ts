"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createIngredient(formData: FormData) {
  const supabase = await createClient();

  const ingredientName = formData.get("ingredient_name") as string;
  const ingredientType = formData.get("ingredient_type") as string;
  const casNumber = formData.get("cas_number") as string | null;
  const standardDensity = formData.get("standard_density_g_per_l")
    ? Number(formData.get("standard_density_g_per_l"))
    : null;
  const supplyRisk = formData.get("supply_risk") as string | null;
  const supplyRiskNotes = formData.get("supply_risk_notes") as string | null;
  const isEuApproved = formData.get("is_eu_approved") === "true";
  const regulatoryNotes = formData.get("regulatory_notes") as string | null;

  if (!ingredientName || !ingredientType) {
    return { error: "Ingredient name and type are required" };
  }

  const { data, error } = await supabase
    .from("ingredients")
    .insert({
      ingredient_name: ingredientName,
      ingredient_type: ingredientType,
      cas_number: casNumber,
      standard_density_g_per_l: standardDensity,
      supply_risk: supplyRisk,
      supply_risk_notes: supplyRiskNotes,
      is_eu_approved: isEuApproved,
      regulatory_notes: regulatoryNotes,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  revalidatePath("/ingredients");
  return { data, success: true };
}

export async function updateIngredient(ingredientId: string, formData: FormData) {
  const supabase = await createClient();

  const ingredientName = formData.get("ingredient_name") as string | null;
  const ingredientType = formData.get("ingredient_type") as string | null;
  const casNumber = formData.get("cas_number") as string | null;
  const standardDensity = formData.get("standard_density_g_per_l")
    ? Number(formData.get("standard_density_g_per_l"))
    : null;
  const supplyRisk = formData.get("supply_risk") as string | null;
  const supplyRiskNotes = formData.get("supply_risk_notes") as string | null;
  const isEuApproved = formData.get("is_eu_approved") === "true";
  const regulatoryNotes = formData.get("regulatory_notes") as string | null;

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (ingredientName !== null) updateData.ingredient_name = ingredientName;
  if (ingredientType !== null) updateData.ingredient_type = ingredientType;
  if (casNumber !== null) updateData.cas_number = casNumber;
  if (standardDensity !== null) updateData.standard_density_g_per_l = standardDensity;
  if (supplyRisk !== null) updateData.supply_risk = supplyRisk;
  if (supplyRiskNotes !== null) updateData.supply_risk_notes = supplyRiskNotes;
  updateData.is_eu_approved = isEuApproved;
  if (regulatoryNotes !== null) updateData.regulatory_notes = regulatoryNotes;

  const { data, error } = await supabase
    .from("ingredients")
    .update(updateData)
    .eq("ingredient_id", ingredientId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  revalidatePath("/ingredients");
  return { data, success: true };
}

export async function deleteIngredient(ingredientId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("ingredients").delete().eq("ingredient_id", ingredientId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  revalidatePath("/ingredients");
  return { success: true };
}

