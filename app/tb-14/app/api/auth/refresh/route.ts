import { NextRequest, NextResponse } from 'next/server'
import { refreshSession, getSession, getSessionDuration } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  try {
    // Check if there's an active session
    const currentSession = await getSession()

    if (!currentSession) {
      return NextResponse.json(
        { success: false, error: 'No active session to refresh' },
        { status: 401 }
      )
    }

    // Refresh the session
    const sessionToken = await refreshSession()

    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: 'Failed to refresh session' },
        { status: 500 }
      )
    }

    // Create response with updated cookie
    const response = NextResponse.json({
      success: true,
      message: 'Session refreshed successfully'
    })

    // Set the refreshed session cookie
    const expiresAt = new Date(Date.now() + getSessionDuration())
    response.cookies.set('session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: expiresAt,
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Session refresh error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to refresh session' },
      { status: 500 }
    )
  }
}
