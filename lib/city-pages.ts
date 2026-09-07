import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

export const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.suboxoneclinicfinder.com'

const CITY_PAGES_DIR = join(process.cwd(), 'app', 'suboxone-clinics')

/** `{city}-{state}` folders, e.g. brooklyn-ny, san-jose-ca */
const CITY_STATE_FOLDER = /^[a-z0-9]+(?:-[a-z0-9]+)*-[a-z]{2}$/

const US_STATE_ABBREVS = new Set(
  'al ak az ar ca co ct de fl ga hi id il in ia ks ky la me md ma mi mn ms mo mt ne nv nh nj nm ny nc nd oh ok or pa ri sc sd tn tx ut vt va wa wv wi wy dc'.split(
    ' ',
  ),
)

function isCityStateFolder(name: string): boolean {
  if (!CITY_STATE_FOLDER.test(name)) return false
  const state = name.slice(name.lastIndexOf('-') + 1)
  return US_STATE_ABBREVS.has(state)
}

/** Discover static `/suboxone-clinics/{city}-{state}` pages from the filesystem. */
export function discoverCityPageSlugs(dir = CITY_PAGES_DIR): string[] {
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && isCityStateFolder(entry.name))
    .filter((entry) => existsSync(join(dir, entry.name, 'page.tsx')))
    .map((entry) => entry.name)
    .sort()
}
