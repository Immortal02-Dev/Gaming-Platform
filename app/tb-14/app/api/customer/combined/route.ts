import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/customer`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || '',
        },
        credentials: 'include',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!backendResponse.ok) {
        return NextResponse.json(
          { success: false, faqs: [], notices: [] },
          { status: backendResponse.status }
        )
      }

      const data = await backendResponse.json()
      
      return NextResponse.json({
        success: true,
        faqs: data.faqs || [],
        notices: data.notices || []
      })

    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('Fetch error:', fetchError)
      return NextResponse.json(
        { success: false, faqs: [], notices: [] },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { success: false, faqs: [], notices: [] },
      { status: 500 }
    )
  }
}
