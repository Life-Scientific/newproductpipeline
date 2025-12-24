import { NextRequest, NextResponse } from "next/server";
import { getTableSettings } from "@/lib/actions/table-settings";
import { error } from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tableId: string }> },
) {
  const { tableId } = await params;

  if (!tableId) {
    return NextResponse.json({ error: "Table ID required" }, { status: 400 });
  }

  try {
    const settings = await getTableSettings(tableId);

    if (!settings) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(settings);
  } catch {
    error(`Error fetching table settings for ${tableId}`);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

