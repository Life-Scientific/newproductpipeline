"use client";

import { Eye, XCircle } from "lucide-react";
import type { BusinessCaseImportResult } from "@/lib/db/types";
import type { SkippedRow } from "@/lib/utils/csv-parser";
import { BusinessCaseImportPreview } from "../BusinessCaseImportPreview";

interface ImportPreviewStepProps {
  previewResult: BusinessCaseImportResult;
  totalCsvLines: number;
  skippedRows: SkippedRow[];
}

export function ImportPreviewStep({
  previewResult,
  totalCsvLines,
  skippedRows,
}: ImportPreviewStepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-300 dark:border-blue-700 rounded-lg">
          <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-100">
              Import Preview (Dry Run)
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This is a preview - no data has been saved. Review the results below, then click "Proceed with Import" to actually save the data.
            </p>
          </div>
        </div>

        {/* Complete Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 border rounded-lg">
            <p className="text-xs text-muted-foreground">Total CSV Lines</p>
            <p className="text-xl font-bold">{totalCsvLines}</p>
          </div>
          {skippedRows.length > 0 && (
            <div className="p-3 border rounded-lg bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700">
              <p className="text-xs text-muted-foreground">Skipped (Parse)</p>
              <p className="text-xl font-bold text-amber-600">
                {skippedRows.length}
              </p>
            </div>
          )}
          <div className="p-3 border rounded-lg">
            <p className="text-xs text-muted-foreground">Validated</p>
            <p className="text-xl font-bold">{previewResult.validRows}</p>
          </div>
          {previewResult.invalidRows > 0 && (
            <div className="p-3 border rounded-lg bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700">
              <p className="text-xs text-muted-foreground">Invalid</p>
              <p className="text-xl font-bold text-orange-600">
                {previewResult.invalidRows}
              </p>
            </div>
          )}
          <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <p className="text-xs text-muted-foreground">Would Create</p>
            <p className="text-xl font-bold text-green-600">
              {previewResult.created}
            </p>
          </div>
          <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <p className="text-xs text-muted-foreground">Would Update</p>
            <p className="text-xl font-bold text-blue-600">
              {previewResult.updated}
            </p>
          </div>
          {previewResult.errors > 0 && (
            <div className="p-3 border rounded-lg bg-red-50 dark:bg-red-950/20">
              <p className="text-xs text-muted-foreground">Would Error</p>
              <p className="text-xl font-bold text-red-600">
                {previewResult.errors}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="p-3 bg-muted rounded-lg text-sm">
          <p className="font-medium mb-1">Preview Summary:</p>
          <p>
            {totalCsvLines} total CSV lines → {skippedRows.length} skipped during parsing → {previewResult.totalRows} validated → {previewResult.created + previewResult.updated} would be imported ({previewResult.created} would be created, {previewResult.updated} would update existing)
            {previewResult.errors > 0 && ` → ${previewResult.errors} would fail during import`}
          </p>
        </div>
      </div>

      {/* Preview Errors */}
      {previewResult.rowProgress.some((p) => p.status === "error") && (
        <div className="space-y-2">
          <h4 className="font-medium text-destructive flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            {previewResult.errors} Row{previewResult.errors !== 1 ? "s" : ""} Would Fail During Import
          </h4>
          <div className="border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-950/20 p-4 max-h-64 overflow-y-auto space-y-2">
            {previewResult.rowProgress
              .filter((p) => p.status === "error")
              .map((p) => {
                const validation = previewResult.rowValidations.find(
                  (v) => v.rowIndex === p.rowIndex
                );
                return (
                  <div key={p.rowIndex} className="text-sm border-b border-red-200 dark:border-red-800 last:border-0 pb-2 last:pb-0">
                    <div className="flex items-start gap-2">
                      <span className="font-mono text-xs bg-red-200 dark:bg-red-800 px-1.5 py-0.5 rounded shrink-0">
                        Row {p.rowIndex + 1}
                      </span>
                      {validation && (
                        <span className="text-red-800 dark:text-red-300 font-medium">
                          {validation.row.formulation_code} / {validation.row.country_code} / {validation.row.use_group_variant}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-500 mt-1 ml-14">
                      {p.message || "Would fail during import"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Full Validation Preview */}
      <BusinessCaseImportPreview
        validations={previewResult.rowValidations}
      />
    </div>
  );
}
