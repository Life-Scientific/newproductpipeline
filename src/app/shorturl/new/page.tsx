import { PageLayout } from "@/components/layout/PageLayout";
import { ShortUrlForm } from "@/components/shorturl/ShortUrlForm";

export default function NewShortUrlPage() {
  return (
    <PageLayout
      title="Create Short URL"
      description="Create a new ls.life short link"
      variant="single"
    >
      <ShortUrlForm mode="create" />
    </PageLayout>
  );
}
