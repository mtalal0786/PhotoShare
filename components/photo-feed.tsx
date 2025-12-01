'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sanitizeImage } from '@/utils/sanitize-image'

export function PhotoFeed() {
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  async function fetchPhotos() {
    setLoading(true)
    const res = await fetch(`/api/photos?search=${search}`)
    const data = await res.json()
    setPhotos(data.photos || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  return (
    <div className="space-y-6">
      <input
        placeholder="Search photos..."
        className="border px-4 py-2 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchPhotos()}
      />

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((p) => (
          <Link key={p.id} href={`/photo/${p.id}`}>
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <img src={sanitizeImage(p.imageUrl)} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-gray-500 text-sm">
                  {p._count.comments} comments • {p._count.ratings} ratings
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
