import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getTransactions, getTransactionStats } from "@/lib/api/banking/repository";
import { z } from "zod";

const querySchema = z.object({
  accountId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  category: z.string().optional(),
  period: z.enum(["day", "month", "year"]).optional(),
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = querySchema.parse(Object.fromEntries(searchParams));

    const [transactions, stats] = await Promise.all([
      getTransactions(session.user.id, {
        accountId: query.accountId,
        startDate: query.startDate ? new Date(query.startDate) : undefined,
        endDate: query.endDate ? new Date(query.endDate) : undefined,
        category: query.category,
      }),
      query.period ? getTransactionStats(session.user.id, query.period) : null,
    ]);

    return NextResponse.json({ transactions, stats });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}