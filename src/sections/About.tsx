import { motion } from 'framer-motion'
import { Mascot } from '../components/Auri'
import { DecodeText } from '../components/DecodeText'
import { copy } from '../data/copy'
import { about } from '../data/profile'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import { STOPS } from '../scene/layout'

export function About() {
  const { t, lang, setLang } = useLang()

  return (
    <section id="sobre" data-stop={STOPS.about} className="relative h-[170svh]" aria-labelledby="sobre-h">
      <div className="sticky top-0 flex min-h-svh items-end px-4 pb-6 pt-24 sm:px-8 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-[1320px]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
            className="glass relative w-full max-w-[600px] rounded-3xl p-6 ring-1 ring-white/10 sm:p-9"
          >
            <div className="absolute -top-[58px] right-6 w-[64px] sm:-top-[70px] sm:w-[76px]">
              <Mascot size="100%" outfit="astronaut" mood="happy" lines={[t(copy.about.auri)]} bubbleSide="left" label="Auri" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="sobre-h" className="wide text-[clamp(30px,3.4vw,46px)] font-extrabold leading-none tracking-[-0.03em]">
                {t(copy.about.title)}
              </h2>
              <div role="tablist" aria-label="Idioma" className="flex rounded-full bg-white/6 p-1 text-[13px] ring-1 ring-white/10">
                {(
                  [
                    ['pt', 'Português'],
                    ['en', 'English'],
                  ] as const
                ).map(([l, label]) => (
                  <button
                    key={l}
                    type="button"
                    role="tab"
                    aria-selected={lang === l}
                    onClick={() => setLang(l)}
                    className={cn('rounded-full px-3 py-1.5 font-medium transition-colors', lang === l ? 'bg-white/14 text-ink' : 'text-dim hover:text-ink')}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-[clamp(20px,1.8vw,24px)] font-semibold text-aurea">
              <DecodeText text={t(about.greeting)} />
            </p>
            <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-ink/85 sm:text-[17px]">
              {about.paragraphs.map((p, i) => (
                <p key={i} className={cn(i > 1 && 'hidden sm:block')}>
                  <DecodeText text={t(p)} duration={900} />
                </p>
              ))}
            </div>

            <dl className="mt-6 grid gap-x-6 gap-y-3 border-t border-white/10 pt-5 sm:grid-cols-2">
              {about.facts.map((f) => (
                <div key={f.label.pt} className={cn(f.label.pt === 'Interesses' && 'hidden sm:block')}>
                  <dt className="text-[12px] text-dim">{t(f.label)}</dt>
                  <dd className="text-[15px] font-medium">{t(f.value)}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6">
              <p className="text-[12px] text-dim">{t(copy.about.stack)}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {about.stack.map((s) => (
                  <li key={s} className="rounded-full bg-white/6 px-3 py-1 text-[13px] text-ink/85 ring-1 ring-white/8">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
