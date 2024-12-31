export interface TaxReturn {
  id: string;
  type: 'VAT' | 'PAYE' | 'ITR';
  period: string;
  dueDate: string;
  status: 'pending' | 'filed' | 'overdue';
  amount: number;
}

export interface KRACredentials {
  pinNumber: string;
  password: string;
  accessToken?: string;
}

export interface TaxSummary {
  vatPayable: number;
  payePayable: number;
  itrPayable: number;
  nextDueDate: string;
  lastFiled: string;
}