import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onDone }) {
  const root = useRef()
  useEffect(() => {
    const ctx = gsap.context(() => {
      const n = { v: 0 }
      gsap.timeline({ onComplete: onDone })
        .to(n, { v: 100, duration: 1.2, ease: 'power2.inOut',
          onUpdate: () => {
            const el = root.current?.querySelector('.ld-n')
            if (el) el.textContent = String(Math.round(n.v)).padStart(3, '0')
          }
        })
        .to('.ld-n', { opacity: 0, duration: 0.3 })
        .from('.ld-l', { yPercent: 110, stagger: 0.12, duration: 0.7, ease: 'power3.out' })
        .to('.ld-l', { opacity: 0, duration: 0.4, delay: 0.5 })
        .to(root.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <div className="loader" ref={root}>
      <span className="ld-n mono">000</span>
      <div className="ld-wrap">
        <div className="mask"><div className="ld-l big">ALYSON</div></div>
        <div className="mask"><div className="ld-l mono">SOFTWARE ENGINEERING</div></div>
        <div className="mask"><div className="ld-l mono">FIAP</div></div>
      </div>
    </div>
  )
}
