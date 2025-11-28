"use client";

import {
  Beaker,
  ChevronRight,
  FileText,
  Globe,
  LayoutGrid,
  List,
  Package,
  Pencil,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UseGroupEditModal } from "@/components/use-groups/UseGroupEditModal";
import { usePermissions } from "@/hooks/use-permissions";
import { getStatusVariant } from "@/lib/design-system";
import type { Database } from "@/lib/supabase/database.types";
import { cn } from "@/lib/utils";

type FormulationCountryUseGroup =
  Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

interface UseGroupWithFormulationId extends FormulationCountryUseGroup {
  formulation_id?: string | null;
}

interface UseGroupsListProps {
  useGroups: UseGroupWithFormulationId[];
}

type ViewMode = "grouped" | "flat";
type SortField = "formulation" | "country" | "status";

export function UseGroupsList({ useGroups }: UseGroupsListProps) {
  const router = useRouter();
  const [editingUseGroupId, setEditingUseGroupId] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");
  const [sortField, setSortField] = useState<SortField>("formulation");
  const [expandedFormulations, setExpandedFormulations] = useState<Set<string>>(
    new Set(),
  );
  const { canEditUseGroups, isLoading: permissionsLoading } = usePermissions();
  const { toast } = useToast();

  const editingUseGroup = useGroups.find(
    (ug) => ug.formulation_country_use_group_id === editingUseGroupId,
  );

  const handleEditClick = (useGroupId: string | null) => {
    if (!canEditUseGroups) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit use groups",
        variant: "destructive",
      });
      return;
    }
    setEditingUseGroupId(useGroupId);
  };

  // Filter use groups by search
  const filteredUseGroups = useMemo(() => {
    if (!searchTerm) return useGroups;
    const term = searchTerm.toLowerCase();
    return useGroups.filter(
      (ug) =>
        ug.formulation_code?.toLowerCase().includes(term) ||
        ug.formulation_name?.toLowerCase().includes(term) ||
        ug.country_name?.toLowerCase().includes(term) ||
        ug.use_group_name?.toLowerCase().includes(term) ||
        ug.use_group_variant?.toLowerCase().includes(term),
    );
  }, [useGroups, searchTerm]);

  // Group by formulation
  const groupedByFormulation = useMemo(() => {
    const groups = new Map<
      string,
      {
        formulationCode: string;
        formulationName: string | null;
        formulationId: string | null;
        countries: Map<string, UseGroupWithFormulationId[]>;
        totalUseGroups: number;
        approvedCount: number;
      }
    >();

    filteredUseGroups.forEach((ug) => {
      const key = ug.formulation_code || "Unknown";
      if (!groups.has(key)) {
        groups.set(key, {
          formulationCode: key,
          formulationName: ug.formulation_name || null,
          formulationId: ug.formulation_id || null,
          countries: new Map(),
          totalUseGroups: 0,
          approvedCount: 0,
        });
      }

      const group = groups.get(key)!;
      const countryKey = ug.country_name || "Unknown";

      if (!group.countries.has(countryKey)) {
        group.countries.set(countryKey, []);
      }
      group.countries.get(countryKey)!.push(ug);
      group.totalUseGroups++;
      if (ug.use_group_status === "Approved") {
        group.approvedCount++;
      }
    });

    // Sort groups
    return Array.from(groups.values()).sort((a, b) => {
      if (sortField === "formulation") {
        return a.formulationCode.localeCompare(b.formulationCode);
      }
      return a.totalUseGroups - b.totalUseGroups;
    });
  }, [filteredUseGroups, sortField]);

  const toggleFormulation = (code: string) => {
    const newExpanded = new Set(expandedFormulations);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedFormulations(newExpanded);
  };

  const expandAll = () => {
    setExpandedFormulations(
      new Set(groupedByFormulation.map((g) => g.formulationCode)),
    );
  };

  const collapseAll = () => {
    setExpandedFormulations(new Set());
  };

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search formulations, countries, use groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={viewMode === "grouped" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grouped")}
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Grouped
          </Button>
          <Button
            variant={viewMode === "flat" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("flat")}
          >
            <List className="h-4 w-4 mr-1" />
            Flat
          </Button>
          {viewMode === "grouped" && (
            <>
              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredUseGroups.length} use groups
        {searchTerm && ` matching "${searchTerm}"`}
        {viewMode === "grouped" &&
          ` across ${groupedByFormulation.length} formulations`}
      </p>

      {viewMode === "grouped" ? (
        /* Grouped View */
        <div className="space-y-2">
          {groupedByFormulation.map((group) => {
            const isExpanded = expandedFormulations.has(group.formulationCode);
            const countriesArray = Array.from(group.countries.entries()).sort(
              (a, b) => a[0].localeCompare(b[0]),
            );

            return (
              <Collapsible
                key={group.formulationCode}
                open={isExpanded}
                onOpenChange={() => toggleFormulation(group.formulationCode)}
              >
                <Card className="overflow-hidden">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors py-3 px-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 text-muted-foreground transition-transform",
                              isExpanded && "rotate-90",
                            )}
                          />
                          <Beaker className="h-4 w-4 text-primary" />
                          <div>
                            <CardTitle className="text-sm font-medium">
                              {group.formulationName
                                ? `${group.formulationName} (${group.formulationCode})`
                                : group.formulationCode}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {group.countries.size}{" "}
                              {group.countries.size === 1
                                ? "country"
                                : "countries"}{" "}
                              • {group.totalUseGroups} use groups
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {group.approvedCount > 0 && (
                            <Badge variant="success" className="text-xs">
                              {group.approvedCount} approved
                            </Badge>
                          )}
                          {group.formulationId && (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Link
                                href={`/portfolio/formulations/${group.formulationId}`}
                              >
                                View
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-3 px-4">
                      <div className="ml-7 space-y-3">
                        {countriesArray.map(
                          ([countryName, countryUseGroups]) => (
                            <div
                              key={countryName}
                              className="border-l-2 border-muted pl-4"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="font-medium text-sm">
                                  {countryName}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {countryUseGroups.length} use groups
                                </Badge>
                              </div>

                              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                {countryUseGroups.map((ug) => (
                                  <div
                                    key={ug.formulation_country_use_group_id}
                                    className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors group"
                                  >
                                    <Link
                                      href={`/portfolio/use-groups/${ug.formulation_country_use_group_id}`}
                                      className="flex items-center gap-2 flex-1 min-w-0"
                                    >
                                      <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                      <div className="min-w-0">
                                        <p className="text-sm font-medium truncate hover:text-primary">
                                          {ug.use_group_name ||
                                            `Variant ${ug.use_group_variant}`}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          <Badge
                                            variant="outline"
                                            className="text-[10px] px-1.5 py-0"
                                          >
                                            {ug.use_group_variant}
                                          </Badge>
                                          {ug.use_group_status && (
                                            <Badge
                                              variant={getStatusVariant(
                                                ug.use_group_status,
                                                "registration",
                                              )}
                                              className="text-[10px] px-1.5 py-0"
                                            >
                                              {ug.use_group_status}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </Link>
                                    {canEditUseGroups && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleEditClick(
                                            ug.formulation_country_use_group_id,
                                          )
                                        }
                                        className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        disabled={permissionsLoading}
                                      >
                                        <Pencil className="h-3.5 w-3.5" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
      ) : (
        /* Flat View - Simplified table-like layout */
        <div className="space-y-1">
          {filteredUseGroups.map((ug) => (
            <div
              key={ug.formulation_country_use_group_id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/portfolio/use-groups/${ug.formulation_country_use_group_id}`}
                      className="font-medium text-sm hover:text-primary hover:underline truncate"
                    >
                      {ug.use_group_name || `Variant ${ug.use_group_variant}`}
                    </Link>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {ug.use_group_variant}
                    </Badge>
                    {ug.use_group_status && (
                      <Badge
                        variant={getStatusVariant(
                          ug.use_group_status,
                          "registration",
                        )}
                        className="text-xs shrink-0"
                      >
                        {ug.use_group_status}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Beaker className="h-3 w-3" />
                      {ug.formulation_name || ug.formulation_code}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {ug.country_name}
                    </span>
                    {ug.reference_product_name && (
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {ug.reference_product_name}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {canEditUseGroups && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleEditClick(ug.formulation_country_use_group_id)
                  }
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={permissionsLoading}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {filteredUseGroups.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">No use groups found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm
                ? `No use groups match "${searchTerm}"`
                : "Use groups are created when you register a formulation for specific crops/pests"}
            </p>
          </CardContent>
        </Card>
      )}

      {editingUseGroup && (
        <UseGroupEditModal
          useGroup={{
            formulation_country_use_group_id:
              editingUseGroup.formulation_country_use_group_id || "",
            use_group_variant: editingUseGroup.use_group_variant || "",
            use_group_name: editingUseGroup.use_group_name || null,
            use_group_status: editingUseGroup.use_group_status || null,
            target_market_entry_fy:
              editingUseGroup.target_market_entry_fy || null,
            earliest_planned_submission_date:
              editingUseGroup.earliest_planned_submission_date || null,
            earliest_planned_approval_date:
              editingUseGroup.earliest_planned_approval_date || null,
            earliest_actual_submission_date:
              editingUseGroup.earliest_actual_submission_date || null,
            earliest_actual_approval_date:
              editingUseGroup.earliest_actual_approval_date || null,
            reference_product_id: editingUseGroup.reference_product_id || null,
            country_name: editingUseGroup.country_name || undefined,
            formulation_name: editingUseGroup.formulation_code || undefined,
          }}
          open={!!editingUseGroupId}
          onOpenChange={(open) => {
            if (!open) setEditingUseGroupId(null);
          }}
          onSuccess={() => {
            setEditingUseGroupId(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
