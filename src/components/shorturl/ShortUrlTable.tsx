"use client";

import { Copy, Edit, ExternalLink, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ShortUrlWithStats } from "@/lib/actions/short-urls";
import { deleteShortUrl } from "@/lib/actions/short-urls";

interface ShortUrlTableProps {
  urls: ShortUrlWithStats[];
}

export function ShortUrlTable({ urls }: ShortUrlTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const copyToClipboard = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(`https://ls.life/${slug}`);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDelete = () => {
    if (!deleteId) return;

    startTransition(async () => {
      try {
        await deleteShortUrl(deleteId);
        toast.success("Short URL deleted");
        setDeleteId(null);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete",
        );
      }
    });
  };

  if (urls.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No short URLs yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Short URL</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="w-[100px] text-center">Clicks</TableHead>
              <TableHead className="w-[100px]">Visibility</TableHead>
              <TableHead className="w-[120px]">Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">ls.life/</span>
                    <span className="font-medium">{url.slug}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(url.slug)}
                      title="Copy link"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm text-muted-foreground">
                      {url.destination_url}
                    </span>
                    <a
                      href={url.destination_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  {url.description && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {url.description}
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium tabular-nums">
                    {url.click_count.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={url.is_public ? "default" : "secondary"}>
                    {url.is_public ? "Public" : "Private"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(url.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const testUrl = `https://ls.life/${url.slug}`;
                        window.open(testUrl, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <ExternalLink className="mr-2 h-3 w-3" />
                      Test
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/shorturl/${url.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => copyToClipboard(url.slug)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteId(url.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Short URL?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The short URL will stop working
              immediately and all click analytics will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
