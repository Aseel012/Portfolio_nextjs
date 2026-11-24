import { cycleTheme, useTheme } from '../theme.js'

export function SunIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

export default function ThemeToggle({ className = '' }) {
  const [, resolved] = useTheme()
  const toLight = resolved === 'dark'
  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={toLight ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`rounded-full border border-line bg-bg/85 p-2 text-dim backdrop-blur-md transition hover:text-ink active:scale-95 ${className}`}
    >
      {toLight ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
