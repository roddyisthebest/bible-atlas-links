"use client";

import { useState, useEffect } from "react";

export function useKakaoAppLink(placeId: string) {
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  });

  useEffect(() => {
    if (!isIOS) return;

    const kakaoLink = `kakao${process.env.NEXT_PUBLIC_KAKAO_NATIVE_KEY}://kakaolink?placeId=${placeId}&src=kakaoshare`;
    
    try {
      // Try to open Kakao app automatically
      window.location.href = kakaoLink;
    } catch (error) {
      console.error("Failed to open Kakao app:", error);
    }
  }, [isIOS, placeId]);

  return { isIOS };
}