/**
 * Application-wide constants
 */

/**
 * Calculate the current fiscal year based on the current date
 * Fiscal year runs from July 1 to June 30
 * Changes at midnight GMT on July 1st each year
 * 
 * Fiscal Year 26 = July 1, 2025 to June 30, 2026
 * Fiscal Year 27 = July 1, 2026 to June 30, 2027
 * etc.
 * 
 * Formula:
 * - If month >= 7 (July-December): fiscalYear = (year - 2000) + 1
 * - If month < 7 (January-June): fiscalYear = year - 2000
 * 
 * Example:
 * - July 1, 2025 = FY26 (2025 - 2000 + 1 = 26)
 * - June 30, 2026 = FY26 (2026 - 2000 = 26)
 * - July 1, 2026 = FY27 (2026 - 2000 + 1 = 27)
 */
export function getCurrentFiscalYear(): number {
  const now = new Date();
  // Use UTC to ensure consistent behavior across timezones
  // Changes at midnight GMT on July 1st
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1; // getUTCMonth() returns 0-11, so add 1
  
  if (month >= 7) {
    // July-December: fiscal year is (year - 2000) + 1
    return (year - 2000) + 1;
  } else {
    // January-June: fiscal year is year - 2000
    return year - 2000;
  }
}

/**
 * Current fiscal year (calculated dynamically)
 * Use this constant for consistency within a single request/operation
 */
export const CURRENT_FISCAL_YEAR = getCurrentFiscalYear();

/**
 * Get the current fiscal year as a string (e.g., "FY26")
 */
export function getCurrentFiscalYearString(): string {
  return `FY${String(CURRENT_FISCAL_YEAR).padStart(2, "0")}`;
}

