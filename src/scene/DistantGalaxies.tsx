import { useMemo } from 'react'
import { AdditiveBlending, Color } from 'three'
import { seeded } from '../lib/random'
import { glowTexture } from './glow'

const TINTS = ['#cfe3ff', '#ffe0b0', '#ffc2dc', '#bff5e6', '#ffffff', '#d9c8ff']

const vertex = `
  attribute float aSize;
  attribute float aAngle;
  attribute float aFlat;
  attribute vec3 aColor;
  uniform float uPixel;
  varying vec3 vColor;
  varying float vAngle;
  varying float vFlat;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = clamp(aSize * uPixel * (900.0 / -mv.z), 2.0, 160.0);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
    vAngle = aAngle;
    vFlat = aFlat;
  }
`

const fragment = `
  uniform sampler2D uMap;
  varying vec3 vColor;
  varying float vAngle;
  varying float vFlat;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float c = cos(vAngle);
    float s = sin(vAngle);
    p = vec2(p.x * c - p.y * s, p.x * s + p.y * c);
    p.y /= vFlat;
    if (abs(p.y) > 0.5) discard;
    vec4 tex = texture2D(uMap, p + 0.5);
    gl_FragColor = vec4(vColor * tex.r, tex.r);
  }
`

export function DistantGalaxies({ count }: { count: number }) {
  const data = useMemo(() => {
    const rand = seeded(93)
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const angles = new Float32Array(count)
    const flats = new Float32Array(count)
    const c = new Color()
    for (let i = 0; i < count; i++) {
      const r = 1400 + rand() * 6000
      const u = rand() * 2 - 1
      const th = rand() * Math.PI * 2
      const k = Math.sqrt(1 - u * u)
      positions.set([r * k * Math.cos(th), r * u, r * k * Math.sin(th)], i * 3)
      c.set(TINTS[i % TINTS.length]).multiplyScalar(0.35 + rand() * 0.45)
      colors.set([c.r, c.g, c.b], i * 3)
      sizes[i] = 0.4 + rand() * 1.2
      angles[i] = rand() * Math.PI
      flats[i] = 0.3 + rand() * 0.7
    }
    return { positions, colors, sizes, angles, flats }
  }, [count])

  const uniforms = useMemo(() => ({ uMap: { value: glowTexture('spiral') }, uPixel: { value: Math.min(window.devicePixelRatio, 1.25) } }), [])

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aAngle" args={[data.angles, 1]} />
        <bufferAttribute attach="attributes-aFlat" args={[data.flats, 1]} />
      </bufferGeometry>
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} blending={AdditiveBlending} />
    </points>
  )
}
