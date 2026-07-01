import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Phone, ExternalLink } from 'lucide-react'
import { getCityListings } from '@/lib/data'
import { formatPhone } from '@/lib/utils'
import type { SuboxoneListing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Find Suboxone Clinics in Houston, TX — MAT & Buprenorphine Treatment',
  description:
    'Find suboxone clinics and buprenorphine MAT providers in Houston, Texas. Texas Medical Center programs, UTHealth, Harris County addiction services, and telehealth options for Harris County.',
  alternates: { canonical: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/texas/houston' },
  openGraph: {
    title: 'Find Suboxone Clinics in Houston, TX | SuboxoneClinicFinder',
    description:
      'Browse MAT providers in Houston. Texas Medical Center programs and telehealth buprenorphine available.',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Texas Medicaid cover suboxone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas Medicaid (STAR) does not cover buprenorphine for adults without a co-occurring mental health diagnosis in most managed care plans. This is one of the most significant access barriers to MAT in Texas — many patients pay out of pocket for buprenorphine treatment. Low-income patients without Medicaid coverage can explore county-funded programs through Harris County\'s addiction services or federally qualified health centers that offer sliding scale fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I find suboxone treatment in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Houston\'s Texas Medical Center includes UTHealth and Harris County\'s addiction services, which provide buprenorphine treatment. Harris County Psychiatric Center and Harris Health System operate programs for low-income patients. For patients with commercial insurance or willing to pay out of pocket, Houston has a range of private addiction medicine practices and clinics. Telehealth providers are also widely available for Houston patients who prefer not to travel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is telehealth suboxone prescribing available in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Telehealth buprenorphine prescribing is legal in Texas under DEA temporary rules extended post-COVID. Houston\'s suburban sprawl in Harris County makes telehealth especially practical — many patients prefer a video visit over driving to a clinic. Telehealth MAT providers serving Texas often have faster appointment availability than in-person Houston clinics.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if I cannot afford suboxone treatment in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Several options exist for low-income Houston patients: Harris Health System (formerly Harris County Hospital District) provides income-based sliding scale fees at multiple Houston locations. Federally Qualified Health Centers (FQHCs) in Houston are required to provide services regardless of ability to pay. The SAMHSA National Helpline (1-800-662-4357) can also connect you with local resources and funding assistance programs.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: 'Suboxone Clinics in Houston, TX',
  description: 'Directory of suboxone clinics and MAT providers in Houston, TX',
  url: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/texas/houston',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.suboxoneclinicfinder.com' },
      { '@type': 'ListItem', position: 2, name: 'Suboxone Clinics', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics' },
      { '@type': 'ListItem', position: 3, name: 'Texas', item: 'https://www.suboxoneclinicfinder.com/suboxone-clinics/texas' },
      { '@type': 'ListItem', position: 4, name: 'Houston' },
    ],
  },
}

export default async function HoustonPage() {
  const listings = await getCityListings('Houston', 'TX').catch(() => [] as SuboxoneListing[])

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
        <Link href="/suboxone-clinics/texas" className="hover:text-brand-teal">Texas</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Houston</span>
      </nav>

      {/* Hero */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          <MapPin className="w-4 h-4" />
          <span>Houston, TX</span>
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Find Suboxone Clinics in Houston, TX
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
          Houston&apos;s Texas Medical Center — the largest medical complex in the world — includes
          UTHealth and Harris County addiction services. Telehealth buprenorphine is widely available
          for Harris County patients.
          {listings.length > 0 ? ` ${listings.length} providers found in Houston.` : ' Browse providers below.'}
        </p>
      </header>

      {/* Local context — note Texas Medicaid limitation */}
      <section className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">Important: Texas Medicaid & MAT</h2>
        <p className="text-sm text-gray-700 mb-3">
          Texas Medicaid (STAR) does not cover buprenorphine for adults without a co-occurring
          mental health diagnosis in most plans. Many Houston patients pay out of pocket or use
          private insurance.
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Harris Health System offers sliding-scale fees for low-income patients</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> Telehealth buprenorphine prescribing is legal in Texas (DEA extended post-COVID rules)</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> UTHealth and Texas Medical Center include addiction medicine services</li>
          <li className="flex gap-2"><span className="text-brand-teal font-bold">✓</span> FQHCs (Federally Qualified Health Centers) serve patients regardless of ability to pay</li>
        </ul>
      </section>

      {/* Listings */}
      {listings.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-brand-navy mb-5">
            Suboxone Providers in Houston
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
          <p className="text-gray-600 mb-4">Search the full directory for Texas providers.</p>
          <Link
            href="/suboxone-clinics?state=TX"
            className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-teal/90 transition-colors text-sm"
          >
            Browse Texas Providers
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
            { label: 'Austin, TX', state: 'texas', city: 'austin' },
            { label: 'Dallas, TX', state: 'texas', city: 'dallas' },
            { label: 'San Antonio, TX', state: 'texas', city: 'san-antonio' },
            { label: 'Fort Worth, TX', state: 'texas', city: 'fort-worth' },
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
          Are you a Houston suboxone provider not in the directory?
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
