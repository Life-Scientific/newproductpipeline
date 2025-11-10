import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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

    // Get labels with crops
    const { data: labels, error } = await supabase
      .from("vw_formulation_country_label")
      .select("*")
      .eq("formulation_code", formulation.formulation_code)
      .order("country_name", { ascending: true })
      .order("label_name", { ascending: true });

    if (error) {
      throw error;
    }

    // Fetch crops for each label
    if (labels && labels.length > 0) {
      const labelIds = labels.map((l: any) => l.formulation_country_label_id);
      const { data: labelCrops } = await supabase
        .from("formulation_country_label_crops")
        .select(`
          formulation_country_label_id,
          crops (
            crop_id,
            crop_name
          )
        `)
        .in("formulation_country_label_id", labelIds);

      // Attach crops to labels
      const cropsByLabel = new Map<string, string[]>();
      labelCrops?.forEach((lc: any) => {
        const labelId = lc.formulation_country_label_id;
        const cropName = lc.crops?.crop_name;
        if (cropName) {
          if (!cropsByLabel.has(labelId)) {
            cropsByLabel.set(labelId, []);
          }
          cropsByLabel.get(labelId)!.push(cropName);
        }
      });

      // Add crops array to each label
      const labelsWithCrops = labels.map((label: any) => ({
        ...label,
        crops: cropsByLabel.get(label.formulation_country_label_id) || [],
      }));

      return NextResponse.json(labelsWithCrops);
    }

    return NextResponse.json(labels || []);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch labels" },
      { status: 500 }
    );
  }
}

