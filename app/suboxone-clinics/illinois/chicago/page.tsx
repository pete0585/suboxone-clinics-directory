import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in Chicago, IL — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in Chicago, Illinois. Illinois Medicaid covered without prior authorization. RUSH University, University of Chicago, and Cook County Health OBOT sites.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/illinois/chicago' },
  openGraph: {
    title: 'Find Suboxone Clinics in Chicago, IL | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in Chicago. Illinois Medicaid accepted, telehealth available.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Illinois Medicaid cover suboxone treatment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Illinois Medicaid (the Medical Assistance Program) covers buprenorphine treatment without prior authorization. Patients on Illinois Medicaid should not be required to get pre-approval before starting buprenorphine. Coverage includes both in-person and telehealth prescribing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are the main suboxone programs in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RUSH University Medical Center and the University of Chicago both have established addiction medicine programs with buprenorphine prescribing. Cook County Health operates several Office-Based Opioid Treatment (OBOT) sites across Chicago, including sites on the South and West Side where access to MAT has historically been limited. The Hub-and-Spoke model is also being expanded in Chicago — connecting specialty addiction medicine hubs with primary care prescribers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there suboxone providers on the South Side or West Side of Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Access to MAT has historically been concentrated in Chicago\'s North Side and Loop, underserving the South and West Side communities most affected by the opioid crisis. Cook County Health\'s OBOT expansion and community health center programs have been actively working to address this gap. Telehealth providers can also serve patients in any Chicago neighborhood without requiring travel to a clinic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get suboxone via telehealth in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Telehealth buprenorphine prescribing is fully available in Illinois. Many Chicago patients use telehealth MAT providers for the convenience of not traveling to a clinic, especially given Chicago traffic. Telehealth providers often have shorter wait times than in-person clinic appointments.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in Chicago, IL',
  description: 'Directory of suboxone clinics and MAT providers in Chicago, IL',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/illinois/chicago',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'Illinois', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/illinois' },
      { '@type': 'ListItem', position: 4, name: 'Chicago' },
    ],
  },
}

export default async function ChicagoPage() {
  const listings = await getCityListings('Chicago', 'IL').catch(() => [] as SuboxoneListing[])

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
        <Link href="/suboxone-clinics/illinois" className="hover:text-brand-teal">Illinois</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Chicago</span>
      </nav>

      {/* Hero */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>Chicago, IL</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in Chicago, IL
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Illinois Medicaid covers buprenorphine without prior authorization. Chicago has established
          addiction medicine programs at RUSH, University of Chicago, and Cook County Health.
          {listings.length > 0 ? ` ${listings.length} providers found in Chicago.` : ' Browse providers below.'}
        </p>
      </header>

      {/* Local context */}
      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">MAT Coverage in Chicago</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Illinois Medicaid covers buprenorphine without prior authorization</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> RUSH University Medical Center and UChicago have addiction medicine buprenorphine programs</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Cook County Health operates multiple OBOT (Office-Based Opioid Treatment) sites</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Hub-and-Spoke model expanding to South Side and West Side communities</li>
        </ul>
      </section>

      {/* Listings */}
      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in Chicago
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
          <p className="text-gray-600 mb-4">Search the full directory for Illinois providers.</p>
          <Link
            href="/suboxone-clinics?state=IL"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse Illinois Providers
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
            { label: 'Aurora, IL', state: 'illinois', city: 'aurora' },
            { label: 'Joliet, IL', state: 'illinois', city: 'joliet' },
            { label: 'Rockford, IL', state: 'illinois', city: 'rockford' },
            { label: 'Indianapolis, IN', state: 'indiana', city: 'indianapolis' },
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
          Are you a Chicago suboxone provider not in the directory?
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
