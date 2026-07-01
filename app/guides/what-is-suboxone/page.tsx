import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "What Is Suboxone? A Patient's Guide to Buprenorphine/Naloxone Treatment",
  description:
    "Suboxone is buprenorphine/naloxone — a medication that stops opioid cravings and withdrawal without producing a high. A plain-language guide to how it works, who it's for, and what to expect.",
  alternates: { canonical: '/guides/what-is-suboxone' },
  openGraph: {
    title: "What Is Suboxone? A Patient's Guide | SuboxoneClinicFinder",
    description:
      "Plain-language guide to Suboxone (buprenorphine/naloxone) — how it works, who it's for, how to start, and how long to stay on it.",
  },
}

export default function WhatIsSuboxonePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between buprenorphine and Suboxone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Buprenorphine is the active opioid medication that treats opioid use disorder. Suboxone is a brand name for buprenorphine combined with naloxone. Naloxone is added to prevent injection misuse — if Suboxone is injected, the naloxone precipitates withdrawal. When taken as prescribed under the tongue, the naloxone is not significantly absorbed and does not affect the treatment. Generic buprenorphine/naloxone films and tablets are widely available and work the same way as brand-name Suboxone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Suboxone addictive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Buprenorphine is a partial opioid agonist and does have physical dependence potential — meaning stopping it abruptly causes withdrawal symptoms. However, physical dependence is not the same as addiction. Suboxone does not produce the euphoric high of full opioid agonists at therapeutic doses due to its ceiling effect. The evidence strongly supports long-term or indefinite buprenorphine maintenance for opioid use disorder — the benefits of treatment (reduced overdose risk, stable functioning) far outweigh the manageable nature of physical dependence.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Suboxone cause an overdose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Suboxone has a ceiling effect — above a certain dose, increasing buprenorphine does not increase respiratory depression, which is the mechanism of opioid overdose. This makes buprenorphine significantly safer than full agonist opioids like heroin, fentanyl, or oxycodone. Fatal overdose from buprenorphine alone is extremely rare. The primary overdose risk is combining buprenorphine with benzodiazepines or alcohol, which can suppress breathing. People in treatment should discuss all medications with their prescriber.",
        },
      },
      {
        '@type': 'Question',
        name: 'How long does Suboxone treatment last?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The evidence consistently shows that longer treatment duration is associated with better outcomes. There is no medically recommended maximum duration — indefinite maintenance is an evidence-based option for many patients, particularly those with severe or long-standing opioid use disorder. Tapering and discontinuing Suboxone is possible, but the decision should be made with a prescriber based on individual stability and readiness, not arbitrary timelines.',
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
        <span className="text-gray-900">What Is Suboxone?</span>
      </nav>

      <header className="mb-8">
        <div className="text-brand-teal text-sm font-semibold uppercase tracking-wide mb-2">
          Patient Guide
        </div>
        <h1 className="text-3xl font-extrabold text-brand-navy mb-4">
          What Is Suboxone? A Patient&apos;s Guide to Buprenorphine/Naloxone Treatment
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Suboxone is one of the most effective treatments for opioid use disorder — but it is
          still misunderstood by many patients, families, and even some healthcare providers.
          This guide covers how it works, who it is for, and what to expect in treatment.
        </p>
      </header>

      {/* What is Suboxone */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">What Is Suboxone?</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Suboxone is a brand name for a combination of two medications: <strong>buprenorphine</strong> and <strong>naloxone</strong>.
          It is used to treat opioid use disorder (OUD) — dependence on heroin, fentanyl, prescription opioids, or other opioids.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          <strong>Buprenorphine</strong> is a partial opioid agonist. It activates the same brain receptors as other opioids — preventing
          cravings and withdrawal — but because it is a <em>partial</em> agonist rather than a full one, it has a &quot;ceiling effect.&quot;
          Above a certain dose, it does not produce the euphoric high or dangerous respiratory depression associated with heroin or
          prescription opioids.
        </p>
        <p className="text-gray-600 leading-relaxed">
          <strong>Naloxone</strong> is added to deter injection misuse. If Suboxone is injected rather than taken under the tongue,
          the naloxone component precipitates withdrawal. When taken as prescribed (sublingually or buccally), the naloxone is not
          significantly absorbed and does not interfere with the treatment effect.
        </p>
      </section>

      {/* How does Suboxone work */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">How Does Suboxone Work?</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Suboxone works by binding tightly to opioid receptors in the brain — specifically the mu-opioid receptor.
          This binding accomplishes several things at once:
        </p>
        <div className="space-y-4">
          {[
            {
              title: 'Eliminates cravings',
              body: 'By occupying opioid receptors, buprenorphine blocks the craving signal that drives compulsive opioid use. Patients who are stabilized on Suboxone report significantly reduced or absent opioid cravings.',
            },
            {
              title: 'Prevents withdrawal',
              body: "Buprenorphine's long half-life (24-72 hours) means once-daily dosing maintains stable blood levels, preventing the cycle of withdrawal that drives continued opioid use. Patients no longer feel sick between doses.",
            },
            {
              title: 'Blocks the effect of other opioids',
              body: "Because buprenorphine occupies opioid receptors so tightly, using other opioids on top of Suboxone does not produce the expected high — which reduces the reinforcement of opioid use.",
            },
            {
              title: 'Dramatically reduces overdose risk',
              body: "The ceiling effect means that buprenorphine does not cause fatal respiratory depression at therapeutic doses the way full agonist opioids do. This is why Suboxone is considered much safer than illicit opioids.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <span className="text-brand-teal font-bold text-lg mt-0.5">✓</span>
              <div>
                <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who is Suboxone for */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">Who Is Suboxone For?</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Suboxone is FDA-approved for the treatment of opioid use disorder. It is appropriate for
          people with dependence on:
        </p>
        <ul className="space-y-2 mb-5">
          {['Heroin', 'Fentanyl and fentanyl analogs', 'Prescription opioids (oxycodone, hydrocodone, morphine)', 'Other opioids'].map((item) => (
            <li key={item} className="flex gap-2 text-sm text-gray-700">
              <span className="text-brand-teal">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-gray-600 leading-relaxed">
          Suboxone is <strong>not</strong> appropriate for alcohol use disorder or stimulant use disorder (cocaine, methamphetamine)
          — these require different medications and treatment approaches. If you have multiple substance use disorders,
          discuss the full picture with your provider.
        </p>
      </section>

      {/* How do you start */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">How Do You Start Suboxone?</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Starting Suboxone requires a process called <strong>induction</strong> — the first dose. Because buprenorphine
          binds so tightly to opioid receptors, taking it while other opioids are still active can
          precipitate sudden, severe withdrawal. Timing is critical.
        </p>
        <div className="space-y-4">
          {[
            {
              step: 'Wait for mild-to-moderate withdrawal to begin',
              detail: 'Before taking the first dose, you need to be in mild-to-moderate opioid withdrawal — meaning the opioids are clearing from your system. This is typically 12-24 hours after your last heroin or short-acting opioid use, or longer for long-acting opioids like methadone.',
            },
            {
              step: 'Home induction is now approved',
              detail: 'Traditional induction required coming to a clinic for the first dose under observation. Home induction — where a provider guides you through starting Suboxone at home via telehealth — is now approved and widely available. Many telehealth MAT providers use this approach.',
            },
            {
              step: 'Expect dose adjustment in the first 1-2 weeks',
              detail: 'The first dose is usually 2-4mg of buprenorphine. Your provider will adjust upward based on how well cravings and withdrawal are controlled. Most patients stabilize between 8-24mg per day.',
            },
            {
              step: 'First 24-48 hours',
              detail: 'In the first day or two, some patients experience mild side effects: headache, nausea, sweating, or sleep disruption. These typically resolve within a week as the body adjusts to the medication.',
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="bg-brand-teal/10 text-brand-teal font-bold text-lg w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">{item.step}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How long */}
      <section className="bg-white border border-gray-200 rounded-2xl p-7 mb-8">
        <h2 className="text-2xl font-bold text-brand-navy mb-4">
          How Long Do People Stay on Suboxone?
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          The evidence is clear: longer is better. Research consistently shows that patients who stay
          on buprenorphine longer have better outcomes — lower relapse rates, lower overdose risk,
          and higher rates of sustained recovery.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          Indefinite maintenance — staying on Suboxone long-term with no planned taper — is a
          valid, evidence-based choice for many patients. The comparison is instructive: we do not
          expect people with high blood pressure to eventually stop their medication because they
          feel better. Opioid use disorder has a significant biological component, and for many
          patients, long-term medication support produces the best outcomes.
        </p>
        <p className="text-gray-600 leading-relaxed">
          If and when a patient decides to taper off Suboxone, the process should be slow —
          often over months to years — and guided by a prescriber. Tapering timelines vary
          significantly based on duration of treatment, dose, and individual factors. There is no
          universal right answer, and the decision should be made collaboratively when the patient
          is stable and motivated, not under external pressure.
        </p>
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
        <h2 className="text-xl font-bold mb-2">Ready to Find a Suboxone Provider?</h2>
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
            { href: '/guides/finding-suboxone-doctor', title: 'How to Find a Suboxone Doctor', desc: 'Who can prescribe and what to look for' },
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
