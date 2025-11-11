"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface FormulationBusinessCasesProps {
  businessCases: BusinessCase[];
}


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
              <TableHead>Formulation</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Use Group</TableHead>
              <TableHead>Year Offset</TableHead>
              <TableHead>Fiscal Year</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>NSP</TableHead>
              <TableHead>COGS/Unit</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Margin %</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {businessCases.map((bc) => {
              // Determine most recent update
              const updates = [
                { field: "Volume", by: bc.volume_last_updated_by, at: bc.volume_last_updated_at },
                { field: "NSP", by: bc.nsp_last_updated_by, at: bc.nsp_last_updated_at },
                { field: "COGS", by: bc.cogs_last_updated_by, at: bc.cogs_last_updated_at },
              ].filter((u) => u.at);

              const mostRecentUpdate = updates.sort((a, b) => 
                new Date(b.at!).getTime() - new Date(a.at!).getTime()
              )[0];

              return (
                <TableRow key={bc.business_case_id}>
                  <TableCell className="font-medium">
                    {bc.formulation_name || "—"}
                  </TableCell>
                  <TableCell>{bc.country_name || "—"}</TableCell>
                  <TableCell>
                    {bc.use_group_name || "—"}
                  </TableCell>
                  <TableCell>{bc.year_offset || "—"}</TableCell>
                  <TableCell>{bc.fiscal_year || "—"}</TableCell>
                  <TableCell>
                    {bc.volume ? bc.volume.toLocaleString() : "—"}
                    {bc.volume_last_updated_by && (
                      <div className="text-xs text-muted-foreground">
                        by {bc.volume_last_updated_by}
                        {bc.volume_last_updated_at && (
                          <span> • {new Date(bc.volume_last_updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {bc.nsp ? `$${bc.nsp.toLocaleString()}` : "—"}
                    {bc.nsp_last_updated_by && (
                      <div className="text-xs text-muted-foreground">
                        by {bc.nsp_last_updated_by}
                        {bc.nsp_last_updated_at && (
                          <span> • {new Date(bc.nsp_last_updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {bc.cogs_per_unit ? `$${bc.cogs_per_unit.toLocaleString()}` : "—"}
                    {bc.cogs_last_updated_by && (
                      <div className="text-xs text-muted-foreground">
                        by {bc.cogs_last_updated_by}
                        {bc.cogs_last_updated_at && (
                          <span> • {new Date(bc.cogs_last_updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    )}
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
                  <TableCell className="text-xs text-muted-foreground">
                    {mostRecentUpdate ? (
                      <div>
                        <div>{mostRecentUpdate.field}</div>
                        <div>by {mostRecentUpdate.by}</div>
                        <div>{new Date(mostRecentUpdate.at!).toLocaleDateString()}</div>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {businessCases.some((bc) => bc.assumptions) && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold">Assumptions</h4>
            {businessCases
              .filter((bc) => bc.assumptions)
              .map((bc) => (
                <div key={bc.business_case_id} className="text-sm text-muted-foreground">
                  <strong>{bc.formulation_name || bc.business_case_name}:</strong> {bc.assumptions}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

