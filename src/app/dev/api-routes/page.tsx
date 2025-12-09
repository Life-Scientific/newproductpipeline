import { AnimatedPage } from "@/components/layout/AnimatedPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Lock, Zap } from "lucide-react";
import Link from "next/link";

interface APIRoute {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  auth: boolean;
  category: string;
}

const apiRoutes: APIRoute[] = [
  // Chat
  {
    method: "POST",
    path: "/api/chat",
    description: "AI chat completions (streaming)",
    auth: true,
    category: "AI",
  },

  // Formulations
  {
    method: "GET",
    path: "/api/formulations/[id]",
    description: "Get formulation by ID",
    auth: true,
    category: "Formulations",
  },
  {
    method: "GET",
    path: "/api/formulations/[id]/business-cases",
    description: "Get business cases for formulation",
    auth: true,
    category: "Formulations",
  },
  {
    method: "GET",
    path: "/api/formulations/[id]/cogs",
    description: "Get COGS for formulation",
    auth: true,
    category: "Formulations",
  },
  {
    method: "GET",
    path: "/api/formulations/[id]/countries",
    description: "Get countries for formulation",
    auth: true,
    category: "Formulations",
  },
  {
    method: "GET",
    path: "/api/formulations/[id]/ingredients",
    description: "Get ingredients for formulation",
    auth: true,
    category: "Formulations",
  },
  {
    method: "GET",
    path: "/api/formulations/[id]/protection",
    description: "Get patent protection status",
    auth: true,
    category: "Formulations",
  },
  {
    method: "GET",
    path: "/api/formulations/[id]/status-history",
    description: "Get status change history",
    auth: true,
    category: "Formulations",
  },
  {
    method: "GET",
    path: "/api/formulations/[id]/use-groups",
    description: "Get use groups for formulation",
    auth: true,
    category: "Formulations",
  },

  // Unsplash
  {
    method: "GET",
    path: "/api/unsplash",
    description: "Search Unsplash for background images",
    auth: false,
    category: "External",
  },

  // Auth
  {
    method: "GET",
    path: "/auth/callback",
    description: "OAuth callback handler",
    auth: false,
    category: "Auth",
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-500/10 text-green-600 border-green-500/30",
  POST: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  PUT: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  DELETE: "bg-red-500/10 text-red-600 border-red-500/30",
  PATCH: "bg-purple-500/10 text-purple-600 border-purple-500/30",
};

export default function APIRoutesPage() {
  // Group routes by category
  const categories = [...new Set(apiRoutes.map((r) => r.category))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
        <AnimatedPage>
          {/* Header */}
          <div className="space-y-2 mb-6">
            <Link
              href="/dev"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Dev Tools
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">API Routes</h1>
              <Badge
                variant="outline"
                className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
              >
                Dev Tool
              </Badge>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              All available API endpoints in the application
            </p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{apiRoutes.length}</div>
                <p className="text-xs text-muted-foreground">Total Routes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {apiRoutes.filter((r) => r.method === "GET").length}
                </div>
                <p className="text-xs text-muted-foreground">GET</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {apiRoutes.filter((r) => r.method === "POST").length}
                </div>
                <p className="text-xs text-muted-foreground">POST</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {apiRoutes.filter((r) => r.auth).length}
                </div>
                <p className="text-xs text-muted-foreground">Protected</p>
              </CardContent>
            </Card>
          </div>

          {/* Routes by Category */}
          {categories.map((category) => (
            <Card key={category} className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {apiRoutes
                    .filter((r) => r.category === category)
                    .map((route, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Badge
                          variant="outline"
                          className={`font-mono text-xs w-16 justify-center ${methodColors[route.method]}`}
                        >
                          {route.method}
                        </Badge>
                        <code className="text-sm font-mono flex-1 text-muted-foreground">
                          {route.path}
                        </code>
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {route.description}
                        </span>
                        {route.auth ? (
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <Zap className="h-3 w-3 text-green-500" />
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Legend */}
          <Card className="bg-muted/30">
            <CardContent className="py-3">
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>Requires authentication</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-green-500" />
                  <span>Public endpoint</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedPage>
      </div>
    </div>
  );
}
