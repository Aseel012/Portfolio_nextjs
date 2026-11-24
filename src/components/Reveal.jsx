import { useEffect, useRef, useState } from 'react'

// Fades children up once as they enter the viewport. Falls back to visible
// when IntersectionObserver is unavailable (tests, old browsers, no-JS prerender).
export default function Reveal({ as: Tag = 'section', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    if (shown || !ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [shown])
  return (
    <Tag ref={ref} style={{ animationDelay: `${delay}ms` }} className={`${shown ? 'animate-rise' : 'opacity-0'} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
