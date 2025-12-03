"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ShortUrl } from "@/lib/actions/short-urls";
import { createShortUrl, updateShortUrl } from "@/lib/actions/short-urls";

interface ShortUrlFormProps {
  shortUrl?: ShortUrl;
  mode: "create" | "edit";
}

export function ShortUrlForm({ shortUrl, mode }: ShortUrlFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        if (mode === "create") {
          await createShortUrl(formData);
          toast.success("Short URL created!");
          router.push("/shorturl");
        } else if (shortUrl) {
          await updateShortUrl(shortUrl.id, formData);
          toast.success("Short URL updated!");
          router.push("/shorturl");
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl">
      {mode === "create" && (
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              ls.life/
            </span>
            <Input
              id="slug"
              name="slug"
              placeholder="my-link"
              defaultValue={shortUrl?.slug}
              required
              pattern="^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$"
              minLength={2}
              maxLength={100}
              className="font-mono"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Alphanumeric and hyphens only. 2-100 characters.
          </p>
        </div>
      )}

      {mode === "edit" && (
        <div className="space-y-2">
          <Label>Short URL</Label>
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <span className="text-sm font-mono">ls.life/{shortUrl?.slug}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Slugs cannot be changed after creation.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="destination_url">Destination URL</Label>
        <Input
          id="destination_url"
          name="destination_url"
          type="url"
          placeholder="https://example.com/my-page"
          defaultValue={shortUrl?.destination_url}
          required
        />
        <p className="text-xs text-muted-foreground">
          The full URL where users will be redirected.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="What is this link for?"
          defaultValue={shortUrl?.description || ""}
          rows={2}
        />
      </div>

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="is_public">Public Link</Label>
          <p className="text-xs text-muted-foreground">
            Public links work for everyone. Private links require
            authentication.
          </p>
        </div>
        <input
          type="hidden"
          name="is_public"
          id="is_public_hidden"
          defaultValue={shortUrl?.is_public ? "true" : "false"}
        />
        <Switch
          id="is_public"
          defaultChecked={shortUrl?.is_public ?? false}
          onCheckedChange={(checked) => {
            const hiddenInput = document.getElementById(
              "is_public_hidden",
            ) as HTMLInputElement;
            if (hiddenInput) hiddenInput.value = checked ? "true" : "false";
          }}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create Short URL"
              : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/shorturl")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
