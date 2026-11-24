import { useState } from 'react'
import { Link } from 'react-router-dom'
import { profile, projects, socials } from '../data.js'
import ExternalLink from '../components/ExternalLink.jsx'
import Frame from '../components/Frame.jsx'
import GithubGraph from '../components/GithubGraph.jsx'
import HandNote from '../components/HandNote.jsx'
import Reveal from '../components/Reveal.jsx'
import Skills from '../components/Skills.jsx'

function Project({ p, i }) {
  const links = (
    <span className="flex gap-4">
      {p.links.map((l) => (
        <ExternalLink key={l.href} href={l.href} className="text-[13.5px] text-dim transition hover:text-ink">{l.label} ↗</ExternalLink>
      ))}
    </span>
  )
  return (
    <Reveal as="article" delay={i * 60} className="mx-auto w-full max-w-[840px]">
      <Link to={`/work/${p.slug}`} aria-label={`${p.title} project page`} className="group block">
        <Frame src={p.image} alt={`${p.title} ${['kavynui', 'tarrarium', 'removeanything'].includes(p.slug) ? 'interface' : 'project artwork'}`} />
      </Link>
      {!['kavynui', 'tarrarium', 'removeanything'].includes(p.slug) && <p className="mt-2 px-1 text-xs text-dim sm:px-2">Project artwork</p>}
      <div className="mt-4 px-1 sm:mt-5 sm:px-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h2 className="text-[19px] font-semibold tracking-tight text-ink sm:text-[22px]">
            <Link to={`/work/${p.slug}`} className="transition hover:opacity-75">{p.title}</Link>
            {p.note && <HandNote className="ml-3 align-middle text-[20px] sm:text-[23px] max-sm:ml-0 max-sm:mt-1 max-sm:block">{p.note}</HandNote>}
          </h2>
          <span className="text-[13px] text-dim">{p.year}</span>
        </div>
        <p className="mt-1.5 max-w-[600px] text-sm leading-relaxed sm:text-[15px]">{p.blurb}</p>
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-[12.5px] text-dim">{p.stack.join(' / ')}</span>
          {links}
        </div>
      </div>
    </Reveal>
  )
}

function CompactProject({ p }) {
  return (
    <Link to={`/work/${p.slug}`} className="group mx-auto block w-full max-w-[840px] border-t border-line px-1 py-4 sm:py-[18px]">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[15.5px] font-semibold text-ink transition group-hover:opacity-75 sm:text-[16.5px]">
          {p.title} <span className="text-[12.5px] font-normal text-dim">{p.stack.join(' / ')}</span>
        </span>
        <span className="whitespace-nowrap text-[13px] text-dim">{p.year} ↗</span>
      </div>
      <p className="mt-1 max-w-[560px] text-[13.5px] leading-relaxed sm:text-[14.5px]">{p.blurb}</p>
    </Link>
  )
}

const PREVIEW_COUNT = 2

export default function Home() {
  const [showAll, setShowAll] = useState(false)
  const withImg = projects.filter((p) => p.image)
  const noImg = projects.filter((p) => !p.image)
  const visible = showAll ? withImg : withImg.slice(0, PREVIEW_COUNT)
  const hiddenCount = projects.length - PREVIEW_COUNT
  return (
    <div>
      <section className="px-5 pb-8 pt-6 text-center sm:pb-11 sm:pt-14">
        <img src={profile.avatar} alt="" className="mx-auto h-14 w-14 animate-rise rounded-full transition duration-300 hover:-rotate-6 hover:scale-110 hover:ring-4 hover:ring-ink/10 sm:h-[72px] sm:w-[72px]" />
        <HandNote className="mt-4 block animate-rise text-2xl sm:text-3xl" >hey, i&apos;m</HandNote>
        <h1 style={{ animationDelay: '70ms' }} className="mt-0.5 animate-rise text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[58px]">{profile.name}</h1>
        <p style={{ animationDelay: '140ms' }} className="mx-auto mt-3.5 max-w-[520px] animate-rise text-[15px] leading-relaxed sm:text-[17px]">{profile.intro}</p>
        <p style={{ animationDelay: '200ms' }} className="mt-3.5 animate-rise text-[13px] text-dim">{profile.location} &nbsp;·&nbsp; <a href={`mailto:${profile.email}`} className="transition hover:text-ink">{profile.email}</a></p>
        <nav aria-label="Social profiles" style={{ animationDelay: '260ms' }} className="mt-4 animate-rise flex flex-wrap justify-center gap-x-[18px] gap-y-2 text-[13px] text-dim sm:text-sm">
          {socials.map((s) => (
            <ExternalLink key={s.id} href={s.href} className="transition hover:text-ink">{s.label}</ExternalLink>
          ))}
        </nav>
      </section>

      <GithubGraph />

      <Skills />

      <HandNote className="mx-auto mb-8 mt-1 block w-fit text-center text-2xl sm:mb-11 sm:text-[28px]">some things i&apos;ve made</HandNote>

      <div className="space-y-14 px-5 sm:space-y-[88px]" id="work-list">
        {visible.map((p, i) => <Project key={p.slug} p={p} i={i} />)}
      </div>

      {!showAll && hiddenCount > 0 && (
        <div className="mt-14 px-5 text-center sm:mt-20">
          <button
            type="button"
            aria-expanded="false"
            aria-controls="work-list"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-line px-6 py-2.5 text-sm text-dim transition hover:border-dim hover:text-ink active:scale-95"
          >
            View all projects · {hiddenCount} more
          </button>
        </div>
      )}

      {showAll && noImg.length > 0 && (
        <div className="mt-16 px-5 sm:mt-24">
          <HandNote className="mx-auto mb-3.5 block w-full max-w-[840px] text-[21px] sm:text-2xl">one more under the hood</HandNote>
          {noImg.map((p) => <CompactProject key={p.slug} p={p} />)}
          <div className="mx-auto w-full max-w-[840px] border-t border-line" />
        </div>
      )}

      {showAll && (
        <div className="mt-12 px-5 text-center sm:mt-16">
          <button
            type="button"
            aria-expanded="true"
            aria-controls="work-list"
            onClick={() => {
              setShowAll(false)
              document.getElementById('work-list')?.scrollIntoView()
            }}
            className="rounded-full border border-line px-6 py-2.5 text-sm text-dim transition hover:border-dim hover:text-ink active:scale-95"
          >
            Show less
          </button>
        </div>
      )}

      <p className="mt-7 text-center text-sm text-dim">
        more experiments on <ExternalLink href="https://github.com/Aseel012" className="border-b border-line text-body transition hover:text-ink">GitHub</ExternalLink>
      </p>
    </div>
  )
}
