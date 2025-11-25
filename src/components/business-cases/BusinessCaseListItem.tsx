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
import { MoreHorizontal, ExternalLink, AlertTriangle } from "lucide-react";
import type { EnrichedBusinessCase } from "@/lib/db/queries";
import { cn } from "@/lib/utils";
import { getStatusVariant } from "@/lib/design-system";

interface BusinessCaseListItemProps {
  businessCase: EnrichedBusinessCase;
  exchangeRates?: Map<string, number>; // country_id -> exchange_rate_to_eur
}

export function BusinessCaseListItem({ businessCase, exchangeRates }: BusinessCaseListItemProps) {
  const router = useRouter();

  const handleNestedClick = (e: React.MouseEvent, href: string) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(href);
  };

  const getMarginColorClass = (margin: number | null | undefined) => {
    if (margin === null || margin === undefined) return "text-muted-foreground";
    if (margin >= 40) return "text-success";
    if (margin >= 20) return "text-info";
    if (margin >= 0) return "text-warning";
    return "text-destructive";
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
          {businessCase.formulation_id && (businessCase.formulation_code || businessCase.formulation_name) ? (
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
                {businessCase.formulation_name && businessCase.formulation_code
                  ? `${businessCase.formulation_name} (${businessCase.formulation_code})`
                  : businessCase.formulation_name || businessCase.formulation_code}
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
                      businessCase.fiscal_year!
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
            {(() => {
              if (!businessCase.total_revenue) return "—";
              
              // Convert to EUR if needed
              let eurValue = businessCase.total_revenue;
              
              // Check if already in EUR (currency_code should be available from BusinessCase view)
              const currencyCode = "currency_code" in businessCase ? (businessCase as any).currency_code : "";
              if (currencyCode && currencyCode.toUpperCase() !== "EUR") {
                // Convert from local currency to EUR
                if (exchangeRates && businessCase.country_id) {
                  const rate = exchangeRates.get(businessCase.country_id);
                  if (rate && rate > 0) {
                    eurValue = businessCase.total_revenue / rate;
                  }
                }
              }
              
              if (eurValue >= 1000000) {
                return `€${(eurValue / 1000000).toFixed(1)}M`;
              }
              if (eurValue >= 1000) {
                return `€${(eurValue / 1000).toFixed(0)}K`;
              }
              return `€${eurValue.toFixed(0)}`;
            })()}
          </p>
          <div className="flex items-center justify-end gap-1">
            {(businessCase.total_margin || 0) < 0 && (
              <span title="Negative margin: COGS exceeds NSP">
                <AlertTriangle className="h-3 w-3 text-destructive" />
              </span>
            )}
            <p className={cn("text-xs font-medium", getMarginColorClass(businessCase.margin_percent))}>
              {businessCase.margin_percent !== null &&
              businessCase.margin_percent !== undefined
                ? `${businessCase.margin_percent.toFixed(1)}% margin`
                : "—"}
            </p>
          </div>
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
