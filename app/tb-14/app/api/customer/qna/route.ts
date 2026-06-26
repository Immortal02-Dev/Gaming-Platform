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
      const backendResponse = await fetch(`${BACKEND_URL}/api/customer/qna`, {
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
          { success: false, qna: [] },
          { status: backendResponse.status }
        )
      }

      const data = await backendResponse.json()

      return NextResponse.json(
        {
          success: data.success ?? true,
          qna: data.qna || [],
        },
        { status: 200 }
      )
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('Fetch QnA error:', fetchError)
      return NextResponse.json(
        { success: false, qna: [] },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('QnA API error:', error)
    return NextResponse.json(
      { success: false, qna: [] },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: any
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Failed to parse QnA request body:', parseError)
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      )
    }

    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: '제목과 내용을 입력해주세요.' },
        { status: 400 }
      )
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/customer/qna`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: request.headers.get('cookie') || '',
        },
        credentials: 'include',
        body: JSON.stringify(body),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text()
        try {
          const errorData = JSON.parse(errorText)
          return NextResponse.json(errorData, {
            status: backendResponse.status,
          })
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
      console.error('Create QnA error:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Failed to connect to backend' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('QnA POST API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
