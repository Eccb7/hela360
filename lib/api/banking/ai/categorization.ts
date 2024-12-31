import { prisma } from "@/lib/prisma";
import { CategoryRules } from "./rules";

export async function categorizeTransaction(
  description: string,
  userId: string
): Promise<string> {
  const normalizedDesc = description.toLowerCase();
  
  // First, check if we have a similar transaction in the user's history
  const similarTransaction = await prisma.transaction.findFirst({
    where: {
      userId,
      description: {
        contains: description,
        mode: 'insensitive',
      },
      category: {
        not: 'uncategorized',
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  if (similarTransaction) {
    return similarTransaction.category;
  }

  // Apply rule-based categorization
  for (const [category, rules] of Object.entries(CategoryRules)) {
    if (rules.some(rule => normalizedDesc.includes(rule))) {
      return category;
    }
  }
  
  return 'uncategorized';
}

export async function updateTransactionCategory(
  transactionId: string,
  category: string,
  userId: string
) {
  return prisma.transaction.update({
    where: {
      id: transactionId,
      userId,
    },
    data: {
      category,
    },
  });
}