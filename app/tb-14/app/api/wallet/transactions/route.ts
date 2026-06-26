import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    const backendUrl = new URL(`${BACKEND_URL}/api/wallet/transactions`);
    request.nextUrl.searchParams.forEach((value, key) => {
      backendUrl.searchParams.set(key, value);
    });

    const backendResponse = await fetch(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Cookie: `token=${token}` } : {}),
      },
      credentials: "include",
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(data, { status: backendResponse.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Wallet transactions API error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
