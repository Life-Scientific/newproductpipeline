"use client";

import { memo, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Formulation, FormulationMetrics } from "./comparison-utils";
import { formatNumber } from "./comparison-utils";

interface ComparisonDataTableProps {
  formulations: Formulation[];
  metricsByFormulation: Record<string, FormulationMetrics>;
  formatCurrency: (value: number) => string;
}

export const ComparisonDataTable = memo(
  ({
    formulations,
    metricsByFormulation,
    formatCurrency,
  }: ComparisonDataTableProps) => {
    const rows = useMemo(
      () => [
        {
          section: "Basic Info",
          label: "Formulation Code",
          render: (f: Formulation) => f.formulation_code || "—",
        },
        {
          section: "Basic Info",
          label: "Product Name",
          render: (f: Formulation) => f.product_name || "—",
        },
        {
          section: "Basic Info",
          label: "Category",
          render: (f: Formulation) => f.product_category || "—",
        },
        {
          section: "Basic Info",
          label: "Formulation Type",
          render: (f: Formulation) => f.formulation_type || "—",
        },
        {
          section: "Basic Info",
          label: "Status",
          render: (f: Formulation) => (
            <Badge variant={f.status === "Selected" ? "default" : "secondary"}>
              {f.status || "—"}
            </Badge>
          ),
        },
        {
          section: "Basic Info",
          label: "UOM",
          render: (f: Formulation) => f.uom || "—",
        },
        {
          section: "Basic Info",
          label: "Short Name",
          render: (f: Formulation) => f.short_name || "—",
        },
        {
          section: "Basic Info",
          label: "Created Date",
          render: (f: Formulation) =>
            f.created_at ? new Date(f.created_at).toLocaleDateString() : "—",
        },
        {
          section: "Basic Info",
          label: "Last Status Change",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const changeDate = metrics?.statusChangeDate;
            return (
              <span className="text-sm">
                {changeDate ? changeDate.toLocaleDateString() : "—"}
              </span>
            );
          },
        },
        {
          section: "Active Ingredients",
          label: "Active Ingredients",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const actives = metrics?.activeIngredients || [];
            return actives.length > 0 ? (
              <div className="space-y-1 text-sm">
                {actives.slice(0, 3).map((active, idx) => (
                  <div key={idx}>
                    {active.name} {active.quantity} {active.unit}
                  </div>
                ))}
                {actives.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{actives.length - 3} more
                  </div>
                )}
              </div>
            ) : (
              "—"
            );
          },
        },
        {
          section: "Financial Metrics",
          label: "Total Revenue",
          isImportant: true,
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            return (
              <span className="font-semibold">
                {formatCurrency(metrics?.totalRevenue || 0)}
              </span>
            );
          },
        },
        {
          section: "Financial Metrics",
          label: "Total Margin",
          isImportant: true,
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            return (
              <span className="font-semibold">
                {formatCurrency(metrics?.totalMargin || 0)}
              </span>
            );
          },
        },
        {
          section: "Financial Metrics",
          label: "Avg Margin %",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const margin = metrics?.avgMarginPercent || 0;
            return (
              <Badge
                variant={
                  margin >= 50
                    ? "default"
                    : margin >= 30
                      ? "secondary"
                      : "outline"
                }
              >
                {margin.toFixed(1)}%
              </Badge>
            );
          },
        },
        {
          section: "Registration & Market Entry",
          label: "Earliest EMD",
          isImportant: true,
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const emd = metrics?.earliestEMD;
            return (
              <span className="text-sm">
                {emd ? emd.toLocaleDateString() : "—"}
              </span>
            );
          },
        },
        {
          section: "Registration & Market Entry",
          label: "Earliest Target Market Entry FY",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            return metrics?.earliestTME || "—";
          },
        },
        {
          section: "Registration & Market Entry",
          label: "Approved Countries",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const approved = metrics?.approvedCountries || 0;
            return (
              <Badge variant={approved > 0 ? "default" : "outline"}>
                {approved}
              </Badge>
            );
          },
        },
        {
          section: "Protection Status",
          label: "Earliest Protection Expiry",
          isImportant: true,
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const expiry = metrics?.earliestProtectionExpiry;
            return expiry ? (
              <div>
                <div className="text-sm">{expiry.toLocaleDateString()}</div>
                <div className="text-xs text-muted-foreground">
                  {expiry > new Date() ? "Protected" : "Expired"}
                </div>
              </div>
            ) : (
              "—"
            );
          },
        },
        {
          section: "Reference Products",
          label: "Reference Products",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const refs = metrics?.referenceProducts || [];
            return refs.length > 0 ? (
              <div className="space-y-1 text-sm">
                {refs.slice(0, 3).map((ref, idx) => (
                  <div key={idx}>{ref}</div>
                ))}
                {refs.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{refs.length - 3} more
                  </div>
                )}
              </div>
            ) : (
              "—"
            );
          },
        },
        {
          section: "Countries",
          label: "Registered Countries",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const countries = metrics?.countriesList || [];
            return countries.length > 0 ? (
              <div className="space-y-1 text-sm">
                {countries.slice(0, 5).map((country, idx) => (
                  <div key={idx}>{country}</div>
                ))}
                {countries.length > 5 && (
                  <div className="text-xs text-muted-foreground">
                    +{countries.length - 5} more
                  </div>
                )}
              </div>
            ) : (
              "—"
            );
          },
        },
        {
          section: "Countries",
          label: "Registration Pathways",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const pathways = metrics?.registrationPathways || [];
            return pathways.length > 0 ? (
              <div className="space-y-1">
                {pathways.map((pathway, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {pathway}
                  </Badge>
                ))}
              </div>
            ) : (
              "—"
            );
          },
        },
        {
          section: "Countries",
          label: "EU Approved Formulations",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const euApproved = metrics?.euApprovedCount || 0;
            return (
              <Badge variant={euApproved > 0 ? "default" : "outline"}>
                {euApproved}
              </Badge>
            );
          },
        },
        {
          section: "Countries",
          label: "Novel Formulations",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const novel = metrics?.novelCount || 0;
            return (
              <Badge variant={novel > 0 ? "default" : "outline"}>{novel}</Badge>
            );
          },
        },
        {
          section: "Crops",
          label: "Target Crops",
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const crops = metrics?.cropsList || [];
            return crops.length > 0 ? (
              <div className="space-y-1 text-sm">
                {crops.slice(0, 5).map((crop, idx) => (
                  <div key={idx}>{crop}</div>
                ))}
                {crops.length > 5 && (
                  <div className="text-xs text-muted-foreground">
                    +{crops.length - 5} more
                  </div>
                )}
              </div>
            ) : (
              "—"
            );
          },
        },
        {
          section: "Business Cases",
          label: "Business Cases by Year",
          isImportant: true,
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const breakdown = metrics?.businessCaseYears || {};
            const sortedYears = Object.keys(breakdown).sort();
            return sortedYears.length > 0 ? (
              <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
                {sortedYears.slice(0, 5).map((year) => (
                  <div key={year} className="border-b pb-1">
                    <div className="font-medium">{year}</div>
                    <div className="text-muted-foreground">
                      {formatCurrency(breakdown[year].revenue)} rev
                    </div>
                    <div className="text-muted-foreground">
                      {breakdown[year].count} case
                      {breakdown[year].count !== 1 ? "s" : ""}
                    </div>
                  </div>
                ))}
                {sortedYears.length > 5 && (
                  <div className="text-xs text-muted-foreground pt-1">
                    +{sortedYears.length - 5} more years
                  </div>
                )}
              </div>
            ) : (
              "—"
            );
          },
        },
        {
          section: "COGS",
          label: "Latest COGS",
          isImportant: true,
          render: (f: Formulation) => {
            const metrics = metricsByFormulation[f.formulation_id || ""];
            const latestCOGS = metrics?.latestCOGS;
            return (
              <span className="font-semibold">
                {latestCOGS ? formatCurrency(latestCOGS) : "—"}
              </span>
            );
          },
        },
      ],
      [metricsByFormulation, formatCurrency],
    );

    return (
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="sticky left-0 bg-background z-10 min-w-[200px]">
                Metric
              </TableHead>
              {formulations.map((formulation) => (
                <TableHead
                  key={formulation.formulation_id}
                  className="text-center min-w-[200px]"
                >
                  <div className="space-y-1">
                    <Link
                      href={`/portfolio/formulations/${formulation.formulation_id}`}
                      className="font-medium hover:underline"
                    >
                      {formulation.formulation_code || formulation.product_name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {formulation.product_name}
                    </p>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={`${row.label}-${idx}`}
                className={row.isImportant ? "bg-muted/30" : ""}
              >
                <TableCell className="font-medium sticky left-0 bg-background z-10">
                  {row.label}
                </TableCell>
                {formulations.map((formulation) => (
                  <TableCell
                    key={`${formulation.formulation_id}-${idx}`}
                    className="text-center"
                  >
                    {row.render(formulation)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
);

ComparisonDataTable.displayName = "ComparisonDataTable";
