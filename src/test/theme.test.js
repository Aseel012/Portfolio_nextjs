import { afterEach, describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { themes } from '../theme-palette.js'
import { setTheme } from '../theme.js'

afterEach(() => setTheme('system'))

describe('themes', () => {
  it('applies explicit light and dark modes to the document', () => {
    setTheme('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    setTheme('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
  it('css variables in index.css match the palette module exactly', () => {
    const css = fs.readFileSync('src/index.css', 'utf8')
    const triplet = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(' ')
    for (const c of Object.values(themes)) {
      for (const key of ['bg', 'frame', 'ink', 'body', 'dim', 'hand']) {
        expect(css).toContain(`--${key}: ${triplet(c[key])};`)
      }
    }
  })
})
