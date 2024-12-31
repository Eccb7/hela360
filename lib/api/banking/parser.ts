import { BankStatement, Transaction } from "./types";

export async function parsePDFStatement(file: File): Promise<BankStatement> {
  // This is where we'll implement PDF parsing logic
  // For now, return mock data
  return {
    accountId: "mock-account",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    transactions: [],
    openingBalance: 100000,
    closingBalance: 120000,
  };
}

export function categorizeTransaction(description: string): string {
  // Implement transaction categorization logic
  // This could be enhanced with AI/ML for better accuracy
  if (description.toLowerCase().includes("mpesa")) return "mobile_money";
  if (description.toLowerCase().includes("salary")) return "income";
  return "uncategorized";
}