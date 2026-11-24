import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data.js'
import ExternalLink from '../components/ExternalLink.jsx'
import Frame from '../components/Frame.jsx'
import HandNote from '../components/HandNote.jsx'
import Reveal from '../components/Reveal.jsx'

export default function ProjectPage() {
  const { slug } = useParams()
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) return <Navigate to="/404" replace />
  const p = projects[idx]
  const next = projects[(idx + 1) % projects.length]

  return (
    <Reveal className="mx-auto w-full max-w-[780px] px-5">
      <Link to="/" className="text-[13.5px] text-dim transition hover:text-ink">&larr; all work</Link>
      <h1 className="mt-4 break-words text-[30px] font-semibold min-[360px]:text-[34px] leading-[1.08] tracking-[-0.03em] text-ink sm:mt-5 sm:text-[52px]">
        {p.title} <span className="text-[15px] font-normal tracking-normal text-dim sm:text-lg">{p.year}</span>
      </h1>
      {p.note && <HandNote className="mt-1.5 text-[21px] sm:mt-1 sm:text-2xl">{p.note}</HandNote>}
      <div className="mb-6 mt-4 flex flex-wrap gap-2 sm:mb-7 sm:mt-5">
        {p.stack.map((t) => (
          <span key={t} className="rounded-full border border-line px-[13px] py-[5px] text-[12.5px] text-body">{t}</span>
        ))}
      </div>
      <div className="max-w-[580px] space-y-3 text-[15px] leading-[1.7] sm:text-[17px]">
        {p.body.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
      </div>
      <div className="mb-8 mt-6 flex flex-wrap gap-3 sm:mb-10 sm:mt-7">
        {p.links.map((l, i) => (
          <ExternalLink key={l.href} href={l.href} className={i === 0
            ? 'rounded-full bg-ink/10 px-5 py-2.5 text-sm text-ink transition hover:bg-ink/[0.16]'
            : 'rounded-full border border-line px-5 py-2.5 text-sm text-ink transition hover:border-dim'}>
            {l.label} ↗
          </ExternalLink>
        ))}
      </div>
      {p.image && <figure><Frame src={p.image} alt={`${p.title} ${['kavynui', 'tarrarium', 'removeanything'].includes(p.slug) ? 'interface' : 'project artwork'}`} />{!['kavynui', 'tarrarium', 'removeanything'].includes(p.slug) && <figcaption className="mt-2 text-xs text-dim">Project artwork</figcaption>}</figure>}
      <Link to={`/work/${next.slug}`} className="group mt-10 flex items-center justify-between border-t border-line px-1 py-[18px] sm:mt-16 sm:py-[22px]">
        <span>
          <span className="mb-1 block text-[12.5px] text-dim">next</span>
          <span className="text-[17px] font-semibold text-ink transition group-hover:opacity-75 sm:text-[19px]">{next.title}</span>
        </span>
        <span className="text-dim transition group-hover:translate-x-0.5 group-hover:text-ink">&rarr;</span>
      </Link>
    </Reveal>
  )
}
