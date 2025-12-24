export type Language = 'ko' | 'en';

const translations = {
  ko: {
    appTitle: "BibleAtlas",
    appDescription: "성경 속 지명과 현재 위치를 연결하는 성경 지도 서비스",
    downloadAppComingSoon: "앱 다운로드 (준비중)",
    support: "지원",
    viewTerms: "약관 보기",
    accurateLocation: "정확한 위치",
    accurateLocationDesc: "성경 속 지명의 정확한 위치를 현대 지도에서 확인하세요",
    bibleVerses: "성경 구절",
    bibleVersesDesc: "각 지명과 관련된 성경 구절을 함께 읽어보세요",
    currentLocation: "현재 위치",
    currentLocationDesc: "현재 위치에서 성경 속 지명까지의 거리를 확인하세요",
    biblicalRegions: "성경 지역",
    relatedVerses: "관련 구절",
    averageAccuracy: "평균 정확도",
    learnMore: "더 알아보기",
    learnMoreDesc: "BibleAtlas에 대해 더 자세히 알고 싶다면 아래 링크를 방문해주세요"
  },
  en: {
    appTitle: "BibleAtlas",
    appDescription: "Biblical map service connecting biblical places with current locations",
    downloadAppComingSoon: "Download App (Coming Soon)",
    support: "Support",
    viewTerms: "View Terms",
    accurateLocation: "Accurate Location",
    accurateLocationDesc: "Find exact locations of biblical places on modern maps",
    bibleVerses: "Bible Verses",
    bibleVersesDesc: "Read related Bible verses for each location",
    currentLocation: "Current Location",
    currentLocationDesc: "Check distance from your location to biblical places",
    biblicalRegions: "Biblical Regions",
    relatedVerses: "Related Verses",
    averageAccuracy: "Average Accuracy",
    learnMore: "Learn More",
    learnMoreDesc: "Visit the link below to learn more about BibleAtlas"
  }
};

export function useTranslation(language: 'ko' | 'en') {
  return {
    t: (key: keyof typeof translations.ko) => translations[language][key]
  };
}