/**
 * Schema Migration Utilities
 *
 * Helper functions for handling schema field renames and type compatibility
 * during database migrations. Use these instead of inline type guards.
 */

/**
 * Get formulation name from object (handles both old and new field names)
 */
export function getFormulationName(obj: any): string | null {
  return (
    "formulation_name" in obj
      ? obj.formulation_name
      : "product_name" in obj
        ? obj.product_name
        : null
  ) as string | null;
}

/**
 * Get formulation category from object (handles both old and new field names)
 */
export function getFormulationCategory(obj: any): string | null {
  return (
    "formulation_category" in obj
      ? obj.formulation_category
      : "product_category" in obj
        ? obj.product_category
        : null
  ) as string | null;
}

/**
 * Get formulation status from object (handles both old and new field names)
 */
export function getFormulationStatus(obj: any): string | null {
  return (
    "formulation_status" in obj
      ? obj.formulation_status
      : "status" in obj
        ? obj.status
        : null
  ) as string | null;
}

/**
 * Get country status from object (handles both old and new field names)
 */
export function getCountryStatus(obj: any): string | null {
  return (
    "country_status" in obj
      ? obj.country_status
      : "registration_status" in obj
        ? obj.registration_status
        : null
  ) as string | null;
}

/**
 * Get use group status from object (handles both old and new field names)
 */
export function getUseGroupStatus(obj: any): string | null {
  return (
    "use_group_status" in obj
      ? obj.use_group_status
      : "registration_status" in obj
        ? obj.registration_status
        : null
  ) as string | null;
}

/**
 * Get formulation readiness from object (handles both old and new field names)
 */
export function getFormulationReadiness(obj: any): string | null {
  return (
    "formulation_readiness" in obj
      ? obj.formulation_readiness
      : "readiness" in obj
        ? obj.readiness
        : null
  ) as string | null;
}

/**
 * Get country readiness from object
 */
export function getCountryReadiness(obj: any): string | null {
  return ("country_readiness" in obj ? obj.country_readiness : null) as
    | string
    | null;
}

/**
 * Get planned submission date from use group (handles both old and new field names)
 */
export function getPlannedSubmissionDate(obj: any): string | null {
  return (
    "earliest_planned_submission_date" in obj
      ? obj.earliest_planned_submission_date
      : "earliest_submission_date" in obj
        ? obj.earliest_submission_date
        : null
  ) as string | null;
}

/**
 * Get planned approval date from use group (handles both old and new field names)
 */
export function getPlannedApprovalDate(obj: any): string | null {
  return (
    "earliest_planned_approval_date" in obj
      ? obj.earliest_planned_approval_date
      : "earliest_approval_date" in obj
        ? obj.earliest_approval_date
        : null
  ) as string | null;
}

/**
 * Get actual submission date from use group (handles both old and new field names)
 */
export function getActualSubmissionDate(obj: any): string | null {
  return (
    "earliest_actual_submission_date" in obj
      ? obj.earliest_actual_submission_date
      : "actual_submission_date" in obj
        ? obj.actual_submission_date
        : null
  ) as string | null;
}

/**
 * Get actual approval date from use group (handles both old and new field names)
 */
export function getActualApprovalDate(obj: any): string | null {
  return (
    "earliest_actual_approval_date" in obj
      ? obj.earliest_actual_approval_date
      : "actual_approval_date" in obj
        ? obj.actual_approval_date
        : null
  ) as string | null;
}

/**
 * Generic field accessor with fallback support
 * Use when you need to access a field that may have been renamed
 */
export function getField<T = any>(
  obj: any,
  newField: string,
  oldField?: string,
  defaultValue: T | null = null,
): T | null {
  if (newField in obj) {
    return obj[newField] as T;
  }
  if (oldField && oldField in obj) {
    return obj[oldField] as T;
  }
  return defaultValue;
}
