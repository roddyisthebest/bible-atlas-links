"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation, Language } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import { useRouter } from "next/navigation";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);
  const router = useRouter();

  const handleLanguageChange = (newLang: "ko" | "en") => {
    setLanguage(newLang);
    router.push(`/?lang=${newLang}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Language Toggle */}
      <div className="container mx-auto px-4 pt-8 flex justify-end">
        <LanguageToggle
          currentLang={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-8">
          <Image
            src="/icon.png"
            alt={t("appTitle")}
            width={80}
            height={80}
            className="rounded-2xl"
          />
        </div>
        <h1 className="text-7xl font-bold mb-6 text-gray-900 tracking-tight">
          {t("appTitle")}
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          {language === "ko" ? "성경 속 지명과 현재 위치를 연결하는 성경 지도 앱" : "Biblical map app connecting biblical places with current locations"}
        </p>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <a
            href="https://apps.apple.com/kr/app/%EB%B0%94%EC%9D%B4%EB%B8%94-%EC%95%84%ED%8B%80%EB%9D%BC%EC%8A%A4/id6755648201"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-full px-8 py-3 bg-black hover:bg-gray-800 text-white font-medium">
              {language === "ko" ? "App Store에서 다운로드" : "Download on App Store"}
            </Button>
          </a>
          <a
            href={`https://bible-atlas-cs.vercel.app?lang=${language}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="rounded-full px-8 py-3 border-gray-300 hover:bg-gray-50 font-medium"
            >
              {language === "ko" ? "자세한 정보" : "Learn More"}
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
