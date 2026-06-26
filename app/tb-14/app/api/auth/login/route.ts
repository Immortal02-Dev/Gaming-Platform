import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError)
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.username || !body.password) {
      return NextResponse.json(
        { success: false, error: '아이디와 비밀번호를 입력해주세요.' },
        { status: 400 }
      )
    }
    
    // Forward request to backend with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout for login

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || '',
        },
        credentials: 'include',
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Check if response is ok before parsing JSON
      if (!backendResponse.ok) {
        const errorText = await backendResponse.text()
        try {
          const errorData = JSON.parse(errorText)
          return NextResponse.json(
            { success: false, error: errorData.error || errorData.message || 'Login failed' },
            { status: backendResponse.status }
          )
        } catch {
          return NextResponse.json(
            { success: false, error: 'Backend request failed' },
            { status: backendResponse.status }
          )
        }
      }

      // Parse JSON response
      let data
      try {
        const responseText = await backendResponse.text()
        if (!responseText) {
          throw new Error('Empty response from backend')
        }
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse backend response:', parseError)
        return NextResponse.json(
          { 
            success: false, 
            error: '백엔드 응답을 처리할 수 없습니다.' 
          },
          { status: 502 }
        )
      }

      // Backend returns {token, user} — create a local session cookie
      const { SignJWT } = await import('jose')
      const SESSION_SECRET = process.env.SESSION_SECRET || 'your-super-secret-key-change-in-production'
      const encodedKey = new TextEncoder().encode(SESSION_SECRET)
      const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000
      const expiresAt = new Date(Date.now() + SESSION_DURATION)

      const sessionPayload = {
        userId: String(data.user?.id || ''),
        username: data.user?.username || '',
        role: data.user?.role || 'user',
        expiresAt: expiresAt.toISOString(),
      }

      const sessionToken = await new SignJWT(sessionPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresAt)
        .sign(encodedKey)

      const user = {
        id: data.user?.id,
        username: data.user?.username,
        email_or_phone: data.user?.email_or_phone,
        referral_code: data.user?.referral_code,
        role: data.user?.role || 'user',
      }

      const response = NextResponse.json({
        success: true,
        user,
        session: sessionPayload,
      })

      response.cookies.set('session-token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: SESSION_DURATION / 1000,
      })

      return response

    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      // Handle connection errors gracefully
      if (fetchError.code === 'ECONNREFUSED' || fetchError.name === 'AbortError' || fetchError.message?.includes('fetch failed')) {
        console.warn('Backend server is not available:', fetchError.message)
        return NextResponse.json(
          { 
            success: false, 
            error: '백엔드 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.' 
          },
          { status: 503 } // Service Unavailable
        )
      }
      throw fetchError
    }

  } catch (error: any) {
    console.error('Login error:', error)
    
    // Provide more specific error messages
    let errorMessage = '서버 오류가 발생했습니다.'
    if (error.message) {
      errorMessage = error.message
    } else if (error.name === 'SyntaxError') {
      errorMessage = '응답 형식 오류가 발생했습니다.'
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
