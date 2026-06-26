import { NextResponse } from "next/server";
import { getPreMatch } from "@/lib/mockSports";

export async function GET() {
  const data = getPreMatch();
  return NextResponse.json(data);
}
