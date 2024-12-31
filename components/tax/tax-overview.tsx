"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaxSummary } from "@/lib/api/kra/types";
import { useState, useEffect } from "react";
import { Receipt, AlertCircle } from "lucide-react";

export function TaxOverview() {
  const [summary, setSummary] = useState<TaxSummary | null>(null);

  useEffect(() => {
    // Fetch tax summary from API
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">VAT Payable</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            KSh {summary?.vatPayable?.toLocaleString() ?? "0"}
          </div>
          <p className="text-xs text-muted-foreground">
            Due by {summary?.nextDueDate ?? "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">PAYE Payable</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            KSh {summary?.payePayable?.toLocaleString() ?? "0"}
          </div>
          <p className="text-xs text-muted-foreground">
            Last filed: {summary?.lastFiled ?? "N/A"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Filing Status</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Up to date</div>
          <p className="text-xs text-muted-foreground">
            Next due: {summary?.nextDueDate ?? "N/A"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}