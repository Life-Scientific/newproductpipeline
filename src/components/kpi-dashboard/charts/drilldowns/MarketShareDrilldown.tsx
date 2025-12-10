"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, BarChart3, MapPin } from "lucide-react";
import { MarketShareChart } from "../MarketShareChart";
import { chartColors } from "@/lib/utils/chart-theme";

// Territory details with targets
const TERRITORY_DETAILS = [
  {
    name: "North America",
    currentShare: 14.2,
    targetShare: 18,
    lastYear: 12.8,
    color: chartColors.primary,
    keyMarkets: ["USA", "Canada"],
    topProduct: "Herbicide Pro Max",
    growth: 10.9,
  },
  {
    name: "France",
    currentShare: 19.5,
    targetShare: 20,
    lastYear: 18.2,
    color: chartColors.secondary,
    keyMarkets: ["Île-de-France", "Occitanie"],
    topProduct: "FungiShield Plus",
    growth: 7.1,
  },
  {
    name: "UK & Ireland",
    currentShare: 16.1,
    targetShare: 18,
    lastYear: 15.9,
    color: chartColors.tertiary,
    keyMarkets: ["England", "Ireland"],
    topProduct: "CropGuard Elite",
    growth: 1.3,
  },
  {
    name: "Other",
    currentShare: 8.4,
    targetShare: 12,
    lastYear: 7.1,
    color: chartColors.quaternary,
    keyMarkets: ["Germany", "Spain", "Italy"],
    topProduct: "BioGrow Natural",
    growth: 18.3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function MarketShareDrilldown() {
  const totalShare = TERRITORY_DETAILS.reduce((sum, t) => sum + t.currentShare, 0);
  const avgGrowth =
    TERRITORY_DETAILS.reduce((sum, t) => sum + t.growth, 0) / TERRITORY_DETAILS.length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Summary Metrics */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Market Share</p>
                <p className="text-2xl font-bold">{totalShare.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg YoY Growth</p>
                <p className="text-2xl font-bold">+{avgGrowth.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <MapPin className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Territories</p>
                <p className="text-2xl font-bold">{TERRITORY_DETAILS.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trend Chart - Larger */}
      <motion.div variants={itemVariants}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          12-Month Market Share Trend
        </h4>
        <div className="rounded-lg border p-4 bg-card">
          <MarketShareChart height={400} />
        </div>
      </motion.div>

      {/* Territory Cards */}
      <motion.div variants={itemVariants}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-muted-foreground" />
          Territory Performance vs Target
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          {TERRITORY_DETAILS.map((territory, idx) => {
            const progress = (territory.currentShare / territory.targetShare) * 100;
            const gapToTarget = territory.targetShare - territory.currentShare;

            return (
              <motion.div
                key={territory.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: territory.color }}
                        />
                        <span className="font-semibold">{territory.name}</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          territory.growth >= 0
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {territory.growth >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {territory.growth >= 0 ? "+" : ""}
                        {territory.growth}%
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress to Target</span>
                        <span className="font-medium">{progress.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: territory.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(progress, 100)}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          Current: <strong>{territory.currentShare}%</strong>
                        </span>
                        <span>
                          Target: <strong>{territory.targetShare}%</strong>
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-4 pt-3 border-t space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Key Markets</span>
                        <span>{territory.keyMarkets.join(", ")}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Top Product</span>
                        <Badge variant="secondary" className="text-xs">
                          {territory.topProduct}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Gap to Target</span>
                        <span
                          className={
                            gapToTarget <= 0
                              ? "text-green-600 dark:text-green-400 font-medium"
                              : "text-amber-600 dark:text-amber-400 font-medium"
                          }
                        >
                          {gapToTarget <= 0 ? "Achieved! ✓" : `${gapToTarget.toFixed(1)}pp needed`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

