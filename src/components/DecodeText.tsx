import { useEffect, useRef, useState } from 'react'
import { journey } from '../scene/journey'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#*+<>/'

export function DecodeText({ text, duration = 650 }: { text: string; duration?: number }) {
  const [shown, setShown] = useState(text)
  const first = useRef(true)

  useEffect(() => {
    if (first.current || journey.reduced) {
      first.current = false
      setShown(text)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const fixed = Math.floor(p * text.length)
      let out = text.slice(0, fixed)
      for (let i = fixed; i < text.length; i++) {
        const ch = text[i]
        out += ch === ' ' || i > fixed + 24 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setShown(out)
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, duration])

  return (
    <>
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{text}</span>
    </>
  )
}
