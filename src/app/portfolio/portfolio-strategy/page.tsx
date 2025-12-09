import {
  getFormulations,
  getBusinessCases,
  getActivePortfolio,
  getAllProtectionStatus,
} from "@/lib/db/queries";
import { PortfolioStrategyDashboard } from "@/components/portfolio/PortfolioStrategyDashboard";

// Prevent double rendering and caching issues
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortfolioStrategyPage() {
  const [formulations, businessCases, activePortfolio, protectionStatus] =
    await Promise.all([
      getFormulations(),
      getBusinessCases(),
      getActivePortfolio(),
      getAllProtectionStatus().catch(() => []),
    ]);

  return (
    <PortfolioStrategyDashboard
      formulations={formulations}
      businessCases={businessCases}
      activePortfolio={activePortfolio}
      protectionStatus={protectionStatus}
    />
  );
}
