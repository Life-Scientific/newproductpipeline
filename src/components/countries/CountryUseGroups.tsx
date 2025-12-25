"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Database } from "@/lib/supabase/database.types";
import { getStatusVariant } from "@/lib/design-system";

type FormulationCountryUseGroup =
  Database["public"]["Views"]["vw_formulation_country_use_group"]["Row"];

interface CountryUseGroupsProps {
  useGroups: FormulationCountryUseGroup[];
  countryName: string;
}

export function CountryUseGroups({
  useGroups,
  countryName,
}: CountryUseGroupsProps) {
  // Group by status for summary
  const statusCounts = useMemo(() => {
    const counts = new Map<string, number>();
    useGroups.forEach((ug) => {
      const status = ug.use_group_status || "Unknown";
      counts.set(status, (counts.get(status) || 0) + 1);
    });
    return counts;
  }, [useGroups]);

  const columns = useMemo<ColumnDef<FormulationCountryUseGroup>[]>(
    () => [
      {
        accessorKey: "formulation_code",
        header: "Formulation",
        cell: ({ row }) => {
          const code = row.getValue("formulation_code") as string | null;
          const fcId = row.original.formulation_country_id;
          return fcId ? (
            <Link
              href={`/formulation-countries/${fcId}`}
              className="font-medium text-primary hover:underline"
            >
              {code || "—"}
            </Link>
          ) : (
            <span className="text-sm">{code || "—"}</span>
          );
        },
      },
      {
        accessorKey: "use_group_name",
        header: "Use Group",
        cell: ({ row }) => {
          const name = row.getValue("use_group_name") as string | null;
          return <span className="text-sm font-medium">{name || "—"}</span>;
        },
      },
      {
        accessorKey: "use_group_variant",
        header: "Variant",
        cell: ({ row }) => {
          const variant = row.getValue("use_group_variant") as string | null;
          return <span className="text-sm">{variant || "—"}</span>;
        },
      },
      {
        accessorKey: "use_group_status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("use_group_status") as string | null;
          if (!status)
            return <span className="text-sm text-muted-foreground">—</span>;
          return (
            <Badge variant={getStatusVariant(status, "registration")}>
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "reference_product_name",
        header: "Reference Product",
        cell: ({ row }) => {
          const name = row.getValue("reference_product_name") as string | null;
          const manufacturer = row.original.reference_manufacturer;
          return (
            <div>
              <span className="text-sm">{name || "—"}</span>
              {manufacturer && (
                <span className="text-xs text-muted-foreground block">
                  {manufacturer}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "target_market_entry_fy",
        header: "Target FY",
        cell: ({ row }) => {
          const fy = row.getValue("target_market_entry_fy") as string | null;
          return <span className="text-sm">{fy || "—"}</span>;
        },
      },
      {
        accessorKey: "use_group_crops",
        header: "Crops",
        cell: ({ row }) => {
          const crops = row.getValue("use_group_crops") as string | null;
          if (!crops)
            return <span className="text-sm text-muted-foreground">—</span>;
          const cropsArr = crops
            .split(",")
            .map((c) => c.trim())
            .slice(0, 3);
          const hasMore = crops.split(",").length > 3;
          return (
            <div className="flex flex-wrap gap-1">
              {cropsArr.map((crop, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {crop}
                </Badge>
              ))}
              {hasMore && (
                <Badge variant="secondary" className="text-xs">
                  +{crops.split(",").length - 3}
                </Badge>
              )}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <Card>
      <CardHeader className="space-y-1.5">
        <CardTitle>Use Groups in {countryName}</CardTitle>
        <CardDescription>
          {useGroups.length} use group{useGroups.length !== 1 ? "s" : ""} across
          formulations
        </CardDescription>
        {statusCounts.size > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Array.from(statusCounts.entries()).map(([status, count]) => (
              <Badge
                key={status}
                variant={getStatusVariant(status, "registration")}
                className="text-xs"
              >
                {status}: {count}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <EnhancedDataTable
          columns={columns}
          data={useGroups}
          searchKey="formulation_code"
          searchPlaceholder="Search by formulation..."
          pageSize={10}
          showPageSizeSelector={true}
          tableId="country-use-groups"
        />
      </CardContent>
    </Card>
  );
}


