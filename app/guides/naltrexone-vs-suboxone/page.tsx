import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Naltrexone vs. Suboxone: Which Is Right for You? | SuboxoneClinicFinder.com',
  description:
    'Naltrexone (Vivitrol) and Suboxone (buprenorphine/naloxone) are both FDA-approved for opioid use disorder — but they work completely differently. Here is how to tell which fits your situation.',
  openGraph: {
    title: 'Naltrexone vs. Suboxone: Which Is Right for You?',
    description:
      'Suboxone and naltrexone both treat OUD. The difference in how they work determines which is appropriate for your situation.',
  },
}

export const revalidate = 86400

const FAQ = [
  {
    q: 'What is the main difference between Suboxone and naltrexone?',
    a: 'Buprenorphine (Suboxone) is a partial opioid agonist — it activates opioid receptors at a reduced level, eliminating withdrawal and cravings without producing significant euphoria. Naltrexone (Vivitrol) is an opioid antagonist — it blocks opioid receptors entirely, so opioids have no effect while naltrexone is active. Neither is a "stronger" treatment — they work through completely different mechanisms and are appropriate for different situations.',
  },
  {
    q: 'Who is a good candidate for Suboxone?',
    a: "Suboxone is appropriate for most people beginning opioid use disorder treatment. It's particularly useful when: the person is still using opioids regularly (Suboxone can be started during withdrawal without requiring a detox period first), physical withdrawal is severe, or the person has had difficulty with naltrexone adherence in the past. Suboxone is taken daily as a sublingual film or tablet. It has a ceiling effect that prevents euphoria at therapeutic doses.",
  },
  {
    q: 'Who is a good candidate for naltrexone (Vivitrol)?',
    a: 'Naltrexone is appropriate for people who: have completed medical detoxification and have been opioid-free for at least 7–10 days (this is a firm requirement — starting naltrexone before full detox causes precipitated withdrawal, which is severely uncomfortable), have strong internal motivation and social support for abstinence, prefer not to take a daily medication, or are in settings that require confirmed opioid-free status (certain criminal justice or employment situations). Vivitrol (injectable extended-release naltrexone) is given monthly and eliminates the daily adherence problem.',
  },
  {
    q: 'Which medication has better outcomes?',
    a: "Head-to-head research shows both are effective — but adherence patterns differ significantly. In the landmark X:BOT trial (New England Journal of Medicine, 2018), buprenorphine and extended-release naltrexone had similar outcomes among participants who successfully started treatment. The critical finding: 28% of the naltrexone group failed to complete detox and never started the medication (vs. 6% in the buprenorphine group). Because naltrexone requires full detox first, it has a real-world barrier that buprenorphine doesn't. For most people starting treatment from active use, buprenorphine is the lower-barrier, higher-adherence option.",
  },
  {
    q: 'Can you switch from Suboxone to naltrexone?',
    a: 'Yes, but switching from buprenorphine to naltrexone requires a full taper off buprenorphine, followed by 7–10 days opioid-free before starting naltrexone. Because buprenorphine has a long half-life and stays in the body for days, this transition requires careful medical management. Some prescribers use a bridging protocol with short-acting opioids during the transition. Switching should only be done under close medical supervision — starting naltrexone too early after stopping buprenorphine causes precipitated withdrawal.',
  },
]

COMPARISON_ROWS = [
  { aspect: 'Drug class', sub: 'Partial opioid agonist', nal: 'Opioid antagonist' },
  { aspect: 'How it works', sub: 'Activates opioid receptors (partially)', nal: 'Blocks opioid receptors' },
  { aspect: 'Starting requirement', sub: 'Begin during mild-moderate withdrawal', nal: 'Must be opioid-free 7–10 days' },
  { aspect: 'Form', sub: 'Daily sublingual film or tablet', nal: 'Monthly injection (Vivitrol) or daily oral pill' },
  { aspect: 'If you use opioids while on it', sub: 'Partial blocking effect; reduced effect', nal: 'Opioids have no effect (full block)' },
  { aspect: 'Withdrawal if stopped', sub: 'Yes — taper required', nal: 'No opioid withdrawal' },
  { aspect: 'DEA schedule', sub: 'Schedule III (requires special waiver — eliminated in 2023)', nal: 'Not scheduled (no waiver required)' },
  { aspect: 'Cost', sub: '~$150–$400/month w/o insurance', nal: '~$1,200–$1,800/injection w/o insurance' },
]

export default function NaltrexoneVsSuboxonePage() {
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
          <span className="text-brand-navy">Naltrexone vs. Suboxone</span>
        </nav>

        <header className="mb-10">
          <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">Treatment Guide</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy leading-tight mb-4">
            Naltrexone vs. Suboxone: Which Is Right for You?
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Both are FDA-approved for opioid use disorder. Both are evidence-based. They work through
            completely different mechanisms — and that determines which is appropriate for your situation.
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-brand-navy mb-5">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-navy text-white">
                    <th className="text-left p-3 font-semibold"> </th>
                    <th className="text-left p-3 font-semibold">Suboxone (Buprenorphine)</th>
                    <th className="text-left p-3 font-semibold">Naltrexone (Vivitrol)</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-3 font-medium text-brand-navy">{row.aspect}</td>
                      <td className="p-3 text-gray-600">{row.sub}</td>
                      <td className="p-3 text-gray-600">{row.nal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-brand-teal/10 rounded-xl p-6">
                <h3 className="font-bold text-brand-navy mb-3">Start with Suboxone when:</h3>
                <ul className="space-y-2">
                  {[
                    'Still using opioids regularly',
                    'Completing full detox feels difficult',
                    'History of failed detox attempts',
                    'Daily oral medication is acceptable',
                    'Physical withdrawal symptoms are severe',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-teal font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="font-bold text-brand-navy mb-3">Consider naltrexone when:</h3>
                <ul className="space-y-2">
                  {[
                    'Already completed detox (7–10 days opioid-free)',
                    'Prefer monthly injection over daily pill',
                    'Strong motivation and social support',
                    'Employment/legal context requiring non-scheduled medication',
                    'Alcohol use disorder is also a goal to treat',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-brand-teal font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
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
            <h2 className="text-2xl font-bold mb-3">Find a MAT Provider Near You</h2>
            <p className="text-gray-300 mb-6 text-sm">
              Search our directory for Suboxone prescribers and naltrexone providers by location.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 bg-brand-teal text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-teal/90 transition-colors"
            >
              Find a Provider Near Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h3 className="font-bold text-brand-navy mb-3">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/what-is-suboxone" className="text-sm text-brand-teal hover:underline font-medium">What Is Suboxone? →</Link>
              <Link href="/guides/suboxone-vs-methadone" className="text-sm text-brand-teal hover:underline font-medium">Suboxone vs. Methadone →</Link>
              <Link href="/guides/suboxone-treatment-duration" className="text-sm text-brand-teal hover:underline font-medium">How Long Does Treatment Last? →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
