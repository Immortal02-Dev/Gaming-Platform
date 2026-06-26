import { NextResponse } from "next/server";
import { calcMultiBet } from "@/lib/mockSports";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { selections } = body;
  if (!Array.isArray(selections) || selections.length === 0) {
    return new Response(
      JSON.stringify({ success: false, message: "selections required" }),
      { status: 400 }
    );
  }
  const res = calcMultiBet(selections);
  if (!res.success) return new Response(JSON.stringify(res), { status: 400 });
  return NextResponse.json(res);
}
