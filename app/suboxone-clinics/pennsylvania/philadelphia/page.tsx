import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in Philadelphia, PA — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in Philadelphia, Pennsylvania. Pennsylvania Medicaid covers buprenorphine. Jefferson, Penn, and Temple all have addiction medicine programs.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/pennsylvania/philadelphia' },
  openGraph: {
    title: 'Find Suboxone Clinics in Philadelphia, PA | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in Philadelphia. Medicaid accepted, telehealth available.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Pennsylvania Medicaid cover suboxone in Philadelphia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pennsylvania Medicaid (also called Medical Assistance, or MA) covers buprenorphine for OUD. Pennsylvania eliminated prior authorization for buprenorphine as part of its opioid crisis response. Philadelphia patients on PA Medicaid can access buprenorphine through the extensive participating provider network. PA Medicaid managed care plans (Keystone First, Health Partners Plans, UPMC Community HealthChoices) include behavioral health coverage for MAT.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main suboxone programs in Philadelphia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jefferson Health has an established addiction medicine program with buprenorphine prescribing across its Philadelphia network. Penn Medicine (University of Pennsylvania Health System) has addiction psychiatry and primary care-based MAT. Temple University Hospital serves North Philadelphia with addiction medicine services. The City of Philadelphia\'s Department of Behavioral Health and Intellectual disAbility Services (DBHIDS) funds and operates treatment programs including OBOT sites. COMHAR, Prevention Point Philadelphia, and other community organizations also provide MAT access.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there suboxone providers in Kensington or North Philadelphia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, though access has historically been inadequate relative to need. The City of Philadelphia has prioritized expanding OBOT and harm reduction services in Kensington. Prevention Point Philadelphia operates a syringe services program with MAT linkage in Kensington. Telehealth buprenorphine prescribers can serve patients anywhere in Philadelphia without requiring travel to a clinic — particularly practical for patients without reliable transportation in North Philly and Kensington.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get buprenorphine via telehealth in Philadelphia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Pennsylvania allows telehealth buprenorphine prescribing following an appropriate evaluation. Multiple national telehealth MAT providers (Bicycle Health, Ophelia) serve Pennsylvania, and PA-licensed telehealth prescribers serve Philadelphia patients. PA Medicaid covers telehealth MAT visits. Telehealth removes the transportation barrier that prevents many Philadelphia patients from accessing in-person addiction medicine clinics.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in Philadelphia, PA',
  description: 'Directory of suboxone clinics and MAT providers in Philadelphia, PA',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/pennsylvania/philadelphia',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'Pennsylvania', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/pennsylvania' },
      { '@type': 'ListItem', position: 4, name: 'Philadelphia' },
    ],
  },
}

export default async function PhiladelphiaPage() {
  const listings = await getCityListings('Philadelphia', 'PA').catch(() => [] as SuboxoneListing[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics/pennsylvania" className="hover:text-brand-teal">Pennsylvania</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Philadelphia</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>Philadelphia, PA</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in Philadelphia, PA
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Philadelphia has been one of the cities most severely affected by the opioid crisis, with Kensington becoming a nationally recognized epicenter of fentanyl use disorder. The city has responded with significant MAT infrastructure expansion. Jefferson Health, Penn Medicine, and Temple University Hospital all have addiction medicine programs. Pennsylvania Medicaid (MA) covers buprenorphine, and the city has a large OBOT and FQHC network.
          {listings.length > 0 ? ` ${listings.length} providers found in Philadelphia.` : ' Browse providers below.'}
        </p>
      </header>

      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">MAT Coverage in Philadelphia</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Pennsylvania Medicaid (MA) covers buprenorphine for OUD</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Jefferson Health, Penn Medicine, and Temple have addiction medicine programs</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> City of Philadelphia and DBHIDS operate OBOT sites in Kensington and throughout the city</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Telehealth MAT available and widely used in Philadelphia</li>
        </ul>
      </section>

      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in Philadelphia
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
          <p className="text-gray-600 mb-4">Search the full directory for Pennsylvania providers.</p>
          <Link
            href="/suboxone-clinics?state=PA"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse Pennsylvania Providers
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
            { label: 'Camden, NJ', state: 'new-jersey', city: 'camden' },
            { label: 'Norristown, PA', state: 'pennsylvania', city: 'norristown' },
            { label: 'Chester, PA', state: 'pennsylvania', city: 'chester' },
            { label: 'Trenton, NJ', state: 'new-jersey', city: 'trenton' },
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
          Are you a Philadelphia suboxone provider not in the directory?
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
