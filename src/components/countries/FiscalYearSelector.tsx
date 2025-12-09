"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FiscalYearSelectorProps {
  selectedFY: number;
  onFYChange: (fy: number) => void;
  minFY?: number;
  maxFY?: number;
  className?: string;
}

/**
 * Fiscal Year Selector Component
 * Displays a dropdown to select a fiscal year (defaults to FY30)
 */
export function FiscalYearSelector({
  selectedFY,
  onFYChange,
  minFY = 26,
  maxFY = 35,
  className,
}: FiscalYearSelectorProps) {
  const yearOptions = Array.from(
    { length: maxFY - minFY + 1 },
    (_, i) => minFY + i,
  );

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Label htmlFor="fiscal-year-select" className="text-sm font-medium">
          Fiscal Year:
        </Label>
        <Select
          value={selectedFY.toString()}
          onValueChange={(value) => onFYChange(parseInt(value, 10))}
        >
          <SelectTrigger id="fiscal-year-select" className="w-24 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                FY{year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
