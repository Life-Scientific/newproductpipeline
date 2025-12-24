"use server";

import { createClient } from "@/lib/supabase/server";
import { log, warn, error, table } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

export async function getReferenceProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reference_products")
    .select("*")
    .eq("is_active", true)
    .order("product_name");

  if (error) {
    error("Failed to fetch reference products:", error);
    return [];
  }

  return data;
}

export async function createReferenceProduct(formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.REFERENCE_PRODUCT_EDIT);
  if (!canEdit) {
    return {
      error:
        "Unauthorized: You don't have permission to manage reference products",
    };
  }

  const supabase = await createClient();

  const productName = formData.get("product_name") as string;
  const manufacturer = formData.get("manufacturer") as string | null;
  const supplierId = formData.get("supplier_id") as string | null;
  const activeIngredientsDescription = formData.get(
    "active_ingredients_description",
  ) as string | null;
  const formulationType = formData.get("formulation_type") as string | null;
  const registrationNumber = formData.get("registration_number") as
    | string
    | null;
  const notes = formData.get("notes") as string | null;

  if (!productName) {
    return { error: "Product name is required" };
  }

  const { data, error } = await supabase
    .from("reference_products")
    .insert({
      product_name: productName,
      manufacturer: manufacturer,
      supplier_id: supplierId || null,
      active_ingredients_description: activeIngredientsDescription,
      formulation_type: formulationType,
      registration_number: registrationNumber,
      notes: notes,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function updateReferenceProduct(
  referenceProductId: string,
  formData: FormData,
) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.REFERENCE_PRODUCT_EDIT);
  if (!canEdit) {
    return {
      error:
        "Unauthorized: You don't have permission to manage reference products",
    };
  }

  const supabase = await createClient();

  const productName = formData.get("product_name") as string | null;
  const manufacturer = formData.get("manufacturer") as string | null;
  const supplierId = formData.get("supplier_id") as string | null;
  const activeIngredientsDescription = formData.get(
    "active_ingredients_description",
  ) as string | null;
  const formulationType = formData.get("formulation_type") as string | null;
  const registrationNumber = formData.get("registration_number") as
    | string
    | null;
  const notes = formData.get("notes") as string | null;
  const isActive = formData.get("is_active") === "true";

  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  if (productName !== null) updateData.product_name = productName;
  if (manufacturer !== null) updateData.manufacturer = manufacturer;
  if (supplierId !== null) updateData.supplier_id = supplierId || null;
  if (activeIngredientsDescription !== null)
    updateData.active_ingredients_description = activeIngredientsDescription;
  if (formulationType !== null) updateData.formulation_type = formulationType;
  if (registrationNumber !== null)
    updateData.registration_number = registrationNumber;
  if (notes !== null) updateData.notes = notes;
  updateData.is_active = isActive;

  const { data, error } = await supabase
    .from("reference_products")
    .update(updateData)
    .eq("reference_product_id", referenceProductId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function deleteReferenceProduct(referenceProductId: string) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.REFERENCE_PRODUCT_EDIT);
  if (!canEdit) {
    return {
      error:
        "Unauthorized: You don't have permission to manage reference products",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("reference_products")
    .delete()
    .eq("reference_product_id", referenceProductId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { success: true };
}
