import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Filter } from 'lucide-react'
import { browseListings } from '@/lib/data'
import { stateAbbrevToName } from '@/lib/utils'
import type { SuboxoneListing, BrowseFilters } from '@/lib/types'
import { PhoneButton } from '@/components/PhoneButton'

interface PageProps {
  searchParams: Promise<{
    q?: string
    state?: string
    medicaid?: string
    medicare?: string
    telehealth?: string
    accepting?: string
    walkin?: string
    page?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const stateLabel = params.state ? stateAbbrevToName(params.state.toUpperCase()) : ''
  const title = stateLabel
    ? `Suboxone Clinics in ${stateLabel} — Find MAT Treatment`
    : 'Browse Suboxone Clinics — Find MAT Treatment Near You'

  return {
    title,
    description: `Search suboxone clinics${stateLabel ? ` in ${stateLabel}` : ' nationwide'}. Filter by Medicaid, telehealth, and accepting new patients.`,
  }
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const params = await searchParams

  const filters: BrowseFilters = {
    q: params.q,
    state: params.state,
    medicaid: params.medicaid === 'true',
    medicare: params.medicare === 'true',
    telehealth: params.telehealth === 'true',
    accepting: params.accepting === 'true',
    walkin: params.walkin === 'true',
    page: params.page ? parseInt(params.page) : 1,
  }

  const { listings, total } = await browseListings(filters).catch(() => ({ listings: [], total: 0 }))
  const totalPages = Math.ceil(total / 20)
  const currentPage = filters.page ?? 1

  const hasFilters = !!(filters.medicaid || filters.medicare || filters.telehealth || filters.accepting || filters.walkin || filters.state || filters.q)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">
          {filters.state ? `Suboxone Clinics in ${stateAbbrevToName(filters.state.toUpperCase())}` : 'Browse Suboxone Clinics'}
        </h1>
        <p className="text-gray-600 mt-1">
          {total > 0 ? `${total.toLocaleString()} clinics found` : 'No clinics found for these filters'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <FilterPanel filters={filters} />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {listings.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" aria-label="Filter" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No clinics found</h2>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search a different location.</p>
              <Link href="/suboxone-clinics" className="btn-primary">Clear All Filters</Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {listings.map((listing) => (
                  <ListingRow key={listing.id} listing={listing} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {currentPage > 1 && (
                    <PaginationLink page={currentPage - 1} params={params} label="← Previous" />
                  )}
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <PaginationLink page={currentPage + 1} params={params} label="Next →" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterPanel({ filters }: { filters: BrowseFilters }) {
  const params: Record<string, string> = {}
  if (filters.q) params.q = filters.q
  if (filters.state) params.state = filters.state

  const buildHref = (extra: Record<string, string | boolean | undefined>) => {
    const merged = { ...params, ...extra }
    const qs = Object.entries(merged)
      .filter(([, v]) => v && v !== 'false')
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    return `/suboxone-clinics${qs ? '?' + qs : ''}`
  }

  return (
    <div className="card p-5 space-y-6">
      <div>
        <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Insurance</h2>
        <div className="space-y-2">
          <FilterCheckbox
            label="Medicaid Accepted"
            active={!!filters.medicaid}
            href={buildHref({ medicaid: !filters.medicaid ? 'true' : undefined })}
          />
          <FilterCheckbox
            label="Medicare Accepted"
            active={!!filters.medicare}
            href={buildHref({ medicare: !filters.medicare ? 'true' : undefined })}
          />
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Availability</h2>
        <div className="space-y-2">
          <FilterCheckbox
            label="Accepting New Patients"
            active={!!filters.accepting}
            href={buildHref({ accepting: !filters.accepting ? 'true' : undefined })}
          />
          <FilterCheckbox
            label="Walk-in Available"
            active={!!filters.walkin}
            href={buildHref({ walkin: !filters.walkin ? 'true' : undefined })}
          />
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Format</h2>
        <div className="space-y-2">
          <FilterCheckbox
            label="Telehealth Available"
            active={!!filters.telehealth}
            href={buildHref({ telehealth: !filters.telehealth ? 'true' : undefined })}
          />
        </div>
      </div>

      {(filters.medicaid || filters.medicare || filters.telehealth || filters.accepting || filters.walkin) && (
        <Link href="/suboxone-clinics" className="block text-center text-sm text-brand-teal hover:underline">
          Clear all filters
        </Link>
      )}
    </div>
  )
}

function FilterCheckbox({ label, active, href }: { label: string; active: boolean; href: string }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-sm py-1 px-2 rounded-md transition-colors ${
        active ? 'bg-brand-teal-light text-brand-teal-dark font-medium' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
        active ? 'bg-brand-teal border-brand-teal' : 'border-gray-300'
      }`}>
        {active && <span className="text-white text-xs">✓</span>}
      </span>
      {label}
    </Link>
  )
}

function ListingRow({ listing }: { listing: SuboxoneListing }) {
  return (
    <Link href={`/listings/${listing.slug}`} className="card p-5 block hover:border-brand-teal group">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h2 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-brand-teal transition-colors">
                {listing.clinic_name}
              </h2>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-label="Location" />
                <span>{listing.address ? `${listing.address}, ` : ''}{listing.city}, {listing.state}{listing.zip ? ` ${listing.zip}` : ''}</span>
              </div>
            </div>
            {listing.listing_tier === 'featured' && (
              <span className="badge-featured">Featured</span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
            {listing.listing_tier === 'verified' && <span className="badge-teal">Verified</span>}
            {listing.accepts_medicaid && <span className="badge-teal">💳 Medicaid</span>}
            {listing.accepts_medicare && <span className="badge-navy">Medicare</span>}
            {listing.telehealth_available && <span className="badge-navy">💻 Telehealth</span>}
            {listing.accepting_new_patients === true && <span className="badge-gray">✅ Accepting Patients</span>}
            {listing.walk_in_available && <span className="badge-amber">🚶 Walk-in</span>}
            {listing.sliding_scale && <span className="badge-gray">Sliding Scale</span>}
          </div>

          {listing.services_offered && listing.services_offered.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              Services: {listing.services_offered.slice(0, 3).join(', ')}
            </p>
          )}
        </div>

        {listing.phone && (
          <div className="hidden md:flex flex-col items-end gap-2 flex-shrink-0">
            <PhoneButton phone={listing.phone} />
          </div>
        )}
      </div>
    </Link>
  )
}

function PaginationLink({ page, params, label }: { page: number; params: Record<string, string | undefined>; label: string }) {
  const qs = Object.entries({ ...params, page: String(page) })
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${v}`)
    .join('&')
  return (
    <Link href={`/suboxone-clinics?${qs}`} className="btn-secondary text-sm px-4 py-2">
      {label}
    </Link>
  )
}
