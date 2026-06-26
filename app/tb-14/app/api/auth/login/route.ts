import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/database/connection'
import { SignJWT } from 'jose'

const SESSION_SECRET = process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.username || !body.password) {
      return NextResponse.json(
        { success: false, error: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }

    // Authenticate user
    const user = await db.authenticateUser({
      username: body.username,
      password: body.password
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      )
    }

    // Create session token
    const expiresAt = new Date(Date.now() + SESSION_DURATION)
    const sessionToken = await new SignJWT({
      userId: user.id,
      username: user.username,
      role: user.role,
      expiresAt: expiresAt.toISOString()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(new TextEncoder().encode(SESSION_SECRET))

    // Prepare user response (exclude password hash)
    const userResponse = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      role: user.role
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      user: userResponse,
      session: {
        userId: user.id,
        username: user.username,
        role: user.role,
        expiresAt: expiresAt.toISOString()
      }
    })

    // Set session token cookie
    response.cookies.set('session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION / 1000
    })

    return response

  } catch (error: any) {
    console.error('Login error:', error)

    // Generic server error
    return NextResponse.json(
      { success: false, error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
