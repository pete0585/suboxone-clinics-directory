import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Suboxone vs Methadone: What Is the Difference?',
  description:
    'Suboxone and methadone both treat opioid use disorder but work differently. Learn the key differences in how they work, where you get them, and which might be right for you.',
  alternates: { canonical: '/guides/suboxone-vs-methadone' },
  openGraph: {
    title: 'Suboxone vs Methadone | SuboxoneClinicFinder',
    description:
      'Key differences between suboxone and methadone for opioid use disorder treatment. Evidence-based guide.',
  },
}

export default function SuboxoneVsMethadonePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between suboxone and methadone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Suboxone is buprenorphine/naloxone, a partial opioid agonist taken at home as a daily film or tablet. Methadone for OUD is a full agonist dispensed daily at a federally-certified opioid treatment program (OTP) clinic. Suboxone is more accessible but may not work for patients with very high opioid tolerance.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is suboxone better than methadone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Neither is universally better. Both are equally effective at preventing opioid relapse when taken as prescribed. Suboxone is more convenient because you take it at home. Methadone may be a better fit for patients with very high opioid dependence or those who do better with daily clinic visits and structured support.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I switch from methadone to suboxone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, but it requires careful planning with your prescriber. You need to taper methadone to a lower dose first before transitioning to buprenorphine to avoid precipitated withdrawal. Never attempt this without medical supervision.',
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
        <span className="text-gray-900">Suboxone vs Methadone</span>
      </nav>

      <header className="mb-8">
        <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          Treatment Guide
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-4">
          Suboxone vs Methadone: What Is the Difference?
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Both treat opioid use disorder. Both are effective. But they work differently, come with
          different access requirements, and suit different situations. Here&apos;s what you need
          to know to have an informed conversation with your doctor.
        </p>
      </header>

      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-brand-navy text-white">
              <th className="p-3 text-left font-semibold">Factor</th>
              <th className="p-3 text-left font-semibold">Suboxone (Buprenorphine)</th>
              <th className="p-3 text-left font-semibold">Methadone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-white">
              <td className="p-3 font-medium text-gray-900">Drug class</td>
              <td className="p-3 text-gray-700">Partial opioid agonist</td>
              <td className="p-3 text-gray-700">Full opioid agonist</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium text-gray-900">Where you get it</td>
              <td className="p-3 text-gray-700">Doctor&apos;s office, clinic, or telehealth — prescription filled at pharmacy</td>
              <td className="p-3 text-gray-700">Federally-certified OTP clinic — dispensed daily on-site</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium text-gray-900">Daily visits required</td>
              <td className="p-3 text-gray-700">No — take at home</td>
              <td className="p-3 text-gray-700">Yes, initially. Can earn take-home doses over time</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium text-gray-900">Ceiling effect</td>
              <td className="p-3 text-gray-700">Yes — dose plateaus, lower overdose risk</td>
              <td className="p-3 text-gray-700">No ceiling — higher overdose risk if misused</td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 font-medium text-gray-900">Best for</td>
              <td className="p-3 text-gray-700">Moderate opioid dependence, patients who need flexibility, telehealth-accessible</td>
              <td className="p-3 text-gray-700">Severe dependence, patients who benefit from structure, those who didn&apos;t respond to buprenorphine</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 font-medium text-gray-900">Medicaid coverage</td>
              <td className="p-3 text-gray-700">All 50 states</td>
              <td className="p-3 text-gray-700">All 50 states (at certified OTPs)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          How They Work Differently
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Methadone is a full opioid agonist — it activates opioid receptors completely. That&apos;s
          why it controls cravings and withdrawal symptoms so effectively in people with severe
          opioid dependence. It&apos;s also why it carries a higher overdose risk if the dose is
          too high or combined with other depressants.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Buprenorphine (the active ingredient in Suboxone) is a partial agonist — it activates
          opioid receptors but only to a ceiling level. Above a certain dose, the effect doesn&apos;t
          increase. This &quot;ceiling effect&quot; makes it significantly safer in terms of overdose
          risk. The naloxone in Suboxone is added to deter injection — if injected rather than
          taken sublingually, the naloxone blocks the buprenorphine and can trigger withdrawal.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Access: This Is the Practical Difference
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The biggest day-to-day difference between suboxone and methadone for most patients
          isn&apos;t pharmacological — it&apos;s access.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Suboxone can be prescribed by any DEA-registered physician, nurse practitioner, or
          physician assistant. Since 2023, the X-waiver requirement was eliminated, meaning your
          regular primary care doctor can now prescribe it. You fill it at any pharmacy. You can
          get it via telehealth. You take it at home and come in for follow-up visits monthly or
          quarterly.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          Methadone for opioid use disorder, by contrast, can only be dispensed through a
          federally-certified Opioid Treatment Program (OTP). You go to the clinic — often daily,
          at least initially — to receive your dose under observation. Take-home doses are earned
          through demonstrated adherence over months to years. This structure is therapeutic for
          some patients and prohibitive for others.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Which Is More Effective?
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Both are highly effective. Multiple large clinical trials have shown similar long-term
          outcomes when patients stay in treatment. The key word is &quot;stay.&quot; Treatment
          adherence is the primary driver of outcomes — whichever medication a patient actually
          takes consistently is the better medication for that patient.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          For patients with very high opioid tolerance — particularly those dependent on high-dose
          fentanyl — methadone may provide better symptom control at high doses in a way
          buprenorphine&apos;s ceiling effect doesn&apos;t allow. For patients who need flexibility
          and access without daily clinic visits, buprenorphine is typically the better fit.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          The Veteran Angle
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          The VA covers both buprenorphine and methadone (at VA-certified OTPs) for veterans with
          opioid use disorder. Military service, combat exposure, and chronic pain from service-
          related injuries are documented risk factors for opioid dependence — the VA has
          significantly expanded MAT access in recent years. See our{' '}
          <Link
            href="/guides/veterans-suboxone-treatment"
            className="text-brand-teal hover:underline"
          >
            veteran&apos;s guide to suboxone and VA coverage
          </Link>{' '}
          for details.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          The Bottom Line
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Neither medication is universally better. The right choice depends on your history,
          your tolerance level, your daily schedule, and what access you have. The most important
          thing is to get into treatment — the medication conversation can happen with your
          provider once you&apos;re connected.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          If you&apos;re not sure which direction to go, a suboxone clinic is typically the
          faster and more accessible starting point. You can always discuss methadone with your
          prescriber if buprenorphine isn&apos;t working after an appropriate trial.
        </p>
      </article>

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">Common Questions</h2>
        <div className="space-y-5">
          <FaqItem
            question="Is suboxone better than methadone?"
            answer="Neither is universally better. Both are equally effective at preventing opioid relapse when taken as prescribed. Suboxone is more convenient — you take it at home. Methadone may be a better fit for patients with very high opioid dependence or those who do better with daily clinic visits and structured support."
          />
          <FaqItem
            question="Can I switch from methadone to suboxone?"
            answer="Yes, but it requires careful planning with your prescriber. You need to taper methadone to a lower dose before transitioning to buprenorphine to avoid precipitated withdrawal. Never attempt this without medical supervision."
          />
          <FaqItem
            question="Does Vivitrol (naltrexone) work the same as suboxone?"
            answer="Naltrexone (Vivitrol) is a different class entirely — it blocks opioid receptors completely and has no agonist effect. It requires full detox before starting and works differently than agonist therapies. It's a valid option for some patients but the clinical evidence for buprenorphine and methadone is stronger and longer-term."
          />
        </div>
      </div>

      <div className="bg-brand-navy rounded-2xl text-white p-8 mt-10">
        <h2 className="text-xl font-bold mb-3">Find a Suboxone Clinic Near You</h2>
        <p className="text-gray-300 mb-5">
          Browse suboxone clinics by city. Filter by Medicaid, telehealth, and accepting new
          patients.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/suboxone-clinics"
            className="inline-flex items-center px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
          >
            Browse Clinics
          </Link>
          <Link
            href="/guides/how-to-find-suboxone-clinic"
            className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
          >
            How to Get Started
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
