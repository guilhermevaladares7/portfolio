import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { copy } from '../data/copy'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import { goToStop } from '../scene/journey'
import { SECTIONS } from '../lib/sections'
import { STOPS } from '../scene/layout'
import { AureaMark } from './AureaLogo'

export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <button
      type="button"
      onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
      aria-label={t(copy.nav.lang)}
      className={cn('flex items-center rounded-full bg-white/8 p-1 text-[13px] font-semibold ring-1 ring-white/10 transition hover:ring-white/25', className)}
    >
      {(['pt', 'en'] as const).map((l) => (
        <span key={l} className={cn('relative rounded-full px-2.5 py-1 uppercase transition-colors', lang === l ? 'text-aurea-ink' : 'text-dim')}>
          {lang === l && <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-aurea" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
          <span className="relative">{l}</span>
        </span>
      ))}
    </button>
  )
}

export function Nav({ stop }: { stop: number }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  const go = (s: number) => {
    setOpen(false)
    goToStop(s)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-space/85 via-space/45 to-transparent">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <button type="button" onClick={() => go(STOPS.hero)} className="flex items-center gap-2.5 rounded-lg py-1 text-left">
          <AureaMark className="w-7 text-aurea" />
          <span className="text-[15px] font-semibold leading-tight">
            Guilherme Valadares
            <span className="block text-[12px] font-normal text-dim">{t(copy.nav.role)}</span>
          </span>
        </button>

        <nav aria-label="Seções" className="glass hidden items-center gap-1 rounded-full p-1 ring-1 ring-white/10 md:flex">
          {SECTIONS.map((s) => {
            const on = stop >= s.stop && stop <= s.until
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => go(s.stop)}
                aria-current={on ? 'true' : undefined}
                className={cn('relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors', on ? 'text-ink' : 'text-dim hover:text-ink')}
              >
                {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{t(s.label)}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t(copy.nav.menu)}
            className="glass grid h-10 w-10 place-items-center rounded-full ring-1 ring-white/10 md:hidden"
          >
            <span className="flex w-4 flex-col gap-1">
              <i className="h-[2px] w-full rounded bg-ink" />
              <i className="h-[2px] w-full rounded bg-ink" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass fixed inset-0 z-50 flex flex-col px-6 pb-10 pt-24 md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t(copy.nav.close)}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[22px]"
            >
              ×
            </button>
            {[{ key: 'start', stop: STOPS.hero, label: copy.nav.start }, ...SECTIONS].map((s, i) => (
              <motion.button
                key={s.key}
                type="button"
                onClick={() => go(s.stop)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="wide border-b border-white/10 py-5 text-left text-[30px] font-bold"
              >
                {t(s.label)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
