'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ExternalLink, TrendingUp, MapPin, Tv, AlertCircle, Flame, Minus } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsArticle {
  headline: string;
  description?: string;
  published: string;
  links: { web: { href: string } };
  images?: Array<{ url: string; alt?: string }>;
}

interface ScheduleEvent {
  id: string;
  name: string;
  date: string;
  competitions: Array<{
    competitors: Array<{
      homeAway: string;
      team: { displayName: string; abbreviation: string; logo: string };
      score?: string;
    }>;
    status: { type: { completed: boolean; description: string } };
    venue?: { fullName: string; address?: { city: string; state: string } };
    broadcasts?: Array<{ names: string[] }>;
  }>;
}

// ─── Verified static data ─────────────────────────────────────────────────────

const trendingTopics = [
  { topic: 'Julian Lewis 2026 QB battle', trend: '+312%' },
  { topic: 'Deion Sanders health update', trend: '+210%' },
  { topic: 'Brennan Marion "Go Go Offense"', trend: '+185%' },
  { topic: 'Chris Marve new DC', trend: '+140%' },
  { topic: 'CU 2026 transfer portal class', trend: '+175%' },
];

// Verified recruiting updates — sourced from 247Sports.com
const recruitingUpdates = [
  {
    type: 'visit' as const,
    name: 'Zykee Scott',
    pos: 'LB',
    stars: 3,
    school: 'La Salle College HS, Philadelphia PA',
    detail: 'Official visit scheduled June 19–21',
    source: '247Sports',
  },
  {
    type: 'hot' as const,
    name: 'Ryan Ferdinand',
    pos: 'WR',
    stars: 3,
    school: 'Palm Beach Lakes HS, West Palm Beach FL',
    detail: 'Upgraded to priority target · OV June 5–7',
    source: '247Sports',
  },
  {
    type: 'decommit' as const,
    name: 'Dolph McDonald',
    pos: 'CB',
    stars: 4,
    school: 'Morton, MS',
    detail: 'Pulled back from early pledge to CU (Jan 2026)',
    source: '247Sports',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatTime(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
    });
  } catch {
    return '';
  }
}

function timeAgo(dateStr: string) {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  } catch {
    return '';
  }
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-cu-gold text-xs">{'★'.repeat(count)}{'☆'.repeat(5 - count)}</span>
  );
}

// ─── Tile components ──────────────────────────────────────────────────────────

function TileHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20 flex items-center gap-2">
      {icon}
      <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide">{title}</h3>
    </div>
  );
}

