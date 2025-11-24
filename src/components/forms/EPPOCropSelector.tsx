"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, FolderTree, Leaf, ChevronRight, ChevronDown } from "lucide-react";
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
  addFormulationCrop,
  removeFormulationCrop,
  updateFormulationCrop,
  getFormulationCrops,
  getEPPOCodeChildren,
} from "@/lib/actions/eppo-codes";

export interface EPPOCropSelection {
  eppo_code_id: string;
  eppo_code: string;
  display_name: string;
  eppo_type: string;
  is_parent: boolean;
  include_children: boolean;
  is_excluded: boolean;
  notes: string;
}

interface EPPOCropSelectorProps {
  formulationId: string;
  onUpdate?: () => void;
}

export function EPPOCropSelector({ formulationId, onUpdate }: EPPOCropSelectorProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [selections, setSelections] = useState<EPPOCropSelection[]>([]);
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
      const result = await getFormulationCrops(formulationId);
      if (result.data) {
        setSelections(result.data as EPPOCropSelection[]);
      }
    });
  };

  const performSearch = async () => {
    const result = await searchEPPOCodes({
      search: searchTerm,
      classification: "crop",
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
      const result = await addFormulationCrop({
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
          description: "Crop added successfully",
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
      const result = await removeFormulationCrop(formulationId, eppoCodeId);

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Crop removed successfully",
        });
        await loadSelections();
        if (onUpdate) onUpdate();
      }
    });
  };

  const handleToggleExclude = async (selection: EPPOCropSelection) => {
    startTransition(async () => {
      const result = await updateFormulationCrop({
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

  const handleToggleIncludeChildren = async (selection: EPPOCropSelection) => {
    startTransition(async () => {
      const result = await updateFormulationCrop({
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

  const toggleGroupExpansion = (eppoCodeId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(eppoCodeId)) {
      newExpanded.delete(eppoCodeId);
    } else {
      newExpanded.add(eppoCodeId);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">
            EPPO Crops <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Select crops or crop groups. Groups can include all children automatically.
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
          Add Crop
        </Button>
      </div>

      {showAddForm && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="crop_search">Search EPPO Crops</Label>
            <Input
              id="crop_search"
              placeholder="Type crop name or EPPO code (min 2 characters)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchResults.length > 0 && (
            <div className="border rounded-lg max-h-64 overflow-y-auto">
              <div className="divide-y">
                {searchResults.map((code) => (
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
                        <Leaf className="h-4 w-4 text-green-600" />
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
                      {code.is_parent && (
                        <Badge variant="secondary">Group</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCode && (
            <div className="space-y-4 border-t pt-4">
              <div className="bg-primary/5 rounded-lg p-3">
                <div className="font-medium">{selectedCode.display_name}</div>
                <div className="text-sm text-muted-foreground">
                  {selectedCode.eppo_code}
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
                <Label htmlFor="crop_notes">Notes (Optional)</Label>
                <Textarea
                  id="crop_notes"
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
                  Add Crop
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
                <TableHead>Crop / Group</TableHead>
                <TableHead>EPPO Code</TableHead>
                <TableHead>Options</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selections.map((selection) => (
                <TableRow
                  key={selection.eppo_code_id}
                  className={selection.is_excluded ? "opacity-50 bg-red-50 dark:bg-red-950/20" : ""}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {selection.is_parent ? (
                        <FolderTree className="h-4 w-4 text-primary" />
                      ) : (
                        <Leaf className="h-4 w-4 text-green-600" />
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
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selections.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
          <p>No crops selected yet. Click "Add Crop" to get started.</p>
        </div>
      )}
    </div>
  );
}

