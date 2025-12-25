"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BusinessCaseImportRow } from "@/lib/db/types";

interface ImportUploadStepProps {
  file: File | null;
  parsedRows: BusinessCaseImportRow[];
  onFileSelect: (file: File) => void;
  onDownloadTemplate: () => void;
}

export function ImportUploadStep({
  file,
  parsedRows,
  onFileSelect,
  onDownloadTemplate,
}: ImportUploadStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  return (
    <div className="space-y-4">
      {/* Download template button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={onDownloadTemplate}
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
              onFileSelect(selectedFile);
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
  );
}
