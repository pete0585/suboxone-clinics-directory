import type { MetadataRoute } from 'next'
import { BASE, discoverCityPageSlugs } from '@/lib/city-pages'
import { getAllSlugs, getStateCounts } from '@/lib/data'
import { stateAbbrevToName } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, stateCounts] = await Promise.all([
    getAllSlugs().catch(() => []),
    getStateCounts().catch(() => ({})),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/suboxone-clinics`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const cityPages: MetadataRoute.Sitemap = discoverCityPageSlugs().map((folder) => ({
    url: `${BASE}/suboxone-clinics/${folder}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const statePages: MetadataRoute.Sitemap = Object.keys(stateCounts).map((abbrev) => ({
    url: `${BASE}/suboxone-clinics/${stateAbbrevToName(abbrev).toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const clinicPages: MetadataRoute.Sitemap = slugs.slice(0, 5000).map((slug) => ({
    url: `${BASE}/listings/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...cityPages, ...statePages, ...clinicPages]
}
