import Link from "next/link";
import { AnimatedPage } from "@/components/layout/AnimatedPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  Wrench,
  Database,
  Route,
  Palette,
  Activity,
  FileJson,
  Table2,
} from "lucide-react";

const devTools = [
  {
    title: "Entity Hierarchy",
    description:
      "Interactive node diagram of database entities and their relationships. Shows drill-down paths and identifies UI gaps.",
    href: "/dev/entity-map",
    icon: GitBranch,
    status: "active",
  },
  {
    title: "API Routes",
    description:
      "List of all API endpoints with their methods and descriptions.",
    href: "/dev/api-routes",
    icon: Route,
    status: "active",
  },
  {
    title: "Database Tables",
    description:
      "Quick view of all database tables with row counts and column info.",
    href: "/dev/tables",
    icon: Table2,
    status: "active",
  },
  {
    title: "Database Views",
    description: "All database views with their purposes and usage locations.",
    href: "/dev/views",
    icon: Database,
    status: "planned",
  },
  {
    title: "Color Palette",
    description: "Preview theme colors and design tokens.",
    href: "/dev/colors",
    icon: Palette,
    status: "planned",
  },
  {
    title: "Type Definitions",
    description: "Generated TypeScript types from database schema.",
    href: "/dev/types",
    icon: FileJson,
    status: "planned",
  },
];

export default function DevHomePage() {
  const activeTools = devTools.filter((t) => t.status === "active");
  const plannedTools = devTools.filter((t) => t.status === "planned");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
        <AnimatedPage>
          {/* Header */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <Wrench className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Developer Tools
                </h1>
                <p className="text-sm text-muted-foreground">
                  Internal tools for development, debugging, and documentation
                </p>
              </div>
            </div>
          </div>

          {/* Active Tools */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Active Tools
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.href} href={tool.href}>
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <Badge
                            variant="default"
                            className="bg-green-500/10 text-green-600 border-green-500/30"
                          >
                            active
                          </Badge>
                        </div>
                        <CardTitle className="text-base mt-3">
                          {tool.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Planned Tools */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
              Planned
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {plannedTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card key={tool.href} className="opacity-60">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-muted">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <Badge variant="secondary">planned</Badge>
                      </div>
                      <CardTitle className="text-base mt-3">
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <Card className="bg-muted/30 border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link
                  href="/portfolio"
                  className="text-primary hover:underline"
                >
                  → Portfolio Dashboard
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link
                  href="/portfolio/formulations"
                  className="text-primary hover:underline"
                >
                  → Formulations
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link
                  href="/portfolio/business-cases"
                  className="text-primary hover:underline"
                >
                  → Business Cases
                </Link>
                <span className="text-muted-foreground">|</span>
                <Link
                  href="/portfolio/settings"
                  className="text-primary hover:underline"
                >
                  → Settings
                </Link>
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center mt-8">
            These tools are for development purposes only.
          </p>
        </AnimatedPage>
      </div>
    </div>
  );
}





