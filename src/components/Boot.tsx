import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { copy, scaleLines } from '../data/copy'
import { useLang } from '../i18n'
import { journey } from '../scene/journey'
import { AureaLogo } from './AureaLogo'

type Phase = 'dark' | 'line' | 'flash' | 'flight' | 'done'

const FLIGHT = 8600
const CUES = [
  [0.04, 0.3],
  [0.34, 0.6],
  [0.64, 0.86],
]

export function Boot({ onDone }: { onDone: () => void }) {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>(journey.reduced ? 'done' : 'dark')
  const [caption, setCaption] = useState(-1)
  const frame = useRef(0)
  const finished = useRef(false)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    cancelAnimationFrame(frame.current)
    journey.intro = 1
    setCaption(-1)
    setPhase('done')
    onDone()
  }, [onDone])

  useEffect(() => {
    if (journey.reduced) {
      finish()
      return
    }
    journey.intro = 0

    const fly = () => {
      const start = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / FLIGHT)
        journey.intro = p
        const cue = CUES.findIndex(([a, b]) => p >= a && p < b)
        setCaption((prev) => (prev === cue ? prev : cue))
        if (p >= 0.9 && !finished.current) {
          finished.current = true
          setPhase('done')
          onDone()
        }
        if (p < 1) frame.current = requestAnimationFrame(step)
        else setCaption(-1)
      }
      frame.current = requestAnimationFrame(step)
    }

    const timers = [
      setTimeout(() => setPhase('line'), 900),
      setTimeout(() => setPhase('flash'), 1350),
      setTimeout(() => {
        setPhase('flight')
        fly()
      }, 1650),
    ]
    return () => {
      timers.forEach(clearTimeout)
      cancelAnimationFrame(frame.current)
    }
  }, [finish, onDone])

  return (
    <>
      <AnimatePresence>
        {(phase === 'dark' || phase === 'line' || phase === 'flash') && (
          <motion.div
            key="boot"
            className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
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

      <div className="pointer-events-none fixed inset-0 z-[90] grid place-items-center px-6" aria-live="polite">
        <AnimatePresence mode="wait">
          {caption >= 0 && (
            <motion.p
              key={caption}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
              className="wide max-w-[22ch] text-center text-[clamp(26px,3.6vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] [text-shadow:0_4px_40px_rgba(0,0,0,0.9)]"
            >
              {t(scaleLines[caption])}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {phase === 'flight' && (
          <motion.button
            type="button"
            onClick={finish}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
            className="fixed bottom-6 right-6 z-[95] rounded-full bg-white/10 px-5 py-2.5 text-[14px] font-semibold ring-1 ring-white/20 transition hover:bg-white/20"
          >
            {t(copy.boot.skip)} →
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
