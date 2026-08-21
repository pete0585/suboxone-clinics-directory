import type { MetadataRoute } from 'next'
import { getAllSlugs, getStateCounts } from '@/lib/data'
import { stateAbbrevToName } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'

  const [slugs, stateCounts] = await Promise.all([
    getAllSlugs().catch(() => []),
    getStateCounts().catch(() => ({})),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/suboxone-clinics`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const statePages: MetadataRoute.Sitemap = Object.keys(stateCounts).map((abbrev) => ({
    url: `${siteUrl}/suboxone-clinics/${stateAbbrevToName(abbrev).toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const clinicPages: MetadataRoute.Sitemap = slugs.slice(0, 5000).map((slug) => ({
    url: `${siteUrl}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...statePages, ...clinicPages]
}
