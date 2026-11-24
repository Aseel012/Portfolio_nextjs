import { afterEach, describe, expect, it, vi } from 'vitest'
import { getGithubStats } from '../hooks/useGithubStats.js'

const response = (data, ok = true, status = 200) => Promise.resolve({ ok, status, json: () => Promise.resolve(data) })
const pr = (repo, title = 'fix: something', extra = {}) => ({
  repository_url: `https://api.github.com/repos/o/${repo}`,
  title,
  html_url: `https://github.com/o/${repo}/pull/1`,
  pull_request: { html_url: `https://github.com/o/${repo}/pull/1`, merged_at: null },
  state: 'open',
  ...extra,
})
const mergedPR = (repo) => pr(repo, 'fix: merged', { state: 'closed', pull_request: { html_url: `https://github.com/o/${repo}/pull/1`, merged_at: '2026-11-01T00:00:00Z' } })
const closedPR = (repo) => pr(repo, 'fix: closed', { state: 'closed' })

const defaultItems = [mergedPR('a'), mergedPR('a'), pr('b'), closedPR('c')]

function mock({ result = { total_count: defaultItems.length, incomplete_results: false, items: defaultItems } } = {}) {
  vi.stubGlobal('fetch', vi.fn().mockImplementation(() => response(result)))
}

afterEach(() => vi.unstubAllGlobals())

describe('fresh GitHub data', () => {
  it('derives every count and row from one search request', async () => {
    mock()
    const r = await getGithubStats()
    expect(r).toMatchObject({
      mergedExternalPRs: 2,
      openExternalPRs: 1,
      closedExternalPRs: 1,
      contributedProjects: 1,
      live: true,
    })
    expect(r.prs).toHaveLength(4)
    expect(r.prs.filter((p) => p.status === 'merged')).toHaveLength(2)
    expect(r.prs.filter((p) => p.status === 'open')).toHaveLength(1)
    expect(r.prs.filter((p) => p.status === 'closed')).toHaveLength(1)
    for (const p of r.prs) {
      expect(p.project).toBeTruthy()
      expect(p.detail).toBeTruthy()
      expect(p.href).toMatch(/^https:/)
    }
    const urls = fetch.mock.calls.map((c) => String(c[0]))
    expect(urls.filter((u) => u.includes('/search/issues'))).toHaveLength(1)
    expect(urls[0]).toContain('-user%3AAseel012')
  })
  it('marks merged rows by merged_at, not by the issue state alone', async () => {
    mock()
    const r = await getGithubStats()
    expect(r.prs.filter((p) => p.status === 'merged').every((p) => p.project === 'o/a')).toBe(true)
    expect(r.prs.find((p) => p.project === 'o/c').status).toBe('closed')
  })
  it('rejects failed requests instead of marking fallback live', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response({}, false, 500)))
    await expect(getGithubStats()).rejects.toThrow('unavailable')
  })
  it('reports a spent GitHub rate limit as its own error', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response({}, false, 403)))
    await expect(getGithubStats()).rejects.toThrow('rate-limited')
  })
  it('rejects incomplete search results', async () => {
    mock({ result: { total_count: 2, incomplete_results: true, items: [] } })
    await expect(getGithubStats()).rejects.toThrow('Incomplete')
  })
  it('rejects items missing titles or links', async () => {
    mock({ result: { total_count: 1, incomplete_results: false, items: [{ repository_url: 'https://api.github.com/repos/o/a', state: 'open' }] } })
    await expect(getGithubStats()).rejects.toThrow('Incomplete')
  })
  it('rejects items with a state that is neither open nor closed', async () => {
    mock({ result: { total_count: 1, incomplete_results: false, items: [pr('a', 't', { state: 'pending' })] } })
    await expect(getGithubStats()).rejects.toThrow('Incomplete')
  })
  it('accepts a genuine empty contribution history', async () => {
    mock({ result: { total_count: 0, incomplete_results: false, items: [] } })
    const r = await getGithubStats()
    expect(r.contributedProjects).toBe(0)
    expect(r.prs).toHaveLength(0)
  })
  it('collects later search pages before reporting complete counts', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation((url) => {
      const u = String(url)
      if (u.includes('page=2')) return response({ incomplete_results: false, items: [pr('b')] })
      return response({ total_count: 2, incomplete_results: false, items: [mergedPR('a')] })
    }))
    const r = await getGithubStats()
    expect(r.contributedProjects).toBe(1)
    expect(r.prs).toHaveLength(2)
    expect(fetch.mock.calls.map((c) => String(c[0])).some((u) => u.includes('page=2'))).toBe(true)
  })
  it('rejects missing repository identifiers', async () => {
    mock({ result: { total_count: 1, incomplete_results: false, items: [pr('a', 't', { repository_url: '' })] } })
    await expect(getGithubStats()).rejects.toThrow('Incomplete')
  })
  it('rejects an unexpectedly empty later page', async () => {
    let pageCalls = 0
    vi.stubGlobal('fetch', vi.fn().mockImplementation((url) => {
      const u = String(url)
      if (u.includes('page=2')) { pageCalls += 1; return response({ incomplete_results: false, items: [] }) }
      return response({ total_count: 2, incomplete_results: false, items: [mergedPR('a')] })
    }))
    await expect(getGithubStats()).rejects.toThrow('Incomplete')
    expect(pageCalls).toBe(1)
  })
})
