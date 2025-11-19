"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Globe, FileText, DollarSign, Building2, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import type { Database } from "@/lib/supabase/database.types";
import { getStatusVariant } from "@/lib/design-system";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];
type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface PipelineTrackerTreeViewProps {
  formulations: Formulation[];
  countries: FormulationCountryDetail[];
  useGroups: FormulationCountryUseGroup[];
  businessCases: BusinessCase[];
}

export function PipelineTrackerTreeView({
  formulations,
  countries,
  useGroups,
  businessCases,
}: PipelineTrackerTreeViewProps) {
  const [expandedFormulations, setExpandedFormulations] = useState<Set<string>>(new Set());
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  const [expandedUseGroups, setExpandedUseGroups] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFormulation = (formulationCode: string) => {
    const newExpanded = new Set(expandedFormulations);
    if (newExpanded.has(formulationCode)) {
      newExpanded.delete(formulationCode);
    } else {
      newExpanded.add(formulationCode);
    }
    setExpandedFormulations(newExpanded);
  };

  const toggleCountry = (countryId: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(countryId)) {
      newExpanded.delete(countryId);
    } else {
      newExpanded.add(countryId);
    }
    setExpandedCountries(newExpanded);
  };

  const toggleUseGroup = (useGroupId: string) => {
    const newExpanded = new Set(expandedUseGroups);
    if (newExpanded.has(useGroupId)) {
      newExpanded.delete(useGroupId);
    } else {
      newExpanded.add(useGroupId);
    }
    setExpandedUseGroups(newExpanded);
  };

  const expandAll = () => {
    setExpandedFormulations(new Set(formulations.map(f => f.formulation_code || "")));
    setExpandedCountries(new Set(countries.map(c => c.formulation_country_id || "")));
    setExpandedUseGroups(new Set(useGroups.map(ug => ug.formulation_country_use_group_id || "")));
  };

  const collapseAll = () => {
    setExpandedFormulations(new Set());
    setExpandedCountries(new Set());
    setExpandedUseGroups(new Set());
  };

  // Group countries by formulation code
  const countriesByFormulation = countries.reduce((acc, country) => {
    const code = country.formulation_code || "";
    if (!acc[code]) {
      acc[code] = [];
    }
    acc[code].push(country);
    return acc;
  }, {} as Record<string, FormulationCountryDetail[]>);

  // Group use groups by country ID
  const useGroupsByCountry = useGroups.reduce((acc, useGroup) => {
    const countryId = useGroup.formulation_country_id || "";
    if (!acc[countryId]) {
      acc[countryId] = [];
    }
    acc[countryId].push(useGroup);
    return acc;
  }, {} as Record<string, FormulationCountryUseGroup[]>);

  // Group business cases by use group ID
  const businessCasesByUseGroup = businessCases.reduce((acc, bc) => {
    if (bc.formulation_country_use_group_id) {
      const useGroupId = bc.formulation_country_use_group_id;
      if (!acc[useGroupId]) {
        acc[useGroupId] = [];
      }
      acc[useGroupId].push(bc);
    }
    return acc;
  }, {} as Record<string, BusinessCase[]>);

  const formatCurrency = (value: number | null) => {
    if (!value) return "—";
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`;
    }
    return `€${(value / 1000).toFixed(0)}K`;
  };

  // Filter formulations based on search
  const filteredFormulations = formulations.filter(f => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      f.formulation_code?.toLowerCase().includes(term) ||
      f.product_name?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Tracker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search formulations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="outline" size="sm" onClick={collapseAll}>
                Collapse All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Formulations</p>
              <p className="text-lg font-semibold">{formulations.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Countries</p>
              <p className="text-lg font-semibold">{countries.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Use Groups</p>
              <p className="text-lg font-semibold">{useGroups.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Business Cases</p>
              <p className="text-lg font-semibold">{businessCases.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tree View */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-2">
            {filteredFormulations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No formulations found
              </div>
            ) : (
              filteredFormulations.map((formulation) => {
                const formulationCode = formulation.formulation_code || "";
                const isFormulationExpanded = expandedFormulations.has(formulationCode);
                const formulationCountries = countriesByFormulation[formulationCode] || [];

                return (
                  <Collapsible
                    key={formulation.formulation_id}
                    open={isFormulationExpanded}
                    onOpenChange={() => toggleFormulation(formulationCode)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                          >
                            {isFormulationExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <Link
                          href={`/formulations/${formulation.formulation_id}`}
                          className="flex-1"
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-auto p-3 hover:bg-muted border rounded-lg"
                          >
                            <FlaskConical className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                            <span className="font-semibold truncate">{formulationCode}</span>
                            {formulation.product_name && (
                              <span className="text-muted-foreground ml-2 truncate hidden sm:inline">
                                {formulation.product_name}
                              </span>
                            )}
                            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
                              {formulation.formulation_status && (
                                <Badge variant={getStatusVariant(formulation.formulation_status, 'formulation')} className="text-xs">
                                  {formulation.formulation_status}
                                </Badge>
                              )}
                              {formulation.readiness && (
                                <Badge variant={getStatusVariant(formulation.readiness, 'country')} className="text-xs">
                                  {formulation.readiness}
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {formulationCountries.length} countries
                              </Badge>
                            </div>
                          </Button>
                        </Link>
                      </div>

                      <CollapsibleContent>
                        <div className="ml-6 space-y-2">
                          {formulationCountries.length === 0 ? (
                            <div className="text-sm text-muted-foreground ml-4">No countries</div>
                          ) : (
                            formulationCountries.map((country) => {
                              const countryId = country.formulation_country_id || "";
                              const isCountryExpanded = expandedCountries.has(countryId);
                              const countryUseGroups = useGroupsByCountry[countryId] || [];

                              return (
                                <Collapsible
                                  key={countryId}
                                  open={isCountryExpanded}
                                  onOpenChange={() => toggleCountry(countryId)}
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <CollapsibleTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 flex-shrink-0"
                                        >
                                          {isCountryExpanded ? (
                                            <ChevronDown className="h-3 w-3" />
                                          ) : (
                                            <ChevronRight className="h-3 w-3" />
                                          )}
                                        </Button>
                                      </CollapsibleTrigger>
                                      <Link
                                        href={`/formulation-countries/${countryId}`}
                                        className="flex-1"
                                      >
                                        <Button
                                          variant="ghost"
                                          className="w-full justify-start h-auto p-2 hover:bg-muted border rounded-lg text-sm"
                                        >
                                          <Globe className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
                                          <span className="font-medium truncate">{country.country_name}</span>
                                          <div className="ml-auto flex items-center gap-1 flex-shrink-0">
                                            {country.country_status && (
                                              <Badge variant={getStatusVariant(country.country_status, 'country')} className="text-xs">
                                                {country.country_status}
                                              </Badge>
                                            )}
                                            {country.readiness && (
                                              <Badge variant={getStatusVariant(country.readiness, 'country')} className="text-xs">
                                                {country.readiness}
                                              </Badge>
                                            )}
                                            <Badge variant="outline" className="text-xs">
                                              {countryUseGroups.length} UG
                                            </Badge>
                                          </div>
                                        </Button>
                                      </Link>
                                    </div>

                                    <CollapsibleContent>
                                      <div className="ml-6 space-y-1">
                                        {countryUseGroups.length === 0 ? (
                                          <div className="text-xs text-muted-foreground ml-4">No use groups</div>
                                        ) : (
                                          countryUseGroups.map((useGroup) => {
                                            const useGroupId = useGroup.formulation_country_use_group_id || "";
                                            const isUseGroupExpanded = expandedUseGroups.has(useGroupId);
                                            const useGroupBusinessCases = businessCasesByUseGroup[useGroupId] || [];

                                            return (
                                              <Collapsible
                                                key={useGroupId}
                                                open={isUseGroupExpanded}
                                                onOpenChange={() => toggleUseGroup(useGroupId)}
                                              >
                                                <div className="space-y-1">
                                                  <div className="flex items-center gap-1">
                                                    <CollapsibleTrigger asChild>
                                                      <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6 flex-shrink-0"
                                                      >
                                                        {isUseGroupExpanded ? (
                                                          <ChevronDown className="h-3 w-3" />
                                                        ) : (
                                                          <ChevronRight className="h-3 w-3" />
                                                        )}
                                                      </Button>
                                                    </CollapsibleTrigger>
                                                    <Link
                                                      href={`/use-groups/${useGroupId}`}
                                                      className="flex-1"
                                                    >
                                                      <Button
                                                        variant="ghost"
                                                        className="w-full justify-start h-auto p-2 hover:bg-muted text-xs"
                                                      >
                                                        <FileText className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
                                                        <span className="truncate">
                                                          {useGroup.use_group_variant} - {useGroup.use_group_name}
                                                        </span>
                                                        <div className="ml-auto flex items-center gap-1 flex-shrink-0">
                                                          {useGroup.use_group_status && (
                                                            <Badge variant={useGroup.use_group_status === "Active" ? "success" : "outline"} className="text-xs">
                                                              {useGroup.use_group_status}
                                                            </Badge>
                                                          )}
                                                          <Badge variant="outline" className="text-xs">
                                                            {useGroupBusinessCases.length} BC
                                                          </Badge>
                                                        </div>
                                                      </Button>
                                                    </Link>
                                                  </div>

                                                  <CollapsibleContent>
                                                    <div className="ml-6 space-y-1">
                                                      {useGroupBusinessCases.length === 0 ? (
                                                        <div className="text-xs text-muted-foreground ml-4">No business cases</div>
                                                      ) : (
                                                        useGroupBusinessCases.map((bc) => (
                                                          <Link
                                                            key={bc.business_case_id}
                                                            href={`/business-cases/${bc.business_case_id}`}
                                                          >
                                                            <Button
                                                              variant="ghost"
                                                              className="w-full justify-start h-auto p-2 hover:bg-muted text-xs"
                                                            >
                                                              <DollarSign className="h-3 w-3 mr-1 text-muted-foreground flex-shrink-0" />
                                                              <span className="truncate">
                                                                FY{bc.fiscal_year} - Year {bc.year_offset}
                                                              </span>
                                                              <span className="ml-auto font-semibold flex-shrink-0">
                                                                {formatCurrency(bc.total_revenue)}
                                                              </span>
                                                            </Button>
                                                          </Link>
                                                        ))
                                                      )}
                                                    </div>
                                                  </CollapsibleContent>
                                                </div>
                                              </Collapsible>
                                            );
                                          })
                                        )}
                                      </div>
                                    </CollapsibleContent>
                                  </div>
                                </Collapsible>
                              );
                            })
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
