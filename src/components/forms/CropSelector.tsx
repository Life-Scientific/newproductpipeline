/**
 * @deprecated This component uses the legacy crops table.
 * Use EPPOCropSelector instead, which uses the EPPO codes system.
 * This component is kept for backward compatibility but should not be used in new code.
 */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus } from "lucide-react";
import { useSupabase } from "@/hooks/use-supabase";
import type { Database } from "@/lib/supabase/database.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Crop = any; // Database["public"]["Tables"]["crops"]["Row"]; // crops table may not exist in current schema

export interface CropInput {
  crop_id: string;
  notes: string;
}

interface CropSelectorProps {
  crops: CropInput[];
  onChange: (crops: CropInput[]) => void;
}

export function CropSelector({ crops, onChange }: CropSelectorProps) {
  const supabase = useSupabase();
  const [availableCrops, setAvailableCrops] = useState<Crop[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCrop, setNewCrop] = useState<CropInput>({
    crop_id: "",
    notes: "",
  });

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    const { data } = await supabase
      .from("crops")
      .select("*")
      .eq("is_active", true)
      .order("crop_name");

    if (data) {
      setAvailableCrops(data);
    }
  };

  const filteredCrops = availableCrops.filter((crop) =>
    crop.crop_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCrop = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!newCrop.crop_id) {
      return;
    }

    // Check if crop already added
    if (crops.some((c) => c.crop_id === newCrop.crop_id)) {
      return;
    }

    onChange([...crops, { ...newCrop }]);
    setNewCrop({
      crop_id: "",
      notes: "",
    });
    setShowAddForm(false);
    setSearchTerm("");
  };

  const handleRemoveCrop = (index: number) => {
    onChange(crops.filter((_, i) => i !== index));
  };

  const handleUpdateCrop = (index: number, field: keyof CropInput, value: string) => {
    const updated = [...crops];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const getCropName = (cropId: string) => {
    return availableCrops.find((c) => c.crop_id === cropId)?.crop_name || "";
  };

  const getCropCategory = (cropId: string) => {
    return availableCrops.find((c) => c.crop_id === cropId)?.crop_category || "";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">
            Crops <span className="text-destructive">*</span>
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Add at least one crop for normal use
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Crop
        </Button>
      </div>

      {showAddForm && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop_search">Search Crop</Label>
              <Input
                id="crop_search"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="crop_select">
                Crop <span className="text-destructive">*</span>
              </Label>
              <Select
                value={newCrop.crop_id}
                onValueChange={(value) =>
                  setNewCrop({ ...newCrop, crop_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCrops.map((crop) => (
                    <SelectItem key={crop.crop_id} value={crop.crop_id}>
                      {crop.crop_name} {crop.crop_category && `(${crop.crop_category})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="crop_notes">Notes (Optional)</Label>
            <Textarea
              id="crop_notes"
              value={newCrop.notes}
              onChange={(e) => setNewCrop({ ...newCrop, notes: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddCrop(e);
              }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {crops.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map((crop, index) => (
                <TableRow key={`${crop.crop_id}-${index}`}>
                  <TableCell className="font-medium">
                    {getCropName(crop.crop_id)}
                  </TableCell>
                  <TableCell>
                    {getCropCategory(crop.crop_id) && (
                      <Badge variant="outline">{getCropCategory(crop.crop_id)}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {crop.notes || "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCrop(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {crops.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
          <p>No crops added yet. Click "Add Crop" to get started.</p>
        </div>
      )}
    </div>
  );
}

