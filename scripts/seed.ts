/**
 * Seed script for Suboxone Clinic Finder
 *
 * Sources:
 * 1. SAMHSA OTP Directory: https://dpt2.samhsa.gov/treatment/directory.aspx
 *    ~1,800 registered OTPs. Export via the directory search tool.
 * 2. DataForSEO Maps: "suboxone clinic" + "MAT clinic" across top 200 US cities
 * 3. NPPES bulk download: addiction medicine taxonomy codes
 *    207LA0401X (Addiction Medicine), 2084A0401X (Addiction Psychiatry), 261QA0600X
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx ts-node scripts/seed.ts
 *
 * Or use the data-seeder agent with suboxone-clinics slug.
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Example seed records — replace with SAMHSA OTP data
const SAMPLE_LISTINGS = [
  {
    clinic_name: 'Houston MAT Clinic',
    city: 'Houston',
    state: 'TX',
    zip: '77001',
    phone: '(713) 555-0100',
    is_otp: false,
    accepts_medicaid: true,
    telehealth_available: true,
    accepting_new_patients: true,
    services_offered: ['buprenorphine'],
    listing_tier: 'free',
    listing_tier_rank: 0,
    is_active: true,
    is_approved: true,
  },
]

async function seed() {
  console.log('Seeding suboxone_listings...')

  for (const listing of SAMPLE_LISTINGS) {
    const baseSlug = slugify(`${listing.clinic_name}-${listing.city}-${listing.state}`)
    const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`

    const { error } = await supabase.from('suboxone_listings').insert({
      ...listing,
      slug,
      claimed: false,
      outreach_step: 0,
    })

    if (error) {
      console.error(`Failed to insert ${listing.clinic_name}:`, error.message)
    } else {
      console.log(`Inserted: ${listing.clinic_name} (${listing.city}, ${listing.state})`)
    }
  }

  console.log('Seed complete.')
}

seed().catch(console.error)
