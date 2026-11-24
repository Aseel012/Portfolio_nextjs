import { writing } from '../data.js'
import ExternalLink from '../components/ExternalLink.jsx'
import HandNote from '../components/HandNote.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Writing() {
  return (
    <div className="mx-auto w-full max-w-[640px] px-5">
      <HandNote className="text-2xl sm:text-[28px]">and sometimes i write</HandNote>
      <h1 className="mb-7 mt-2 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:mb-10 sm:text-[46px]">Writing</h1>
      {writing.map((w, i) => (
        <Reveal key={w.href} delay={i * 30}>
          <ExternalLink href={w.href} className="group block border-t border-line py-4 sm:py-[19px]">
            <div className="max-w-[560px] text-[15.5px] font-medium leading-snug text-ink transition group-hover:opacity-75 sm:text-[17px]">{w.title}</div>
            <div className="mt-1.5 text-[13px] text-dim">{w.date}</div>
          </ExternalLink>
        </Reveal>
      ))}
      <div className="border-t border-line" />
      <p className="mt-[18px] text-[13.5px] text-dim">
        all of these live on <ExternalLink href="https://medium.com/@shaikhmdaseel" className="border-b border-line text-body transition hover:text-ink">Medium</ExternalLink>
      </p>
    </div>
  )
}
