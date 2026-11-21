import { useMemo } from 'react'
import { AdditiveBlending, Vector3 } from 'three'
import { seeded } from '../lib/random'
import { glowTexture } from './glow'
import { INTRO_DIR, INTRO_DISTANCE } from './layout'

const TINTS = ['#cfe3ff', '#ffe0b0', '#ffc2dc', '#bff5e6', '#ffffff', '#d9c8ff']

export function DistantGalaxies({ count }: { count: number }) {
  const spiral = glowTexture('spiral')
  const soft = glowTexture('soft')

  const items = useMemo(() => {
    const rand = seeded(93)
    const list: { position: Vector3; scale: [number, number, number]; rotation: number; color: string; opacity: number; round: boolean }[] = []
    const side = new Vector3().crossVectors(INTRO_DIR, new Vector3(0, 1, 0)).normalize()
    const up = new Vector3().crossVectors(side, INTRO_DIR).normalize()

    for (let i = 0; i < 16; i++) {
      const along = 260 * Math.pow(INTRO_DISTANCE / 300, i / 15)
      const angle = rand() * Math.PI * 2
      const off = along * (0.08 + rand() * 0.12) + 90
      const position = INTRO_DIR.clone()
        .multiplyScalar(along)
        .addScaledVector(side, Math.cos(angle) * off)
        .addScaledVector(up, Math.sin(angle) * off)
      const s = 90 + rand() * 160
      list.push({ position, scale: [s, s * (0.35 + rand() * 0.65), 1], rotation: rand() * Math.PI, color: TINTS[i % TINTS.length], opacity: 0.75, round: false })
    }

    for (let i = 0; i < count; i++) {
      const r = 900 + Math.pow(rand(), 0.7) * 9000
      const u = rand() * 2 - 1
      const th = rand() * Math.PI * 2
      const k = Math.sqrt(1 - u * u)
      const position = new Vector3(r * k * Math.cos(th), r * u, r * k * Math.sin(th))
      const s = 70 + rand() * 220
      const round = rand() < 0.3
      list.push({
        position,
        scale: [s, round ? s * 0.8 : s * (0.3 + rand() * 0.7), 1],
        rotation: rand() * Math.PI,
        color: TINTS[i % TINTS.length],
        opacity: 0.35 + rand() * 0.45,
        round,
      })
    }
    return list
  }, [count])

  return (
    <group>
      {items.map((g, i) => (
        <sprite key={i} position={g.position} scale={g.scale}>
          <spriteMaterial
            map={g.round ? soft : spiral}
            color={g.color}
            rotation={g.rotation}
            transparent
            opacity={g.opacity}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  )
}
