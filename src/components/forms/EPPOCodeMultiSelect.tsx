"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { log, warn, error, table } from "@/lib/logger";
import { X, ChevronDown, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchEPPOCodes } from "@/lib/actions/eppo-codes";
import type { Database } from "@/lib/supabase/database.types";
import { useDebounce } from "use-debounce";

type EPPOCode = Database["public"]["Tables"]["eppo_codes"]["Row"];

interface EPPOCodeMultiSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  classification?:
    | "crop"
    | "insect"
    | "disease"
    | "weed"
    | ("crop" | "insect" | "disease" | "weed")[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  allowedEppoCodeIds?: string[];
  showCode?: boolean;
}

export function EPPOCodeMultiSelect({
  selected,
  onChange,
  classification,
  placeholder = "Search and select EPPO codes...",
  searchPlaceholder = "Type to search (name, code, or latin name)...",
  emptyText = "No EPPO codes found. Try a different search term.",
  className,
  disabled = false,
  allowedEppoCodeIds,
  showCode = true,
}: EPPOCodeMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<EPPOCode[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allLoadedCodes, setAllLoadedCodes] = useState<Map<string, EPPOCode>>(
    new Map(),
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [debouncedSearchValue] = useDebounce(searchValue, 300);

  // Search function
  const performSearch = useCallback(
    async (term: string) => {
      if (!term || term.trim().length < 1) {
        // If no search term and we have allowed codes, show all allowed codes
        if (allowedEppoCodeIds && allowedEppoCodeIds.length > 0) {
          // Load all allowed codes if not already loaded
          if (allLoadedCodes.size === 0) {
            searchEPPOCodes({
              classification,
              limit: 1000,
            }).then((result) => {
              if (result.data) {
                const filtered = result.data.filter((code) =>
                  allowedEppoCodeIds.includes(code.eppo_code_id),
                );
                setAllLoadedCodes(
                  new Map(filtered.map((code) => [code.eppo_code_id, code])),
                );
                setSearchResults(filtered);
              }
            });
          } else {
            // Show all allowed codes from cache
            const filtered = Array.from(allLoadedCodes.values()).filter(
              (code) => allowedEppoCodeIds.includes(code.eppo_code_id),
            );
            setSearchResults(filtered);
          }
        } else {
          setSearchResults([]);
        }
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const result = await searchEPPOCodes({
          search: term,
          classification,
          limit: 100,
        });

        if (result.data) {
          let filtered = result.data;

          // Filter to allowed codes if specified
          if (allowedEppoCodeIds && allowedEppoCodeIds.length > 0) {
            filtered = filtered.filter((code) =>
              allowedEppoCodeIds.includes(code.eppo_code_id),
            );
          }

          // Cache all loaded codes
          setAllLoadedCodes((prev) => {
            const newCache = new Map(prev);
            filtered.forEach((code) => {
              newCache.set(code.eppo_code_id, code);
            });
            return newCache;
          });

          setSearchResults(filtered);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        error("Error searching EPPO codes:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    [classification, allowedEppoCodeIds, allLoadedCodes],
  );

  // Debounced search effect
  useEffect(() => {
    performSearch(debouncedSearchValue);
  }, [debouncedSearchValue, performSearch]);

  // Load selected codes if not in cache
  useEffect(() => {
    const missingIds = selected.filter((id) => !allLoadedCodes.has(id));
    if (missingIds.length > 0) {
      searchEPPOCodes({
        classification,
        limit: 1000,
      }).then((result) => {
        if (result.data) {
          setAllLoadedCodes((prev) => {
            const newCache = new Map(prev);
            result.data.forEach((code) => {
              if (missingIds.includes(code.eppo_code_id)) {
                newCache.set(code.eppo_code_id, code);
              }
            });
            return newCache;
          });
        }
      });
    }
  }, [selected, allLoadedCodes, classification]);

  // Initial load of allowed codes
  useEffect(() => {
    if (
      allowedEppoCodeIds &&
      allowedEppoCodeIds.length > 0 &&
      allLoadedCodes.size === 0 &&
      !searchValue
    ) {
      performSearch("");
    }
  }, [allowedEppoCodeIds, performSearch, allLoadedCodes.size, searchValue]);

  const handleUnselect = (value: string, e?: React.MouseEvent) => {
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
      inputRef.current?.blur();
    }
  };

  const selectedCodes = useMemo(() => {
    return selected
      .map((id) => allLoadedCodes.get(id))
      .filter((code): code is EPPOCode => code !== undefined);
  }, [selected, allLoadedCodes]);

  const filteredOptions = useMemo(() => {
    return searchResults.filter(
      (code) => !selected.includes(code.eppo_code_id),
    );
  }, [searchResults, selected]);

  const getCodeLabel = (code: EPPOCode) => {
    const name = code.display_name || code.latin_name || code.eppo_code;
    return showCode ? `${name} (${code.eppo_code})` : name;
  };

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
              {selectedCodes.map((code) => (
                <Badge
                  key={code.eppo_code_id}
                  variant="secondary"
                  className="mr-1 mb-1"
                >
                  {getCodeLabel(code)}
                  <span
                    role="button"
                    tabIndex={0}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer inline-flex items-center"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(code.eppo_code_id, e as any);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(code.eppo_code_id, e);
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
          {filteredOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {isSearching ? "Searching..." : emptyText}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredOptions.map((code) => {
                const isSelected = selected.includes(code.eppo_code_id);
                return (
                  <button
                    key={code.eppo_code_id}
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
                      handleSelect(code.eppo_code_id, e);
                      setSearchValue("");
                    }}
                  >
                    <div className="flex-1 text-left">
                      <div className="font-medium">{getCodeLabel(code)}</div>
                      {code.latin_name &&
                        code.latin_name !== code.display_name && (
                          <div className="text-xs text-muted-foreground">
                            {code.latin_name}
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
