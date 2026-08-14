import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in Miami, FL — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in Miami, Florida. Florida Medicaid covers buprenorphine for OUD. Jackson Health System and UMHC have addiction medicine programs.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/florida/miami' },
  openGraph: {
    title: 'Find Suboxone Clinics in Miami, FL | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in Miami. Medicaid accepted, telehealth available.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Florida Medicaid cover suboxone in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Florida Medicaid covers buprenorphine for OUD through its managed care organization (MCO) network. Florida\'s Medicaid program uses managed care — Sunshine Health, Humana, WellCare, Molina, and others — and buprenorphine coverage is included in the standard behavioral health benefit. Prior authorization requirements vary by MCO, but federal requirements have reduced barriers to initial prescribing. Miami patients on Florida Medicaid should contact their MCO for the list of participating buprenorphine prescribers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are the main suboxone programs in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jackson Health System\'s Behavioral Health division provides addiction services including MAT for low-income and uninsured Miami-Dade residents. University of Miami Health System has addiction psychiatry services. The FQHC network — including Camillus Health Concern, Jessie Trice Community Health Center, and others — provides buprenorphine through integrated primary care in underserved Miami communities. Private addiction medicine practices serve commercially insured and self-pay patients throughout Miami-Dade.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there Spanish-speaking buprenorphine prescribers in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — Miami\'s large Spanish-speaking Cuban, Colombian, Venezuelan, and Central American population means bilingual addiction medicine services are widely available. Many Miami MAT providers are Spanish-speaking or bilingual, and several community health centers operate in Spanish as their primary language. When calling potential providers, ask directly about language capabilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is telehealth buprenorphine prescribing available in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Florida participates in telehealth MAT prescribing, and Miami patients can access national telehealth MAT platforms (Bicycle Health, Ophelia, Workit Health) as well as Florida-based telehealth prescribers. Telehealth is particularly practical for patients in South Miami, Homestead, or the Keys who face longer travel times to specialty addiction medicine clinics. All standard telehealth MAT requires a video evaluation before prescribing.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in Miami, FL',
  description: 'Directory of suboxone clinics and MAT providers in Miami, FL',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/florida/miami',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'Florida', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/florida' },
      { '@type': 'ListItem', position: 4, name: 'Miami' },
    ],
  },
}

export default async function MiamiPage() {
  const listings = await getCityListings('Miami', 'FL').catch(() => [] as SuboxoneListing[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics/florida" className="hover:text-brand-teal">Florida</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Miami</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>Miami, FL</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in Miami, FL
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Miami-Dade County has a substantial opioid use disorder treatment infrastructure. Jackson Health System — the largest public health system in the Southeast — has addiction medicine services at its Behavioral Health division. The University of Miami Health System (UMHC) has addiction psychiatry and primary care-based buprenorphine programs. Florida Medicaid covers buprenorphine for OUD through the managed Medicaid network.
          {listings.length > 0 ? ` ${listings.length} providers found in Miami.` : ' Browse providers below.'}
        </p>
      </header>

      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">MAT Coverage in Miami</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Florida Medicaid (Medicaid managed care) covers buprenorphine for OUD</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Jackson Health System has behavioral health and addiction services</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> University of Miami Health System has addiction psychiatry buprenorphine programs</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Telehealth MAT widely available across Miami-Dade</li>
        </ul>
      </section>

      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in Miami
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
                  {clinic.website_url && (
                    <a href={clinic.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-teal">
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
          <p className="text-gray-600 mb-4">Search the full directory for Florida providers.</p>
          <Link
            href="/suboxone-clinics?state=FL"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse Florida Providers
          </Link>
        </section>
      )}

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

      <section className="mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-4">Also Browse Nearby</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Fort Lauderdale, FL', state: 'florida', city: 'fort-lauderdale' },
            { label: 'Hialeah, FL', state: 'florida', city: 'hialeah' },
            { label: 'Doral, FL', state: 'florida', city: 'doral' },
            { label: 'West Palm Beach, FL', state: 'florida', city: 'west-palm-beach' },
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

      <div className="bg-gray-100 rounded-2xl p-6 text-center">
        <p className="text-gray-600 text-sm mb-3">
          Are you a Miami suboxone provider not in the directory?
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
