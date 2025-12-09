"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ColorPickerProps {
  colorName: string;
  colorValue: string;
  onChange: (value: string) => void;
  label?: string;
}

export function ColorPicker({
  colorName,
  colorValue,
  onChange,
  label,
}: ColorPickerProps) {
  const [value, setValue] = useState(colorValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  // Convert oklch to hex for the color input (approximation)
  const oklchToHex = (oklch: string): string => {
    // This is a simplified conversion - for production, use a proper color library
    // For now, we'll just return a placeholder
    try {
      // Extract values from oklch string like "oklch(0.5 0.2 180)"
      const match = oklch.match(/oklch\(([^)]+)\)/);
      if (match) {
        // Return a default color for the input
        return "#000000";
      }
    } catch {
      // Fallback
    }
    return "#000000";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={colorName} className="text-sm font-medium">
        {label || colorName.replace(/-/g, " ")}
      </Label>
      <div className="flex gap-2">
        <Input
          id={colorName}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="oklch(0.5 0.2 180)"
          className="flex-1"
        />
        <div
          className="w-12 h-10 rounded border border-input"
          style={{ backgroundColor: `oklch(${value})` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Enter oklch color value (e.g., oklch(0.5 0.2 180))
      </p>
    </div>
  );
}
