import { NextRequest, NextResponse } from 'next/server'
import { getUpcomingFixtures } from '@/lib/api/sports'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateParam = searchParams.get('date') || undefined
    const items = await getUpcomingFixtures(dateParam || undefined)
    return NextResponse.json({ success: true, items }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, items: [], error: String(error?.message || 'error') },
      { status: 500 }
    )
  }
}

