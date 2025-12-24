import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get formulation to find formulation_code
    const { data: formulation } = await supabase
      .from("formulations")
      .select("formulation_code")
      .eq("formulation_id", id)
      .single();

    if (!formulation?.formulation_code) {
      return NextResponse.json([]);
    }

    // Get use groups with crops
    const { data: useGroups, error: supabaseError } = await supabase
      .from("vw_formulation_country_use_group")
      .select("*")
      .eq("formulation_code", formulation.formulation_code)
      .order("country_name", { ascending: true })
      .order("use_group_name", { ascending: true });

    if (supabaseError) {
      throw supabaseError;
    }

    // Fetch crops for each use group using EPPO codes
    if (useGroups && useGroups.length > 0) {
      const useGroupIds = useGroups.map(
        (ug: any) => ug.formulation_country_use_group_id,
      );
      const { data: useGroupCrops } = await supabase
        .from("formulation_country_use_group_eppo_crops")
        .select(`
          formulation_country_use_group_id,
          eppo_codes (
            eppo_code_id,
            display_name,
            eppo_code
          )
        `)
        .in("formulation_country_use_group_id", useGroupIds)
        .eq("is_excluded", false);

      // Attach crops to use groups
      const cropsByUseGroup = new Map<string, string[]>();
      useGroupCrops?.forEach((ugc: any) => {
        const useGroupId = ugc.formulation_country_use_group_id;
        const cropName = ugc.eppo_codes?.display_name;
        if (cropName) {
          if (!cropsByUseGroup.has(useGroupId)) {
            cropsByUseGroup.set(useGroupId, []);
          }
          cropsByUseGroup.get(useGroupId)!.push(cropName);
        }
      });

      // Add crops array to each use group
      const useGroupsWithCrops = useGroups.map((useGroup: any) => ({
        ...useGroup,
        crops:
          cropsByUseGroup.get(useGroup.formulation_country_use_group_id) || [],
      }));

      return NextResponse.json(useGroupsWithCrops);
    }

    return NextResponse.json(useGroups || []);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch use groups",
      },
      { status: 500 },
    );
  }
}
