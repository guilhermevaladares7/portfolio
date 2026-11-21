import { useEffect, useState } from 'react'
import { journey } from '../scene/journey'

function measure() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-stop]'))
    .map((el) => ({ stop: Number(el.dataset.stop), top: el.getBoundingClientRect().top + window.scrollY }))
    .sort((a, b) => a.stop - b.stop)
}

export function useJourney() {
  const [stop, setStop] = useState(0)

  useEffect(() => {
    let marks = measure()
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      let j = 0
      if (marks.length) {
        if (y <= marks[0].top) j = marks[0].stop
        else if (y >= marks[marks.length - 1].top) j = marks[marks.length - 1].stop
        else {
          for (let i = 0; i < marks.length - 1; i++) {
            const a = marks[i]
            const b = marks[i + 1]
            if (y >= a.top && y < b.top) {
              j = a.stop + ((y - a.top) / Math.max(1, b.top - a.top)) * (b.stop - a.stop)
              break
            }
          }
        }
      }
      journey.j = j

      const exp = document.getElementById('experiencias')
      if (exp) {
        const r = exp.getBoundingClientRect()
        journey.exp = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / Math.max(1, r.height * 0.85)))
      }

      setStop((prev) => (prev === Math.round(j) ? prev : Math.round(j)))
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const remeasure = () => {
      marks = measure()
      schedule()
    }

    const onPointer = (e: PointerEvent) => {
      journey.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      journey.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }

    const observer = new ResizeObserver(remeasure)
    observer.observe(document.body)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    window.addEventListener('pointermove', onPointer, { passive: true })
    remeasure()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return stop
}
