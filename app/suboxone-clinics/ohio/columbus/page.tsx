import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in Columbus, OH — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in Columbus, Ohio. Ohio Medicaid covers buprenorphine without prior authorization. OSU Wexner Medical Center and OhioHealth have MAT programs.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/ohio/columbus' },
  openGraph: {
    title: 'Find Suboxone Clinics in Columbus, OH | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in Columbus. Medicaid accepted, telehealth available.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Ohio Medicaid cover suboxone without prior authorization?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ohio was one of the first states to eliminate prior authorization requirements for buprenorphine (Suboxone/Zubsolv) for OUD. Ohio Medicaid (through managed care plans like CareSource, Molina, Buckeye Health Plan, and others) covers buprenorphine with minimal barriers. This was implemented as part of Ohio\'s response to the opioid crisis. Columbus patients on Ohio Medicaid should be able to access buprenorphine through any participating prescriber without pre-approval.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main suboxone programs in Columbus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ohio State University Wexner Medical Center has an addiction medicine program through its Family Medicine and Psychiatry departments. OhioHealth\'s addiction medicine service line includes buprenorphine prescribing at multiple Columbus locations. Equitas Health (formerly AIDS Healthcare Foundation Ohio) integrates MAT with HIV and primary care for at-risk populations. The ColumbusCares initiative has expanded community health center MAT capacity in underserved Columbus neighborhoods.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there suboxone clinics on the east or south side of Columbus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Columbus\'s east side (Linden, Whitehall) and south side (South Linden, Merion Village) have historically been underserved for MAT compared to the Short North and Clintonville. The Columbus Department of Health and Franklin County\'s ADAMH (Alcohol, Drug and Mental Health Board) have worked to expand OBOT capacity in these neighborhoods. Telehealth MAT provides geographic access to patients anywhere in Franklin County without requiring clinic travel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get suboxone via telehealth in Columbus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Telehealth buprenorphine prescribing is available in Ohio. Columbus has good broadband coverage, making video-based MAT consultations practical for most patients. National telehealth MAT platforms and Ohio-licensed telehealth prescribers provide access to buprenorphine without requiring in-person visits. Ohio\'s Medicaid managed care plans cover telehealth MAT under the same terms as in-person prescribing.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in Columbus, OH',
  description: 'Directory of suboxone clinics and MAT providers in Columbus, OH',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/ohio/columbus',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'Ohio', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/ohio' },
      { '@type': 'ListItem', position: 4, name: 'Columbus' },
    ],
  },
}

export default async function ColumbusPage() {
  const listings = await getCityListings('Columbus', 'OH').catch(() => [] as SuboxoneListing[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics/ohio" className="hover:text-brand-teal">Ohio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Columbus</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>Columbus, OH</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in Columbus, OH
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Ohio has been at the epicenter of the opioid crisis, and Columbus has responded with a robust MAT infrastructure. Ohio Medicaid was an early mover on eliminating prior authorization for buprenorphine. OhioHealth and Ohio State University's Wexner Medical Center both have dedicated addiction medicine programs. Franklin County has a strong FQHC and community health center network providing buprenorphine through primary care.
          {listings.length > 0 ? ` ${listings.length} providers found in Columbus.` : ' Browse providers below.'}
        </p>
      </header>

      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">MAT Coverage in Columbus</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Ohio Medicaid covers buprenorphine without prior authorization</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> OSU Wexner Medical Center has addiction medicine and OUD treatment programs</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> OhioHealth addiction medicine services across Columbus</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Franklin County FQHC network provides buprenorphine in primary care settings</li>
        </ul>
      </section>

      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in Columbus
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
          <p className="text-gray-600 mb-4">Search the full directory for Ohio providers.</p>
          <Link
            href="/suboxone-clinics?state=OH"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse Ohio Providers
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
            { label: 'Cleveland, OH', state: 'ohio', city: 'cleveland' },
            { label: 'Cincinnati, OH', state: 'ohio', city: 'cincinnati' },
            { label: 'Dayton, OH', state: 'ohio', city: 'dayton' },
            { label: 'Toledo, OH', state: 'ohio', city: 'toledo' },
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
          Are you a Columbus suboxone provider not in the directory?
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
