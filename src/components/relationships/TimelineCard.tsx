"use client";

import { ContentCard } from "@/components/layout/ContentCard";
import { Badge } from "@/components/ui/badge";
import { statusColors } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { format, isToday, isYesterday, isThisWeek, isThisMonth } from "date-fns";

export interface TimelineEvent {
  id: string;
  date: Date | string;
  type: string;
  title: string;
  description?: string;
  user?: string;
  metadata?: Record<string, unknown>;
  href?: string;
}

export interface TimelineCardProps {
  events: TimelineEvent[];
  entityType?: string;
  entityId?: string;
  showFilters?: boolean;
  title?: string;
  description?: string;
  maxEvents?: number;
}

function groupTimelineEvents(events: TimelineEvent[]) {
  const groups: Record<string, TimelineEvent[]> = {};
  events.forEach((event) => {
    const date = typeof event.date === "string" ? new Date(event.date) : event.date;
    let groupKey: string;

    if (isToday(date)) {
      groupKey = "Today";
    } else if (isYesterday(date)) {
      groupKey = "Yesterday";
    } else if (isThisWeek(date, { weekStartsOn: 1 })) {
      groupKey = "This Week";
    } else if (isThisMonth(date)) {
      groupKey = "This Month";
    } else {
      groupKey = format(date, "MMMM yyyy");
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(event);
  });
  return groups;
}

export function TimelineCard({
  events,
  entityType,
  entityId,
  showFilters = false,
  title = "Timeline",
  description = "Recent changes and updates",
  maxEvents = 10,
}: TimelineCardProps) {
  const [filterType, setFilterType] = useState<string | null>(null);

  // Sort events by date (newest first)
  const sortedEvents = [...events]
    .sort((a, b) => {
      const dateA = typeof a.date === "string" ? new Date(a.date) : a.date;
      const dateB = typeof b.date === "string" ? new Date(b.date) : b.date;
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, maxEvents);

  // Filter events if filter is active
  const filteredEvents =
    filterType === null
      ? sortedEvents
      : sortedEvents.filter((e) => e.type === filterType);

  // Group events by date
  const groupedEvents = groupTimelineEvents(filteredEvents);

  // Get unique event types for filter
  const eventTypes = Array.from(
    new Set(sortedEvents.map((e) => e.type))
  ).sort();

  const getStatusVariant = (status: string): string => {
    return (statusColors as Record<string, string>)[status] || "secondary";
  };

  return (
    <ContentCard title={title} description={description} variant="list">
      {showFilters && eventTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b">
          <button
            onClick={() => setFilterType(null)}
            className={cn(
              "px-3 py-1 text-xs rounded-md border transition-colors",
              filterType === null
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-muted"
            )}
          >
            All
          </button>
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-3 py-1 text-xs rounded-md border transition-colors",
                filterType === type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-muted"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {filteredEvents.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No events found.
        </p>
      ) : (
        <div className="relative pl-4 sm:pl-6">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-border" />
          {Object.entries(groupedEvents).map(([groupKey, eventsInGroup]) => (
            <div key={groupKey} className="mb-6 space-y-4">
              <h3 className="relative -left-4 sm:-left-6 mb-2 text-sm font-semibold text-muted-foreground">
                <span className="bg-card pr-2">{groupKey}</span>
              </h3>
              <div className="space-y-3">
                {eventsInGroup.map((event) => {
                  const eventDate = typeof event.date === "string" ? new Date(event.date) : event.date;
                  const statusVariant = getStatusVariant(event.type);

                  return (
                    <div key={event.id} className="relative flex items-start group">
                      <div className="absolute -left-[19px] sm:-left-[27px] mt-2.5 rounded-full w-2 h-2 bg-primary ring-4 ring-background" />
                      <div className="flex-1 p-3 border rounded-lg transition-colors hover:bg-muted/50">
                        <Link href={event.href || "#"} className="block">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-primary group-hover:underline">
                              {event.title}
                            </span>
                            <time dateTime={eventDate.toISOString()} className="text-xs text-muted-foreground">
                              {format(eventDate, "MMM d, yyyy")}
                            </time>
                          </div>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {event.user && <span>by {event.user}</span>}
                            <Badge variant={statusVariant as any} className="ml-auto">
                              {event.type}
                            </Badge>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </ContentCard>
  );
}