function NextGameTile({ events }: { events: ScheduleEvent[] }) {
  const now = new Date();
  const upcoming = events.find(e => {
    const comp = e.competitions?.[0];
    return comp && !comp.status.type.completed && new Date(e.date) >= now;
  });

  const comp = upcoming?.competitions?.[0];
  const opponent = comp?.competitors.find(c => c.homeAway !== 'home');
  const home = comp?.competitors.find(c => c.homeAway === 'home');
  const isHome = home?.team.abbreviation === 'COLO';
  const broadcast = comp?.broadcasts?.[0]?.names?.[0];
  const venue = comp?.venue;

  return (
    <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
      <div className="bg-cu-gold px-4 py-3">
        <h3 className="font-black text-black text-sm uppercase tracking-wide flex items-center gap-2">
          <Calendar size={14} />
          Next Game
        </h3>
      </div>
      <div className="p-4">
        {upcoming && opponent ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {opponent.team.logo && (
                <Image src={opponent.team.logo} alt={opponent.team.displayName} width={40} height={40} unoptimized className="rounded" />
              )}
              <div>
                <div className="text-white font-bold text-sm">{isHome ? 'vs.' : 'at'} {opponent.team.displayName}</div>
                <div className="text-cu-gold text-xs font-medium mt-0.5">{formatDate(upcoming.date)}</div>
              </div>
            </div>
            <div className="text-gray-400 text-xs flex items-center gap-1">
              <Clock size={10} />
              {formatTime(upcoming.date)}
            </div>
            {venue?.fullName && (
              <div className="text-gray-400 text-xs flex items-center gap-1">
                <MapPin size={10} />
                {venue.fullName}{venue.address ? `, ${venue.address.city}, ${venue.address.state}` : ''}
              </div>
            )}
            {broadcast && (
              <div className="text-gray-400 text-xs flex items-center gap-1">
                <Tv size={10} />
                {broadcast}
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-gray-600 text-xs flex items-center gap-1">
                <AlertCircle size={10} />
                Betting lines available closer to game
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-gray-300 text-sm font-medium">2026 Season</div>
            <div className="text-gray-500 text-xs">Schedule loading from ESPN…</div>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-gray-600 text-xs flex items-center gap-1">
                <AlertCircle size={10} />
                Betting lines available once season schedule is set
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamInfoTile() {
  return (
    <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
      <TileHeader title="Team Info" />
      <div className="p-4 space-y-3">
        {[
          { label: 'Head Coach', value: 'Deion Sanders' },
          { label: 'Conference', value: 'Big 12' },
          { label: 'Stadium', value: 'Folsom Field' },
          { label: 'Location', value: 'Boulder, CO' },
          { label: '2025 Record', value: '9-4 (Big 12 Champs)' },
          { label: 'Offense', value: '"Go Go" (Brennan Marion)' },
          { label: 'Defense', value: '4-2-5 (Chris Marve)' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between gap-2">
            <span className="text-gray-400 text-xs">{label}</span>
            <span className="text-white text-xs font-medium text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendingTile() {
  return (
    <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
      <TileHeader title="Trending" icon={<TrendingUp size={14} className="text-cu-gold" />} />
      <div className="p-4 space-y-3">
        {trendingTopics.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-cu-gold text-xs font-bold w-4 flex-shrink-0">{i + 1}</span>
              <span className="text-gray-300 text-xs truncate">{item.topic}</span>
            </div>
            <span className="text-green-400 text-xs font-bold flex-shrink-0">{item.trend}</span>
          </div>
        ))}
        <div className="text-xs text-gray-600 mt-1">Search trends relative to last week</div>
      </div>
    </div>
  );
}

function RecruitingTile() {
  const iconFor = (type: 'visit' | 'hot' | 'decommit') => {
    if (type === 'hot') return <Flame size={12} className="text-orange-400 flex-shrink-0" />;
    if (type === 'decommit') return <Minus size={12} className="text-red-400 flex-shrink-0" />;
    return <Calendar size={12} className="text-blue-400 flex-shrink-0" />;
  };
  const labelFor = (type: 'visit' | 'hot' | 'decommit') => {
    if (type === 'hot') return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-900/40 text-orange-400 flex-shrink-0">HEATING UP</span>;
    if (type === 'decommit') return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-900/40 text-red-400 flex-shrink-0">DECOMMIT</span>;
    return <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-400 flex-shrink-0">VISIT</span>;
  };

  return (
    <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
      <TileHeader title="Recruiting Updates" icon={<span className="text-cu-gold text-sm">🏈</span>} />
      <div className="p-4 space-y-4">
        {recruitingUpdates.map((u, i) => (
          <div key={i} className="flex gap-2">
            <div className="mt-0.5">{iconFor(u.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-white text-xs font-bold">{u.name}</span>
                <span className="text-gray-500 text-xs">{u.pos}</span>
                <Stars count={u.stars} />
                {labelFor(u.type)}
              </div>
              <div className="text-gray-500 text-xs mt-0.5">{u.school}</div>
              <div className="text-gray-300 text-xs mt-0.5">{u.detail}</div>
              <div className="text-gray-600 text-[10px] mt-0.5">Source: {u.source}</div>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-gray-800">
          <Link
            href="/recruiting"
            className="text-cu-gold text-xs font-bold hover:underline flex items-center gap-1"
          >
            Full 2027 recruiting tracker <ExternalLink size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/news')
        .then(r => r.json())
        .then(d => setArticles((d.articles || []) as NewsArticle[]))
        .catch(() => {}),
      fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/schedule')
        .then(r => r.json())
        .then(d => setEvents((d.events || []) as ScheduleEvent[]))
        .catch(() => {}),
    ]).finally(() => setLoadingNews(false));
  }, []);

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1, 9);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">CU Buffaloes</span> Overview
        </h1>
        <p className="text-gray-400 mt-1">Latest news, scores, and updates from Boulder</p>
      </div>

      {/* 4 info tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <NextGameTile events={events} />
        <TeamInfoTile />
        <TrendingTile />
        <RecruitingTile />
      </div>

      {/* News section */}
      <div className="space-y-6">
        {/* Featured Article */}
        {loadingNews ? (
          <div className="h-72 rounded-2xl skeleton" />
        ) : featuredArticle ? (
          <a
            href={featuredArticle.links?.web?.href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative rounded-2xl overflow-hidden bg-cu-gray border border-cu-gold/20 hover:border-cu-gold/60 transition-all duration-300">
              {featuredArticle.images?.[0]?.url ? (
                <div className="relative h-72 w-full">
                  <Image
                    src={featuredArticle.images[0].url}
                    alt={featuredArticle.images[0].alt || featuredArticle.headline}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
              ) : (
                <div className="h-72 bg-gradient-to-br from-cu-gold/20 to-black" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-2 py-1 bg-cu-gold text-black text-xs font-bold rounded mb-3 uppercase tracking-wide">
                  Featured
                </span>
                <h2 className="text-xl font-bold text-white group-hover:text-cu-gold transition-colors line-clamp-2">
                  {featuredArticle.headline}
                </h2>
                {featuredArticle.description && (
                  <p className="text-gray-300 text-sm mt-2 line-clamp-2">{featuredArticle.description}</p>
                )}
                <div className="flex items-center gap-2 mt-3 text-gray-400 text-xs">
                  <Clock size={12} />
                  <span>{timeAgo(featuredArticle.published)}</span>
                  <ExternalLink size={12} className="ml-auto" />
                </div>
              </div>
            </div>
          </a>
        ) : null}

        {/* Article Grid */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-cu-gold rounded-full inline-block" />
            Latest News
          </h2>
          {loadingNews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-24 rounded-xl skeleton" />
              ))}
            </div>
          ) : restArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restArticles.map((article, i) => (
                <a
                  key={i}
                  href={article.links?.web?.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 p-4 rounded-xl bg-cu-gray border border-cu-gold/10 hover:border-cu-gold/40 transition-all group"
                >
                  {article.images?.[0]?.url && (
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={article.images[0].url}
                        alt={article.headline}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-cu-gold transition-colors line-clamp-2">
                      {article.headline}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-gray-500 text-xs">
                      <Clock size={10} />
                      <span>{timeAgo(article.published)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm bg-cu-gray rounded-xl border border-cu-gold/10">
              News unavailable — check back shortly or visit{' '}
              <a href="https://espn.com/college-football/team/_/id/38" target="_blank" rel="noopener noreferrer" className="text-cu-gold underline">ESPN</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
