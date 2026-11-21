import { MotionConfig } from 'framer-motion'
import { Component, lazy, Suspense, useCallback, useState, type ReactNode } from 'react'
import { Boot } from './components/Boot'
import { JourneyRail } from './components/JourneyRail'
import { Nav } from './components/Nav'
import { useJourney } from './hooks/useJourney'
import { journey } from './scene/journey'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'

const Universe = lazy(() => import('./scene/Universe'))

journey.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

class SpaceFallback extends Component<{ children: ReactNode }, { broken: boolean }> {
  state = { broken: false }

  static getDerivedStateFromError() {
    return { broken: true }
  }

  render() {
    if (this.state.broken) {
      return (
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#2a1640_0%,#0b1020_45%,#04060b_80%)]" aria-hidden="true" />
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [ready, setReady] = useState(journey.reduced)
  const [hovered, setHovered] = useState(-1)
  const stop = useJourney()
  const done = useCallback(() => setReady(true), [])

  return (
    <MotionConfig reducedMotion="user">
      <SpaceFallback>
        <Suspense fallback={null}>
          <Universe onHoverPlanet={setHovered} />
        </Suspense>
      </SpaceFallback>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,6,11,0.55)_100%)]" />
      <Boot onDone={done} />
      <Nav stop={stop} />
      <JourneyRail stop={stop} />
      <main className="relative z-10 [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_form]:pointer-events-auto [&_.glass]:pointer-events-auto pointer-events-none">
        <Hero ready={ready} />
        <About />
        <Projects stop={stop} hovered={hovered} />
        <Experience />
        <Contact />
      </main>
    </MotionConfig>
  )
}
