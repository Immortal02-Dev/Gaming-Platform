import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { db } from '@/lib/database/connection'

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

    // Get user from database
    const user = await db.getUserById(String(payload.userId))

    if (!user) {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 })
    }

    // Return user without password hash
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
      birth_date: user.birth_date
    }

    return NextResponse.json({ success: true, user: userResponse })
  } catch {
    return NextResponse.json({ success: false, authenticated: false }, { status: 401 })
  }
}
