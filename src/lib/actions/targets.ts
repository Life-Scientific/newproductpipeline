"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTarget(formData: FormData) {
  const supabase = await createClient();

  const targetName = formData.get("target_name") as string;
  const targetType = formData.get("target_type") as string;
  const targetCategory = formData.get("target_category") as string | null;

  if (!targetName || !targetType) {
    return { error: "Target name and type are required" };
  }

  const { data, error } = await supabase
    .from("targets")
    .insert({
      target_name: targetName,
      target_type: targetType,
      target_category: targetCategory,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function updateTarget(targetId: string, formData: FormData) {
  const supabase = await createClient();

  const targetName = formData.get("target_name") as string | null;
  const targetType = formData.get("target_type") as string | null;
  const targetCategory = formData.get("target_category") as string | null;
  const isActive = formData.get("is_active") === "true";

  const updateData: any = {};

  if (targetName !== null) updateData.target_name = targetName;
  if (targetType !== null) updateData.target_type = targetType;
  if (targetCategory !== null) updateData.target_category = targetCategory;
  updateData.is_active = isActive;

  const { data, error } = await supabase
    .from("targets")
    .update(updateData)
    .eq("target_id", targetId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function deleteTarget(targetId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("targets")
    .delete()
    .eq("target_id", targetId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { success: true };
}
