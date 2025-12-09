"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface PortfolioHealthScoreProps {
  score: number;
  trend: number; // percentage change
  metrics: {
    label: string;
    value: string;
    status: "good" | "warning" | "critical";
  }[];
}

export function PortfolioHealthScore({
  score,
  trend,
  metrics,
}: PortfolioHealthScoreProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Portfolio Health Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{score}</span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
          <div
            className={`flex items-center text-sm ${trend >= 0 ? "text-success" : "text-destructive"}`}
          >
            {trend >= 0 ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {Math.abs(trend)}% vs last month
          </div>
        </div>

        <Progress value={score} className="h-2 mb-6" />

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, i) => (
            <div key={i} className="space-y-1">
              <p className="text-xs text-muted-foreground">{metric.label}</p>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    metric.status === "good"
                      ? "bg-success"
                      : metric.status === "warning"
                        ? "bg-warning"
                        : "bg-destructive"
                  }`}
                />
                <span className="font-medium text-sm">{metric.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
