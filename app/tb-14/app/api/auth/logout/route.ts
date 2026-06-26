import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' }, { status: 200 })
    
    // Clear session cookie
    response.cookies.set('session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    const response = NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
    
    response.cookies.set('session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    })
    
    return response
  }
}
