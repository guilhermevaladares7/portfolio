import { copy } from '../data/copy'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import { goToStop } from '../scene/journey'
import { STOPS } from '../scene/stops'
import { SECTIONS } from '../lib/sections'

export function JourneyRail({ stop }: { stop: number }) {
  const { t } = useLang()
  const items = [{ key: 'start', stop: STOPS.hero, until: STOPS.hero, label: copy.nav.start }, ...SECTIONS]
  const progress = stop / STOPS.contact

  return (
    <nav aria-label={t(copy.projects.timeline)} className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="relative flex flex-col gap-7 py-1">
        <span className="absolute bottom-2 left-[5px] top-2 w-px bg-white/15" />
        <span
          className="absolute left-[5px] top-2 w-px bg-aurea transition-[height] duration-700"
          style={{ height: `calc(${progress * 100}% - ${progress * 16}px)` }}
        />
        {items.map((it) => {
          const on = stop >= it.stop && stop <= it.until
          const past = stop > it.until
          return (
            <button key={it.key} type="button" onClick={() => goToStop(it.stop)} className="group relative flex items-center gap-3">
              <span
                className={cn(
                  'h-[11px] w-[11px] rounded-full ring-2 transition-all',
                  on ? 'scale-125 bg-aurea ring-aurea/40' : past ? 'bg-aurea/70 ring-transparent' : 'bg-space ring-white/30',
                )}
              />
              <span
                className={cn(
                  'text-[13px] font-medium transition-all',
                  on ? 'text-ink opacity-100' : 'text-dim opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                )}
              >
                {t(it.label)}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
