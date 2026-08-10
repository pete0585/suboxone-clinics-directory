import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Long Does Suboxone Treatment Last? | SuboxoneClinicFinder.com',
  description:
    'Suboxone treatment duration depends on the individual — not an arbitrary timeline. Research shows longer treatment means better outcomes. Here is what the evidence says.',
  openGraph: {
    title: 'How Long Does Suboxone Treatment Last?',
    description:
      'Research shows longer Suboxone treatment reduces relapse risk. Here is what the evidence says about treatment duration and when tapering is appropriate.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'Is there a maximum length of time for Suboxone treatment?',
    a: 'No. There is no evidence-based maximum duration for Suboxone (buprenorphine/naloxone) treatment. The American Society of Addiction Medicine (ASAM) and SAMHSA both recommend treating opioid use disorder as a chronic condition — similar to hypertension or diabetes — that requires ongoing medication management. For many people, this means years of treatment. Arbitrary time limits on MAT (medication-assisted treatment) are a common insurance restriction that conflicts with clinical evidence.',
  },
  {
    q: 'When is it safe to taper off Suboxone?',
    a: 'Tapering off Suboxone is most successful when: the person has had sustained remission (no illicit opioid use) for at least 1–2 years, their social environment and mental health are stable, they have built strong recovery support, and they want to taper — not because they are being required to. Tapering should be done slowly, under medical supervision, with a plan for what to do if cravings return. Research consistently shows that premature tapering significantly increases relapse risk.',
  },
  {
    q: 'Does staying on Suboxone long-term mean I am not in recovery?',
    a: 'No. Opioid use disorder is a brain disease that changes how the brain processes reward, stress, and self-control. Buprenorphine restores normal function in those brain circuits and dramatically reduces overdose risk, cravings, and illicit opioid use. Taking medication for a brain disorder is not "not being in recovery" — any more than taking a beta-blocker for heart disease means you haven\'t recovered from a cardiac event. The stigma around MAT is not evidence-based. People on Suboxone can be fully employed, in strong relationships, and living meaningful lives.',
  },
  {
    q: 'How does Suboxone treatment differ from methadone for duration?',
    a: 'Both buprenorphine (Suboxone) and methadone are evidence-based, indefinite-duration medications for opioid use disorder. The key difference is access: methadone for opioid use disorder must be dispensed daily at a licensed opioid treatment program (OTP). Suboxone can be prescribed in office-based settings — primary care, addiction medicine, psychiatry — and picked up at a pharmacy. This makes Suboxone more practical for long-term maintenance for most people. Neither has an evidence-based time limit.',
  },
  {
    q: 'What happens if I stop Suboxone suddenly?',
    a: 'Stopping Suboxone abruptly causes withdrawal symptoms — similar to opioid withdrawal but typically milder than stopping short-acting opioids. Symptoms include: anxiety, irritability, muscle aches, insomnia, sweating, and GI distress. The bigger risk is that craving intensity often surges in the days and weeks after stopping buprenorphine, significantly increasing relapse risk. If you want to stop Suboxone, the safest path is a slow, supervised taper — reducing the dose gradually over months, not days or weeks.',
  },
]

export default function SuboxoneDurationPage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-brand-teal">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:text-brand-teal">Guides</Link>
          <span>/</span>
          <span className="text-brand-navy">Suboxone Treatment Duration</span>
        </nav>

        <header className="mb-10">
          <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">Treatment Guide</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy leading-tight mb-4">
            How Long Does Suboxone Treatment Last?
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            The short answer: as long as it needs to. Opioid use disorder is a chronic condition.
            The evidence consistently shows that longer treatment reduces relapse risk — and that
            premature tapering is the leading cause of treatment failure.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">What the Research Says</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { stat: '50%+', label: 'Relapse rate within 1 month of stopping MAT', },
                { stat: '2–5x', label: 'Longer treatment = lower overdose risk', },
                { stat: 'Indefinite', label: 'ASAM recommended duration for OUD', },
              ].map((item) => (
                <div key={item.stat} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                  <div className="text-3xl font-extrabold text-brand-teal mb-1">{item.stat}</div>
                  <div className="text-sm text-gray-600 leading-snug">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <h3 className="text-xl font-bold text-brand-navy mb-3">The Phases of Suboxone Treatment</h3>
              <div className="space-y-4">
                {[
                  { phase: 'Induction (Days 1–3)', detail: 'Starting Suboxone after entering mild-to-moderate withdrawal. The dose is titrated up until withdrawal symptoms resolve and cravings are controlled. This phase requires close contact with your prescriber.' },
                  { phase: 'Stabilization (Weeks 2–8)', detail: 'Finding the right maintenance dose — typically 8–24mg/day. Most people stabilize within the first month. The goal is: no withdrawal, minimal cravings, no illicit opioid use.' },
                  { phase: 'Maintenance (Months to Years)', detail: 'Continuing at the stabilized dose while building recovery skills, addressing underlying factors (trauma, mental health, social determinants), and developing a stable life. No evidence-based time limit.' },
                  { phase: 'Taper (If and When Appropriate)', detail: 'A slow, voluntary reduction over months — when remission is sustained, support is strong, and the person is motivated. Not a requirement, and never rushed.' },
                ].map((item, i) => (
                  <div key={item.phase} className="flex gap-4">
                    <div className="bg-brand-teal/10 text-brand-teal font-bold text-lg w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <div>
                      <p className="font-bold text-brand-navy">{item.phase}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mt-1">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-4">Common Barriers to Adequate Treatment Duration</h2>
            <div className="space-y-3">
              {[
                { barrier: 'Insurance prior authorization limits', detail: 'Many insurers require re-authorization every 6–12 months. Some apply arbitrary duration limits not supported by clinical guidelines. These can be appealed with supporting documentation from your prescriber.' },
                { barrier: 'Provider time limits ("2 years and done")', detail: 'Some prescribers impose internal limits on MAT duration that conflict with ASAM guidelines. If your provider is pushing you to taper before you feel ready, seek a second opinion from an addiction medicine specialist.' },
                { barrier: 'Stigma from family or community', detail: 'Social pressure to "get off the medication" is one of the most common reasons people taper prematurely — and subsequently relapse. Evidence about treatment duration can help conversations with family members.' },
              ].map((item) => (
                <div key={item.barrier} className="bg-white border border-gray-200 rounded-xl p-5">
                  <p className="font-bold text-brand-navy mb-1">{item.barrier}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-brand-navy">Frequently Asked Questions</h2>
            {FAQ.map((faq) => (
              <div key={faq.q} className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-brand-navy mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </section>

          <div className="bg-brand-navy rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">Find a Suboxone Prescriber</h2>
            <p className="text-gray-300 mb-6 text-sm">
              Search our directory for office-based buprenorphine prescribers who offer ongoing maintenance treatment.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-teal/90 transition-colors"
            >
              Find a Prescriber Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-bold text-brand-navy mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-suboxone" className="text-sm text-brand-teal hover:underline font-medium">What Is Suboxone? →</Link>
              <Link href="/guides/suboxone-vs-methadone" className="text-sm text-brand-teal hover:underline font-medium">Suboxone vs. Methadone →</Link>
              <Link href="/guides/finding-suboxone-doctor" className="text-sm text-brand-teal hover:underline font-medium">How to Find a Suboxone Doctor →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
