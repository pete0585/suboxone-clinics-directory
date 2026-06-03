import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function POST(req: NextRequest) {
  let data: Record<string, unknown> = {}

  const ct = req.headers.get('content-type') ?? ''
  if (ct.includes('application/json')) {
    data = await req.json().catch(() => ({}))
  } else {
    const formData = await req.formData().catch(() => null)
    if (formData) {
      for (const [k, v] of formData.entries()) {
        if (data[k]) {
          // Handle multiple values (checkboxes)
          const existing = data[k]
          data[k] = Array.isArray(existing) ? [...existing, v] : [existing, v]
        } else {
          data[k] = v
        }
      }
    }
  }

  const clinicName = data.clinic_name as string | undefined
  const city = data.city as string | undefined
  const state = data.state as string | undefined

  if (!clinicName || !city || !state) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'
    return NextResponse.redirect(`${siteUrl}/submit?error=missing_fields`, { status: 303 })
  }

  const baseSlug = slugify(`${clinicName}-${city}-${state}`)
  const suffix = Math.random().toString(36).slice(2, 6)
  const slug = `${baseSlug}-${suffix}`

  const insuranceValues = (data.insurance as string | string[] | undefined)
  const insurances = Array.isArray(insuranceValues) ? insuranceValues : insuranceValues ? [insuranceValues] : []
  const serviceValues = (data.services as string | string[] | undefined)
  const services = Array.isArray(serviceValues) ? serviceValues : serviceValues ? [serviceValues] : []

  const supabase = await createServiceClient()

  await supabase.from('suboxone_listings').insert({
    clinic_name: clinicName,
    slug,
    address: data.address as string ?? null,
    city,
    state: (state as string).toUpperCase().slice(0, 2),
    zip: data.zip as string ?? null,
    phone: data.phone as string ?? null,
    email: data.email as string ?? null,
    website_url: data.website_url as string ?? null,
    bio: data.bio as string ?? null,
    accepts_medicaid: insurances.includes('medicaid'),
    accepts_medicare: insurances.includes('medicare'),
    accepts_self_pay: insurances.includes('self_pay'),
    sliding_scale: insurances.includes('sliding_scale'),
    telehealth_available: data.telehealth === 'true' || data.telehealth === true,
    accepting_new_patients: data.accepting_new_patients === 'true' || data.accepting_new_patients === true,
    walk_in_available: data.walk_in === 'true' || data.walk_in === true,
    services_offered: services,
    listing_tier: 'free',
    listing_tier_rank: 0,
    is_active: true,
    is_approved: false,
    claimed: false,
    outreach_step: 0,
  })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'
  return NextResponse.redirect(`${siteUrl}/submit?success=true`, { status: 303 })
}
