import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const searchSchema = z.object({
  query: z.string().min(1),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  categories: z.array(z.string()).optional(),
  minAmount: z.number().optional(),
  maxAmount: z.number().optional(),
});

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const params = searchSchema.parse({
      query: searchParams.get("query"),
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
      categories: searchParams.getAll("category"),
      minAmount: searchParams.get("minAmount") ? Number(searchParams.get("minAmount")) : undefined,
      maxAmount: searchParams.get("maxAmount") ? Number(searchParams.get("maxAmount")) : undefined,
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
        description: {
          contains: params.query,
          mode: "insensitive",
        },
        date: {
          gte: params.startDate ? new Date(params.startDate) : undefined,
          lte: params.endDate ? new Date(params.endDate) : undefined,
        },
        category: params.categories?.length 
          ? { in: params.categories }
          : undefined,
        amount: {
          gte: params.minAmount,
          lte: params.maxAmount,
        },
      },
      include: {
        account: true,
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error searching transactions:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}