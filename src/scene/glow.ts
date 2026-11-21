import { CanvasTexture, SRGBColorSpace } from 'three'

const cache = new Map<string, CanvasTexture>()

export function glowTexture(kind: 'soft' | 'ring' | 'spiral' = 'soft') {
  const hit = cache.get(kind)
  if (hit) return hit
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  if (kind === 'spiral') {
    drawSpiral(ctx, size)
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    cache.set(kind, texture)
    return texture
  }
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  if (kind === 'soft') {
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.18, 'rgba(255,255,255,0.55)')
    g.addColorStop(0.45, 'rgba(255,255,255,0.12)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
  } else {
    g.addColorStop(0, 'rgba(255,255,255,0)')
    g.addColorStop(0.36, 'rgba(255,255,255,0)')
    g.addColorStop(0.43, 'rgba(255,255,255,0.95)')
    g.addColorStop(0.5, 'rgba(255,255,255,0.35)')
    g.addColorStop(0.75, 'rgba(255,255,255,0.06)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
  }
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  cache.set(kind, texture)
  return texture
}

function drawSpiral(ctx: CanvasRenderingContext2D, size: number) {
  const c = size / 2
  const core = ctx.createRadialGradient(c, c, 0, c, c, c * 0.5)
  core.addColorStop(0, 'rgba(255,255,255,1)')
  core.addColorStop(0.25, 'rgba(255,255,255,0.45)')
  core.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = core
  ctx.fillRect(0, 0, size, size)
  let seed = 11
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  for (let i = 0; i < 2600; i++) {
    const arm = i % 2
    const t = Math.pow(rand(), 0.8)
    const r = t * c * 0.92
    const angle = arm * Math.PI + t * 5.2 + (rand() - 0.5) * 0.7
    const x = c + Math.cos(angle) * r + (rand() - 0.5) * 9
    const y = c + Math.sin(angle) * r + (rand() - 0.5) * 9
    const a = (1 - t) * 0.5 + 0.08
    ctx.fillStyle = `rgba(255,255,255,${a})`
    ctx.fillRect(x, y, 1.6, 1.6)
  }
}
