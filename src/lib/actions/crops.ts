"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createCrop(formData: FormData) {
  const supabase = await createClient();

  const cropName = formData.get("crop_name") as string;
  const cropCategory = formData.get("crop_category") as string | null;

  if (!cropName) {
    return { error: "Crop name is required" };
  }

  const { data, error } = await supabase
    .from("crops")
    .insert({
      crop_name: cropName,
      crop_category: cropCategory,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function updateCrop(cropId: string, formData: FormData) {
  const supabase = await createClient();

  const cropName = formData.get("crop_name") as string | null;
  const cropCategory = formData.get("crop_category") as string | null;
  const isActive = formData.get("is_active") === "true";

  const updateData: any = {};

  if (cropName !== null) updateData.crop_name = cropName;
  if (cropCategory !== null) updateData.crop_category = cropCategory;
  updateData.is_active = isActive;

  const { data, error } = await supabase
    .from("crops")
    .update(updateData)
    .eq("crop_id", cropId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function deleteCrop(cropId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("crops").delete().eq("crop_id", cropId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { success: true };
}
