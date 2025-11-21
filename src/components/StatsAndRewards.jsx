import { useEffect, useState } from 'react'

export default function StatsAndRewards({ userId, locale }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/api/progress/stats?user_id=${userId}`)
      if (!res.ok) throw new Error('Failed to load stats')
      const json = await res.json()
      setStats(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const completeToday = async () => {
    setMessage('')
    try {
      const res = await fetch(`${baseUrl}/api/progress/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      })
      if (!res.ok) throw new Error('Failed to complete')
      const json = await res.json()
      setMessage(locale === 'en' ? `+${json.points_earned} points!` : `获得 ${json.points_earned} 分！`)
      fetchStats()
    } catch (e) {
      setMessage(e.message)
    }
  }

  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 text-blue-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-semibold text-white">{locale === 'en' ? 'Your Progress' : '你的进度'}</h3>
        <button onClick={completeToday} className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
          {locale === 'en' ? 'Complete Today' : '完成今日灵修'}
        </button>
      </div>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : stats ? (
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-slate-900/50">
            <div className="text-2xl font-bold text-white">{stats.days_completed}</div>
            <div className="text-xs text-blue-300/70">{locale === 'en' ? 'Days' : '完成天数'}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50">
            <div className="text-2xl font-bold text-white">{stats.current_streak}</div>
            <div className="text-xs text-blue-300/70">{locale === 'en' ? 'Streak' : '连续天数'}</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50">
            <div className="text-2xl font-bold text-white">{stats.total_points}</div>
            <div className="text-xs text-blue-300/70">{locale === 'en' ? 'Points' : '积分'}</div>
          </div>
        </div>
      ) : (
        <p className="text-blue-200">{locale === 'en' ? 'No stats yet.' : '暂无数据'}</p>
      )}

      {message && <p className="mt-3 text-green-300">{message}</p>}
    </div>
  )
}
