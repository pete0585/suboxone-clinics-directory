import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink, Monitor } from 'lucide-react'
import { browseListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Suboxone Telehealth — Online Buprenorphine Treatment',
  description:
    'Find suboxone doctors who prescribe buprenorphine via telehealth. Get MAT treatment from home — no in-person visit required. Medicaid accepted at many providers.',
  alternates: { canonical: '/suboxone-clinics/telehealth' },
  openGraph: {
    title: 'Suboxone Telehealth | SuboxoneClinicFinder',
    description:
      'Online suboxone prescribers in your state. Start buprenorphine treatment via video visit today.',
  },
}

export const revalidate = 86400

export default async function TelehealthPage() {
  const { listings, total } = await browseListings({ telehealth: true, page: 1 }).catch(() => ({
    listings: [],
    total: 0,
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Suboxone Telehealth — Online Buprenorphine Treatment',
    description:
      'Directory of suboxone clinics and MAT providers offering telehealth prescribing.',
    url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/telehealth',
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
        { '@type': 'ListItem', position: 3, name: 'Telehealth' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I get suboxone prescribed online without an in-person visit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Since 2020, DEA rules allow buprenorphine prescribing via telemedicine without a prior in-person visit. Many providers in this directory offer video visits only — you never need to go to an office.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Medicaid cover telehealth suboxone treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most state Medicaid programs cover telehealth MAT visits. Coverage rules vary by state. Contact the provider directly to confirm your specific plan is accepted.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I start suboxone via telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose a telehealth provider from this directory, schedule a video visit, and your prescriber will evaluate you and send your buprenorphine prescription to a pharmacy near you — typically within 24-48 hours of your first appointment.',
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
        <span className="text-gray-900">Telehealth</span>
      </nav>

      <div className="bg-brand-navy rounded-2xl text-white p-8 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Monitor className="w-8 h-8 text-brand-teal" aria-label="Telehealth" />
          <h1 className="text-3xl font-extrabold">Suboxone Telehealth</h1>
        </div>
        <p className="text-gray-300 text-lg mb-4 max-w-2xl">
          Get buprenorphine treatment from home via video visit.{' '}
          {total > 0 ? `${total}+ providers` : 'Providers'} listed nationwide — no office visit required.
        </p>
        <p className="text-gray-400 text-sm max-w-2xl">
          Since 2020, federal rules allow suboxone prescribers to treat opioid use disorder entirely
          via telehealth. Many accept Medicaid. Prescriptions go to your local pharmacy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="card p-6 border-l-4 border-brand-teal">
          <h3 className="font-bold text-brand-navy mb-2">No In-Person Visit Required</h3>
          <p className="text-sm text-gray-600">
            A DEA rule change in 2020 — extended through at least 2025 — allows buprenorphine
            prescribing without a prior face-to-face visit. Start treatment from your home.
          </p>
        </div>
        <div className="card p-6 border-l-4 border-brand-teal">
          <h3 className="font-bold text-brand-navy mb-2">Prescription Sent to Your Pharmacy</h3>
          <p className="text-sm text-gray-600">
            After your video visit, your provider sends the prescription electronically to any
            pharmacy you choose. Most major chains and independent pharmacies carry it.
          </p>
        </div>
        <div className="card p-6 border-l-4 border-brand-teal">
          <h3 className="font-bold text-brand-navy mb-2">Medicaid Accepted at Many Providers</h3>
          <p className="text-sm text-gray-600">
            Most state Medicaid plans cover telehealth MAT visits. Use the filter below to find
            providers that accept your insurance.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/suboxone-clinics/telehealth?medicaid=true"
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
        <Link
          href="/guides/how-to-find-suboxone-clinic"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-brand-teal transition-colors"
        >
          How to Get Started
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-brand-navy mb-1">
          Suboxone Telehealth Providers
        </h2>
        <p className="text-gray-500 text-sm">
          {total} provider{total !== 1 ? 's' : ''} with telehealth available. Call to confirm
          current appointment availability.
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No telehealth providers loaded yet.</p>
          <Link href="/suboxone-clinics" className="btn-primary">
            Browse All Clinics
          </Link>
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {listings.map((listing) => (
            <TelehealthCard key={listing.id} listing={listing} />
          ))}
          {total > 20 && (
            <div className="text-center pt-4">
              <Link href="/suboxone-clinics?telehealth=true" className="btn-primary">
                View All {total} Telehealth Providers
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">
          Frequently Asked Questions — Suboxone Telehealth
        </h2>
        <div className="space-y-6">
          <FaqItem
            question="Can I get suboxone prescribed online without an in-person visit?"
            answer="Yes. Since 2020, DEA rules allow buprenorphine prescribing via telemedicine without a prior in-person visit. Many providers in this directory offer video visits only — you never need to go to an office."
          />
          <FaqItem
            question="Does Medicaid cover telehealth suboxone treatment?"
            answer="Most state Medicaid programs cover telehealth MAT visits. Coverage rules vary by state. Contact the provider directly to confirm your specific plan is accepted before scheduling."
          />
          <FaqItem
            question="How do I start suboxone via telehealth?"
            answer="Choose a provider from this directory, schedule a video visit, and your prescriber will evaluate you and send your buprenorphine prescription to a pharmacy near you — typically within 24-48 hours of your first appointment."
          />
          <FaqItem
            question="What do I need for a telehealth suboxone appointment?"
            answer="A smartphone, tablet, or computer with a camera and internet connection. A private, quiet space for the video call. Photo ID and insurance card if applicable. Some providers require a urine drug screen — they'll send a kit or direct you to a local lab."
          />
        </div>
      </div>

      <div className="bg-brand-navy/5 border border-brand-navy/20 rounded-xl p-6">
        <h3 className="font-bold text-brand-navy mb-2">Are you a telehealth suboxone provider?</h3>
        <p className="text-sm text-gray-600 mb-4">
          List your clinic and reach patients searching for online MAT treatment in your state.
          Google restricts paid ads for addiction treatment — this directory is how patients find you.
        </p>
        <Link href="/submit" className="btn-primary text-sm">
          Add Your Clinic — Free
        </Link>
      </div>
    </div>
  )
}

function TelehealthCard({ listing }: { listing: SuboxoneListing }) {
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
          {listing.address && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-1">
              <MapPin className="w-4 h-4 flex-shrink-0" aria-label="Address" />
              {listing.city}, {listing.state}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="badge-navy">💻 Telehealth</span>
            {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
            {listing.accepts_medicaid && <span className="badge-teal">💳 Medicaid</span>}
            {listing.accepts_medicare && <span className="badge-navy">Medicare</span>}
            {listing.accepts_self_pay && <span className="badge-gray">Self-Pay</span>}
            {listing.accepting_new_patients === true && (
              <span className="badge-gray">✅ Accepting Patients</span>
            )}
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
