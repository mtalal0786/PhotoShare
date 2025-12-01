import PhotoDetailWrapper from "@/components/photo-detail-wrapper";

export default async function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;   // ⬅ MUST AWAIT — FIXES undefined issue

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <PhotoDetailWrapper photoId={id} />
    </main>
  );
}
