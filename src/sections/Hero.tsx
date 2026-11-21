import { motion } from 'framer-motion'
import { Mascot } from '../components/Auri'
import { copy } from '../data/copy'
import { profile } from '../data/profile'
import { useLang } from '../i18n'
import { goToStop } from '../scene/journey'
import { STOPS } from '../scene/stops'

function Word({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ delay: delay + i * 0.045, duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const { t } = useLang()

  return (
    <section id="inicio" data-stop={STOPS.hero} className="relative flex min-h-svh items-end px-4 pb-16 pt-28 sm:px-8 lg:items-center lg:pb-0">
      <div className="mx-auto w-full max-w-[1320px]">
        {ready && (
          <>
            <h1 className="wide text-[clamp(52px,10.5vw,170px)] font-extrabold leading-[0.86] tracking-[-0.04em] [text-shadow:0_4px_40px_rgba(4,6,11,0.8)]">
              <span className="sr-only">{profile.name}</span>
              <span aria-hidden="true">
                <Word text="Guilherme" delay={0.15} />
                <Word text="Valadares" delay={0.45} />
              </span>
            </h1>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}>
              <p className="mt-6 max-w-[34ch] text-[clamp(18px,1.7vw,23px)] leading-snug text-ink/90 [text-shadow:0_2px_20px_rgba(4,6,11,0.9)]">
                {t(profile.role)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => goToStop(STOPS.about)}
                  className="rounded-full bg-aurea px-6 py-3.5 text-[16px] font-semibold text-aurea-ink transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(54,226,180,0.7)]"
                >
                  {t(copy.hero.start)}
                </button>
                <button
                  type="button"
                  onClick={() => goToStop(STOPS.contact)}
                  className="glass rounded-full px-6 py-3.5 text-[16px] font-semibold ring-1 ring-white/15 transition hover:ring-white/35"
                >
                  {t(copy.hero.talk)}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {ready && (
        <motion.div
          className="absolute bottom-6 right-4 flex items-end gap-3 sm:right-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <p className="pixel hidden pb-6 text-[14px] text-dim sm:block">{t(copy.hero.hint)} ↓</p>
          <motion.div
            className="w-[64px] sm:w-[84px]"
            animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Mascot size="100%" outfit="astronaut" mood="wave" lines={[t(copy.hero.auri), t(copy.hero.hint)]} bubbleSide="left" label="Auri" />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
