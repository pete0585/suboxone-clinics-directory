import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, ExternalLink, CheckCircle, ArrowLeft } from 'lucide-react'
import { getListingBySlug } from '@/lib/data'
import { formatPhone, stateAbbrevToName } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)
  if (!listing) return { title: 'Clinic Not Found' }

  return {
    title: `${listing.clinic_name} — Suboxone Clinic in ${listing.city}, ${listing.state}`,
    description: listing.bio
      ? listing.bio.slice(0, 155)
      : `Find suboxone and buprenorphine MAT treatment at ${listing.clinic_name} in ${listing.city}, ${listing.state}.`,
    alternates: { canonical: `/listings/${slug}` },
    openGraph: {
      title: `${listing.clinic_name} | SuboxoneClinicFinder`,
      description: `Suboxone clinic in ${listing.city}, ${listing.state}`,
    },
  }
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)

  if (!listing) notFound()

  const isClaimed = listing.claimed === true
  const stateName = stateAbbrevToName(listing.state)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: listing.clinic_name,
    description: listing.bio ?? `Suboxone clinic providing medication-assisted treatment in ${listing.city}, ${listing.state}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address ?? undefined,
      addressLocality: listing.city,
      addressRegion: listing.state,
      postalCode: listing.zip ?? undefined,
      addressCountry: 'US',
    },
    ...(isClaimed && listing.phone ? { telephone: listing.phone } : {}),
    ...(isClaimed && listing.website_url ? { url: listing.website_url } : {}),
    medicalSpecialty: 'Addiction Medicine',
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/suboxone-clinics" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-teal transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to directory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h1 className="text-2xl font-extrabold text-brand-navy">{listing.clinic_name}</h1>
                  {listing.listing_tier === 'featured' && <span className="badge-featured">Featured</span>}
                  {listing.listing_tier === 'verified' && <span className="badge-teal">Verified</span>}
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {listing.address ? `${listing.address}, ` : ''}{listing.city}, {listing.state}
                    {listing.zip ? ` ${listing.zip}` : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
              {listing.accepts_medicaid && <span className="badge-teal">💳 Medicaid Accepted</span>}
              {listing.accepts_medicare && <span className="badge-navy">Medicare Accepted</span>}
              {listing.accepts_self_pay && <span className="badge-gray">Self-Pay</span>}
              {listing.telehealth_available && <span className="badge-navy">💻 Telehealth Available</span>}
              {listing.accepting_new_patients === true && <span className="badge-teal">✅ Accepting New Patients</span>}
              {listing.walk_in_available && <span className="badge-amber">🚶 Walk-in Available</span>}
            </div>
          </div>

          {isClaimed && listing.bio && (
            <div className="card p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-3">About This Clinic</h2>
              <p className="text-gray-700 leading-relaxed">{listing.bio}</p>
            </div>
          )}

          {listing.services_offered && listing.services_offered.length > 0 && (
            <div className="card p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-3">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {listing.services_offered.map((s: string) => (
                  <span key={s} className="badge-gray capitalize">{s}</span>
                ))}
              </div>
            </div>
          )}

          {!isClaimed && (
            <div className="bg-brand-navy-light border border-brand-navy/20 rounded-xl p-5">
              <p className="text-sm font-semibold text-brand-navy mb-1">Are you the owner of this clinic?</p>
              <p className="text-sm text-gray-600 mb-3">
                Claim your free listing to update insurance info, telehealth status, and mark yourself as accepting new patients.
              </p>
              <Link href={`/claim/${listing.id}`} className="btn-primary text-sm py-2 px-4">
                Claim This Listing
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <h2 className="font-bold text-brand-navy mb-4">Contact</h2>
            {isClaimed ? (
              <div className="space-y-3">
                {listing.phone && (
                  <a
                    href={`tel:${listing.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {formatPhone(listing.phone)}
                  </a>
                )}
                {listing.website_url && (
                  <a
                    href={listing.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:border-brand-teal transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </a>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">Phone and website visible after listing is claimed.</p>
                <a href={`/claim/${listing.id}`} className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline">
                  Is this you? Claim your profile →
                </a>
              </div>
            )}
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-brand-navy mb-3 text-sm">Location</h2>
            {listing.address && <p className="text-sm text-gray-700 mb-1">{listing.address}</p>}
            <p className="text-sm text-gray-700">{listing.city}, {listing.state} {listing.zip ?? ''}</p>
            <p className="text-sm text-gray-500 mt-1">{stateName}</p>
            {listing.address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${listing.clinic_name} ${listing.address ?? ''} ${listing.city} ${listing.state}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-teal hover:underline"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            )}
          </div>

          <div className="bg-brand-amber rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-bold text-sm">Need immediate help?</span>
            </div>
            <p className="text-sm mb-3">SAMHSA&apos;s free helpline — 24/7, confidential</p>
            <a href="tel:18006624357" className="text-white font-bold text-lg hover:underline block">
              1-800-662-4357
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
