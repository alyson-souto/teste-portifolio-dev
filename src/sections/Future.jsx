import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const FUTURE = ['FRONT-END', 'FULL STACK', 'ARTIFICIAL INTELLIGENCE', 'CLOUD']
const LINKS = [['GitHub', '#'], ['LinkedIn', '#'], ['Email', 'mailto:']]

export default function Future() {
  const root = useRef()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.f-name', { scale: 1.5, opacity: 0, scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 20%', scrub: true } })
      gsap.utils.toArray('.f-item').forEach((el, i) =>
        gsap.from(el, { xPercent: i % 2 ? 40 : -40, opacity: 0, scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 55%', scrub: true } }))
      gsap.from('.f-link', { y: 40, opacity: 0, stagger: 0.12, scrollTrigger: { trigger: '.f-links', start: 'top 90%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="future" ref={root}>
      <h2 className="huge f-name">ALYSON<br />GABRIEL</h2>
      <p className="mono">SOFTWARE ENGINEERING STUDENT<br />FIAP</p>
      <p className="mono f-label">FUTURE:</p>
      {FUTURE.map((f, i) => <div key={f} className={`big f-item ${i % 2 ? 'outline' : ''}`}>{f}</div>)}
      <div className="f-links">
        {LINKS.map(([l, h]) => <a key={l} className="f-link btn" href={h}>{l}</a>)}
      </div>
    </section>
  )
}
