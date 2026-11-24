import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { profile, socials } from '../data.js'
import ExternalLink from './ExternalLink.jsx'
import HandNote from './HandNote.jsx'
import CommandPalette from './CommandPalette.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const nav = [
  { to: '/', label: 'Work', end: true },
  { to: '/open-source', label: 'Open source', end: false },
  { to: '/writing', label: 'Writing', end: false },
  { to: '/experience', label: 'Experience', end: false },
]

function openPalette() {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
}

export function SearchButton({ className = '' }) {
  return (
    <button
      type="button"
      onClick={openPalette}
      aria-label="Search (Ctrl K)"
      className={`flex items-center gap-1.5 rounded-full border border-line bg-bg/85 p-2 text-dim backdrop-blur-md transition hover:text-ink active:scale-95 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[18px] w-[18px]" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
      </svg>
      <kbd className="hidden pr-0.5 text-[11px] text-dim sm:inline">⌘K</kbd>
    </button>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-frame focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>

      <header className="sticky top-0 z-10 hidden justify-center pt-5 sm:flex">
        <nav aria-label="Primary" className="flex gap-0.5 rounded-full border border-line bg-bg/85 p-1.5 backdrop-blur-md">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `rounded-full px-4 py-2 text-sm transition active:scale-95 ${isActive ? 'bg-ink/10 text-ink' : 'text-dim hover:text-ink'}`}>{n.label}</NavLink>
          ))}
        </nav>
        <div className="fixed right-5 top-5 z-20 flex gap-2">
          <SearchButton />
          <ThemeToggle />
        </div>
      </header>

      <header className="sticky top-0 z-10 border-0 bg-bg/90 px-5 pb-2.5 pt-3.5 backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold text-ink">Aseel</span>
          <span className="flex items-center gap-2">
            <SearchButton className="border-0 bg-transparent p-1.5" />
            <ThemeToggle className="border-0 bg-transparent p-1.5" />
            <HandNote className="text-[19px]">hi there</HandNote>
          </span>
        </div>
        <nav aria-label="Primary" className="mt-2.5 flex justify-center gap-0.5">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `whitespace-nowrap rounded-full px-2 py-2 text-[12px] min-[360px]:px-3 min-[360px]:text-[13px] transition active:scale-95 ${isActive ? 'bg-ink/10 text-ink' : 'text-dim'}`}>{n.label}</NavLink>
          ))}
        </nav>
      </header>

      <main id="main" tabIndex={-1} className="pb-24 pt-7 sm:pt-16">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-[880px] px-5 pb-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[13px] text-dim">
          <span>&copy; {new Date().getFullYear()} {profile.name}</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {socials.filter((s) => s.id !== 'resume').map((s) => (
              <li key={s.id}><ExternalLink href={s.href} className="transition hover:text-ink">{s.label}</ExternalLink></li>
            ))}
          </ul>
        </div>
      </footer>

      <CommandPalette />
    </div>
  )
}
