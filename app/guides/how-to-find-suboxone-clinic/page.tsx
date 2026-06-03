import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Find a Suboxone Clinic Near You — Step-by-Step Guide',
  description:
    'A practical guide to finding a suboxone clinic or buprenorphine prescriber. What to look for, what to ask, and how to get treatment started fast — with or without insurance.',
  alternates: { canonical: '/guides/how-to-find-suboxone-clinic' },
  openGraph: {
    title: 'How to Find a Suboxone Clinic | SuboxoneClinicFinder',
    description:
      'Step-by-step guide to finding buprenorphine MAT treatment near you. Covers insurance, telehealth, and what to expect.',
  },
}

export default function HowToFindGuide() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find a suboxone doctor near me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Search this directory by city and state, filter by your insurance, and call 2-3 clinics to ask about availability. Telehealth providers can often see you within 24-48 hours regardless of your location.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get suboxone without seeing a doctor in person?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Since 2020, DEA rules allow buprenorphine prescribing via video visit without a prior in-person exam. Many telehealth MAT providers operate in all 50 states.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fastest way to get a suboxone prescription?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Telehealth suboxone providers typically have the shortest wait — often 24-48 hours from initial contact to prescription. Search this directory with the telehealth filter and call the first 3 results.',
        },
      },
    ],
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-teal">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-brand-teal">Guides</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">How to Find a Suboxone Clinic</span>
      </nav>

      <header className="mb-8">
        <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          Patient Guide
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-4">
          How to Find a Suboxone Clinic Near You
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Finding a suboxone clinic should take minutes, not days. Here&apos;s exactly how to do
          it — whether you have insurance, don&apos;t, or aren&apos;t sure where to start.
        </p>
      </header>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <p className="text-sm font-semibold text-gray-900 mb-1">Need help right now?</p>
        <p className="text-sm text-gray-700">
          Call SAMHSA&apos;s free helpline:{' '}
          <a href="tel:18006624357" className="font-bold text-brand-amber hover:underline">
            1-800-662-4357
          </a>{' '}
          — 24/7, confidential, free. They can connect you with a clinic that has open slots.
        </p>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Step 1: Decide Between In-Person and Telehealth
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The first decision is whether you want to see a provider in person or via video. Both
          options work — but they have different tradeoffs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="card p-5">
            <h3 className="font-bold text-brand-navy mb-2">Telehealth</h3>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li>✓ Available in all 50 states</li>
              <li>✓ Often next-day appointments</li>
              <li>✓ No travel required</li>
              <li>✓ Same prescription sent to your pharmacy</li>
              <li>✗ Not ideal if you want in-person support</li>
            </ul>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-brand-navy mb-2">In-Person</h3>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li>✓ Counseling and support services on-site</li>
              <li>✓ Directly observe medication dispensing (OTPs)</li>
              <li>✓ Often better for complex cases</li>
              <li>✗ May have longer waits</li>
              <li>✗ Geographic limitations</li>
            </ul>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          If speed is your priority, go telehealth. If you want wraparound support — counseling,
          case management, group therapy — an in-person clinic or OTP (opioid treatment program)
          is the better fit.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Step 2: Know What Your Insurance Covers
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Before you call a clinic, know your coverage situation. It changes what you ask and which
          clinics make sense.
        </p>
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">Medicaid</h3>
            <p className="text-sm text-gray-600">
              Medicaid covers suboxone in all 50 states — it&apos;s required by federal law. Most
              states eliminated prior authorization requirements in 2023. Use the{' '}
              <Link href="/suboxone-clinics/medicaid" className="text-brand-teal hover:underline">
                Medicaid filter
              </Link>{' '}
              to find clinics that accept it.
            </p>
          </div>
          <div className="border-l-4 border-brand-navy pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">Private Insurance</h3>
            <p className="text-sm text-gray-600">
              Most private plans cover MAT under parity law. You&apos;ll want to confirm the
              clinic is in-network. Ask: "Do you accept [my plan name]?" before scheduling.
            </p>
          </div>
          <div className="border-l-4 border-gray-300 pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">No Insurance / Self-Pay</h3>
            <p className="text-sm text-gray-600">
              Generic buprenorphine costs $30-100/month at most pharmacies with a GoodRx coupon.
              Many clinics offer sliding scale fees. See our{' '}
              <Link
                href="/guides/suboxone-cost-without-insurance"
                className="text-brand-teal hover:underline"
              >
                cost guide
              </Link>{' '}
              for the full breakdown.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Step 3: Search and Call 3 Clinics at Once
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t call one clinic and wait. Call three simultaneously. Availability changes
          daily — the clinic that was full yesterday may have an opening today. Here&apos;s what
          to ask when you call:
        </p>
        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">Questions to ask when you call:</p>
          <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
            <li>Are you currently accepting new patients?</li>
            <li>Do you accept [my insurance / Medicaid]?</li>
            <li>What is your earliest available appointment?</li>
            <li>Do you offer telehealth or do I need to come in?</li>
            <li>What do I need to bring to my first appointment?</li>
          </ol>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          If a clinic puts you on hold for more than a few minutes or can&apos;t answer basic
          availability questions, move to the next one. A good clinic handles intake calls
          smoothly because they do it every day.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Step 4: Understand What Happens at Your First Appointment
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Your first appointment is a medical evaluation — not an interrogation. The provider
          needs to understand your history to prescribe safely. Expect:
        </p>
        <ul className="text-gray-700 space-y-2 mb-4 list-disc list-inside">
          <li>A review of your opioid use history (which opioids, how long, how much)</li>
          <li>Questions about your overall health and other medications</li>
          <li>A urine drug screen (standard, not punitive)</li>
          <li>Discussion of your treatment goals and the induction process</li>
          <li>First prescription, often same day</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-6">
          The induction process — starting suboxone after your last opioid use — requires you to
          be in mild to moderate withdrawal before your first dose. Your provider will walk you
          through the timing. This is normal and expected; ask your provider to explain it in
          detail before your appointment so you&apos;re prepared.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          What to Do If You Can&apos;t Find an Open Clinic
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Suboxone access is still uneven, especially in rural areas. If the clinic search
          isn&apos;t returning results near you:
        </p>
        <ul className="text-gray-700 space-y-2 mb-6 list-disc list-inside">
          <li>
            <strong>Try telehealth first</strong> — telehealth providers operate statewide, not
            city-specific. You can see a provider in another city via video.
          </li>
          <li>
            <strong>Call SAMHSA at 1-800-662-4357</strong> — they maintain real-time availability
            data and can refer you to open slots.
          </li>
          <li>
            <strong>Contact your county health department</strong> — many counties run federally
            qualified health centers (FQHCs) that offer sliding-scale MAT.
          </li>
          <li>
            <strong>Ask your primary care doctor</strong> — any DEA-registered physician can now
            prescribe buprenorphine. Since 2023, the X-waiver requirement was eliminated. Your
            regular doctor may be able to prescribe.
          </li>
        </ul>
      </article>

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">Common Questions</h2>
        <div className="space-y-5">
          <FaqItem
            question="How do I find a suboxone doctor near me?"
            answer="Search this directory by city and state, filter by your insurance, and call 2-3 clinics to ask about availability. Telehealth providers can often see you within 24-48 hours regardless of your location."
          />
          <FaqItem
            question="Can I get suboxone without seeing a doctor in person?"
            answer="Yes. Since 2020, DEA rules allow buprenorphine prescribing via video visit without a prior in-person exam. Many telehealth MAT providers operate in all 50 states."
          />
          <FaqItem
            question="What is the fastest way to get a suboxone prescription?"
            answer="Telehealth suboxone providers typically have the shortest wait — often 24-48 hours from initial contact to prescription. Search this directory with the telehealth filter and call the first 3 results."
          />
        </div>
      </div>

      <div className="bg-brand-navy rounded-2xl text-white p-8 mt-10">
        <h2 className="text-xl font-bold mb-3">Find a Suboxone Clinic Now</h2>
        <p className="text-gray-300 mb-5">
          Browse 1,700+ suboxone clinics by city and state. Filter by Medicaid, telehealth,
          and accepting new patients.
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
