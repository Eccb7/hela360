import { prisma } from "@/lib/prisma";

export async function getMonthlyTrends(userId: string) {
  return prisma.$queryRaw`
    WITH monthly_stats AS (
      SELECT 
        date_trunc('month', date) as month,
        SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'DEBIT' THEN amount ELSE 0 END) as expenses
      FROM "Transaction"
      WHERE "userId" = ${userId}
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12
    )
    SELECT 
      month,
      income,
      expenses,
      income - expenses as savings,
      CASE 
        WHEN LAG(expenses) OVER (ORDER BY month) = 0 THEN 0
        ELSE ((expenses - LAG(expenses) OVER (ORDER BY month)) / LAG(expenses) OVER (ORDER BY month)) * 100 
      END as expense_growth
    FROM monthly_stats;
  `;
}

export async function getCategoryBreakdown(userId: string, startDate: Date, endDate: Date) {
  return prisma.transaction.groupBy({
    by: ['category'],
    where: {
      userId,
      date: { gte: startDate, lte: endDate },
    },
    _sum: { amount: true },
    _count: true,
  });
}