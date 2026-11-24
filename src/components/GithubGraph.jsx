import { useEffect, useRef } from 'react'
import { contributions } from '../data-contributions.js'
import { github } from '../data.js'
import useContributions, { normalizeDays } from '../hooks/useContributions.js'
import { graphLevels } from '../theme-palette.js'
import { useTheme } from '../theme.js'
import ExternalLink from './ExternalLink.jsx'
import HandNote from './HandNote.jsx'

function formatFetchedAt(ts) {
  try {
    return new Date(ts).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
  } catch {
    return ''
  }
}

export default function GithubGraph() {
  const scrollRef = useRef(null)
  const [, resolved] = useTheme()
  const graph = useContributions()
  const LEVELS = graphLevels[resolved] || graphLevels.dark
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [])
  const days = normalizeDays(graph.days)
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  const note =
    graph.status === 'live'
      ? `Live from GitHub · fetched ${formatFetchedAt(graph.fetchedAt)}`
      : graph.status === 'cache'
        ? `GitHub unreachable just now · showing live data fetched ${formatFetchedAt(graph.fetchedAt)}`
        : graph.status === 'fallback'
          ? `GitHub activity, snapshot ${contributions.snapshotDate}`
          : `GitHub activity · fetching live update…`
  return (
    <section aria-label="GitHub activity" className="mx-auto w-full max-w-[840px] px-5 pb-12 sm:pb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <HandNote className="text-[22px] sm:text-[26px]">github, honestly</HandNote>
        <ExternalLink href={`https://github.com/${github.user}`} className="text-[13px] text-dim transition hover:text-ink">
          github.com/{github.user} ↗
        </ExternalLink>
      </div>
      <div className="mt-4 rounded-[20px] border border-line bg-frame/60 px-4 py-4 sm:px-5 sm:py-5">
        <div ref={scrollRef} className="overflow-x-auto" tabIndex={0} aria-label="Contribution graph, scroll horizontally on small screens">
          <div className="mx-auto flex w-max gap-[3px]" role="img" aria-label={`Contribution graph: ${graph.total} contributions in the last year`}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map(([date, level]) => (
                  <span key={date} title={date.startsWith('pad-') ? undefined : date} className="block h-[10px] w-[10px] rounded-[2.5px] transition-transform duration-150 hover:scale-[1.45]" style={{ backgroundColor: LEVELS[level] || LEVELS[0] }} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-[12.5px] text-dim">
          <span>
            <span className="font-semibold text-ink">{graph.total}</span> contributions in the last year
          </span>
          <span className="flex items-center gap-1.5">
            less
            {LEVELS.map((c) => (
              <span key={c} className="block h-[9px] w-[9px] rounded-[2.5px]" style={{ backgroundColor: c }} />
            ))}
            more
          </span>
        </div>
      </div>
      <p className="mt-2 px-1 text-xs text-dim" data-testid="graph-note">
        {note} · <ExternalLink href={`https://github.com/${github.user}`} className="underline decoration-line underline-offset-2 transition hover:text-ink">see it live on GitHub ↗</ExternalLink>
      </p>
    </section>
  )
}
