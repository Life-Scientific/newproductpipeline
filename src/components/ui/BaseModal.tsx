"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: string;
  showCancel?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  showSave?: boolean;
  saveText?: string;
  onSave?: () => void;
  isSaving?: boolean;
  saveDisabled?: boolean;
  error?: string | null;
}

export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  maxWidth = "max-w-lg",
  showCancel = true,
  cancelText = "Cancel",
  onCancel,
  showSave = true,
  saveText = "Save",
  onSave,
  isSaving = false,
  saveDisabled = false,
  error,
}: BaseModalProps) {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(maxWidth, "max-h-[90vh] overflow-y-auto flex flex-col", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          {error && (
            <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive">
              {error}
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-2">
          {children}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {footer ? (
            footer
          ) : (
            <>
              {showCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  {cancelText}
                </Button>
              )}
              {showSave && (
                <Button
                  type="button"
                  onClick={onSave}
                  disabled={isSaving || saveDisabled}
                >
                  {isSaving ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    saveText
                  )}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

