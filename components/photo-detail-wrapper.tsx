"use client";

import dynamic from "next/dynamic";

// Dynamically import the real component and get its default export
const PhotoDetailView = dynamic(
  () => import("./photo-detail-view").then((m) => m.default),
  { ssr: false }
);

export default function PhotoDetailWrapper({ photoId }: { photoId: string }) {
  return <PhotoDetailView photoId={photoId} />;
}
