import { useEffect, useState } from 'react'
import { contributions } from '../data-contributions.js'
import { github } from '../data.js'

// The contribution calendar has no official unauthenticated JSON API and
// github.com blocks cross-origin reads, so the live data comes from a public
// mirror of the same GitHub calendar. It needs no token and answers with CORS
// open. Verified day-for-day against github.com/users/Aseel012/contributions
// on Nov 24, 2026 (all 367 day levels and counts identical, total 440).
// If it cannot be reached or answers oddly, the page shows the baked snapshot
// and says so with its date.
const API = `https://github-contributions-api.jogruber.de/v4/${github.user}?y=last`

const fallback = { total: contributions.total, days: contributions.days, live: false }

// Sort chronologically and pad the front so every week column starts on a
// Sunday, matching GitHub's own layout. Accepts [date, level] pairs.
export function normalizeDays(days) {
  const sorted = [...days].sort((a, b) => (a[0] < b[0] ? -1 : 1))
  const first = new Date(`${sorted[0][0]}T00:00:00Z`)
  const pad = first.getUTCDay()
  sorted.unshift(...Array.from({ length: pad }, (_, i) => [`pad-${i}`, 0]))
  return sorted
}

export async function getContributions(signal) {
  const response = await fetch(API, { signal })
  if (response.status === 403 || response.status === 429) throw new Error('rate-limited')
  if (!response.ok) throw new Error('Contributions unavailable')
  const data = await response.json()
  const list = data?.contributions
  if (!Array.isArray(list) || list.length < 360) throw new Error('Incomplete contribution data')
  const days = []
  let sum = 0
  for (const d of list) {
    if (typeof d?.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(d.date)
      || !Number.isInteger(d.count) || d.count < 0
      || !Number.isInteger(d.level) || d.level < 0 || d.level > 4) throw new Error('Incomplete contribution data')
    if (days.length && d.date <= days[days.length - 1][0]) throw new Error('Incomplete contribution data')
    days.push([d.date, d.level])
    sum += d.count
  }
  const total = data?.total?.lastYear
  // GitHub's own heading total is the sum of its day counts; require the same
  // consistency here so a partial or garbled answer never renders.
  if (!Number.isInteger(total) || total !== sum) throw new Error('Incomplete contribution data')
  return { total, days, live: true }
}

const CACHE_KEY = 'gh-contrib-v1'
const CACHE_TTL_MS = 30 * 60 * 1000

function readCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (!parsed || typeof parsed.fetchedAt !== 'number' || !parsed.data?.live || !Array.isArray(parsed.data.days)) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ fetchedAt: Date.now(), data }))
  } catch {
    // Private browsing or full storage: caching is best-effort only.
  }
}

let memoryCache

// Test-only reset so unit tests are deterministic regardless of fetch timing.
export function __resetContributionsCache() {
  memoryCache = undefined
  try { localStorage.removeItem(CACHE_KEY) } catch {}
}

export default function useContributions() {
  const [state, setState] = useState(() => {
    if (memoryCache) return { ...memoryCache.data, status: 'live', fetchedAt: memoryCache.fetchedAt }
    const stored = readCache()
    if (stored && Date.now() - stored.fetchedAt < CACHE_TTL_MS) {
      memoryCache = stored
      return { ...stored.data, status: 'live', fetchedAt: stored.fetchedAt }
    }
    return { ...fallback, status: 'loading', fetchedAt: null }
  })

  useEffect(() => {
    if (memoryCache && Date.now() - memoryCache.fetchedAt < CACHE_TTL_MS) return
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)
    getContributions(controller.signal)
      .then((data) => {
        const entry = { fetchedAt: Date.now(), data }
        memoryCache = entry
        writeCache(data)
        setState({ ...data, status: 'live', fetchedAt: entry.fetchedAt })
      })
      .catch(() => {
        const stored = memoryCache || readCache()
        if (stored) setState({ ...stored.data, status: 'cache', fetchedAt: stored.fetchedAt })
        else setState({ ...fallback, status: 'fallback', fetchedAt: null })
      })
      .finally(() => clearTimeout(timer))
    return () => { controller.abort(); clearTimeout(timer) }
  }, [])

  return state
}
