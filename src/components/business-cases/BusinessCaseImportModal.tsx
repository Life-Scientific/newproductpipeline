"use client";

import { useState, useCallback, useRef } from "react";
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
import {
  Upload,
  Download,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Eye,
  Play,
} from "lucide-react";
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
import { BusinessCaseImportPreview } from "./BusinessCaseImportPreview";
import { cn } from "@/lib/utils";

interface BusinessCaseImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type ImportStep = "upload" | "validate" | "preview" | "import" | "results";

interface SkippedRow {
  lineNumber: number;
  reason: string;
  rawData: string;
}

interface ParseResult {
  validRows: BusinessCaseImportRow[];
  skippedRows: SkippedRow[];
  totalLines: number;
}

export function BusinessCaseImportModal({
  open,
  onOpenChange,
  onSuccess,
}: BusinessCaseImportModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  }, [isValidating, isPreviewing, isImporting, onOpenChange, toast]);

  // Parse CSV file - returns valid rows AND skipped rows with reasons
  const parseCSV = useCallback((csvText: string): ParseResult => {
    const allLines = csvText.split("\n");

    // Filter out comment lines but track original line numbers
    const dataLines: { line: string; originalLineNumber: number }[] = [];
    for (let i = 0; i < allLines.length; i++) {
      const trimmed = allLines[i].trim();
      if (trimmed && !trimmed.startsWith("#")) {
        dataLines.push({ line: trimmed, originalLineNumber: i + 1 });
      }
    }
    
    if (dataLines.length < 2) {
      throw new Error(
        "The CSV file appears to be empty or incomplete. It must have at least a header row (with column names) and one data row. Please check your file and try again.",
      );
    }

    const headers = dataLines[0].line.split(",").map((h) => h.trim());
    
    // Only check required headers
    const requiredHeaders = [
      "formulation_code",
      "country_code",
      "use_group_variant",
      ...Array.from({ length: 10 }, (_, i) => [
        `year_${i + 1}_volume`,
        `year_${i + 1}_nsp`,
      ]).flat(),
    ];
    
    const missingRequired = requiredHeaders.filter(
      (h) =>
        !headers.some((header) => header.toLowerCase() === h.toLowerCase()),
    );

    if (missingRequired.length > 0) {
      const headerNames: Record<string, string> = {
        formulation_code: "Formulation Code",
        country_code: "Country Code",
        use_group_variant: "Use Group Variant",
      };
      const friendlyNames = missingRequired.map(
        (h) =>
          headerNames[h] ||
          h
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())
            .replace(/Year (\d+) Volume/g, "Year $1 Volume")
            .replace(/Year (\d+) Nsp/g, "Year $1 NSP (Net Selling Price)"),
      );
      throw new Error(
        `The CSV file is missing required column headers: ${friendlyNames.join(", ")}. Please download the template and ensure all required columns are present.`,
      );
    }

    const validRows: BusinessCaseImportRow[] = [];
    const skippedRows: SkippedRow[] = [];
    
    for (let i = 1; i < dataLines.length; i++) {
      const { line, originalLineNumber } = dataLines[i];
      if (!line) continue;

      // Handle CSV with quoted fields
      const values: string[] = [];
      let current = "";
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row: Partial<BusinessCaseImportRow> = {};
      const parseErrors: string[] = [];
      
      headers.forEach((header, idx) => {
        const value = values[idx]?.trim() || "";
        const headerLower = header.toLowerCase();
        
        if (headerLower === "formulation_code") {
          row.formulation_code = value;
        } else if (headerLower === "country_code") {
          row.country_code = value;
        } else if (headerLower === "use_group_variant") {
          row.use_group_variant = value;
        } else if (headerLower === "effective_start_fiscal_year") {
          if (value) row.effective_start_fiscal_year = value;
        } else if (headerLower === "business_case_name") {
          if (value) row.business_case_name = value;
        } else if (headerLower === "change_reason") {
          if (value) row.change_reason = value;
        } else {
          // Year data fields
          const yearMatch = headerLower.match(/year_(\d+)_(volume|nsp|cogs)/);
          if (yearMatch) {
            const yearNum = parseInt(yearMatch[1], 10);
            const field = yearMatch[2];
            const key =
              `year_${yearNum}_${field}` as keyof BusinessCaseImportRow;
            if (field === "volume" || field === "nsp") {
              if (!value || value === "") {
                // Empty cell - leave field undefined (will be caught by validation)
                // Don't add parse error here, let validation handle it
              } else {
                const numValue = parseFloat(value);
                if (isNaN(numValue)) {
                  const fieldName =
                    field === "volume"
                      ? "Volume"
                      : "NSP (Net Selling Price)";
                  parseErrors.push(
                    `Year ${yearNum} ${fieldName} contains invalid text: "${value}". Please enter a number only (no letters or special characters).`,
                  );
                } else if (numValue < 0) {
                  const fieldName =
                    field === "volume"
                      ? "Volume"
                      : "NSP (Net Selling Price)";
                  parseErrors.push(
                    `Year ${yearNum} ${fieldName} cannot be negative. You entered "${value}". Please enter a number that is 0 or greater.`,
                  );
                } else {
                  // Set the field if it's 0 or greater (0 is now allowed)
                  (row as any)[key] = numValue;
                }
              }
            } else if (field === "cogs" && value) {
              const numValue = parseFloat(value);
              if (!isNaN(numValue) && numValue > 0) {
                (row as any)[key] = numValue;
              }
            }
          }
        }
      });

      // Check required identifiers
      if (!row.formulation_code) {
        parseErrors.push(
          "Formulation Code is missing. Please enter the product formulation code in the formulation_code column (e.g., 001-01, 302-01).",
        );
      }
      if (!row.country_code) {
        parseErrors.push(
          "Country Code is missing. Please enter the 2-letter country code in the country_code column (e.g., FR for France, IT for Italy, CA for Canada).",
        );
      }
      if (!row.use_group_variant) {
        parseErrors.push(
          'Use Group Variant is missing. Please enter the use group variant code in the use_group_variant column. The format must be "001" (3 digits, e.g., 001, 002).',
        );
      }

      // Check all 10 years have volume and nsp
        for (let year = 1; year <= 10; year++) {
          const volumeKey = `year_${year}_volume` as keyof BusinessCaseImportRow;
          const nspKey = `year_${year}_nsp` as keyof BusinessCaseImportRow;
          if (
          row[volumeKey] === undefined &&
          !parseErrors.some((e) => e.includes(`Year ${year} Volume`))
        ) {
          parseErrors.push(
            `Year ${year} Volume is missing. Please enter a number (0 or greater) in the year_${year}_volume column (in Litres).`,
          );
        }
        if (
          row[nspKey] === undefined &&
          !parseErrors.some((e) => e.includes(`Year ${year} NSP`))
        ) {
          parseErrors.push(
            `Year ${year} NSP (Net Selling Price) is missing. Please enter a number (0 or greater) in the year_${year}_nsp column (in Euros per Litre).`,
          );
        }
      }

      if (parseErrors.length > 0) {
        // Get a preview of the row data
        const preview = `${row.formulation_code || "?"} / ${row.country_code || "?"} / ${row.use_group_variant || "?"}`;
        skippedRows.push({
          lineNumber: originalLineNumber,
          reason:
            parseErrors.slice(0, 3).join("; ") +
            (parseErrors.length > 3
              ? ` (+${parseErrors.length - 3} more)`
              : ""),
          rawData: preview,
        });
      } else {
        validRows.push(row as BusinessCaseImportRow);
      }
    }

    return {
      validRows,
      skippedRows,
      totalLines: dataLines.length - 1, // Exclude header
    };
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

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) {
        handleFileSelect(droppedFile);
      }
    },
    [handleFileSelect],
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
          <div className="space-y-4">
            {/* Download template button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleDownloadTemplate}
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>

            {/* File upload area */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
                "hover:border-primary/50 cursor-pointer",
                file && "border-primary bg-primary/5",
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    handleFileSelect(selectedFile);
                  }
                }}
              />
              
              {file ? (
                <div className="space-y-2">
                  <FileText className="h-12 w-12 mx-auto text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {parsedRows.length} row
                      {parsedRows.length !== 1 ? "s" : ""} parsed
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      Drop CSV file here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      CSV file with business case data
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === "validate" && (
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
              <Button
                variant="outline"
                onClick={() => {
                  setStep("upload");
                  setValidations([]);
                  setSkippedRows([]);
                }}
              >
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
        )}

        {step === "preview" && previewResult && (
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
        )}

        {step === "import" && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
              <p className="font-medium">Importing business cases...</p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take a few moments
              </p>
            </div>
          </div>
        )}

        {step === "results" && importResult && (
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
