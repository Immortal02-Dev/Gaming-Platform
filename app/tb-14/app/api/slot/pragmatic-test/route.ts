import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const providerParam = (searchParams.get('provider') || 'pragmatic').toLowerCase()

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/slot/games`, {
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
        const text = await backendResponse.text()
        return NextResponse.json(
          { success: false, backendOk: false, status: backendResponse.status, error: text },
          { status: backendResponse.status }
        )
      }

      const data = await backendResponse.json()
      const games = Array.isArray(data?.data) ? data.data : []

      const filtered = games.filter((g: any) => {
        const providerCode = String(g?.providerCode || '').toLowerCase()
        return providerCode.includes(providerParam)
      })

      return NextResponse.json({
        success: true,
        backendOk: true,
        backendUrl: BACKEND_URL,
        provider: providerParam,
        totalAll: games.length,
        totalProvider: filtered.length,
        sample: filtered.slice(0, 10).map((g: any) => ({
          id: g?.providerGameId || g?.id,
          providerCode: g?.providerCode,
          name: g?.name,
          thumbnail_url: g?.thumbnail_url,
        })),
      })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      return NextResponse.json(
        {
          success: false,
          backendOk: false,
          backendUrl: BACKEND_URL,
          provider: providerParam,
          error: fetchError?.message || 'fetch failed',
        },
        { status: 503 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        backendOk: false,
        backendUrl: BACKEND_URL,
        provider: providerParam,
        error: error?.message || 'Internal server error',
      },
      { status: 500 }
    )
  }
}
