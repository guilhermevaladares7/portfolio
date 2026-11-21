import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import { BlackHole } from './BlackHole'
import { CameraRig } from './CameraRig'
import { Constellation } from './Constellation'
import { Galaxy } from './Galaxy'
import { goToStop, journey } from './journey'
import { homeworld, planets, STOPS } from './layout'
import { Planet } from './Planet'
import { Starfield } from './Starfield'

export default function Universe({ onHoverPlanet }: { onHoverPlanet?: (index: number) => void }) {
  const small = useMemo(() => window.matchMedia('(max-width: 760px)').matches, [])

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, small ? 1.4 : 1.6]}
      camera={{ fov: small ? 62 : 50, near: 0.1, far: 2000, position: [0, 260, 420] }}
      gl={{ antialias: !small, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#04060b')}
    >
      <CameraRig />
      <Starfield count={small ? 2200 : 5000} />
      <Galaxy count={small ? 26000 : 70000} />
      <BlackHole count={small ? 3500 : 9000} />
      <Planet position={homeworld} color="#36e2b4" size={2.1} seed={0.4} ring active={() => Math.round(journey.j) === STOPS.about} />
      {planets.map((p, i) => (
        <Planet
          key={p.id}
          position={p.position}
          color={p.color}
          size={p.size}
          ring={p.ring}
          seed={i * 1.37 + 2}
          active={() => Math.round(journey.j) === STOPS.firstProject + i}
          onSelect={() => goToStop(STOPS.firstProject + i)}
          onHover={(on) => onHoverPlanet?.(on ? i : -1)}
        />
      ))}
      <Constellation />
    </Canvas>
  )
}
