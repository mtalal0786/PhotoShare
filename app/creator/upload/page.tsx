import { PhotoUploadForm } from '@/components/photo-upload-form'

export default function UploadPage() {
  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Upload Photo</h1>
        <PhotoUploadForm />
      </div>
    </div>
  )
}
