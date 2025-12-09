"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { X, ChevronDown, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FuzzySearchOption {
  value: string;
  label: string;
  subtitle?: string;
}

interface FuzzySearchSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  searchFunction: (search: string) => Promise<{ data?: any[]; error?: string }>;
  getOptionValue: (item: any) => string;
  getOptionLabel: (item: any) => string;
  getOptionSubtitle?: (item: any) => string | undefined;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  // For displaying selected value when not searching
  selectedItem?: any;
  // Optional: preload all items when no search
  preloadAll?: boolean;
  preloadFunction?: () => Promise<{ data?: any[]; error?: string }>;
}

export function FuzzySearchSelect({
  value,
  onValueChange,
  searchFunction,
  getOptionValue,
  getOptionLabel,
  getOptionSubtitle,
  placeholder = "Search and select...",
  searchPlaceholder = "Type to search...",
  emptyText = "No results found. Try a different search term.",
  className,
  disabled = false,
  required = false,
  selectedItem,
  preloadAll = false,
  preloadFunction,
}: FuzzySearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [loadedItems, setLoadedItems] = useState<Map<string, any>>(new Map());
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Search function
  const performSearch = useCallback(
    async (term: string) => {
      if (!term || term.trim().length < 1) {
        if (preloadAll && preloadFunction) {
          setIsSearching(true);
          try {
            const result = await preloadFunction();
            if (result.data) {
              setAllItems(result.data);
              setSearchResults(result.data);
              // Cache items
              const newCache = new Map(loadedItems);
              result.data.forEach((item) => {
                newCache.set(getOptionValue(item), item);
              });
              setLoadedItems(newCache);
            }
          } catch (error) {
            console.error("Error preloading items:", error);
          } finally {
            setIsSearching(false);
          }
        } else {
          setSearchResults([]);
          setIsSearching(false);
        }
        return;
      }

      setIsSearching(true);
      try {
        const result = await searchFunction(term);
        if (result.data) {
          setSearchResults(result.data);
          // Cache items
          if (result.data) {
            setLoadedItems((prev) => {
              const newCache = new Map(prev);
              result.data!.forEach((item) => {
                newCache.set(getOptionValue(item), item);
              });
              return newCache;
            });
          }
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [searchFunction, getOptionValue, preloadAll, preloadFunction, loadedItems],
  );

  // Debounced search effect
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch(searchValue);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchValue, performSearch]);

  // Load selected item if not in cache
  useEffect(() => {
    if (value && !loadedItems.has(value) && selectedItem) {
      setLoadedItems((prev) => {
        const newCache = new Map(prev);
        newCache.set(value, selectedItem);
        return newCache;
      });
    }
  }, [value, selectedItem, loadedItems]);

  // Preload on open if enabled
  useEffect(() => {
    if (open && preloadAll && preloadFunction && allItems.length === 0) {
      performSearch("");
    }
  }, [open, preloadAll, preloadFunction, allItems.length, performSearch]);

  const handleSelect = (itemValue: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onValueChange(itemValue);
    setOpen(false);
    setSearchValue("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onValueChange("");
    setSearchValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const selectedItemData = value
    ? loadedItems.get(value) || selectedItem
    : null;
  const displayLabel = selectedItemData
    ? getOptionLabel(selectedItemData)
    : placeholder;

  const displayOptions =
    searchValue && searchResults.length > 0
      ? searchResults
      : preloadAll && allItems.length > 0
        ? allItems
        : searchResults;

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <div className={cn("relative w-full", className)}>
        <PopoverAnchor asChild>
          <div
            ref={triggerRef}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-expanded={open}
            className={cn(
              "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              disabled && "cursor-not-allowed opacity-50",
              !disabled && "cursor-pointer",
            )}
            onClick={(e) => {
              if (!disabled) {
                e.preventDefault();
                setOpen(!open);
                if (!open) {
                  setTimeout(() => inputRef.current?.focus(), 0);
                }
              }
            }}
            onKeyDown={(e) => {
              if (!disabled && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setOpen(!open);
                if (!open) {
                  setTimeout(() => inputRef.current?.focus(), 0);
                }
              }
            }}
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {displayLabel}
            </span>
            <div className="flex items-center gap-1">
              {value && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </div>
        </PopoverAnchor>
      </div>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <div className="p-2 border-b">
          <div className="relative">
            <Input
              ref={inputRef}
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-9 pr-8"
              autoFocus
            />
            {isSearching && (
              <div className="absolute right-2 top-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        <div className="max-h-60 overflow-auto p-1">
          {displayOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {isSearching ? "Searching..." : emptyText}
            </div>
          ) : (
            <div className="space-y-1">
              {displayOptions.map((item) => {
                const itemValue = getOptionValue(item);
                const isSelected = value === itemValue;
                return (
                  <button
                    key={itemValue}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={cn(
                      "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      isSelected && "bg-accent",
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelect(itemValue, e);
                    }}
                  >
                    <div className="flex-1 text-left">
                      <div className="font-medium">{getOptionLabel(item)}</div>
                      {getOptionSubtitle && getOptionSubtitle(item) && (
                        <div className="text-xs text-muted-foreground">
                          {getOptionSubtitle(item)}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
