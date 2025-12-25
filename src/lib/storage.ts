/**
 * Centralized Storage Utilities
 *
 * Provides typed, SSR-safe wrappers around localStorage with proper error handling.
 * Replaces scattered localStorage calls across the codebase.
 */

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

interface StorageOptions {
  /** Optional default value if key doesn't exist */
  defaultValue?: JsonValue;
  /** Function to parse the stored value (default: JSON.parse) */
  parser?: (value: string) => JsonValue;
}

/**
 * Get a value from localStorage with SSR safety and error handling
 */
export function getStorage(
  key: string,
  options?: StorageOptions,
): JsonValue | undefined {
  if (typeof window === "undefined") {
    return options?.defaultValue;
  }

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return options?.defaultValue;
    }
    return options?.parser ? options.parser(stored) : JSON.parse(stored);
  } catch (supabaseError) {
    warn(`Failed to get storage key "${key}":`, supabaseError);
    return options?.defaultValue;
  }
}

/**
 * Get a string value from localStorage
 */
export function getString(key: string, defaultValue = ""): string {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    return localStorage.getItem(key) ?? defaultValue;
  } catch (supabaseError) {
    warn(`Failed to get storage key "${key}":`, supabaseError);
    return defaultValue;
  }
}

/**
 * Get a number value from localStorage
 */
export function getNumber(key: string, defaultValue = 0): number {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    const parsed = Number(stored);
    return Number.isNaN(parsed) ? defaultValue : parsed;
  } catch (supabaseError) {
    warn(`Failed to get storage key "${key}":`, supabaseError);
    return defaultValue;
  }
}

/**
 * Get a boolean value from localStorage
 */
export function getBoolean(key: string, defaultValue = false): boolean {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    return stored === "true";
  } catch (supabaseError) {
    warn(`Failed to get storage key "${key}":`, supabaseError);
    return defaultValue;
  }
}

/**
 * Get a parsed JSON object from localStorage
 */
export function getJson<T extends JsonValue>(
  key: string,
  defaultValue?: T,
): T | undefined {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return defaultValue;
    }
    return JSON.parse(stored) as T;
  } catch (supabaseError) {
    warn(`Failed to get storage key "${key}":`, supabaseError);
    return defaultValue;
  }
}

/**
 * Set a value in localStorage
 */
export function setStorage(key: string, value: JsonValue): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (supabaseError) {
    warn(`Failed to set storage key "${key}":`, supabaseError);
  }
}

/**
 * Set a string value in localStorage
 */
export function setString(key: string, value: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, value);
  } catch (supabaseError) {
    warn(`Failed to set storage key "${key}":`, supabaseError);
  }
}

/**
 * Set a number value in localStorage
 */
export function setNumber(key: string, value: number): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, String(value));
  } catch (supabaseError) {
    warn(`Failed to set storage key "${key}":`, supabaseError);
  }
}

/**
 * Set a boolean value in localStorage
 */
export function setBoolean(key: string, value: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(key, String(value));
  } catch (supabaseError) {
    warn(`Failed to set storage key "${key}":`, supabaseError);
  }
}

/**
 * Remove a key from localStorage
 */
export function removeStorage(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch (supabaseError) {
    warn(`Failed to remove storage key "${key}":`, supabaseError);
  }
}

/**
 * Check if a key exists in localStorage
 */
export function hasStorage(key: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

/**
 * Clear all keys with a specific prefix
 */
export function clearStoragePrefix(prefix: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => void localStorage.removeItem(key));
  } catch (supabaseError) {
    warn(`Failed to clear storage with prefix "${prefix}":`, supabaseError);
  }
}

/**
 * Get all keys with a specific prefix
 */
export function listStorageKeys(prefix: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        keys.push(key);
      }
    }
    return keys;
  } catch {
    warn(`Failed to list storage keys with prefix "${prefix}":`);
    return [];
  }
}

// Import warn for error logging
import { warn } from "@/lib/logger";
