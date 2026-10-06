import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const SKILLS = ['PYTHON', 'HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'GIT', 'AWS', 'FIWARE', 'AI']

export default function Learning() {
  const root = useRef()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add({ wide: '(min-width: 768px)' }, (c) => {
        const wide = c.conditions.wide
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: `+=${SKILLS.length * (wide ? 120 : 90)}%`, scrub: 0.8, pin: true },
        })
        SKILLS.forEach((_, i) => {
          const el = `.l-skill-${i}`
          const last = i === SKILLS.length - 1
          tl.fromTo(el, { opacity: 0, scale: 0.3, xPercent: i % 2 ? 40 : -40 }, { opacity: 1, scale: 1, xPercent: 0, duration: 1 })
            .to('.l-count', { textContent: i + 1, snap: { textContent: 1 }, duration: 0.01 }, '<')
            .to('.l-bar', { scaleX: (i + 1) / SKILLS.length, duration: 1 }, '<')
            .to(el, { opacity: last ? 1 : 0, scale: last ? 1 : 2.4, xPercent: last ? 0 : i % 2 ? -40 : 40, duration: 1 }, '+=0.3')
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="learning" ref={root}>
      <p className="mono l-meta"><span className="l-count">0</span> / {SKILLS.length}</p>
      {SKILLS.map((s, i) => (
        <h2 key={s} className={`huge l-skill l-skill-${i} ${i % 2 ? 'outline' : ''}`}>{s}</h2>
      ))}
      <div className="l-track"><div className="l-bar" /></div>
    </section>
  )
}
