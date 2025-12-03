"use client";

import * as React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect, type MultiSelectOption } from "@/components/ui/multi-select";
import { 
  Plus, 
  Minus, 
  X, 
  Trash2, 
  Copy,
  TrendingUp,
  DollarSign,
  Package,
  Percent,
  Sparkles,
  Filter,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";
import type { BusinessCaseGroupData } from "@/lib/db/queries";

interface ScenarioPlanningClientProps {
  businessCases: BusinessCaseGroupData[];
  exchangeRates: Map<string, number>;
}

interface Scenario {
  id: string;
  name: string;
  color: string;
  adjustments: {
    cogsPercent: number;
    nspPercent: number;
    volumePercent: number;
  };
}

const SCENARIO_COLORS = [
  "#f97316", // Orange
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#84cc16", // Lime
  "#f59e0b", // Amber
];

const ADJUSTMENT_STEP = 5;

export function ScenarioPlanningClient({ businessCases, exchangeRates }: ScenarioPlanningClientProps) {
  const { formatCurrencyCompact } = useDisplayPreferences();
  
  // Filter state
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>([]);
  const [selectedFormulationIds, setSelectedFormulationIds] = useState<string[]>([]);
  const [selectedUseGroupIds, setSelectedUseGroupIds] = useState<string[]>([]);
  
  // Scenario state
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("table");

  // Track if we're doing auto-selection to prevent loops
  const isAutoSelecting = useRef(false);

  // Build ALL filter options from business cases (unfiltered)
  const allFilterOptions = useMemo(() => {
    const countries = new Map<string, string>();
    const formulations = new Map<string, string>();
    const useGroups = new Map<string, string>();

    businessCases.forEach((bc) => {
      if (bc.country_id && bc.country_name) {
        countries.set(bc.country_id, bc.country_name);
      }
      if (bc.formulation_id && bc.formulation_name) {
        const display = bc.formulation_code 
          ? `${bc.formulation_name} (${bc.formulation_code})`
          : bc.formulation_name;
        formulations.set(bc.formulation_id, display);
      }
      const useGroupKey = bc.use_group_id || `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
      const useGroupDisplay = bc.use_group_name 
        ? `${bc.use_group_name}${bc.use_group_variant ? ` (${bc.use_group_variant})` : ''}`
        : bc.use_group_variant || 'Unknown';
      if (useGroupKey) {
        useGroups.set(useGroupKey, useGroupDisplay);
      }
    });

    return {
      countries: Array.from(countries.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      formulations: Array.from(formulations.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
      useGroups: Array.from(useGroups.entries())
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    };
  }, [businessCases]);

  // Available formulations based on selected countries
  const availableFormulations = useMemo(() => {
    if (selectedCountryIds.length === 0) {
      return allFilterOptions.formulations;
    }

    const filteredFormulations = new Map<string, string>();
    
    businessCases.forEach((bc) => {
      if (selectedCountryIds.includes(bc.country_id)) {
        if (bc.formulation_id && bc.formulation_name) {
          const display = bc.formulation_code 
            ? `${bc.formulation_name} (${bc.formulation_code})`
            : bc.formulation_name;
          filteredFormulations.set(bc.formulation_id, display);
        }
      }
    });

    return Array.from(filteredFormulations.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [businessCases, selectedCountryIds, allFilterOptions.formulations]);

  // Available use groups based on selected countries AND formulations
  const availableUseGroups = useMemo(() => {
    if (selectedCountryIds.length === 0 && selectedFormulationIds.length === 0) {
      return allFilterOptions.useGroups;
    }

    const filteredUseGroups = new Map<string, string>();
    
    businessCases.forEach((bc) => {
      const matchesCountry = selectedCountryIds.length === 0 || selectedCountryIds.includes(bc.country_id);
      const matchesFormulation = selectedFormulationIds.length === 0 || selectedFormulationIds.includes(bc.formulation_id);
      
      if (matchesCountry && matchesFormulation) {
        const useGroupKey = bc.use_group_id || `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
        const useGroupDisplay = bc.use_group_name 
          ? `${bc.use_group_name}${bc.use_group_variant ? ` (${bc.use_group_variant})` : ''}`
          : bc.use_group_variant || 'Unknown';
        if (useGroupKey) {
          filteredUseGroups.set(useGroupKey, useGroupDisplay);
        }
      }
    });

    return Array.from(filteredUseGroups.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [businessCases, selectedCountryIds, selectedFormulationIds, allFilterOptions.useGroups]);

  // Handle country selection change with cascading updates
  const handleCountryChange = useCallback((newCountryIds: string[]) => {
    isAutoSelecting.current = true;
    
    setSelectedCountryIds(newCountryIds);
    
    // Filter out formulations that are no longer available
    if (newCountryIds.length > 0) {
      const validFormulationIds = new Set<string>();
      businessCases.forEach((bc) => {
        if (newCountryIds.includes(bc.country_id) && bc.formulation_id) {
          validFormulationIds.add(bc.formulation_id);
        }
      });
      
      setSelectedFormulationIds(prev => {
        const filtered = prev.filter(id => validFormulationIds.has(id));
        // Auto-select if only one formulation available
        if (filtered.length === 0 && validFormulationIds.size === 1) {
          return Array.from(validFormulationIds);
        }
        return filtered;
      });
    }
    
    // Filter out use groups that are no longer available
    setSelectedUseGroupIds(prev => {
      const validUseGroupIds = new Set<string>();
      businessCases.forEach((bc) => {
        const matchesCountry = newCountryIds.length === 0 || newCountryIds.includes(bc.country_id);
        if (matchesCountry) {
          const useGroupKey = bc.use_group_id || `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
          if (useGroupKey) validUseGroupIds.add(useGroupKey);
        }
      });
      const filtered = prev.filter(id => validUseGroupIds.has(id));
      // Auto-select if only one use group available
      if (filtered.length === 0 && validUseGroupIds.size === 1) {
        return Array.from(validUseGroupIds);
      }
      return filtered;
    });
    
    isAutoSelecting.current = false;
  }, [businessCases]);

  // Handle formulation selection change with cascading updates
  const handleFormulationChange = useCallback((newFormulationIds: string[]) => {
    isAutoSelecting.current = true;
    
    setSelectedFormulationIds(newFormulationIds);
    
    // Filter out use groups that are no longer available
    setSelectedUseGroupIds(prev => {
      const validUseGroupIds = new Set<string>();
      businessCases.forEach((bc) => {
        const matchesCountry = selectedCountryIds.length === 0 || selectedCountryIds.includes(bc.country_id);
        const matchesFormulation = newFormulationIds.length === 0 || newFormulationIds.includes(bc.formulation_id);
        if (matchesCountry && matchesFormulation) {
          const useGroupKey = bc.use_group_id || `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
          if (useGroupKey) validUseGroupIds.add(useGroupKey);
        }
      });
      const filtered = prev.filter(id => validUseGroupIds.has(id));
      // Auto-select if only one use group available
      if (filtered.length === 0 && validUseGroupIds.size === 1) {
        return Array.from(validUseGroupIds);
      }
      return filtered;
    });
    
    isAutoSelecting.current = false;
  }, [businessCases, selectedCountryIds]);

  // Handle use group selection change
  const handleUseGroupChange = useCallback((newUseGroupIds: string[]) => {
    setSelectedUseGroupIds(newUseGroupIds);
  }, []);

  // Filter business cases based on selections
  const selectedBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => {
      const matchesCountry = selectedCountryIds.length === 0 || selectedCountryIds.includes(bc.country_id);
      const matchesFormulation = selectedFormulationIds.length === 0 || selectedFormulationIds.includes(bc.formulation_id);
      
      let matchesUseGroup = true;
      if (selectedUseGroupIds.length > 0) {
        const useGroupKey = bc.use_group_id || `${bc.formulation_id}-${bc.country_id}-${bc.use_group_variant}`;
        matchesUseGroup = selectedUseGroupIds.includes(useGroupKey);
      }
      
      return matchesCountry && matchesFormulation && matchesUseGroup;
    });
  }, [businessCases, selectedCountryIds, selectedFormulationIds, selectedUseGroupIds]);

  // Check if any filters are active
  const hasActiveFilters = selectedCountryIds.length > 0 || selectedFormulationIds.length > 0 || selectedUseGroupIds.length > 0;

  // Calculate scenario results
  const scenarioResults = useMemo(() => {
    if (selectedBusinessCases.length === 0) return [];

    return scenarios.map((scenario) => {
      const adjustedCases = selectedBusinessCases.map((bc) => {
        const adjustedYearsData: typeof bc.years_data = {};
        
        Object.entries(bc.years_data).forEach(([fy, data]) => {
          const cogsMultiplier = 1 + (scenario.adjustments.cogsPercent / 100);
          const nspMultiplier = 1 + (scenario.adjustments.nspPercent / 100);
          const volumeMultiplier = 1 + (scenario.adjustments.volumePercent / 100);

          const adjustedVolume = (data.volume ?? 0) * volumeMultiplier;
          const adjustedNsp = (data.nsp ?? 0) * nspMultiplier;
          const adjustedCogs = (data.cogs_per_unit ?? 0) * cogsMultiplier;
          const adjustedRevenue = adjustedVolume * adjustedNsp;
          const adjustedMargin = adjustedRevenue - (adjustedVolume * adjustedCogs);
          const marginPercent = adjustedRevenue > 0 ? (adjustedMargin / adjustedRevenue) * 100 : 0;

          adjustedYearsData[fy] = {
            volume: adjustedVolume,
            nsp: adjustedNsp,
            cogs_per_unit: adjustedCogs,
            total_revenue: adjustedRevenue,
            total_margin: adjustedMargin,
            margin_percent: marginPercent,
          };
        });

        return { ...bc, years_data: adjustedYearsData };
      });

      return { scenario, adjustedCases };
    });
  }, [selectedBusinessCases, scenarios]);

  // Aggregated totals for comparison
  const aggregatedComparison = useMemo(() => {
    if (selectedBusinessCases.length === 0) return null;

    const aggregateYearData = (cases: BusinessCaseGroupData[]) => {
      let totalRevenue = 0;
      let totalMargin = 0;
      
      cases.forEach((bc) => {
        const rate = exchangeRates.get(bc.country_id) || 1;
        Object.values(bc.years_data).forEach((data) => {
          totalRevenue += (data.total_revenue ?? 0) / rate;
          totalMargin += (data.total_margin ?? 0) / rate;
        });
      });

      return { totalRevenue, totalMargin, marginPercent: totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0 };
    };

    const baseline = aggregateYearData(selectedBusinessCases);
    
    const scenarioTotals = scenarioResults.map(({ scenario, adjustedCases }) => ({
      scenario,
      ...aggregateYearData(adjustedCases),
    }));

    return { baseline, scenarioTotals };
  }, [selectedBusinessCases, scenarioResults, exchangeRates]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSelectedCountryIds([]);
    setSelectedFormulationIds([]);
    setSelectedUseGroupIds([]);
  }, []);

  // Add a new scenario
  const addScenario = useCallback(() => {
    const id = `scenario-${Date.now()}`;
    const colorIndex = scenarios.length % SCENARIO_COLORS.length;
    setScenarios((prev) => [
      ...prev,
      {
        id,
        name: `Scenario ${prev.length + 1}`,
        color: SCENARIO_COLORS[colorIndex],
        adjustments: { cogsPercent: 0, nspPercent: 0, volumePercent: 0 },
      },
    ]);
  }, [scenarios.length]);

  // Remove a scenario
  const removeScenario = useCallback((id: string) => {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // Update scenario adjustment
  const updateScenarioAdjustment = useCallback((id: string, key: keyof Scenario["adjustments"], delta: number) => {
    setScenarios((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, adjustments: { ...s.adjustments, [key]: s.adjustments[key] + delta } }
          : s
      )
    );
  }, []);

  // Set scenario adjustment directly
  const setScenarioAdjustment = useCallback((id: string, key: keyof Scenario["adjustments"], value: number) => {
    setScenarios((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, adjustments: { ...s.adjustments, [key]: value } }
          : s
      )
    );
  }, []);

  // Update scenario name
  const updateScenarioName = useCallback((id: string, name: string) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name } : s))
    );
  }, []);

  // Duplicate scenario
  const duplicateScenario = useCallback((scenario: Scenario) => {
    const colorIndex = scenarios.length % SCENARIO_COLORS.length;
    setScenarios((prev) => [
      ...prev,
      {
        ...scenario,
        id: `scenario-${Date.now()}`,
        name: `${scenario.name} (Copy)`,
        color: SCENARIO_COLORS[colorIndex],
      },
    ]);
  }, [scenarios.length]);

  // Format currency - use hook's formatCurrencyCompact
  const formatCurrency = formatCurrencyCompact;

  // Format percentage change
  const formatChange = (baseline: number, scenario: number) => {
    if (baseline === 0) return "—";
    const change = ((scenario - baseline) / Math.abs(baseline)) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Filter Business Cases */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Step 1: Select Business Cases
              </CardTitle>
              <CardDescription>
                Filter by country, formulation, and use group. Selections cascade and auto-select when only one option.
              </CardDescription>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Country Filter */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center justify-between">
                <span>Country</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {allFilterOptions.countries.length} available
                </span>
              </Label>
              <MultiSelect
                options={allFilterOptions.countries}
                selected={selectedCountryIds}
                onChange={handleCountryChange}
                placeholder="Select countries..."
                searchPlaceholder="Search countries..."
                emptyText="No countries found"
              />
            </div>

            {/* Formulation Filter - filtered by country */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center justify-between">
                <span>Formulation</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {availableFormulations.length} available
                </span>
              </Label>
              <MultiSelect
                options={availableFormulations}
                selected={selectedFormulationIds}
                onChange={handleFormulationChange}
                placeholder="Select formulations..."
                searchPlaceholder="Search formulations..."
                emptyText="No formulations found"
              />
            </div>

            {/* Use Group Filter - filtered by country AND formulation */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center justify-between">
                <span>Use Group</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {availableUseGroups.length} available
                </span>
              </Label>
              <MultiSelect
                options={availableUseGroups}
                selected={selectedUseGroupIds}
                onChange={handleUseGroupChange}
                placeholder="Select use groups..."
                searchPlaceholder="Search use groups..."
                emptyText="No use groups found"
              />
            </div>
          </div>

          {/* Selection Summary */}
          <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg border transition-colors",
            hasActiveFilters ? "bg-primary/5 border-primary/20" : "bg-muted/50"
          )}>
            {hasActiveFilters ? (
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {hasActiveFilters 
                  ? `${selectedBusinessCases.length.toLocaleString()} business cases selected`
                  : `${businessCases.length.toLocaleString()} total business cases available`
                }
              </p>
              <p className="text-xs text-muted-foreground">
                {hasActiveFilters 
                  ? "These will be used as the baseline for your scenarios"
                  : "Start by selecting a country to narrow down your selection"
                }
              </p>
            </div>
            {hasActiveFilters && selectedBusinessCases.length > 0 && (
              <div className="flex gap-2 flex-wrap shrink-0">
                {selectedCountryIds.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedCountryIds.length} {selectedCountryIds.length === 1 ? "country" : "countries"}
                  </Badge>
                )}
                {selectedFormulationIds.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedFormulationIds.length} {selectedFormulationIds.length === 1 ? "formulation" : "formulations"}
                  </Badge>
                )}
                {selectedUseGroupIds.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedUseGroupIds.length} {selectedUseGroupIds.length === 1 ? "use group" : "use groups"}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Define Scenarios */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Step 2: Define Scenarios
              </CardTitle>
              <CardDescription>
                Create &ldquo;what-if&rdquo; scenarios with different assumptions
              </CardDescription>
            </div>
            <Button onClick={addScenario} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Scenario
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {scenarios.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <Sparkles className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">No scenarios created yet</p>
              <Button onClick={addScenario} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Scenario
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {scenarios.map((scenario) => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    onRemove={() => removeScenario(scenario.id)}
                    onDuplicate={() => duplicateScenario(scenario)}
                    onUpdateAdjustment={(key, delta) => updateScenarioAdjustment(scenario.id, key, delta)}
                    onSetAdjustment={(key, value) => setScenarioAdjustment(scenario.id, key, value)}
                    onUpdateName={(name) => updateScenarioName(scenario.id, name)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 3: Compare Results */}
      {hasActiveFilters && selectedBusinessCases.length > 0 && scenarios.length > 0 && aggregatedComparison && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Step 3: Compare Results
            </CardTitle>
            <CardDescription>
              View the impact of your scenarios against the baseline ({selectedBusinessCases.length.toLocaleString()} business cases)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "table" | "chart")}>
              <TabsList className="mb-4">
                <TabsTrigger value="table">Summary Table</TabsTrigger>
                <TabsTrigger value="chart">By Year</TabsTrigger>
              </TabsList>

              <TabsContent value="table">
                <ComparisonSummaryTable
                  baseline={aggregatedComparison.baseline}
                  scenarioTotals={aggregatedComparison.scenarioTotals}
                  formatCurrency={formatCurrency}
                  formatChange={formatChange}
                />
              </TabsContent>

              <TabsContent value="chart">
                <ComparisonByYear
                  selectedBusinessCases={selectedBusinessCases}
                  scenarioResults={scenarioResults}
                  exchangeRates={exchangeRates}
                  formatCurrency={formatCurrency}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Empty state guidance */}
      {(!hasActiveFilters || selectedBusinessCases.length === 0 || scenarios.length === 0) && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <div className="space-y-2">
              {!hasActiveFilters ? (
                <>
                  <Filter className="h-10 w-10 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Start by selecting a country to filter business cases
                  </p>
                </>
              ) : selectedBusinessCases.length === 0 ? (
                <>
                  <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    No business cases match your current filters. Try adjusting your selection.
                  </p>
                </>
              ) : (
                <>
                  <Sparkles className="h-10 w-10 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Create at least one scenario to see the comparison
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Scenario Card Component
interface ScenarioCardProps {
  scenario: Scenario;
  onRemove: () => void;
  onDuplicate: () => void;
  onUpdateAdjustment: (key: keyof Scenario["adjustments"], delta: number) => void;
  onSetAdjustment: (key: keyof Scenario["adjustments"], value: number) => void;
  onUpdateName: (name: string) => void;
}

function ScenarioCard({ 
  scenario, 
  onRemove, 
  onDuplicate,
  onUpdateAdjustment, 
  onSetAdjustment,
  onUpdateName 
}: ScenarioCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="border rounded-lg overflow-hidden bg-card"
      style={{ borderLeftColor: scenario.color, borderLeftWidth: 4 }}
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <Input
            value={scenario.name}
            onChange={(e) => onUpdateName(e.target.value)}
            className="h-8 font-medium border-none p-0 focus-visible:ring-0 bg-transparent flex-1"
          />
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDuplicate} title="Duplicate">
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={onRemove} title="Delete">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Adjustments */}
        <div className="space-y-3">
          <AdjustmentControl
            label="COGS"
            value={scenario.adjustments.cogsPercent}
            onChange={(delta) => onUpdateAdjustment("cogsPercent", delta)}
            onSet={(value) => onSetAdjustment("cogsPercent", value)}
            icon={<DollarSign className="h-4 w-4" />}
          />
          <AdjustmentControl
            label="NSP"
            value={scenario.adjustments.nspPercent}
            onChange={(delta) => onUpdateAdjustment("nspPercent", delta)}
            onSet={(value) => onSetAdjustment("nspPercent", value)}
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <AdjustmentControl
            label="Volume"
            value={scenario.adjustments.volumePercent}
            onChange={(delta) => onUpdateAdjustment("volumePercent", delta)}
            onSet={(value) => onSetAdjustment("volumePercent", value)}
            icon={<Package className="h-4 w-4" />}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Adjustment Control Component
interface AdjustmentControlProps {
  label: string;
  value: number;
  onChange: (delta: number) => void;
  onSet: (value: number) => void;
  icon: React.ReactNode;
}

function AdjustmentControl({ label, value, onChange, onSet, icon }: AdjustmentControlProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 w-20 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      
      <div className="flex items-center gap-1 flex-1">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={() => onChange(-ADJUSTMENT_STEP)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <div className="flex-1 relative min-w-[80px]">
          <Input
            type="number"
            value={value}
            onChange={(e) => onSet(parseFloat(e.target.value) || 0)}
            className="h-7 text-center pr-6 text-sm"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
        </div>
        
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={() => onChange(ADJUSTMENT_STEP)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Visual indicator */}
      <div className="w-14 flex items-center justify-end shrink-0">
        {value !== 0 && (
          <Badge 
            variant="secondary"
            className={cn(
              "text-xs font-medium",
              value > 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}
          >
            {value > 0 ? "+" : ""}{value}%
          </Badge>
        )}
      </div>
    </div>
  );
}

// Comparison Summary Table
interface ComparisonSummaryTableProps {
  baseline: { totalRevenue: number; totalMargin: number; marginPercent: number };
  scenarioTotals: Array<{
    scenario: Scenario;
    totalRevenue: number;
    totalMargin: number;
    marginPercent: number;
  }>;
  formatCurrency: (value: number) => string;
  formatChange: (baseline: number, scenario: number) => string;
}

function ComparisonSummaryTable({ baseline, scenarioTotals, formatCurrency, formatChange }: ComparisonSummaryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-sm">Metric</th>
            <th className="text-right py-3 px-4 font-medium text-sm">
              <div className="flex items-center justify-end gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                Baseline
              </div>
            </th>
            {scenarioTotals.map(({ scenario }) => (
              <th key={scenario.id} className="text-right py-3 px-4 font-medium text-sm">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
                  {scenario.name}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Total Revenue */}
          <tr className="border-b hover:bg-muted/50 transition-colors">
            <td className="py-3 px-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                Total Revenue (10yr)
              </div>
            </td>
            <td className="text-right py-3 px-4 font-medium">{formatCurrency(baseline.totalRevenue)}</td>
            {scenarioTotals.map(({ scenario, totalRevenue }) => (
              <td key={scenario.id} className="text-right py-3 px-4">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{formatCurrency(totalRevenue)}</span>
                  <span className={cn(
                    "text-xs font-medium",
                    totalRevenue >= baseline.totalRevenue ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {formatChange(baseline.totalRevenue, totalRevenue)}
                  </span>
                </div>
              </td>
            ))}
          </tr>

          {/* Total Margin */}
          <tr className="border-b hover:bg-muted/50 transition-colors">
            <td className="py-3 px-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Total Gross Margin (10yr)
              </div>
            </td>
            <td className="text-right py-3 px-4 font-medium">{formatCurrency(baseline.totalMargin)}</td>
            {scenarioTotals.map(({ scenario, totalMargin }) => (
              <td key={scenario.id} className="text-right py-3 px-4">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{formatCurrency(totalMargin)}</span>
                  <span className={cn(
                    "text-xs font-medium",
                    totalMargin >= baseline.totalMargin ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {formatChange(baseline.totalMargin, totalMargin)}
                  </span>
                </div>
              </td>
            ))}
          </tr>

          {/* Margin % */}
          <tr className="hover:bg-muted/50 transition-colors">
            <td className="py-3 px-4 text-sm">
              <div className="flex items-center gap-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                Margin %
              </div>
            </td>
            <td className="text-right py-3 px-4 font-medium">{baseline.marginPercent.toFixed(1)}%</td>
            {scenarioTotals.map(({ scenario, marginPercent }) => (
              <td key={scenario.id} className="text-right py-3 px-4">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{marginPercent.toFixed(1)}%</span>
                  <span className={cn(
                    "text-xs font-medium",
                    marginPercent >= baseline.marginPercent ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {(marginPercent - baseline.marginPercent) >= 0 ? "+" : ""}
                    {(marginPercent - baseline.marginPercent).toFixed(1)}pp
                  </span>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Comparison By Year Component
interface ComparisonByYearProps {
  selectedBusinessCases: BusinessCaseGroupData[];
  scenarioResults: Array<{
    scenario: Scenario;
    adjustedCases: BusinessCaseGroupData[];
  }>;
  exchangeRates: Map<string, number>;
  formatCurrency: (value: number) => string;
}

function ComparisonByYear({ 
  selectedBusinessCases, 
  scenarioResults, 
  exchangeRates,
  formatCurrency 
}: ComparisonByYearProps) {
  // Get all fiscal years across all selected cases
  const allYears = useMemo(() => {
    const years = new Set<string>();
    selectedBusinessCases.forEach((bc) => {
      Object.keys(bc.years_data).forEach((fy) => years.add(fy));
    });
    return Array.from(years).sort();
  }, [selectedBusinessCases]);

  // Calculate totals per year for baseline and each scenario
  const yearlyData = useMemo(() => {
    const aggregateYear = (cases: BusinessCaseGroupData[], fy: string) => {
      let revenue = 0;
      let margin = 0;
      cases.forEach((bc) => {
        const rate = exchangeRates.get(bc.country_id) || 1;
        const data = bc.years_data[fy];
        if (data) {
          revenue += (data.total_revenue ?? 0) / rate;
          margin += (data.total_margin ?? 0) / rate;
        }
      });
      return { revenue, margin };
    };

    return allYears.map((fy) => ({
      fiscalYear: fy,
      baseline: aggregateYear(selectedBusinessCases, fy),
      scenarios: scenarioResults.map(({ scenario, adjustedCases }) => ({
        scenario,
        ...aggregateYear(adjustedCases, fy),
      })),
    }));
  }, [allYears, selectedBusinessCases, scenarioResults, exchangeRates]);

  if (yearlyData.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No yearly data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-3 font-medium">Year</th>
            <th className="text-right py-2 px-3 font-medium" colSpan={2}>
              <div className="flex items-center justify-end gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                Baseline
              </div>
            </th>
            {scenarioResults.map(({ scenario }) => (
              <th key={scenario.id} className="text-right py-2 px-3 font-medium" colSpan={2}>
                <div className="flex items-center justify-end gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scenario.color }} />
                  {scenario.name}
                </div>
              </th>
            ))}
          </tr>
          <tr className="border-b bg-muted/30">
            <th className="py-1 px-3" />
            <th className="text-right py-1 px-3 text-xs text-muted-foreground font-normal">Revenue</th>
            <th className="text-right py-1 px-3 text-xs text-muted-foreground font-normal">Margin</th>
            {scenarioResults.map(({ scenario }) => (
              <React.Fragment key={`header-${scenario.id}`}>
                <th className="text-right py-1 px-3 text-xs text-muted-foreground font-normal">Revenue</th>
                <th className="text-right py-1 px-3 text-xs text-muted-foreground font-normal">Margin</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {yearlyData.map(({ fiscalYear, baseline, scenarios }) => (
            <tr key={fiscalYear} className="border-b hover:bg-muted/30 transition-colors">
              <td className="py-2 px-3 font-medium">{fiscalYear}</td>
              <td className="text-right py-2 px-3">{formatCurrency(baseline.revenue)}</td>
              <td className="text-right py-2 px-3">{formatCurrency(baseline.margin)}</td>
              {scenarios.map(({ scenario, revenue, margin }) => (
                <React.Fragment key={`data-${fiscalYear}-${scenario.id}`}>
                  <td className="text-right py-2 px-3">
                    <span className={cn(
                      revenue > baseline.revenue && "text-green-600 dark:text-green-400",
                      revenue < baseline.revenue && "text-red-600 dark:text-red-400"
                    )}>
                      {formatCurrency(revenue)}
                    </span>
                  </td>
                  <td className="text-right py-2 px-3">
                    <span className={cn(
                      margin > baseline.margin && "text-green-600 dark:text-green-400",
                      margin < baseline.margin && "text-red-600 dark:text-red-400"
                    )}>
                      {formatCurrency(margin)}
                    </span>
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
