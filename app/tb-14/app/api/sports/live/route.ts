import { NextRequest, NextResponse } from 'next/server'
import { getLiveFixtures } from '@/lib/api/sports'

export async function GET(_request: NextRequest) {
  try {
    const items = await getLiveFixtures()
    return NextResponse.json({ success: true, items }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, items: [], error: String(error?.message || 'error') },
      { status: 500 }
    )
  }
}

