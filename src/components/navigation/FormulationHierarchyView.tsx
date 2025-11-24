"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Globe, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

interface FormulationHierarchyViewProps {
  formulationId: string;
  formulationCode: string;
  formulationName: string;
  countries: FormulationCountryDetail[];
  useGroups: FormulationCountryUseGroup[];
}

export function FormulationHierarchyView({
  formulationId,
  formulationCode,
  formulationName,
  countries,
  useGroups,
}: FormulationHierarchyViewProps) {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  const toggleCountry = (countryId: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(countryId)) {
      newExpanded.delete(countryId);
    } else {
      newExpanded.add(countryId);
    }
    setExpandedCountries(newExpanded);
  };

  // Group use groups by country
  const useGroupsByCountry = useGroups.reduce((acc, useGroup) => {
    const countryId = useGroup.formulation_country_id || "unknown";
    if (!acc[countryId]) {
      acc[countryId] = [];
    }
    acc[countryId].push(useGroup);
    return acc;
  }, {} as Record<string, FormulationCountryUseGroup[]>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hierarchy View</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Formulation Level */}
        <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
          <FileText className="h-4 w-4 text-primary" />
          <Link
            href={`/formulations/${formulationId}`}
            className="font-semibold text-primary hover:underline"
          >
            {formulationCode} - {formulationName}
          </Link>
        </div>

        {/* Countries Level */}
        {countries.length > 0 ? (
          <div className="ml-6 space-y-1">
            {countries.map((country) => {
              const countryId = country.formulation_country_id || "";
              const countryUseGroups = useGroupsByCountry[countryId] || [];
              const isExpanded = expandedCountries.has(countryId);

              return (
                <Collapsible
                  key={countryId}
                  open={isExpanded}
                  onOpenChange={() => toggleCountry(countryId)}
                >
                  <div className="space-y-1">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-2 hover:bg-muted"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronRight className="h-4 w-4 mr-2" />
                        )}
                        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">{country.country_name}</span>
                        {country.country_status && (
                          <Badge variant="outline" className="ml-2">
                            {country.country_status}
                          </Badge>
                        )}
                        {countryUseGroups.length > 0 && (
                          <Badge variant="secondary" className="ml-auto">
                            {countryUseGroups.length} use group{countryUseGroups.length !== 1 ? "s" : ""}
                          </Badge>
                        )}
                      </Button>
                    </CollapsibleTrigger>

                    {/* Use Groups Level */}
                    {countryUseGroups.length > 0 && (
                      <CollapsibleContent>
                        <div className="ml-8 space-y-1">
                          {countryUseGroups.map((useGroup) => (
                            <Link
                              key={useGroup.formulation_country_use_group_id}
                              href={`/formulations/${formulationId}?country=${countryId}&use-group=${useGroup.formulation_country_use_group_id}`}
                              className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                            >
                              <FileText className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                {useGroup.use_group_name || `Use Group ${useGroup.use_group_variant}`}
                              </span>
                              {useGroup.use_group_variant && (
                                <Badge variant="outline" className="text-xs">
                                  {useGroup.use_group_variant}
                                </Badge>
                              )}
                              {useGroup.use_group_status && (
                                <Badge variant="secondary" className="text-xs ml-auto">
                                  {useGroup.use_group_status}
                                </Badge>
                              )}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    )}
                  </div>
                </Collapsible>
              );
            })}
          </div>
        ) : (
          <div className="ml-6 text-sm text-muted-foreground p-2">
            No countries registered
          </div>
        )}
      </CardContent>
    </Card>
  );
}

