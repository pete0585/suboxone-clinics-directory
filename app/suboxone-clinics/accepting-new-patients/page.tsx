import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink, CheckCircle } from 'lucide-react'
import { browseListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Suboxone Clinics Accepting New Patients Near You',
  description:
    'Find suboxone clinics currently accepting new patients. No waitlist — call today to start buprenorphine MAT treatment. Filter by Medicaid, telehealth, and location.',
  alternates: { canonical: '/suboxone-clinics/accepting-new-patients' },
  openGraph: {
    title: 'Suboxone Clinics Accepting New Patients | SuboxoneClinicFinder',
    description:
      'Suboxone clinics with open patient slots. Start MAT treatment today.',
  },
}

export const revalidate = 86400

export default async function AcceptingNewPatientsPage() {
  const { listings, total } = await browseListings({ accepting: true, page: 1 }).catch(() => ({
    listings: [],
    total: 0,
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Suboxone Clinics Accepting New Patients',
    description: 'Directory of suboxone clinics currently accepting new patients for MAT treatment.',
    url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/accepting-new-patients',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.suboxoneclinicfinder.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Suboxone Clinics',
          item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics',
        },
        { '@type': 'ListItem', position: 3, name: 'Accepting New Patients' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What happens at my first suboxone appointment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Your first appointment includes a medical evaluation, review of your opioid use history, and a discussion of treatment options. If buprenorphine is appropriate, your prescriber will determine your starting dose and explain the induction process. Many clinics begin the prescription on the same day as the first visit.",
        },
      },
      {
        '@type': 'Question',
        name: 'How long is the wait to get into a suboxone clinic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wait times vary widely. Many telehealth suboxone providers can schedule a new patient within 24-48 hours. In-person clinics in high-demand areas may have waitlists of days to weeks. Calling multiple clinics simultaneously is the fastest way to get an appointment.',
        },
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Accepting New Patients</span>
      </nav>

      <div className="bg-brand-navy rounded-2xl text-white p-8 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-8 h-8 text-brand-teal" aria-label="Accepting patients" />
          <h1 className="text-3xl font-extrabold">Suboxone Clinics Accepting New Patients</h1>
        </div>
        <p className="text-gray-300 text-lg mb-4 max-w-2xl">
          {total > 0 ? `${total} clinics` : 'Clinics'} currently accepting new patients for
          buprenorphine treatment. Call today — availability changes daily.
        </p>
        <p className="text-gray-400 text-sm max-w-2xl">
          Patient availability is real-time. Always call the clinic directly to confirm an open
          slot before traveling. Telehealth providers often have the shortest wait times.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
        <h3 className="font-bold text-gray-900 mb-2">
          Fastest path to treatment: call multiple clinics at once
        </h3>
        <p className="text-sm text-gray-700">
          Patient availability changes daily. The fastest way to get an appointment is to call 3-5
          clinics simultaneously rather than waiting for a callback. If you need immediate help,
          call{' '}
          <a href="tel:18006624357" className="font-semibold text-blue-700 hover:underline">
            SAMHSA at 1-800-662-4357
          </a>{' '}
          — they can locate open slots near you right now.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/suboxone-clinics/accepting-new-patients?telehealth=true"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
        >
          💻 Telehealth Only
        </Link>
        <Link
          href="/suboxone-clinics/accepting-new-patients?medicaid=true"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
        >
          💳 Medicaid Accepted
        </Link>
        <Link
          href="/suboxone-clinics"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-brand-teal transition-colors"
        >
          View All Clinics
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-brand-navy mb-1">
          Open Suboxone Clinics Near You
        </h2>
        <p className="text-gray-500 text-sm">
          {total} clinic{total !== 1 ? 's' : ''} marked as accepting new patients. Confirm
          directly by phone before visiting.
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            Availability data is updated as clinics claim and update their listings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/suboxone-clinics" className="btn-primary">
              Browse All Clinics
            </Link>
            <Link href="/suboxone-clinics/telehealth" className="btn-secondary">
              Try Telehealth Options
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {listings.map((listing) => (
            <AcceptingCard key={listing.id} listing={listing} />
          ))}
          {total > 20 && (
            <div className="text-center pt-4">
              <Link href="/suboxone-clinics?accepting=true" className="btn-primary">
                View All {total} Clinics Accepting Patients
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">
          What to Expect at Your First Appointment
        </h2>
        <div className="space-y-6">
          <FaqItem
            question="What happens at my first suboxone appointment?"
            answer="Your first appointment includes a medical evaluation, review of your opioid use history, and a discussion of treatment options. If buprenorphine is appropriate, your prescriber will determine your starting dose and explain the induction process. Many clinics start the prescription the same day."
          />
          <FaqItem
            question="How long is the wait to get into a suboxone clinic?"
            answer="Wait times vary widely. Many telehealth suboxone providers can schedule a new patient within 24-48 hours. In-person clinics in high-demand areas may have waitlists of days to weeks. Calling multiple clinics simultaneously is the fastest approach."
          />
          <FaqItem
            question="What do I bring to my first appointment?"
            answer="Bring a photo ID, your insurance card (if applicable), a list of any medications you currently take, and any medical records relevant to your opioid use history. Some clinics require a urine drug screen at the first visit — it's standard practice and not punitive."
          />
        </div>
      </div>

      <div className="bg-brand-navy/5 border border-brand-navy/20 rounded-xl p-6">
        <h3 className="font-bold text-brand-navy mb-2">Is your clinic accepting new patients?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Claim your listing and set your availability status so patients can find you when they
          need you. Free to list, takes 2 minutes.
        </p>
        <Link href="/submit" className="btn-primary text-sm">
          Add Your Clinic — Free
        </Link>
      </div>
    </div>
  )
}

function AcceptingCard({ listing }: { listing: SuboxoneListing }) {
  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <Link
              href={`/clinic/${listing.slug}`}
              className="font-bold text-xl text-gray-900 hover:text-brand-teal transition-colors"
            >
              {listing.clinic_name}
            </Link>
            {listing.listing_tier === 'featured' && (
              <span className="badge-featured">Featured</span>
            )}
            {listing.listing_tier === 'verified' && (
              <span className="badge-teal">Verified</span>
            )}
          </div>
          {listing.city && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4 flex-shrink-0" aria-label="Location" />
              {listing.city}, {listing.state}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="badge-gray">✅ Accepting Patients</span>
            {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
            {listing.accepts_medicaid && <span className="badge-teal">💳 Medicaid</span>}
            {listing.accepts_medicare && <span className="badge-navy">Medicare</span>}
            {listing.telehealth_available && <span className="badge-navy">💻 Telehealth</span>}
            {listing.walk_in_available && <span className="badge-amber">🚶 Walk-in</span>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors whitespace-nowrap"
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
