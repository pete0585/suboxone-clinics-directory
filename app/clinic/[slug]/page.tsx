import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, ExternalLink, Shield, CheckCircle } from 'lucide-react'
import { getListingBySlug, getAllSlugs } from '@/lib/data'
import { formatPhone, stateAbbrevToName } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)

  if (!listing) {
    return { title: 'Clinic Not Found' }
  }

  return {
    title: `${listing.clinic_name} — Suboxone Clinic in ${listing.city}, ${listing.state}`,
    description: listing.bio
      ? listing.bio.slice(0, 155)
      : `Find suboxone and buprenorphine MAT treatment at ${listing.clinic_name} in ${listing.city}, ${listing.state}. Call for availability.`,
    alternates: { canonical: `/clinic/${slug}` },
    openGraph: {
      title: `${listing.clinic_name} | SuboxoneClinicFinder`,
      description: `Suboxone clinic in ${listing.city}, ${listing.state}`,
    },
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs().catch(() => [])
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = true
export const revalidate = 86400

export default async function ClinicDetailPage({ params }: PageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug).catch(() => null)

  if (!listing) notFound()

  const stateName = stateAbbrevToName(listing.state)
  const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-')
  const citySlug = listing.city.toLowerCase().replace(/\s+/g, '-')

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
    ...(listing.phone ? { telephone: listing.phone } : {}),
    ...(listing.website_url ? { url: listing.website_url } : {}),
    medicalSpecialty: 'Addiction Medicine',
    availableService: (listing.services_offered ?? []).map((s) => ({
      '@type': 'MedicalProcedure',
      name: s,
    })),
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <Link href={`/suboxone-clinics/${stateSlug}`} className="hover:text-brand-teal">{stateName}</Link>
        <span className="mx-2">/</span>
        <Link href={`/suboxone-clinics/${stateSlug}/${citySlug}`} className="hover:text-brand-teal">{listing.city}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 truncate">{listing.clinic_name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header card */}
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h1 className="text-2xl font-extrabold text-brand-navy">{listing.clinic_name}</h1>
                  {listing.listing_tier === 'featured' && (
                    <span className="badge-featured">Featured</span>
                  )}
                  {listing.listing_tier === 'verified' && (
                    <span className="badge-teal">Verified</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" aria-label="Location" />
                  <span>
                    {listing.address ? `${listing.address}, ` : ''}
                    {listing.city}, {listing.state}
                    {listing.zip ? ` ${listing.zip}` : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Key badges */}
            <div className="flex flex-wrap gap-2">
              {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
              {listing.accepts_medicaid && <span className="badge-teal">💳 Medicaid Accepted</span>}
              {listing.accepts_medicare && <span className="badge-navy">Medicare Accepted</span>}
              {listing.accepts_self_pay && <span className="badge-gray">Self-Pay</span>}
              {listing.telehealth_available && <span className="badge-navy">💻 Telehealth Available</span>}
              {listing.accepting_new_patients === true && (
                <span className="badge-teal">✅ Accepting New Patients</span>
              )}
              {listing.accepting_new_patients === false && (
                <span className="badge-gray">Not Currently Accepting</span>
              )}
              {listing.walk_in_available && <span className="badge-amber">🚶 Walk-in Available</span>}
              {listing.sliding_scale && <span className="badge-gray">Sliding Scale Fee</span>}
            </div>
          </div>

          {/* About */}
          {listing.bio && (
            <div className="card p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-3">About This Clinic</h2>
              <p className="text-gray-700 leading-relaxed">{listing.bio}</p>
            </div>
          )}

          {/* Services */}
          {listing.services_offered && listing.services_offered.length > 0 && (
            <div className="card p-6">
              <h2 className="font-bold text-brand-navy text-lg mb-3">Services Offered</h2>
              <div className="flex flex-wrap gap-2">
                {listing.services_offered.map((service) => (
                  <span key={service} className="badge-gray capitalize">{service}</span>
                ))}
              </div>
            </div>
          )}

          {/* Insurance */}
          <div className="card p-6">
            <h2 className="font-bold text-brand-navy text-lg mb-4">Insurance & Payment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InsuranceBadge accepted={listing.accepts_medicaid} label="Medicaid" />
              <InsuranceBadge accepted={listing.accepts_medicare} label="Medicare" />
              <InsuranceBadge accepted={listing.accepts_self_pay} label="Self-Pay" />
              <InsuranceBadge accepted={listing.sliding_scale} label="Sliding Scale" />
            </div>
            {listing.insurances_accepted && listing.insurances_accepted.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Also accepts:</p>
                <div className="flex flex-wrap gap-2">
                  {listing.insurances_accepted.map((ins) => (
                    <span key={ins} className="badge-gray text-xs">{ins}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Not claimed notice */}
          {!listing.claimed && (
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

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Contact card */}
          <div className="card p-5">
            <h2 className="font-bold text-brand-navy mb-4">Contact</h2>
            <div className="space-y-3">
              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors"
                >
                  <Phone className="w-5 h-5" aria-label="Call" />
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
                  <ExternalLink className="w-4 h-4" aria-label="Website" />
                  Visit Website
                </a>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Call to confirm availability before visiting
            </p>
          </div>

          {/* Location */}
          <div className="card p-5">
            <h2 className="font-bold text-brand-navy mb-3 text-sm">Location</h2>
            {listing.address && (
              <p className="text-sm text-gray-700 mb-1">{listing.address}</p>
            )}
            <p className="text-sm text-gray-700">{listing.city}, {listing.state} {listing.zip}</p>
            {listing.address && (
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${listing.clinic_name} ${listing.address ?? ''} ${listing.city} ${listing.state}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-brand-teal hover:underline"
              >
                <MapPin className="w-4 h-4" aria-label="Map" />
                Get Directions
              </a>
            )}
          </div>

          {/* Help banner */}
          <div className="bg-brand-amber rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5" aria-label="Help" />
              <span className="font-bold text-sm">Need immediate help?</span>
            </div>
            <p className="text-sm mb-3">SAMHSA&apos;s free helpline — 24/7, confidential</p>
            <a href="tel:18006624357" className="text-white font-bold text-lg hover:underline block">
              1-800-662-4357
            </a>
          </div>

          {/* Upgrade prompt for verified listings */}
          {listing.claimed && listing.listing_tier === 'free' && (
            <div className="card p-5 border-brand-teal">
              <h3 className="font-bold text-brand-navy text-sm mb-2">Upgrade to Verified</h3>
              <p className="text-xs text-gray-600 mb-3">
                Get more visibility and let patients know you&apos;re accepting their insurance.
              </p>
              <button
                onClick={() => {
                  fetch('/api/upgrade', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ listing_id: listing.id, tier: 'verified' }),
                  })
                    .then((r) => r.json())
                    .then((d) => { if (d.url) window.location.href = d.url })
                }}
                className="w-full btn-amber text-sm py-2"
              >
                Upgrade — $249/yr
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InsuranceBadge({ accepted, label }: { accepted: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
      accepted ? 'bg-brand-teal-light text-brand-teal-dark' : 'bg-gray-50 text-gray-400'
    }`}>
      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${accepted ? 'text-brand-teal' : 'text-gray-300'}`} aria-label={accepted ? 'Accepted' : 'Not accepted'} />
      <span className={accepted ? 'font-medium' : ''}>{label}</span>
      {!accepted && <span className="text-xs text-gray-400 ml-auto">Not listed</span>}
    </div>
  )
}
