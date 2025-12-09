/**
 * Count unique business case groups from an array of business cases.
 * A business case group represents a multi-year projection (typically 10 years),
 * while individual records represent each fiscal year.
 *
 * @param businessCases Array of business case objects with business_case_group_id
 * @returns Number of unique business case groups
 */
export function countUniqueBusinessCaseGroups(
  businessCases: { business_case_group_id?: string | null }[],
): number {
  return new Set(
    businessCases.map((bc) => bc.business_case_group_id).filter(Boolean),
  ).size;
}
