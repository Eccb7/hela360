"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaxReturn } from "@/lib/api/kra/types";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export function TaxFilings() {
  const [returns, setReturns] = useState<TaxReturn[]>([]);

  useEffect(() => {
    // Fetch tax returns from API
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.map((taxReturn) => (
            <TableRow key={taxReturn.id}>
              <TableCell>{taxReturn.type}</TableCell>
              <TableCell>{taxReturn.period}</TableCell>
              <TableCell>{taxReturn.dueDate}</TableCell>
              <TableCell>KSh {taxReturn.amount.toLocaleString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    taxReturn.status === "filed"
                      ? "default"
                      : taxReturn.status === "overdue"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {taxReturn.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={taxReturn.status === "filed"}
                >
                  File Return
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}