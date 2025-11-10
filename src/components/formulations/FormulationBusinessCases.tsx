"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface FormulationBusinessCasesProps {
  businessCases: BusinessCase[];
}

const confidenceColors: Record<string, string> = {
  High: "default",
  Medium: "secondary",
  Low: "outline",
};

export function FormulationBusinessCases({ businessCases }: FormulationBusinessCasesProps) {
  if (businessCases.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Cases</CardTitle>
          <CardDescription>Financial projections</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No business cases found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Cases</CardTitle>
        <CardDescription>Financial projections and business case analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Year Offset</TableHead>
              <TableHead>Fiscal Year</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>NSP</TableHead>
              <TableHead>COGS/Unit</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Margin %</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Scenario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessCases.map((bc) => (
              <TableRow key={bc.business_case_id}>
                <TableCell className="font-medium">
                  {bc.display_name || bc.business_case_name || "—"}
                </TableCell>
                <TableCell>{bc.country_name || "—"}</TableCell>
                <TableCell>
                  {bc.label_name ? (
                    <div>
                      <div>{bc.label_name}</div>
                      <div className="text-xs text-muted-foreground">Variant: {bc.label_variant}</div>
                    </div>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell>{bc.year_offset || "—"}</TableCell>
                <TableCell>{bc.fiscal_year || "—"}</TableCell>
                <TableCell>
                  {bc.volume ? bc.volume.toLocaleString() : "—"}
                </TableCell>
                <TableCell>
                  {bc.nsp ? `$${bc.nsp.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell>
                  {bc.cogs_per_unit ? `$${bc.cogs_per_unit.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell className="font-medium">
                  {bc.total_revenue ? `$${bc.total_revenue.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell>
                  {bc.total_margin ? `$${bc.total_margin.toLocaleString()}` : "—"}
                </TableCell>
                <TableCell>
                  {bc.margin_percent !== null && bc.margin_percent !== undefined
                    ? `${bc.margin_percent.toFixed(1)}%`
                    : "—"}
                </TableCell>
                <TableCell>
                  {bc.confidence_level ? (
                    <Badge
                      variant={(confidenceColors[bc.confidence_level] as any) || "outline"}
                    >
                      {bc.confidence_level}
                    </Badge>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {bc.scenario_name || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {businessCases.some((bc) => bc.assumptions) && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold">Assumptions</h4>
            {businessCases
              .filter((bc) => bc.assumptions)
              .map((bc) => (
                <div key={bc.business_case_id} className="text-sm text-muted-foreground">
                  <strong>{bc.display_name || bc.business_case_name}:</strong> {bc.assumptions}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

