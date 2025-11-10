"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Database } from "@/lib/supabase/database.types";

type COGS = Database["public"]["Views"]["vw_cogs"]["Row"];

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fiscal Year</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Total COGS</TableHead>
              <TableHead>Raw Materials</TableHead>
              <TableHead>Manufacturing</TableHead>
              <TableHead>Packaging</TableHead>
              <TableHead>Other Costs</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cogs.map((cog) => (
              <TableRow key={cog.cogs_id}>
                <TableCell className="font-medium">{cog.fiscal_year || "—"}</TableCell>
                <TableCell>
                  {cog.country_name ? (
                    <div>
                      <div>{cog.country_name}</div>
                      <div className="text-xs text-muted-foreground">{cog.country_code}</div>
                    </div>
                  ) : (
                    <Badge variant="outline">Global</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {cog.is_country_specific ? (
                    <Badge variant="default">Country-Specific</Badge>
                  ) : (
                    <Badge variant="secondary">Global</Badge>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  ${cog.cogs_value?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "—"}
                </TableCell>
                <TableCell>
                  {cog.raw_material_cost
                    ? `$${cog.raw_material_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "—"}
                </TableCell>
                <TableCell>
                  {cog.manufacturing_cost
                    ? `$${cog.manufacturing_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "—"}
                </TableCell>
                <TableCell>
                  {cog.packaging_cost
                    ? `$${cog.packaging_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "—"}
                </TableCell>
                <TableCell>
                  {cog.other_costs
                    ? `$${cog.other_costs.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : "—"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {cog.last_updated_at
                    ? new Date(cog.last_updated_at).toLocaleDateString()
                    : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {cogs.some((cog) => cog.notes) && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold">Notes</h4>
            {cogs
              .filter((cog) => cog.notes)
              .map((cog) => (
                <div key={cog.cogs_id} className="text-sm text-muted-foreground">
                  <strong>{cog.fiscal_year}:</strong> {cog.notes}
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

