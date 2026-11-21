import { motion } from 'framer-motion'
import { ArrowIcon } from '../components/icons'
import { copy } from '../data/copy'
import { experiences } from '../data/experiences'
import { useLang } from '../i18n'
import { STOPS } from '../scene/stops'

export function Experience() {
  const { t } = useLang()

  return (
    <section id="experiencias" data-stop={STOPS.experience} className="relative px-4 pb-[40svh] pt-28 sm:px-8" aria-labelledby="exp-h">
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-[620px]">
          <h2 id="exp-h" className="wide text-[clamp(30px,3.4vw,46px)] font-extrabold leading-none tracking-[-0.03em] [text-shadow:0_2px_24px_rgba(4,6,11,0.9)]">
            {t(copy.experience.title)}
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/80 [text-shadow:0_2px_16px_rgba(4,6,11,0.9)]">{t(copy.experience.intro)}</p>
        </div>

        <ol className="relative mt-12 max-w-[620px] space-y-5 border-l border-white/12 pl-6 sm:pl-9">
          {experiences.map((e, i) => (
            <motion.li
              key={e.org}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.5, once: true }}
              transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.2, 0.9, 0.2, 1] }}
              className="glass relative rounded-2xl p-5 ring-1 ring-white/10 sm:p-6"
            >
              <span
                className="absolute -left-[31px] top-7 h-3 w-3 rounded-full sm:-left-[43px]"
                style={{ background: e.color, boxShadow: `0 0 14px 2px ${e.color}` }}
              />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="rounded-full px-2.5 py-0.5 text-[12px] font-semibold text-space" style={{ background: e.color }}>
                  {t(e.kind)}
                </span>
                <span className="text-[13px] text-dim">{t(e.period)}</span>
              </div>
              <h3 className="mt-3 text-[21px] font-bold leading-tight">{e.org}</h3>
              <p className="text-[15px] font-medium text-ink/75">{t(e.role)}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{t(e.description)}</p>
              {e.link && (
                <a href={e.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-aurea hover:underline">
                  {t(copy.experience.visit)} {e.org}
                  <ArrowIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
