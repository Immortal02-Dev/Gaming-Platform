import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    // Forward request to backend with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || '',
        },
        credentials: 'include',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Check if response is ok before parsing JSON
      if (!backendResponse.ok) {
        const errorText = await backendResponse.text()
        try {
          const errorData = JSON.parse(errorText)
          return NextResponse.json(errorData, { status: backendResponse.status })
        } catch {
          return NextResponse.json(
            { success: false, error: 'Backend request failed' },
            { status: backendResponse.status }
          )
        }
      }

      const data = await backendResponse.json()
      return NextResponse.json(data, { status: backendResponse.status })

    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      
      // Handle connection errors gracefully
      if (fetchError.code === 'ECONNREFUSED' || fetchError.name === 'AbortError' || fetchError.message?.includes('fetch failed')) {
        console.warn('Backend server is not available:', fetchError.message)
        return NextResponse.json(
          { 
            success: false, 
            error: 'Backend server is not available. Please ensure the backend server is running.',
          },
          { status: 503 } // Service Unavailable
        )
      }
      throw fetchError
    }

  } catch (error: any) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
