import { NextResponse } from "next/server";
import { getEventMarkets } from "../../../../lib/mockSports";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = getEventMarkets(id);
  if (!data)
    return new Response(JSON.stringify({ message: "not found" }), {
      status: 404,
    });
  return NextResponse.json(data);
}
