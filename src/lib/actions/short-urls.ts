"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ============================================================================
// Types
// ============================================================================

export interface ShortUrl {
  id: string;
  slug: string;
  destination_url: string;
  is_public: boolean;
  description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ShortUrlWithStats extends ShortUrl {
  click_count: number;
}

export interface ShortUrlClick {
  id: string;
  short_url_id: string;
  clicked_at: string;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
  is_authenticated: boolean;
}

export interface ClickAnalytics {
  total_clicks: number;
  clicks_today: number;
  clicks_this_week: number;
  clicks_this_month: number;
  top_referrers: { referrer: string; count: number }[];
  top_countries: { country: string; count: number }[];
  clicks_by_day: { date: string; count: number }[];
}

// ============================================================================
// CRUD Operations
// ============================================================================

/**
 * Get all short URLs (org-wide) with click counts
 */
export async function getShortUrls(): Promise<ShortUrlWithStats[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Get ALL short URLs (org-wide, RLS allows all authenticated users to view)
  const { data: shortUrls, error } = await supabase
    .from("short_urls")
    .select("*")
    .order("created_at", { ascending: false });

  if (supabaseError) {
    throw new Error(`Failed to fetch short URLs: ${supabaseError.message}`);
  }

  if (!shortUrls || shortUrls.length === 0) {
    return [];
  }

  // Get all click counts in a single query using aggregation
  const urlIds = shortUrls.map((u) => u.id);
  const { data: clickCounts } = await supabase
    .from("short_url_clicks")
    .select("short_url_id")
    .in("short_url_id", urlIds);

  // Count clicks per URL
  const clickCountMap = new Map<string, number>();
  for (const click of clickCounts || []) {
    clickCountMap.set(
      click.short_url_id,
      (clickCountMap.get(click.short_url_id) || 0) + 1,
    );
  }

  // Merge URLs with click counts
  const urlsWithStats: ShortUrlWithStats[] = shortUrls.map((url) => ({
    ...url,
    click_count: clickCountMap.get(url.id) || 0,
  }));

  return urlsWithStats;
}

/**
 * Get a single short URL by ID with recent clicks
 */
export async function getShortUrl(id: string): Promise<{
  shortUrl: ShortUrl;
  recentClicks: ShortUrlClick[];
  clickCount: number;
} | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Get any short URL (org-wide viewing)
  const { data: shortUrl, error } = await supabase
    .from("short_urls")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !shortUrl) {
    return null;
  }

  // Get recent clicks
  const { data: recentClicks } = await supabase
    .from("short_url_clicks")
    .select("*")
    .eq("short_url_id", id)
    .order("clicked_at", { ascending: false })
    .limit(50);

  // Get total click count
  const { count } = await supabase
    .from("short_url_clicks")
    .select("*", { count: "exact", head: true })
    .eq("short_url_id", id);

  return {
    shortUrl,
    recentClicks: recentClicks || [],
    clickCount: count || 0,
  };
}

/**
 * Create a new short URL
 */
export async function createShortUrl(formData: FormData): Promise<ShortUrl> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const slug = formData.get("slug") as string;
  const destination_url = formData.get("destination_url") as string;
  const is_public = formData.get("is_public") === "true";
  const description = (formData.get("description") as string) || null;

  // Validate slug format
  if (!slug || !/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(slug)) {
    throw new Error(
      "Invalid slug format. Use alphanumeric characters and hyphens only.",
    );
  }

  if (slug.length < 2 || slug.length > 100) {
    throw new Error("Slug must be between 2 and 100 characters");
  }

  // Validate URL
  try {
    new URL(destination_url);
  } catch {
    throw new Error("Invalid destination URL");
  }

  // Check if slug already exists
  const { data: existing } = await supabase
    .from("short_urls")
    .select("id")
    .eq("slug", slug)
    .single();

  if (existing) {
    throw new Error("This slug is already taken");
  }

  const { data: newUrl, error } = await supabase
    .from("short_urls")
    .insert({
      slug,
      destination_url,
      is_public,
      description,
      created_by: user.id,
    })
    .select()
    .single();

  if (supabaseError) {
    throw new Error(`Failed to create short URL: ${supabaseError.message}`);
  }

  revalidatePath("/shorturl");
  return newUrl;
}

/**
 * Update an existing short URL (Admin/Editor only via RLS)
 */
