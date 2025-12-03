import Link from "next/link";
import { CardGrid } from "@/components/layout/CardGrid";
import { ContentCard } from "@/components/layout/ContentCard";
import { MetricCard } from "@/components/layout/MetricCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { ClicksOverTimeChart } from "@/components/shorturl/ClicksOverTimeChart";
import { GeoBreakdownCard } from "@/components/shorturl/GeoBreakdownCard";
import { TopReferrersCard } from "@/components/shorturl/TopReferrersCard";
import {
  getShortUrlAnalytics,
  getTopShortUrls,
} from "@/lib/actions/short-urls";

export default async function ShortUrlAnalyticsPage() {
  const [analytics, topUrls] = await Promise.all([
    getShortUrlAnalytics(),
    getTopShortUrls(5),
  ]);

  return (
    <PageLayout
      title="Analytics"
      description="Click statistics across all your short URLs"
      variant="multi"
    >
      {/* Summary Stats */}
      <CardGrid columns={{ mobile: 2, tablet: 4, desktop: 4 }} gap="md">
        <MetricCard title="Total Clicks" value={analytics.total_clicks} />
        <MetricCard title="Today" value={analytics.clicks_today} />
        <MetricCard title="This Week" value={analytics.clicks_this_week} />
        <MetricCard title="This Month" value={analytics.clicks_this_month} />
      </CardGrid>

      {/* Charts */}
      <CardGrid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="md">
        <div className="md:col-span-2">
          <ClicksOverTimeChart data={analytics.clicks_by_day} />
        </div>
        <TopReferrersCard data={analytics.top_referrers} />
        <GeoBreakdownCard data={analytics.top_countries} />
      </CardGrid>

      {/* Top URLs */}
      <ContentCard
        title="Top Performing Links"
        description="Your most clicked short URLs"
        variant="list"
      >
        {topUrls.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No links created yet
          </p>
        ) : (
          <div className="space-y-3">
            {topUrls.map((url, index) => (
              <div
                key={url.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div>
                    <Link
                      href={`/shorturl/${url.id}`}
                      className="font-mono text-sm hover:underline"
                    >
                      ls.life/{url.slug}
                    </Link>
                    {url.description && (
                      <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                        {url.description}
                      </p>
                    )}
                  </div>
                </div>
                <span className="font-bold tabular-nums">
                  {url.click_count.toLocaleString()} clicks
                </span>
              </div>
            ))}
          </div>
        )}
      </ContentCard>
    </PageLayout>
  );
}
