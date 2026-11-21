import { CanvasTexture, SRGBColorSpace } from 'three'

const cache = new Map<string, CanvasTexture>()

export function glowTexture(kind: 'soft' | 'ring' = 'soft') {
  const hit = cache.get(kind)
  if (hit) return hit
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
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
