"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Building2, Globe, DollarSign } from "lucide-react";
import { RevenueTable } from "../RevenueTable";
import { chartColors } from "@/lib/utils/chart-theme";

// Top revenue contributors (mock data)
const TOP_CUSTOMERS = [
  { name: "AgriCorp International", territory: "North America", revenue: 2.4, change: 12.5, products: 8 },
  { name: "EuroFarm Solutions", territory: "France", revenue: 1.8, change: 5.2, products: 6 },
  { name: "British Agri Holdings", territory: "UK & Ireland", revenue: 1.5, change: -2.1, products: 5 },
  { name: "FieldMaster USA", territory: "North America", revenue: 1.2, change: 18.3, products: 4 },
  { name: "Loire Valley Farms", territory: "France", revenue: 0.9, change: 8.7, products: 3 },
  { name: "Irish Agricultural Co", territory: "UK & Ireland", revenue: 0.8, change: 3.4, products: 4 },
  { name: "Midwest Distributors", territory: "North America", revenue: 0.7, change: -5.2, products: 2 },
  { name: "Continental Agri", territory: "Other", revenue: 0.5, change: 22.1, products: 3 },
];

const TERRITORY_COLORS: Record<string, string> = {
  "North America": chartColors.primary,
  France: chartColors.secondary,
  "UK & Ireland": chartColors.tertiary,
  Other: chartColors.quaternary,
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function RevenueDrilldown() {
  const totalRevenue = TOP_CUSTOMERS.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">€{totalRevenue.toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Building2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Top Customers</p>
                <p className="text-2xl font-bold">{TOP_CUSTOMERS.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Globe className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Territories</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Territory Summary */}
      <motion.div variants={itemVariants}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          Territory Breakdown
        </h4>
        <RevenueTable />
      </motion.div>

      {/* Top Customers Table */}
      <motion.div variants={itemVariants}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          Top Revenue Contributors
        </h4>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Customer</TableHead>
                <TableHead>Territory</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">YoY Change</TableHead>
                <TableHead className="text-right">Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TOP_CUSTOMERS.map((customer, idx) => (
                <motion.tr
                  key={customer.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">
                        {idx + 1}.
                      </span>
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: TERRITORY_COLORS[customer.territory] }}
                      />
                      <span className="text-sm">{customer.territory}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-semibold tabular-nums">
                      €{customer.revenue.toFixed(1)}M
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        customer.change >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {customer.change >= 0 ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5" />
                      )}
                      {customer.change >= 0 ? "+" : ""}
                      {customer.change.toFixed(1)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary" className="font-mono">
                      {customer.products}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </motion.div>
  );
}

