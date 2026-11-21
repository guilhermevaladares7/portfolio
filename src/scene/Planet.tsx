import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { AdditiveBlending, BackSide, Color, DoubleSide, Group, MathUtils, ShaderMaterial, Vector3 } from 'three'

const vertex = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`

const fragment = `
  uniform vec3 uColor;
  uniform vec3 uDeep;
  uniform float uSeed;
  uniform float uTime;
  uniform float uGlow;
  varying vec3 vNormal;
  varying vec3 vWorld;
  varying vec3 vLocal;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
               mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 l = normalize(-vWorld);
    vec3 v = normalize(cameraPosition - vWorld);
    vec3 q = normalize(vLocal);
    float bands = fbm(vec3(q.x * 1.6, q.y * 6.0 + uSeed, q.z * 1.6) + uTime * 0.02);
    float spots = fbm(q * 4.0 + uSeed * 3.0);
    vec3 base = mix(uDeep, uColor, smoothstep(0.25, 0.8, bands * 0.75 + spots * 0.4));
    float diffuse = max(dot(n, l), 0.0);
    float rim = pow(1.0 - max(dot(n, v), 0.0), 2.6);
    vec3 col = base * (0.16 + diffuse * 0.95) + uColor * rim * (0.55 + uGlow * 0.8);
    gl_FragColor = vec4(col, 1.0);
  }
`

const atmoVertex = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`

const atmoFragment = `
  uniform vec3 uColor;
  uniform float uGlow;
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec3 v = normalize(cameraPosition - vWorld);
    float f = pow(1.0 - abs(dot(normalize(vNormal), v)), 2.2);
    gl_FragColor = vec4(uColor * f * (0.7 + uGlow), f);
  }
`

type Props = {
  position: Vector3
  color: string
  size: number
  ring?: boolean
  seed: number
  active?: () => boolean
  onSelect?: () => void
  onHover?: (on: boolean) => void
}

export function Planet({ position, color, size, ring, seed, active, onSelect, onHover }: Props) {
  const group = useRef<Group>(null)
  const surface = useRef<ShaderMaterial>(null)
  const atmo = useRef<ShaderMaterial>(null)
  const hovered = useRef(false)

  const uniforms = useMemo(() => {
    const c = new Color(color)
    const deep = c.clone().multiplyScalar(0.28).lerp(new Color('#0a0d1a'), 0.35)
    return {
      surface: { uColor: { value: c }, uDeep: { value: deep }, uSeed: { value: seed }, uTime: { value: 0 }, uGlow: { value: 0 } },
      atmo: { uColor: { value: c.clone() }, uGlow: { value: 0 } },
    }
  }, [color, seed])

  useFrame((state, delta) => {
    const on = active?.() ?? false
    const glow = (on ? 0.6 : 0) + (hovered.current ? 0.5 : 0)
    if (surface.current) {
      surface.current.uniforms.uTime.value = state.clock.elapsedTime
      surface.current.uniforms.uGlow.value = MathUtils.damp(surface.current.uniforms.uGlow.value, glow, 5, delta)
    }
    if (atmo.current) atmo.current.uniforms.uGlow.value = MathUtils.damp(atmo.current.uniforms.uGlow.value, glow, 5, delta)
    if (group.current) {
      group.current.rotation.y += delta * 0.08
      const s = MathUtils.damp(group.current.scale.x, hovered.current ? 1.12 : 1, 6, delta)
      group.current.scale.setScalar(s)
    }
  })

  const enter = (e: ThreeEvent<PointerEvent>) => {
    if (!onSelect) return
    e.stopPropagation()
    hovered.current = true
    document.body.style.cursor = 'pointer'
    onHover?.(true)
  }

  const leave = () => {
    if (!onSelect) return
    hovered.current = false
    document.body.style.cursor = ''
    onHover?.(false)
  }

  return (
    <group position={position}>
      <group ref={group}>
        <mesh
          onPointerOver={enter}
          onPointerOut={leave}
          onClick={(e) => {
            if (!onSelect) return
            e.stopPropagation()
            onSelect()
          }}
        >
          <sphereGeometry args={[size, 48, 48]} />
          <shaderMaterial ref={surface} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms.surface} />
        </mesh>
        <mesh scale={1.14}>
          <sphereGeometry args={[size, 32, 32]} />
          <shaderMaterial
            ref={atmo}
            vertexShader={atmoVertex}
            fragmentShader={atmoFragment}
            uniforms={uniforms.atmo}
            side={BackSide}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
        {ring && (
          <mesh rotation={[Math.PI / 2.35, 0.2, 0]}>
            <ringGeometry args={[size * 1.45, size * 2.25, 96]} />
            <meshBasicMaterial color={color} transparent opacity={0.32} side={DoubleSide} depthWrite={false} blending={AdditiveBlending} />
          </mesh>
        )}
      </group>
    </group>
  )
}
