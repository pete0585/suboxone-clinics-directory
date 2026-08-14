import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in Detroit, MI — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in Detroit, Michigan. Michigan Medicaid covers buprenorphine. Henry Ford Health System and Detroit Medical Center have addiction medicine programs.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/michigan/detroit' },
  openGraph: {
    title: 'Find Suboxone Clinics in Detroit, MI | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in Detroit. Medicaid accepted, telehealth available.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Michigan Medicaid cover suboxone in Detroit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Michigan Medicaid (including Healthy Michigan Plan, the Medicaid expansion) covers buprenorphine for OUD. Michigan eliminated prior authorization for buprenorphine as part of its opioid response strategy. Detroit patients on Michigan Medicaid can access buprenorphine through participating providers in the Wayne County area. Medicaid managed care plans (Meridian, Priority Health, Blue Cross Complete) all include substance use disorder benefits covering MAT.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main suboxone programs in Detroit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Henry Ford Health System has addiction medicine services with buprenorphine prescribing at multiple Detroit area locations. Detroit Medical Center (DMC) provides addiction medicine consultation. Wayne County Community Mental Health Agency (DWIHN) funds and monitors the county\'s public behavioral health system, including opioid treatment programs. Covenant Community Care and ACCESS (Arab Community Center for Economic and Social Services) provide integrated MAT through primary care for underserved Detroit populations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there suboxone providers on the east side or west side of Detroit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MAT access in Detroit is uneven — concentrations of providers exist in Midtown and New Center near the major health systems, but the east side and far west side historically have fewer accessible MAT providers. Community health centers and FQHC-affiliated practices are working to expand access across Detroit neighborhoods. Telehealth MAT significantly expands geographic access for Detroit patients without reliable transportation to Midtown clinics.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get buprenorphine via telehealth in Detroit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Michigan allows telehealth buprenorphine prescribing, and Michigan Medicaid covers telehealth MAT visits. Multiple telehealth MAT providers serve Michigan, and Detroit patients can access video-based buprenorphine initiation and management from any location with internet access. Telehealth has been particularly important for expanding MAT access in Detroit\'s underserved neighborhoods where in-person clinic access is limited.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in Detroit, MI',
  description: 'Directory of suboxone clinics and MAT providers in Detroit, MI',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/michigan/detroit',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'Michigan', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/michigan' },
      { '@type': 'ListItem', position: 4, name: 'Detroit' },
    ],
  },
}

export default async function DetroitPage() {
  const listings = await getCityListings('Detroit', 'MI').catch(() => [] as SuboxoneListing[])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics" className="hover:text-brand-teal">Suboxone Clinics</Link>
        <span className="mx-2">/</span>
        <Link href="/suboxone-clinics/michigan" className="hover:text-brand-teal">Michigan</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Detroit</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>Detroit, MI</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in Detroit, MI
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Detroit has been significantly affected by the opioid crisis, and Michigan's response has included Medicaid coverage expansion and removal of prior authorization for buprenorphine. Henry Ford Health System and Detroit Medical Center have addiction medicine programs. Wayne County has a network of community mental health and substance use disorder treatment sites providing buprenorphine access.
          {listings.length > 0 ? ` ${listings.length} providers found in Detroit.` : ' Browse providers below.'}
        </p>
      </header>

      <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">MAT Coverage in Detroit</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Michigan Medicaid (Healthy Michigan Plan) covers buprenorphine without prior auth</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Henry Ford Health System and Detroit Medical Center have addiction medicine programs</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Wayne County CMHSP network provides substance use disorder treatment with MAT</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Telehealth MAT available statewide including Detroit and Wayne County</li>
        </ul>
      </section>

      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in Detroit
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
          <p className="text-gray-600 mb-4">Search the full directory for Michigan providers.</p>
          <Link
            href="/suboxone-clinics?state=MI"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse Michigan Providers
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
            { label: 'Dearborn, MI', state: 'michigan', city: 'dearborn' },
            { label: 'Warren, MI', state: 'michigan', city: 'warren' },
            { label: 'Ann Arbor, MI', state: 'michigan', city: 'ann-arbor' },
            { label: 'Flint, MI', state: 'michigan', city: 'flint' },
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
          Are you a Detroit suboxone provider not in the directory?
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
