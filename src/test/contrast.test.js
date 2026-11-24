import { describe, expect, it } from 'vitest'
import { themes } from '../theme-palette.js'

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const lum = (h) => {
  const [r, g, b] = rgb(h).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
const over = (fg, bg, a) => '#' + rgb(bg).map((v, i) => Math.round(rgb(fg)[i] * a + v * (1 - a)).toString(16).padStart(2, '0')).join('')

// Real WCAG 2.x contrast ratios for every text/background pair in both themes.
describe('WCAG AA contrast (4.5:1 for small text)', () => {
  for (const [theme, c] of Object.entries(themes)) {
    const surfaces = {
      page: c.bg,
      hover: over(c.overlay, c.bg, 0.1),
      frame: c.frame,
    }
    for (const [text, hex] of [['ink', c.ink], ['body', c.body], ['dim', c.dim], ['hand', c.hand]]) {
      for (const [name, bg] of Object.entries(surfaces)) {
        it(`${theme}: ${text} on ${name}`, () => expect(ratio(hex, bg)).toBeGreaterThanOrEqual(4.5))
      }
    }
  }
})
