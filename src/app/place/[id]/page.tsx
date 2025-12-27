// app/place/[id]/page.tsx

import type { Metadata } from "next";

import { fetchPlace } from "./place-api";
import { PlaceDetail } from "./types";
import PlacePageClient from "./PlacePageClient";

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
    const placeName = lang === "ko" ? place.koreanName : place.name;
    title = `${placeName} | BibleAtlas`;
  }

  let desc = "Explore biblical places with BibleAtlas.";
  if (place) {
    if (lang === "en") {
      desc = place.description;
    } else if (lang === "ko") {
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
    const notFoundTitle = lang === 'ko' ? '장소를 찾을 수 없습니다' : 'Place not found';
    const notFoundDesc = lang === 'ko' ? '요청하신 장소를 찾을 수 없습니다.' : 'The requested place could not be found.';
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            {notFoundTitle}
          </h1>
          <p className="text-gray-600">
            {notFoundDesc}
          </p>
        </div>
      </div>
    );
  }

  return <PlacePageClient place={place} lang={lang} />;
}
