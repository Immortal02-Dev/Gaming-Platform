import { NextResponse, NextRequest } from "next/server";
import { getEventMarkets } from "@/lib/mockSports";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = getEventMarkets(id);
  if (!data)
    return new Response(JSON.stringify({ message: "not found" }), {
      status: 404,
    });
  return NextResponse.json(data);
}
