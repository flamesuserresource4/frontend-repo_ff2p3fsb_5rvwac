import { useEffect, useState } from 'react'

export default function Marketplace({ locale }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/api/products?locale=${locale}`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      setProducts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 text-blue-100">
      <h3 className="text-xl font-semibold text-white mb-4">{locale === 'en' ? 'Marketplace' : '市集'}</h3>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p.sku} className="p-4 rounded-lg bg-slate-900/40 border border-blue-500/10">
              {p.media_urls?.[0] && (
                <img src={p.media_urls[0]} alt={p.title} className="w-full h-32 object-cover rounded-md mb-3" />
              )}
              <div className="font-semibold text-white">{p.title}</div>
              <div className="text-sm text-blue-300/80 mb-2">{p.description}</div>
              <div className="text-blue-200">{p.currency} {p.price}</div>
              <button className="mt-3 px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                {locale === 'en' ? 'Buy' : '购买'}
              </button>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-blue-200">{locale === 'en' ? 'No products yet.' : '暂无商品。'}</p>
          )}
        </div>
      )}
    </div>
  )
}
