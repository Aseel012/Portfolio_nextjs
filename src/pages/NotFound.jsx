import { Link } from 'react-router-dom'
import HandNote from '../components/HandNote.jsx'

export default function NotFound() {
  return (
    <div className="px-5 pb-16 pt-20 text-center sm:pt-32">
      <HandNote className="text-[34px]">uh oh</HandNote>
      <h1 className="mt-1.5 text-[44px] font-semibold tracking-[-0.03em] text-ink sm:text-[64px]">404</h1>
      <p className="mt-3.5 text-[15px]">this page does not exist. probably my fault.</p>
      <Link to="/" className="mt-[26px] inline-block rounded-full border border-line px-[22px] py-2.5 text-sm text-ink transition hover:border-dim">back home</Link>
    </div>
  )
}
