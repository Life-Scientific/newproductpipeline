"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ============================================================================
// EPPO Code Management
// ============================================================================

export async function searchEPPOCodes(params: {
  search?: string;
  classification?:
    | "crop"
    | "insect"
    | "disease"
    | "weed"
    | ("crop" | "insect" | "disease" | "weed")[];
  eppoType?:
    | "individual_crop"
    | "crop_group"
    | "individual_target"
    | "target_group";
  isParent?: boolean;
  limit?: number;
}) {
  const supabase = await createClient();

  let query = supabase.from("eppo_codes").select("*").eq("is_active", true);

  if (params.search && params.search.trim().length > 0) {
    const searchTerm = params.search.trim();
    // Improved fuzzy search: search across multiple fields with better matching
    // This searches display_name, latin_name, eppo_code, and common language names
    const searchPattern = `%${searchTerm}%`;
    query = query.or(
      `display_name.ilike.${searchPattern},` +
        `latin_name.ilike.${searchPattern},` +
        `eppo_code.ilike.${searchPattern},` +
        `english_name.ilike.${searchPattern},` +
        `german_name.ilike.${searchPattern},` +
        `french_name.ilike.${searchPattern},` +
        `spanish_name.ilike.${searchPattern}`,
    );
  }

  if (params.classification) {
    if (Array.isArray(params.classification)) {
      query = query.in("classification", params.classification);
    } else {
      query = query.eq("classification", params.classification);
    }
  }

  if (params.eppoType) {
    query = query.eq("eppo_type", params.eppoType);
  }

  if (params.isParent !== undefined) {
    query = query.eq("is_parent", params.isParent);
  }

  // Order by relevance: exact matches first, then display_name
  query = query.order("display_name", { ascending: true });

  if (params.limit) {
    query = query.limit(params.limit);
  } else {
    // Default limit for performance
    query = query.limit(100);
  }

  const { data, error } = await query;

  if (error) {
    return { error: error.message };
  }

  // Sort results by relevance (exact matches first, then partial matches)
  if (params.search && data) {
    const searchLower = params.search.toLowerCase();
    data.sort((a, b) => {
      const aDisplay = (a.display_name || "").toLowerCase();
      const bDisplay = (b.display_name || "").toLowerCase();
      const aCode = (a.eppo_code || "").toLowerCase();
      const bCode = (b.eppo_code || "").toLowerCase();

      // Exact match in display name
      const aExactDisplay = aDisplay === searchLower ? 1 : 0;
      const bExactDisplay = bDisplay === searchLower ? 1 : 0;
      if (aExactDisplay !== bExactDisplay) return bExactDisplay - aExactDisplay;

      // Starts with search term
      const aStarts = aDisplay.startsWith(searchLower) ? 1 : 0;
      const bStarts = bDisplay.startsWith(searchLower) ? 1 : 0;
      if (aStarts !== bStarts) return bStarts - aStarts;

      // Exact match in code
      const aExactCode = aCode === searchLower ? 1 : 0;
      const bExactCode = bCode === searchLower ? 1 : 0;
      if (aExactCode !== bExactCode) return bExactCode - aExactCode;

      // Alphabetical fallback
      return aDisplay.localeCompare(bDisplay);
    });
  }

  return { data, success: true };
}

