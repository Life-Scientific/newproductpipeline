"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";
import type { LaunchEligibilityResult } from "@/lib/actions/protection-check";

interface ProtectionDashboardProps {
  eligibilityResults: LaunchEligibilityResult[];
  isLoading?: boolean;
}

export function ProtectionDashboard({
  eligibilityResults,
  isLoading = false,
}: ProtectionDashboardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Launch Eligibility by Country</CardTitle>
          <CardDescription>Checking protection status...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (eligibilityResults.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Launch Eligibility by Country</CardTitle>
          <CardDescription>No country data available</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Register this formulation in countries to see launch eligibility status.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort: can launch first, then by country name
  const sortedResults = [...eligibilityResults].sort((a, b) => {
    if (a.canLaunch !== b.canLaunch) {
      return a.canLaunch ? -1 : 1;
    }
    return a.countryName.localeCompare(b.countryName);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Launch Eligibility by Country</CardTitle>
        <CardDescription>
          Protection status and earliest possible launch date for each registered country
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedResults.map((result) => (
          <div
            key={result.countryId}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{result.countryName}</h3>
              <Badge
                variant={result.canLaunch ? "default" : "destructive"}
                className="gap-1"
              >
                {result.canLaunch ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    CAN LAUNCH
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3" />
                    BLOCKED
                  </>
                )}
              </Badge>
            </div>

            {result.blockers.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Protection Blockers:</p>
                <ul className="space-y-1">
                  {result.blockers.map((blocker, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      <span>
                        {blocker.description}
                        {blocker.ingredientName && (
                          <span className="text-muted-foreground">
                            {" "}
                            ({blocker.ingredientName})
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 border-t">
              <p className="text-sm">
                <span className="font-medium">Earliest Launch Date: </span>
                {result.earliestLaunchDate ? (
                  <span
                    className={
                      result.canLaunch
                        ? "text-green-600 dark:text-green-400"
                        : "text-muted-foreground"
                    }
                  >
                    {result.earliestLaunchDate.toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Not available</span>
                )}
              </p>
            </div>

            {result.canLaunch && result.blockers.length === 0 && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  No active protections found. This product can launch immediately.
                </AlertDescription>
              </Alert>
            )}

            {!result.canLaunch && result.blockers.length > 0 && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>
                  Launch blocked until {result.earliestLaunchDate?.toLocaleDateString() || "protection expires"}.
                  {result.blockers.length > 1 && ` ${result.blockers.length} blockers found.`}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

