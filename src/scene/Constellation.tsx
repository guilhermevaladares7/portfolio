import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Line, LineBasicMaterial, Sprite, Vector3 } from 'three'
import { glowTexture } from './glow'
import { journey } from './journey'
import { stars } from './layout'

export function Constellation() {
  const glows = useRef<(Sprite | null)[]>([])
  const soft = glowTexture('soft')

  const line = useMemo(() => {
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(stars.length * 3), 3))
    geometry.setDrawRange(0, 0)
    const material = new LineBasicMaterial({ color: '#bfe9ff', transparent: true, opacity: 0.55, blending: AdditiveBlending, depthWrite: false })
    return new Line(geometry, material)
  }, [])

  const tip = useMemo(() => new Vector3(), [])

  useFrame((state) => {
    const segments = stars.length - 1
    const progress = Math.min(1, Math.max(0, journey.exp)) * segments
    const full = Math.floor(progress)
    const attr = line.geometry.getAttribute('position') as BufferAttribute
    for (let i = 0; i <= Math.min(full, segments); i++) attr.setXYZ(i, ...stars[i].position.toArray())
    if (full < segments) {
      tip.copy(stars[full].position).lerp(stars[full + 1].position, progress - full)
      attr.setXYZ(full + 1, tip.x, tip.y, tip.z)
      line.geometry.setDrawRange(0, full + 2)
    } else {
      line.geometry.setDrawRange(0, stars.length)
    }
    attr.needsUpdate = true

    const t = state.clock.elapsedTime
    glows.current.forEach((g, i) => {
      if (!g) return
      const lit = progress >= i - 0.05 ? 1 : 0.35
      const s = (2.6 + Math.sin(t * 2 + i) * 0.25) * (0.7 + lit * 0.5)
      g.scale.set(s, s, 1)
      g.material.opacity = 0.35 + lit * 0.6
    })
  })

  return (
    <group>
      <primitive object={line} />
      {stars.map((s, i) => (
        <group key={i} position={s.position}>
          <mesh>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <sprite ref={(el) => (glows.current[i] = el)} scale={[2.6, 2.6, 1]}>
            <spriteMaterial map={soft} color={s.color} transparent depthWrite={false} blending={AdditiveBlending} />
          </sprite>
        </group>
      ))}
    </group>
  )
}
