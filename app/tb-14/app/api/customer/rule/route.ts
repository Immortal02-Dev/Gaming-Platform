import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:5000'

export async function GET(request: NextRequest) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/customer/rule`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: request.headers.get('cookie') || '',
        },
        credentials: 'include',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!backendResponse.ok) {
        return NextResponse.json(
          { success: false, items: [] },
          { status: backendResponse.status }
        )
      }

      const data = await backendResponse.json()
      const items =
        (Array.isArray((data as any).items) && (data as any).items) ||
        []

      return NextResponse.json(
        {
          success: true,
          items,
        },
        { status: 200 }
      )
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      return NextResponse.json(
        { success: false, items: [] },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, items: [] },
      { status: 500 }
    )
  }
}
