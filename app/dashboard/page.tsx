import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { FinancialChart } from "@/components/dashboard/financial-chart";

export default function DashboardPage() {
  return (
    <div className="container p-6 space-y-8">
      <DashboardCards />
      <div className="grid gap-6 md:grid-cols-2">
        <FinancialChart />
        <RecentTransactions />
      </div>
    </div>
  );
}