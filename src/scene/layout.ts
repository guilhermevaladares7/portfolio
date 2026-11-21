import { Vector3 } from 'three'
import { experiences } from '../data/experiences'
import { projects } from '../data/projects'

export const GALAXY_RADIUS = 72
export const ARMS = 3
export const SPIN = 0.17

const UP = new Vector3(0, 1, 0)

function onArm(r: number, arm: number, drift = 0, y = 0) {
  const angle = (arm / ARMS) * Math.PI * 2 + r * SPIN + drift
  return new Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r)
}

export const homeworld = onArm(60, 0, 0.12, 1.2)

export const planets = projects.map((p, i) => {
  const r = 52 - (i * 38) / (projects.length - 1)
  const drift = i % 2 === 0 ? 0.1 : -0.06
  const y = Math.sin(i * 1.7) * 1.6
  const size = 1.15 + ((i * 7) % 5) * 0.16
  return { id: p.id, color: p.color, ring: !!p.ring, size, position: onArm(r, 0, drift, y) }
})

export const constellationCenter = onArm(11, 1, 0.4, 7)

const shape: [number, number, number][] = [
  [-5.5, 1.6, 0.4],
  [-2.6, -1.2, -0.6],
  [0, 1.1, 0.8],
  [2.7, -1.4, -0.3],
  [5.6, 1.3, 0.2],
]

export const stars = experiences.map((e, i) => {
  const [x, y, z] = shape[i % shape.length]
  const radial = constellationCenter.clone().setY(0).normalize()
  const side = new Vector3().crossVectors(UP, radial).normalize()
  const position = constellationCenter
    .clone()
    .addScaledVector(side, x)
    .addScaledVector(UP, y)
    .addScaledVector(radial, z)
  return { color: e.color, position }
})

type Shot = { position: Vector3; target: Vector3; targetNarrow: Vector3 }

function shotAround(point: Vector3, distance: number, height: number, side: number, lift = 1.4): Shot {
  const radial = point.clone().setY(0).normalize()
  const position = point.clone().addScaledVector(radial, distance).addScaledVector(UP, height)
  const forward = point.clone().sub(position).normalize()
  const right = new Vector3().crossVectors(forward, UP).normalize()
  return {
    position,
    target: point.clone().addScaledVector(right, -side),
    targetNarrow: point.clone().addScaledVector(UP, -lift),
  }
}

const lastAngle = Math.atan2(planets[planets.length - 1].position.z, planets[planets.length - 1].position.x)

export const shots: Shot[] = [
  {
    position: new Vector3(18, 52, 92),
    target: new Vector3(10, -8, 0),
    targetNarrow: new Vector3(0, -14, 0),
  },
  shotAround(homeworld, 15, 3.6, 4.6, 2.6),
  ...planets.map((p) => shotAround(p.position, 7.5 + p.size * 1.6, 2.4, 2.9 + p.size * 0.4, 1.6 + p.size * 0.3)),
  shotAround(constellationCenter, 17, 3.5, 5.5, 2.2),
  (() => {
    const dir = new Vector3(Math.cos(lastAngle + 0.9), 0, Math.sin(lastAngle + 0.9))
    const position = dir.clone().multiplyScalar(16).add(new Vector3(0, 1.6, 0))
    const forward = position.clone().negate().normalize()
    const right = new Vector3().crossVectors(forward, UP).normalize()
    return {
      position,
      target: new Vector3().addScaledVector(right, -5.2),
      targetNarrow: new Vector3(0, -3.2, 0),
    }
  })(),
]

export const STOPS = {
  hero: 0,
  about: 1,
  firstProject: 2,
  experience: 2 + projects.length,
  contact: 3 + projects.length,
}
