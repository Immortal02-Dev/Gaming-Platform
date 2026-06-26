import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/database/connection";
import { SignJWT } from "jose";

const SESSION_SECRET =
  process.env.SESSION_SECRET || "your-super-secret-key-change-in-production";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (
      !body.username ||
      !body.password ||
      !body.nickname ||
      !body.bank ||
      !body.bankAccount ||
      !body.bankDepositor ||
      !body.birthDate ||
      !body.mobile ||
      !body.carrier
    ) {
      return NextResponse.json(
        { success: false, error: "필수 정보를 모두 입력해주세요." },
        { status: 400 },
      );
    }

    // Create user in local database
    const user = await db.createUser({
      username: body.username,
      nickname: body.nickname,
      password: body.password,
      bank_code: body.bank,
      bank_account: body.bankAccount,
      bank_depositor: body.bankDepositor,
      birth_date: body.birthDate,
      mobile: body.mobile,
      carrier: body.carrier,
      registration_code: body.registrationCode,
    });

    // Create session token
    const expiresAt = new Date(Date.now() + SESSION_DURATION);
    const sessionToken = await new SignJWT({
      userId: user.id,
      username: user.username,
      role: user.role,
      expiresAt: expiresAt.toISOString(),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(new TextEncoder().encode(SESSION_SECRET));

    // Prepare user response (exclude password hash)
    const userResponse = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      role: user.role,
      bank_code: user.bank_code,
      bank_account: user.bank_account,
      bank_depositor: user.bank_depositor,
      mobile: user.mobile,
      carrier: user.carrier,
      birth_date: user.birth_date,
    };

    // Create response
    const response = NextResponse.json({
      success: true,
      user: userResponse,
      session: {
        userId: user.id,
        username: user.username,
        role: user.role,
        expiresAt: expiresAt.toISOString(),
      },
    });

    // Set session token cookie
    response.cookies.set("session-token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION / 1000,
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);

    // Handle known errors
    if (error.message === "Username already exists") {
      return NextResponse.json(
        { success: false, error: "이미 사용 중인 아이디입니다." },
        { status: 409 },
      );
    }
    if (error.message === "Nickname already exists") {
      return NextResponse.json(
        { success: false, error: "이미 사용 중인 닉네임입니다." },
        { status: 409 },
      );
    }

    // Generic server error
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
