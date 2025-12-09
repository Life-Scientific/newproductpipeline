/**
 * @deprecated This component uses the legacy crops table.
 * Use EPPOCodesTable instead, which displays EPPO codes (crops, insects, diseases, weeds).
 * This component is kept for backward compatibility but should not be used in new code.
 */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { Database } from "@/lib/supabase/database.types";

type Crop = any; // Database["public"]["Tables"]["crops"]["Row"]; // crops table may not exist in current schema

const columns: ColumnDef<Crop>[] = [
  {
    accessorKey: "crop_name",
    header: "Crop",
  },
  {
    accessorKey: "crop_category",
    header: "Category",
  },
];

interface CropsTableProps {
  crops: Crop[];
}

export function CropsTable({ crops }: CropsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={crops}
      searchKey="crop_name"
      searchPlaceholder="Search crops..."
    />
  );
}
