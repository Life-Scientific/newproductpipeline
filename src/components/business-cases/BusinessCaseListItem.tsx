"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import type { Database } from "@/lib/supabase/database.types";

type BusinessCase = Database["public"]["Views"]["vw_business_case"]["Row"];

interface BusinessCaseListItemProps {
  businessCase: BusinessCase;
}

export function BusinessCaseListItem({ businessCase }: BusinessCaseListItemProps) {
  const router = useRouter();

  const handleNestedClick = (e: React.MouseEvent, href: string) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors gap-4 group">
      <Link
        href={`/business-cases/${businessCase.business_case_id}`}
        className="flex-1 min-w-0 space-y-1 group/link"
      >
        <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
          {businessCase.display_name || businessCase.business_case_name || "—"}
        </p>
        <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
          {businessCase.formulation_id && businessCase.formulation_code ? (
            <>
              <button
                type="button"
                onClick={(e) =>
                  handleNestedClick(
                    e,
                    `/formulations/${businessCase.formulation_id}`
                  )
                }
                className="hover:text-primary hover:underline text-left"
              >
                {businessCase.formulation_code}
              </button>
              <span>•</span>
            </>
          ) : null}
          {businessCase.country_name ? (
            businessCase.country_id ? (
              <button
                type="button"
                onClick={(e) =>
                  handleNestedClick(
                    e,
                    `/business-cases?country=${businessCase.country_id}`
                  )
                }
                className="hover:text-primary hover:underline text-left"
              >
                {businessCase.country_name}
              </button>
            ) : (
              <span>{businessCase.country_name}</span>
            )
          ) : (
            <span>—</span>
          )}
          {businessCase.fiscal_year && (
            <>
              <span>•</span>
              <button
                type="button"
                onClick={(e) =>
                  handleNestedClick(
                    e,
                    `/business-cases?fiscal_year=${encodeURIComponent(
                      businessCase.fiscal_year
                    )}`
                  )
                }
                className="hover:text-primary hover:underline text-left"
              >
                {businessCase.fiscal_year}
              </button>
            </>
          )}
        </div>
      </Link>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-right space-y-0.5">
          <p className="font-semibold text-sm">
            $
            {businessCase.total_revenue
              ? (businessCase.total_revenue / 1000).toFixed(0) + "K"
              : "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            {businessCase.margin_percent !== null &&
            businessCase.margin_percent !== undefined
              ? `${businessCase.margin_percent.toFixed(1)}% margin`
              : "—"}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/business-cases/${businessCase.business_case_id}`}>
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            {businessCase.formulation_id && (
              <DropdownMenuItem asChild>
                <Link href={`/formulations/${businessCase.formulation_id}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Formulation
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

