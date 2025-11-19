/**
 * Design System - Semantic Color & Status Definitions
 * 
 * This file serves as the source of truth for mapping domain states to visual styles.
 * It ensures consistency across the application for status badges, indicators, and alerts.
 */

// Type definitions for badge variants available in the UI
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "muted";

/**
 * Registration Pipeline Status Mappings
 */
export const registrationStatusVariants: Record<string, BadgeVariant> = {
  // Happy path / Success states
  "Approved": "success",
  "Active": "success",
  "Completed": "success",
  
  // In-progress states
  "Submitted": "warning",
  "In Progress": "info",
  "Under Review": "info",
  
  // Planning / Early states
  "Planning": "secondary",
  "Not Started": "muted",
  "Draft": "secondary",
  
  // Negative / Terminal states
  "Rejected": "destructive",
  "Withdrawn": "muted",
  "Suspended": "destructive",
} as const;

/**
 * Formulation Status Mappings
 */
export const formulationStatusVariants: Record<string, BadgeVariant> = {
  "Selected": "success",
  "Monitoring": "info",
  "Not Yet Considered": "muted",
  "Killed": "destructive",
  "Archive": "muted",
} as const;

/**
 * Country Readiness Mappings
 */
export const countryReadinessVariants: Record<string, BadgeVariant> = {
  "Completed Review": "success",
  "Ready for Review": "success",
  "Under Preparation": "warning",
  "Nominated for Review": "info",
  "Not yet evaluated": "muted",
  "Not selected for entry": "muted",
  "Selected for entry": "success",
  "On hold": "warning",
  "Withdrawn": "destructive",
} as const;

/**
 * Priority Level Mappings
 */
export const priorityVariants: Record<string, BadgeVariant> = {
  "Critical": "destructive",
  "High": "warning",
  "Medium": "info",
  "Low": "secondary",
} as const;

/**
 * Financial / Margin Zone Mappings
 */
export const marginVariants: Record<string, BadgeVariant> = {
  "High": "success",     // e.g. > 40%
  "Medium": "info",      // e.g. 20-40%
  "Low": "warning",      // e.g. 0-20%
  "Loss": "destructive", // e.g. < 0%
} as const;

/**
 * Helper to get badge variant for any status string
 * Falls back to 'secondary' if status is not recognized
 */
export function getStatusVariant(status: string | null | undefined, type: 'registration' | 'formulation' | 'country' | 'priority' | 'margin' = 'registration'): BadgeVariant {
  if (!status) return "muted";
  
  const map = {
    registration: registrationStatusVariants,
    formulation: formulationStatusVariants,
    country: countryReadinessVariants,
    priority: priorityVariants,
    margin: marginVariants
  }[type];

  return map[status as keyof typeof map] || "secondary";
}

/**
 * Legacy support for timeline events
 */
export const statusColors = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
} as const;
