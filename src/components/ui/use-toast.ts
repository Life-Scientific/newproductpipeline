"use client";

import { toast } from "sonner";

type ToastVariant = "default" | "destructive" | "success";

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Sonner-based toast hook that provides backward compatibility
 * with the existing Radix toast API used throughout the app.
 *
 * @deprecated Consider using sonner directly: import { toast } from "sonner"
 */
export function useToast() {
  const showToast = (options: ToastOptions) => {
    const { title, description, variant = "default", action } = options;

    if (variant === "destructive" || variant === "error") {
      if (title && description) {
        toast.error(title, {
          description,
          action: action
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        });
      } else if (title) {
        toast.error(title);
      } else if (description) {
        toast.error(description);
      }
    } else if (variant === "success") {
      if (title && description) {
        toast.success(title, {
          description,
          action: action
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        });
      } else if (title) {
        toast.success(title);
      } else if (description) {
        toast.success(description);
      }
    } else {
      // default variant
      if (title && description) {
        toast(title, {
          description,
          action: action
            ? {
                label: action.label,
                onClick: action.onClick,
              }
            : undefined,
        });
      } else if (title) {
        toast(title);
      } else if (description) {
        toast(description);
      }
    }
  };

  return {
    toast: showToast,
    dismiss: toast.dismiss,
  };
}

// Re-export toast for direct imports (backward compatibility)
export { toast };
