export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  currency: string;
  type: 'checking' | 'savings';
  lastSync: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category?: string;
  reference?: string;
}

export interface BankStatement {
  accountId: string;
  startDate: string;
  endDate: string;
  transactions: Transaction[];
  openingBalance: number;
  closingBalance: number;
}