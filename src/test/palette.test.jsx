import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import { __resetGithubStatsCache } from '../hooks/useGithubStats.js'
import { __resetContributionsCache } from '../hooks/useContributions.js'
import { setTheme } from '../theme.js'

const at = (path) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

beforeEach(() => {
  __resetGithubStatsCache()
  __resetContributionsCache()
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))
})

afterEach(() => {
  vi.unstubAllGlobals()
  setTheme('system')
})

describe('command palette', () => {
  it('opens with ctrl+k, filters and navigates with enter', () => {
    at('/')
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    const input = screen.getByLabelText('Search for actions')
    fireEvent.change(input, { target: { value: 'writing' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByRole('heading', { level: 1, name: 'Writing' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('toggles with cmd+k and closes with escape', () => {
    at('/')
    fireEvent.keyDown(window, { key: 'k', metaKey: true })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('shift+letter jumps straight to a page without opening the palette', () => {
    at('/')
    fireEvent.keyDown(window, { key: 'O', shiftKey: true })
    expect(screen.getByRole('heading', { level: 1, name: 'Open source' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
  it('theme actions switch the document theme', () => {
    at('/')
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    fireEvent.click(screen.getByRole('button', { name: 'Light mode' }))
    expect(document.documentElement.dataset.theme).toBe('light')
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true })
    fireEvent.click(screen.getByRole('button', { name: 'Dark mode' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
  it('theme toggle button flips the resolved theme', () => {
    at('/')
    const before = document.documentElement.dataset.theme
    fireEvent.click(screen.getAllByRole('button', { name: /switch to (light|dark) mode/i })[0])
    expect(document.documentElement.dataset.theme).not.toBe(before)
  })
})
