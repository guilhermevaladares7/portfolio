export const journey = {
  j: 0,
  intro: 0,
  exp: 0,
  pulse: 0,
  hover: -1,
  pointer: { x: 0, y: 0 },
  reduced: false,
}

export function goToStop(stop: number) {
  const el = document.querySelector<HTMLElement>(`[data-stop="${stop}"]`)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior: journey.reduced ? 'auto' : 'smooth' })
}
