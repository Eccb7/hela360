import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const transactions = [
  {
    id: "1",
    description: "Inventory Purchase",
    amount: -12500,
    date: "2024-03-20",
  },
  {
    id: "2",
    description: "Sales Revenue",
    amount: 45000,
    date: "2024-03-19",
  },
  {
    id: "3",
    description: "Utility Bill",
    amount: -2300,
    date: "2024-03-18",
  },
];

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
                <div
                  className={`text-sm font-medium ${
                    transaction.amount > 0 ? "text-green-500" : "text-destructive"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  KSh {transaction.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}