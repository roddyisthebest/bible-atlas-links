// app/.well-known/apple-app-site-association/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // edge여도 되지만 일단 nodejs로

export async function GET() {
  const body = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "T76LKQ7QGR.com.seongyeon.bibleatlas.release",
          paths: ["/place/*", "/p/*", "/*"],
        },
      ],
    },
  };

  return NextResponse.json(body, {
    headers: {
      "Content-Type": "application/json",
      // 캐시 과하게 잡히면 수정 반영 느려서 일단 짧게
      "Cache-Control": "public, max-age=300",
    },
  });
}
