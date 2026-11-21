import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, Points, ShaderMaterial } from 'three'
import { seeded } from '../lib/random'

const vertex = `
  attribute float aSize;
  attribute float aSeed;
  uniform float uTime;
  uniform float uPixel;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixel;
    gl_Position = projectionMatrix * mv;
    vAlpha = 0.45 + 0.55 * sin(uTime * (0.6 + aSeed * 1.8) + aSeed * 40.0);
    vSeed = aSeed;
  }
`

const fragment = `
  varying float vAlpha;
  varying float vSeed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    vec3 tint = mix(vec3(0.75, 0.85, 1.0), vec3(1.0, 0.9, 0.78), step(0.7, vSeed));
    gl_FragColor = vec4(tint * a, a);
  }
`

export function Starfield({ count }: { count: number }) {
  const material = useRef<ShaderMaterial>(null)

  const data = useMemo(() => {
    const rand = seeded(7)
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const seeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 260 + rand() * 360
      const u = rand() * 2 - 1
      const th = rand() * Math.PI * 2
      const s = Math.sqrt(1 - u * u)
      positions.set([r * s * Math.cos(th), r * u, r * s * Math.sin(th)], i * 3)
      sizes[i] = rand() < 0.06 ? 3.2 : 1 + rand() * 1.4
      seeds[i] = rand()
    }
    return { positions, sizes, seeds }
  }, [count])

  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPixel: { value: Math.min(window.devicePixelRatio, 1.25) } }), [])

  const group = useRef<Points>(null)

  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime
    group.current?.position.copy(state.camera.position)
  })

  return (
    <points ref={group} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[data.seeds, 1]} />
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
