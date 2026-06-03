import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'VA Coverage for Suboxone — Veterans and Buprenorphine MAT Treatment',
  description:
    'Does the VA cover suboxone? Yes. Complete guide to VA buprenorphine coverage, how to access MAT through the VA or civilian providers, and why veterans have higher rates of opioid use disorder.',
  alternates: { canonical: '/guides/veterans-suboxone-treatment' },
  openGraph: {
    title: 'Veterans and Suboxone Treatment | SuboxoneClinicFinder',
    description:
      'Complete guide to VA suboxone coverage, veteran MAT access, and how to get buprenorphine treatment as a veteran.',
  },
}

export default function VeteransSuboxonePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does the VA cover suboxone treatment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes. The VA covers buprenorphine (Suboxone) for opioid use disorder as part of its Substance Use Disorder (SUD) treatment program. Coverage includes the medication, office visits, counseling, and related services at no cost or low cost to eligible veterans.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get suboxone outside the VA as a veteran?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. If the VA cannot provide timely access to MAT, you may be eligible for community care through the VA Community Care Program, which allows you to see a civilian provider at VA expense. You can also use civilian providers independently — your VA coverage does not prevent this.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are veterans at higher risk for opioid use disorder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Combat deployment, chronic pain from service-related injuries, PTSD, and traumatic brain injury (TBI) are documented risk factors for opioid use disorder. Prescription opioids were aggressively used to treat combat-related pain in the post-9/11 era, creating a documented pipeline from pain management to dependence in the veteran population.',
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
        <span className="text-gray-900">Veterans and Suboxone Treatment</span>
      </nav>

      <header className="mb-8">
        <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          Veterans Guide
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-4">
          VA Coverage for Suboxone — Veterans and Buprenorphine MAT
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          The VA covers suboxone. The question is how to access it — and what your options are if
          the VA system isn&apos;t working fast enough. This guide covers both.
        </p>
      </header>

      <div className="bg-brand-navy rounded-xl text-white p-6 mb-8">
        <p className="font-semibold mb-2">The short answer:</p>
        <p className="text-gray-300 text-sm leading-relaxed">
          Yes, the VA covers buprenorphine for opioid use disorder at no cost to most eligible
          veterans. If your VA can&apos;t see you quickly, you have the right to request a
          Community Care referral to a civilian MAT provider — also covered by VA. If you need
          something faster, this directory lists civilian suboxone clinics in your area.
        </p>
      </div>

      <article className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold text-brand-navy mt-4 mb-4">
          The Connection Between Military Service and Opioid Use Disorder
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          This isn&apos;t a niche problem. Veterans have significantly higher rates of opioid use
          disorder than the general population, and the reasons are documented and straightforward:
        </p>
        <ul className="text-gray-700 space-y-2 mb-6 list-disc list-inside">
          <li>
            <strong>Chronic pain from service-related injuries</strong> — musculoskeletal injuries
            from training, blast exposure, and combat are common. For years, prescription opioids
            were the primary treatment.
          </li>
          <li>
            <strong>Post-9/11 opioid prescribing patterns</strong> — opioid prescriptions within
            the VA and DoD system increased dramatically from 2001-2012. Many veterans who were
            appropriately treated for pain developed dependence.
          </li>
          <li>
            <strong>PTSD and TBI comorbidities</strong> — post-traumatic stress disorder and
            traumatic brain injury are both associated with higher rates of substance use disorder.
            Multiple combat deployments amplify this.
          </li>
          <li>
            <strong>Transition stress</strong> — separating from military service is one of the
            most significant life disruptions a person can experience. Loss of identity, community,
            structure, and purpose creates vulnerability.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-6">
          Seeking treatment for opioid use disorder is not a character failure. For many veterans,
          it&apos;s a direct consequence of injuries sustained in service — physical and otherwise.
          The pipeline from chronic pain management to opioid dependence was created at the
          system level. Treatment is a medical response to a medical problem.
        </p>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          What the VA Covers for Suboxone Treatment
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The VA has significantly expanded Medication-Assisted Treatment (MAT) access since 2017.
          Here is what coverage looks like for eligible veterans:
        </p>
        <div className="space-y-4 mb-6">
          <div className="card p-5">
            <h3 className="font-bold text-brand-navy mb-2">Buprenorphine Prescription</h3>
            <p className="text-sm text-gray-600">
              Covered at no copay for most veterans (Priority Groups 1-6). Veterans in Priority
              Groups 7-8 may pay a prescription copay. Generic buprenorphine is on the VA
              national formulary.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-brand-navy mb-2">MAT-Related Office Visits</h3>
            <p className="text-sm text-gray-600">
              Visits for medication management are covered. Mental health and SUD visits have
              no copay regardless of priority group — this means your prescriber visits for
              suboxone are typically free.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-brand-navy mb-2">Counseling and Behavioral Health</h3>
            <p className="text-sm text-gray-600">
              Individual and group counseling for substance use disorder. Many VA facilities
              offer integrated PTSD and SUD treatment, which is particularly relevant for veterans
              dealing with both.
            </p>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-brand-navy mb-2">Telehealth MAT (VA Video Connect)</h3>
            <p className="text-sm text-gray-600">
              The VA offers buprenorphine prescribing via video appointment through VA Video
              Connect. This expands access for veterans in rural areas or who can&apos;t travel
              to a VA facility easily.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          How to Access MAT Through the VA
        </h2>
        <ol className="text-gray-700 space-y-3 mb-6 list-decimal list-inside">
          <li>
            <strong>Contact your VA primary care provider or Patient Aligned Care Team (PACT).</strong>{' '}
            Tell them you want to discuss MAT for opioid use disorder. You do not need a referral
            to bring this up — primary care can initiate buprenorphine prescribing directly.
          </li>
          <li>
            <strong>If your PACT can&apos;t prescribe buprenorphine, ask for a referral to
            mental health or SUD specialty care.</strong> Every VA facility has substance use
            disorder services or a referral pathway.
          </li>
          <li>
            <strong>If wait times are long, request Community Care.</strong> Under the MISSION Act,
            veterans have the right to request care from a community provider if the VA
            can&apos;t schedule within 20 days for primary care or 28 days for specialty care.
            MAT qualifies. Ask your VA coordinator specifically about a Community Care referral
            for suboxone treatment.
          </li>
          <li>
            <strong>If you&apos;re not enrolled in VA healthcare, apply.</strong> Most veterans
            who served on active duty are eligible. Apply at va.gov/health-care/apply or call
            1-877-222-8387. Enrollment can be processed quickly, especially for veterans with
            service-connected conditions.
          </li>
        </ol>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Using Civilian Suboxone Clinics as a Veteran
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You don&apos;t have to wait for the VA. If you need treatment faster than the VA can
          provide it, civilian options are available:
        </p>
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">Community Care Program</h3>
            <p className="text-sm text-gray-600">
              Get VA approval to see a civilian provider at VA expense. Requires a referral from
              your VA coordinator. This is the right path if you&apos;re enrolled in VA healthcare
              but can&apos;t get a timely appointment.
            </p>
          </div>
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">TRICARE (Active Duty / Guard / Reserve)</h3>
            <p className="text-sm text-gray-600">
              TRICARE covers MAT including buprenorphine for qualifying beneficiaries. Contact
              your regional TRICARE contractor for provider network information.
            </p>
          </div>
          <div className="border-l-4 border-brand-teal pl-4">
            <h3 className="font-semibold text-gray-900 mb-1">Civilian Telehealth Providers</h3>
            <p className="text-sm text-gray-600">
              Telehealth suboxone providers can often schedule within 24-48 hours. If you have
              private insurance, Medicare, or Medicaid, civilian providers are covered. If
              you&apos;re paying out of pocket, generic buprenorphine via telehealth runs
              $100-250/month — often less than a VA Community Care copay for non-service-
              connected conditions.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-brand-navy mt-8 mb-4">
          Crisis Resources for Veterans
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
          <p className="font-semibold text-gray-900 mb-2">If you&apos;re in crisis right now:</p>
          <ul className="text-sm text-gray-700 space-y-1.5">
            <li>
              <strong>Veterans Crisis Line:</strong>{' '}
              <a href="tel:988" className="text-red-700 font-bold hover:underline">
                988, then press 1
              </a>{' '}
              — also available by text (text 838255)
            </li>
            <li>
              <strong>SAMHSA Helpline:</strong>{' '}
              <a href="tel:18006624357" className="text-red-700 font-bold hover:underline">
                1-800-662-4357
              </a>{' '}
              — substance use treatment referrals, 24/7, free
            </li>
            <li>
              <strong>VA Substance Use Disorder Services:</strong> va.gov/health-care/health-needs-conditions/substance-use-problems
            </li>
          </ul>
        </div>
      </article>

      <div className="border-t border-gray-200 pt-8 mt-8">
        <h2 className="text-xl font-bold text-brand-navy mb-6">Common Questions</h2>
        <div className="space-y-5">
          <FaqItem
            question="Does the VA cover suboxone treatment?"
            answer="Yes. The VA covers buprenorphine (Suboxone) for opioid use disorder as part of its Substance Use Disorder treatment program. Coverage includes the medication, office visits, counseling, and related services at no cost or low cost to eligible veterans."
          />
          <FaqItem
            question="Can I get suboxone outside the VA as a veteran?"
            answer="Yes. If the VA cannot provide timely access to MAT, you may be eligible for community care through the VA Community Care Program, which allows you to see a civilian provider at VA expense. You can also use civilian providers independently — your VA coverage does not prevent this."
          />
          <FaqItem
            question="Will seeking suboxone treatment affect my security clearance?"
            answer="Seeking treatment for a diagnosed medical condition, including opioid use disorder, is generally viewed more favorably than untreated substance use in security clearance reviews. Hiding the problem is riskier than treating it. Consult a security clearance attorney for guidance on your specific situation."
          />
        </div>
      </div>

      <div className="bg-brand-navy rounded-2xl text-white p-8 mt-10">
        <h2 className="text-xl font-bold mb-3">Find a Suboxone Clinic Near You</h2>
        <p className="text-gray-300 mb-5">
          Browse suboxone clinics by state. Filter by Medicaid and telehealth to find the
          fastest path to treatment.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/suboxone-clinics"
            className="inline-flex items-center px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
          >
            Browse Clinics
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
