'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sanitizeImage } from '@/utils/sanitize-image'

export function CreatorPhotoList() {
  const [photos, setPhotos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadPhotos() {
    setLoading(true)
    const res = await fetch('/api/creator/photos')
    const data = await res.json()
    setPhotos(data.photos || [])
    setLoading(false)
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {photos.map((p) => (
        <Link key={p.id} href={`/photo/${p.id}`}>
          <div className="border rounded-lg overflow-hidden shadow">
            <img src={sanitizeImage(p.imageUrl)} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-gray-500 text-sm">
                {p._count.comments} comments • {p._count.ratings} ratings
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
