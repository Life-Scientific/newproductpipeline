"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import type { BusinessCaseImportRow, BusinessCaseImportRowValidation } from "@/lib/db/types";
import type { SkippedRow } from "@/lib/utils/csv-parser";
import { BusinessCaseImportPreview } from "../BusinessCaseImportPreview";

interface ImportValidateStepProps {
  parsedRows: BusinessCaseImportRow[];
  totalCsvLines: number;
  skippedRows: SkippedRow[];
  validations: BusinessCaseImportRowValidation[];
  validCount: number;
  invalidCount: number;
  onChangeFile: () => void;
}

export function ImportValidateStep({
  parsedRows,
  totalCsvLines,
  skippedRows,
  validations,
  validCount,
  invalidCount,
  onChangeFile,
}: ImportValidateStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            {parsedRows.length} of {totalCsvLines} row
            {totalCsvLines !== 1 ? "s" : ""} ready to validate
          </p>
          <p className="text-sm text-muted-foreground">
            {skippedRows.length > 0
              ? `${skippedRows.length} row${skippedRows.length !== 1 ? "s" : ""} skipped due to parsing errors`
              : "Click Validate to check all rows before importing"}
          </p>
        </div>
        <Button variant="outline" onClick={onChangeFile}>
          Change File
        </Button>
      </div>

      {/* Skipped Rows Section - Show parsing errors */}
      {skippedRows.length > 0 && (
        <div className="border border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/20">
          <div className="p-3 border-b border-amber-300 dark:border-amber-700">
            <p className="font-medium text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {skippedRows.length} Row
              {skippedRows.length !== 1 ? "s" : ""} Skipped (Parsing
              Errors)
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
              These rows could not be parsed. Fix these issues in your CSV
              and re-upload.
            </p>
          </div>
          <div className="max-h-48 overflow-y-auto p-2">
            {skippedRows.map((skipped) => (
              <div
                key={skipped.lineNumber}
                className="text-sm p-2 border-b border-amber-200 dark:border-amber-800 last:border-0"
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs bg-amber-200 dark:bg-amber-800 px-1.5 py-0.5 rounded shrink-0">
                    Line {skipped.lineNumber}
                  </span>
                  <span className="text-amber-800 dark:text-amber-300 font-medium">
                    {skipped.rawData}
                  </span>
                </div>
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 ml-14">
                  {skipped.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {validations.length > 0 ? (
        <BusinessCaseImportPreview validations={validations} />
      ) : parsedRows.length > 0 ? (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>
            No validation results yet. Click Validate to check the data.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <XCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
          <p>
            No valid rows to validate. Fix the parsing errors above and
            re-upload.
          </p>
        </div>
      )}

      {validations.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="font-medium">{validCount} valid</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="font-medium">{invalidCount} invalid</span>
          </div>
        </div>
      )}
    </div>
  );
}
