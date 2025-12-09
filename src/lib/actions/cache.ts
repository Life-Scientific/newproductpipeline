"use server";

import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Revalidate all cached data in the application.
 * This clears all unstable_cache entries and revalidates key routes.
 * Use this when you need to force a complete data refresh.
 */
export async function revalidateAllCaches(): Promise<{ success: boolean; message: string }> {
  try {
    // Invalidate all cache tags used by unstable_cache
    revalidateTag("business-cases");
    revalidateTag("formulations");
    revalidateTag("dashboard-summary");
    revalidateTag("chart-data-by-year");
    revalidateTag("chart-yearly-totals");
    
    // Revalidate key routes
    revalidatePath("/portfolio", "layout");
    revalidatePath("/portfolio/business-cases");
    revalidatePath("/portfolio/analytics");
    revalidatePath("/portfolio/formulations");
    revalidatePath("/portfolio/cogs");
    revalidatePath("/");
    
    return { 
      success: true, 
      message: "All caches invalidated. Data will refresh on next load." 
    };
  } catch (error) {
    console.error("Failed to revalidate caches:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to revalidate caches" 
    };
  }
}

