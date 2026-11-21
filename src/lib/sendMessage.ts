import emailjs from '@emailjs/browser'
import { profile } from '../data/profile'

export type ContactForm = { name: string; email: string; message: string }

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const emailReady = Boolean(serviceId && templateId && publicKey)

export async function sendMessage(form: ContactForm): Promise<'sent' | 'mailto'> {
  if (serviceId && templateId && publicKey) {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: form.name,
        name: form.name,
        reply_to: form.email,
        email: form.email,
        message: form.message,
        title: 'Portfólio',
      },
      { publicKey },
    )
    return 'sent'
  }

  const subject = encodeURIComponent(`Portfólio: mensagem de ${form.name}`)
  const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  return 'mailto'
}
