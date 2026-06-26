import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'http://localhost:5000'

export async function DELETE(request: NextRequest) {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)

    try {
      const backendResponse = await fetch(
        `${BACKEND_URL}/api/customer/qna/all`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Cookie: request.headers.get('cookie') || '',
          },
          credentials: 'include',
          signal: controller.signal,
        }
      )

      clearTimeout(timeoutId)

      const text = await backendResponse.text()
      let data: any = null
      if (text) {
        try {
          data = JSON.parse(text)
        } catch {
          data = null
        }
      }

      if (!backendResponse.ok) {
        return NextResponse.json(
          data || { success: false, message: 'Failed to delete all Q&A items' },
          { status: backendResponse.status }
        )
      }

      return NextResponse.json(
        data || { success: true, message: 'All Q&A items deleted successfully' },
        { status: backendResponse.status }
      )
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('Delete all QnA error:', fetchError)
      return NextResponse.json(
        { success: false, message: 'Failed to connect to backend' },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error('QnA DELETE ALL API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

