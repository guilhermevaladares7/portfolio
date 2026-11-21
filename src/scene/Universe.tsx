import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import { AdaptiveQuality } from './AdaptiveQuality'
import { BlackHole } from './BlackHole'
import { CameraRig } from './CameraRig'
import { Constellation } from './Constellation'
import { DistantGalaxies } from './DistantGalaxies'
import { Galaxy } from './Galaxy'
import { goToStop, journey } from './journey'
import { HOMEWORLD_SIZE, homeworld, planets } from './layout'
import { STOPS } from './stops'
import { Planet } from './Planet'
import { Starfield } from './Starfield'

export default function Universe({ onHoverPlanet }: { onHoverPlanet?: (index: number) => void }) {
  const small = useMemo(() => window.matchMedia('(max-width: 760px)').matches, [])

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={1}
      camera={{ fov: small ? 62 : 50, near: 0.1, far: 24000, position: [0, 300, 400] }}
      gl={{ antialias: false, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => gl.setClearColor('#04060b')}
    >
      <AdaptiveQuality />
      <CameraRig />
      <Starfield count={small ? 900 : 1600} />
      <DistantGalaxies count={small ? 120 : 260} />
      <Galaxy count={small ? 10000 : 24000} />
      <BlackHole count={small ? 1200 : 2800} />
      <Planet position={homeworld} color="#36e2b4" size={HOMEWORLD_SIZE} seed={0.4} detail={2.4} ring active={() => Math.round(journey.j) === STOPS.about} />
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
