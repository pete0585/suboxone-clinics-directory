import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function POST(req: NextRequest) {
  const supabaseAuth = await createClient()
  const { data: { user } } = await supabaseAuth.auth.getUser()

  const adminEmail = process.env.ADMIN_EMAIL ?? 'adam@thestrategicveteran.com'
  if (!user || user.email !== adminEmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let listingId: string | undefined
  const ct = req.headers.get('content-type') ?? ''
  if (ct.includes('application/json')) {
    const body = await req.json().catch(() => ({}))
    listingId = body.listing_id
  } else {
    const formData = await req.formData().catch(() => null)
    listingId = formData?.get('listing_id') as string
  }

  if (!listingId) {
    return NextResponse.json({ error: 'listing_id required' }, { status: 400 })
  }

  const supabase = await createServiceClient()
  await supabase
    .from('suboxone_listings')
    .update({ is_approved: true })
    .eq('id', listingId)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'
  return NextResponse.redirect(`${siteUrl}/admin`, { status: 303 })
}
