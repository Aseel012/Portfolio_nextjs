import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import { projects } from '../data.js'
import { __resetGithubStatsCache } from '../hooks/useGithubStats.js'
import { __resetContributionsCache } from '../hooks/useContributions.js'

const at = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

beforeEach(() => {
  __resetGithubStatsCache()
  __resetContributionsCache()
  // Never resolve: renders stay in the honest loading/snapshot state.
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
})

afterEach(() => vi.unstubAllGlobals())

describe('routing', () => {
  it('renders home', () => {
    at('/')
    expect(screen.getByRole('heading', { level: 1, name: 'Shaikh Aseel' })).toBeInTheDocument()
  })
  it('renders every project route', () => {
    for (const p of projects) {
      const { unmount } = at(`/work/${p.slug}`)
      expect(screen.getByRole('heading', { level: 1, name: new RegExp(p.title) })).toBeInTheDocument()
      unmount()
    }
  })
  it('keeps older project URLs working', () => {
    at('/projects/kavynui')
    expect(screen.getByRole('heading', { level: 1, name: /kavynUI/ })).toBeInTheDocument()
  })
  it('renders open source, writing and experience', () => {
    let r = at('/open-source')
    expect(screen.getByRole('heading', { level: 1, name: 'Open source' })).toBeInTheDocument()
    r.unmount()
    r = at('/writing')
    expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument()
    r.unmount()
    at('/experience')
    expect(screen.getByRole('heading', { level: 1, name: 'Experience' })).toBeInTheDocument()
  })
  it('shows a 404 for unknown routes (the /lsotend case)', () => {
    at('/lsotend')
    expect(screen.getByText(/does not exist/i)).toBeInTheDocument()
  })
})

describe('security hygiene', () => {
  it('opens every external link safely', () => {
    at('/')
    const external = [...document.querySelectorAll('a[href^="https://"]')]
    expect(external.length).toBeGreaterThan(5)
    for (const a of external) {
      expect(a.getAttribute('target')).toBe('_blank')
      expect(a.getAttribute('rel')).toContain('noopener')
      expect(a.getAttribute('rel')).toContain('noreferrer')
    }
  })
  it('never ships secrets or tokens in the bundle data', () => {
    const src = JSON.stringify([...document.querySelectorAll('script')].map((s) => s.src))
    expect(src).not.toMatch(/ghp_|github_pat_|Bearer /)
  })
})

describe('github stats honesty', () => {
  it('labels the baked snapshot as a snapshot while the live fetch is pending', () => {
    at('/open-source')
    expect(screen.getByTestId('gh-note').textContent).toMatch(/as of/i)
  })
  it('switches PR groups through merged, open and closed tabs', () => {
    at('/open-source')
    const panel = () => screen.getByRole('tabpanel')
    expect(screen.getByRole('tab', { name: /Merged 10/ })).toHaveAttribute('aria-selected', 'true')
    expect(panel().querySelectorAll('a')).toHaveLength(10)
    fireEvent.click(screen.getByRole('tab', { name: /Open 5/ }))
    expect(panel().querySelectorAll('a')).toHaveLength(5)
    fireEvent.click(screen.getByRole('tab', { name: /Closed 7/ }))
    expect(panel().querySelectorAll('a')).toHaveLength(7)
    fireEvent.click(screen.getByRole('tab', { name: /Merged 10/ }))
    expect(panel().querySelectorAll('a')).toHaveLength(10)
  })
  it('shows every PR title with its repository underneath', () => {
    at('/open-source')
    const first = screen.getByRole('tabpanel').querySelector('a')
    expect(first.href).toMatch(/^https:\/\/github\.com\//)
    expect(first.textContent).toContain('radix-ui/primitives')
    expect(first.textContent).toContain('ContextMenu')
  })
})

describe('work list', () => {
  it('shows two projects with a centered view-all that reveals the rest', () => {
    at('/')
    expect(screen.getAllByRole('link', { name: /project page$/ })).toHaveLength(2)
    const button = screen.getByRole('button', { name: /view all projects/i })
    expect(button.className).toContain('rounded-full')
    fireEvent.click(button)
    expect(screen.getAllByRole('link', { name: /project page$/ })).toHaveLength(projects.filter((p) => p.image).length)
    expect(screen.queryByRole('button', { name: /view all projects/i })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /show less/i }))
    expect(screen.getAllByRole('link', { name: /project page$/ })).toHaveLength(2)
  })
})
