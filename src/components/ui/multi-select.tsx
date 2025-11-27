"use client";

import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  maxDisplayCount?: number;
  disabled?: boolean;
  /** Compact mode for inline filter bars */
  compact?: boolean;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
  maxDisplayCount = 2,
  disabled = false,
  compact = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const handleUnselect = (
    value: string,
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onChange(selected.filter((s) => s !== value));
  };

  const handleSelect = (value: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (selected.includes(value)) {
      handleUnselect(value);
    } else {
      onChange([...selected, value]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (searchValue === "" && selected.length > 0) {
        handleUnselect(selected[selected.length - 1]);
      }
    }
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const filteredOptions = options.filter((option) => {
    return option.label.toLowerCase().includes(searchValue.toLowerCase());
  });

  const selectedOptions = options.filter((option) =>
    selected.includes(option.value),
  );
  const hasSelected = selected.length > 0;

  // Clear search when popover closes
  React.useEffect(() => {
    if (!open) {
      setSearchValue("");
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("relative", className)}>
        <PopoverAnchor asChild>
          <button
            ref={triggerRef}
            type="button"
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              "group flex items-center justify-between gap-2 rounded-md border bg-background px-3 text-sm transition-all duration-150",
              compact ? "h-8 min-w-[120px]" : "h-9 w-full min-w-[180px]",
              "border-border/60 hover:border-border hover:bg-muted/30",
              "focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/50",
              hasSelected && "border-primary/30 bg-primary/[0.02]",
              disabled && "cursor-not-allowed opacity-50",
              open && "border-ring/50 ring-2 ring-ring/20",
            )}
            onClick={(e) => {
              if (!disabled) {
                e.preventDefault();
                setOpen(!open);
              }
            }}
          >
            <span
              className={cn(
                "flex items-center gap-1.5 truncate",
                !hasSelected && "text-muted-foreground",
              )}
            >
              {hasSelected ? (
                <>
                  {selectedOptions.slice(0, maxDisplayCount).map((option) => (
                    <span
                      key={option.value}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium transition-colors",
                        "bg-primary/10 text-primary",
                      )}
                    >
                      {option.label}
                      <span
                        role="button"
                        tabIndex={0}
                        className="rounded-sm hover:bg-primary/20 p-0.5 -mr-0.5 cursor-pointer"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleUnselect(option.value, e);
                          }
                        }}
                        onClick={(e) => {
                          handleUnselect(option.value, e);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </span>
                    </span>
                  ))}
                  {selected.length > maxDisplayCount && (
                    <span className="text-xs text-muted-foreground font-medium">
                      +{selected.length - maxDisplayCount}
                    </span>
                  )}
                </>
              ) : (
                placeholder
              )}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                open && "rotate-180",
              )}
            />
          </button>
        </PopoverAnchor>
      </div>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] min-w-[200px] p-0 shadow-lg border-border/60"
        align="start"
        sideOffset={4}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {/* Search input */}
        <div className="p-2 border-b border-border/40">
          <div className="relative">
            <input
              ref={inputRef}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full h-8 px-3 text-sm bg-muted/30 rounded-md border-0",
                "placeholder:text-muted-foreground/50",
                "focus:outline-none focus:ring-1 focus:ring-ring/30 focus:bg-muted/50",
                "transition-all duration-150",
              )}
            />
          </div>
        </div>

        {/* Options list */}
        <div className="max-h-[240px] overflow-y-auto py-1">
          {filteredOptions.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            <div className="px-1">
              {filteredOptions.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "relative flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-100",
                      "cursor-pointer select-none outline-none",
                      "hover:bg-muted/60",
                      "focus:bg-muted/60",
                      isSelected && "text-primary font-medium",
                    )}
                    onClick={(e) => {
                      handleSelect(option.value, e);
                      setSearchValue("");
                    }}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-150",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border/60 bg-background",
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                    <span className="truncate">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with selection count */}
        {selected.length > 0 && (
          <div className="border-t border-border/40 px-2 py-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {selected.length} selected
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onChange([]);
              }}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
