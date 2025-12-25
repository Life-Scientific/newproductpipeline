"use client";

import { Search, X } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface UseGroupOption {
  id: string;
  variant: string;
  name: string | null;
  targetMarketEntry: string | null;
}

interface UseGroupSelectorProps {
  useGroups: UseGroupOption[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  label?: string;
  disabled?: boolean;
  searchPlaceholder?: string;
  maxHeight?: string;
}

export function UseGroupSelector({
  useGroups,
  selectedIds,
  onSelectionChange,
  label = "Use Groups",
  disabled = false,
  searchPlaceholder = "Search use groups...",
  maxHeight = "max-h-[250px]",
}: UseGroupSelectorProps) {
  const [search, setSearch] = React.useState("");

  const filteredGroups = React.useMemo(() => {
    if (!search.trim()) return useGroups;

    const searchLower = search.toLowerCase();
    return useGroups.filter((ug) => {
      const name = ug.name?.toLowerCase() || "";
      const variant = ug.variant.toLowerCase();
      return name.includes(searchLower) || variant.includes(searchLower);
    });
  }, [useGroups, search]);

  const toggleSelection = (id: string) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    onSelectionChange(newSelected);
  };

  const removeSelection = (id: string) => {
    const newSelected = selectedIds.filter((selectedId) => selectedId !== id);
    onSelectionChange(newSelected);
  };

  const clearSelection = () => {
    onSelectionChange([]);
  };

  const selectedGroups = useGroups.filter((ug) => selectedIds.includes(ug.id));

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>

      {useGroups.length === 0 ? (
        <div className="px-3 py-4 border rounded-md bg-muted/30 text-sm text-muted-foreground text-center">
          No use groups available
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={disabled}
              className="pl-9"
            />
          </div>

          {selectedGroups.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedGroups.map((ug) => (
                <Badge key={ug.id} variant="secondary" className="gap-1 pr-1">
                  <span>{ug.name || ug.variant}</span>
                  {!disabled && (
                    <button
                      type="button"
                      onClick={() => removeSelection(ug.id)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {!disabled && (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          <div
            className={`space-y-2 overflow-y-auto border rounded-md p-2 ${maxHeight}`}
          >
            {filteredGroups.length === 0 ? (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                No use groups match your search
              </div>
            ) : (
              filteredGroups.map((ug) => {
                const isSelected = selectedIds.includes(ug.id);

                return (
                  <Card
                    key={ug.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-sm",
                      isSelected && "ring-2 ring-primary bg-primary/5",
                    )}
                    onClick={() => !disabled && toggleSelection(ug.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 h-4 w-4 rounded border flex items-center justify-center flex-shrink-0",
                            isSelected
                              ? "bg-primary border-primary"
                              : "border-input",
                          )}
                        >
                          {isSelected && (
                            <svg
                              role="img"
                              aria-label="Selected"
                              className="h-3 w-3 text-primary-foreground"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="font-mono text-xs"
                            >
                              {ug.variant}
                            </Badge>
                            {ug.name && (
                              <span className="font-medium text-sm truncate">
                                {ug.name}
                              </span>
                            )}
                          </div>
                          {ug.targetMarketEntry ? (
                            <div className="mt-1.5 text-xs text-muted-foreground">
                              Effective FY Start: {ug.targetMarketEntry}
                            </div>
                          ) : (
                            <div className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
                              No effective fiscal year start set
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}
