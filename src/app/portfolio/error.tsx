"use client";

import { useEffect } from "react";
import { log, warn, error, table } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw, ArrowLeft, Bug } from "lucide-react";
import Link from "next/link";

export default function PortfolioError({
  error: err,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    error("Portfolio error:", err);
  }, [err]);

  // Determine if it's a data fetch error
  const isDataError =
    err.message.toLowerCase().includes("fetch") ||
    err.message.toLowerCase().includes("network") ||
    err.message.toLowerCase().includes("supabase");

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-lg w-full">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">
            {isDataError ? "Failed to load data" : "Something went wrong"}
          </CardTitle>
          <CardDescription>
            {isDataError
              ? "We couldn't fetch the portfolio data. Please check your connection and try again."
              : "An unexpected error occurred while loading this page."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Bug className="w-3 h-3" />
                <span>Development Error Details</span>
              </div>
              <p className="text-sm font-mono text-destructive break-all">
                {err.message}
              </p>
              {err.digest && (
                <p className="text-xs text-muted-foreground mt-2">
                  Digest: {err.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try again
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/portfolio">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
