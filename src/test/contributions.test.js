import { afterEach, describe, expect, it, vi } from 'vitest'
import { getContributions, normalizeDays } from '../hooks/useContributions.js'

const response = (data, ok = true, status = 200) => Promise.resolve({ ok, status, json: () => Promise.resolve(data) })

// A full year of synthetic days: 53 Sundays from 2025-11-23, one row per weekday.
function makeYear(dayCount = () => 0) {
  const days = []
  const start = new Date('2025-11-23T00:00:00Z')
  for (let i = 0; i < 367; i++) {
    const d = new Date(start.getTime() + i * 86400000)
    const date = d.toISOString().slice(0, 10)
    const count = dayCount(i)
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
    days.push({ date, count, level })
  }
  return days
}

function payload(dayCount) {
  const contributions = makeYear(dayCount)
  return { total: { lastYear: contributions.reduce((s, d) => s + d.count, 0) }, contributions }
}

afterEach(() => vi.unstubAllGlobals())

describe('live contribution data', () => {
  it('accepts a well-formed year and reports GitHub-shaped totals', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response(payload((i) => (i % 10 === 0 ? 3 : 0)))))
    const r = await getContributions()
    expect(r.live).toBe(true)
    expect(r.days).toHaveLength(367)
    expect(r.total).toBe(37 * 3)
    expect(r.days[0]).toEqual(['2025-11-23', 2])
    expect(r.days[366][0]).toBe('2026-11-24')
  })
  it('fetches the public mirror for his username without any token', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response(payload())))
    await getContributions()
    const url = String(fetch.mock.calls[0][0])
    expect(url).toContain('Aseel012')
    expect(url).not.toMatch(/token|auth/i)
    expect(fetch.mock.calls[0][1]?.headers?.Authorization).toBeUndefined()
  })
  it('rejects failed responses', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response({}, false, 500)))
    await expect(getContributions()).rejects.toThrow('unavailable')
  })
  it('rejects a garbled payload', async () => {
    vi.stubGlobal('fetch', vi.fn(() => response({ contributions: 'nope' })))
    await expect(getContributions()).rejects.toThrow('Incomplete')
  })
  it('rejects a short year', async () => {
    const full = payload()
    vi.stubGlobal('fetch', vi.fn(() => response({ total: full.total, contributions: full.contributions.slice(0, 100) })))
    await expect(getContributions()).rejects.toThrow('Incomplete')
  })
  it('rejects bad day entries', async () => {
    const full = payload()
    full.contributions[100] = { date: 'not-a-date', count: 1, level: 1 }
    vi.stubGlobal('fetch', vi.fn(() => response(full)))
    await expect(getContributions()).rejects.toThrow('Incomplete')
  })
  it('rejects levels outside the GitHub scale', async () => {
    const full = payload((i) => (i % 10 === 0 ? 3 : 0))
    full.contributions[5].level = 9
    vi.stubGlobal('fetch', vi.fn(() => response(full)))
    await expect(getContributions()).rejects.toThrow('Incomplete')
  })
  it('rejects out-of-order days', async () => {
    const full = payload()
    ;[full.contributions[3], full.contributions[4]] = [full.contributions[4], full.contributions[3]]
    vi.stubGlobal('fetch', vi.fn(() => response(full)))
    await expect(getContributions()).rejects.toThrow('Incomplete')
  })
  it('rejects a total that does not match the day counts', async () => {
    const full = payload()
    full.total.lastYear = 999
    vi.stubGlobal('fetch', vi.fn(() => response(full)))
    await expect(getContributions()).rejects.toThrow('Incomplete')
  })
})

describe('week alignment', () => {
  it('chunks a Sunday-first year into Sunday-first weeks', () => {
    const days = normalizeDays(makeYear().map((d) => [d.date, d.level]))
    expect(days[0][0]).toBe('2025-11-23')
    expect(new Date(`${days[0][0]}T00:00:00Z`).getUTCDay()).toBe(0)
    // A 367-day window ends mid-week; GitHub shows the same trailing partial week.
    expect(days).toHaveLength(367)
    for (let i = 1; i < days.length; i++) {
      const prev = new Date(`${days[i - 1][0]}T00:00:00Z`).getTime()
      const cur = new Date(`${days[i][0]}T00:00:00Z`).getTime()
      expect(cur - prev).toBe(86400000)
    }
  })
  it('sorts shuffled input into chronological order', () => {
    const rows = makeYear().map((d) => [d.date, d.level]).reverse()
    const days = normalizeDays(rows)
    expect(days[0][0]).toBe('2025-11-23')
    expect(days[1][0]).toBe('2025-11-24')
  })
  it('pads a mid-week start so week columns still begin on Sunday', () => {
    const rows = [['2026-11-24', 1], ['2026-11-25', 0]] // Tuesday, Wednesday
    const days = normalizeDays(rows)
    expect(days).toHaveLength(4) // 2 pad cells (Sun, Mon) + 2 real days
    expect(days[0][0]).toBe('pad-0')
    expect(days[2][0]).toBe('2026-11-24')
  })
})
