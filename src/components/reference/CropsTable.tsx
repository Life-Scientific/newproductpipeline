"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { Database } from "@/lib/supabase/database.types";

type Crop = Database["public"]["Tables"]["crops"]["Row"];

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

