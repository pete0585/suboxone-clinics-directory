import { createServiceClient, createStaticClient } from '@/lib/supabase/server'
import type { SuboxoneListing, BrowseFilters } from '@/lib/types'

const TABLE = 'suboxone_listings'

export async function getFeaturedListings(limit = 6): Promise<SuboxoneListing[]> {
  const supabase = await createServiceClient()
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .in('listing_tier', ['featured', 'verified'])
    .order('listing_tier_rank', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []) as SuboxoneListing[]
}

export async function getTotalCount(): Promise<number> {
  const supabase = createStaticClient()
  const { count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)
    .eq('is_approved', true)

  return count ?? 0
}

export async function getListingBySlug(slug: string): Promise<SuboxoneListing | null> {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  return (data ?? null) as SuboxoneListing | null
}

export async function getListingById(id: string): Promise<SuboxoneListing | null> {
  const supabase = await createServiceClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()

  return (data ?? null) as SuboxoneListing | null
}

export async function browseListings(filters: BrowseFilters): Promise<{ listings: SuboxoneListing[]; total: number }> {
  const supabase = createStaticClient()
  const page = filters.page ?? 1
  const pageSize = 20
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('is_approved', true)

  if (filters.state) query = query.ilike('state', filters.state)
  if (filters.city) query = query.ilike('city', `%${filters.city}%`)
  if (filters.medicaid) query = query.eq('accepts_medicaid', true)
  if (filters.medicare) query = query.eq('accepts_medicare', true)
  if (filters.telehealth) query = query.eq('telehealth_available', true)
  if (filters.accepting) query = query.eq('accepting_new_patients', true)
  if (filters.walkin) query = query.eq('walk_in_available', true)
  if (filters.tier) query = query.eq('listing_tier', filters.tier)
  if (filters.service) query = query.contains('services_offered', [filters.service])
  if (filters.q) {
    query = query.textSearch('search_vector', filters.q, { type: 'websearch' })
  }

  const { data, count, error } = await query
    .order('listing_tier_rank', { ascending: false })
    .order('clinic_name', { ascending: true })
    .range(from, to)

  if (error) throw error
  return { listings: (data ?? []) as SuboxoneListing[], total: count ?? 0 }
}

export async function getCityListings(city: string, state: string): Promise<SuboxoneListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .ilike('city', city)
    .ilike('state', state)
    .order('listing_tier_rank', { ascending: false })
    .order('clinic_name', { ascending: true })
    .limit(50)

  return (data ?? []) as SuboxoneListing[]
}

export async function getStateListings(state: string): Promise<SuboxoneListing[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_active', true)
    .eq('is_approved', true)
    .ilike('state', state)
    .order('listing_tier_rank', { ascending: false })
    .order('clinic_name', { ascending: true })
    .limit(200)

  return (data ?? []) as SuboxoneListing[]
}

export async function getStateCounts(): Promise<Record<string, number>> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('state')
    .eq('is_active', true)
    .eq('is_approved', true)

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    counts[row.state] = (counts[row.state] ?? 0) + 1
  }
  return counts
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('slug')
    .eq('is_active', true)
    .eq('is_approved', true)

  return (data ?? []).map((r) => r.slug as string)
}

export async function getTopCities(limit = 24): Promise<Array<{ city: string; state: string; count: number }>> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('city, state')
    .eq('is_active', true)
    .eq('is_approved', true)

  const counts: Record<string, { city: string; state: string; count: number }> = {}
  for (const row of data ?? []) {
    const key = `${row.city}|${row.state}`
    if (!counts[key]) counts[key] = { city: row.city, state: row.state, count: 0 }
    counts[key].count++
  }

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export async function getListingsByCity(city: string, state: string, limit = 20): Promise<SuboxoneListing[]> {
  return getCityListings(city, state)
}

export async function getCityCount(): Promise<number> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from(TABLE)
    .select('city, state')
    .eq('is_active', true)
    .eq('is_approved', true)

  const seen = new Set<string>()
  for (const row of data ?? []) {
    seen.add(`${row.city}|${row.state}`)
  }
  return seen.size
}
