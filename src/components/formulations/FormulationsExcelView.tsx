"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";
import type { FormulationWithNestedData } from "@/lib/db/queries";

type FormulationTable = Database["public"]["Tables"]["formulations"]["Row"];

interface FormulationsExcelViewProps {
  formulations: FormulationWithNestedData[];
}

const STATUS_OPTIONS = ["Not Yet Considered", "Selected", "Monitoring", "Killed"];
const PRODUCT_CATEGORIES = [
  "Herbicide",
  "Fungicide",
  "Insecticide",
  "Growth Regulator",
  "Adjuvant",
  "Seed Treatment",
];

const statusColors: Record<string, string> = {
  "Not Yet Considered": "secondary",
  Selected: "default",
  Monitoring: "outline",
  Killed: "destructive",
};

export function FormulationsExcelView({ formulations }: FormulationsExcelViewProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    field: string;
  } | null>(null);
  const [editedData, setEditedData] = useState<Record<string, Partial<FormulationTable>>>({});

  const editableFields = [
    "product_name",
    "short_name",
    "product_category",
    "formulation_type",
    "uom",
    "status",
    "status_rationale",
    "is_active",
  ] as const;

  const handleCellClick = (rowId: string, field: string) => {
    if (editableFields.includes(field as any)) {
      setEditingCell({ rowId, field });
    }
  };

  const handleCellChange = (rowId: string, field: string, value: string | boolean) => {
    setEditedData((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (Object.keys(editedData).length === 0) {
      toast({
        title: "No Changes",
        description: "No changes to save",
      });
      return;
    }

    startTransition(async () => {
      try {
        const { updateFormulation } = await import("@/lib/actions/formulations");
        const updates = Object.entries(editedData).map(async ([formulationId, data]) => {
          const form = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              if (typeof value === "boolean") {
            form.append(key, value.toString());
          } else {
            form.append(key, value.toString());
          }
            }
          });
          return updateFormulation(formulationId, form);
        });

        const results = await Promise.all(updates);
        const errors = results.filter((r) => r.error);

        if (errors.length > 0) {
          toast({
            title: "Error",
            description: `Failed to save ${errors.length} formulation(s)`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: `Successfully updated ${results.length} formulation(s)`,
          });
          setEditedData({});
          setEditingCell(null);
          router.refresh();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    });
  };

  const handleCancel = () => {
    setEditedData({});
    setEditingCell(null);
  };

  const hasChanges = Object.keys(editedData).length > 0;

  const getCellValue = (formulation: FormulationWithNestedData, field: string): string | boolean | number => {
    if (!formulation.formulation_id) return "";
    if (editedData[formulation.formulation_id]?.[field as keyof FormulationTable] !== undefined) {
      const value = editedData[formulation.formulation_id][field as keyof FormulationTable];
      if (field === "is_active") return value as boolean;
      return (value as string) || "";
    }
    if (field === "is_active") return true; // Default from view
    const value = formulation[field as keyof FormulationWithNestedData];
    if (typeof value === "number") return value;
    return (value as string) || "";
  };

  return (
    <div className="space-y-4">
      {hasChanges && (
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg border">
          <span className="text-sm font-medium">
            {Object.keys(editedData).length} formulation(s) have unsaved changes
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel} disabled={isPending}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isPending}>
              <Save className="mr-2 h-4 w-4" />
              {isPending ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted border-b">
                <th className="p-3 text-left text-sm font-semibold border-r sticky left-0 bg-muted z-10 min-w-[120px]">
                  Code
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[100px]">
                  Base Code
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[100px]">
                  Variant
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Product Name
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[150px]">
                  Short Name
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[120px]">
                  Category
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[150px]">
                  Type
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[80px]">
                  UOM
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[150px]">
                  Status
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Status Rationale
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[100px]">
                  Active
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[250px]">
                  Active Ingredients
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[300px]">
                  Full Composition
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[100px]">
                  Max Supply Risk
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Active Signature
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[120px]">
                  Created At
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[120px]">
                  Updated At
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[120px]">
                  Created By
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[80px]">
                  # Countries
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Countries
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[80px]">
                  # Labels
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[250px]">
                  Labels
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[100px]">
                  # Business Cases
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[120px]">
                  Total Revenue
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[120px]">
                  Total Margin
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[80px]">
                  # COGS
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[100px]">
                  Latest COGS
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Reg Statuses
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Protection Status
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[120px]">
                  Earliest EMD
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[100px]">
                  Latest TME FY
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Reference Products
                </th>
                <th className="p-3 text-left text-sm font-semibold border-r min-w-[200px]">
                  Crops
                </th>
                <th className="p-3 text-left text-sm font-semibold min-w-[200px]">
                  Targets
                </th>
              </tr>
            </thead>
            <tbody>
              {formulations.map((formulation) => {
                const isEditing = editingCell?.rowId === formulation.formulation_id;
                const rowHasChanges = !!formulation.formulation_id && !!editedData[formulation.formulation_id];

                return (
                  <tr
                    key={formulation.formulation_id}
                    className={`border-b hover:bg-muted/50 transition-colors ${
                      rowHasChanges ? "bg-yellow-50 dark:bg-yellow-900/10" : ""
                    }`}
                  >
                    <td className="p-3 border-r sticky left-0 bg-background z-10 font-medium">
                      {formulation.formulation_code || "—"}
                    </td>
                    <td className="p-3 border-r text-sm">
                      {formulation.formulation_code?.split("-")[0] || "—"}
                    </td>
                    <td className="p-3 border-r text-sm">
                      {formulation.formulation_code?.split("-")[1] || "—"}
                    </td>
                    <td
                      className="p-3 border-r cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "product_name")}
                    >
                      {isEditing && editingCell?.field === "product_name" ? (
                        <Input
                          value={String(getCellValue(formulation, "product_name"))}
                          onChange={(e) =>
                            formulation.formulation_id && handleCellChange(
                              formulation.formulation_id,
                              "product_name",
                              e.target.value
                            )
                          }
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingCell(null);
                            if (e.key === "Escape") {
                              if (!formulation.formulation_id) return;
                              const id = formulation.formulation_id;
                              setEditedData((prev) => {
                                const newData = { ...prev };
                                delete newData[id]?.product_name;
                                if (Object.keys(newData[id] || {}).length === 0) {
                                  delete newData[id];
                                }
                                return newData;
                              });
                              setEditingCell(null);
                            }
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <span className="block min-h-[32px] flex items-center">
                          {getCellValue(formulation, "product_name") || "—"}
                        </span>
                      )}
                    </td>
                    <td
                      className="p-3 border-r cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "short_name")}
                    >
                      {isEditing && editingCell?.field === "short_name" ? (
                        <Input
                          value={String(getCellValue(formulation, "short_name"))}
                          onChange={(e) =>
                            formulation.formulation_id && handleCellChange(
                              formulation.formulation_id,
                              "short_name",
                              e.target.value
                            )
                          }
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingCell(null);
                            if (e.key === "Escape") {
                              if (!formulation.formulation_id) return;
                              const id = formulation.formulation_id;
                              setEditedData((prev) => {
                                const newData = { ...prev };
                                delete newData[id]?.short_name;
                                if (Object.keys(newData[id] || {}).length === 0) {
                                  delete newData[id];
                                }
                                return newData;
                              });
                              setEditingCell(null);
                            }
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <span className="block min-h-[32px] flex items-center text-muted-foreground">
                          {getCellValue(formulation, "short_name") || "—"}
                        </span>
                      )}
                    </td>
                    <td
                      className="p-3 border-r cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "product_category")}
                    >
                      {isEditing && editingCell?.field === "product_category" ? (
                        <Select
                          value={String(getCellValue(formulation, "product_category"))}
                          onValueChange={(value) =>
                            formulation.formulation_id && handleCellChange(
                              formulation.formulation_id,
                              "product_category",
                              value
                            )
                          }
                          onOpenChange={(open) => !open && setEditingCell(null)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {PRODUCT_CATEGORIES.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="block min-h-[32px] flex items-center">
                          {getCellValue(formulation, "product_category") || "—"}
                        </span>
                      )}
                    </td>
                    <td
                      className="p-3 border-r cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "formulation_type")}
                    >
                      {isEditing && editingCell?.field === "formulation_type" ? (
                        <Input
                          value={String(getCellValue(formulation, "formulation_type"))}
                          onChange={(e) =>
                            formulation.formulation_id && handleCellChange(
                              formulation.formulation_id,
                              "formulation_type",
                              e.target.value
                            )
                          }
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingCell(null);
                            if (e.key === "Escape") {
                              if (!formulation.formulation_id) return;
                              const id = formulation.formulation_id;
                              setEditedData((prev) => {
                                const newData = { ...prev };
                                delete newData[id]?.formulation_type;
                                if (Object.keys(newData[id] || {}).length === 0) {
                                  delete newData[id];
                                }
                                return newData;
                              });
                              setEditingCell(null);
                            }
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <span className="block min-h-[32px] flex items-center">
                          {getCellValue(formulation, "formulation_type") || "—"}
                        </span>
                      )}
                    </td>
                    <td
                      className="p-3 border-r cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "uom")}
                    >
                      {isEditing && editingCell?.field === "uom" ? (
                        <Input
                          value={String(getCellValue(formulation, "uom"))}
                          onChange={(e) =>
                            formulation.formulation_id && handleCellChange(formulation.formulation_id, "uom", e.target.value)
                          }
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") setEditingCell(null);
                            if (e.key === "Escape") {
                              if (!formulation.formulation_id) return;
                              const id = formulation.formulation_id;
                              setEditedData((prev) => {
                                const newData = { ...prev };
                                delete newData[id]?.uom;
                                if (Object.keys(newData[id] || {}).length === 0) {
                                  delete newData[id];
                                }
                                return newData;
                              });
                              setEditingCell(null);
                            }
                          }}
                          autoFocus
                          className="h-8"
                        />
                      ) : (
                        <span className="block min-h-[32px] flex items-center">
                          {getCellValue(formulation, "uom") || "—"}
                        </span>
                      )}
                    </td>
                    <td
                      className="p-3 cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "status")}
                    >
                      {isEditing && editingCell?.field === "status" ? (
                        <Select
                          value={String(getCellValue(formulation, "status"))}
                          onValueChange={(value) =>
                            formulation.formulation_id && handleCellChange(formulation.formulation_id, "status", value)
                          }
                          onOpenChange={(open) => !open && setEditingCell(null)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="block min-h-[32px] flex items-center">
                          <Badge
                            variant={
                              (statusColors[
                                String(getCellValue(formulation, "status")) || "Not Yet Considered"
                              ] as any) || "secondary"
                            }
                          >
                            {getCellValue(formulation, "status") || "Not Yet Considered"}
                          </Badge>
                        </span>
                      )}
                    </td>
                    <td
                      className="p-3 border-r cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "status_rationale")}
                    >
                      {isEditing && editingCell?.field === "status_rationale" ? (
                        <Textarea
                          value={String(getCellValue(formulation, "status_rationale"))}
                          onChange={(e) =>
                            formulation.formulation_id && handleCellChange(
                              formulation.formulation_id,
                              "status_rationale",
                              e.target.value
                            )
                          }
                          onBlur={() => setEditingCell(null)}
                          onKeyDown={(e) => {
                            if (e.key === "Escape") {
                              if (!formulation.formulation_id) return;
                              const id = formulation.formulation_id;
                              setEditedData((prev) => {
                                const newData = { ...prev };
                                delete newData[id]?.status_rationale;
                                if (Object.keys(newData[id] || {}).length === 0) {
                                  delete newData[id];
                                }
                                return newData;
                              });
                              setEditingCell(null);
                            }
                          }}
                          autoFocus
                          className="h-16 min-w-[200px]"
                          rows={2}
                        />
                      ) : (
                        <span className="block min-h-[32px] flex items-center text-xs">
                          {getCellValue(formulation, "status_rationale") || "—"}
                        </span>
                      )}
                    </td>
                    <td
                      className="p-3 border-r cursor-pointer"
                      onClick={() => formulation.formulation_id && handleCellClick(formulation.formulation_id, "is_active")}
                    >
                      {isEditing && editingCell?.field === "is_active" ? (
                        <Switch
                          checked={getCellValue(formulation, "is_active") as boolean}
                          onCheckedChange={(checked) =>
                            formulation.formulation_id && handleCellChange(formulation.formulation_id, "is_active", checked)
                          }
                          onBlur={() => setEditingCell(null)}
                        />
                      ) : (
                        <span className="block min-h-[32px] flex items-center">
                          <Badge variant={(getCellValue(formulation, "is_active") as boolean) ? "default" : "secondary"}>
                            {(getCellValue(formulation, "is_active") as boolean) ? "Yes" : "No"}
                          </Badge>
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.active_ingredients || "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.full_composition || "—"}
                    </td>
                    <td className="p-3 border-r text-xs">
                      {formulation.max_supply_risk_level
                        ? ["Low", "Medium", "High", "Critical"][formulation.max_supply_risk_level - 1] ||
                          "—"
                        : "—"}
                    </td>
                    <td className="p-3 border-r text-xs font-mono text-muted-foreground break-all">
                      {formulation.formulation_id?.slice(0, 8) + "..." || "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.created_at
                        ? new Date(formulation.created_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.updated_at
                        ? new Date(formulation.updated_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">—</td>
                    <td className="p-3 border-r text-center font-medium">
                      {formulation.countries_count || 0}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.countries_list || "—"}
                    </td>
                    <td className="p-3 border-r text-center font-medium">
                      {formulation.labels_count || 0}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.labels_list || "—"}
                    </td>
                    <td className="p-3 border-r text-center font-medium">
                      {formulation.business_cases_count || 0}
                    </td>
                    <td className="p-3 border-r text-xs font-medium">
                      {formulation.total_revenue
                        ? `€${(formulation.total_revenue / 1000).toFixed(0)}K`
                        : "—"}
                    </td>
                    <td className="p-3 border-r text-xs font-medium">
                      {formulation.total_margin
                        ? `€${(formulation.total_margin / 1000).toFixed(0)}K`
                        : "—"}
                    </td>
                    <td className="p-3 border-r text-center">
                      {formulation.cogs_count || 0}
                    </td>
                    <td className="p-3 border-r text-xs">
                      {formulation.latest_cogs ? `€${formulation.latest_cogs.toFixed(2)}` : "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.registration_statuses || "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.protection_status || "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.earliest_emd
                        ? new Date(formulation.earliest_emd).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 border-r text-xs font-medium">
                      {formulation.latest_tme_fy || "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.reference_products || "—"}
                    </td>
                    <td className="p-3 border-r text-xs text-muted-foreground">
                      {formulation.crops_list || "—"}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      {formulation.targets_list || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>💡 Click on any cell to edit. Press Enter to save, Escape to cancel.</p>
        <p>Rows with unsaved changes are highlighted in yellow.</p>
      </div>
    </div>
  );
}

