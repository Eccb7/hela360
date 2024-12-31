import { TaxOverview } from "@/components/tax/tax-overview";
import { TaxFilings } from "@/components/tax/tax-filings";

export default function TaxPage() {
  return (
    <div className="container p-6 space-y-8">
      <TaxOverview />
      <TaxFilings />
    </div>
  );
}