import { BankStatement, Transaction } from "../types";
import { extractTextFromPDF } from "./extract-text";
import { parseTransactions } from "./transaction-parser";

export async function parseBankStatement(file: File): Promise<BankStatement> {
  const text = await extractTextFromPDF(file);
  const transactions = await parseTransactions(text);
  
  // Extract statement metadata
  const datePattern = /Statement Period:?\s*(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})/i;
  const dateMatch = text.match(datePattern);
  
  const balancePattern = /Opening Balance:?\s*KES\s*([\d,]+\.?\d*)/i;
  const balanceMatch = text.match(balancePattern);

  return {
    accountId: generateAccountId(text),
    startDate: dateMatch?.[1] || new Date().toISOString(),
    endDate: dateMatch?.[2] || new Date().toISOString(),
    transactions,
    openingBalance: parseAmount(balanceMatch?.[1] || '0'),
    closingBalance: calculateClosingBalance(transactions, parseAmount(balanceMatch?.[1] || '0')),
  };
}

function generateAccountId(text: string): string {
  const accountPattern = /Account Number:?\s*(\d+)/i;
  const match = text.match(accountPattern);
  return match?.[1] || 'unknown';
}

function parseAmount(amount: string): number {
  return Number(amount.replace(/[,\s]/g, ''));
}

function calculateClosingBalance(transactions: Transaction[], openingBalance: number): number {
  return transactions.reduce((balance, tx) => {
    return balance + (tx.type === 'credit' ? tx.amount : -tx.amount);
  }, openingBalance);
}