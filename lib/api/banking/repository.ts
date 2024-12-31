import { prisma } from "@/lib/prisma";
import { BankAccount, Transaction } from "@prisma/client";
import { BankStatement } from "./types";

export async function createBankAccount(
  userId: string,
  data: Omit<BankAccount, "id" | "userId" | "createdAt" | "updatedAt" | "lastSync">
) {
  return prisma.bankAccount.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function getBankAccounts(userId: string) {
  return prisma.bankAccount.findMany({
    where: { userId },
    include: {
      _count: {
        select: { transactions: true },
      },
    },
  });
}

export async function saveTransactions(userId: string, accountId: string, statement: BankStatement) {
  const transactions = statement.transactions.map((tx) => ({
    userId,
    accountId,
    date: new Date(tx.date),
    description: tx.description,
    amount: tx.amount,
    type: tx.type.toUpperCase() as "CREDIT" | "DEBIT",
    category: tx.category,
    reference: tx.reference,
  }));

  await prisma.$transaction([
    // Save transactions
    prisma.transaction.createMany({
      data: transactions,
    }),
    // Update account balance
    prisma.bankAccount.update({
      where: { id: accountId },
      data: {
        balance: statement.closingBalance,
        lastSync: new Date(),
      },
    }),
  ]);
}

export async function getTransactions(
  userId: string,
  filters?: {
    accountId?: string;
    startDate?: Date;
    endDate?: Date;
    category?: string;
  }
) {
  return prisma.transaction.findMany({
    where: {
      userId,
      accountId: filters?.accountId,
      date: {
        gte: filters?.startDate,
        lte: filters?.endDate,
      },
      category: filters?.category,
    },
    orderBy: { date: "desc" },
    include: {
      account: true,
    },
  });
}

export async function getTransactionStats(userId: string, period: "day" | "month" | "year") {
  const groupBy = period === "day" ? "date" : 
                 period === "month" ? "month" : "year";

  return prisma.$queryRaw`
    SELECT 
      date_trunc(${groupBy}, date) as period,
      SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type = 'DEBIT' THEN amount ELSE 0 END) as expenses,
      SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE -amount END) as net
    FROM "Transaction"
    WHERE "userId" = ${userId}
    GROUP BY period
    ORDER BY period DESC
  `;
}