export async function updateShortUrl(
  id: string,
  formData: FormData,
): Promise<ShortUrl> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const destination_url = formData.get("destination_url") as string;
  const is_public = formData.get("is_public") === "true";
  const description = (formData.get("description") as string) || null;

  // Validate URL
  try {
    new URL(destination_url);
  } catch {
    throw new Error("Invalid destination URL");
  }

  // RLS restricts UPDATE to Admin/Editor roles
  const { data: updatedUrl, error } = await supabase
    .from("short_urls")
    .update({
      destination_url,
      is_public,
      description,
    })
    .eq("id", id)
    .select()
    .single();

  if (supabaseError) {
    // Check if it's a permission error from RLS
    if (error.code === "42501" || supabaseError.message.includes("policy")) {
      throw new Error("Only Admin or Editor roles can edit short URLs");
    }
    throw new Error(`Failed to update short URL: ${supabaseError.message}`);
  }

  revalidatePath("/shorturl");
  revalidatePath(`/shorturl/${id}`);
  return updatedUrl;
}

/**
 * Delete a short URL (Admin/Editor only via RLS)
 */
export async function deleteShortUrl(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // RLS restricts DELETE to Admin/Editor roles
  const { error: supabaseError } = await supabase.from("short_urls").delete().eq("id", id);

  if (supabaseError) {
    // Check if it's a permission error from RLS
    if (supabaseError.code === "42501" || supabaseError.message.includes("policy")) {
      throw new Error("Only Admin or Editor roles can delete short URLs");
    }
    throw new Error(`Failed to delete short URL: ${supabaseError.message}`);
  }

  revalidatePath("/shorturl");
}

// ============================================================================
// Analytics
// ============================================================================

/**
 * Get analytics for a specific short URL or all URLs (org-wide)
 */
export async function getShortUrlAnalytics(
  shortUrlId?: string,
): Promise<ClickAnalytics> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Get short URL IDs for filtering (org-wide)
  let urlIds: string[] = [];

  if (shortUrlId) {
    // Verify URL exists
    const { data: url } = await supabase
      .from("short_urls")
      .select("id")
      .eq("id", shortUrlId)
      .single();

    if (!url) {
      throw new Error("Short URL not found");
    }
    urlIds = [shortUrlId];
  } else {
    // Get ALL URLs (org-wide)
    const { data: urls } = await supabase.from("short_urls").select("id");

    urlIds = (urls || []).map((u) => u.id);
  }

  if (urlIds.length === 0) {
    return {
      total_clicks: 0,
      clicks_today: 0,
      clicks_this_week: 0,
      clicks_this_month: 0,
      top_referrers: [],
      top_countries: [],
      clicks_by_day: [],
    };
  }

  // Get all clicks for the URLs
  const { data: clicks } = await supabase
    .from("short_url_clicks")
    .select("*")
    .in("short_url_id", urlIds);

  const allClicks = clicks || [];

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(todayStart);
  monthStart.setDate(monthStart.getDate() - 30);

  // Calculate time-based counts
  const clicks_today = allClicks.filter(
    (c) => new Date(c.clicked_at) >= todayStart,
  ).length;
  const clicks_this_week = allClicks.filter(
    (c) => new Date(c.clicked_at) >= weekStart,
  ).length;
  const clicks_this_month = allClicks.filter(
    (c) => new Date(c.clicked_at) >= monthStart,
  ).length;

  // Calculate top referrers
  const referrerCounts = new Map<string, number>();
  for (const click of allClicks) {
    if (click.referrer) {
      try {
        const domain = new URL(click.referrer).hostname;
        referrerCounts.set(domain, (referrerCounts.get(domain) || 0) + 1);
      } catch {
        referrerCounts.set("direct", (referrerCounts.get("direct") || 0) + 1);
      }
    } else {
      referrerCounts.set("direct", (referrerCounts.get("direct") || 0) + 1);
    }
  }
  const top_referrers = Array.from(referrerCounts.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Calculate top countries
  const countryCounts = new Map<string, number>();
  for (const click of allClicks) {
    const country = click.country || "Unknown";
    countryCounts.set(country, (countryCounts.get(country) || 0) + 1);
  }
  const top_countries = Array.from(countryCounts.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Calculate clicks by day (last 30 days)
  const clicksByDay = new Map<string, number>();
  for (let i = 0; i < 30; i++) {
    const date = new Date(todayStart);
    date.setDate(date.getDate() - i);
    clicksByDay.set(date.toISOString().split("T")[0], 0);
  }
  for (const click of allClicks) {
    const date = new Date(click.clicked_at).toISOString().split("T")[0];
    if (clicksByDay.has(date)) {
      clicksByDay.set(date, (clicksByDay.get(date) || 0) + 1);
    }
  }
  const clicks_by_day = Array.from(clicksByDay.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    total_clicks: allClicks.length,
    clicks_today,
    clicks_this_week,
    clicks_this_month,
    top_referrers,
    top_countries,
    clicks_by_day,
  };
}

/**
 * Get top performing short URLs (org-wide)
 */
export async function getTopShortUrls(
  limit: number = 10,
): Promise<ShortUrlWithStats[]> {
  const urls = await getShortUrls();
  return urls.sort((a, b) => b.click_count - a.click_count).slice(0, limit);
}
