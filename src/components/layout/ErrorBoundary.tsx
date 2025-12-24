"use client";

import { useCallback } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { error } from "@/lib/logger";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <Card className="m-4 border-destructive/50 bg-destructive/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          An error occurred while rendering this component.
        </p>
        {supabaseError.message && (
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm font-mono text-foreground break-all">
              {supabaseError.message}
            </p>
          </div>
        )}
        <Button
          variant="outline"
          onClick={resetErrorBoundary}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Optional: Callback when an error is caught */
  onError?: (error: Error, info: { componentStack?: string | null }) => void;
}

/**
 * Error boundary wrapper component using react-error-boundary.
 * Catches React component errors and displays a fallback UI.
 *
 * @example
 * ```tsx
 * <ErrorBoundary onError={(error) => log("Error:", error)}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export function ErrorBoundary({
  children,
  onError,
}: ErrorBoundaryProps) {
  const handleError = useCallback(
    (err: Error, info: { componentStack?: string | null }) => {
      if (onError) {
        onError(err, info);
      } else {
        // Default error handling - log to console in development
        if (process.env.NODE_ENV === "development") {
          error("ErrorBoundary caught an error:", err);
          error("Component stack:", info.componentStack);
        }
      }
    },
    [onError],
  );

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
}

/**
 * Convenience component for wrapping page content with error boundary.
 * Provides a simpler API for page-level error handling.
 */
export function PageErrorBoundary({
  children,
  title = "Page Error",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <ErrorBoundary>
      <div className="container mx-auto p-4">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This page encountered an error. Please try again or refresh the
              page.
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh page
            </Button>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}
