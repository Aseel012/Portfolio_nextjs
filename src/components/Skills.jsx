import { skills } from '../data.js'
import HandNote from './HandNote.jsx'

export default function Skills() {
  return (
    <section aria-label="Skills and languages" className="mx-auto w-full max-w-[840px] px-5 pb-14 sm:pb-20">
      <HandNote className="text-[22px] sm:text-[26px]">what i build with</HandNote>
      <div className="mt-4">
        {skills.map((g) => (
          <div key={g.group} className="flex flex-col gap-0.5 border-t border-line py-3.5 last:border-b sm:flex-row sm:items-baseline sm:gap-8">
            <span className="w-28 shrink-0 text-[12.5px] uppercase tracking-[0.08em] text-dim">{g.group}</span>
            <span className="text-[14.5px] leading-relaxed text-body sm:text-[15.5px]">{g.items.join('  ·  ')}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
