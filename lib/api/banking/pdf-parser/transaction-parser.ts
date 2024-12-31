import { Transaction } from "../types";
import { categorizeTransaction } from "../ai/categorization";

export async function parseTransactions(text: string): Promise<Transaction[]> {
  const lines = text.split('\n');
  const transactions: Transaction[] = [];
  
  const transactionPattern = /(\d{2}\/\d{2}\/\d{4})\s+([^0-9]+)\s+([\d,]+\.?\d*)/;
  
  for (const line of lines) {
    const match = line.match(transactionPattern);
    if (match) {
      const [_, date, description, amount] = match;
      const category = await categorizeTransaction(description.trim());
      
      transactions.push({
        id: generateTransactionId(),
        accountId: 'pending',
        date: formatDate(date),
        description: description.trim(),
        amount: parseAmount(amount),
        type: determineTransactionType(description),
        category,
      });
    }
  }
  
  return transactions;
}

function generateTransactionId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function formatDate(date: string): string {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}

function parseAmount(amount: string): number {
  return Number(amount.replace(/[,\s]/g, ''));
}

function determineTransactionType(description: string): 'credit' | 'debit' {
  const creditKeywords = ['salary', 'deposit', 'credit', 'transfer in'];
  return creditKeywords.some(keyword => 
    description.toLowerCase().includes(keyword)
  ) ? 'credit' : 'debit';
}