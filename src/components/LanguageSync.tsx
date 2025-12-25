"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LanguageSync() {
  const { setLanguage } = useLanguage();
  const searchParams = useSearchParams();

  useEffect(() => {
    const lang = searchParams.get('lang');
    if (lang === 'ko' || lang === 'en') {
      setLanguage(lang);
    }
  }, [searchParams, setLanguage]);

  return null;
}