"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Database } from "@/lib/supabase/database.types";

type ProtectionStatus = Database["public"]["Views"]["vw_protection_status"]["Row"];
type FormulationCountryUseGroup = Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

interface FormulationRegulatoryProps {
  protectionStatus: ProtectionStatus[];
  useGroups: FormulationCountryUseGroup[];
}

export function FormulationRegulatory({
  protectionStatus,
  useGroups,
}: FormulationRegulatoryProps) {
  const hasData = protectionStatus.length > 0 || useGroups.length > 0;

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Information</CardTitle>
          <CardDescription>Patents, data protections, and registration timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No regulatory data found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regulatory Information</CardTitle>
        <CardDescription>Patents, data protections, and registration timeline</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="protections" className="space-y-4">
          <TabsList>
            <TabsTrigger value="protections">Protections</TabsTrigger>
            <TabsTrigger value="use-groups">Use Groups & Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="protections" className="space-y-4">
            {protectionStatus.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Formulation Patents</TableHead>
                    <TableHead>Formulation Data Protections</TableHead>
                    <TableHead>Ingredient Patents</TableHead>
                    <TableHead>Ingredient Data Protections</TableHead>
                    <TableHead>Earliest Patent Expiry</TableHead>
                    <TableHead>Earliest Data Protection Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {protectionStatus.map((ps) => (
                    <TableRow key={ps.formulation_country_id}>
                      <TableCell className="font-medium">{ps.country_name || "—"}</TableCell>
                      <TableCell>
                        {ps.formulation_patents_count ? (
                          <Badge variant="default">{ps.formulation_patents_count}</Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {ps.formulation_data_protections_count ? (
                          <Badge variant="default">{ps.formulation_data_protections_count}</Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {ps.active_patents_count ? (
                          <Badge variant="secondary">{ps.active_patents_count}</Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {ps.active_data_protections_count ? (
                          <Badge variant="secondary">{ps.active_data_protections_count}</Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {ps.earliest_formulation_patent_expiry || ps.earliest_active_patent_expiry
                          ? new Date(
                              ps.earliest_formulation_patent_expiry ||
                                ps.earliest_active_patent_expiry ||
                                ""
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {ps.earliest_formulation_data_protection_expiry ||
                        ps.earliest_active_data_protection_expiry
                          ? new Date(
                              ps.earliest_formulation_data_protection_expiry ||
                                ps.earliest_active_data_protection_expiry ||
                                ""
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">No protection status data found.</p>
            )}
          </TabsContent>

          <TabsContent value="use-groups" className="space-y-4">
            {useGroups.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Use Group Name</TableHead>
                    <TableHead>Variant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Earliest Submission</TableHead>
                    <TableHead>Earliest Approval</TableHead>
                    <TableHead>Earliest Market Entry</TableHead>
                    <TableHead>Actual Submission</TableHead>
                    <TableHead>Actual Approval</TableHead>
                    <TableHead>Actual Market Entry</TableHead>
                    <TableHead>Reference Product</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {useGroups.map((useGroup) => (
                    <TableRow key={useGroup.formulation_country_use_group_id}>
                      <TableCell className="font-medium">{useGroup.country_name || "—"}</TableCell>
                      <TableCell>{useGroup.use_group_name || "—"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{useGroup.use_group_variant || "—"}</Badge>
                      </TableCell>
                      <TableCell>
                        {useGroup.registration_status ? (
                          <Badge variant="secondary">{useGroup.registration_status}</Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.earliest_submission_date
                          ? new Date(useGroup.earliest_submission_date).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.earliest_approval_date
                          ? new Date(useGroup.earliest_approval_date).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.earliest_market_entry_date
                          ? new Date(useGroup.earliest_market_entry_date).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.actual_submission_date
                          ? new Date(useGroup.actual_submission_date).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.actual_approval_date
                          ? new Date(useGroup.actual_approval_date).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.actual_market_entry_date
                          ? new Date(useGroup.actual_market_entry_date).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {useGroup.reference_product_name || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">No use group data found.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

