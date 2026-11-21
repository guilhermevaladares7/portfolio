import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, Color, Group, MathUtils, ShaderMaterial, Sprite, SpriteMaterial } from 'three'
import { seeded } from '../lib/random'
import { glowTexture } from './glow'
import { journey } from './journey'

const vertex = `
  attribute float aRadius;
  attribute float aAngle;
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixel;
  uniform float uBoost;
  varying vec3 vColor;
  void main() {
    float a = aAngle + uTime * (2.4 / pow(aRadius, 1.5));
    vec3 p = vec3(cos(a) * aRadius, position.y, sin(a) * aRadius);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = clamp(aSize * uPixel * (60.0 / -mv.z) * (1.0 + uBoost * 0.6), 1.0, 22.0);
    gl_Position = projectionMatrix * mv;
    vColor = aColor * (1.0 + uBoost * 1.4);
  }
`

const fragment = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = pow(smoothstep(0.5, 0.0, d), 1.5);
    gl_FragColor = vec4(vColor * a, a);
  }
`

export function BlackHole({ count }: { count: number }) {
  const disk = useRef<ShaderMaterial>(null)
  const halo = useRef<Sprite>(null)
  const tilt = useRef<Group>(null)
  const core = useRef<SpriteMaterial>(null)

  const data = useMemo(() => {
    const rand = seeded(11)
    const positions = new Float32Array(count * 3)
    const radii = new Float32Array(count)
    const angles = new Float32Array(count)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)
    const hot = new Color('#fff3d6')
    const warm = new Color('#ffb347')
    const cool = new Color('#ff3d7f')
    const c = new Color()
    for (let i = 0; i < count; i++) {
      const r = 2.4 + Math.pow(rand(), 1.6) * 7.5
      radii[i] = r
      angles[i] = rand() * Math.PI * 2
      positions[i * 3 + 1] = (rand() - 0.5) * 0.12 * r * 0.4
      const t = (r - 2.4) / 7.5
      if (t < 0.25) c.copy(hot).lerp(warm, t / 0.25)
      else c.copy(warm).lerp(cool, Math.min(1, (t - 0.25) / 0.75))
      const b = 0.7 + rand() * 0.5
      colors.set([c.r * b, c.g * b, c.b * b], i * 3)
      sizes[i] = 0.7 + rand() * 1.4
    }
    return { positions, radii, angles, sizes, colors }
  }, [count])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixel: { value: Math.min(window.devicePixelRatio, 1.6) }, uBoost: { value: 0 } }),
    [],
  )

  useFrame((state, delta) => {
    journey.pulse = Math.max(0, journey.pulse - delta * 0.45)
    if (disk.current) {
      disk.current.uniforms.uTime.value = state.clock.elapsedTime * (1 + journey.pulse * 2.5)
      disk.current.uniforms.uBoost.value = journey.pulse
    }
    if (halo.current) {
      const s = 10.8 + Math.sin(state.clock.elapsedTime * 1.3) * 0.12 + journey.pulse * 2.5
      halo.current.scale.set(s, s, 1)
    }
    if (core.current) {
      const d = state.camera.position.length()
      core.current.opacity = 0.34 * MathUtils.smoothstep(d, 16, 60)
    }
    if (tilt.current) tilt.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.04 + 0.08
  })

  const ring = glowTexture('ring')
  const soft = glowTexture('soft')

  return (
    <group>
      <sprite scale={[46, 46, 1]} renderOrder={-1}>
        <spriteMaterial ref={core} map={soft} color="#ffb85c" transparent opacity={0.32} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      <sprite scale={[150, 150, 1]} renderOrder={-2}>
        <spriteMaterial map={soft} color="#6d5cff" transparent opacity={0.12} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      <mesh renderOrder={1}>
        <sphereGeometry args={[2, 48, 48]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <sprite ref={halo} scale={[10.8, 10.8, 1]} renderOrder={2}>
        <spriteMaterial map={ring} color="#ffd9a0" transparent opacity={0.95} depthWrite={false} blending={AdditiveBlending} />
      </sprite>
      <group ref={tilt} rotation={[0.16, 0, 0.08]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.16, 0.04, 8, 128]} />
          <meshBasicMaterial color="#fff1d0" transparent opacity={0.9} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        <points frustumCulled={false} renderOrder={3}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
            <bufferAttribute attach="attributes-aRadius" args={[data.radii, 1]} />
            <bufferAttribute attach="attributes-aAngle" args={[data.angles, 1]} />
            <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
            <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
          </bufferGeometry>
          <shaderMaterial
            ref={disk}
            vertexShader={vertex}
            fragmentShader={fragment}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </points>
      </group>
    </group>
  )
}
