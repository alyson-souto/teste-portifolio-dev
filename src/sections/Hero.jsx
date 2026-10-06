import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero({ ready }) {
  const root = useRef()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (ready) {
        gsap.from('.h-line', { yPercent: 105, duration: 1.2, stagger: 0.15, ease: 'power4.out' })
        gsap.from('.h-fade', { opacity: 0, y: 20, duration: 1, delay: 0.7, stagger: 0.1 })
      }
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true }
      gsap.to('.h-a', { xPercent: -25, scrollTrigger: st })
      gsap.to('.h-b', { xPercent: 25, scrollTrigger: st })
      gsap.to('.h-sub', { opacity: 0, y: -60, scrollTrigger: st })
      gsap.to('.h-glow', { y: 200, scale: 1.6, scrollTrigger: st })
    }, root)
    return () => ctx.revert()
  }, [ready])
  return (
    <section className="hero" ref={root}>
      <div className="glow h-glow" />
      <div className="mask"><h1 className="huge h-line h-a">ALYSON</h1></div>
      <div className="mask"><h1 className="huge h-line h-b outline">GABRIEL</h1></div>
      <div className="h-sub">
        <p className="h-fade">SOFTWARE ENGINEERING<br />STUDENT / DEVELOPER</p>
        <p className="h-fade mono">FIAP — SÃO PAULO</p>
      </div>
      <span className="scroll-hint mono h-fade">SCROLL TO EXPLORE</span>
    </section>
  )
}
