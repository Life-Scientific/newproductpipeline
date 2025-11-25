"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Minus, 
  X, 
  ChevronDown, 
  Trash2, 
  Copy,
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  Package,
  Percent,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRENT_FISCAL_YEAR } from "@/lib/constants";
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
    cogsPercent: number;    // e.g., -10 for -10%
    nspPercent: number;     // e.g., +5 for +5%
    volumePercent: number;  // e.g., +20 for +20%
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

const ADJUSTMENT_STEP = 5; // Default step for +/- buttons

export function ScenarioPlanningClient({ businessCases, exchangeRates }: ScenarioPlanningClientProps) {
  const [selectedBusinessCaseIds, setSelectedBusinessCaseIds] = useState<Set<string>>(new Set());
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeTab, setActiveTab] = useState<"table" | "chart">("table");

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const countries = new Map<string, string>(); // country_id -> country_name
    const formulations = new Map<string, string>(); // formulation_id -> display name

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
    });

    return {
      countries: Array.from(countries.entries()).sort((a, b) => a[1].localeCompare(b[1])),
      formulations: Array.from(formulations.entries()).sort((a, b) => a[1].localeCompare(b[1])),
    };
  }, [businessCases]);

  // Selected business cases
  const selectedBusinessCases = useMemo(() => {
    return businessCases.filter((bc) => selectedBusinessCaseIds.has(bc.business_case_group_id));
  }, [businessCases, selectedBusinessCaseIds]);

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

    const aggregateYearData = (cases: BusinessCaseGroupData[], countryId: string, currencyCode: string) => {
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

    const baseline = aggregateYearData(selectedBusinessCases, "", "EUR");
    
    const scenarioTotals = scenarioResults.map(({ scenario, adjustedCases }) => ({
      scenario,
      ...aggregateYearData(adjustedCases, "", "EUR"),
    }));

    return { baseline, scenarioTotals };
  }, [selectedBusinessCases, scenarioResults, exchangeRates]);

  // Helper to toggle business case selection
  const toggleBusinessCase = useCallback((groupId: string) => {
    setSelectedBusinessCaseIds((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
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

  // Format currency
  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    }
    if (Math.abs(value) >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    }
    return `€${value.toFixed(0)}`;
  };

  // Format percentage change
  const formatChange = (baseline: number, scenario: number) => {
    if (baseline === 0) return "—";
    const change = ((scenario - baseline) / Math.abs(baseline)) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Select Business Cases */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Step 1: Select Business Cases
          </CardTitle>
          <CardDescription>
            Choose which business cases to include in your scenario analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessCaseSelector
            businessCases={businessCases}
            selected={selectedBusinessCaseIds}
            onToggle={toggleBusinessCase}
            filterOptions={filterOptions}
          />
          
          {selectedBusinessCases.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              <span className="text-sm text-muted-foreground mr-2">Selected:</span>
              {selectedBusinessCases.map((bc) => (
                <Badge 
                  key={bc.business_case_group_id} 
                  variant="secondary"
                  className="gap-1"
                >
                  {bc.formulation_name} • {bc.country_name}
                  <button
                    onClick={() => toggleBusinessCase(bc.business_case_group_id)}
                    className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedBusinessCaseIds(new Set())}
                className="text-xs"
              >
                Clear all
              </Button>
            </motion.div>
          )}
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
      {selectedBusinessCases.length > 0 && scenarios.length > 0 && aggregatedComparison && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Step 3: Compare Results
            </CardTitle>
            <CardDescription>
              View the impact of your scenarios against the baseline
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

      {/* Empty state */}
      {(selectedBusinessCases.length === 0 || scenarios.length === 0) && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {selectedBusinessCases.length === 0 
                ? "Select at least one business case to begin scenario planning"
                : "Create at least one scenario to see the comparison"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Business Case Selector Component
interface BusinessCaseSelectorProps {
  businessCases: BusinessCaseGroupData[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  filterOptions: {
    countries: [string, string][];
    formulations: [string, string][];
  };
}

function BusinessCaseSelector({ businessCases, selected, onToggle, filterOptions }: BusinessCaseSelectorProps) {
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [formulationFilter, setFormulationFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = useMemo(() => {
    return businessCases.filter((bc) => {
      if (countryFilter && bc.country_id !== countryFilter) return false;
      if (formulationFilter && bc.formulation_id !== formulationFilter) return false;
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matches = 
          bc.formulation_name?.toLowerCase().includes(search) ||
          bc.country_name?.toLowerCase().includes(search) ||
          bc.use_group_name?.toLowerCase().includes(search) ||
          bc.formulation_code?.toLowerCase().includes(search);
        if (!matches) return false;
      }
      return true;
    });
  }, [businessCases, countryFilter, formulationFilter, searchTerm]);

  // Group by country for display
  const groupedByCountry = useMemo(() => {
    const groups = new Map<string, BusinessCaseGroupData[]>();
    filteredCases.forEach((bc) => {
      const key = bc.country_name || "Unknown";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(bc);
    });
    return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filteredCases]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search formulations, countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="h-9 px-3 rounded-md border border-input bg-background text-sm"
        >
          <option value="">All Countries</option>
          {filterOptions.countries.map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <select
          value={formulationFilter}
          onChange={(e) => setFormulationFilter(e.target.value)}
          className="h-9 px-3 rounded-md border border-input bg-background text-sm"
        >
          <option value="">All Formulations</option>
          {filterOptions.formulations.map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>

      {/* Business case list */}
      <div className="max-h-[400px] overflow-y-auto border rounded-lg">
        {groupedByCountry.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No business cases found
          </div>
        ) : (
          groupedByCountry.map(([countryName, cases]) => (
            <div key={countryName} className="border-b last:border-b-0">
              <div className="px-4 py-2 bg-muted/50 font-medium text-sm flex items-center gap-2">
                <span>{countryName}</span>
                <Badge variant="outline" className="text-xs">{cases.length}</Badge>
              </div>
              <div className="divide-y">
                {cases.map((bc) => (
                  <label
                    key={bc.business_case_group_id}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors",
                      selected.has(bc.business_case_group_id) && "bg-primary/5"
                    )}
                  >
                    <Checkbox
                      checked={selected.has(bc.business_case_group_id)}
                      onCheckedChange={() => onToggle(bc.business_case_group_id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {bc.formulation_name}
                        {bc.formulation_code && (
                          <span className="text-muted-foreground ml-1">({bc.formulation_code})</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {bc.use_group_name || bc.use_group_variant || "—"}
                        {bc.target_market_entry && ` • ${bc.target_market_entry}`}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const ids = new Set(filteredCases.map((bc) => bc.business_case_group_id));
            filteredCases.forEach((bc) => onToggle(bc.business_case_group_id));
          }}
        >
          Select All Visible ({filteredCases.length})
        </Button>
      </div>
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
      className="border rounded-lg overflow-hidden"
      style={{ borderLeftColor: scenario.color, borderLeftWidth: 4 }}
    >
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Input
            value={scenario.name}
            onChange={(e) => onUpdateName(e.target.value)}
            className="h-8 font-medium border-none p-0 focus-visible:ring-0 bg-transparent"
            style={{ maxWidth: "70%" }}
          />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onDuplicate}>
              <Copy className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={onRemove}>
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
            color={scenario.color}
          />
          <AdjustmentControl
            label="NSP"
            value={scenario.adjustments.nspPercent}
            onChange={(delta) => onUpdateAdjustment("nspPercent", delta)}
            onSet={(value) => onSetAdjustment("nspPercent", value)}
            icon={<TrendingUp className="h-4 w-4" />}
            color={scenario.color}
          />
          <AdjustmentControl
            label="Volume"
            value={scenario.adjustments.volumePercent}
            onChange={(delta) => onUpdateAdjustment("volumePercent", delta)}
            onSet={(value) => onSetAdjustment("volumePercent", value)}
            icon={<Package className="h-4 w-4" />}
            color={scenario.color}
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
  color: string;
}

function AdjustmentControl({ label, value, onChange, onSet, icon, color }: AdjustmentControlProps) {
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
          className="h-7 w-7"
          onClick={() => onChange(-ADJUSTMENT_STEP)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <div className="flex-1 relative">
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
          className="h-7 w-7"
          onClick={() => onChange(ADJUSTMENT_STEP)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Visual indicator */}
      <div className="w-16 flex items-center justify-end">
        {value !== 0 && (
          <Badge 
            variant={value > 0 ? "default" : "destructive"}
            className="text-xs"
            style={{ backgroundColor: value > 0 ? "#22c55e" : "#ef4444" }}
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
          <tr className="border-b">
            <td className="py-3 px-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                Total Revenue
              </div>
            </td>
            <td className="text-right py-3 px-4 font-medium">{formatCurrency(baseline.totalRevenue)}</td>
            {scenarioTotals.map(({ scenario, totalRevenue }) => (
              <td key={scenario.id} className="text-right py-3 px-4">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{formatCurrency(totalRevenue)}</span>
                  <span className={cn(
                    "text-xs",
                    totalRevenue >= baseline.totalRevenue ? "text-green-600" : "text-red-600"
                  )}>
                    {formatChange(baseline.totalRevenue, totalRevenue)}
                  </span>
                </div>
              </td>
            ))}
          </tr>

          {/* Total Margin */}
          <tr className="border-b">
            <td className="py-3 px-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                Total Gross Margin
              </div>
            </td>
            <td className="text-right py-3 px-4 font-medium">{formatCurrency(baseline.totalMargin)}</td>
            {scenarioTotals.map(({ scenario, totalMargin }) => (
              <td key={scenario.id} className="text-right py-3 px-4">
                <div className="flex flex-col items-end">
                  <span className="font-medium">{formatCurrency(totalMargin)}</span>
                  <span className={cn(
                    "text-xs",
                    totalMargin >= baseline.totalMargin ? "text-green-600" : "text-red-600"
                  )}>
                    {formatChange(baseline.totalMargin, totalMargin)}
                  </span>
                </div>
              </td>
            ))}
          </tr>

          {/* Margin % */}
          <tr>
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
                    "text-xs",
                    marginPercent >= baseline.marginPercent ? "text-green-600" : "text-red-600"
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
            <tr key={fiscalYear} className="border-b">
              <td className="py-2 px-3 font-medium">{fiscalYear}</td>
              <td className="text-right py-2 px-3">{formatCurrency(baseline.revenue)}</td>
              <td className="text-right py-2 px-3">{formatCurrency(baseline.margin)}</td>
              {scenarios.map(({ scenario, revenue, margin }) => (
                <React.Fragment key={`data-${fiscalYear}-${scenario.id}`}>
                  <td className="text-right py-2 px-3">
                    <span className={cn(
                      revenue > baseline.revenue && "text-green-600",
                      revenue < baseline.revenue && "text-red-600"
                    )}>
                      {formatCurrency(revenue)}
                    </span>
                  </td>
                  <td className="text-right py-2 px-3">
                    <span className={cn(
                      margin > baseline.margin && "text-green-600",
                      margin < baseline.margin && "text-red-600"
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

// Need to import React for Fragment
import * as React from "react";

