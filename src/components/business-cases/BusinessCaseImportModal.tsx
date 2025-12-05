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
import { Upload, Download, FileText, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import { validateBusinessCaseImport, importBusinessCases, generateBusinessCaseImportTemplate } from "@/lib/actions/business-cases";
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

type ImportStep = "upload" | "validate" | "import" | "results";

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
  const [validations, setValidations] = useState<BusinessCaseImportRowValidation[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<BusinessCaseImportResult | null>(null);

  // Reset state when modal closes
  const handleClose = useCallback(() => {
    if (isValidating || isImporting) {
      toast({
        title: "Import in progress",
        description: "Please wait for the import to complete before closing.",
        variant: "destructive",
      });
      return;
    }
    setStep("upload");
    setFile(null);
    setParsedRows([]);
    setValidations([]);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onOpenChange(false);
  }, [isValidating, isImporting, onOpenChange, toast]);

  // Parse CSV file
  const parseCSV = useCallback((csvText: string): BusinessCaseImportRow[] => {
    // Remove comment lines (lines starting with #)
    const lines = csvText.split("\n").filter((line) => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith("#");
    });
    
    if (lines.length < 2) {
      throw new Error("CSV file must have at least a header row and one data row");
    }

    const headers = lines[0].split(",").map((h) => h.trim());
    
    // Only check required headers (not optional ones like effective_start_fiscal_year, business_case_name, change_reason, cogs)
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
      (h) => !headers.some((header) => header.toLowerCase() === h.toLowerCase())
    );

    if (missingRequired.length > 0) {
      throw new Error(`Missing required headers: ${missingRequired.join(", ")}`);
    }

    const rows: BusinessCaseImportRow[] = [];
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
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
            const key = `year_${yearNum}_${field}` as keyof BusinessCaseImportRow;
            if (field === "volume" || field === "nsp") {
              const numValue = value ? parseFloat(value) : NaN;
              if (!isNaN(numValue)) {
                (row as any)[key] = numValue;
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

      // Validate required fields
      if (
        row.formulation_code &&
        row.country_code &&
        row.use_group_variant &&
        row.year_1_volume !== undefined &&
        row.year_1_nsp !== undefined
      ) {
        // Ensure all 10 years have volume and nsp
        let isValid = true;
        for (let year = 1; year <= 10; year++) {
          const volumeKey = `year_${year}_volume` as keyof BusinessCaseImportRow;
          const nspKey = `year_${year}_nsp` as keyof BusinessCaseImportRow;
          if (
            row[volumeKey] === undefined ||
            row[nspKey] === undefined ||
            isNaN(Number(row[volumeKey])) ||
            isNaN(Number(row[nspKey]))
          ) {
            isValid = false;
            break;
          }
        }
        
        if (isValid) {
          rows.push(row as BusinessCaseImportRow);
        }
      }
    }

    return rows;
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
        const rows = parseCSV(text);
        
        if (rows.length === 0) {
          toast({
            title: "No valid rows found",
            description: "The CSV file does not contain any valid data rows.",
            variant: "destructive",
          });
          return;
        }

        setFile(selectedFile);
        setParsedRows(rows);
        setStep("validate");
      } catch (error) {
        toast({
          title: "Error parsing CSV",
          description: error instanceof Error ? error.message : "Failed to parse CSV file",
          variant: "destructive",
        });
      }
    },
    [parseCSV, toast]
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
    [handleFileSelect]
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
    } catch (error) {
      toast({
        title: "Validation failed",
        description: error instanceof Error ? error.message : "Failed to validate rows",
        variant: "destructive",
      });
      setIsValidating(false);
    }
  }, [parsedRows, toast]);

  // Import rows
  const handleImport = useCallback(async () => {
    if (validations.length === 0) {
      toast({
        title: "No validations",
        description: "Please validate the data first.",
        variant: "destructive",
      });
      return;
    }

    const validRows = validations
      .filter((v) => v.isValid)
      .map((v) => v.row);

    if (validRows.length === 0) {
      toast({
        title: "No valid rows",
        description: "There are no valid rows to import. Please fix errors first.",
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
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "Failed to import business cases",
        variant: "destructive",
      });
      setStep("validate");
    } finally {
      setIsImporting(false);
    }
  }, [validations, toast, onSuccess]);

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
        description: "Template includes examples showing the same formulation across multiple countries",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download template",
        variant: "destructive",
      });
    }
  }, [toast]);

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
            Upload a CSV file to import multiple business cases at once. Each row represents one formulation-country-use_group combination. You can import the same formulation across multiple countries by adding multiple rows.
          </DialogDescription>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-4">
            {/* Download template button */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={handleDownloadTemplate} size="sm">
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
                file && "border-primary bg-primary/5"
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
                      {parsedRows.length} row{parsedRows.length !== 1 ? "s" : ""} parsed
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="font-medium">Drop CSV file here or click to browse</p>
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
                  {parsedRows.length} row{parsedRows.length !== 1 ? "s" : ""} ready to validate
                </p>
                <p className="text-sm text-muted-foreground">
                  Click Validate to check all rows before importing
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setStep("upload");
                  setValidations([]);
                }}
              >
                Change File
              </Button>
            </div>

            {validations.length > 0 ? (
              <BusinessCaseImportPreview validations={validations} />
            ) : (
              <div className="border rounded-lg p-8 text-center text-muted-foreground">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p>No validation results yet. Click Validate to check the data.</p>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Rows</p>
                  <p className="text-2xl font-bold">{importResult.totalRows}</p>
                </div>
                <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="text-2xl font-bold text-green-600">{importResult.created}</p>
                </div>
                <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <p className="text-sm text-muted-foreground">Updated</p>
                  <p className="text-2xl font-bold text-blue-600">{importResult.updated}</p>
                </div>
                <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-950/20">
                  <p className="text-sm text-muted-foreground">Errors</p>
                  <p className="text-2xl font-bold text-red-600">{importResult.errors}</p>
                </div>
              </div>
            </div>

            {importResult.rowProgress.some((p) => p.status === "error") && (
              <div className="space-y-2">
                <h4 className="font-medium text-destructive">Errors</h4>
                <div className="border rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                  {importResult.rowProgress
                    .filter((p) => p.status === "error")
                    .map((p) => (
                      <div key={p.rowIndex} className="text-sm">
                        <span className="font-medium">Row {p.rowIndex + 1}:</span>{" "}
                        <span className="text-muted-foreground">{p.message}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <BusinessCaseImportPreview validations={importResult.rowValidations} />
          </div>
        )}

        <DialogFooter>
          {step === "upload" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              {parsedRows.length > 0 && (
                <Button onClick={handleValidate}>
                  Validate
                </Button>
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
              <Button onClick={handleImport} disabled={!canImport}>
                Import {validCount > 0 && `(${validCount} rows)`}
              </Button>
            </>
          )}

          {step === "import" && (
            <Button variant="outline" disabled>
              Importing...
            </Button>
          )}

          {step === "results" && (
            <Button onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
