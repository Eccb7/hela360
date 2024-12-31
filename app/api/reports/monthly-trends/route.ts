import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getMonthlyTrends } from "@/lib/api/reports/transaction-analysis";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const trends = await getMonthlyTrends(session.user.id);
    return NextResponse.json(trends);
  } catch (error) {
    console.error("Error generating monthly trends:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}