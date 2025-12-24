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
import { FuzzySearchSelect } from "./FuzzySearchSelect";
import { searchIngredients } from "@/lib/actions/search";
import { log } from "@/lib/logger";

type Ingredient = Database["public"]["Tables"]["ingredients"]["Row"];

export interface IngredientInput {
  ingredient_id: string;
  quantity: string;
  quantity_unit: string;
  ingredient_role: string;
  notes: string;
}

interface IngredientSelectorProps {
  ingredients: IngredientInput[];
  onChange: (ingredients: IngredientInput[]) => void;
  availableIngredients?: Ingredient[];
  onAvailableIngredientsChange?: (ingredients: Ingredient[]) => void;
}

const INGREDIENT_ROLES = [
  "Active",
  "Safener",
  "Adjuvant",
  "Solvent",
  "Surfactant",
  "Other",
];

const QUANTITY_UNITS = ["g/L", "kg/L", "mL/L", "%", "g/kg", "kg/kg"];

export function IngredientSelector({
  ingredients,
  onChange,
  availableIngredients: propAvailableIngredients,
  onAvailableIngredientsChange,
}: IngredientSelectorProps) {
  const supabase = useSupabase();
  const [internalAvailableIngredients, setInternalAvailableIngredients] =
    useState<Ingredient[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngredient, setNewIngredient] = useState<IngredientInput>({
    ingredient_id: "",
    quantity: "",
    quantity_unit: "g/L",
    ingredient_role: "Active",
    notes: "",
  });
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  // Use prop if provided, otherwise use internal state
  const availableIngredients =
    propAvailableIngredients || internalAvailableIngredients;
  const setAvailableIngredients =
    onAvailableIngredientsChange || setInternalAvailableIngredients;

  useEffect(() => {
    if (!propAvailableIngredients) {
      loadIngredients();
    }
  }, [propAvailableIngredients]);

  const loadIngredients = async () => {
    const { data } = await supabase
      .from("ingredients")
      .select("*")
      .eq("is_active", true)
      .order("ingredient_name");

    if (data) {
      setAvailableIngredients(data);
    }
  };

  // Load selected ingredient data when ingredient_id changes
  useEffect(() => {
    if (newIngredient.ingredient_id) {
      // First try to find in available ingredients
      const ingredient = availableIngredients.find(
        (ing) => ing.ingredient_id === newIngredient.ingredient_id,
      );
      if (ingredient) {
        setSelectedIngredient(ingredient);
      } else {
        // If not found, fetch it using search (this will be cached by FuzzySearchSelect)
        // We'll let FuzzySearchSelect handle the loading via selectedItem prop
        setSelectedIngredient(null);
      }
    } else {
      setSelectedIngredient(null);
    }
  }, [newIngredient.ingredient_id, availableIngredients]);

  const handleAddIngredient = (e?: React.MouseEvent) => {
    // Prevent form submission if button is inside a form
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Ensure ingredient_role has a default value if not set
    const ingredientToAdd = {
      ...newIngredient,
      ingredient_role: newIngredient.ingredient_role || "Active",
    };

    if (
      !ingredientToAdd.ingredient_id ||
      !ingredientToAdd.quantity ||
      !ingredientToAdd.quantity_unit ||
      !ingredientToAdd.ingredient_role
    ) {
      log("Validation failed:", {
        ingredient_id: ingredientToAdd.ingredient_id,
        quantity: ingredientToAdd.quantity,
        quantity_unit: ingredientToAdd.quantity_unit,
        ingredient_role: ingredientToAdd.ingredient_role,
      });
      return;
    }

    // Check if ingredient already added
    if (
      ingredients.some(
        (ing) => ing.ingredient_id === ingredientToAdd.ingredient_id,
      )
    ) {
      return;
    }

    onChange([...ingredients, ingredientToAdd]);
    setNewIngredient({
      ingredient_id: "",
      quantity: "",
      quantity_unit: "g/L",
      ingredient_role: "Active",
      notes: "",
    });
    setSelectedIngredient(null);
    setShowAddForm(false);
  };

  const handleRemoveIngredient = (index: number) => {
    onChange(ingredients.filter((_, i) => i !== index));
  };

  const handleUpdateIngredient = (
    index: number,
    field: keyof IngredientInput,
    value: string,
  ) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const getIngredientName = (ingredientId: string) => {
    return (
      availableIngredients.find((ing) => ing.ingredient_id === ingredientId)
        ?.ingredient_name || ""
    );
  };

  const getIngredientType = (ingredientId: string) => {
    return (
      availableIngredients.find((ing) => ing.ingredient_id === ingredientId)
        ?.ingredient_type || ""
    );
  };

  const hasActiveIngredients = ingredients.some(
    (ing) => getIngredientType(ing.ingredient_id) === "Active",
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-semibold">Ingredients</Label>
          <p className="text-xs text-muted-foreground mt-1">
            Add at least one active ingredient to generate formulation code
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Ingredient
        </Button>
      </div>

      {showAddForm && (
        <div className="border rounded-lg p-4 space-y-4 bg-muted/50">
          <div className="space-y-2">
            <Label htmlFor="ingredient_select">
              Ingredient <span className="text-destructive">*</span>
            </Label>
            <FuzzySearchSelect
              value={newIngredient.ingredient_id}
              onValueChange={(value) =>
                setNewIngredient({ ...newIngredient, ingredient_id: value })
              }
              searchFunction={(search) =>
                searchIngredients({ search, limit: 100 })
              }
              getOptionValue={(item) => item.ingredient_id}
              getOptionLabel={(item) => item.ingredient_name || ""}
              getOptionSubtitle={(item) => {
                const parts: string[] = [];
                if (item.ingredient_type) parts.push(item.ingredient_type);
                if (item.cas_number) parts.push(`CAS: ${item.cas_number}`);
                return parts.length > 0 ? parts.join(" • ") : undefined;
              }}
              placeholder="Search ingredients..."
              searchPlaceholder="Type ingredient name or CAS number..."
              emptyText="No ingredients found. Try a different search term."
              selectedItem={selectedIngredient}
              preloadAll={false}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">
                Quantity <span className="text-destructive">*</span>
              </Label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                value={newIngredient.quantity}
                onChange={(e) =>
                  setNewIngredient({
                    ...newIngredient,
                    quantity: e.target.value,
                  })
                }
                placeholder="200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity_unit">
                Unit <span className="text-destructive">*</span>
              </Label>
              <Select
                value={newIngredient.quantity_unit}
                onValueChange={(value) =>
                  setNewIngredient({ ...newIngredient, quantity_unit: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {QUANTITY_UNITS.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ingredient_role">
                Role <span className="text-destructive">*</span>
              </Label>
              <Select
                value={newIngredient.ingredient_role}
                onValueChange={(value) =>
                  setNewIngredient({ ...newIngredient, ingredient_role: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {INGREDIENT_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredient_notes">Notes (Optional)</Label>
            <Textarea
              id="ingredient_notes"
              value={newIngredient.notes}
              onChange={(e) =>
                setNewIngredient({ ...newIngredient, notes: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                log("Add button clicked", newIngredient);
                handleAddIngredient(e);
              }}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {ingredients.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ing, index) => (
                <TableRow key={`${ing.ingredient_id}-${index}`}>
                  <TableCell className="font-medium">
                    {getIngredientName(ing.ingredient_id)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getIngredientType(ing.ingredient_id)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {ing.quantity} {ing.quantity_unit}
                  </TableCell>
                  <TableCell>{ing.ingredient_role}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {ing.notes || "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveIngredient(index)}
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

      {!hasActiveIngredients && ingredients.length > 0 && (
        <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ No active ingredients added. Formulation code will not be
            generated until at least one active ingredient is added.
          </p>
        </div>
      )}

      {ingredients.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
          <p>
            No ingredients added yet. Click "Add Ingredient" to get started.
          </p>
        </div>
      )}
    </div>
  );
}
