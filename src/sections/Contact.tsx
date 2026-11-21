import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { AureaMark } from '../components/AureaLogo'
import { GithubIcon, GlobeIcon, InstagramIcon, LinkedinIcon, MailIcon, WhatsappIcon } from '../components/icons'
import { copy } from '../data/copy'
import { profile } from '../data/profile'
import { useLang } from '../i18n'
import { cn } from '../lib/cn'
import { sendMessage, type ContactForm } from '../lib/sendMessage'
import { goToStop, journey } from '../scene/journey'
import { STOPS } from '../scene/stops'

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'failed'

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-dim">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 block text-[13px] text-[#ff8a8a]" role="alert">
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

const input =
  'mt-1.5 w-full rounded-xl bg-white/6 px-4 py-3 text-[16px] text-ink ring-1 ring-white/12 outline-none transition placeholder:text-dim/60 focus:bg-white/9 focus:ring-2 focus:ring-aurea'

export function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState<Status>('idle')
  const [signal, setSignal] = useState<{ x: number; y: number } | null>(null)
  const button = useRef<HTMLButtonElement>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({ mode: 'onTouched' })

  const channels = [
    { icon: MailIcon, label: 'E-mail', value: profile.email, href: `mailto:${profile.email}`, color: '#36e2b4' },
    { icon: WhatsappIcon, label: 'WhatsApp', value: profile.phoneLabel, href: `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(t(copy.contact.whatsappText))}`, color: '#3ddc84' },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'guilherme-ferreira-valadares', href: profile.linkedin, color: '#8fd0ff' },
    { icon: InstagramIcon, label: 'Instagram', value: profile.instagramHandle, href: profile.instagram, color: '#ff3d7f' },
    { icon: GithubIcon, label: 'GitHub', value: profile.githubHandle, href: profile.github, color: '#e8f2f4' },
    { icon: GlobeIcon, label: 'Aurea', value: 'auereastack.com.br', href: profile.aurea, color: '#ffc94d' },
  ]

  const onSubmit = async (data: ContactForm) => {
    setStatus('sending')
    try {
      const result = await sendMessage(data)
      const r = button.current?.getBoundingClientRect()
      if (r) setSignal({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
      journey.pulse = 1
      setStatus(result)
      reset()
    } catch {
      setStatus('failed')
    }
  }

  const narrow = typeof window !== 'undefined' && window.innerWidth < 900

  return (
    <section id="contato" data-stop={STOPS.contact} className="relative flex min-h-svh flex-col px-4 pt-24 sm:px-8" aria-labelledby="contato-h">
      <div className="mx-auto flex w-full max-w-[1320px] flex-1 items-end pb-10 md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
          className="glass w-full max-w-[640px] rounded-3xl p-6 ring-1 ring-white/10 sm:p-9"
        >
          <h2 id="contato-h" className="wide text-[clamp(30px,3.4vw,46px)] font-extrabold leading-none tracking-[-0.03em]">
            {t(copy.contact.title)}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink/80 sm:text-[17px]">{t(copy.contact.intro)}</p>

          <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={`${c.label}: ${c.value}`}
                  className="group flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 px-2 py-3 ring-1 ring-white/8 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full transition-transform group-hover:scale-110" style={{ color: c.color, background: `${c.color}1f` }}>
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="text-[12px] font-medium text-ink/85">{c.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <AnimatePresence mode="wait">
            {status === 'sent' || status === 'mailto' ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-7 rounded-2xl bg-aurea/10 p-5 ring-1 ring-aurea/40">
                <p className="text-[17px] font-semibold text-aurea">{t(status === 'sent' ? copy.contact.sent : copy.contact.mailto)}</p>
                <button type="button" onClick={() => setStatus('idle')} className="mt-3 text-[14px] font-medium text-ink/80 underline underline-offset-4 hover:text-ink">
                  {t(copy.contact.another)}
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }} className="mt-7 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t(copy.contact.name)} error={errors.name?.message}>
                    <input
                      className={input}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      {...register('name', {
                        required: t(copy.contact.nameRequired),
                        minLength: { value: 2, message: t(copy.contact.nameShort) },
                      })}
                    />
                  </Field>
                  <Field label={t(copy.contact.email)} error={errors.email?.message}>
                    <input
                      type="email"
                      className={input}
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      {...register('email', {
                        required: t(copy.contact.emailRequired),
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: t(copy.contact.emailInvalid) },
                      })}
                    />
                  </Field>
                </div>
                <Field label={t(copy.contact.message)} error={errors.message?.message}>
                  <textarea
                    rows={4}
                    className={cn(input, 'resize-none')}
                    aria-invalid={!!errors.message}
                    {...register('message', {
                      required: t(copy.contact.messageRequired),
                      minLength: { value: 10, message: t(copy.contact.messageShort) },
                      maxLength: { value: 2000, message: t(copy.contact.messageLong) },
                    })}
                  />
                </Field>
                {status === 'failed' && (
                  <p className="text-[14px] text-[#ff8a8a]" role="alert">
                    {t(copy.contact.failed)}
                  </p>
                )}
                <button
                  ref={button}
                  type="submit"
                  disabled={status === 'sending'}
                  className="justify-self-start rounded-full bg-aurea px-7 py-3.5 text-[16px] font-semibold text-aurea-ink transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-6px_rgba(54,226,180,0.7)] disabled:opacity-60"
                >
                  {t(status === 'sending' ? copy.contact.sending : copy.contact.send)}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <footer className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-[13px] text-dim">
        <p className="flex items-center gap-2">
          <AureaMark className="w-4 text-aurea" />
          {t(copy.footer.made)}
        </p>
        <div className="flex items-center gap-4">
          <span>© 2026</span>
          <button type="button" onClick={() => goToStop(STOPS.hero)} className="font-medium text-ink/80 hover:text-ink">
            {t(copy.footer.top)} ↑
          </button>
        </div>
      </footer>

      <AnimatePresence>
        {signal && (
          <motion.span
            key="signal"
            className="pointer-events-none fixed z-50 h-4 w-4 rounded-full bg-aurea shadow-[0_0_24px_8px_rgba(54,226,180,0.8)]"
            initial={{ left: signal.x, top: signal.y, scale: 1, opacity: 1 }}
            animate={{
              left: narrow ? window.innerWidth / 2 : window.innerWidth * 0.72,
              top: narrow ? window.innerHeight * 0.22 : window.innerHeight * 0.45,
              scale: [1, 1.6, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 1.2, ease: [0.5, 0, 0.8, 0.4] }}
            onAnimationComplete={() => setSignal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
