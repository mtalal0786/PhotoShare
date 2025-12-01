import { PhotoFeed } from '@/components/photo-feed'

export default function Home() {
  return (
    <main className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Photo Feed</h1>
        <p className="text-gray-600 mb-8">Discover amazing photos from creators</p>
        <PhotoFeed />
      </div>
    </main>
  )
}
