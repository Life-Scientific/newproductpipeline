"use client";

import { ContentCard } from "@/components/layout/ContentCard";
import { Progress } from "@/components/ui/progress";

interface GeoBreakdownCardProps {
  data: { country: string; count: number }[];
}

// ISO 3166-1 alpha-2 to country name mapping (common countries)
const countryNames: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  CA: "Canada",
  AU: "Australia",
  JP: "Japan",
  CN: "China",
  IN: "India",
  BR: "Brazil",
  NL: "Netherlands",
  IE: "Ireland",
  ES: "Spain",
  IT: "Italy",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
  PL: "Poland",
  BE: "Belgium",
  AT: "Austria",
  CH: "Switzerland",
  NZ: "New Zealand",
  SG: "Singapore",
  KR: "South Korea",
  MX: "Mexico",
  AR: "Argentina",
  Unknown: "Unknown",
};

export function GeoBreakdownCard({ data }: GeoBreakdownCardProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  if (data.length === 0) {
    return (
      <ContentCard title="Geographic Breakdown" variant="list">
        <p className="text-sm text-muted-foreground text-center py-8">
          No geographic data yet
        </p>
      </ContentCard>
    );
  }

  return (
    <ContentCard title="Geographic Breakdown" variant="list">
      <div className="space-y-4">
        {data.slice(0, 5).map((item) => (
          <div key={item.country} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{countryNames[item.country] || item.country}</span>
              <span className="font-medium tabular-nums">{item.count}</span>
            </div>
            <Progress value={(item.count / maxCount) * 100} className="h-2" />
          </div>
        ))}
      </div>
    </ContentCard>
  );
}
