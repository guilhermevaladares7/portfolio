import { AnimatePresence, motion } from 'framer-motion'
import { ArrowIcon, GithubIcon } from '../components/icons'
import { copy } from '../data/copy'
import { projects } from '../data/projects'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import { goToStop } from '../scene/journey'
import { STOPS } from '../scene/stops'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export function Projects({ stop, hovered }: { stop: number; hovered: number }) {
  const { t } = useLang()
  const index = Math.min(projects.length - 1, Math.max(0, stop - STOPS.firstProject))
  const p = projects[index]

  return (
    <section id="projetos" className="relative" style={{ height: `${projects.length * 100 + 20}svh` }} aria-labelledby="projetos-h">
      {projects.map((proj, i) => (
        <span key={proj.id} data-stop={STOPS.firstProject + i} className="absolute left-0 h-px w-px" style={{ top: `${i * 100}svh` }} />
      ))}

      <div className="sticky top-0 flex h-svh flex-col px-4 pb-5 pt-20 sm:px-8 sm:pb-8 sm:pt-24">
        <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-1">
            <h2 id="projetos-h" className="wide text-[clamp(26px,3vw,40px)] font-extrabold tracking-[-0.03em]">
              {t(copy.projects.title)}
            </h2>
            <p className="hidden max-w-[52ch] text-[15px] text-dim md:block">{t(copy.projects.intro)}</p>
          </div>

          <div className="flex flex-1 items-end pb-4 md:items-center md:pb-0">
            <AnimatePresence mode="wait">
              <motion.article
                key={p.id}
                initial={{ opacity: 0, x: -50, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
                className="glass w-full max-w-[560px] overflow-hidden rounded-3xl ring-1 ring-white/10"
                style={{ boxShadow: `0 30px 80px -40px ${p.color}` }}
              >
                <div className="relative aspect-[16/9] max-h-[26svh] w-full overflow-hidden bg-panel md:max-h-none">
                  <img src={asset(p.media)} alt={t(p.mediaAlt)} className="h-full w-full object-cover object-top" loading="lazy" />
                  <span
                    className="absolute left-3 top-3 rounded-full px-3 py-1 text-[12px] font-semibold text-space"
                    style={{ background: p.color }}
                  >
                    {t(p.when)}
                  </span>
                </div>
                <div className="p-5 sm:p-7">
                  <p className="pixel text-[13px] text-dim">
                    {index + 1} {t(copy.projects.of)} {projects.length}
                  </p>
                  <h3 className="mt-1 text-[clamp(22px,2.2vw,30px)] font-bold leading-tight tracking-[-0.02em]">{p.name}</h3>
                  <p className="mt-2 line-clamp-4 text-[15px] leading-relaxed text-ink/80 sm:text-[16px] md:line-clamp-none">{t(p.summary)}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((tech) => (
                      <li key={tech} className="rounded-full px-2.5 py-1 text-[12px] font-medium ring-1" style={{ color: p.color, borderColor: p.color, boxShadow: `inset 0 0 0 1px ${p.color}55` }}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[14px] font-semibold text-space transition hover:-translate-y-0.5"
                      >
                        <GithubIcon className="h-4 w-4" />
                        {t(copy.projects.code)}
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[14px] font-semibold ring-1 ring-white/15 transition hover:bg-white/16"
                      >
                        {t(copy.projects.live)}
                        <ArrowIcon className="h-4 w-4" />
                      </a>
                    )}
                    {p.note && <span className="text-[13px] text-dim">{t(p.note)}</span>}
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <nav aria-label={t(copy.projects.timeline)} className="relative mt-2">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-white/15" />
            <motion.div
              className="absolute left-0 top-[7px] h-px origin-left bg-aurea"
              animate={{ width: `${(index / (projects.length - 1)) * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 24 }}
            />
            <ol className="relative flex justify-between">
              {projects.map((proj, i) => {
                const on = i === index
                const showDate = i === 0 || projects[i - 1].date !== proj.date
                return (
                  <li key={proj.id} className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => goToStop(STOPS.firstProject + i)}
                      aria-label={`${proj.name}, ${t(proj.when)}`}
                      aria-current={on ? 'step' : undefined}
                      className="grid h-[15px] w-[15px] place-items-center"
                    >
                      <span
                        className={cn('block rounded-full transition-all duration-300', on || hovered === i ? 'h-[15px] w-[15px]' : 'h-[9px] w-[9px]', i > index && !on && 'opacity-50')}
                        style={{ background: i <= index || hovered === i ? proj.color : '#5a6772', boxShadow: on ? `0 0 16px ${proj.color}` : undefined }}
                      />
                    </button>
                    <span className={cn('mt-2 hidden text-[11px] text-dim sm:block', !showDate && 'invisible')}>{t(proj.when)}</span>
                  </li>
                )
              })}
            </ol>
            <AnimatePresence>
              {hovered >= 0 && hovered !== index && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute -top-9 right-0 rounded-full bg-ink px-3 py-1 text-[13px] font-semibold text-space"
                >
                  {projects[hovered].name}
                </motion.p>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </div>
    </section>
  )
}
