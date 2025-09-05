import React from 'react'
import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

//Компонент переключателя языка.

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const switchLang = () => {
    const next = lang === 'ru' ? 'en' : 'ru'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }
  React.useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved && saved !== lang) i18n.changeLanguage(saved)
  }, [])
  return (
    <button className="btn h-10 px-3" onClick={switchLang} title="Language">
      <Globe className="h-5 w-5" />
      <span className="ml-2 uppercase">{(lang === 'ru' ? 'RU' : 'EN')}</span>
    </button>
  )
}
