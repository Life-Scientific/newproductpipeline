"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Database } from "@/lib/supabase/database.types";

type ProtectionStatus =
  Database["public"]["Views"]["vw_patent_protection_status"]["Row"];
type FormulationCountryUseGroup =
  Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

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
          <CardDescription>Patents and registration timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No regulatory data found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regulatory Information</CardTitle>
        <CardDescription>Patents and registration timeline</CardDescription>
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
                    <TableHead>Ingredient Patents</TableHead>
                    <TableHead>Combination Patents</TableHead>
                    <TableHead>Formulation Patents</TableHead>
                    <TableHead>Use Patents</TableHead>
                    <TableHead>Blocking Patents</TableHead>
                    <TableHead>Earliest Patent Expiry</TableHead>
                    <TableHead>Earliest Estimated Launch Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {protectionStatus.map((ps) => (
                    <TableRow key={ps.formulation_country_id}>
                      <TableCell className="font-medium">
                        {ps.country_name || "—"}
                      </TableCell>
                      <TableCell>
                        {ps.ingredient_patents_count ? (
                          <Badge variant="secondary">
                            {ps.ingredient_patents_count}
                          </Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {ps.combination_patents_count ? (
                          <Badge variant="default">
                            {ps.combination_patents_count}
                          </Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {ps.formulation_patents_count ? (
                          <Badge variant="default">
                            {ps.formulation_patents_count}
                          </Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {ps.use_patents_count ? (
                          <Badge variant="outline">
                            {ps.use_patents_count}
                          </Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell>
                        {ps.blocking_patents_count ? (
                          <Badge variant="destructive">
                            {ps.blocking_patents_count}
                          </Badge>
                        ) : (
                          "0"
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {ps.earliest_ingredient_patent_expiry ||
                        ps.earliest_combination_patent_expiry ||
                        ps.earliest_formulation_patent_expiry ||
                        ps.earliest_use_patent_expiry
                          ? new Date(
                              ps.earliest_ingredient_patent_expiry ||
                                ps.earliest_combination_patent_expiry ||
                                ps.earliest_formulation_patent_expiry ||
                                ps.earliest_use_patent_expiry ||
                                "",
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {ps.earliest_estimated_launch_date
                          ? new Date(
                              ps.earliest_estimated_launch_date,
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                No protection status data found.
              </p>
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
                    <TableHead>Use Group Status</TableHead>
                    <TableHead>Earliest Submission</TableHead>
                    <TableHead>Earliest Approval</TableHead>
                    <TableHead>Actual Submission</TableHead>
                    <TableHead>Actual Approval</TableHead>
                    <TableHead>Reference Product</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {useGroups.map((useGroup) => (
                    <TableRow key={useGroup.formulation_country_use_group_id}>
                      <TableCell className="font-medium">
                        {useGroup.country_name || "—"}
                      </TableCell>
                      <TableCell className="font-medium">
                        {useGroup.use_group_name ||
                          useGroup.use_group_variant ||
                          "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {useGroup.use_group_variant || "—"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {useGroup.use_group_status ? (
                          <Badge variant="secondary">
                            {useGroup.use_group_status}
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.earliest_planned_submission_date
                          ? new Date(
                              useGroup.earliest_planned_submission_date,
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.earliest_planned_approval_date
                          ? new Date(
                              useGroup.earliest_planned_approval_date,
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.earliest_actual_submission_date
                          ? new Date(
                              useGroup.earliest_actual_submission_date,
                            ).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {useGroup.earliest_actual_approval_date
                          ? new Date(
                              useGroup.earliest_actual_approval_date,
                            ).toLocaleDateString()
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
              <p className="text-sm text-muted-foreground">
                No use groups found. Use groups are created when registering
                this formulation in a country for specific crops/pests.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
