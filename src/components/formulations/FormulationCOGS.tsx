"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];

function formatCurrency(value: number | null | undefined): string {
  if (!value && value !== 0) return "—";
  return `€${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface FormulationCOGSProps {
  cogs: COGS[];
}

export function FormulationCOGS({ cogs }: FormulationCOGSProps) {
  if (cogs.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>COGS</CardTitle>
          <CardDescription>Cost of goods sold</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No COGS data found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>COGS</CardTitle>
        <CardDescription>Cost of goods sold by fiscal year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Fiscal Year</TableHead>
                <TableHead className="min-w-[120px]">Country</TableHead>
                <TableHead className="w-[120px]">Type</TableHead>
                <TableHead className="w-[120px] text-right">Total COGS</TableHead>
                <TableHead className="w-[120px] text-right">Raw Materials</TableHead>
                <TableHead className="w-[120px] text-right">Manufacturing</TableHead>
                <TableHead className="w-[120px] text-right">Packaging</TableHead>
                <TableHead className="w-[120px] text-right">Other Costs</TableHead>
                <TableHead className="w-[120px]">Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cogs.map((cog) => (
                <TableRow key={cog.cogs_id}>
                  <TableCell>
                    <span className="font-mono font-medium text-sm">{cog.fiscal_year || "—"}</span>
                  </TableCell>
                  <TableCell>
                    {cog.country_name ? (
                      <div>
                        <div className="text-sm font-medium">{cog.country_name}</div>
                        {cog.country_code && (
                          <div className="text-xs text-muted-foreground">{cog.country_code}</div>
                        )}
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs">Global</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {cog.is_country_specific ? (
                      <Badge variant="default" className="text-xs">Country-Specific</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">Global</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-semibold">{formatCurrency(cog.cogs_value)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm">{formatCurrency(cog.raw_material_cost)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm">{formatCurrency(cog.manufacturing_cost)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm">{formatCurrency(cog.packaging_cost)}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm">{formatCurrency(cog.other_costs)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {cog.last_updated_at
                        ? new Date(cog.last_updated_at).toLocaleDateString()
                        : "—"}
                    </span>
                    {cog.last_updated_by && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        by {cog.last_updated_by}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {cogs.some((cog) => cog.notes) && (
          <div className="mt-4 pt-4 border-t space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Notes</h4>
            {cogs
              .filter((cog) => cog.notes)
              .map((cog) => (
                <div key={cog.cogs_id} className="text-sm text-muted-foreground">
                  <strong className="text-foreground">{cog.fiscal_year}:</strong> {cog.notes}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
