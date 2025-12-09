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
import {
  MoreHorizontal,
  ExternalLink,
  AlertTriangle,
  Beaker,
  Globe,
  FileText,
  ChevronRight,
} from "lucide-react";
import type { EnrichedBusinessCase } from "@/lib/db/queries";
import { cn } from "@/lib/utils";
import { getStatusVariant } from "@/lib/design-system";
import { useDisplayPreferences } from "@/hooks/use-display-preferences";

interface BusinessCaseListItemProps {
  businessCase: EnrichedBusinessCase;
  exchangeRates?: Map<string, number>; // country_id -> exchange_rate_to_eur
}

export function BusinessCaseListItem({
  businessCase,
  exchangeRates,
}: BusinessCaseListItemProps) {
  const router = useRouter();
  const { formatCurrencyCompact } = useDisplayPreferences();

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

  // Prefer group ID for linking, fall back to individual ID
  const linkId =
    "business_case_group_id" in businessCase &&
    businessCase.business_case_group_id
      ? businessCase.business_case_group_id
      : businessCase.business_case_id;

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 hover:border-primary/20 hover:shadow-sm transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] gap-4 group">
      <Link
        href={
          linkId
            ? `/portfolio/business-cases/${linkId}`
            : "/portfolio/business-cases"
        }
        className="flex-1 min-w-0 space-y-1 group/link"
      >
        <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
          {businessCase.display_name || businessCase.business_case_name || "—"}
        </p>
        <div className="text-xs text-muted-foreground flex items-center gap-1.5 flex-wrap">
          {/* Visual hierarchy: Formulation → Country → Use Group */}
          {businessCase.formulation_id &&
          (businessCase.formulation_code || businessCase.formulation_name) ? (
            <>
              <button
                type="button"
                onClick={(e) =>
                  handleNestedClick(
                    e,
                    `/portfolio/formulations/${businessCase.formulation_id}`,
                  )
                }
                className="flex items-center gap-1 hover:text-primary hover:underline text-left"
              >
                <Beaker className="h-3 w-3" />
                <span>
                  {businessCase.formulation_name &&
                  businessCase.formulation_code
                    ? `${businessCase.formulation_name} (${businessCase.formulation_code})`
                    : businessCase.formulation_name ||
                      businessCase.formulation_code}
                </span>
              </button>
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            </>
          ) : null}
          {businessCase.country_name ? (
            businessCase.country_id ? (
              <>
                <button
                  type="button"
                  onClick={(e) =>
                    handleNestedClick(
                      e,
                      `/portfolio/business-cases?country=${businessCase.country_id}`,
                    )
                  }
                  className="flex items-center gap-1 hover:text-primary hover:underline text-left"
                >
                  <Globe className="h-3 w-3" />
                  <span>{businessCase.country_name}</span>
                </button>
                {businessCase.use_group_name && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span>{businessCase.country_name}</span>
                </div>
                {businessCase.use_group_name && (
                  <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                )}
              </>
            )
          ) : null}
          {businessCase.use_group_name && (
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>{businessCase.use_group_name}</span>
            </div>
          )}
          {businessCase.fiscal_year && (
            <>
              <span className="text-muted-foreground/50">•</span>
              <button
                type="button"
                onClick={(e) =>
                  handleNestedClick(
                    e,
                    `/portfolio/business-cases?fiscal_year=${encodeURIComponent(
                      businessCase.fiscal_year!,
                    )}`,
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
            {formatCurrencyCompact(businessCase.total_revenue)}
          </p>
          <div className="flex items-center justify-end gap-1">
            {(businessCase.total_margin || 0) < 0 && (
              <span title="Negative margin: COGS exceeds NSP">
                <AlertTriangle className="h-3 w-3 text-destructive" />
              </span>
            )}
            <p
              className={cn(
                "text-xs font-medium",
                getMarginColorClass(businessCase.margin_percent),
              )}
            >
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
              <Link
                href={
                  linkId
                    ? `/portfolio/business-cases/${linkId}`
                    : "/portfolio/business-cases"
                }
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            {businessCase.formulation_id && (
              <DropdownMenuItem asChild>
                <Link
                  href={`/portfolio/formulations/${businessCase.formulation_id}`}
                >
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
