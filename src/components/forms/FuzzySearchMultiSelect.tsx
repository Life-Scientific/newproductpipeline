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

interface FuzzySearchMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  searchFunction: (search: string) => Promise<{ data?: any[]; error?: string }>;
  getOptionValue: (item: any) => string;
  getOptionLabel: (item: any) => string;
  getOptionSubtitle?: (item: any) => string | undefined;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  // For displaying selected values when not searching
  selectedItems?: any[];
  // Optional: preload all items when no search
  preloadAll?: boolean;
  preloadFunction?: () => Promise<{ data?: any[]; error?: string }>;
}

export function FuzzySearchMultiSelect({
  selected,
  onChange,
  searchFunction,
  getOptionValue,
  getOptionLabel,
  getOptionSubtitle,
  placeholder = "Search and select...",
  searchPlaceholder = "Type to search...",
  emptyText = "No results found. Try a different search term.",
  className,
  disabled = false,
  selectedItems = [],
  preloadAll = false,
  preloadFunction,
}: FuzzySearchMultiSelectProps) {
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

  // Load selected items if not in cache
  useEffect(() => {
    if (selectedItems.length > 0) {
      setLoadedItems((prev) => {
        const newCache = new Map(prev);
        selectedItems.forEach((item) => {
          const value = getOptionValue(item);
          newCache.set(value, item);
        });
        return newCache;
      });
    }
  }, [selectedItems, getOptionValue]);

  // Preload on open if enabled
  useEffect(() => {
    if (open && preloadAll && preloadFunction && allItems.length === 0) {
      performSearch("");
    }
  }, [open, preloadAll, preloadFunction, allItems.length, performSearch]);

  const handleUnselect = (itemValue: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onChange(selected.filter((s) => s !== itemValue));
  };

  const handleSelect = (itemValue: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (selected.includes(itemValue)) {
      handleUnselect(itemValue);
    } else {
      onChange([...selected, itemValue]);
    }
    // Keep dropdown open for multiple selections
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (searchValue === "" && selected.length > 0) {
        handleUnselect(selected[selected.length - 1]);
      }
    }
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const selectedItemsData = useMemo(() => {
    return selected
      .map((id) => loadedItems.get(id))
      .filter((item): item is any => item !== undefined);
  }, [selected, loadedItems]);

  const displayOptions = useMemo(() => {
    const options =
      searchValue && searchResults.length > 0
        ? searchResults
        : preloadAll && allItems.length > 0
          ? allItems
          : searchResults;

    return options.filter((item) => !selected.includes(getOptionValue(item)));
  }, [
    searchResults,
    allItems,
    searchValue,
    preloadAll,
    selected,
    getOptionValue,
  ]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("relative w-full", className)}>
        <PopoverAnchor asChild>
          <div
            ref={triggerRef}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            aria-expanded={open}
            className={cn(
              "min-h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer",
              disabled && "cursor-not-allowed opacity-50",
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
            <div className="flex flex-wrap gap-1 items-center">
              {selectedItemsData.map((item) => (
                <Badge
                  key={getOptionValue(item)}
                  variant="secondary"
                  className="mr-1 mb-1"
                >
                  {getOptionLabel(item)}
                  <span
                    role="button"
                    tabIndex={0}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer inline-flex items-center"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(getOptionValue(item), e as any);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(getOptionValue(item), e);
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </span>
                </Badge>
              ))}
              {selected.length === 0 && (
                <span className="text-muted-foreground ml-2">
                  {placeholder}
                </span>
              )}
            </div>
          </div>
        </PopoverAnchor>
        {open && (
          <Input
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 opacity-0 pointer-events-none"
            tabIndex={-1}
          />
        )}
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
                const isSelected = selected.includes(itemValue);
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
                      setSearchValue("");
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
