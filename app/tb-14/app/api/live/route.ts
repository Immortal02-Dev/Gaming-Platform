import { NextResponse } from "next/server";
import { getLive } from "../../../lib/mockSports";

export async function GET() {
  const data = getLive();
  return NextResponse.json(data);
}
