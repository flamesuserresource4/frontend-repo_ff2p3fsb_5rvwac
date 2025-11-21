import { useEffect, useState } from 'react'

export default function DailyDevotional({ locale }) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchToday = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/api/devotionals/today?locale=${locale}`)
      if (!res.ok) throw new Error('Failed to load')
      const json = await res.json()
      setData(json)
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchToday()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  if (loading) return <div className="text-blue-200">Loading...</div>
  if (error) return <div className="text-red-300">{error}</div>
  if (!data) return null

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 text-blue-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold text-white">{data.title}</h2>
        <span className="text-xs text-blue-300/70">{data.date}</span>
      </div>
      {data.passage && (
        <p className="text-blue-300/80 italic mb-4">{data.passage}</p>
      )}
      <p className="leading-relaxed whitespace-pre-wrap">{data.content}</p>
      {data.reflection_prompt && (
        <div className="mt-4 p-3 rounded-lg bg-slate-900/50 text-blue-200">
          <span className="font-medium block mb-1">{locale === 'en' ? 'Reflection' : '灵修反思'}</span>
          <p>{data.reflection_prompt}</p>
        </div>
      )}
    </div>
  )
}
