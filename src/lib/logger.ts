/**
 * Dev-only logger utility
 * - .log() only outputs in development
 * - .warn() and .error() always output
 */

const isDev = process.env.NODE_ENV === "development";

/**
 * Development-only logging (silent in production)
 */
export function log(...args: unknown[]): void {
  if (isDev) {
    console.log("[DEV]", ...args);
  }
}

/**
 * Always-on warning logging
 */
export function warn(...args: unknown[]): void {
  console.warn("[WARN]", ...args);
}

/**
 * Always-on error logging
 */
export function error(...args: unknown[]): void {
  console.error("[ERROR]", ...args);
}

/**
 * Grouped dev logging for collapsible sections
 */
export function group(label: string, fn: () => void): void {
  if (isDev) {
    console.group(label);
    fn();
    console.groupEnd();
  }
}

/**
 * Group collapsed dev logging
 */
export function groupCollapsed(label: string, fn: () => void): void {
  if (isDev) {
    console.groupCollapsed(label);
    fn();
    console.groupEnd();
  }
}

/**
 * Dev-only table logging
 */
export function table(data: unknown): void {
  if (isDev) {
    console.table(data);
  }
}

/**
 * Dev-only timing helper
 */
export function time(label: string): void {
  if (isDev) {
    console.time(label);
  }
}

/**
 * Dev-only timing end helper
 */
export function timeEnd(label: string): void {
  if (isDev) {
    console.timeEnd(label);
  }
}





