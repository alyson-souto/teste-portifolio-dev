import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Hero from './sections/Hero'
import Journey from './sections/Journey'
import Learning from './sections/Learning'
import Projects from './sections/Projects'
import Future from './sections/Future'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    if (ready) setTimeout(() => ScrollTrigger.refresh(), 100)
  }, [ready])

  return (
    <>
      {!ready && <Loader onDone={() => setReady(true)} />}
      <main>
        <Hero ready={ready} />
        <Journey />
        <Learning />
        <Projects />
        <Future />
      </main>
    </>
  )
}
