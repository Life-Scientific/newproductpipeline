"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import { routes } from "@/lib/routes";
import {
  quickActions as configQuickActions,
  workspaceGroups,
  searchConfig,
} from "@/config/command-palette.config";

// Dynamic props interface - add callbacks for each action defined in config
interface CommandPaletteProps {
  [key: string]: (() => void) | undefined;
  onOpenBusinessCaseModal?: () => void;
  onOpenFormulationModal?: () => void;
  onOpenCountryModal?: () => void;
  onOpenUseGroupModal?: () => void;
  onOpenCOGSModal?: () => void;
}

export function CommandPalette(props: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { query: searchQuery, setQuery: setSearchQuery, results, isSearching } = useSearch({
    debounceMs: searchConfig.debounceMs,
    minQueryLength: searchConfig.minQueryLength,
    limit: searchConfig.maxResults,
  });

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = useCallback((callback: () => void) => {
    setOpen(false);
    setSearchQuery("");
    callback();
  }, []);

  const navigateTo = useCallback((path: string) => {
    handleSelect(() => router.push(path));
  }, [handleSelect, router]);

  // Quick actions - filter to only show actions with available callbacks
  const quickActions = configQuickActions
    .map((action) => ({
      ...action,
      onSelect: () => handleSelect(() => {
        const callback = props[action.callbackProp];
        callback?.();
      }),
      disabled: !props[action.callbackProp],
    }))
    .filter((action) => !action.disabled);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type a command or search..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>
              {isSearching ? "Searching..." : "No results found."}
            </CommandEmpty>

        {/* Quick Actions */}
        {quickActions.length > 0 && !searchQuery && (
          <>
            <CommandGroup heading="Quick Actions">
              {quickActions.map((action) => (
                <CommandItem
                  key={action.label}
                  onSelect={action.onSelect}
                  className="gap-2"
                >
                  <action.icon className="h-4 w-4" />
                  <span>{action.label}</span>
                  {action.shortcut && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {action.shortcut}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {/* Workspace Navigation */}
        {!searchQuery && workspaceGroups.map((group, groupIndex) => (
          <div key={group.heading}>
            {groupIndex > 0 && <CommandSeparator />}
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.path}
                  onSelect={() => navigateTo(item.path)}
                  className="gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}

        {/* Search Results */}
        {searchQuery.length >= 2 && results.length > 0 && (
          <>
            {!searchQuery && <CommandSeparator />}
            <CommandGroup heading="Search Results">
              {results.map((result) => {
                const path =
                  result.entity_type === "formulation"
                    ? routes.formulations.detail(result.entity_id)
                    : result.entity_type === "country"
                    ? routes.countries.detail(result.entity_id)
                    : routes.reference();

                return (
                  <CommandItem
                    key={`${result.entity_type}-${result.entity_id}`}
                    onSelect={() => navigateTo(path)}
                    className="gap-2"
                  >
                    <Search className="h-4 w-4" />
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-medium">{result.entity_name}</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {result.entity_code}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground uppercase ml-2">
                        {result.entity_type === "formulation"
                          ? "Formulation"
                          : result.entity_type === "country"
                          ? "Country"
                          : "Reference"}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
