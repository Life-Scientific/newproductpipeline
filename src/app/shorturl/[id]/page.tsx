import { notFound } from "next/navigation";
import { CardGrid } from "@/components/layout/CardGrid";
import { MetricCard } from "@/components/layout/MetricCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { RecentClicksTable } from "@/components/shorturl/RecentClicksTable";
import { ShortUrlForm } from "@/components/shorturl/ShortUrlForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getShortUrl, getShortUrlAnalytics } from "@/lib/actions/short-urls";

export default async function ShortUrlDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [urlData, analytics] = await Promise.all([
    getShortUrl(id),
    getShortUrlAnalytics(id),
  ]);

  if (!urlData) {
    notFound();
  }

  const { shortUrl, recentClicks, clickCount } = urlData;

  return (
    <PageLayout
      title="Edit Short URL"
      description={`ls.life/${shortUrl.slug}`}
      variant="multi"
    >
      {/* Stats Summary */}
      <CardGrid columns={{ mobile: 2, tablet: 4, desktop: 4 }} gap="md">
        <MetricCard title="Total Clicks" value={clickCount} />
        <MetricCard title="Today" value={analytics.clicks_today} />
        <MetricCard title="This Week" value={analytics.clicks_this_week} />
        <MetricCard title="This Month" value={analytics.clicks_this_month} />
      </CardGrid>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="clicks">Recent Clicks</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <ShortUrlForm shortUrl={shortUrl} mode="edit" />
        </TabsContent>

        <TabsContent value="clicks">
          <RecentClicksTable clicks={recentClicks} />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
