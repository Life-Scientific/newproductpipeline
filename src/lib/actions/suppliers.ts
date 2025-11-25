"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { hasPermission } from "./user-management";
import { PERMISSIONS } from "@/lib/permissions";

export async function createSupplier(formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.SUPPLIER_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage suppliers" };
  }

  const supabase = await createClient();

  const supplierName = formData.get("supplier_name") as string;
  const supplierCode = formData.get("supplier_code") as string | null;
  const address = formData.get("address") as string | null;
  const countryId = formData.get("country_id") as string | null;

  if (!supplierName) {
    return { error: "Supplier name is required" };
  }

  const { data, error } = await supabase
    .from("suppliers")
    .insert({
      supplier_name: supplierName,
      supplier_code: supplierCode,
      address: address,
      country_id: countryId || null,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function updateSupplier(supplierId: string, formData: FormData) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.SUPPLIER_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage suppliers" };
  }

  const supabase = await createClient();

  const supplierName = formData.get("supplier_name") as string | null;
  const supplierCode = formData.get("supplier_code") as string | null;
  const address = formData.get("address") as string | null;
  const countryId = formData.get("country_id") as string | null;
  const isActive = formData.get("is_active") === "true";

  const updateData: any = {};

  if (supplierName !== null) updateData.supplier_name = supplierName;
  if (supplierCode !== null) updateData.supplier_code = supplierCode;
  if (address !== null) updateData.address = address;
  if (countryId !== null) updateData.country_id = countryId || null;
  updateData.is_active = isActive;

  const { data, error } = await supabase
    .from("suppliers")
    .update(updateData)
    .eq("supplier_id", supplierId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function deleteSupplier(supplierId: string) {
  // Permission check
  const canEdit = await hasPermission(PERMISSIONS.SUPPLIER_EDIT);
  if (!canEdit) {
    return { error: "Unauthorized: You don't have permission to manage suppliers" };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("suppliers").delete().eq("supplier_id", supplierId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { success: true };
}

