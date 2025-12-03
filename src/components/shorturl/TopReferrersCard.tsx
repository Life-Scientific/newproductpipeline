"use client";

import { ContentCard } from "@/components/layout/ContentCard";
import { Progress } from "@/components/ui/progress";

interface TopReferrersCardProps {
  data: { referrer: string; count: number }[];
}

export function TopReferrersCard({ data }: TopReferrersCardProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  if (data.length === 0) {
    return (
      <ContentCard title="Top Referrers" variant="list">
        <p className="text-sm text-muted-foreground text-center py-8">
          No referrer data yet
        </p>
      </ContentCard>
    );
  }

  return (
    <ContentCard title="Top Referrers" variant="list">
      <div className="space-y-4">
        {data.slice(0, 5).map((item) => (
          <div key={item.referrer} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="truncate max-w-[180px]" title={item.referrer}>
                {item.referrer}
              </span>
              <span className="font-medium tabular-nums">{item.count}</span>
            </div>
            <Progress value={(item.count / maxCount) * 100} className="h-2" />
          </div>
        ))}
      </div>
    </ContentCard>
  );
}
