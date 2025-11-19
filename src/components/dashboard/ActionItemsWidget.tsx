"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  type: "registration" | "patent" | "review";
  dueDate?: string;
  href: string;
}

interface ActionItemsWidgetProps {
  items: ActionItem[];
}

export function ActionItemsWidget({ items }: ActionItemsWidgetProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">Action Items</CardTitle>
        <Badge variant="secondary">{items.length} Pending</Badge>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <CheckCircle2 className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                <div className={`mt-0.5 ${
                  item.priority === "high" ? "text-destructive" : 
                  item.priority === "medium" ? "text-warning" : "text-info"
                }`}>
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{item.title}</p>
                    {item.dueDate && (
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(item.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                  <Link href={item.href} className="text-xs text-primary hover:underline flex items-center mt-1">
                    Take action <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

