import { BankAccounts } from "@/components/banking/bank-accounts";
import { TransactionList } from "@/components/banking/transaction-list";

export default function BankingPage() {
  return (
    <div className="container p-6 space-y-8">
      <BankAccounts />
      <TransactionList />
    </div>
  );
}