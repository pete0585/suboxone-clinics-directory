import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'),
  title: {
    default: 'Suboxone Clinic Finder — Find MAT Treatment Near You',
    template: '%s | SuboxoneClinicFinder',
  },
  description: 'Find suboxone clinics and medication-assisted treatment (MAT) providers near you. Filter by Medicaid, telehealth, and accepting new patients.',
  keywords: ['suboxone clinic', 'suboxone near me', 'MAT clinic', 'buprenorphine clinic', 'medication assisted treatment', 'opioid treatment'],
  openGraph: {
    type: 'website',
    siteName: 'SuboxoneClinicFinder',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="bg-brand-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="text-brand-teal font-bold text-xl">+</span>
            <span className="font-bold text-lg tracking-tight">SuboxoneClinicFinder</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/suboxone-clinics" className="text-gray-300 hover:text-white transition-colors">Find Clinics</a>
            <a href="/suboxone-clinics/telehealth" className="text-gray-300 hover:text-white transition-colors">Telehealth</a>
            <a href="/suboxone-clinics/medicaid" className="text-gray-300 hover:text-white transition-colors">Medicaid</a>
            <a href="/submit" className="text-gray-300 hover:text-white transition-colors">List Your Clinic</a>
          </nav>
          <a
            href="/submit"
            className="hidden md:inline-flex items-center px-4 py-2 bg-brand-amber text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-colors"
          >
            Add Your Clinic
          </a>
          {/* Mobile menu button */}
          <a href="/suboxone-clinics" className="md:hidden text-gray-300 hover:text-white text-sm font-medium">
            Find Clinics
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand-teal font-bold text-xl">+</span>
              <span className="text-white font-bold text-lg">SuboxoneClinicFinder</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              The national directory of suboxone clinics and MAT providers.
              Find buprenorphine treatment near you — filter by Medicaid, telehealth, and accepting new patients.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Find Treatment</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/suboxone-clinics" className="hover:text-white transition-colors">All Clinics</a></li>
              <li><a href="/suboxone-clinics/telehealth" className="hover:text-white transition-colors">Telehealth Options</a></li>
              <li><a href="/suboxone-clinics/medicaid" className="hover:text-white transition-colors">Medicaid Accepted</a></li>
              <li><a href="/suboxone-clinics/accepting-new-patients" className="hover:text-white transition-colors">Accepting New Patients</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Providers</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/submit" className="hover:text-white transition-colors">Add Your Clinic</a></li>
              <li><a href="/suboxone-clinics" className="hover:text-white transition-colors">Claim Listing</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SuboxoneClinicFinder. For medical emergencies, call 911.
            For substance abuse help, call SAMHSA&apos;s helpline: <strong className="text-gray-400">1-800-662-4357</strong> (free, confidential, 24/7).
          </p>
        </div>
      </div>
    </footer>
  )
}
