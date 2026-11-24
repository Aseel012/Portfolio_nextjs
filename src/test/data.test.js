import { describe, expect, it } from 'vitest'
import { education, experience, github, openSource, profile, projects, skills, socials, writing } from '../data.js'

const urlOk = (u) => /^https:\/\/[^\s]+$/.test(u)

describe('content integrity', () => {
  it('has unique project slugs and required fields', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const p of projects) {
      expect(p.title).toBeTruthy()
      expect(p.blurb).toBeTruthy()
      expect(p.body.length).toBeGreaterThan(0)
      expect(p.stack.length).toBeGreaterThan(0)
      expect(p.links.length).toBeGreaterThan(0)
    }
  })
  it('excludes OSTown everywhere', () => {
    const blob = JSON.stringify({ projects, openSource, experience })
    expect(blob.toLowerCase()).not.toContain('ostown')
  })
  it('uses https for every outbound link', () => {
    const links = [
      ...socials.map((s) => s.href),
      ...openSource.map((o) => o.href),
      ...writing.map((w) => w.href),
      ...projects.flatMap((p) => p.links.map((l) => l.href)),
    ]
    for (const l of links) expect(urlOk(l), l).toBe(true)
  })
  it('never embeds a phone number or private data in public content', () => {
    const blob = JSON.stringify({ profile, projects, experience, education, openSource, socials })
    expect(blob).not.toMatch(/\+?91[\s-]?\d{5}[\s-]?\d{5}/)
    expect(blob).not.toMatch(/\b\d{10}\b/)
  })
  it('keeps the public email as the only contact address', () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/i)
  })
  it('does not use em dashes in copy', () => {
    expect(JSON.stringify({ profile, projects, experience })).not.toContain('—')
  })
  it('avoids unverifiable exact component counts in copy', () => {
    const blob = JSON.stringify(projects.map((p) => [p.blurb, ...p.body]))
    expect(blob).not.toMatch(/\b(94|101)\b/)
  })
  it('lists the backend stack the user asked for', () => {
    const backend = skills.find((g) => g.group === 'Backend')
    for (const item of ['Spring Boot', 'Microservices', 'Rust']) {
      expect(backend.items).toContain(item)
    }
  })
  it('github snapshot has the verified 2026-11-23 numbers', () => {
    expect(github.mergedExternalPRs).toBe(10)
    expect(github.openExternalPRs).toBe(5)
    expect(github.closedExternalPRs).toBe(7)
    expect(github.contributedProjects).toBe(8)
    expect(openSource.length).toBe(22)
  })
  it('every listed PR has a clear status matching the snapshot counts', () => {
    const count = (status) => openSource.filter((o) => o.status === status).length
    expect(count('merged')).toBe(github.mergedExternalPRs)
    expect(count('open')).toBe(github.openExternalPRs)
    expect(count('closed')).toBe(github.closedExternalPRs)
  })
})
