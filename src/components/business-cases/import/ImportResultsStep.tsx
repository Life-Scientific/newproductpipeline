"use client";

import { AlertCircle, XCircle } from "lucide-react";
import type { BusinessCaseImportResult } from "@/lib/db/types";
import type { SkippedRow } from "@/lib/utils/csv-parser";
import { BusinessCaseImportPreview } from "../BusinessCaseImportPreview";

interface ImportResultsStepProps {
  importResult: BusinessCaseImportResult;
  totalCsvLines: number;
  skippedRows: SkippedRow[];
}

export function ImportResultsStep({
  importResult,
  totalCsvLines,
  skippedRows,
}: ImportResultsStepProps) {

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Import Results</h3>

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
            <p className="text-xl font-bold">{importResult.validRows}</p>
          </div>
          {importResult.invalidRows > 0 && (
            <div className="p-3 border rounded-lg bg-orange-50 dark:bg-orange-950/20 border-orange-300 dark:border-orange-700">
              <p className="text-xs text-muted-foreground">Invalid</p>
              <p className="text-xl font-bold text-orange-600">
                {importResult.invalidRows}
              </p>
            </div>
          )}
          <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
            <p className="text-xs text-muted-foreground">Created</p>
            <p className="text-xl font-bold text-green-600">
              {importResult.created}
            </p>
          </div>
          <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
            <p className="text-xs text-muted-foreground">Updated</p>
            <p className="text-xl font-bold text-blue-600">
              {importResult.updated}
            </p>
          </div>
          {importResult.errors > 0 && (
            <div className="p-3 border rounded-lg bg-red-50 dark:bg-red-950/20">
              <p className="text-xs text-muted-foreground">Import Errors</p>
              <p className="text-xl font-bold text-red-600">
                {importResult.errors}
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="p-3 bg-muted rounded-lg text-sm">
          <p className="font-medium mb-1">Summary:</p>
          <p>
            {totalCsvLines} total CSV lines → {skippedRows.length} skipped during parsing → {importResult.totalRows} validated → {importResult.created + importResult.updated} successfully imported ({importResult.created} created, {importResult.updated} updated)
            {importResult.errors > 0 && ` → ${importResult.errors} failed during import`}
          </p>
        </div>
      </div>

      {/* Skipped Rows (Parse Errors) */}
      {skippedRows.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {skippedRows.length} Row{skippedRows.length !== 1 ? "s" : ""} Skipped During Parsing
          </h4>
          <div className="border border-amber-300 dark:border-amber-700 rounded-lg bg-amber-50 dark:bg-amber-950/20 max-h-64 overflow-y-auto">
            <div className="p-2 space-y-1">
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
        </div>
      )}

      {/* Import Errors */}
      {importResult.rowProgress.some((p) => p.status === "error") && (
        <div className="space-y-2">
          <h4 className="font-medium text-destructive flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            {importResult.errors} Row{importResult.errors !== 1 ? "s" : ""} Failed During Import
          </h4>
          <div className="border border-red-300 dark:border-red-700 rounded-lg bg-red-50 dark:bg-red-950/20 p-4 max-h-64 overflow-y-auto space-y-2">
            {importResult.rowProgress
              .filter((p) => p.status === "error")
              .map((p) => {
                const validation = importResult.rowValidations.find(
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
                      {p.message || "Import failed"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Invalid Rows (Validation Failed) */}
      {importResult.invalidRows > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            {importResult.invalidRows} Row{importResult.invalidRows !== 1 ? "s" : ""} Failed Validation
          </h4>
          <p className="text-sm text-muted-foreground">
            These rows passed parsing but failed validation. See details below.
          </p>
        </div>
      )}

      {/* Full Validation Preview */}
      <BusinessCaseImportPreview
        validations={importResult.rowValidations}
      />
    </div>
  );
}
