import type { Metadata } from 'next'
import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'
import { getListingById } from '@/lib/data'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ verified?: string; token?: string }>
}

export const metadata: Metadata = {
  title: 'Claim Your Listing | SuboxoneClinicFinder',
  description: 'Claim and verify your suboxone clinic listing to manage your profile and upgrade to a verified listing.',
  robots: { index: false, follow: false },
}

export default async function ClaimPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const { verified, token } = await searchParams

  // Handle token verification
  if (token) {
    return <TokenVerification id={id} token={token} />
  }

  // Show upgrade page for verified listings
  if (verified === 'true') {
    return <UpgradePage id={id} />
  }

  // Default: claim form
  return <ClaimForm id={id} />
}

async function TokenVerification({ id, token }: { id: string; token: string }) {
  const supabase = await createServiceClient()

  const { data: claim } = await supabase
    .from('suboxone_claims')
    .select('*')
    .eq('listing_id', id)
    .eq('token', token)
    .eq('verified', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (!claim) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Link Expired or Invalid</h1>
        <p className="text-gray-600 mb-6">
          This verification link has expired or has already been used.
          Request a new verification email to claim your listing.
        </p>
        <Link href={`/claim/${id}`} className="btn-primary">
          Request New Link
        </Link>
      </div>
    )
  }

  // Verify the claim
  await supabase
    .from('suboxone_claims')
    .update({ verified: true, verified_at: new Date().toISOString() })
    .eq('id', claim.id)

  await supabase
    .from('suboxone_listings')
    .update({ claimed: true, claimed_at: new Date().toISOString() })
    .eq('id', id)

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-brand-navy mb-3">Listing Claimed!</h1>
      <p className="text-gray-600 mb-8">
        Your listing is now verified. Upgrade to a Verified plan to add insurance details,
        telehealth status, and get priority placement in search results.
      </p>
      <div className="space-y-3">
        <Link href={`/claim/${id}?verified=true`} className="w-full btn-primary block text-center">
          View Upgrade Options
        </Link>
        <Link href={`/clinic/${id}`} className="w-full btn-secondary block text-center">
          View My Listing
        </Link>
      </div>
    </div>
  )
}

async function UpgradePage({ id }: { id: string }) {
  const listing = await getListingById(id).catch(() => null)

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold text-brand-navy mb-2">Upgrade Your Listing</h1>
      <p className="text-gray-600 mb-8">
        Your listing is claimed. Upgrade to get more visibility and connect with more patients.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Verified tier */}
        <div className="card p-6 border-2 border-brand-teal">
          <div className="badge-teal mb-4 w-fit">Verified</div>
          <div className="text-3xl font-extrabold text-brand-navy mb-1">$249<span className="text-lg font-normal text-gray-500">/yr</span></div>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li>✅ Priority placement above free listings</li>
            <li>✅ Add full insurance details</li>
            <li>✅ Telehealth & new patient status</li>
            <li>✅ Business description</li>
            <li>✅ Verified badge</li>
          </ul>
          <UpgradeButton listingId={id} tier="verified" label="Upgrade to Verified" />
        </div>

        {/* Featured tier */}
        <div className="card p-6 border-2 border-brand-amber">
          <div className="badge-featured mb-4 w-fit">Featured ⭐</div>
          <div className="text-3xl font-extrabold text-brand-navy mb-1">$499<span className="text-lg font-normal text-gray-500">/yr</span></div>
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li>✅ Everything in Verified</li>
            <li>⭐ Top-of-results placement</li>
            <li>⭐ Featured badge & highlight</li>
            <li>⭐ Newsletter inclusion</li>
            <li>⭐ Priority patient inquiry queue</li>
          </ul>
          <UpgradeButton listingId={id} tier="featured" label="Upgrade to Featured" amber />
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Annual subscription. Cancel anytime. One new patient referral from Verified pays for 3 years of listings.
      </p>
    </div>
  )
}

function UpgradeButton({ listingId, tier, label, amber }: { listingId: string; tier: string; label: string; amber?: boolean }) {
  return (
    <form action="/api/upgrade" method="post">
      <input type="hidden" name="listing_id" value={listingId} />
      <input type="hidden" name="tier" value={tier} />
      <button type="submit" className={`w-full ${amber ? 'btn-amber' : 'btn-primary'}`}>
        {label}
      </button>
    </form>
  )
}

async function ClaimForm({ id }: { id: string }) {
  const listing = await getListingById(id).catch(() => null)

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-bold text-brand-navy mb-2">Claim Your Listing</h1>
      {listing && (
        <p className="text-gray-600 mb-8">
          Claim <strong>{listing.clinic_name}</strong> to manage your clinic profile, update insurance info, and upgrade to a verified listing.
        </p>
      )}

      <div className="card p-6">
        <form action="/api/claim" method="post" className="space-y-4">
          <input type="hidden" name="listing_id" value={id} />
          <div>
            <label htmlFor="email" className="label">Your Work Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="input"
              placeholder="admin@yourclinic.com"
            />
            <p className="text-xs text-gray-500 mt-1">Must match your clinic domain. We&apos;ll send a verification link.</p>
          </div>
          <button type="submit" className="w-full btn-primary">
            Send Verification Email
          </button>
        </form>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        Having trouble? Email us at{' '}
        <a href="mailto:hello@suboxoneclinicfinder.com" className="text-brand-teal hover:underline">
          hello@suboxoneclinicfinder.com
        </a>
      </p>
    </div>
  )
}
