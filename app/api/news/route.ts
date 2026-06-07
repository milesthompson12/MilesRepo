import { NextResponse } from 'next/server';

// Proxy ESPN news server-side so the browser never has to deal with CORS, and so
// the data is fetched at request time (not frozen at build time).
export const dynamic = 'force-dynamic';
export const revalidate = 300;

export async function GET() {
  try {
    const res = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/news',
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CUBuffsHub/1.0)' },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) {
      return NextResponse.json({ articles: [] }, { status: 200 });
    }
    const data = await res.json();
    return NextResponse.json({ articles: data.articles ?? [] }, { status: 200 });
  } catch {
    return NextResponse.json({ articles: [] }, { status: 200 });
  }
}
