import { ReportsOverview } from "@/components/reports/reports-overview";
import { ReportsList } from "@/components/reports/reports-list";

export default function ReportsPage() {
  return (
    <div className="container p-6 space-y-8">
      <ReportsOverview />
      <ReportsList />
    </div>
  );
}