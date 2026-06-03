import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const listingId = searchParams.get('listing_id')
  const token = searchParams.get('token')

  if (!listingId || !token) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'
  return NextResponse.redirect(`${siteUrl}/claim/${listingId}?token=${token}`)
}
