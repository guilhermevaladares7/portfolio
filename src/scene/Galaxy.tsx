import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, Color, ShaderMaterial } from 'three'
import { seeded } from '../lib/random'
import { ARMS, GALAXY_RADIUS, SPIN } from './layout'

const vertex = `
  attribute float aSize;
  attribute float aRadius;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixel;
  varying vec3 vColor;
  void main() {
    float turn = uTime * 0.035 * (8.0 / (aRadius + 8.0));
    float c = cos(turn);
    float s = sin(turn);
    vec3 p = vec3(position.x * c - position.z * s, position.y, position.x * s + position.z * c);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = clamp(aSize * uPixel * (170.0 / -mv.z), 1.2, 40.0);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
  }
`

const fragment = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.7);
    gl_FragColor = vec4(vColor * a, a);
  }
`

function gauss(rand: () => number) {
  let u = 0
  let v = 0
  while (u === 0) u = rand()
  while (v === 0) v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

export function Galaxy({ count }: { count: number }) {
  const material = useRef<ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const rand = seeded(2026)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const radii = new Float32Array(count)
    const core = new Color('#ffd58a')
    const mid = new Color('#ff8fb5')
    const edge = new Color('#7fb8ff')
    const dust = [new Color('#36e2b4'), new Color('#ff3d7f'), new Color('#8fd0ff')]
    const c = new Color()

    const haze = Math.floor(count / 16)

    for (let i = 0; i < count; i++) {
      const cloud = i < haze
      const r = Math.pow(rand(), 1.35) * (GALAXY_RADIUS - 7) + 7
      const arm = i % ARMS
      const spread = (0.35 + r * 0.075) * (cloud ? 1.6 : 1)
      const angle = (arm / ARMS) * Math.PI * 2 + r * SPIN + gauss(rand) * 0.11
      const x = Math.cos(angle) * r + gauss(rand) * spread
      const z = Math.sin(angle) * r + gauss(rand) * spread
      const thickness = 2.6 * Math.exp(-r / 16) + 0.35
      const y = gauss(rand) * thickness

      positions.set([x, y, z], i * 3)
      radii[i] = r

      const t = r / GALAXY_RADIUS
      if (t < 0.35) c.copy(core).lerp(mid, t / 0.35)
      else c.copy(mid).lerp(edge, Math.min(1, (t - 0.35) / 0.5))
      if (rand() < 0.08) c.copy(dust[i % dust.length])
      const bright = cloud ? 0.05 + rand() * 0.05 : 0.6 + rand() * 0.6
      colors.set([c.r * bright, c.g * bright, c.b * bright], i * 3)
      sizes[i] = cloud ? 9 + rand() * 9 : rand() < 0.015 ? 2.6 + rand() * 2 : 0.6 + rand() * 1.1
    }

    return { positions, colors, sizes, radii }
  }, [count])

  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPixel: { value: Math.min(window.devicePixelRatio, 1.6) } }), [])

  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[geometry.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[geometry.sizes, 1]} />
        <bufferAttribute attach="attributes-aRadius" args={[geometry.radii, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}
