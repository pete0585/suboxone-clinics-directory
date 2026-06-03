import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, Shield, CheckCircle, Wifi, Users, ChevronRight } from 'lucide-react'
import { getFeaturedListings, getTotalCount, getTopCities, getStateCounts } from '@/lib/data'
import { formatPhone, stateAbbrevToName } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Suboxone Clinic Finder — Find MAT Treatment Near You',
  description: 'Find suboxone clinics and buprenorphine MAT providers near you. Search by city, filter by Medicaid, telehealth, and accepting new patients. Free to search.',
  openGraph: {
    title: 'Find a Suboxone Clinic Near You | SuboxoneClinicFinder',
    description: 'Search thousands of suboxone clinics. Filter by Medicaid, telehealth, and accepting new patients.',
  },
}

export const revalidate = 3600

export default async function HomePage() {
  const [totalCount, topCities, stateCounts, featuredListings] = await Promise.all([
    getTotalCount().catch(() => 0),
    getTopCities(24).catch(() => []),
    getStateCounts().catch(() => ({})),
    getFeaturedListings(6).catch(() => []),
  ])

  const stateList = Object.entries(stateCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-brand-teal/20 text-brand-teal px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" aria-label="Verified" />
              Free to search. No login required.
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Find a Suboxone Clinic<br className="hidden md:block" /> Near You
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Search {totalCount > 0 ? totalCount.toLocaleString() : 'thousands of'} suboxone clinics and MAT providers nationwide.
              Filter by Medicaid, telehealth, and accepting new patients.
            </p>
            <SearchHero />
            <div className="flex flex-wrap gap-3 mt-6">
              <QuickFilter href="/suboxone-clinics?medicaid=true" icon="💳" label="Medicaid Accepted" />
              <QuickFilter href="/suboxone-clinics?telehealth=true" icon="💻" label="Telehealth Available" />
              <QuickFilter href="/suboxone-clinics?accepting=true" icon="✅" label="Accepting New Patients" />
              <QuickFilter href="/suboxone-clinics?walkin=true" icon="🚶" label="Walk-in Available" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-brand-teal text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" aria-label="Check" />
              {totalCount > 0 ? `${totalCount.toLocaleString()}+` : '1,800+'} clinics nationwide
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5" aria-label="Wifi" />
              Telehealth options available
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" aria-label="Shield" />
              SAMHSA-sourced data
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" aria-label="Users" />
              Medicaid-accepted providers
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      {featuredListings.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-navy">Featured Clinics</h2>
              <Link href="/suboxone-clinics" className="text-brand-teal hover:underline text-sm font-medium flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" aria-label="" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredListings.map((listing) => (
                <FeaturedCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by City */}
      {topCities.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-2">Browse by City</h2>
            <p className="text-gray-600 mb-8">Find suboxone clinics in your metro area</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {topCities.map(({ city, state, count }) => (
                <Link
                  key={`${city}-${state}`}
                  href={`/suboxone-clinics/${state.toLowerCase()}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="card p-3 text-center hover:border-brand-teal hover:shadow-md transition-all group"
                >
                  <div className="font-semibold text-sm text-gray-900 group-hover:text-brand-teal truncate">{city}</div>
                  <div className="text-xs text-gray-500">{state} · {count} clinics</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Browse by State */}
      {stateList.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-2">Browse by State</h2>
            <p className="text-gray-600 mb-8">Every state has suboxone treatment options</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {stateList.map(([state, count]) => (
                <Link
                  key={state}
                  href={`/suboxone-clinics/${stateAbbrevToName(state).toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-brand-teal hover:bg-brand-teal-light transition-all group"
                >
                  <span className="font-medium text-sm text-gray-900 group-hover:text-brand-teal-dark">{stateAbbrevToName(state)}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/suboxone-clinics" className="btn-secondary inline-flex">
                View All States & Clinics
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why use this directory */}
      <section className="py-12 bg-brand-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-brand-navy mb-3">Why SuboxoneClinicFinder?</h2>
            <p className="text-gray-600">The only directory purpose-built for finding buprenorphine treatment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🏥"
              title="SAMHSA-Sourced"
              description="Our database includes all federally-registered Opioid Treatment Programs (OTPs), not just clinics that paid to be listed."
            />
            <FeatureCard
              icon="💳"
              title="Medicaid Filter"
              description="Most patients need Medicaid coverage. Filter to see only clinics that accept your insurance before you call."
            />
            <FeatureCard
              icon="💻"
              title="Telehealth Options"
              description="Many suboxone providers now offer video visits. Get buprenorphine treatment from home — search telehealth-available clinics."
            />
          </div>
        </div>
      </section>

      {/* Crisis helpline banner */}
      <section className="bg-brand-amber py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-semibold">
            Need immediate help? Call SAMHSA&apos;s free, confidential helpline:{' '}
            <a href="tel:18006624357" className="underline text-white font-bold hover:no-underline">
              1-800-662-4357
            </a>
            {' '}— available 24/7, in English and Spanish.
          </p>
        </div>
      </section>

      {/* CTA for providers */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-brand-navy mb-3">Are you a suboxone provider?</h2>
          <p className="text-gray-600 mb-6">
            Suboxone clinics can&apos;t run Google Ads without LegitScript certification.
            A verified listing on SuboxoneClinicFinder is your most scalable patient acquisition channel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className="btn-primary">
              Add Your Clinic — Free
            </Link>
            <Link href="/suboxone-clinics" className="btn-secondary">
              Find Your Listing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function SearchHero() {
  return (
    <form action="/suboxone-clinics" method="get" className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-label="Location" />
        <input
          type="text"
          name="q"
          placeholder="City, state, or zip code..."
          className="w-full pl-10 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 border-0 focus:outline-none focus:ring-2 focus:ring-brand-teal text-base shadow-lg"
        />
      </div>
      <button
        type="submit"
        className="px-8 py-4 bg-brand-amber text-white font-bold rounded-xl hover:opacity-90 transition-colors text-base shadow-lg whitespace-nowrap"
      >
        Find Clinics
      </button>
    </form>
  )
}

function QuickFilter({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-colors border border-white/20 hover:border-white/40"
    >
      <span>{icon}</span>
      {label}
    </Link>
  )
}

function FeaturedCard({ listing }: { listing: { id: string; slug: string; clinic_name: string; city: string; state: string; phone?: string | null; listing_tier: string; accepts_medicaid: boolean; telehealth_available: boolean; is_otp: boolean; services_offered?: string[] | null } }) {
  return (
    <Link href={`/clinic/${listing.slug}`} className="card p-5 block hover:border-brand-teal">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{listing.clinic_name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-label="Location" />
            <span>{listing.city}, {listing.state}</span>
          </div>
        </div>
        {listing.listing_tier === 'featured' && (
          <span className="badge-featured flex-shrink-0">Featured</span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
        {listing.accepts_medicaid && <span className="badge-teal">Medicaid</span>}
        {listing.telehealth_available && <span className="badge-navy">Telehealth</span>}
      </div>
      {listing.phone && (
        <div className="flex items-center gap-2 text-sm text-brand-teal font-medium">
          <Phone className="w-4 h-4" aria-label="Phone" />
          {formatPhone(listing.phone)}
        </div>
      )}
    </Link>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-brand-navy text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
