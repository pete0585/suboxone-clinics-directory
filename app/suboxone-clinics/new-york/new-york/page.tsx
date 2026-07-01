import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in New York, NY — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in New York City. Medicaid accepted, no prior authorization required. NYC Health + Hospitals, NYU Langone, Bellevue, and telehealth programs.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/new-york/new-york' },
  openGraph: {
    title: 'Find Suboxone Clinics in New York, NY | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in New York City. Medicaid accepted, telehealth available, no prior authorization required.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does New York Medicaid cover suboxone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. New York State Medicaid covers buprenorphine treatment with no prior authorization required since 2020 — one of the most comprehensive MAT coverage mandates in the country. All Medicaid managed care plans in New York are required to cover buprenorphine without prior authorization. Patients on Medicaid should not be asked to get pre-approval before starting treatment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get suboxone via telehealth in New York City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. New York City patients heavily rely on telehealth buprenorphine prescribing, which expanded dramatically during the pandemic and has continued under DEA temporary rules that allow buprenorphine prescribing via video visit without a prior in-person exam. Many NYC-area providers and national telehealth MAT platforms serve New York patients — often with shorter wait times than in-person clinics.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the Hub-and-Spoke buprenorphine programs in NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "New York City's Hub-and-Spoke model connects high-volume specialty buprenorphine hubs (like hospital-based addiction medicine programs at Bellevue and NYC Health + Hospitals) with primary care spoke practices that provide ongoing prescribing once a patient is stabilized. This model expands access by allowing primary care doctors to prescribe buprenorphine with specialty backup. If you are starting treatment and have a primary care provider, ask if they are a spoke in the Hub-and-Spoke network.",
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I start suboxone in New York City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait times vary significantly by provider type. Telehealth MAT providers often schedule initial visits within 24-48 hours. Hospital-based addiction medicine programs like Bellevue\'s buprenorphine program may have longer wait times but provide full wraparound services. Calling 2-3 providers simultaneously gives you the fastest path to a first appointment.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in New York, NY',
  description: 'Directory of suboxone clinics and MAT providers in New York, NY',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/new-york/new-york',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'New York', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/new-york' },
      { '@type': 'ListItem', position: 4, name: 'New York City' },
    ],
  },
}

export default async function NewYorkCityPage() {
  const listings = await getCityListings('New York', 'NY').catch(() => [] as SuboxoneListing[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics/new-york" className="hover:text-brand-teal">New York</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">New York City</span>
      </nav>

      {/* Hero */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>New York, NY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in New York, NY
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          New York State has one of the most comprehensive MAT coverage mandates in the US —
          Medicaid covers buprenorphine with no prior authorization required.
          {listings.length > 0 ? ` ${listings.length} providers found in New York City.` : ' Browse providers below.'}
        </p>
      </header>

      {/* Local context */}
      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">MAT Coverage in New York City</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> NY Medicaid covers buprenorphine with no prior authorization required since 2020</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> NYC Hub-and-Spoke programs connect specialty hubs with primary care prescribers</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> NYU Langone, Bellevue Hospital, and NYC Health + Hospitals all run buprenorphine programs</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Telehealth buprenorphine widely available — often 24-48 hour wait for first visit</li>
        </ul>
      </section>

      {/* Listings */}
      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in New York City
            <span className="text-sm font-normal text-gray-500 ml-2">({listings.length} found)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.slice(0, 18).map((clinic: SuboxoneListing) => (
              <div key={clinic.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-teal transition-colors">
                <Link href={`/clinic/${clinic.slug}`} className="block">
                  <h3 className="font-semibold text-brand-navy hover:text-brand-teal transition-colors mb-1 text-sm leading-snug">
                    {clinic.clinic_name}
                  </h3>
                </Link>
                <p className="text-xs text-gray-500 mb-3">{clinic.city}, {clinic.state}</p>
                <div className="flex gap-3">
                  {clinic.phone && (
                    <a href={`tel:${clinic.phone}`} className="flex items-center gap-1 text-xs text-brand-teal hover:underline">
                      <Phone className="w-3 h-3" />
                      {formatPhone(clinic.phone)}
                    </a>
                  )}
                  {clinic.website && (
                    <a href={clinic.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-teal">
                      <ExternalLink className="w-3 h-3" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="bg-gray-50 rounded-2xl p-8 text-center mb-10">
          <p className="text-gray-600 mb-4">Search the full directory for New York providers.</p>
          <Link
            href="/suboxone-clinics?state=NY"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse New York Providers
          </Link>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqSchema.mainEntity.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby cities */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-4">Also Browse Nearby</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Brooklyn, NY', state: 'new-york', city: 'brooklyn' },
            { label: 'Bronx, NY', state: 'new-york', city: 'bronx' },
            { label: 'Newark, NJ', state: 'new-jersey', city: 'newark' },
            { label: 'Jersey City, NJ', state: 'new-jersey', city: 'jersey-city' },
          ].map((c) => (
            <Link
              key={c.city}
              href={`/suboxone-clinics/${c.state}/${c.city}`}
              className="text-sm text-brand-teal bg-teal-50 px-3 py-1.5 rounded-full hover:bg-brand-teal hover:text-white transition-colors"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Submit CTA */}
      <div className="bg-gray-100 rounded-2xl p-6 text-center">
        <p className="text-gray-600 text-sm mb-3">
          Are you a New York City suboxone provider not in the directory?
        </p>
        <Link
          href="/submit"
          className="inline-flex items-center gap-1.5 text-sm text-brand-teal font-semibold hover:underline"
        >
          Submit your clinic — it&apos;s free
        </Link>
      </div>
    </div>
  )
}
