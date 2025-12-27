"use client";

import { PlaceDetail } from "./types";
import Image from "next/image";
import { useKakaoAppLink } from "@/hooks/useKakaoAppLink";

export default function PlacePageClient({ place, lang }: { place: PlaceDetail; lang?: string }) {
  useKakaoAppLink(place.id);

  const imageUrl = `https://a.openbible.info/geo/images/512/${place.imageTitle}`;
  const comingSoonText = lang === 'ko' ? '준비중' : 'Coming Soon';

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

          <button
            disabled
            className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 cursor-not-allowed"
          >
            {comingSoonText}
          </button>
        </div>
      </div>
    </div>
  );
}