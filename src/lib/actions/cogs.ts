"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCOGS(formData: FormData) {
  const supabase = await createClient();

  const formulationId = formData.get("formulation_id") as string;
  const formulationCountryId = formData.get("formulation_country_id") as string | null;
  const fiscalYear = formData.get("fiscal_year") as string;
  const cogsValue = Number(formData.get("cogs_value"));
  const rawMaterialCost = formData.get("raw_material_cost")
    ? Number(formData.get("raw_material_cost"))
    : null;
  const manufacturingCost = formData.get("manufacturing_cost")
    ? Number(formData.get("manufacturing_cost"))
    : null;
  const packagingCost = formData.get("packaging_cost")
    ? Number(formData.get("packaging_cost"))
    : null;
  const otherCosts = formData.get("other_costs") ? Number(formData.get("other_costs")) : null;
  const notes = formData.get("notes") as string | null;

  if (!formulationId || !fiscalYear || !cogsValue) {
    return { error: "Formulation, fiscal year, and COGS value are required" };
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from("cogs")
    .select("cogs_id")
    .eq("formulation_id", formulationId)
    .eq("fiscal_year", fiscalYear)
    .eq("formulation_country_id", formulationCountryId || null)
    .single();

  if (existing) {
    return { error: "COGS record already exists for this formulation, country, and fiscal year" };
  }

  const { data, error } = await supabase
    .from("cogs")
    .insert({
      formulation_id: formulationId,
      formulation_country_id: formulationCountryId || null,
      fiscal_year: fiscalYear,
      cogs_value: cogsValue,
      raw_material_cost: rawMaterialCost,
      manufacturing_cost: manufacturingCost,
      packaging_cost: packagingCost,
      other_costs: otherCosts,
      notes,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/cogs");
  revalidatePath("/formulations");
  return { data, success: true };
}

export async function updateCOGS(cogsId: string, formData: FormData) {
  const supabase = await createClient();

  const fiscalYear = formData.get("fiscal_year") as string | null;
  const cogsValue = formData.get("cogs_value") ? Number(formData.get("cogs_value")) : null;
  const rawMaterialCost = formData.get("raw_material_cost")
    ? Number(formData.get("raw_material_cost"))
    : null;
  const manufacturingCost = formData.get("manufacturing_cost")
    ? Number(formData.get("manufacturing_cost"))
    : null;
  const packagingCost = formData.get("packaging_cost")
    ? Number(formData.get("packaging_cost"))
    : null;
  const otherCosts = formData.get("other_costs") ? Number(formData.get("other_costs")) : null;
  const notes = formData.get("notes") as string | null;

  const updateData: any = {
    last_updated_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (fiscalYear !== null) updateData.fiscal_year = fiscalYear;
  if (cogsValue !== null) updateData.cogs_value = cogsValue;
  if (rawMaterialCost !== null) updateData.raw_material_cost = rawMaterialCost;
  if (manufacturingCost !== null) updateData.manufacturing_cost = manufacturingCost;
  if (packagingCost !== null) updateData.packaging_cost = packagingCost;
  if (otherCosts !== null) updateData.other_costs = otherCosts;
  if (notes !== null) updateData.notes = notes;

  const { data, error } = await supabase
    .from("cogs")
    .update(updateData)
    .eq("cogs_id", cogsId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/cogs");
  revalidatePath("/formulations");
  return { data, success: true };
}

export async function deleteCOGS(cogsId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("cogs").delete().eq("cogs_id", cogsId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/cogs");
  revalidatePath("/formulations");
  return { success: true };
}

