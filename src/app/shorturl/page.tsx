import { Plus } from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/PageLayout";
import { ShortUrlTable } from "@/components/shorturl/ShortUrlTable";
import { Button } from "@/components/ui/button";
import { getShortUrls } from "@/lib/actions/short-urls";

export default async function ShortUrlsPage() {
  const urls = await getShortUrls();

  return (
    <PageLayout
      title="Short URLs"
      description="Manage your ls.life short links"
      variant="single"
      action={
        <Button asChild>
          <Link href="/shorturl/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Link
          </Link>
        </Button>
      }
    >
      <ShortUrlTable urls={urls} />
    </PageLayout>
  );
}
