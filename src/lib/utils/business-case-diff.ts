/**
 * Utility functions for computing business case diffs between versions
 * Returns human-readable text summaries, NOT JSON
 */

interface YearData {
  year_offset: number;
  volume: number | null;
  nsp: number | null;
  cogs_per_unit: number | null;
}

/**
 * Compute the diff between old and new business case year data
 * Returns a human-readable text summary like "Volume: FY26 +15%, FY27 +10% | NSP: FY26 -5%"
 */
export function computeBusinessCaseDiff(
  oldData: YearData[],
  newData: YearData[],
  effectiveStartYear: number,
): string {
  const volumeChanges: string[] = [];
  const nspChanges: string[] = [];
  const cogsChanges: string[] = [];

  for (let yearOffset = 1; yearOffset <= 10; yearOffset++) {
    const oldYear = oldData.find((y) => y.year_offset === yearOffset);
    const newYear = newData.find((y) => y.year_offset === yearOffset);

    if (!oldYear || !newYear) continue;

    const fiscalYear = `FY${String(effectiveStartYear + yearOffset - 1).padStart(2, "0")}`;

    // Check volume change
    if (oldYear.volume !== newYear.volume) {
      const pct = computePercentChange(oldYear.volume, newYear.volume);
      if (pct !== null) {
        const sign = pct > 0 ? "+" : "";
        volumeChanges.push(`${fiscalYear} ${sign}${pct}%`);
      }
    }

    // Check NSP change
    if (oldYear.nsp !== newYear.nsp) {
      const pct = computePercentChange(oldYear.nsp, newYear.nsp);
      if (pct !== null) {
        const sign = pct > 0 ? "+" : "";
        nspChanges.push(`${fiscalYear} ${sign}${pct}%`);
      }
    }

    // Check COGS change
    if (oldYear.cogs_per_unit !== newYear.cogs_per_unit) {
      const pct = computePercentChange(
        oldYear.cogs_per_unit,
        newYear.cogs_per_unit,
      );
      if (pct !== null) {
        const sign = pct > 0 ? "+" : "";
        cogsChanges.push(`${fiscalYear} ${sign}${pct}%`);
      }
    }
  }

  const parts: string[] = [];

  if (volumeChanges.length > 0) {
    parts.push(`Volume: ${summarizeYearRange(volumeChanges)}`);
  }
  if (nspChanges.length > 0) {
    parts.push(`NSP: ${summarizeYearRange(nspChanges)}`);
  }
  if (cogsChanges.length > 0) {
    parts.push(`COGS: ${summarizeYearRange(cogsChanges)}`);
  }

  if (parts.length === 0) {
    return "No significant changes";
  }

  return parts.join(" | ");
}

/**
 * Compute percentage change between two values
 */
function computePercentChange(
  oldVal: number | null,
  newVal: number | null,
): number | null {
  if (oldVal === null || oldVal === 0) {
    return newVal ? 100 : null;
  }
  if (newVal === null) {
    return -100;
  }
  return Math.round(((newVal - oldVal) / oldVal) * 100 * 10) / 10;
}

/**
 * Summarize year changes into a readable format
 */
function summarizeYearRange(changes: string[]): string {
  if (changes.length <= 2) {
    return changes.join(", ");
  }

  if (changes.length > 3) {
    return `${changes[0]}, ... ${changes[changes.length - 1]} (${changes.length} years)`;
  }

  return changes.join(", ");
}

/**
 * Check if there are any meaningful changes in the diff string
 */
export function hasChanges(diffSummary: string | null): boolean {
  return diffSummary !== null && diffSummary !== "No significant changes";
}
