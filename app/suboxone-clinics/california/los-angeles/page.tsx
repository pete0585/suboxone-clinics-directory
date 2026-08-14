import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in Los Angeles, CA — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in Los Angeles, California. LA County DPH runs OBOT sites across the metro. Coverage varies by managed Medi-Cal plan.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/california/los-angeles' },
  openGraph: {
    title: 'Find Suboxone Clinics in Los Angeles, CA | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in Los Angeles. Medicaid accepted, telehealth available.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Medi-Cal cover suboxone treatment in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. California Medi-Cal covers buprenorphine treatment for opioid use disorder. Most Medi-Cal managed care plans in LA County cover buprenorphine prescribing without prior authorization for OUD treatment. The Biden-era federal requirement to cover buprenorphine without prior auth has been codified into California\'s Medi-Cal program. LA County patients on Denti-Cal or Medi-Cal should be able to access buprenorphine treatment through participating providers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where are the main suboxone programs in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LA County\'s public treatment infrastructure includes the DPH Substance Abuse Prevention and Control (SAPC) network of OBOT and OTP sites. UCLA\'s David Geffen School of Medicine has addiction medicine fellowship programs with buprenorphine prescribing. Harbor-UCLA Medical Center serves South LA. Cedars-Sinai has addiction consultation services. The federally qualified health center (FQHC) network — AltaMed, Clinica Monsenor Oscar Romero, Planned Parenthood LA — also provides buprenorphine through primary care.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is telehealth buprenorphine available in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Telehealth MAT is widely used in LA and is particularly practical given LA traffic and the city\'s sprawling geography. National telehealth MAT providers (Bicycle Health, Workit Health, Ophelia) serve LA County patients. CA-licensed telehealth prescribers can prescribe buprenorphine following a virtual evaluation. Telehealth MAT is available in all languages with interpreter services — practical in a city as multilingual as Los Angeles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there Spanish-speaking suboxone providers in LA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — many. Los Angeles has a large Spanish-speaking population and a corresponding supply of bilingual addiction medicine providers. FQHCs and community health centers in East LA, South Central, and the San Fernando Valley often have Spanish-speaking staff who can manage buprenorphine treatment. National telehealth MAT providers also have Spanish-language capabilities. When searching this directory, note any language preferences in your search.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in Los Angeles, CA',
  description: 'Directory of suboxone clinics and MAT providers in Los Angeles, CA',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/california/los-angeles',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'California', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/california' },
      { '@type': 'ListItem', position: 4, name: 'Los Angeles' },
    ],
  },
}

export default async function LosAngelesPage() {
  const listings = await getCityListings('Los Angeles', 'CA').catch(() => [] as SuboxoneListing[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics/california" className="hover:text-brand-teal">California</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Los Angeles</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>Los Angeles, CA</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in Los Angeles, CA
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Los Angeles County has one of the largest opioid treatment populations in the country, and one of the most complex treatment landscapes. LA County Department of Public Health operates several OBOT (Office-Based Opioid Treatment) sites. UCLA Health and Cedars-Sinai have addiction medicine programs. Telehealth MAT providers are widely used across LA's sprawling geography.
          {listings.length > 0 ? ` ${listings.length} providers found in Los Angeles.` : ' Browse providers below.'}
        </p>
      </header>

      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">MAT Coverage in Los Angeles</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Medi-Cal covers buprenorphine under most LA County managed care plans</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> LA County Department of Public Health operates multiple OBOT sites</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> UCLA Health and Cedars-Sinai have addiction medicine programs with buprenorphine</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Telehealth MAT widely available — avoids LA traffic and wait times</li>
        </ul>
      </section>

      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in Los Angeles
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
          <p className="text-gray-600 mb-4">Search the full directory for California providers.</p>
          <Link
            href="/suboxone-clinics?state=CA"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse California Providers
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
            { label: 'Long Beach, CA', state: 'california', city: 'long-beach' },
            { label: 'Pasadena, CA', state: 'california', city: 'pasadena' },
            { label: 'San Fernando Valley', state: 'california', city: 'van-nuys' },
            { label: 'San Diego, CA', state: 'california', city: 'san-diego' },
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
          Are you a Los Angeles suboxone provider not in the directory?
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
