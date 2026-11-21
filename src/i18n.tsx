import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'pt' | 'en'
export type Text = Record<Lang, string>

type LangState = { lang: Lang; setLang: (l: Lang) => void; t: (text: Text) => string }

const LangContext = createContext<LangState | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    return 'pt'
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      return
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: (text) => text[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang precisa do LangProvider')
  return ctx
}
