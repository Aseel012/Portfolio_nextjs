import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setTheme } from '../theme.js'

function isTyping(target) {
  if (!target) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable
}

export default function CommandPalette() {
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef(null)

  const groups = useMemo(() => {
    const copy = async () => {
      try { await navigator.clipboard?.writeText(window.location.href) } catch {}
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
    return [
      {
        name: 'Pages',
        items: [
          { label: 'Work', hint: '⇧H', key: 'h', run: () => nav('/') },
          { label: 'Open source', hint: '⇧O', key: 'o', run: () => nav('/open-source') },
          { label: 'Writing', hint: '⇧W', key: 'w', run: () => nav('/writing') },
          { label: 'Experience', hint: '⇧E', key: 'e', run: () => nav('/experience') },
        ],
      },
      {
        name: 'Actions',
        items: [
          { label: 'Copy link', hint: '⇧C', key: 'c', run: copy },
          { label: 'Light mode', run: () => setTheme('light') },
          { label: 'Dark mode', run: () => setTheme('dark') },
          { label: 'System theme', hint: '⇧T', key: 't', run: () => setTheme('system') },
        ],
      },
    ]
  }, [nav])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length > 0)
  }, [groups, query])

  const flat = useMemo(() => filtered.flatMap((g) => g.items), [filtered])
  const hasResults = flat.length > 0

  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      if (e.key === 'Escape') { setOpen(false); return }
      // Shift + letter jumps straight to an action from anywhere, like the
      // shortcuts on his current site. Never while typing or with modifiers.
      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target)) {
        const key = e.key.toLowerCase()
        const action = groups.flatMap((g) => g.items).find((i) => i.key === key)
        if (action) {
          e.preventDefault()
          setOpen(false)
          action.run()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [groups])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => { setIndex(0) }, [query])

  if (!open) return null

  const run = (item) => { setOpen(false); item.run() }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, flat.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && flat[index]) { e.preventDefault(); run(flat[index]) }
  }

  let row = -1
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]" role="dialog" aria-modal="true" aria-label="Search">
      <button aria-label="Close search" className="absolute inset-0 animate-fade bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} tabIndex={-1} />
      <div className="relative w-full max-w-[540px] animate-pop overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-[17px] w-[17px] shrink-0 text-dim" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search for actions…"
            aria-label="Search for actions"
            className="w-full bg-transparent py-3.5 text-[15px] text-ink outline-none placeholder:text-dim"
          />
          <kbd className="shrink-0 rounded-md border border-line px-1.5 py-0.5 text-[11px] text-dim">esc</kbd>
        </div>
        <div className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.map((g) => (
            <div key={g.name}>
              <p className="px-3 pb-1 pt-2.5 text-[11.5px] uppercase tracking-[0.08em] text-dim">{g.name}</p>
              {g.items.map((item) => {
                row += 1
                const active = row === index
                const myIndex = row
                return (
                  <button
                    key={item.label}
                    onClick={() => run(item)}
                    onMouseEnter={() => setIndex(myIndex)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[14.5px] transition ${active ? 'bg-ink/10 text-ink' : 'text-body'}`}
                  >
                    <span>{item.label}</span>
                    {item.hint && <kbd className="text-[11px] text-dim">{item.hint}</kbd>}
                  </button>
                )
              })}
            </div>
          ))}
          {!hasResults && <p className="px-3 py-8 text-center text-sm text-dim">No results for “{query}”</p>}
        </div>
        <div className="border-t border-line px-4 py-2 text-[11.5px] text-dim">
          {copied ? 'Link copied to clipboard' : '↑↓ navigate · ↵ open · ⌘K toggle · ⇧letter jumps from anywhere'}
        </div>
      </div>
    </div>
  )
}
