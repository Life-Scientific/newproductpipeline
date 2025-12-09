"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BusinessCaseImportRowValidation } from "@/lib/db/types";

interface BusinessCaseImportPreviewProps {
  validations: BusinessCaseImportRowValidation[];
}

export function BusinessCaseImportPreview({
  validations,
}: BusinessCaseImportPreviewProps) {
  if (validations.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-muted-foreground">
        <p>No validation results to display</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-16">Row</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="min-w-[120px]">Formulation</TableHead>
              <TableHead className="min-w-[100px]">Country</TableHead>
              <TableHead className="min-w-[100px]">Use Group</TableHead>
              <TableHead className="min-w-[120px]">Effective FY</TableHead>
              <TableHead className="min-w-[200px]">Errors / Warnings</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {validations.map((validation) => {
              const { rowIndex, row, isValid, errors, warnings, resolved } =
                validation;

              return (
                <TableRow
                  key={rowIndex}
                  className={cn(
                    !isValid && "bg-red-50/50 dark:bg-red-950/20",
                    isValid &&
                      warnings.length > 0 &&
                      "bg-amber-50/50 dark:bg-amber-950/20",
                  )}
                >
                  <TableCell className="font-mono text-sm">
                    {rowIndex + 1}
                  </TableCell>
                  <TableCell>
                    {isValid ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-300 dark:bg-green-950 dark:text-green-300"
                      >
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Valid
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-300 dark:bg-red-950 dark:text-red-300"
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Invalid
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {row.formulation_code}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {row.country_code}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {row.use_group_variant}
                  </TableCell>
                  <TableCell className="text-sm">
                    {row.effective_start_fiscal_year ||
                      resolved?.target_market_entry_fy ||
                      "-"}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {errors.length > 0 && (
                        <div className="space-y-0.5">
                          {errors.map((error, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-red-600 dark:text-red-400 flex items-start gap-1"
                            >
                              <XCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{error}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {warnings.length > 0 && (
                        <div className="space-y-0.5">
                          {warnings.map((warning, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-amber-600 dark:text-amber-400 flex items-start gap-1"
                            >
                              <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                              <span>{warning}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {isValid &&
                        errors.length === 0 &&
                        warnings.length === 0 && (
                          <span className="text-xs text-muted-foreground">
                            No issues
                          </span>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
