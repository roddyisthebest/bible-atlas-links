// app/place/[id]/page.tsx

import type { Metadata } from "next";

import { fetchPlace } from "./place-api";
import { PlaceDetail } from "./types";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { lang } = await searchParams;
  const place = await fetchPlace(id);

  let title = "BibleAtlas";
  if (place) {
    const placeName = lang === 'ko' ? place.koreanName : place.name;
    title = `${placeName} | BibleAtlas`;
  }
  
  let desc = "Explore biblical places with BibleAtlas.";
  if (place) {
    if (lang === 'en') {
      desc = place.description;
    } else if (lang === 'ko') {
      desc = place.koreanDescription;
    } else {
      desc = place.description;
    }
  }

  // OG 이미지까지 만들면 전환율 더 좋아짐 (아래에서 설명)
  const ogImage = place?.imageTitle
    ? `https://a.openbible.info/geo/images/512/${place.imageTitle}`
    : `https://bible-atlas-links.vercel.app/icon.png`;

  return {
    title,
    description: desc,
    openGraph: {
      title,
      description: desc,
      url: `https://bibleatlas.xyz/place/${id}`,
      siteName: "BibleAtlas",
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function PlacePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { id } = await params;
  const { lang } = await searchParams;
  const place: PlaceDetail | null = await fetchPlace(id);

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Place not found
          </h1>
          <p className="text-gray-600">
            The requested place could not be found.
          </p>
        </div>
      </div>
    );
  }

  const imageUrl = `https://a.openbible.info/geo/images/512/${place.imageTitle}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="relative h-64 w-full bg-gray-200">
          <Image
            src={imageUrl}
            alt={place.name}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {place.name}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{place.koreanName}</p>

          <a
            href={`bibleatlas://place/${place.id}`}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            Open in BibleAtlas App
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
