import { useEffect } from 'react'

export default function LanguageToggle({ locale, setLocale }) {
  useEffect(() => {
    const stored = localStorage.getItem('sb_locale')
    if (stored) setLocale(stored)
  }, [setLocale])

  const toggle = (lang) => {
    setLocale(lang)
    localStorage.setItem('sb_locale', lang)
  }

  return (
    <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-blue-500/20 rounded-xl p-1">
      <button
        onClick={() => toggle('en')}
        className={`px-3 py-1 rounded-lg text-sm transition ${locale === 'en' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white'}`}
      >EN</button>
      <button
        onClick={() => toggle('zh')}
        className={`px-3 py-1 rounded-lg text-sm transition ${locale === 'zh' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:text-white'}`}
      >中文</button>
    </div>
  )
}
