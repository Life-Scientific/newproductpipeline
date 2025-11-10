"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Globe, FileText, DollarSign, Building2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Database } from "@/lib/supabase/database.types";

type FormulationCountryDetail = Database["public"]["Views"]["vw_formulation_country_detail"]["Row"];
type FormulationCountryLabel = Database["public"]["Views"]["vw_formulation_country_label"]["Row"];
type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface FormulationTreeViewProps {
  formulationId: string;
  formulationCode: string;
  formulationName: string;
  countries: FormulationCountryDetail[];
  labels: FormulationCountryLabel[];
  businessCases: BusinessCase[];
}

export function FormulationTreeView({
  formulationId,
  formulationCode,
  formulationName,
  countries,
  labels,
  businessCases,
}: FormulationTreeViewProps) {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  const [expandedLabels, setExpandedLabels] = useState<Set<string>>(new Set());

  // Auto-expand first country if only one exists
  useEffect(() => {
    if (countries.length === 1) {
      setExpandedCountries(new Set([countries[0].formulation_country_id || ""]));
    }
  }, [countries]);

  const toggleCountry = (countryId: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(countryId)) {
      newExpanded.delete(countryId);
    } else {
      newExpanded.add(countryId);
    }
    setExpandedCountries(newExpanded);
  };

  const toggleLabel = (labelId: string) => {
    const newExpanded = new Set(expandedLabels);
    if (newExpanded.has(labelId)) {
      newExpanded.delete(labelId);
    } else {
      newExpanded.add(labelId);
    }
    setExpandedLabels(newExpanded);
  };

  // Group labels by country ID
  const labelsByCountry = labels.reduce((acc, label) => {
    const countryId = label.formulation_country_id || "";
    if (!acc[countryId]) {
      acc[countryId] = [];
    }
    acc[countryId].push(label);
    return acc;
  }, {} as Record<string, FormulationCountryLabel[]>);

  // Group business cases by country ID (where formulation_country_id is not null)
  const businessCasesByCountry = businessCases.reduce((acc, bc) => {
    if (bc.formulation_country_id) {
      const countryId = bc.formulation_country_id;
      if (!acc[countryId]) {
        acc[countryId] = [];
      }
      acc[countryId].push(bc);
    }
    return acc;
  }, {} as Record<string, BusinessCase[]>);

  // Group business cases by label ID (where formulation_country_label_id is not null)
  const businessCasesByLabel = businessCases.reduce((acc, bc) => {
    if (bc.formulation_country_label_id) {
      const labelId = bc.formulation_country_label_id;
      if (!acc[labelId]) {
        acc[labelId] = [];
      }
      acc[labelId].push(bc);
    }
    return acc;
  }, {} as Record<string, BusinessCase[]>);

  const formatCurrency = (value: number | null) => {
    if (!value) return "—";
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const totalBusinessCases = businessCases.length;
  const totalRevenue = businessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card>
        <CardHeader className="space-y-1.5">
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Countries</p>
              <p className="text-lg font-semibold">{countries.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Labels</p>
              <p className="text-lg font-semibold">{labels.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Business Cases</p>
              <p className="text-lg font-semibold">{totalBusinessCases}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Revenue</p>
              <p className="text-lg font-semibold">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tree View Card */}
      <Card>
        <CardHeader className="space-y-1.5">
          <CardTitle>Formulation Tree</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          {/* Formulation Level */}
          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-primary/5 border-2 border-primary/20">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <Link
                href={`/formulations/${formulationId}`}
                className="font-semibold text-base sm:text-lg text-primary hover:underline break-words"
              >
                {formulationCode} - {formulationName}
              </Link>
            </div>
          </div>

          {/* Countries Level */}
          {countries.length > 0 ? (
            <div className="ml-2 sm:ml-4 space-y-2">
              {countries.map((country) => {
                const countryId = country.formulation_country_id || "";
                const countryLabels = labelsByCountry[countryId] || [];
                const countryBusinessCases = businessCasesByCountry[countryId] || [];
                const isExpanded = expandedCountries.has(countryId);

                return (
                  <Collapsible
                    key={countryId}
                    open={isExpanded}
                    onOpenChange={() => toggleCountry(countryId)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                            ) : (
                              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <Link
                          href={`/formulation-countries/${countryId}`}
                          className="flex-1"
                        >
                          <Button
                            variant="ghost"
                            className="w-full justify-start h-auto p-2 sm:p-3 hover:bg-muted border rounded-lg text-sm sm:text-base"
                          >
                            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-muted-foreground flex-shrink-0" />
                            <span className="font-medium truncate">{country.country_name}</span>
                            {country.registration_status && (
                              <Badge variant="outline" className="ml-1 sm:ml-2 text-xs hidden sm:inline-flex">
                                {country.registration_status}
                              </Badge>
                            )}
                            <div className="ml-auto flex items-center gap-1 sm:gap-2 flex-shrink-0">
                              {countryLabels.length > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  {countryLabels.length}L
                                </Badge>
                              )}
                              {countryBusinessCases.length > 0 && (
                                <Badge variant="default" className="text-xs">
                                  {countryBusinessCases.length}BC
                                </Badge>
                              )}
                            </div>
                          </Button>
                        </Link>
                      </div>

                      <CollapsibleContent>
                        <div className="ml-3 sm:ml-6 space-y-3 border-l-2 border-muted pl-2 sm:pl-4">
                          {/* Business Cases at Country Level */}
                          {countryBusinessCases.length > 0 && (
                            <div className="space-y-2">
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                Business Cases (Country Level)
                              </div>
                              {countryBusinessCases.map((bc) => (
                                <Link
                                  key={bc.business_case_id}
                                  href={`/business-cases?bc=${bc.business_case_id}`}
                                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-md hover:bg-muted/50 transition-colors border"
                                >
                                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-xs sm:text-sm truncate">
                                      {bc.display_name || bc.business_case_name || "Business Case"}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {bc.fiscal_year} • Y{bc.year_offset} • {bc.scenario_name || "Base"}
                                    </div>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <div className="text-xs sm:text-sm font-semibold">{formatCurrency(bc.total_revenue)}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {bc.margin_percent?.toFixed(1)}%
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}

                          {/* Labels Level */}
                          {countryLabels.length > 0 && (
                            <div className="space-y-2">
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                Labels
                              </div>
                              {countryLabels.map((label) => {
                                const labelId = label.formulation_country_label_id || "";
                                const labelBusinessCases = businessCasesByLabel[labelId] || [];
                                const isLabelExpanded = expandedLabels.has(labelId);

                                return (
                                  <Collapsible
                                    key={labelId}
                                    open={isLabelExpanded}
                                    onOpenChange={() => toggleLabel(labelId)}
                                  >
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <CollapsibleTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 flex-shrink-0"
                                          >
                                            {isLabelExpanded ? (
                                              <ChevronDown className="h-3 w-3" />
                                            ) : (
                                              <ChevronRight className="h-3 w-3" />
                                            )}
                                          </Button>
                                        </CollapsibleTrigger>
                                        <Link
                                          href={`/labels/${labelId}`}
                                          className="flex-1"
                                        >
                                          <Button
                                            variant="ghost"
                                            className="w-full justify-start h-auto p-2 hover:bg-muted/50 border rounded-md text-xs sm:text-sm"
                                          >
                                            <FileText className="h-3 w-3 mr-1 sm:mr-2 text-muted-foreground flex-shrink-0" />
                                            <span className="truncate">
                                              {label.label_name || `Label ${label.label_variant}`}
                                            </span>
                                            {label.label_variant && (
                                              <Badge variant="outline" className="text-xs ml-1 sm:ml-2 hidden sm:inline-flex">
                                                {label.label_variant}
                                              </Badge>
                                            )}
                                            {label.registration_status && (
                                              <Badge variant="secondary" className="text-xs ml-1 sm:ml-2 hidden sm:inline-flex">
                                                {label.registration_status}
                                              </Badge>
                                            )}
                                            {labelBusinessCases.length > 0 && (
                                              <Badge variant="default" className="text-xs ml-auto flex-shrink-0">
                                                {labelBusinessCases.length}BC
                                              </Badge>
                                            )}
                                          </Button>
                                        </Link>
                                      </div>

                                      <CollapsibleContent>
                                        <div className="ml-3 sm:ml-6 space-y-2 border-l-2 border-muted/50 pl-2 sm:pl-3">
                                          {/* Label Details */}
                                          <div className="p-2 rounded-md bg-muted/30 border text-xs space-y-1">
                                            {label.reference_product_name && (
                                              <div>
                                                <span className="font-medium">Reference Product: </span>
                                                <span>{label.reference_product_name}</span>
                                              </div>
                                            )}
                                            {label.earliest_submission_date && (
                                              <div>
                                                <span className="font-medium">Earliest Submission: </span>
                                                <span>{new Date(label.earliest_submission_date).toLocaleDateString()}</span>
                                              </div>
                                            )}
                                            {label.actual_submission_date && (
                                              <div>
                                                <span className="font-medium">Actual Submission: </span>
                                                <span>{new Date(label.actual_submission_date).toLocaleDateString()}</span>
                                              </div>
                                            )}
                                            {label.actual_approval_date && (
                                              <div>
                                                <span className="font-medium">Approved: </span>
                                                <span>{new Date(label.actual_approval_date).toLocaleDateString()}</span>
                                              </div>
                                            )}
                                          </div>

                                          {/* Business Cases at Label Level */}
                                          {labelBusinessCases.length > 0 && (
                                            <div className="space-y-2">
                                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                                Business Cases
                                              </div>
                                              {labelBusinessCases.map((bc) => (
                                                <Link
                                                  key={bc.business_case_id}
                                                  href={`/business-cases/${bc.business_case_id}`}
                                                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-colors border text-xs sm:text-sm"
                                                >
                                                  <DollarSign className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                                  <div className="flex-1 min-w-0">
                                                    <div className="font-medium truncate">
                                                      {bc.display_name || bc.business_case_name || "Business Case"}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                      {bc.fiscal_year} • Y{bc.year_offset} • {bc.scenario_name || "Base"}
                                                    </div>
                                                  </div>
                                                  <div className="text-right flex-shrink-0">
                                                    <div className="text-xs font-semibold">{formatCurrency(bc.total_revenue)}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                      {bc.margin_percent?.toFixed(1)}%
                                                    </div>
                                                  </div>
                                                </Link>
                                              ))}
                                            </div>
                                          )}
                                          {labelBusinessCases.length === 0 && (
                                            <div className="text-xs text-muted-foreground p-2 border rounded-md bg-muted/30">
                                              No business cases for this label
                                            </div>
                                          )}
                                        </div>
                                      </CollapsibleContent>
                                    </div>
                                  </Collapsible>
                                );
                              })}
                            </div>
                          )}

                          {/* Show message if no labels or business cases */}
                          {countryLabels.length === 0 && countryBusinessCases.length === 0 && (
                            <div className="text-xs text-muted-foreground p-2 border rounded-md bg-muted/30">
                              No labels or business cases for this country
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          ) : (
            <div className="ml-4 text-sm text-muted-foreground p-3 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>No countries registered</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
