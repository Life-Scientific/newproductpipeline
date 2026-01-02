/**
 * Z-Index Hierarchy for Overlay Components
 *
 * This ensures proper stacking of UI elements:
 * - Lower values appear first
 * - Higher values appear on top
 *
 * Usage: Use these constants in component z-index values
 */
export const Z_INDEX = {
  BASE: 0,
  STICKY: 10,           // Sticky table headers, navigation
  DROPDOWN: 30,         // Dropdowns, select menus
  OVERLAY: 40,          // General overlays, feedback button
  MODAL: 50,            // Modal backgrounds, sheets
  POPOVER: 60,          // Popovers, tooltips, modal content
  TOAST: 100,           // Toast notifications (always on top)
} as const;

export type ZIndex = typeof Z_INDEX[keyof typeof Z_INDEX];
