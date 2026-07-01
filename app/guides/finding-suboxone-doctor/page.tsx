import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Find a Suboxone Doctor or Buprenorphine Prescriber',
  description:
    "SAMHSA's findtreatment.gov was decommissioned in June 2026. This guide explains who can prescribe Suboxone, what to look for, and how to find a buprenorphine provider near you.",
  alternates: { canonical: '/guides/finding-suboxone-doctor' },
  openGraph: {
    title: 'How to Find a Suboxone Doctor | SuboxoneClinicFinder',
    description:
      "findtreatment.gov is gone. Here's how to find a buprenorphine prescriber — who qualifies, what to bring, and red flags to avoid.",
  },
}

export default function FindingSuboxoneDoctorPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What happened to SAMHSA's treatment locator (findtreatment.gov)?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "SAMHSA's findtreatment.gov was decommissioned in June 2026, removing the federal government's main public treatment locator. This created a significant gap for patients searching for buprenorphine providers. SuboxoneClinicFinder.com was built to fill this gap — it maintains a current directory of buprenorphine prescribers filterable by state, city, insurance, and telehealth availability.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does a doctor need a special license to prescribe Suboxone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The 2023 Consolidated Appropriations Act (the "Omnibus" bill) eliminated the DATA 2000 waiver requirement (the X-waiver) that previously required additional certification to prescribe buprenorphine for opioid use disorder. Since January 2023, any DEA-registered provider with prescribing authority can prescribe buprenorphine — including MDs, DOs, nurse practitioners (NPs), physician assistants (PAs), certified nurse-midwives (CNMs), and certified registered nurse anesthetists (CRNAs). The pool of eligible prescribers expanded dramatically as a result.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get Suboxone via telehealth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under DEA rules extended post-COVID, buprenorphine can be prescribed via telehealth (video visit) without a prior in-person exam. This rule has been extended multiple times and as of mid-2026 remains in effect. Many telehealth MAT providers operate nationally and can typically schedule first visits within 24-48 hours — significantly faster than most in-person clinic appointments.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if I have to wait a long time to get into a Suboxone program?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Call multiple providers simultaneously rather than waiting for one to respond. Telehealth providers typically have the shortest wait times. If you are in acute withdrawal or at high overdose risk, go to an emergency department — many hospital emergency departments now have addiction medicine consultants who can initiate buprenorphine in the ED (an approach called EMBED or buprenorphine bridge). Bridge programs can get you on medication while you wait for an outpatient appointment.',
        },
      },
    ],
  }

  const redFlags = [
    {
      flag: 'Providers who demand frequent in-person drug testing as a condition of medication',
      detail: 'Some drug testing in MAT is clinically appropriate, particularly early in treatment. But providers who require in-person drug testing weekly or multiple times per week — especially for patients who are stable — may be operating a high-revenue testing practice rather than providing patient-centered care. Federal guidelines do not require this level of testing for stable patients.',
    },
    {
      flag: 'Providers with very long wait lists and no waitlist communication',
      detail: 'If a provider has a 6-month waitlist and offers no interim support, bridge prescriptions, or guidance on managing while waiting — that is a problem. Effective providers either maintain manageable schedules or help patients access interim care.',
    },
    {
      flag: 'Providers who pressure tapering on a fixed timeline',
      detail: 'Evidence supports long-term or indefinite buprenorphine maintenance for many patients. A provider who insists you must taper off medication by a specific date — regardless of your stability or readiness — is not following current evidence-based guidelines.',
    },
    {
      flag: 'Cash-only practices with unusually high out-of-pocket costs',
      detail: 'While cash-pay MAT practices exist and are legitimate, some operate outside insurance networks specifically to avoid oversight. Unusually high fees combined with minimal clinical engagement may signal a practice prioritizing revenue over care quality.',
    },
  ]

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
        <span className="text-gray-900">How to Find a Suboxone Doctor</span>
      </nav>

      <header className="mb-8">
        <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          Patient Guide
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-4">
          How to Find a Suboxone Doctor or Buprenorphine Prescriber
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          SAMHSA&apos;s treatment locator (findtreatment.gov) was decommissioned in June 2026.
          Here&apos;s how to find a buprenorphine prescriber now — who can prescribe, what to look for,
          and what to bring to your first appointment.
        </p>
      </header>

      {/* What happened to SAMHSA */}
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-brand-navy mb-3">
          What Happened to SAMHSA&apos;s Treatment Locator?
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          SAMHSA&apos;s findtreatment.gov — the federal government&apos;s main public treatment locator —
          was decommissioned in June 2026 as part of broader federal program changes. This removed
          the primary resource most patients, families, and providers relied on to find buprenorphine
          prescribers.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          SuboxoneClinicFinder.com was built to fill this gap. Use the directory to search by city
          and state, filter by Medicaid acceptance, telehealth availability, and accepting new patients.
        </p>
      </section>

      {/* Who can prescribe */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">
          Who Can Prescribe Suboxone?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-5">
          Since the 2023 Omnibus bill eliminated the DATA 2000 waiver (the &quot;X-waiver&quot;), any
          DEA-registered provider with prescribing authority can prescribe buprenorphine for
          opioid use disorder. This expanded the prescriber pool dramatically:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {['Medical Doctors (MD)', 'Doctors of Osteopathy (DO)', 'Nurse Practitioners (NP)', 'Physician Assistants (PA)', 'Certified Nurse-Midwives (CNM)', 'CRNAs (in some states)'].map((type) => (
            <div key={type} className="bg-brand-teal/10 text-brand-navy text-xs font-semibold px-3 py-2 rounded-lg text-center">
              {type}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          The only requirement is a valid DEA registration with Schedule III prescribing authority.
          Primary care providers, urgent care providers, OB/GYNs, and emergency medicine physicians
          can all now prescribe buprenorphine without additional certification.
        </p>
      </section>

      {/* What to look for */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">
          What to Look For in a Buprenorphine Provider
        </h2>
        <p className="text-gray-600 leading-relaxed mb-5">
          Not all buprenorphine prescribers provide the same quality of care. These factors help
          identify patient-centered MAT practices:
        </p>
        <div className="space-y-4">
          {[
            {
              title: 'Harm reduction-aligned, not abstinence-only',
              body: 'Evidence-based MAT providers support medication as a long-term treatment option, not a stepping stone to abstinence. Providers who view medication as a crutch or who pressure tapering may not be aligned with current clinical guidelines. Ask directly: "Do you support long-term buprenorphine maintenance?"',
            },
            {
              title: 'Telehealth availability',
              body: 'Telehealth buprenorphine is convenient, effective, and now well-established in practice. For patients without easy transportation, in rural areas, or with busy schedules, telehealth-capable providers dramatically improve access. Many telehealth-first MAT platforms can see patients within 24-48 hours.',
            },
            {
              title: 'Medicaid and insurance acceptance',
              body: 'Confirm whether the provider accepts your specific insurance plan — Medicaid managed care plans vary by state and county. For uninsured patients, ask about sliding scale fees, federally qualified health center (FQHC) programs, or patient assistance for the medication itself (generic buprenorphine/naloxone is available at most pharmacies for $30-80/month with manufacturer coupons).',
            },
            {
              title: 'Rural access',
              body: 'Rural patients have historically had the least access to MAT — and the highest opioid overdose rates. Telehealth has significantly improved rural access. Search this directory with the telehealth filter to find providers who can serve you regardless of location.',
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="bg-brand-teal/10 text-brand-teal font-bold text-lg w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to bring */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">
          What to Bring to Your First Appointment
        </h2>
        <p className="text-gray-600 leading-relaxed mb-5">
          First MAT appointments typically involve a medical intake, substance use history, and a
          discussion of treatment goals. Bringing the following helps the process go smoothly:
        </p>
        <div className="space-y-3">
          {[
            'Government-issued photo ID',
            'Insurance card (if applicable)',
            'List of all current medications — including supplements and over-the-counter medications',
            'Honest account of your substance use history: what, how much, how often, and when you last used — no judgment will come from this',
            'Any relevant medical records if you have chronic conditions or prior addiction treatment history',
            'A list of questions you want answered (use our guides if you need help)',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="bg-brand-teal text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-5 italic">
          MAT providers are not in the business of judging your substance use history — the more
          accurate and complete the picture you give them, the better they can calibrate your
          treatment.
        </p>
      </section>

      {/* Red flags */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-2">Red Flags to Watch For</h2>
        <p className="text-gray-600 text-sm mb-5">
          These are practices that warrant serious reconsideration of a provider, regardless of
          their credentials or how professional they appear.
        </p>
        <div className="space-y-5">
          {redFlags.map((item, i) => (
            <div key={i} className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 mb-1">{item.flag}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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

      {/* CTA */}
      <div className="bg-brand-navy rounded-2xl p-7 text-white text-center mb-8">
        <h2 className="text-xl font-bold mb-2">Find a Buprenorphine Prescriber Near You</h2>
        <p className="text-gray-300 mb-5 text-sm">
          Search clinics in your city — filter by Medicaid, telehealth, and accepting new patients.
        </p>
        <Link
          href="/suboxone-clinics"
          className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-teal/90 transition-colors"
        >
          Browse Suboxone Clinics
        </Link>
      </div>

      {/* Related guides */}
      <section>
        <h2 className="text-lg font-bold text-brand-navy mb-4">Related Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/guides/what-is-suboxone', title: "What Is Suboxone?", desc: "How buprenorphine/naloxone works and who it's for" },
            { href: '/guides/suboxone-vs-methadone', title: 'Suboxone vs Methadone', desc: 'Key differences and which might be right for you' },
            { href: '/guides/suboxone-cost-without-insurance', title: 'Suboxone Cost Without Insurance', desc: 'Self-pay options, coupons, and assistance programs' },
          ].map((g) => (
            <Link key={g.href} href={g.href} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-brand-teal transition-colors group">
              <p className="font-semibold text-brand-navy group-hover:text-brand-teal transition-colors mb-1 text-sm">{g.title}</p>
              <p className="text-xs text-gray-500">{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
