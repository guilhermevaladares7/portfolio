import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { copy } from '../data/copy'
import { useLang } from '../i18n'
import { journey } from '../scene/journey'
import { AureaLogo } from './AureaLogo'

type Phase = 'dark' | 'line' | 'flash' | 'done'

function flyIn(duration: number) {
  const start = performance.now()
  const step = (now: number) => {
    journey.intro = Math.min(1, (now - start) / duration)
    if (journey.intro < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function Boot({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>(journey.reduced ? 'done' : 'dark')

  useEffect(() => {
    if (journey.reduced) {
      journey.intro = 1
      onDone()
      return
    }
    const timers = [
      setTimeout(() => setPhase('line'), 900),
      setTimeout(() => setPhase('flash'), 1350),
      setTimeout(() => {
        setPhase('done')
        flyIn(2800)
      }, 1650),
      setTimeout(onDone, 2300),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          aria-hidden="true"
        >
          {phase === 'dark' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-5">
              <motion.div
                className="w-[min(46vw,220px)] text-ink/80"
                animate={{ opacity: [0.2, 0.9, 0.5, 1] }}
                transition={{ duration: 0.8, times: [0, 0.3, 0.6, 1] }}
              >
                <AureaLogo title="" />
              </motion.div>
              <p className="pixel text-[14px] text-aurea">
                {t(copy.boot.line)}
                <span className="cursor-blink">_</span>
              </p>
            </motion.div>
          )}

          {phase !== 'dark' && (
            <motion.div
              className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-white shadow-[0_0_40px_10px_rgba(190,240,255,0.8)]"
              initial={{ scaleX: 0, scaleY: 1 }}
              animate={phase === 'line' ? { scaleX: 1, scaleY: 1 } : { scaleX: 1, scaleY: 400, opacity: [1, 1, 0.9] }}
              transition={phase === 'line' ? { duration: 0.4, ease: [0.7, 0, 0.3, 1] } : { duration: 0.3, ease: 'easeIn' }}
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_3px)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