export async function getEPPOCodeById(eppoCodeId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("eppo_codes")
    .select("*")
    .eq("eppo_code_id", eppoCodeId)
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

export async function getEPPOCodeChildren(eppoCode: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("eppo_codes")
    .select("*")
    .eq("parent_eppo_code", eppoCode)
    .eq("is_active", true)
    .order("display_name", { ascending: true });

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

// ============================================================================
// Formulation EPPO Crops
// ============================================================================

export async function addFormulationCrop(params: {
  formulationId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  notes?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_eppo_crops")
    .insert({
      formulation_id: params.formulationId,
      eppo_code_id: params.eppoCodeId,
      include_children: params.includeChildren || false,
      is_excluded: false,
      notes: params.notes,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function updateFormulationCrop(params: {
  formulationId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isExcluded?: boolean;
  notes?: string;
}) {
  const supabase = await createClient();

  const updateData: any = {};
  if (params.includeChildren !== undefined)
    updateData.include_children = params.includeChildren;
  if (params.isExcluded !== undefined)
    updateData.is_excluded = params.isExcluded;
  if (params.notes !== undefined) updateData.notes = params.notes;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("formulation_eppo_crops")
    .update(updateData)
    .eq("formulation_id", params.formulationId)
    .eq("eppo_code_id", params.eppoCodeId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function removeFormulationCrop(
  formulationId: string,
  eppoCodeId: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_eppo_crops")
    .delete()
    .eq("formulation_id", formulationId)
    .eq("eppo_code_id", eppoCodeId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { success: true };
}

export async function getFormulationCrops(formulationId: string) {
  const supabase = await createClient();

  // Get expanded crop list using helper function
  const { data, error } = await supabase.rpc("get_formulation_crops", {
    f_id: formulationId,
  });

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

// ============================================================================
// Formulation EPPO Targets
// ============================================================================

export async function addFormulationTarget(params: {
  formulationId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  notes?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_eppo_targets")
    .insert({
      formulation_id: params.formulationId,
      eppo_code_id: params.eppoCodeId,
      include_children: params.includeChildren || false,
      is_excluded: false,
      notes: params.notes,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function updateFormulationTarget(params: {
  formulationId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isExcluded?: boolean;
  notes?: string;
}) {
  const supabase = await createClient();

  const updateData: any = {};
  if (params.includeChildren !== undefined)
    updateData.include_children = params.includeChildren;
  if (params.isExcluded !== undefined)
    updateData.is_excluded = params.isExcluded;
  if (params.notes !== undefined) updateData.notes = params.notes;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("formulation_eppo_targets")
    .update(updateData)
    .eq("formulation_id", params.formulationId)
    .eq("eppo_code_id", params.eppoCodeId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function removeFormulationTarget(
  formulationId: string,
  eppoCodeId: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_eppo_targets")
    .delete()
    .eq("formulation_id", formulationId)
    .eq("eppo_code_id", eppoCodeId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { success: true };
}

export async function getFormulationTargets(formulationId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_formulation_targets", {
    f_id: formulationId,
  });

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

// ============================================================================
// Use Group EPPO Crops
// ============================================================================

export async function addUseGroupCrop(params: {
  useGroupId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isCritical?: boolean;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_country_use_group_eppo_crops")
    .insert({
      formulation_country_use_group_id: params.useGroupId,
      eppo_code_id: params.eppoCodeId,
      include_children: params.includeChildren || false,
      is_excluded: false,
      is_critical: params.isCritical || false,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function updateUseGroupCrop(params: {
  useGroupId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isExcluded?: boolean;
  isCritical?: boolean;
}) {
  const supabase = await createClient();

  const updateData: any = {};
  if (params.includeChildren !== undefined)
    updateData.include_children = params.includeChildren;
  if (params.isExcluded !== undefined)
    updateData.is_excluded = params.isExcluded;
  if (params.isCritical !== undefined)
    updateData.is_critical = params.isCritical;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("formulation_country_use_group_eppo_crops")
    .update(updateData)
    .eq("formulation_country_use_group_id", params.useGroupId)
    .eq("eppo_code_id", params.eppoCodeId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function removeUseGroupCrop(
  useGroupId: string,
  eppoCodeId: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_country_use_group_eppo_crops")
    .delete()
    .eq("formulation_country_use_group_id", useGroupId)
    .eq("eppo_code_id", eppoCodeId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { success: true };
}

export async function getUseGroupCrops(useGroupId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_use_group_crops", {
    ug_id: useGroupId,
  });

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

// ============================================================================
// Use Group EPPO Targets
// ============================================================================

export async function addUseGroupTarget(params: {
  useGroupId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isCritical?: boolean;
  notes?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_country_use_group_eppo_targets")
    .insert({
      formulation_country_use_group_id: params.useGroupId,
      eppo_code_id: params.eppoCodeId,
      include_children: params.includeChildren || false,
      is_excluded: false,
      is_critical: params.isCritical || false,
      notes: params.notes,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function updateUseGroupTarget(params: {
  useGroupId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isExcluded?: boolean;
  isCritical?: boolean;
  notes?: string;
}) {
  const supabase = await createClient();

  const updateData: any = {};
  if (params.includeChildren !== undefined)
    updateData.include_children = params.includeChildren;
  if (params.isExcluded !== undefined)
    updateData.is_excluded = params.isExcluded;
  if (params.isCritical !== undefined)
    updateData.is_critical = params.isCritical;
  if (params.notes !== undefined) updateData.notes = params.notes;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("formulation_country_use_group_eppo_targets")
    .update(updateData)
    .eq("formulation_country_use_group_id", params.useGroupId)
    .eq("eppo_code_id", params.eppoCodeId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { data, success: true };
}

export async function removeUseGroupTarget(
  useGroupId: string,
  eppoCodeId: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulation_country_use_group_eppo_targets")
    .delete()
    .eq("formulation_country_use_group_id", useGroupId)
    .eq("eppo_code_id", eppoCodeId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/formulations");
  return { success: true };
}

export async function getUseGroupTargets(useGroupId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_use_group_targets", {
    ug_id: useGroupId,
  });

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

// ============================================================================
// Reference Product EPPO Crops
// ============================================================================

export async function addReferenceProductCrop(params: {
  referenceProductId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reference_product_eppo_crops")
    .insert({
      reference_product_id: params.referenceProductId,
      eppo_code_id: params.eppoCodeId,
      include_children: params.includeChildren || false,
      is_excluded: false,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function updateReferenceProductCrop(params: {
  referenceProductId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isExcluded?: boolean;
}) {
  const supabase = await createClient();

  const updateData: any = {};
  if (params.includeChildren !== undefined)
    updateData.include_children = params.includeChildren;
  if (params.isExcluded !== undefined)
    updateData.is_excluded = params.isExcluded;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("reference_product_eppo_crops")
    .update(updateData)
    .eq("reference_product_id", params.referenceProductId)
    .eq("eppo_code_id", params.eppoCodeId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function removeReferenceProductCrop(
  referenceProductId: string,
  eppoCodeId: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reference_product_eppo_crops")
    .delete()
    .eq("reference_product_id", referenceProductId)
    .eq("eppo_code_id", eppoCodeId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { success: true };
}

// ============================================================================
// Reference Product EPPO Targets
// ============================================================================

export async function addReferenceProductTarget(params: {
  referenceProductId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("reference_product_eppo_targets")
    .insert({
      reference_product_id: params.referenceProductId,
      eppo_code_id: params.eppoCodeId,
      include_children: params.includeChildren || false,
      is_excluded: false,
    })
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function updateReferenceProductTarget(params: {
  referenceProductId: string;
  eppoCodeId: string;
  includeChildren?: boolean;
  isExcluded?: boolean;
}) {
  const supabase = await createClient();

  const updateData: any = {};
  if (params.includeChildren !== undefined)
    updateData.include_children = params.includeChildren;
  if (params.isExcluded !== undefined)
    updateData.is_excluded = params.isExcluded;
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("reference_product_eppo_targets")
    .update(updateData)
    .eq("reference_product_id", params.referenceProductId)
    .eq("eppo_code_id", params.eppoCodeId)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { data, success: true };
}

export async function removeReferenceProductTarget(
  referenceProductId: string,
  eppoCodeId: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("reference_product_eppo_targets")
    .delete()
    .eq("reference_product_id", referenceProductId)
    .eq("eppo_code_id", eppoCodeId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/reference");
  return { success: true };
}

// ============================================================================
// Formulation Country Crops/Targets (Derived from Use Groups)
// ============================================================================

export async function getFormulationCountryCrops(formulationCountryId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_formulation_country_crops", {
    fc_id: formulationCountryId,
  });

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

export async function getFormulationCountryTargets(
  formulationCountryId: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc(
    "get_formulation_country_targets",
    { fc_id: formulationCountryId },
  );

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

// ============================================================================
// Audit History
// ============================================================================

export async function getFormulationCropsAudit(
  formulationId: string,
  limit: number = 50,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_eppo_crops_audit")
    .select("*, eppo_codes(display_name)")
    .eq("formulation_id", formulationId)
    .order("changed_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}

export async function getFormulationTargetsAudit(
  formulationId: string,
  limit: number = 50,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulation_eppo_targets_audit")
    .select("*, eppo_codes(display_name)")
    .eq("formulation_id", formulationId)
    .order("changed_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { error: error.message };
  }

  return { data, success: true };
}
