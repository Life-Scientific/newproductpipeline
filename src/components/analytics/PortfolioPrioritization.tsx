"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import type { Database } from "@/lib/supabase/database.types";

type Formulation = Database["public"]["Views"]["vw_formulations_with_ingredients"]["Row"];

interface PortfolioPrioritizationProps {
  formulations: Formulation[];
  businessCases: any[];
  protectionStatus: any[];
}

interface PrioritizationRow {
  formulation: Formulation;
  totalRevenue: number;
  avgMarginPercent: number;
  countriesCount: number;
  earliestProtectionExpiry: Date | null;
  canLaunch: boolean;
  priority: "high" | "medium" | "low";
}

function formatCurrency(value: number | null | undefined): string {
  if (!value || value === 0) return "—";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
}

export function PortfolioPrioritization({
  formulations,
  businessCases,
  protectionStatus,
}: PortfolioPrioritizationProps) {
  // Filter to "Not Yet Considered" products
  const notYetConsidered = formulations.filter((f) => f.status === "Not Yet Considered");

  if (notYetConsidered.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Prioritization</CardTitle>
          <CardDescription>Review products not yet considered for development</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              All formulations have been reviewed. No "Not Yet Considered" products found.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Calculate prioritization metrics for each formulation
  const prioritized: PrioritizationRow[] = notYetConsidered.map((formulation) => {
    // Get business cases for this formulation
    const formBusinessCases = businessCases.filter(
      (bc: any) => bc.formulation_code === formulation.formulation_code
    );

    // Calculate financial metrics
    const totalRevenue = formBusinessCases.reduce((sum, bc) => sum + (bc.total_revenue || 0), 0);
    const totalMargin = formBusinessCases.reduce((sum, bc) => sum + (bc.total_margin || 0), 0);
    const avgMarginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

    // Get protection status
    const formProtection = protectionStatus.filter(
      (ps: any) => ps.formulation_code === formulation.formulation_code
    );

    // Find earliest protection expiry
    const expiries = formProtection
      .flatMap((ps: any) => [
        ps.earliest_active_patent_expiry,
        ps.earliest_formulation_patent_expiry,
      ])
      .filter((exp: any) => exp)
      .map((exp: string) => new Date(exp))
      .sort((a, b) => a.getTime() - b.getTime());

    const earliestProtectionExpiry = expiries.length > 0 ? expiries[0] : null;
    const canLaunch = !earliestProtectionExpiry || earliestProtectionExpiry < new Date();

    // Count countries (would need to fetch separately, using placeholder)
    const countriesCount = 0; // TODO: Fetch from formulation_country

    // Determine priority based on ROI and market potential
    let priority: "high" | "medium" | "low" = "low";
    if (avgMarginPercent >= 40 && totalRevenue >= 1000000) {
      priority = "high";
    } else if (avgMarginPercent >= 30 && totalRevenue >= 500000) {
      priority = "medium";
    }

    return {
      formulation,
      totalRevenue,
      avgMarginPercent,
      countriesCount,
      earliestProtectionExpiry,
      canLaunch,
      priority,
    };
  });

  // Sort by priority (high first), then by revenue
  prioritized.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.totalRevenue - a.totalRevenue;
  });

  const highPriority = prioritized.filter((p) => p.priority === "high");
  const mediumPriority = prioritized.filter((p) => p.priority === "medium");
  const lowPriority = prioritized.filter((p) => p.priority === "low");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Prioritization</CardTitle>
        <CardDescription>
          Review {notYetConsidered.length} "Not Yet Considered" products for potential development
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 border rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">High Priority</div>
            <div className="text-2xl font-bold text-green-600">{highPriority.length}</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Medium Priority</div>
            <div className="text-2xl font-bold text-yellow-600">{mediumPriority.length}</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Low Priority</div>
            <div className="text-2xl font-bold text-gray-600">{lowPriority.length}</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="text-xs font-medium text-muted-foreground">Can Launch</div>
            <div className="text-2xl font-bold text-blue-600">
              {prioritized.filter((p) => p.canLaunch).length}
            </div>
          </div>
        </div>

        {/* Prioritization Matrix Explanation */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Prioritization Logic:</strong> High ROI = Margin ≥40% AND Revenue ≥€1M. Medium ROI = Margin ≥30% AND Revenue ≥€500K.
            Products are sorted by priority, then by total revenue.
          </AlertDescription>
        </Alert>

        {/* Prioritized Table */}
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Priority</TableHead>
                <TableHead className="min-w-[100px]">Code</TableHead>
                <TableHead className="min-w-[200px]">Product Name</TableHead>
                <TableHead className="min-w-[100px]">Category</TableHead>
                <TableHead className="min-w-[120px]">Total Revenue</TableHead>
                <TableHead className="min-w-[100px]">Avg Margin %</TableHead>
                <TableHead className="min-w-[120px]">Protection Status</TableHead>
                <TableHead className="min-w-[100px]">Launch Ready</TableHead>
                <TableHead className="min-w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prioritized.map((row) => (
                <TableRow key={row.formulation.formulation_id}>
                  <TableCell>
                    <Badge
                      variant={
                        row.priority === "high"
                          ? "default"
                          : row.priority === "medium"
                          ? "secondary"
                          : "outline"
                      }
                      className="gap-1"
                    >
                      {row.priority === "high" && <Star className="h-3 w-3 fill-current" />}
                      {row.priority === "high"
                        ? "HIGH"
                        : row.priority === "medium"
                        ? "MEDIUM"
                        : "LOW"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {row.formulation.formulation_code || "—"}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/portfolio/formulations/${row.formulation.formulation_id}`}
                      className="hover:underline"
                    >
                      {row.formulation.product_name}
                    </Link>
                  </TableCell>
                  <TableCell>{row.formulation.product_category}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(row.totalRevenue)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        row.avgMarginPercent >= 50
                          ? "default"
                          : row.avgMarginPercent >= 30
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {row.avgMarginPercent.toFixed(1)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {row.earliestProtectionExpiry ? (
                      <div>
                        <div>{row.earliestProtectionExpiry.toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {row.earliestProtectionExpiry > new Date() ? "Protected" : "Expired"}
                        </div>
                      </div>
                    ) : (
                      "No protections"
                    )}
                  </TableCell>
                  <TableCell>
                    {row.canLaunch ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3 w-3" />
                        Blocked
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/portfolio/formulations/${row.formulation.formulation_id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Recommendations */}
        {highPriority.length > 0 && (
          <Alert>
            <Star className="h-4 w-4" />
            <AlertDescription>
              <strong>Recommendation:</strong> {highPriority.length} product{highPriority.length !== 1 ? "s" : ""} with high ROI potential.
              Consider moving these to "Selected" status for development.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

