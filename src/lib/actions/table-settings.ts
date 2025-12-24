"use server";

import { cookies } from "next/headers";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export interface TableSettings {
  columnOrder: string[];
  columnVisibility: Record<string, boolean>;
  columnSizing: Record<string, number>;
  sorting: Array<{ id: string; desc: boolean }>;
  pagination?: {
    pageSize: number;
    pageIndex: number;
  };
}

export interface TableSettingsInput {
  columnOrder?: string[];
  columnVisibility?: Record<string, boolean>;
  columnSizing?: Record<string, number>;
  sorting?: Array<{ id: string; desc: boolean }>;
  pagination?: {
    pageSize: number;
    pageIndex: number;
  };
}

/**
 * Get table settings from cookie
 * Returns null if no settings exist
 */
export async function getTableSettings(
  tableId: string,
): Promise<TableSettings | null> {
  const cookieStore = await cookies();
  const cookieName = `table-${tableId}`;
  const cookieValue = cookieStore.get(cookieName)?.value;

  if (!cookieValue) {
    return null;
  }

  try {
    const settings = JSON.parse(cookieValue) as TableSettings;
    return settings;
  } catch {
    console.error(`Failed to parse table settings for ${tableId}`);
    return null;
  }
}

/**
 * Save table settings to cookie
 * Merges with existing settings (partial updates allowed)
 */
export async function saveTableSettings(
  tableId: string,
  settings: TableSettingsInput,
): Promise<void> {
  const cookieStore = await cookies();
  const cookieName = `table-${tableId}`;
  const existingValue = cookieStore.get(cookieName)?.value;

  let mergedSettings: TableSettings;

  if (existingValue) {
    try {
      const existing = JSON.parse(existingValue) as TableSettings;
      // Merge with existing settings
      mergedSettings = {
        columnOrder: settings.columnOrder ?? existing.columnOrder ?? [],
        columnVisibility:
          settings.columnVisibility ?? existing.columnVisibility ?? {},
        columnSizing: settings.columnSizing ?? existing.columnSizing ?? {},
        sorting: settings.sorting ?? existing.sorting ?? [],
        pagination: settings.pagination ?? existing.pagination,
      };
    } catch {
      // If parsing fails, use new settings
      mergedSettings = {
        columnOrder: settings.columnOrder ?? [],
        columnVisibility: settings.columnVisibility ?? {},
        columnSizing: settings.columnSizing ?? {},
        sorting: settings.sorting ?? [],
        pagination: settings.pagination,
      };
    }
  } else {
    mergedSettings = {
      columnOrder: settings.columnOrder ?? [],
      columnVisibility: settings.columnVisibility ?? {},
      columnSizing: settings.columnSizing ?? {},
      sorting: settings.sorting ?? [],
      pagination: settings.pagination,
    };
  }

  cookieStore.set(cookieName, JSON.stringify(mergedSettings), {
    httpOnly: false, // Allow client-side read if needed
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

/**
 * Delete table settings (reset to defaults)
 */
export async function deleteTableSettings(tableId: string): Promise<void> {
  const cookieStore = await cookies();
  const cookieName = `table-${tableId}`;
  cookieStore.delete(cookieName);
}

/**
 * Get all table settings for a user (admin/debug use)
 */
export async function getAllTableSettings(): Promise<
  Record<string, TableSettings>
> {
  const cookieStore = await cookies();
  const settings: Record<string, TableSettings> = {};

  for (const cookie of cookieStore.getAll()) {
    if (cookie.name.startsWith("table-")) {
      const tableId = cookie.name.replace("table-", "");
      try {
        settings[tableId] = JSON.parse(cookie.value) as TableSettings;
      } catch {
        // Skip invalid cookies
      }
    }
  }

  return settings;
}

