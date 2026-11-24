import { certifications, education, experience, skills, tools } from '../data.js'
import ExternalLink from '../components/ExternalLink.jsx'
import HandNote from '../components/HandNote.jsx'
import Reveal from '../components/Reveal.jsx'

function Section({ title, children }) {
  return (
    <section className="mt-9 sm:mt-11">
      <h2 className="mb-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-dim">{title}</h2>
      {children}
      <div className="border-t border-line" />
    </section>
  )
}

function Row({ title, org, period, detail }) {
  return (
    <div className="border-t border-line py-[15px] sm:py-[17px]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <span className="text-[15px] font-medium text-ink sm:text-base">{title}</span>
        {period && <span className="whitespace-nowrap text-[12.5px] text-dim">{period}</span>}
      </div>
      <div className="mt-0.5 text-[13.5px] sm:text-[14.5px]">{org}</div>
      {detail && <p className="mt-1.5 max-w-[540px] text-[13px] leading-relaxed text-dim">{detail}</p>}
    </div>
  )
}

export default function Experience() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-5">
      <HandNote className="text-2xl sm:text-[28px]">the resume-ish part</HandNote>
      <h1 className="mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[46px]">Experience</h1>

      <Reveal><Section title="Work">
        {experience.map((e) => <Row key={e.role} title={e.role} org={e.org} period={e.period} detail={e.detail} />)}
      </Section></Reveal>

      <Reveal><Section title="Education">
        {education.map((e) => <Row key={e.title} title={e.title} org={e.org} period={e.period} />)}
      </Section></Reveal>

      <Reveal><Section title="Certifications">
        {certifications.map((c) => <Row key={c.title} title={c.title} org={c.org} period={c.period} />)}
      </Section></Reveal>

      <Reveal><Section title="Skills">
        {skills.map((g) => (
          <div key={g.group} className="border-t border-line py-[13px] text-[14.5px]">
            <span className="font-medium text-ink">{g.group}</span>
            <span className="text-body"> &nbsp;·&nbsp; {g.items.join(', ')}</span>
          </div>
        ))}
      </Section></Reveal>

      <Reveal><Section title="Small tools">
        {tools.map((t) => (
          <ExternalLink key={t.name} href={t.href} className="group block border-t border-line py-[13px] text-[14.5px]">
            <span className="font-medium text-ink transition group-hover:opacity-75">{t.name}</span>
            <span className="text-body"> &nbsp;·&nbsp; {t.blurb}</span>
          </ExternalLink>
        ))}
      </Section></Reveal>
    </div>
  )
}
