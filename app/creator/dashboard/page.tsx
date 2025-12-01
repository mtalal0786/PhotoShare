import Link from 'next/link'
import { CreatorPhotoList } from '@/components/creator-photo-list'

export default function CreatorDashboard() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Photos</h1>
          <Link
            href="/creator/upload"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Upload Photo
          </Link>
        </div>
        <CreatorPhotoList />
      </div>
    </div>
  )
}
