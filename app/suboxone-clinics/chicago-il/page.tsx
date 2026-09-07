import type { Metadata } from "next"
import Link from "next/link"
import { BASE } from "@/lib/city-pages"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Best Suboxone Clinic in Chicago, IL | Suboxone Clinic Directory",
  description: "Find suboxone clinic in Chicago, Illinois. 35+ listed. Filter by city and compare providers.",
  alternates: { canonical: `${BASE}/suboxone-clinics/chicago-il` },
}

async function getListings() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("suboxone_listings")
    .select("*")
    .eq("city", "Chicago")
    .eq("state", "IL")
    .eq("is_active", true)
    .limit(24)
  return data ?? []
}

function listingName(row: Record<string, unknown>) {
  return (
    (row["clinic_name"] as string) ||
    (row.name as string) ||
    (row.full_name as string) ||
    (row.clinic_name as string) ||
    "Listing"
  )
}

function listingHref(row: Record<string, unknown>) {
  const slug = String(row.slug || "")
  return "/listings/SLUG".replace("SLUG", slug)
}

export default async function CityPage() {
  const listings = await getListings()
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many suboxone clinic are in Chicago, IL?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Suboxone Clinic Directory lists 35+ suboxone clinic in Chicago, Illinois. Counts change as new listings are seeded.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find suboxone clinic in Chicago?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Search suboxoneclinicfinder.com and filter by Chicago. Compare listed providers, then contact the one that fits.",
        },
      },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-neutral-500">Chicago, IL</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Suboxone Clinic in Chicago, IL
        </h1>
        <p className="mt-3 max-w-2xl text-neutral-600">
          35+ listed suboxone clinic in the Chicago area. Pages are generated from live directory listings — not outreach.
        </p>
        <p className="mt-2 text-sm text-neutral-500">{listings.length} shown on this page.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {listings.map((row: Record<string, unknown>, i: number) => (
            <li key={String(row.id || row.slug || i)} className="rounded-xl border border-neutral-200 p-4">
              <Link href={listingHref(row)} className="font-semibold hover:underline">
                {listingName(row)}
              </Link>
              <p className="mt-1 text-sm text-neutral-500">
                {String(row.city || "Chicago")}, {String(row.state || "IL")}
              </p>
            </li>
          ))}
        </ul>
        {listings.length === 0 && (
          <p className="mt-8 text-neutral-500">Listings for this city are still being seeded.</p>
        )}
      </main>
    </>
  )
}
