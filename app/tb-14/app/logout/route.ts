import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    // Call logout API
    const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      credentials: 'include',
    })

    // Create redirect response
    const redirectResponse = NextResponse.redirect(new URL('/', request.url))

    // Clear cookie
    redirectResponse.cookies.set('session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })

    return redirectResponse
  } catch (error) {
    console.error('Logout error:', error)
    
    // Still redirect even if API call fails
    const redirectResponse = NextResponse.redirect(new URL('/', request.url))
    
    // Clear cookie
    redirectResponse.cookies.set('session-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/',
    })
    
    return redirectResponse
  }
}

