"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Download, Loader2, Eye, Play } from "lucide-react";
import {
  validateBusinessCaseImport,
  importBusinessCases,
  previewBusinessCaseImport,
  generateBusinessCaseImportTemplate,
} from "@/lib/actions/business-cases";
import type {
  BusinessCaseImportRow,
  BusinessCaseImportRowValidation,
  BusinessCaseImportResult,
} from "@/lib/db/types";
import { parseBusinessCaseCSV, type SkippedRow, type ParseResult } from "@/lib/utils/csv-parser";
import { ImportUploadStep } from "./import/ImportUploadStep";
import { ImportValidateStep } from "./import/ImportValidateStep";
import { ImportPreviewStep } from "./import/ImportPreviewStep";
import { ImportLoadingStep } from "./import/ImportLoadingStep";
import { ImportResultsStep } from "./import/ImportResultsStep";

interface BusinessCaseImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type ImportStep = "upload" | "validate" | "preview" | "import" | "results";

export function BusinessCaseImportModal({
  open,
  onOpenChange,
  onSuccess,
}: BusinessCaseImportModalProps) {
  const { toast } = useToast();

  const [step, setStep] = useState<ImportStep>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<BusinessCaseImportRow[]>([]);
  const [skippedRows, setSkippedRows] = useState<SkippedRow[]>([]);
  const [totalCsvLines, setTotalCsvLines] = useState(0);
  const [validations, setValidations] = useState<
    BusinessCaseImportRowValidation[]
  >([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [previewResult, setPreviewResult] =
    useState<BusinessCaseImportResult | null>(null);
  const [importResult, setImportResult] =
    useState<BusinessCaseImportResult | null>(null);

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    if (isValidating || isPreviewing || isImporting) {
      toast({
        title: "Operation in progress",
        description: "Please wait for the operation to complete before closing.",
        variant: "destructive",
      });
      return;
    }
    setStep("upload");
    setFile(null);
    setParsedRows([]);
    setSkippedRows([]);
    setTotalCsvLines(0);
    setValidations([]);
    setPreviewResult(null);
    setImportResult(null);
    onOpenChange(false);
  }, [isValidating, isPreviewing, isImporting, onOpenChange, toast]);

  // Parse CSV file - returns valid rows AND skipped rows with reasons
  const parseCSV = useCallback((csvText: string): ParseResult => {
    return parseBusinessCaseCSV(csvText);
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback(
    async (selectedFile: File) => {
      if (!selectedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid file type",
          description: "Please select a CSV file.",
          variant: "destructive",
        });
        return;
      }

      try {
        const text = await selectedFile.text();
        const result = parseCSV(text);
        
        if (result.validRows.length === 0) {
          toast({
            title: "No valid rows found",
            description:
              result.skippedRows.length > 0
                ? `All ${result.skippedRows.length} rows had parsing errors. Check the skipped rows section for details.`
                : "The CSV file does not contain any valid data rows.",
            variant: "destructive",
          });
          // Still show the file so user can see what went wrong
          if (result.skippedRows.length > 0) {
            setFile(selectedFile);
            setParsedRows([]);
            setSkippedRows(result.skippedRows);
            setTotalCsvLines(result.totalLines);
            setStep("validate");
          }
          return;
        }

        setFile(selectedFile);
        setParsedRows(result.validRows);
        setSkippedRows(result.skippedRows);
        setTotalCsvLines(result.totalLines);
        setStep("validate");

        // Notify about skipped rows if any
        if (result.skippedRows.length > 0) {
          toast({
            title: "Some rows skipped",
            description: `${result.validRows.length} valid, ${result.skippedRows.length} skipped due to parsing errors. Review skipped rows before proceeding.`,
          });
        }
      } catch (supabaseError) {
        toast({
          title: "Error parsing CSV",
          description:
            supabaseError instanceof Error ? supabaseError.message : "Failed to parse CSV file",
          variant: "destructive",
        });
      }
    },
    [parseCSV, toast],
  );

  // Validate rows
  const handleValidate = useCallback(async () => {
    if (parsedRows.length === 0) {
      toast({
        title: "No data to validate",
        description: "Please upload a CSV file first.",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      const result = await validateBusinessCaseImport(parsedRows);
      
      if (result.error) {
        toast({
          title: "Validation error",
          description: result.error,
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }

      setValidations(result.validations);
      setIsValidating(false);
      
      const validCount = result.validations.filter((v) => v.isValid).length;
      const invalidCount = result.validations.length - validCount;
      
      if (invalidCount > 0) {
        toast({
          title: "Validation complete",
          description: `${validCount} valid, ${invalidCount} invalid rows found. Please review errors before importing.`,
        });
      } else {
        toast({
          title: "All rows valid",
          description: `All ${validCount} rows passed validation. Ready to import.`,
        });
      }
    } catch (supabaseError) {
      toast({
        title: "Validation failed",
        description:
          supabaseError instanceof Error ? supabaseError.message : "Failed to validate rows",
        variant: "destructive",
      });
      setIsValidating(false);
    }
  }, [parsedRows, toast]);

  // Preview import (dry run)
  const handlePreview = useCallback(async () => {
    if (validations.length === 0) {
      toast({
        title: "No validations",
        description: "Please validate the data first.",
        variant: "destructive",
      });
      return;
    }

    const validRows = validations.filter((v) => v.isValid).map((v) => v.row);

    if (validRows.length === 0) {
      toast({
        title: "No valid rows",
        description:
          "There are no valid rows to preview. Please fix errors first.",
        variant: "destructive",
      });
      return;
    }

    setIsPreviewing(true);
    setStep("preview");

    try {
      const result = await previewBusinessCaseImport(validRows);
      setPreviewResult(result);

      toast({
        title: "Preview complete",
        description: `Would create: ${result.created}, Would update: ${result.updated}, Would error: ${result.errors}`,
      });
    } catch (supabaseError) {
      toast({
        title: "Preview failed",
        description:
          supabaseError instanceof Error
            ? supabaseError.message
            : "Failed to preview import",
        variant: "destructive",
      });
      setStep("validate");
    } finally {
      setIsPreviewing(false);
    }
  }, [validations, toast]);

  // Import rows (can be called from validate or preview step)
  const handleImport = useCallback(async () => {
    // Use preview result if available (from preview step), otherwise use validations
    const rowsToImport = previewResult
      ? previewResult.rowValidations
      .filter((v) => v.isValid)
          .map((v) => v.row)
      : validations.filter((v) => v.isValid).map((v) => v.row);

    if (rowsToImport.length === 0) {
      toast({
        title: "No valid rows",
        description:
          "There are no valid rows to import. Please fix errors first.",
        variant: "destructive",
      });
      return;
    }

    const validRows = rowsToImport;

    if (validRows.length === 0) {
      toast({
        title: "No valid rows",
        description:
          "There are no valid rows to import. Please fix errors first.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setStep("import");
    
    try {
      const result = await importBusinessCases(validRows);
      setImportResult(result);
      setStep("results");
      
      if (result.error) {
        toast({
          title: "Import failed",
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Import complete",
          description: `Created: ${result.created}, Updated: ${result.updated}, Errors: ${result.errors}`,
        });
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (supabaseError) {
      toast({
        title: "Import failed",
        description:
          supabaseError instanceof Error
            ? supabaseError.message
            : "Failed to import business cases",
        variant: "destructive",
      });
      setStep("validate");
    } finally {
      setIsImporting(false);
    }
  }, [validations, previewResult, toast, onSuccess]);

  // Download template
  const handleDownloadTemplate = useCallback(async () => {
    try {
      const csvContent = await generateBusinessCaseImportTemplate();
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "business_case_import_template.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Template downloaded",
        description:
          "Template includes examples showing the same formulation across multiple countries",
      });
    } catch (supabaseError) {
      toast({
        title: "Download failed",
        description:
          supabaseError instanceof Error
            ? supabaseError.message
            : "Failed to download template",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Export failed rows as CSV for fixing
  const handleExportFailedRows = useCallback(() => {
    if (!importResult) return;

    const headers = [
      "formulation_code",
      "country_code",
      "use_group_variant",
      "effective_start_fiscal_year",
      "business_case_name",
      "change_reason",
      ...Array.from({ length: 10 }, (_, i) => [
        `year_${i + 1}_volume`,
        `year_${i + 1}_nsp`,
        `year_${i + 1}_cogs`,
      ]).flat(),
    ];

    // Get all failed rows (invalid + errors)
    const failedRows = importResult.rowValidations
      .filter(
        (v) =>
          !v.isValid ||
          importResult.rowProgress.some(
            (p) => p.rowIndex === v.rowIndex && p.status === "error",
          ),
      )
      .map((v) => {
        const row = v.row;
        return [
          row.formulation_code || "",
          row.country_code || "",
          row.use_group_variant || "",
          row.effective_start_fiscal_year || "",
          row.business_case_name || "",
          row.change_reason || "",
          ...Array.from({ length: 10 }, (_, i) => {
            const year = i + 1;
            const volumeKey =
              `year_${year}_volume` as keyof BusinessCaseImportRow;
            const nspKey = `year_${year}_nsp` as keyof BusinessCaseImportRow;
            const cogsKey = `year_${year}_cogs` as keyof BusinessCaseImportRow;
            return [
              row[volumeKey]?.toString() || "",
              row[nspKey]?.toString() || "",
              row[cogsKey]?.toString() || "",
            ];
          }).flat(),
        ];
      });

    if (failedRows.length === 0) {
      toast({
        title: "No failed rows",
        description: "All rows were successfully imported.",
      });
      return;
    }

    const csvContent = [
      headers.join(","),
      ...failedRows.map((row) =>
        row
          .map((cell) => {
            const cellStr = String(cell);
            if (
              cellStr.includes(",") ||
              cellStr.includes('"') ||
              cellStr.includes("\n")
            ) {
              return `"${cellStr.replace(/"/g, '""')}"`;
            }
            return cellStr;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `failed_import_rows_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Failed rows exported",
      description: `${failedRows.length} failed row${failedRows.length !== 1 ? "s" : ""} exported. Fix and re-import.`,
    });
  }, [importResult, toast]);

  const validCount = validations.filter((v) => v.isValid).length;
  const invalidCount = validations.length - validCount;
  const canImport = validCount > 0 && !isValidating && !isImporting;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Business Cases
          </DialogTitle>
          <DialogDescription>
            Upload a CSV file to import multiple business cases at once. Each
            row represents one formulation-country-use_group combination. You
            can import the same formulation across multiple countries by adding
            multiple rows.
          </DialogDescription>
        </DialogHeader>

        {step === "upload" && (
          <ImportUploadStep
            file={file}
            parsedRows={parsedRows}
            onFileSelect={handleFileSelect}
            onDownloadTemplate={handleDownloadTemplate}
          />
        )}

        {step === "validate" && (
          <ImportValidateStep
            parsedRows={parsedRows}
            totalCsvLines={totalCsvLines}
            skippedRows={skippedRows}
            validations={validations}
            validCount={validCount}
            invalidCount={invalidCount}
            onChangeFile={() => {
              setStep("upload");
              setValidations([]);
              setSkippedRows([]);
            }}
          />
        )}

        {step === "preview" && previewResult && (
          <ImportPreviewStep
            previewResult={previewResult}
            totalCsvLines={totalCsvLines}
            skippedRows={skippedRows}
          />
        )}

        {step === "import" && <ImportLoadingStep />}

        {step === "results" && importResult && (
          <ImportResultsStep
            importResult={importResult}
            totalCsvLines={totalCsvLines}
            skippedRows={skippedRows}
          />
        )}

        <DialogFooter>
          {step === "upload" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {parsedRows.length > 0 && (
                <Button onClick={handleValidate}>Validate</Button>
              )}
            </>
          )}

          {step === "validate" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleValidate}
                disabled={isValidating}
              >
                {isValidating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Re-validate"
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={!canImport || isPreviewing}
              >
                {isPreviewing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Previewing...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Import
                  </>
                )}
              </Button>
              <Button onClick={handleImport} disabled={!canImport}>
                Import {validCount > 0 && `(${validCount} rows)`}
              </Button>
            </>
          )}

          {step === "preview" && previewResult && (
            <>
              <Button variant="outline" onClick={() => setStep("validate")}>
                Back to Validation
              </Button>
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={isPreviewing}
              >
                {isPreviewing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Re-previewing...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Re-preview
                  </>
                )}
              </Button>
              <Button
                onClick={handleImport}
                disabled={isImporting || previewResult.errors > 0}
              >
                {isImporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Proceed with Import
                  </>
                )}
              </Button>
            </>
          )}

          {step === "import" && (
            <Button variant="outline" disabled>
              Importing...
            </Button>
          )}

          {step === "results" && (
            <>
              {importResult &&
                (importResult.invalidRows > 0 ||
                  importResult.errors > 0 ||
                  skippedRows.length > 0) && (
                  <Button
                    variant="outline"
                    onClick={handleExportFailedRows}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export Failed Rows
            </Button>
                )}
              <Button onClick={handleClose}>Close</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
