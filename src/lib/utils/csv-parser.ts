/**
 * CSV parsing utilities for business case import
 * Extracted from BusinessCaseImportModal for better testability
 */

import type {
  BusinessCaseImportRow,
} from "@/lib/db/types";

export interface SkippedRow {
  lineNumber: number;
  reason: string;
  rawData: string;
}

export interface ParseResult {
  validRows: BusinessCaseImportRow[];
  skippedRows: SkippedRow[];
  totalLines: number;
}

/**
 * Parse CSV text into business case import rows
 * Validates headers, handles quoted fields, and tracks skipped rows
 */
export function parseBusinessCaseCSV(csvText: string): ParseResult {
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

    // Skip row if parse errors
    if (parseErrors.length > 0) {
      skippedRows.push({
        lineNumber: originalLineNumber,
        reason: parseErrors.join(" "),
        rawData: line,
      });
      continue;
    }

    // Check required fields
    if (!row.formulation_code || !row.country_code || !row.use_group_variant) {
      const missing: string[] = [];
      if (!row.formulation_code) missing.push("Formulation Code");
      if (!row.country_code) missing.push("Country Code");
      if (!row.use_group_variant) missing.push("Use Group Variant");

      skippedRows.push({
        lineNumber: originalLineNumber,
        reason: `Missing required fields: ${missing.join(", ")}. Each row must have these fields filled in.`,
        rawData: line,
      });
      continue;
    }

    validRows.push(row as BusinessCaseImportRow);
  }

  return {
    validRows,
    skippedRows,
    totalLines: dataLines.length - 1, // Exclude header row from count
  };
}
