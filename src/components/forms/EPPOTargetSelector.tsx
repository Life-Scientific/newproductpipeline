"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, FolderTree, Bug, Leaf as Disease, Sprout } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  searchEPPOCodes,
  addFormulationTarget,
  removeFormulationTarget,
  updateFormulationTarget,
  getFormulationTargets,
} from "@/lib/actions/eppo-codes";

export interface EPPOTargetSelection {
  eppo_code_id: string;
  eppo_code: string;
  display_name: string;
  eppo_type: string;
  classification: string;
  is_parent: boolean;
  include_children: boolean;
  is_excluded: boolean;
  notes: string;
}

interface EPPOTargetSelectorProps {
  formulationId: string;
  onUpdate?: () => void;
}

const classificationIcons = {
  insect: Bug,
  disease: Disease,
  weed: Sprout,
};

const classificationColors = {
  insect: "text-red-600",
  disease: "text-orange-600",
  weed: "text-green-700",
};

const classificationLabels = {
  insect: "Insect",
  disease: "Disease",
  weed: "Weed",
};

export function EPPOTargetSelector({ formulationId, onUpdate }: EPPOTargetSelectorProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [selections, setSelections] = useState<EPPOTargetSelection[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCode, setSelectedCode] = useState<any | null>(null);
  const [newSelection, setNewSelection] = useState({
    include_children: false,
    notes: "",
  });
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadSelections();
  }, [formulationId]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const loadSelections = async () => {
    startTransition(async () => {
      const result = await getFormulationTargets(formulationId);
      if (result.data) {
        setSelections(result.data as EPPOTargetSelection[]);
      }
    });
  };

  const performSearch = async () => {
    const result = await searchEPPOCodes({
      searchTerm,
      classification: ["insect", "disease", "weed"],
      limit: 50,
    });
    if (result.data) {
      setSearchResults(result.data);
    }
  };

  const handleSelectCode = (code: any) => {
    setSelectedCode(code);
    setNewSelection({
      include_children: code.is_parent,
      notes: "",
    });
  };

  const handleAdd = async () => {
    if (!selectedCode) return;

    startTransition(async () => {
      const result = await addFormulationTarget({
        formulationId,
        eppoCodeId: selectedCode.eppo_code_id,
        includeChildren: newSelection.include_children,
        notes: newSelection.notes,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Target added successfully",
        });
        setShowAddForm(false);
        setSelectedCode(null);
        setSearchTerm("");
        setSearchResults([]);
        setNewSelection({ include_children: false, notes: "" });
        await loadSelections();
        if (onUpdate) onUpdate();
      }
    });
  };

  const handleRemove = async (eppoCodeId: string) => {
    startTransition(async () => {
      const result = await removeFormulationTarget({
        formulationId,
        eppoCodeId,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Target removed successfully",
        });
        await loadSelections();
        if (onUpdate) onUpdate();
      }
    });
  };

  const handleToggleExclude = async (selection: EPPOTargetSelection) => {
    startTransition(async () => {
      const result = await updateFormulationTarget({
        formulationId,
        eppoCodeId: selection.eppo_code_id,
        isExcluded: !selection.is_excluded,
        includeChildren: selection.include_children,
        notes: selection.notes,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        await loadSelections();
        if (onUpdate) onUpdate();
      }
    });
  };

  const handleToggleIncludeChildren = async (selection: EPPOTargetSelection) => {
    startTransition(async () => {
      const result = await updateFormulationTarget({
        formulationId,
        eppoCodeId: selection.eppo_code_id,
        isExcluded: selection.is_excluded,
        includeChildren: !selection.include_children,
        notes: selection.notes,
      });

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        await loadSelections();
        if (onUpdate) onUpdate();
      }
    });
  };

  const getClassificationIcon = (classification: string) => {
    const Icon = classificationIcons[classification as keyof typeof classificationIcons] || Bug;
    return Icon;
  };

  const getClassificationColor = (classification: string) => {
    return classificationColors[classification as keyof typeof classificationColors] || "text-gray-600";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">
            EPPO Targets <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Select targets (insects, diseases, weeds) or target groups.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
          disabled={isPending}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Target
        </Button>
      </div>

      {showAddForm && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="target_search">Search EPPO Targets</Label>
            <Input
              id="target_search"
              placeholder="Type target name or EPPO code (min 2 characters)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchResults.length > 0 && (
            <div className="border rounded-lg max-h-64 overflow-y-auto">
              <div className="divide-y">
                {searchResults.map((code) => {
                  const Icon = getClassificationIcon(code.classification);
                  const colorClass = getClassificationColor(code.classification);
                  return (
                    <div
                      key={code.eppo_code_id}
                      className={`p-3 hover:bg-muted cursor-pointer ${
                        selectedCode?.eppo_code_id === code.eppo_code_id
                          ? "bg-primary/10"
                          : ""
                      }`}
                      onClick={() => handleSelectCode(code)}
                    >
                      <div className="flex items-center gap-2">
                        {code.is_parent ? (
                          <FolderTree className="h-4 w-4 text-primary" />
                        ) : (
                          <Icon className={`h-4 w-4 ${colorClass}`} />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{code.display_name}</div>
                          <div className="text-xs text-muted-foreground">
                            {code.eppo_code}
                            {code.latin_name && code.latin_name !== code.display_name && 
                              ` • ${code.latin_name}`
                            }
                          </div>
                        </div>
                        <Badge 
                          variant={code.is_parent ? "secondary" : "outline"}
                          className={!code.is_parent ? colorClass : ""}
                        >
                          {code.is_parent 
                            ? "Group" 
                            : classificationLabels[code.classification as keyof typeof classificationLabels]
                          }
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedCode && (
            <div className="space-y-4 border-t pt-4">
              <div className="bg-primary/5 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="font-medium">{selectedCode.display_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedCode.eppo_code}
                    </div>
                  </div>
                  <Badge variant="outline">
                    {selectedCode.is_parent 
                      ? "Group" 
                      : classificationLabels[selectedCode.classification as keyof typeof classificationLabels]
                    }
                  </Badge>
                </div>
              </div>

              {selectedCode.is_parent && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include_children"
                    checked={newSelection.include_children}
                    onCheckedChange={(checked) =>
                      setNewSelection({ ...newSelection, include_children: !!checked })
                    }
                  />
                  <Label htmlFor="include_children" className="text-sm">
                    Include all children in this group
                  </Label>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="target_notes">Notes (Optional)</Label>
                <Textarea
                  id="target_notes"
                  value={newSelection.notes}
                  onChange={(e) =>
                    setNewSelection({ ...newSelection, notes: e.target.value })
                  }
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedCode(null);
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={handleAdd} disabled={isPending}>
                  Add Target
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {selections.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Target / Group</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>EPPO Code</TableHead>
                <TableHead>Options</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selections.map((selection) => {
                const Icon = getClassificationIcon(selection.classification);
                const colorClass = getClassificationColor(selection.classification);
                return (
                  <TableRow
                    key={selection.eppo_code_id}
                    className={selection.is_excluded ? "opacity-50 bg-red-50 dark:bg-red-950/20" : ""}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {selection.is_parent ? (
                          <FolderTree className="h-4 w-4 text-primary" />
                        ) : (
                          <Icon className={`h-4 w-4 ${colorClass}`} />
                        )}
                        <div>
                          <div className="font-medium">{selection.display_name}</div>
                          {selection.is_excluded && (
                            <Badge variant="destructive" className="mt-1">
                              Excluded
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={colorClass}
                      >
                        {classificationLabels[selection.classification as keyof typeof classificationLabels] || selection.classification}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {selection.eppo_code}
                      </code>
                    </TableCell>
                    <TableCell>
                      {selection.is_parent && (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selection.include_children}
                            onCheckedChange={() => handleToggleIncludeChildren(selection)}
                            disabled={isPending}
                          />
                          <span className="text-sm text-muted-foreground">
                            Include children
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {selection.notes || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleExclude(selection)}
                          disabled={isPending}
                          title={selection.is_excluded ? "Include" : "Exclude"}
                        >
                          {selection.is_excluded ? "✓" : "⊗"}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(selection.eppo_code_id)}
                          disabled={isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {selections.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
          <p>No targets selected yet. Click "Add Target" to get started.</p>
        </div>
      )}
    </div>
  );
}

