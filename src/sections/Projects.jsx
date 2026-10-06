import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const PROJECTS = [
  { title: 'SMART SAVE', desc: 'Personal finance app to track spending and reach savings goals.', tech: ['React', 'JavaScript', 'API'], link: '#' },
  { title: 'SMART LAMP', desc: 'Connected lamp controlled remotely through IoT and the cloud.', tech: ['FIWARE', 'AWS', 'IoT'], link: '#' },
  { title: 'REACT / DEV TASK', desc: 'Task manager built to practice components, state and clean UI.', tech: ['React', 'CSS', 'Git'], link: '#' },
  { title: 'AI COMMERCIAL PROPOSAL AGENT', desc: 'AI agent that drafts commercial proposals from a short brief.', tech: ['Python', 'AI', 'LLM'], link: '#' },
]

export default function Projects() {
  const root = useRef()
  const track = useRef()
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const dist = () => track.current.scrollWidth - window.innerWidth
        gsap.to(track.current, { x: () => -dist(), ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, scrub: true, pin: true, invalidateOnRefresh: true } })
      })
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray('.p-card').forEach((c) =>
          gsap.from(c, { opacity: 0, y: 60, scrollTrigger: { trigger: c, start: 'top 85%', toggleActions: 'play none none reverse' } }))
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="projects" ref={root}>
      <div className="p-track" ref={track}>
        <h2 className="huge p-head">PROJECTS</h2>
        {PROJECTS.map((p) => (
          <article className="p-card" key={p.title}>
            <div className="p-frame"><div className="p-img mono">[PROJECT IMAGE]<br />[ADD YOUR PROJECT IMAGE HERE]</div></div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <ul className="mono">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            <a className="btn" href={p.link}>VIEW PROJECT</a>
          </article>
        ))}
      </div>
    </section>
  )
}
