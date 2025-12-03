"use client";

import { ContentCard } from "@/components/layout/ContentCard";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ShortUrlClick } from "@/lib/actions/short-urls";

interface RecentClicksTableProps {
  clicks: ShortUrlClick[];
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
  Unknown: "Unknown",
};

function formatReferrer(referrer: string | null): string {
  if (!referrer) return "Direct";
  try {
    return new URL(referrer).hostname;
  } catch {
    return referrer;
  }
}

function formatUserAgent(ua: string | null): string {
  if (!ua) return "Unknown";

  // Simple UA parsing for display
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  if (ua.includes("Opera")) return "Opera";

  return "Other";
}

export function RecentClicksTable({ clicks }: RecentClicksTableProps) {
  if (clicks.length === 0) {
    return (
      <ContentCard title="Recent Clicks" variant="table">
        <p className="text-sm text-muted-foreground text-center py-8">
          No clicks recorded yet
        </p>
      </ContentCard>
    );
  }

  return (
    <ContentCard title="Recent Clicks" variant="table">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Referrer</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Browser</TableHead>
              <TableHead>Auth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clicks.slice(0, 20).map((click) => (
              <TableRow key={click.id}>
                <TableCell className="text-sm">
                  {new Date(click.clicked_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                  {formatReferrer(click.referrer)}
                </TableCell>
                <TableCell className="text-sm">
                  {countryNames[click.country || "Unknown"] ||
                    click.country ||
                    "Unknown"}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatUserAgent(click.user_agent)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={click.is_authenticated ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {click.is_authenticated ? "Yes" : "No"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentCard>
  );
}
