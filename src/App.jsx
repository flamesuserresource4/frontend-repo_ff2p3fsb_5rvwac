import { useState } from 'react'
import LanguageToggle from './components/LanguageToggle'
import DailyDevotional from './components/DailyDevotional'
import StatsAndRewards from './components/StatsAndRewards'
import Marketplace from './components/Marketplace'

function App() {
  const [locale, setLocale] = useState('en')
  const userId = 'demo-user-1'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(147,197,253,0.06),transparent_50%)]"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-10 space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" className="w-10 h-10" alt="logo" />
            <div>
              <h1 className="text-2xl font-bold text-white">Sanctuary Builder</h1>
              <p className="text-blue-200/80 text-sm">{locale === 'en' ? 'Daily devotionals • Gamified rewards • Faith marketplace' : '每日灵修 • 游戏化奖励 • 信仰市集'}</p>
            </div>
          </div>
          <LanguageToggle locale={locale} setLocale={setLocale} />
        </header>

        <main className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DailyDevotional locale={locale} />
            <Marketplace locale={locale} />
          </div>
          <div className="space-y-6">
            <StatsAndRewards userId={userId} locale={locale} />
            <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 text-blue-100">
              <h3 className="text-xl font-semibold text-white mb-2">{locale === 'en' ? 'Admin Panel Preview' : '管理面板预览'}</h3>
              <p className="text-blue-300/80 text-sm">{locale === 'en' ? 'This preview showcases key features. We can expand into a full admin later.' : '此预览展示核心功能。我们可在后续扩展为完整管理后台。'}</p>
            </div>
          </div>
        </main>

        <footer className="text-center text-blue-300/60 text-sm pt-6">
          {locale === 'en' ? 'Bilingual experience enabled (EN/中文)' : '已启用双语体验（EN/中文）'}
        </footer>
      </div>
    </div>
  )
}

export default App
