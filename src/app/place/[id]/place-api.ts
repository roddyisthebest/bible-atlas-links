// app/place/[id]/placeApi.ts
import { PlaceDetail } from "./types";

export async function fetchPlace(id: string): Promise<PlaceDetail | null> {
  const res = await fetch(`${process.env.API_BASE_URL}/place/${id}`, {
    // OG 크롤러가 캐시된 걸 가져가도 되게 적당히 설정
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}
