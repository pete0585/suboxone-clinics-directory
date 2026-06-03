import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink, Shield } from 'lucide-react'
import { getCityListings, getStateCounts } from '@/lib/data'
import { formatPhone, stateNameToAbbrev, stateAbbrevToName } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

interface PageProps {
  params: Promise<{ state: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const stateName = state.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' ')).toUpperCase()

  return {
    title: `Suboxone Clinics in ${cityName}, ${stateAbbrev} — Find MAT Treatment`,
    description: `Find suboxone clinics and buprenorphine MAT providers in ${cityName}, ${stateAbbrev}. Filter by Medicaid, telehealth, and accepting new patients.`,
    alternates: {
      canonical: `/suboxone-clinics/${state}/${city}`,
    },
    openGraph: {
      title: `Suboxone Clinics in ${cityName}, ${stateAbbrev} | SuboxoneClinicFinder`,
      description: `Browse MAT providers in ${cityName}. Medicaid accepted, telehealth available.`,
    },
  }
}

export async function generateStaticParams() {
  // Return empty array — city pages generated on demand via ISR
  return []
}

export const dynamicParams = true
export const revalidate = 86400

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const stateName = state.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' ')).toUpperCase()

  const listings = await getCityListings(cityName, stateAbbrev).catch(() => [])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Suboxone Clinics in ${cityName}, ${stateAbbrev}`,
    description: `Directory of suboxone clinics and MAT providers in ${cityName}, ${stateAbbrev}`,
    url: `https://www.suboxoneclinicfinder.com/suboxone-clinics/${state}/${city}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
        { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
        { '@type': 'ListItem', position: 3, name: stateName, item: `https://www.suboxoneclinicfinder.com/suboxone-clinics/${state}` },
        { '@type': 'ListItem', position: 4, name: `${cityName}, ${stateAbbrev}` },
      ],
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <Link href={`/suboxone-clinics/${state}`} className="hover:text-brand-teal">{stateName}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{cityName}</span>
      </nav>

      {/* Hero */}
      <div className="bg-brand-navy rounded-2xl text-white p-8 mb-8">
        <h1 className="text-3xl font-extrabold mb-3">
          Suboxone Clinics in {cityName}, {stateAbbrev}
        </h1>
        <p className="text-gray-300 text-lg mb-4">
          {listings.length > 0
            ? `${listings.length} MAT clinic${listings.length !== 1 ? 's' : ''} found in ${cityName}. Call to confirm current availability.`
            : `We're building our ${cityName} listing. Check back soon, or browse all ${stateName} clinics.`
          }
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/suboxone-clinics?state=${stateAbbrev}&city=${encodeURIComponent(cityName)}&medicaid=true`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
          >
            💳 Medicaid Only
          </Link>
          <Link
            href={`/suboxone-clinics?state=${stateAbbrev}&city=${encodeURIComponent(cityName)}&telehealth=true`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
          >
            💻 Telehealth Only
          </Link>
          <Link
            href={`/suboxone-clinics?state=${stateAbbrev}&city=${encodeURIComponent(cityName)}&accepting=true`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
          >
            ✅ Accepting Patients
          </Link>
        </div>
      </div>

      {/* Crisis notice */}
      <div className="bg-brand-amber-light border border-brand-amber rounded-xl p-4 mb-8 flex items-start gap-3">
        <Shield className="w-5 h-5 text-brand-amber flex-shrink-0 mt-0.5" aria-label="Help" />
        <div>
          <p className="text-sm font-semibold text-gray-900">Need immediate help?</p>
          <p className="text-sm text-gray-700">
            Call SAMHSA&apos;s free helpline: <a href="tel:18006624357" className="font-bold text-brand-amber hover:underline">1-800-662-4357</a> — 24/7, confidential, English & Spanish.
          </p>
        </div>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No clinics listed for {cityName} yet.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/suboxone-clinics/${state}`} className="btn-primary">
              Browse All {stateName} Clinics
            </Link>
            <Link href="/suboxone-clinics" className="btn-secondary">
              Search Nationwide
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-brand-navy">
            All Suboxone Clinics in {cityName}, {stateAbbrev}
          </h2>
          {listings.map((listing) => (
            <CityListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {/* FAQ section */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">
          Frequently Asked Questions — Suboxone Treatment in {cityName}
        </h2>
        <div className="space-y-6">
          <FaqItem
            question={`How do I find a suboxone clinic in ${cityName}?`}
            answer={`Use the listings above to find suboxone and buprenorphine providers in ${cityName}, ${stateAbbrev}. Filter by Medicaid acceptance, telehealth, and whether the clinic is accepting new patients. Call the clinic directly to confirm availability.`}
          />
          <FaqItem
            question="Does Medicaid cover suboxone treatment?"
            answer="Yes — Medicaid covers suboxone (buprenorphine) treatment in all 50 states as part of federal parity law requirements. Coverage details vary by state and plan. Use our Medicaid filter to find clinics that accept your coverage."
          />
          <FaqItem
            question="Can I get suboxone via telehealth?"
            answer="Yes. Since 2020, DEA rules allow buprenorphine prescribing via telemedicine without an in-person visit first. Many clinics in this directory offer video visits — use the telehealth filter to find them."
          />
          <FaqItem
            question="What is the difference between suboxone and methadone?"
            answer="Both treat opioid use disorder. Suboxone (buprenorphine/naloxone) is typically prescribed at an office and taken at home. Methadone for OUD is dispensed daily at a federally-registered OTP clinic. Suboxone is often more accessible and less stigmatized."
          />
        </div>
      </div>

      {/* Schema for FAQs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `How do I find a suboxone clinic in ${cityName}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Search our directory for suboxone and buprenorphine providers in ${cityName}, ${stateAbbrev}. Filter by Medicaid, telehealth, and accepting new patients.`,
                },
              },
              {
                '@type': 'Question',
                name: 'Does Medicaid cover suboxone treatment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Medicaid covers suboxone in all 50 states. Use our Medicaid filter to find clinics that accept your coverage.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  )
}

function CityListingCard({ listing }: { listing: SuboxoneListing }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Link href={`/clinic/${listing.slug}`} className="font-bold text-xl text-gray-900 hover:text-brand-teal transition-colors">
              {listing.clinic_name}
            </Link>
            {listing.listing_tier === 'featured' && (
              <span className="badge-featured">Featured</span>
            )}
            {listing.listing_tier === 'verified' && (
              <span className="badge-teal">Verified</span>
            )}
          </div>

          {listing.address && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4 flex-shrink-0" aria-label="Address" />
              {listing.address}, {listing.city}, {listing.state} {listing.zip}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
            {listing.accepts_medicaid && <span className="badge-teal">💳 Medicaid</span>}
            {listing.accepts_medicare && <span className="badge-navy">Medicare</span>}
            {listing.accepts_self_pay && <span className="badge-gray">Self-Pay</span>}
            {listing.telehealth_available && <span className="badge-navy">💻 Telehealth</span>}
            {listing.accepting_new_patients === true && <span className="badge-gray">✅ Accepting New Patients</span>}
            {listing.walk_in_available && <span className="badge-amber">🚶 Walk-in</span>}
            {listing.sliding_scale && <span className="badge-gray">Sliding Scale</span>}
          </div>

          {listing.services_offered && listing.services_offered.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Services:</span> {listing.services_offered.join(', ')}
            </p>
          )}

          {listing.bio && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">{listing.bio}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white text-sm font-semibold rounded-lg hover:bg-brand-teal-dark transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4" aria-label="Call" />
              {formatPhone(listing.phone)}
            </a>
          )}
          {listing.website_url && (
            <a
              href={listing.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-brand-teal transition-colors"
            >
              <ExternalLink className="w-4 h-4" aria-label="Website" />
              Website
            </a>
          )}
          <Link
            href={`/clinic/${listing.slug}`}
            className="text-center text-sm text-brand-teal hover:underline"
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-1">{question}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
    </div>
  )
}
