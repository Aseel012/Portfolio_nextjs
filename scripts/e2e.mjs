import puppeteer from 'puppeteer-core'
import axe from 'axe-core'
import fs from 'node:fs'
const base = process.env.BASE || 'http://127.0.0.1:4173'
const routes = ['/', '/open-source', '/writing', '/experience', ...['kavynui', 'tarrarium', 'removeanything', 'real-estate-ai', 'ai-carousel', 'shareyou', 'recipe-api'].map(s => `/work/${s}`), '/not-found']
const failures = []
const check = (condition, message) => { if (!condition) failures.push(message) }
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', args: ['--no-sandbox'], headless: true })
if (process.env.SHOTS) fs.mkdirSync(process.env.SHOTS, { recursive: true })
for (const width of [320, 390, 1280, 1440]) {
  for (const route of routes) {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    await page.setViewport({ width, height: 900 })
    await page.goto(base + route, { waitUntil: 'networkidle0' })
    await page.evaluate(async () => {
      await document.fonts.ready
      for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)) }
      scrollTo(0, 0)
    })
    await new Promise(r => setTimeout(r, 650))
    const data = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, images: [...document.images].every(i => i.complete && i.naturalWidth > 0), h1: document.querySelectorAll('h1').length }))
    check(data.scrollWidth <= data.width, `${width} ${route}: overflow ${data.scrollWidth}`)
    check(data.images, `${width} ${route}: image failed`)
    check(data.h1 === 1, `${width} ${route}: expected one H1`)
    check(errors.length === 0, `${width} ${route}: ${errors.join('; ')}`)
    if (width === 390 || width === 1440) {
      await page.addScriptTag({ content: axe.source })
      const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] } })).violations.map(v => v.id))
      check(!violations.length, `${width} ${route}: accessibility ${violations.join(', ')}`)
      if (process.env.SHOTS) await page.screenshot({ path: `${process.env.SHOTS}/${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}-${width}.png`, fullPage: true })
    }
    await page.close()
  }
}
const page = await browser.newPage()
await page.goto(base, { waitUntil: 'networkidle0' })
await page.keyboard.press('Tab')
check(await page.evaluate(() => document.activeElement.textContent === 'Skip to content'), 'skip link is not first keyboard target')
await page.keyboard.press('Enter')
check(await page.evaluate(() => document.activeElement.id === 'main'), 'skip link did not focus main content')
await page.goto(base, { waitUntil: 'networkidle0' })
await page.click('a[aria-label="kavynUI project page"]')
await page.waitForFunction(() => location.pathname === '/work/kavynui')
check(page.url().endsWith('/work/kavynui'), 'project image navigation failed')
await page.click('a[href="/work/tarrarium"]')
await page.waitForFunction(() => location.pathname === '/work/tarrarium')
check(page.url().endsWith('/work/tarrarium'), 'next project navigation failed')
// Work list starts collapsed at two projects and expands from the centered button
await page.goto(base, { waitUntil: 'networkidle0' })
const before = await page.evaluate(() => document.querySelectorAll('#work-list article').length)
check(before === 2, `home shows ${before} projects before view all, expected 2`)
await page.click('button[aria-controls="work-list"]')
const after = await page.evaluate(() => document.querySelectorAll('#work-list article').length)
check(after > before, `view all did not reveal more projects (${before} -> ${after})`)
// Open source tabs switch between the three PR groups
await page.goto(base + '/open-source', { waitUntil: 'networkidle0' })
const tabCounts = await page.evaluate(async () => {
  const out = {}
  for (const label of ['Merged', 'Open', 'Closed']) {
    const tab = [...document.querySelectorAll('[role="tab"]')].find((t) => t.textContent.trim().startsWith(label))
    if (!tab) return { missing: label }
    tab.click()
    await new Promise((r) => setTimeout(r, 60))
    out[label] = document.querySelectorAll('[role="tabpanel"] a').length
  }
  return out
})
check(!tabCounts.missing, `missing tab ${tabCounts.missing || ''}`)
check(tabCounts.Merged > 0 && tabCounts.Open > 0 && tabCounts.Closed > 0, `tab panels empty: ${JSON.stringify(tabCounts)}`)
check(new Set(Object.values(tabCounts)).size === 3, `tab panels did not switch content: ${JSON.stringify(tabCounts)}`)
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await page.goto(base, { waitUntil: 'networkidle0' })
check(await page.evaluate(() => getComputedStyle(document.querySelector('article')).animationDuration === '1e-05s' || getComputedStyle(document.querySelector('article')).animationDuration === '0.00001s'), 'reduced motion rule not applied')
await page.goto(base + '/open-source', { waitUntil: 'networkidle0' })
await page.evaluate(() => localStorage.clear())
await page.setRequestInterception(true)
page.on('request', r => r.url().startsWith('https://api.github.com') ? r.respond({ status: 403, contentType: 'application/json', body: '{}' }) : r.continue())
await page.goto(base + '/open-source', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1500))
check(await page.$eval('[data-testid="gh-note"]', e => e.textContent.includes('as of')), 'API failure did not retain dated snapshot')
await browser.close()
if (failures.length) { console.error(failures.join('\n')); process.exit(1) }
console.log(`Passed ${routes.length * 4} route/width checks, 24 accessibility scans, navigation, keyboard, reduced motion and API fallback checks.`)
