import { createClient } from "@/lib/supabase/server";
import { log, warn, error, table } from "@/lib/logger";
import { NextResponse } from "next/server";
import { getFormulationProtectionStatus } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const protectionStatus = await getFormulationProtectionStatus(id);
    return NextResponse.json(protectionStatus);
  } catch (error) {
    error("Error fetching protection status:", error);
    return NextResponse.json(
      { error: "Failed to fetch protection status" },
      { status: 500 },
    );
  }
}
