import { useSyncExternalStore } from 'react'

const KEY = 'theme'
const MODES = ['system', 'light', 'dark']

function read() {
  try {
    const saved = localStorage.getItem(KEY)
    return MODES.includes(saved) ? saved : 'system'
  } catch {
    return 'system'
  }
}

function resolvedFor(m) {
  if (m === 'light' || m === 'dark') return m
  try {
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

let mode = read()
const listeners = new Set()
const emit = () => listeners.forEach((l) => l())

function apply() {
  document.documentElement.dataset.theme = resolvedFor(mode)
}

try {
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener?.('change', () => {
    if (mode === 'system') { apply(); emit() }
  })
} catch {}

apply()

export function setTheme(next) {
  mode = MODES.includes(next) ? next : 'system'
  try { localStorage.setItem(KEY, mode) } catch {}
  apply()
  emit()
}

export function cycleTheme() {
  setTheme(resolvedFor(mode) === 'dark' ? 'light' : 'dark')
}

// Returns [mode, resolved]: mode is what the user picked (system/light/dark),
// resolved is what is on screen right now (light/dark).
export function useTheme() {
  const snap = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb) },
    () => `${mode}|${resolvedFor(mode)}`,
  )
  return snap.split('|')
}
