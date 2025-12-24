"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation, Language } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Language Toggle */}
      <div className="container mx-auto px-4 pt-8 flex justify-end">
        <LanguageToggle currentLang={language} onLanguageChange={setLanguage} />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-12">
          <Image
            src="/icon.png"
            alt={t("appTitle")}
            width={120}
            height={120}
            className="rounded-xl"
          />
        </div>
        <h1 className="text-6xl font-light mb-6 text-gray-900">
          {t("appTitle")}
        </h1>
        <p className="text-lg text-gray-500 mb-16 max-w-xl mx-auto leading-relaxed">
          {t("appDescription")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          <Button
            disabled
            className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-gray-400 cursor-not-allowed"
          >
            {t("downloadAppComingSoon")}
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6 text-gray-900">
            {t("learnMore")}
          </h2>
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            {t("learnMoreDesc")}
          </p>
          <a 
            href="https://bible-atlas-cs.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <Button className="px-8 py-3 text-base font-medium bg-gray-900 hover:bg-gray-800">
              bible-atlas-cs.vercel.app
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}