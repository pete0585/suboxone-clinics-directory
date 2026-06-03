import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Add Your Suboxone Clinic — List Your MAT Practice',
  description: 'Add your suboxone clinic or MAT practice to the SuboxoneClinicFinder directory. Free basic listing. Verified plans from $249/yr.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brand-navy mb-3">Add Your Suboxone Clinic</h1>
        <p className="text-gray-600">
          List your clinic on SuboxoneClinicFinder and connect with patients actively searching for MAT treatment.
          Basic listings are free. Verified plans start at $249/yr.
        </p>
      </div>

      <div className="bg-brand-amber-light border border-brand-amber/30 rounded-xl p-4 mb-8">
        <p className="text-sm font-semibold text-gray-900 mb-1">Why list your clinic?</p>
        <p className="text-sm text-gray-700">
          Google restricts paid ads for addiction treatment without LegitScript certification.
          A verified listing on SuboxoneClinicFinder is your most scalable patient acquisition channel —
          patients searching &ldquo;suboxone clinic near me&rdquo; will find you first.
        </p>
      </div>

      <SubmitFormClient />
    </div>
  )
}

function SubmitFormClient() {
  return (
    <div className="card p-6">
      <h2 className="font-bold text-brand-navy text-lg mb-6">Clinic Information</h2>
      <form action="/api/submit" method="post" className="space-y-5">
        <div>
          <label htmlFor="clinic_name" className="label">Clinic Name *</label>
          <input type="text" id="clinic_name" name="clinic_name" required className="input" placeholder="Recovery Health Clinic" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="label">Phone Number *</label>
            <input type="tel" id="phone" name="phone" required className="input" placeholder="(555) 123-4567" />
          </div>
          <div>
            <label htmlFor="email" className="label">Contact Email *</label>
            <input type="email" id="email" name="email" required className="input" placeholder="admin@yourclinic.com" />
          </div>
        </div>

        <div>
          <label htmlFor="website_url" className="label">Website URL</label>
          <input type="url" id="website_url" name="website_url" className="input" placeholder="https://yourclinic.com" />
        </div>

        <div>
          <label htmlFor="address" className="label">Street Address *</label>
          <input type="text" id="address" name="address" required className="input" placeholder="123 Main St" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="city" className="label">City *</label>
            <input type="text" id="city" name="city" required className="input" placeholder="Houston" />
          </div>
          <div>
            <label htmlFor="state" className="label">State *</label>
            <input type="text" id="state" name="state" required maxLength={2} className="input" placeholder="TX" />
          </div>
          <div>
            <label htmlFor="zip" className="label">ZIP Code *</label>
            <input type="text" id="zip" name="zip" required className="input" placeholder="77001" />
          </div>
        </div>

        <div>
          <label className="label">Insurance & Payment Accepted</label>
          <div className="grid grid-cols-2 gap-2">
            {['Medicaid', 'Medicare', 'Self-Pay', 'Sliding Scale', 'Private Insurance', 'CHIP'].map((ins) => (
              <label key={ins} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" name="insurance" value={ins.toLowerCase().replace(/\s+/g, '_')} className="rounded border-gray-300 text-brand-teal focus:ring-brand-teal" />
                {ins}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Services Offered</label>
          <div className="grid grid-cols-2 gap-2">
            {['Buprenorphine/Suboxone', 'Methadone', 'Vivitrol/Naltrexone', 'Counseling', 'Drug Testing', 'Case Management'].map((svc) => (
              <label key={svc} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" name="services" value={svc.toLowerCase().replace(/[^a-z]+/g, '_')} className="rounded border-gray-300 text-brand-teal focus:ring-brand-teal" />
                {svc}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Additional Options</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="telehealth" value="true" className="rounded border-gray-300 text-brand-teal focus:ring-brand-teal" />
              Telehealth appointments available
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="accepting_new_patients" value="true" className="rounded border-gray-300 text-brand-teal focus:ring-brand-teal" />
              Currently accepting new patients
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="walk_in" value="true" className="rounded border-gray-300 text-brand-teal focus:ring-brand-teal" />
              Walk-in appointments available
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="label">Clinic Description</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="input resize-none"
            placeholder="Tell patients about your clinic, approach to MAT, and what makes your practice unique..."
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          <p className="font-medium text-gray-900 mb-1">After submission:</p>
          <p>We&apos;ll review your submission within 24-48 hours. You&apos;ll receive an email to claim and verify your listing.
          Free basic listings are approved automatically.</p>
        </div>

        <button type="submit" className="w-full btn-primary py-3">
          Submit Clinic Listing
        </button>

        <p className="text-xs text-gray-500 text-center">
          By submitting, you confirm you are authorized to list this clinic.
          Free listings are shown in search results. Verified listings ($249/yr) receive priority placement.
        </p>
      </form>
    </div>
  )
}
