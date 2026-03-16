import { createContext, useContext, useState, ReactNode } from 'react'
import { Lang, t as translate } from './translations'

type LangContextType = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }
const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  return (
    <LangContext.Provider value={{ lang, setLang, t: (key: string) => translate(lang, key) }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const c = useContext(LangContext)
  if (!c) return { lang: 'en' as Lang, setLang: () => {}, t: (k: string) => k }
  return c
}
