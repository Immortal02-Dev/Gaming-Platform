import { NextResponse } from "next/server";
import { getSidebar } from "@/lib/mockSports";

export async function GET() {
  const data = getSidebar();
  return NextResponse.json(data);
}
