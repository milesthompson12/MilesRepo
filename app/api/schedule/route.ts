import { NextResponse } from 'next/server';

// Proxy ESPN schedule server-side (avoids CORS + build-time static freezing).
export const dynamic = 'force-dynamic';
export const revalidate = 600;

export async function GET() {
  try {
    const res = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/schedule',
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CUBuffsHub/1.0)' },
        next: { revalidate: 600 },
      }
    );
    if (!res.ok) {
      return NextResponse.json({ events: [] }, { status: 200 });
    }
    const data = await res.json();
    return NextResponse.json({ events: data.events ?? [] }, { status: 200 });
  } catch {
    return NextResponse.json({ events: [] }, { status: 200 });
  }
}
