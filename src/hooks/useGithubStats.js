import { useEffect, useState } from 'react'
import { github, openSource } from '../data.js'

const fallback = {
  mergedExternalPRs: github.mergedExternalPRs,
  openExternalPRs: github.openExternalPRs,
  closedExternalPRs: github.closedExternalPRs,
  contributedProjects: github.contributedProjects,
  prs: openSource,
  live: false,
}

function toPR(item) {
  const repo = item.repository_url.replace(/^.*\/repos\//, '').split('/')
  return {
    project: repo.slice(-2).join('/') || item.repository_url,
    detail: item.title,
    href: item.pull_request?.html_url || item.html_url,
    status: item.pull_request?.merged_at ? 'merged' : item.state === 'open' ? 'open' : 'closed',
  }
}

export async function getGithubStats(signal) {
  const get = async (url) => {
    const response = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } })
    // GitHub answers 403 when the unauthenticated rate limit for this IP is
    // spent. Mobile carriers share one IP across thousands of users, so this
    // is the usual reason a live fetch fails on a phone even when GitHub is
    // up. It gets its own error so the page can say exactly what happened.
    if (response.status === 403) throw new Error('rate-limited')
    if (!response.ok) throw new Error('GitHub unavailable')
    return response.json()
  }
  // One search covers every public PR to other projects: the merged, open and
  // closed counts and the rows all come from a single request. The search
  // API allows only 10 unauthenticated requests per minute per IP, so one
  // call per load is far more reliable than one per status.
  const query = encodeURIComponent(`author:${github.user} type:pr -user:${github.user}`)
  const first = await get(`https://api.github.com/search/issues?q=${query}&per_page=100&sort=created&order=desc`)
  if (!Number.isInteger(first.total_count) || first.total_count < 0 || first.incomplete_results || !Array.isArray(first.items)) throw new Error('Incomplete GitHub data')
  const items = [...first.items]
  for (let page = 2; items.length < first.total_count && page <= 10; page++) {
    const result = await get(`https://api.github.com/search/issues?q=${query}&per_page=100&page=${page}`)
    if (result.incomplete_results || !result.items?.length) throw new Error('Incomplete GitHub data')
    items.push(...result.items)
  }
  if (items.length !== first.total_count || items.some((p) => typeof p.repository_url !== 'string' || !p.repository_url || typeof p.title !== 'string' || !p.title || !(p.pull_request?.html_url || p.html_url) || (p.state !== 'open' && p.state !== 'closed'))) throw new Error('Incomplete GitHub data')
  const prs = items.map(toPR)
  const count = (status) => prs.filter((p) => p.status === status).length
  return {
    mergedExternalPRs: count('merged'),
    openExternalPRs: count('open'),
    closedExternalPRs: count('closed'),
    contributedProjects: new Set(prs.filter((p) => p.status === 'merged').map((p) => p.project)).size,
    prs,
    live: true,
  }
}

// The browser caches the last successful fetch so reloading the page does not
// hammer GitHub's small unauthenticated rate limit, which is shared per IP and
// is the usual reason a live fetch fails and the page falls back to the
// dated snapshot. The page always says exactly which data it is showing.
const CACHE_KEY = 'gh-stats-v1'
const CACHE_TTL_MS = 30 * 60 * 1000

function readCache() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
    if (!parsed || typeof parsed.fetchedAt !== 'number' || !parsed.data?.live) return null
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

let memoryCache // { fetchedAt, data } for SPA navigation within one visit

// Test-only reset so unit tests are deterministic regardless of fetch timing.
export function __resetGithubStatsCache() {
  memoryCache = undefined
  try { localStorage.removeItem(CACHE_KEY) } catch {}
}

export default function useGithubStats() {
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
    getGithubStats(controller.signal)
      .then((data) => {
        const entry = { fetchedAt: Date.now(), data }
        memoryCache = entry
        writeCache(data)
        setState({ ...data, status: 'live', fetchedAt: entry.fetchedAt })
      })
      .catch((err) => {
        const stored = memoryCache || readCache()
        if (stored) setState({ ...stored.data, status: 'cache', fetchedAt: stored.fetchedAt })
        else setState({ ...fallback, status: err?.message === 'rate-limited' ? 'ratelimit' : 'fallback', fetchedAt: null })
      })
      .finally(() => clearTimeout(timer))
    return () => { controller.abort(); clearTimeout(timer) }
  }, [])

  return state
}
