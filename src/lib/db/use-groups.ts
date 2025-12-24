import { createClient } from "@/lib/supabase/server";
import type { FormulationCountryUseGroup } from "./types";

export async function getAllUseGroups() {
  const supabase = await createClient();

  // Fetch all use groups with pagination to avoid 10k row limit
  let allUseGroups: any[] = [];
  let page = 0;
  const pageSize = 10000;
  let hasMore = true;

  while (hasMore) {
    const { data: useGroups, error } = await supabase
      .from("vw_formulation_country_use_group")
      .select("*")
      .order("formulation_code", { ascending: true })
      .order("country_name", { ascending: true })
      .order("use_group_name", { ascending: true })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    if (error) {
      throw new Error(`Failed to fetch use groups: ${error.message}`);
    }

    if (!useGroups || useGroups.length === 0) {
      hasMore = false;
    } else {
      allUseGroups = [...allUseGroups, ...useGroups];
      hasMore = useGroups.length === pageSize;
      page++;
    }
  }

  if (allUseGroups.length === 0) {
    return [];
  }

  // Get unique formulation_country_ids and fetch formulation_ids (also paginated)
  const countryIds = [
    ...new Set(
      allUseGroups.map((ug) => ug.formulation_country_id).filter(Boolean),
    ),
  ] as string[];

  // Fetch in batches to avoid .in() query URL length limits
  const batchSize = 5000;
  const countryIdToFormulationId = new Map<string, string>();

  for (let i = 0; i < countryIds.length; i += batchSize) {
    const batch = countryIds.slice(i, i + batchSize);
    const { data: countryData } = await supabase
      .from("formulation_country")
      .select("formulation_country_id, formulation_id")
      .in("formulation_country_id", batch);

    countryData?.forEach((fc) => {
      if (fc.formulation_country_id) {
        countryIdToFormulationId.set(
          fc.formulation_country_id,
          fc.formulation_id,
        );
      }
    });
  }

  // Map use groups to include formulation_id
  const useGroupsWithFormulationId = allUseGroups.map((useGroup) => ({
    ...useGroup,
    formulation_id: useGroup.formulation_country_id
      ? countryIdToFormulationId.get(useGroup.formulation_country_id) || null
      : null,
  }));

  return useGroupsWithFormulationId as (FormulationCountryUseGroup & {
    formulation_id: string | null;
  })[];
}

export async function getUseGroupById(useGroupId: string) {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("vw_formulation_country_use_group")
    .select("*")
    .eq("formulation_country_use_group_id", useGroupId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch use group: ${error.message}`);
  }

  // Get formulation_id through formulation_country
  if (data && data.formulation_country_id) {
    const { data: fcData } = await supabase
      .from("formulation_country")
      .select("formulation_id")
      .eq("formulation_country_id", data.formulation_country_id)
      .single();

    if (fcData) {
      (data as any).formulation_id = fcData.formulation_id;
    }
  }

  return data as
    | (FormulationCountryUseGroup & { formulation_id?: string })
    | null;
}

/**
 * Get crops for a use group with critical flags (using EPPO codes)
 */
export async function getUseGroupCrops(useGroupId: string) {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("formulation_country_use_group_eppo_crops")
    .select(`
      eppo_code_id,
      is_critical,
      eppo_codes (
        eppo_code_id,
        eppo_code,
        display_name,
        classification,
        eppo_type
      )
    `)
    .eq("formulation_country_use_group_id", useGroupId)
    .eq("is_excluded", false);

  if (error) {
    throw new Error(`Failed to fetch use group crops: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Map EPPO codes with is_critical flag
  return data.map((ugc: any) => ({
    eppo_code_id: ugc.eppo_code_id,
    eppo_code: ugc.eppo_codes?.eppo_code,
    display_name: ugc.eppo_codes?.display_name,
    classification: ugc.eppo_codes?.classification,
    eppo_type: ugc.eppo_codes?.eppo_type,
    is_critical: ugc.is_critical || false,
  }));
}

/**
 * Get targets for a use group with critical flags (using EPPO codes)
 */
export async function getUseGroupTargets(useGroupId: string) {
  const supabase = await createClient();

  const { data, error: supabaseError } = await supabase
    .from("formulation_country_use_group_eppo_targets")
    .select(`
      eppo_code_id,
      is_critical,
      eppo_codes (
        eppo_code_id,
        eppo_code,
        display_name,
        classification,
        eppo_type
      )
    `)
    .eq("formulation_country_use_group_id", useGroupId)
    .eq("is_excluded", false);

  if (error) {
    throw new Error(`Failed to fetch use group targets: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Map EPPO codes with is_critical flag
  return data.map((ugt: any) => ({
    eppo_code_id: ugt.eppo_code_id,
    eppo_code: ugt.eppo_codes?.eppo_code,
    display_name: ugt.eppo_codes?.display_name,
    classification: ugt.eppo_codes?.classification,
    eppo_type: ugt.eppo_codes?.eppo_type,
    is_critical: ugt.is_critical || false,
  }));
}

export async function validateUseGroupTargetEntryConsistency(
  useGroupIds: string[],
): Promise<{
  isValid: boolean;
  targetEntry: string | null;
  error: string | null;
}> {
  const supabase = await createClient();

  if (!useGroupIds || useGroupIds.length === 0) {
    return {
      isValid: false,
      targetEntry: null,
      error: "At least one use group must be selected",
    };
  }

  // Fetch target_market_entry_fy for all selected use groups
  const { data: useGroupData, error } = await supabase
    .from("formulation_country_use_group")
    .select("formulation_country_use_group_id, target_market_entry_fy")
    .in("formulation_country_use_group_id", useGroupIds);

  if (error) {
    return {
      isValid: false,
      targetEntry: null,
      error: `Failed to fetch use groups: ${error.message}`,
    };
  }

  if (!useGroupData || useGroupData.length === 0) {
    return { isValid: false, targetEntry: null, error: "No use groups found" };
  }

  // Get unique non-null target_market_entry_fy values
  const targetEntries = useGroupData
    .map((ug) => ug.target_market_entry_fy)
    .filter((entry): entry is string => entry !== null && entry !== undefined);

  if (targetEntries.length === 0) {
    return {
      isValid: false,
      targetEntry: null,
      error:
        "Selected use groups do not have target market entry fiscal year set",
    };
  }

  // Check if all values are the same
  const uniqueEntries = Array.from(new Set(targetEntries));

  if (uniqueEntries.length > 1) {
    return {
      isValid: false,
      targetEntry: null,
      error: `All selected use groups must have the same target market entry fiscal year. Found values: ${uniqueEntries.join(", ")}`,
    };
  }

  return { isValid: true, targetEntry: uniqueEntries[0], error: null };
}
