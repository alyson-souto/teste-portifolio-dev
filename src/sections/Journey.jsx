import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const QUOTE = 'Every developer starts somewhere.'

export default function Journey() {
  const root = useRef()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=250%', scrub: 1, pin: true } })
      tl.from('.j-word', { opacity: 0.08, y: 40, stagger: 0.25 })
        .from('.j-line', { scaleX: 0 }, '<')
        .to('.j-quote', { scale: 0.6, y: '-18vh', opacity: 0.5 })
        .from('.j-step', { opacity: 0, x: (i) => (i % 2 ? 150 : -150), stagger: 0.5 }, '<0.2')
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="journey" ref={root}>
      <h2 className="j-quote big">
        {QUOTE.split(' ').map((w, i) => <span key={i} className="j-word">{w}&nbsp;</span>)}
      </h2>
      <div className="j-line" />
      <div className="j-steps">
        <p className="j-step">The first semester at FIAP.<br />The first line of code.</p>
        <p className="j-step">The first error.<br />The first fix.</p>
        <p className="j-step">Then the curiosity<br />that didn't stop.</p>
      </div>
    </section>
  )
}
