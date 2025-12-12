"use server";

import { revalidatePath } from "next/cache";

/**
 * Revalidate routes to refresh server components.
 * No cache to invalidate - we use direct database queries.
 */
export async function revalidateAllCaches(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Revalidate key routes to refresh server components
    revalidatePath("/portfolio", "layout");
    revalidatePath("/portfolio/business-cases");
    revalidatePath("/portfolio/analytics");
    revalidatePath("/portfolio/formulations");
    revalidatePath("/portfolio/cogs");
    revalidatePath("/");

    return {
      success: true,
      message: "Routes refreshed. Data will reload on next navigation.",
    };
  } catch (error) {
    console.error("Failed to revalidate routes:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to revalidate routes",
    };
  }
}
