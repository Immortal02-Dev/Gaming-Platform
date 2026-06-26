import { NextResponse } from "next/server";
import { lockSelection } from "../../../lib/mockSports";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { selectionId, lockMillis } = body;
  if (!selectionId)
    return new Response(
      JSON.stringify({ success: false, message: "selectionId required" }),
      { status: 400 }
    );
  const res = lockSelection(
    selectionId,
    typeof lockMillis === "number" ? lockMillis : 5000
  );
  return NextResponse.json(res);
}
