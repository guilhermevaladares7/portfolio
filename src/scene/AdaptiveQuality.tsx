import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

export function AdaptiveQuality() {
  const setDpr = useThree((s) => s.setDpr)
  const sample = useRef({ time: 0, frames: 0, dpr: 1 })

  useFrame((_, delta) => {
    const s = sample.current
    s.time += delta
    s.frames += 1
    if (s.time < 1.5) return
    const fps = s.frames / s.time
    s.time = 0
    s.frames = 0
    if (fps < 45 && s.dpr > 0.55) {
      s.dpr = Math.max(0.55, s.dpr - 0.15)
      setDpr(s.dpr)
    } else if (fps > 58 && s.dpr < Math.min(window.devicePixelRatio, 1.25)) {
      s.dpr = Math.min(Math.min(window.devicePixelRatio, 1.25), s.dpr + 0.1)
      setDpr(s.dpr)
    }
  })

  return null
}
