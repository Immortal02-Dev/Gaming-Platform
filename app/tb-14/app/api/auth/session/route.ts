import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production'
const COOKIE_NAME = 'session-token'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value

    if (!token) {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 })
    }

    const encodedKey = new TextEncoder().encode(SESSION_SECRET)
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ['HS256'] })

    if (!payload || !payload.userId) {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 })
    }

    const session = {
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
      expiresAt: payload.expiresAt,
    }

    const user = {
      id: payload.userId,
      username: payload.username,
      role: payload.role,
    }

    return NextResponse.json({ success: true, authenticated: true, user, session })
  } catch {
    return NextResponse.json({ success: false, authenticated: false }, { status: 401 })
  }
}
