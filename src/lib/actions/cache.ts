"use server";

import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Revalidate all cached data in the application.
 * This clears all unstable_cache entries and revalidates key routes.
 * Use this when you need to force a complete data refresh.
 */
export async function revalidateAllCaches(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Invalidate all cache tags used by unstable_cache
    // Next.js 16 requires second parameter - using "page" type
    revalidateTag("business-cases", "page");
    revalidateTag("formulations", "page");
    revalidateTag("dashboard-summary", "page");
    revalidateTag("chart-data-by-year", "page");
    revalidateTag("chart-yearly-totals", "page");

    // Revalidate key routes
    revalidatePath("/portfolio", "layout");
    revalidatePath("/portfolio/business-cases");
    revalidatePath("/portfolio/analytics");
    revalidatePath("/portfolio/formulations");
    revalidatePath("/portfolio/cogs");
    revalidatePath("/");

    return {
      success: true,
      message: "All caches invalidated. Data will refresh on next load.",
    };
  } catch (error) {
    console.error("Failed to revalidate caches:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to revalidate caches",
    };
  }
}
