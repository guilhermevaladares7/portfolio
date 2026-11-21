import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { CatmullRomCurve3, MathUtils, PerspectiveCamera, Vector3 } from 'three'
import { journey } from './journey'
import { INTRO_DIR, INTRO_DISTANCE, shots } from './layout'

const START_LOG = Math.log(INTRO_DISTANCE)

function hold(f: number) {
  return MathUtils.smootherstep(f, 0.22, 0.78)
}

export function CameraRig() {
  const size = useThree((s) => s.size)

  const curves = useMemo(() => {
    const opts = ['centripetal', 0.5] as const
    return {
      position: new CatmullRomCurve3(shots.map((s) => s.position), false, ...opts),
      wide: new CatmullRomCurve3(shots.map((s) => s.target), false, ...opts),
      narrow: new CatmullRomCurve3(shots.map((s) => s.targetNarrow), false, ...opts),
    }
  }, [])

  const goalPos = useRef(new Vector3())
  const goalLook = useRef(new Vector3())
  const look = useRef(new Vector3(0, 0, 0))
  const temp = useMemo(() => new Vector3(), [])
  const started = useRef(false)
  const baseFov = useRef(0)
  const dir = useMemo(() => new Vector3(), [])

  useFrame((state, delta) => {
    const camera = state.camera
    const last = shots.length - 1
    const j = MathUtils.clamp(journey.j, 0, last)
    const i = Math.min(Math.floor(j), last - 1)
    const u = (i + hold(j - i)) / last
    const narrow = size.width / size.height < 0.95

    curves.position.getPoint(u, goalPos.current)
    ;(narrow ? curves.narrow : curves.wide).getPoint(u, goalLook.current)

    if (narrow) goalPos.current.addScaledVector(temp.copy(goalPos.current).sub(goalLook.current).normalize(), 3.5)

    const flying = journey.intro < 1
    if (flying) {
      const e = MathUtils.smootherstep(journey.intro, 0, 1)
      const end = goalPos.current.length()
      const distance = Math.exp(MathUtils.lerp(START_LOG, Math.log(end), e))
      dir.copy(INTRO_DIR).lerp(temp.copy(goalPos.current).normalize(), e).normalize()
      goalPos.current.copy(dir).multiplyScalar(distance)
      goalLook.current.multiplyScalar(e)
    }

    const cam = camera as PerspectiveCamera
    if (!baseFov.current) baseFov.current = cam.fov
    const warp = flying ? Math.pow(Math.sin(Math.PI * journey.intro), 2) * 24 : 0
    const fov = baseFov.current + warp
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov
      cam.updateProjectionMatrix()
    }

    if (flying) {
      camera.position.copy(goalPos.current)
      look.current.copy(goalLook.current)
      camera.lookAt(look.current)
      return
    }

    if (!journey.reduced && !narrow) {
      goalPos.current.x += journey.pointer.x * 0.9
      goalPos.current.y += journey.pointer.y * 0.6
    }

    if (!started.current) {
      camera.position.copy(goalPos.current)
      look.current.copy(goalLook.current)
      started.current = true
    }

    const k = journey.reduced ? 30 : 3.2
    camera.position.x = MathUtils.damp(camera.position.x, goalPos.current.x, k, delta)
    camera.position.y = MathUtils.damp(camera.position.y, goalPos.current.y, k, delta)
    camera.position.z = MathUtils.damp(camera.position.z, goalPos.current.z, k, delta)
    look.current.x = MathUtils.damp(look.current.x, goalLook.current.x, k, delta)
    look.current.y = MathUtils.damp(look.current.y, goalLook.current.y, k, delta)
    look.current.z = MathUtils.damp(look.current.z, goalLook.current.z, k, delta)
    camera.lookAt(look.current)
  })

  return null
}
