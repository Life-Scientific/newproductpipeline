import { NextResponse } from "next/server";
import { log, warn, error, table } from "@/lib/logger";

/**
 * API route to fetch a daily-changing image from Unsplash
 * Uses Unsplash Source API (no auth required) with a daily seed
 */
export async function GET() {
  try {
    // Generate daily seed based on current date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const dailySeed = `${year}${month}${day}`;

    // Use Unsplash Source API with daily seed
    // This ensures the same image throughout the day, but different each day
    const imageUrl = `https://source.unsplash.com/1920x1080/?nature,landscape,abstract&sig=${dailySeed}`;

    // Return the image URL
    return NextResponse.json({ imageUrl });
  } catch (err) {
    error("Error fetching Unsplash image:", error);
    // Return a fallback gradient color
    return NextResponse.json(
      { error: "Failed to fetch image", fallback: true },
      { status: 500 },
    );
  }
}

