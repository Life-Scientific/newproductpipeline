"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronRight, Pencil } from "lucide-react";
import { COGSEditModal } from "./COGSEditModal";
import type { Database } from "@/lib/supabase/database.types";
import { usePermissions } from "@/hooks/use-permissions";
import { useToast } from "@/components/ui/use-toast";

type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];

interface COGSGroup {
  cogs_group_id: string;
  formulation_id: string;
  formulation_code: string;
  formulation_name: string;
  formulation_country_id: string | null;
  country_name: string | null;
  fiscal_year_range: string;
  status: string;
  last_updated_at: string | null;
  created_by: string | null;
  cogs_records: COGS[];
}

interface COGSListProps {
  cogs: COGS[];
}

export function COGSList({ cogs }: COGSListProps) {
  const { toast } = useToast();
  const { canEditCOGS, isLoading: permissionsLoading } = usePermissions();
  const [expandedFormulations, setExpandedFormulations] = useState<Set<string>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFormulation, setSelectedFormulation] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [selectedGroupInfo, setSelectedGroupInfo] = useState<{
    formulationId: string;
    formulationName: string;
    formulationCountryId: string | null;
    countryName: string | null;
  } | null>(null);

  // Group COGS by cogs_group_id
  const cogsGroups = useMemo(() => {
    const groupMap = new Map<string, COGSGroup>();

    cogs.forEach((cogsRecord) => {
      const groupId = (cogsRecord as any).cogs_group_id;
      if (!groupId) return;

      if (!groupMap.has(groupId)) {
        // Create new group
        const fiscalYears = [cogsRecord.fiscal_year].filter(
          Boolean,
        ) as string[];
        groupMap.set(groupId, {
          cogs_group_id: groupId,
          formulation_id: (cogsRecord as any).formulation_id || "",
          formulation_code: cogsRecord.formulation_code || "",
          formulation_name: cogsRecord.formulation_name || "",
          formulation_country_id:
            (cogsRecord as any).formulation_country_id || null,
          country_name: cogsRecord.country_name || null,
          fiscal_year_range: "",
          status: (cogsRecord as any).status || "active",
          last_updated_at: cogsRecord.updated_at,
          created_by: (cogsRecord as any).created_by || null,
          cogs_records: [cogsRecord],
        });
      } else {
        // Add to existing group
        const group = groupMap.get(groupId)!;
        group.cogs_records.push(cogsRecord);
      }
    });

    // Calculate fiscal year ranges and sort records
    groupMap.forEach((group) => {
      group.cogs_records.sort((a, b) =>
        (a.fiscal_year || "").localeCompare(b.fiscal_year || ""),
      );
      const years = group.cogs_records
        .map((r) => r.fiscal_year)
        .filter(Boolean);
      if (years.length > 0) {
        group.fiscal_year_range = `${years[0]}-${years[years.length - 1]}`;
      }
    });

    return Array.from(groupMap.values());
  }, [cogs]);

  // Group by formulation
  const formulationGroups = useMemo(() => {
    const formMap = new Map<
      string,
      { formulation: string; groups: COGSGroup[] }
    >();

    cogsGroups.forEach((group) => {
      const key = group.formulation_code || group.formulation_id;
      if (!formMap.has(key)) {
        formMap.set(key, {
          formulation:
            group.formulation_name || group.formulation_code || "Unknown",
          groups: [],
        });
      }
      formMap.get(key)!.groups.push(group);
    });

    // Sort groups within each formulation (Global first, then alphabetically)
    formMap.forEach((value) => {
      value.groups.sort((a, b) => {
        if (!a.country_name && b.country_name) return -1;
        if (a.country_name && !b.country_name) return 1;
        return (a.country_name || "").localeCompare(b.country_name || "");
      });
    });

    return Array.from(formMap.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
  }, [cogsGroups]);

  // Filter options
  const uniqueFormulations = useMemo(() => {
    const formulations = new Set<string>();
    cogsGroups.forEach((g) =>
      formulations.add(g.formulation_code || g.formulation_id),
    );
    return Array.from(formulations).sort();
  }, [cogsGroups]);

  const uniqueCountries = useMemo(() => {
    const countries = new Set<string>();
    cogsGroups.forEach((g) => {
      if (g.country_name) countries.add(g.country_name);
    });
    return Array.from(countries).sort();
  }, [cogsGroups]);

  // Apply filters
  const filteredFormulationGroups = useMemo(() => {
    return formulationGroups
      .map(([key, value]) => {
        // Filter by formulation
        if (selectedFormulation !== "all" && key !== selectedFormulation) {
          return null;
        }

        // Filter by search term
        if (
          searchTerm &&
          !value.formulation.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return null;
        }

        // Filter groups by country (status filtered in view)
        const filteredGroups = value.groups.filter((group) => {
          // Filter by country
          if (selectedCountry !== "all") {
            if (selectedCountry === "global" && group.country_name !== null) {
              return false;
            }
            if (
              selectedCountry !== "global" &&
              group.country_name !== selectedCountry
            ) {
              return false;
            }
          }

          return true;
        });

        if (filteredGroups.length === 0) {
          return null;
        }

        return [key, { ...value, groups: filteredGroups }] as const;
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }, [formulationGroups, selectedFormulation, selectedCountry, searchTerm]);

  const toggleFormulation = (key: string) => {
    setExpandedFormulations((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleEdit = (group: COGSGroup) => {
    if (!canEditCOGS) {
      toast({
        title: "Permission Denied",
        description: "You don't have permission to edit COGS data",
        variant: "destructive",
      });
      return;
    }

    setSelectedGroupId(group.cogs_group_id);
    setSelectedGroupInfo({
      formulationId: group.formulation_id,
      formulationName: group.formulation_name,
      formulationCountryId: group.formulation_country_id,
      countryName: group.country_name,
    });
    setEditModalOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>COGS Data</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="search">Search Formulation</Label>
              <Input
                id="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formulation-filter">Formulation</Label>
              <Select
                value={selectedFormulation}
                onValueChange={setSelectedFormulation}
              >
                <SelectTrigger id="formulation-filter">
                  <SelectValue placeholder="All Formulations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Formulations</SelectItem>
                  {uniqueFormulations.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country-filter">Country</Label>
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
                <SelectTrigger id="country-filter">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="global">Global Only</SelectItem>
                  {uniqueCountries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* COGS Groups */}
          <div className="space-y-2">
            {filteredFormulationGroups.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No COGS data found matching the filters.
              </div>
            ) : (
              filteredFormulationGroups.map(
                ([key, { formulation, groups }]) => {
                  const isExpanded = expandedFormulations.has(key);

                  return (
                    <div key={key} className="border rounded-lg">
                      {/* Formulation Header */}
                      <div
                        className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleFormulation(key)}
                      >
                        <div className="flex items-center gap-2">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="font-medium">{formulation}</span>
                          <Badge variant="outline">
                            {groups.length} group(s)
                          </Badge>
                        </div>
                      </div>

                      {/* Country Groups (Expanded) */}
                      {isExpanded && (
                        <div className="border-t">
                          {groups.map((group) => (
                            <div
                              key={group.cogs_group_id}
                              className="flex items-center justify-between p-3 hover:bg-muted/30 border-b last:border-b-0"
                            >
                              <div className="flex items-center gap-4 flex-1">
                                <div className="w-32">
                                  {group.country_name ? (
                                    <span>{group.country_name}</span>
                                  ) : (
                                    <Badge variant="outline">Global</Badge>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <span className="text-sm text-muted-foreground">
                                    {group.fiscal_year_range}
                                  </span>
                                </div>
                                <div>
                                  {group.last_updated_at && (
                                    <span className="text-xs text-muted-foreground">
                                      Updated:{" "}
                                      {new Date(
                                        group.last_updated_at,
                                      ).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <Badge
                                    variant={
                                      group.status === "active"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {group.status}
                                  </Badge>
                                </div>
                              </div>
                              {canEditCOGS && !permissionsLoading && (
                                <div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEdit(group)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                },
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {selectedGroupId && selectedGroupInfo && (
        <COGSEditModal
          groupId={selectedGroupId}
          formulationId={selectedGroupInfo.formulationId}
          formulationName={selectedGroupInfo.formulationName}
          formulationCountryId={selectedGroupInfo.formulationCountryId}
          countryName={selectedGroupInfo.countryName}
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSuccess={() => {
            // Refresh will be handled by parent component
            setEditModalOpen(false);
          }}
        />
      )}
    </>
  );
}
