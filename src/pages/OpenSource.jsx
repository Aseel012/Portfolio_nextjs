import { useState } from 'react'
import { github } from '../data.js'
import ExternalLink from '../components/ExternalLink.jsx'
import HandNote from '../components/HandNote.jsx'
import Reveal from '../components/Reveal.jsx'
import useGithubStats from '../hooks/useGithubStats.js'

const tabs = [
  { status: 'merged', label: 'Merged', dot: '#a371f7' },
  { status: 'open', label: 'Open', dot: '#3fb950' },
  { status: 'closed', label: 'Closed', dot: '#f85149' },
]

const verifyUrl = `https://github.com/search?q=${encodeURIComponent(`author:${github.user} type:pr -user:${github.user}`)}&type=pullrequests`

function formatFetchedAt(ts) {
  try {
    return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  } catch {
    return ''
  }
}

function PR({ o, i, dot }) {
  return (
    <Reveal delay={i * 40}>
      <ExternalLink href={o.href} className="group flex gap-3.5 border-t border-line px-1 py-4 sm:py-[17px]">
        <span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: dot }} />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-4">
            <span className="text-[15px] font-medium leading-snug text-ink transition group-hover:opacity-75 sm:text-[16px]">{o.detail}</span>
            <span className="shrink-0 whitespace-nowrap text-[13px] text-dim">PR ↗</span>
          </span>
          <span className="mt-1 block text-[13px] text-dim sm:text-[13.5px]">{o.project}</span>
        </span>
      </ExternalLink>
    </Reveal>
  )
}

export default function OpenSource() {
  const stats = useGithubStats()
  const [active, setActive] = useState('merged')
  const cells = [
    { value: stats.mergedExternalPRs, label: 'merged PRs' },
    { value: stats.openExternalPRs, label: 'open PRs' },
    { value: stats.contributedProjects, label: 'projects contributed to' },
  ]
  const note =
    stats.status === 'live'
      ? `Live from GitHub · fetched ${formatFetchedAt(stats.fetchedAt)}`
      : stats.status === 'cache'
        ? `GitHub unreachable just now · showing live data fetched ${formatFetchedAt(stats.fetchedAt)}`
        : stats.status === 'ratelimit'
          ? `GitHub is limiting requests from this network right now · showing verified numbers as of ${github.snapshotDate}`
          : stats.status === 'fallback'
            ? `GitHub unreachable just now · showing verified numbers as of ${github.snapshotDate}`
            : `GitHub numbers as of ${github.snapshotDate} · fetching live update…`
  const activeTab = tabs.find((t) => t.status === active)
  const prs = stats.prs.filter((o) => o.status === active)
  return (
    <div className="mx-auto w-full max-w-[640px] px-5">
      <HandNote className="text-2xl sm:text-[28px]">i like fixing things in public</HandNote>
      <h1 className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[46px]">Open source</h1>
      <p className="mt-3.5 max-w-[560px] text-[14.5px] leading-relaxed sm:text-base">
        Small, real fixes in libraries people actually use. Every public PR to other projects is below, merged, open and closed alike.
      </p>

      <dl className="mt-8 grid grid-cols-3 gap-x-5 gap-y-6 sm:mt-9 sm:gap-x-8">
        {cells.map((c) => (
          <div key={c.label}>
            <dd className="text-[22px] font-semibold tracking-tight text-ink sm:text-[28px]">{c.value}</dd>
            <dt className="mt-0.5 text-[12.5px] text-dim">{c.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mb-10 mt-4 text-xs text-dim" data-testid="gh-note">
        {note} · <ExternalLink href={verifyUrl} className="underline decoration-line underline-offset-2 transition hover:text-ink">verify on GitHub ↗</ExternalLink>
      </p>

      <div className="mb-1.5 flex sm:justify-end" role="tablist" aria-label="Pull requests by status">
        <div className="flex gap-0.5 rounded-full border border-line bg-bg/85 p-1">
          {tabs.map((t) => {
            const count = stats.prs.filter((o) => o.status === t.status).length
            const selected = active === t.status
            return (
              <button
                key={t.status}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(t.status)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] transition active:scale-95 sm:px-4 ${selected ? 'bg-ink/10 text-ink' : 'text-dim hover:text-ink'}`}
              >
                {t.label} <span className={selected ? 'text-dim' : 'text-dim/70'}>{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <section role="tabpanel" aria-label={`${activeTab.label} pull requests`} className="mb-10">
        <div className="mt-1.5">
          {prs.map((o, i) => <PR key={o.href} o={o} i={i} dot={activeTab.dot} />)}
          <div className="border-t border-line" />
        </div>
      </section>
      <p className="text-xs text-dim">
        {stats.status === 'live' || stats.status === 'cache'
          ? 'Every public PR to other projects, fetched live from GitHub.'
          : `Full PR list and counts as of ${github.snapshotDate}.`}
      </p>
    </div>
  )
}
