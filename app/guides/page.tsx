import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Suboxone Treatment Guides — Patient Resources',
  description:
    'Practical guides to suboxone and buprenorphine MAT treatment. How to find a clinic, what it costs, suboxone vs methadone, and coverage for veterans.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Suboxone Guides | SuboxoneClinicFinder',
    description: 'Patient guides to suboxone and buprenorphine MAT treatment.',
  },
}

const guides = [
  {
    slug: 'how-to-find-suboxone-clinic',
    title: 'How to Find a Suboxone Clinic Near You',
    description:
      'Step-by-step guide to finding a buprenorphine prescriber — with or without insurance. What to ask when you call, and what to expect at your first appointment.',
    tag: 'Getting Started',
    tagColor: 'bg-brand-teal text-white',
    readTime: '6 min read',
  },
  {
    slug: 'suboxone-cost-without-insurance',
    title: 'Suboxone Cost Without Insurance',
    description:
      'Real cost breakdown for medication and visits. Programs that reduce or eliminate what you pay — including Medicaid, patient assistance, and federally-funded clinics.',
    tag: 'Cost & Insurance',
    tagColor: 'bg-brand-amber text-white',
    readTime: '5 min read',
  },
  {
    slug: 'suboxone-vs-methadone',
    title: 'Suboxone vs Methadone: What Is the Difference?',
    description:
      'How the two most effective MAT medications compare — how they work, where you get them, and which might be the right fit based on your situation.',
    tag: 'Treatment Options',
    tagColor: 'bg-brand-navy text-white',
    readTime: '7 min read',
  },
  {
    slug: 'veterans-suboxone-treatment',
    title: 'VA Coverage for Suboxone — Veterans and MAT',
    description:
      "Does the VA cover suboxone? Yes. Full guide to VA buprenorphine coverage, Community Care referrals, and civilian options if the VA can't see you fast enough.",
    tag: 'Veterans',
    tagColor: 'bg-green-700 text-white',
    readTime: '8 min read',
  },
]

export default function GuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Guides</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">
          Suboxone Treatment Guides
        </h1>
        <p className="text-gray-600 text-lg">
          Practical patient resources on suboxone and buprenorphine MAT — written clearly, without
          the medical jargon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="card p-6 block hover:border-brand-teal hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${guide.tagColor}`}>
                {guide.tag}
              </span>
              <span className="text-xs text-gray-400">{guide.readTime}</span>
            </div>
            <h2 className="font-bold text-lg text-gray-900 group-hover:text-brand-teal mb-2 leading-snug">
              {guide.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{guide.description}</p>
            <div className="mt-4 text-sm font-medium text-brand-teal">Read guide →</div>
          </Link>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
        <p className="text-sm font-semibold text-gray-900 mb-1">Need immediate help?</p>
        <p className="text-sm text-gray-700">
          Call SAMHSA&apos;s free helpline:{' '}
          <a href="tel:18006624357" className="font-bold text-brand-amber hover:underline">
            1-800-662-4357
          </a>{' '}
          — 24/7, confidential. They can connect you with a clinic that has open slots right now.
        </p>
      </div>

      <div className="bg-brand-navy rounded-2xl text-white p-8">
        <h2 className="text-xl font-bold mb-3">Ready to Find a Clinic?</h2>
        <p className="text-gray-300 mb-5">
          Browse 1,700+ suboxone and MAT clinics by city. Filter by Medicaid, telehealth, and
          whether they&apos;re accepting new patients.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/suboxone-clinics"
            className="inline-flex items-center px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
          >
            Browse All Clinics
          </Link>
          <Link
            href="/suboxone-clinics/telehealth"
            className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
          >
            Telehealth Options
          </Link>
          <Link
            href="/suboxone-clinics/medicaid"
            className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
          >
            Medicaid Accepted
          </Link>
        </div>
      </div>
    </div>
  )
}
