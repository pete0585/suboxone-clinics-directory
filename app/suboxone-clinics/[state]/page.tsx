import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'
import { getStateListings, getStateCounts } from '@/lib/data'
import { formatPhone, stateNameToAbbrev, stateAbbrevToName } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

interface PageProps {
  params: Promise<{ state: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params
  const stateName = state.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))

  return {
    title: `Suboxone Clinics in ${stateName} — Find MAT Treatment`,
    description: `Find suboxone clinics and buprenorphine MAT providers in ${stateName}. Filter by Medicaid, telehealth, and accepting new patients.`,
    alternates: {
      canonical: `/suboxone-clinics/${state}`,
    },
    openGraph: {
      title: `Suboxone Clinics in ${stateName} | SuboxoneClinicFinder`,
      description: `Browse MAT providers in ${stateName}. Medicaid accepted, telehealth available.`,
    },
  }
}

export async function generateStaticParams() {
  const counts = await getStateCounts().catch(() => ({}))
  const states = Object.keys(counts)

  return states.map((abbrev) => ({
    state: stateAbbrevToName(abbrev).toLowerCase().replace(/\s+/g, '-'),
  }))
}

export default async function StatePage({ params }: PageProps) {
  const { state } = await params
  const stateName = state.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const stateAbbrev = stateNameToAbbrev(state.replace(/-/g, ' '))

  const listings = await getStateListings(stateAbbrev).catch(() => [])

  // Group by city
  const cityCounts: Record<string, number> = {}
  for (const l of listings) {
    const key = l.city
    cityCounts[key] = (cityCounts[key] ?? 0) + 1
  }
  const cities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `Suboxone Clinics in ${stateName}`,
    description: `Directory of suboxone clinics and MAT providers in ${stateName}`,
    url: `https://www.suboxoneclinicfinder.com/suboxone-clinics/${state}`,
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
        <span className="text-gray-900">{stateName}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-navy">
          Suboxone Clinics in {stateName}
        </h1>
        <p className="text-gray-600 mt-2">
          {listings.length} MAT clinic{listings.length !== 1 ? 's' : ''} found in {stateName}.
          Filter by Medicaid, telehealth, and accepting new patients.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <Link
            href={`/suboxone-clinics?state=${stateAbbrev}&medicaid=true`}
            className="badge-teal text-sm px-3 py-1.5"
          >
            💳 Medicaid Accepted
          </Link>
          <Link
            href={`/suboxone-clinics?state=${stateAbbrev}&telehealth=true`}
            className="badge-navy text-sm px-3 py-1.5"
          >
            💻 Telehealth
          </Link>
          <Link
            href={`/suboxone-clinics?state=${stateAbbrev}&accepting=true`}
            className="badge-gray text-sm px-3 py-1.5"
          >
            ✅ Accepting Patients
          </Link>
        </div>
      </div>

      {/* Cities */}
      {cities.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Browse by City in {stateName}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map(([city, count]) => (
              <Link
                key={city}
                href={`/suboxone-clinics/${state}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="card p-3 text-center hover:border-brand-teal hover:shadow-md transition-all group"
              >
                <div className="font-semibold text-sm text-gray-900 group-hover:text-brand-teal truncate">{city}</div>
                <div className="text-xs text-gray-500">{count} clinic{count !== 1 ? 's' : ''}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All listings */}
      <div>
        <h2 className="text-xl font-bold text-brand-navy mb-4">All Suboxone Clinics in {stateName}</h2>
        {listings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No clinics found for {stateName}.</p>
            <Link href="/suboxone-clinics" className="text-brand-teal hover:underline mt-4 block">Browse all states</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.slice(0, 40).map((listing) => (
              <StateListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
        {listings.length > 40 && (
          <div className="mt-6 text-center">
            <Link href={`/suboxone-clinics?state=${stateAbbrev}`} className="btn-primary">
              View All {listings.length} Clinics in {stateName}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function StateListingCard({ listing }: { listing: SuboxoneListing }) {
  return (
    <Link href={`/clinic/${listing.slug}`} className="card p-4 block hover:border-brand-teal group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-brand-teal truncate flex-1">
          {listing.clinic_name}
        </h3>
        {listing.listing_tier === 'featured' && (
          <span className="badge-featured flex-shrink-0 text-xs">Featured</span>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
        <MapPin className="w-3 h-3 flex-shrink-0" aria-label="Location" />
        <span>{listing.city}, {listing.state}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {listing.is_otp && <span className="badge badge-otp text-xs">OTP</span>}
        {listing.accepts_medicaid && <span className="badge badge-teal text-xs">Medicaid</span>}
        {listing.telehealth_available && <span className="badge badge-navy text-xs">Telehealth</span>}
        {listing.accepting_new_patients === true && <span className="badge badge-gray text-xs">Accepting</span>}
      </div>
      {listing.phone && (
        <div className="flex items-center gap-1.5 text-xs text-brand-teal font-medium">
          <Phone className="w-3.5 h-3.5" aria-label="Phone" />
          {formatPhone(listing.phone)}
        </div>
      )}
    </Link>
  )
}
