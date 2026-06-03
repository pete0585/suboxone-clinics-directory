import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Suboxone Cost Without Insurance — What You Will Actually Pay',
  description:
    'How much does suboxone cost without insurance? A breakdown of medication costs, clinic visit fees, and programs that can reduce or eliminate your out-of-pocket cost.',
  alternates: { canonical: '/guides/suboxone-cost-without-insurance' },
  openGraph: {
    title: 'Suboxone Cost Without Insurance | SuboxoneClinicFinder',
    description:
      "Real cost breakdown for suboxone treatment without insurance — medication, visits, and how to reduce what you pay.",
  },
}

export default function SuboxoneCostPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does suboxone cost without insurance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generic buprenorphine/naloxone (same medication as brand-name Suboxone) costs $30-100/month at most pharmacies using a GoodRx or similar discount coupon. The brand-name Suboxone film costs $150-500/month without coverage. Clinic visit fees vary — telehealth MAT visits typically run $75-200/month.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a patient assistance program for Suboxone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. Indivior (the manufacturer of brand-name Suboxone) offers a patient assistance program for uninsured or underinsured patients. Many states also have medication assistance programs through their SAMHSA-funded treatment system.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get suboxone for free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In some cases, yes. Federally Qualified Health Centers (FQHCs) offer sliding-scale MAT and can prescribe buprenorphine at reduced or no cost. Many state-funded treatment programs also provide free or low-cost MAT. Call SAMHSA at 1-800-662-4357 to find these programs near you.',
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
        <span className="text-gray-900">Suboxone Cost Without Insurance</span>
      </nav>

      <header className="mb-8">
        <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          Cost Guide
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-4">
          Suboxone Cost Without Insurance — What You&apos;ll Actually Pay
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          The cost of suboxone treatment without insurance varies widely — from nearly free at a
          federally-funded clinic to several hundred dollars a month at a private practice. Here
          is an honest breakdown with practical ways to reduce what you pay.
        </p>
      </header>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-brand-navy mt-4 mb-4">
          The Medication: Generic vs Brand-Name
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This is the most important thing to know: <strong>generic buprenorphine/naloxone is the
          same medication as brand-name Suboxone</strong> and costs a fraction of the price.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-brand-navy text-white">
                <th className="p-3 text-left font-semibold">Medication</th>
                <th className="p-3 text-left font-semibold">Without Discount</th>
                <th className="p-3 text-left font-semibold">With GoodRx / Coupon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-white">
                <td className="p-3 text-gray-900 font-medium">Generic buprenorphine/naloxone 8mg/2mg film (30 strips)</td>
                <td className="p-3 text-gray-700">$80-180</td>
                <td className="p-3 text-green-700 font-semibold">$30-80</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 text-gray-900 font-medium">Brand Suboxone film 8mg/2mg (30 strips)</td>
                <td className="p-3 text-gray-700">$500-600</td>
                <td className="p-3 text-green-700 font-semibold">$150-350</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 text-gray-900 font-medium">Generic buprenorphine/naloxone tablets (30)</td>
                <td className="p-3 text-gray-700">$60-150</td>
                <td className="p-3 text-green-700 font-semibold">$20-60</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          Always ask your prescriber for the generic and bring a GoodRx coupon (free at goodrx.com)
          to the pharmacy. The difference between brand and generic is enormous. There is no
          clinical reason to pay for brand-name Suboxone if generic is available.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Clinic Visit Costs
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Medication is only part of the cost. You also need a prescriber — and visit fees vary
          significantly:
        </p>
        <div className="space-y-4 mb-6">
          <div className="card p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-brand-navy">Telehealth MAT Providers</h3>
              <span className="text-brand-teal font-semibold">$75-150/month</span>
            </div>
            <p className="text-sm text-gray-600">
              Monthly subscription model covering all visits. Often the most affordable option
              for patients paying out-of-pocket. First visit may cost more ($150-200).
            </p>
          </div>
          <div className="card p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-brand-navy">Private Suboxone Clinic (Office Visit)</h3>
              <span className="text-brand-amber font-semibold">$100-300/visit</span>
            </div>
            <p className="text-sm text-gray-600">
              Initial visit is typically higher ($200-400). Monthly follow-up visits run $100-200.
              Some clinics bundle medication management with counseling, which increases the fee.
            </p>
          </div>
          <div className="card p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-brand-navy">Federally Qualified Health Center (FQHC)</h3>
              <span className="text-green-700 font-semibold">$0-40/visit (sliding scale)</span>
            </div>
            <p className="text-sm text-gray-600">
              FQHCs are federally funded community health centers required to see all patients
              regardless of ability to pay. They offer sliding-scale fees based on income and
              many prescribe buprenorphine. Find yours at findahealthcenter.hrsa.gov.
            </p>
          </div>
          <div className="card p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-brand-navy">State-Funded OTP Clinic</h3>
              <span className="text-green-700 font-semibold">Often free or low-cost</span>
            </div>
            <p className="text-sm text-gray-600">
              State substance use treatment programs receive SAMHSA block grant funding and serve
              patients who can&apos;t pay. Call SAMHSA at 1-800-662-4357 to be connected with
              a state-funded program near you.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Programs That Reduce or Eliminate Your Cost
        </h2>
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">Medicaid</h3>
            <p className="text-sm text-gray-600">
              If your income is below about 138% of the federal poverty level, you likely qualify
              for Medicaid — which covers suboxone at zero or minimal cost. Apply at healthcare.gov
              or your state&apos;s Medicaid office. Enrollment can happen same day in many states.
              See{' '}
              <Link href="/suboxone-clinics/medicaid" className="text-brand-teal hover:underline">
                Medicaid-accepting clinics
              </Link>
              .
            </p>
          </div>
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">Manufacturer Patient Assistance</h3>
            <p className="text-sm text-gray-600">
              Indivior (Suboxone brand manufacturer) offers a patient assistance program for the
              brand-name film. Income limits apply. Ask your prescriber about it or search
              &quot;Suboxone patient assistance program&quot; on their website.
            </p>
          </div>
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">GoodRx and NeedyMeds</h3>
            <p className="text-sm text-gray-600">
              Free discount programs that reduce the cash price of generic buprenorphine at most
              pharmacies. GoodRx often brings the cost under $50/month. NeedyMeds (needymeds.org)
              lists additional prescription assistance programs.
            </p>
          </div>
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">340B Pricing at Clinics</h3>
            <p className="text-sm text-gray-600">
              Some clinics participate in the 340B drug pricing program, which allows them to
              dispense medications at significantly reduced cost to eligible patients. Ask any
              clinic you&apos;re considering whether they&apos;re a 340B provider.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          What Suboxone Actually Costs Month to Month
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          For most patients paying out-of-pocket with no discounts, realistic monthly costs look
          like this:
        </p>
        <div className="bg-gray-50 rounded-xl p-5 mb-6">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Generic buprenorphine/naloxone (with GoodRx)</span>
              <span className="font-semibold text-gray-900">$30-80</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Telehealth visit (monthly)</span>
              <span className="font-semibold text-gray-900">$75-150</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Urine drug screen (if required)</span>
              <span className="font-semibold text-gray-900">$0-50</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
              <span className="font-semibold text-gray-900">Estimated monthly total</span>
              <span className="font-bold text-brand-teal text-base">$100-280/mo</span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-6">
          Compare this to the cost of continued opioid use — financially, physically, and
          otherwise. At $150/month, suboxone treatment is one of the most cost-effective medical
          interventions that exists.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          If Cost Is Still a Barrier
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Don&apos;t let cost be the reason you don&apos;t start treatment. Call SAMHSA at
          1-800-662-4357. Tell them you need MAT and that you can&apos;t afford it. They will
          connect you with state-funded programs that can cover the cost entirely.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Also check whether you qualify for Medicaid — many people in active addiction don&apos;t
          realize they&apos;re eligible. Medicaid enrollment is fast and coverage is immediate in
          most states.
        </p>
      </article>

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          <FaqItem
            question="How much does suboxone cost without insurance?"
            answer="Generic buprenorphine/naloxone costs $30-100/month at most pharmacies using a GoodRx discount coupon. The brand-name Suboxone film costs $150-500/month without coverage. Clinic visit fees vary — telehealth MAT visits typically run $75-200/month."
          />
          <FaqItem
            question="Is there a patient assistance program for Suboxone?"
            answer="Yes. Indivior (brand-name Suboxone manufacturer) offers a patient assistance program for uninsured or underinsured patients. Many states also have medication assistance programs through their SAMHSA-funded treatment system. Ask your prescriber or call SAMHSA at 1-800-662-4357."
          />
          <FaqItem
            question="Can I get suboxone for free?"
            answer="In some cases, yes. Federally Qualified Health Centers (FQHCs) offer sliding-scale MAT and can prescribe buprenorphine at reduced or no cost. Many state-funded treatment programs also provide free or low-cost MAT. Call SAMHSA at 1-800-662-4357 to find these programs near you."
          />
        </div>
      </div>

      <div className="bg-brand-navy rounded-2xl text-white p-8 mt-10">
        <h2 className="text-xl font-bold mb-3">Find a Suboxone Clinic That Fits Your Budget</h2>
        <p className="text-gray-300 mb-5">
          Filter by Medicaid, sliding scale, and self-pay options. Browse 1,700+ clinics
          nationwide.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/suboxone-clinics/medicaid"
            className="inline-flex items-center px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
          >
            💳 Medicaid Clinics
          </Link>
          <Link
            href="/suboxone-clinics"
            className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
          >
            Browse All Clinics
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
