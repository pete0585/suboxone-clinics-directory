import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink, CreditCard } from 'lucide-react'
import { browseListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Medicaid Suboxone Clinics — MAT Treatment That Accepts Your Coverage',
  description:
    'Find suboxone clinics near you that accept Medicaid. Buprenorphine MAT is covered by Medicaid in all 50 states. Filter by state and telehealth availability.',
  alternates: { canonical: '/suboxone-clinics/medicaid' },
  openGraph: {
    title: 'Medicaid Suboxone Clinics | SuboxoneClinicFinder',
    description:
      'Medicaid-accepting suboxone clinics nationwide. MAT treatment covered in all 50 states.',
  },
}

export const revalidate = 86400

export default async function MedicaidPage() {
  const { listings, total } = await browseListings({ medicaid: true, page: 1 }).catch(() => ({
    listings: [],
    total: 0,
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'Medicaid Suboxone Clinics — Buprenorphine MAT Providers That Accept Medicaid',
    description:
      'Directory of suboxone clinics and MAT providers that accept Medicaid insurance.',
    url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/medicaid',
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
        { '@type': 'ListItem', position: 3, name: 'Medicaid Accepted' },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does Medicaid cover suboxone treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Medicaid covers buprenorphine (suboxone) for opioid use disorder in all 50 states and DC. The Mental Health Parity and Addiction Equity Act requires Medicaid plans to cover substance use disorder treatment the same way they cover medical care.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need prior authorization for suboxone on Medicaid?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on your state. Most states have eliminated prior authorization requirements for buprenorphine under Medicaid as of 2023, but rules vary. Ask the clinic or your Medicaid plan directly.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get suboxone on Medicaid via telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — most state Medicaid programs now cover telehealth MAT visits. Use our filter to find clinics that are both Medicaid-accepting and telehealth-available.',
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
        <span className="text-gray-900">Medicaid Accepted</span>
      </nav>

      <div className="bg-brand-navy rounded-2xl text-white p-8 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <CreditCard className="w-8 h-8 text-brand-teal" aria-label="Medicaid" />
          <h1 className="text-3xl font-extrabold">Medicaid Suboxone Clinics</h1>
        </div>
        <p className="text-gray-300 text-lg mb-4 max-w-2xl">
          Suboxone (buprenorphine) treatment is covered by Medicaid in all 50 states.{' '}
          {total > 0 ? `${total}+ clinics` : 'Clinics'} in this directory accept Medicaid.
        </p>
        <p className="text-gray-400 text-sm max-w-2xl">
          Federal parity law requires Medicaid to cover substance use disorder treatment equally
          with other medical care. You should not be denied coverage for suboxone.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <h3 className="font-bold text-gray-900 mb-2">Know Your Rights</h3>
        <p className="text-sm text-gray-700">
          Medicaid must cover buprenorphine for opioid use disorder in every state under the Mental
          Health Parity and Addiction Equity Act. Most states eliminated prior authorization
          requirements as of 2023. If a clinic says Medicaid won&apos;t cover your treatment, call
          your state Medicaid office or{' '}
          <a href="tel:18006624357" className="font-semibold text-brand-amber hover:underline">
            SAMHSA at 1-800-662-4357
          </a>{' '}
          for guidance.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <Link
          href="/suboxone-clinics/medicaid?telehealth=true"
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
        >
          💻 Medicaid + Telehealth
        </Link>
        <Link
          href="/suboxone-clinics/medicaid?accepting=true"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:border-brand-teal transition-colors"
        >
          ✅ Accepting New Patients
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
          Suboxone Clinics That Accept Medicaid
        </h2>
        <p className="text-gray-500 text-sm">
          {total} clinic{total !== 1 ? 's' : ''} with Medicaid accepted. Call to verify your
          specific plan is in-network.
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Loading Medicaid-accepting clinics...</p>
          <Link href="/suboxone-clinics" className="btn-primary">
            Browse All Clinics
          </Link>
        </div>
      ) : (
        <div className="space-y-4 mb-10">
          {listings.map((listing) => (
            <MedicaidCard key={listing.id} listing={listing} />
          ))}
          {total > 20 && (
            <div className="text-center pt-4">
              <Link href="/suboxone-clinics?medicaid=true" className="btn-primary">
                View All {total} Medicaid-Accepting Clinics
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">
          Frequently Asked Questions — Medicaid and Suboxone
        </h2>
        <div className="space-y-6">
          <FaqItem
            question="Does Medicaid cover suboxone treatment?"
            answer="Yes. Medicaid covers buprenorphine (suboxone) for opioid use disorder in all 50 states and DC. The Mental Health Parity and Addiction Equity Act requires Medicaid plans to cover substance use disorder treatment the same way they cover medical care."
          />
          <FaqItem
            question="Do I need prior authorization for suboxone on Medicaid?"
            answer="It depends on your state. Most states eliminated prior authorization requirements for buprenorphine under Medicaid as of 2023, but some states still require it. Ask the clinic or your Medicaid plan directly before your appointment."
          />
          <FaqItem
            question="Can I get suboxone on Medicaid via telehealth?"
            answer="Yes — most state Medicaid programs now cover telehealth MAT visits. Use our filter to find clinics that are both Medicaid-accepting and telehealth-available."
          />
          <FaqItem
            question="What if I can't find a Medicaid suboxone clinic near me?"
            answer="Call SAMHSA's helpline at 1-800-662-4357 — they can connect you with a Medicaid-participating provider in your area. Also consider telehealth providers, which removes the geographic limitation entirely."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="font-bold text-brand-navy mb-2">What Medicaid Covers for MAT</h3>
          <ul className="text-sm text-gray-600 space-y-1.5">
            <li>✓ Office or telehealth visits with a prescriber</li>
            <li>✓ Buprenorphine/naloxone (Suboxone) prescription</li>
            <li>✓ Urine drug screens required for ongoing prescribing</li>
            <li>✓ Counseling and behavioral health services</li>
            <li>✓ Medication-assisted treatment in OTP settings</li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-bold text-brand-navy mb-2">Related Guides</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link href="/guides/suboxone-cost-without-insurance" className="text-brand-teal hover:underline">
                → Suboxone cost without insurance
              </Link>
            </li>
            <li>
              <Link href="/guides/how-to-find-suboxone-clinic" className="text-brand-teal hover:underline">
                → How to find a suboxone clinic
              </Link>
            </li>
            <li>
              <Link href="/suboxone-clinics/telehealth" className="text-brand-teal hover:underline">
                → Suboxone telehealth options
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-brand-navy/5 border border-brand-navy/20 rounded-xl p-6">
        <h3 className="font-bold text-brand-navy mb-2">Do you accept Medicaid?</h3>
        <p className="text-sm text-gray-600 mb-4">
          List your clinic and reach the patients who need you most. Medicaid patients are
          among the highest-urgency searchers — they find you here when they can&apos;t find you anywhere else.
        </p>
        <Link href="/submit" className="btn-primary text-sm">
          Add Your Clinic — Free
        </Link>
      </div>
    </div>
  )
}

function MedicaidCard({ listing }: { listing: SuboxoneListing }) {
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
            <span className="badge-teal">💳 Medicaid</span>
            {listing.is_otp && <span className="badge-otp">OTP Registered</span>}
            {listing.accepts_medicare && <span className="badge-navy">Medicare</span>}
            {listing.telehealth_available && <span className="badge-navy">💻 Telehealth</span>}
            {listing.accepts_self_pay && <span className="badge-gray">Self-Pay</span>}
            {listing.accepting_new_patients === true && (
              <span className="badge-gray">✅ Accepting Patients</span>
            )}
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
