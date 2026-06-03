import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  let listingId: string | undefined
  let email: string | undefined

  const ct = req.headers.get('content-type') ?? ''
  if (ct.includes('application/json')) {
    const body = await req.json().catch(() => ({}))
    listingId = body.listing_id
    email = body.email
  } else {
    const formData = await req.formData().catch(() => null)
    if (formData) {
      listingId = formData.get('listing_id') as string
      email = formData.get('email') as string
    }
  }

  if (!listingId || !email) {
    return NextResponse.json({ error: 'listing_id and email required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  // Verify listing exists
  const { data: listing } = await supabase
    .from('suboxone_listings')
    .select('id, clinic_name, slug')
    .eq('id', listingId)
    .single()

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString()

  // Upsert claim record
  await supabase.from('suboxone_claims').upsert({
    listing_id: listingId,
    email,
    token,
    verified: false,
    expires_at: expiresAt,
    created_at: new Date().toISOString(),
  }, { onConflict: 'listing_id' })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'
  const verifyUrl = `${siteUrl}/claim/${listingId}?token=${token}`

  // Send verification email via Resend (fire-and-forget)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const emailPayload = {
      from: `SuboxoneClinicFinder <hello@mail.suboxoneclinicfinder.com>`,
      to: [email],
      subject: `Verify your claim for ${listing.clinic_name}`,
      html: `
        <h2>Verify your listing claim</h2>
        <p>Click the link below to verify your claim for <strong>${listing.clinic_name}</strong> on SuboxoneClinicFinder.</p>
        <p><a href="${verifyUrl}" style="background:#0EA57E;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Verify My Claim</a></p>
        <p>This link expires in 72 hours.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
      `,
    }

    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    }).catch(() => {})
  }

  // For form post, redirect back
  if (req.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
    return NextResponse.redirect(
      `${siteUrl}/claim/${listingId}?sent=true`,
      { status: 303 }
    )
  }

  return NextResponse.json({ success: true, message: 'Verification email sent' })
}
