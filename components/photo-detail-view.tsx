'use client'

import { sanitizeImage } from '@/utils/sanitize-image'
import { useEffect, useState } from 'react'

interface PhotoDetailViewProps {
  photoId: string
}

export default function PhotoDetailView({
  photoId,
  isCreator = false,
}: {
  photoId: string;
  isCreator?: boolean;
}) {
  const [photo, setPhoto] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')
  const [ratingValue, setRatingValue] = useState(0)
  const [user, setUser] = useState<any>(null)

  // Get logged-in user info
  async function fetchUser() {
    const res = await fetch('/api/auth/me')
    if (res.ok) {
      const data = await res.json()
      setUser(data.user)
    }
  }

  async function fetchPhoto() {
    setLoading(true)
    const res = await fetch(`/api/photos/${photoId}`)
    if (!res.ok) {
      setLoading(false)
      return
    }

    const data = await res.json()
    setPhoto(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
    fetchPhoto()
  }, [photoId])

  // Add comment
  async function submitComment() {
    if (!commentText.trim()) return alert('Comment cannot be empty')

    const res = await fetch(`/api/photos/${photoId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentText }),
    })

    if (res.ok) {
      setCommentText('')
      fetchPhoto()
    } else {
      alert('Failed to add comment')
    }
  }

  // Add rating
  async function submitRating(value: number) {
    const res = await fetch(`/api/photos/${photoId}/ratings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    })

    if (res.ok) {
      setRatingValue(value)
      fetchPhoto()
    } else {
      alert('Failed to rate photo')
    }
  }

  if (loading) return <p>Loading...</p>
  if (!photo) return <p>Photo not found</p>

  return (
    <div className="space-y-10">
      {/* Image */}
      <img
        src={sanitizeImage(photo.imageUrl)}
        className="w-full max-h-[550px] object-cover rounded-xl shadow"
      />

      {/* Details */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">{photo.title}</h1>
        <p className="text-gray-700">{photo.caption}</p>
        <p className="text-gray-500 text-sm">
          Location: {photo.location || 'N/A'}
        </p>

        <div className="text-sm text-gray-600">
          <strong>People:</strong>{' '}
          {photo.people.length > 0
            ? photo.people.join(', ')
            : 'No people tagged'}
        </div>

        <div className="text-sm text-gray-600">
          <strong>Uploaded by:</strong> {photo.creator?.email}
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Rating</h2>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => submitRating(value)}
              className={`px-3 py-2 rounded ${ratingValue === value ? 'bg-yellow-500 text-white' : 'bg-gray-200'
                }`}
            >
              {value} ★
            </button>
          ))}
        </div>

        <p className="text-gray-700">
          Average Rating: {photo.avgRating?.toFixed(1) || 'N/A'} ★
        </p>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Comments</h2>

        {/* Add comment */}
        {user ? (
          <div className="space-y-2">
            <textarea
              className="w-full border px-4 py-2 rounded"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
              onClick={submitComment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Post Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Login to add a comment.</p>
        )}

        {/* List comments */}
        <div className="space-y-3">
          {photo.comments.length === 0 && (
            <p className="text-gray-500">No comments yet.</p>
          )}

          {photo.comments.map((c: any) => (
            <div key={c.id} className="p-4 border rounded-lg bg-gray-50">
              <p className="font-medium">{c.user.email}</p>
              <p>{c.text}</p>

              <p className="text-sm mt-1">
                {c.rating ? `⭐ ${c.rating}` : "No Rating"}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
