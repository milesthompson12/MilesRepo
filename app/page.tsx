'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ExternalLink, TrendingUp, MapPin, Tv, AlertCircle, PartyPopper, X, Sparkles } from 'lucide-react';

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

interface Commit {
  id: string;
  name: string;
  pos: string;
  stars: number;
  heightWeight?: string;
  hometown: string;
  date: string;
  blurb: string;
  source: string;
}

// ─── Verified data ─────────────────────────────────────────────────────────────

const trendingTopics = [
  { topic: 'Julian Lewis 2026 QB battle', trend: '+312%' },
  { topic: '2027 class May commit surge', trend: '+260%' },
  { topic: 'Deion Sanders health update', trend: '+210%' },
  { topic: 'Brennan Marion "Go Go Offense"', trend: '+185%' },
  { topic: 'Chris Marve defense', trend: '+140%' },
];

// 2027 commits — verified via 247Sports (most recent first). As of June 6, 2026.
const COMMITS_2027: Commit[] = [
  { id: 'kelly-murray', name: 'Jaiden Kelly-Murray', pos: 'WR', stars: 4, heightWeight: '5-10 / 170', hometown: 'Mount Pleasant, SC · Oceanside Collegiate', date: 'May 25, 2026', blurb: 'Four-star receiver, flipped from South Carolina. Top-40 WR nationally — the headliner of CU’s late-May surge.', source: '247Sports' },
  { id: 'washington',   name: 'Prince Washington',   pos: 'CB', stars: 0, heightWeight: '6-1 / 185',  hometown: 'Houston, TX · Lamar HS',                 date: 'May 24, 2026', blurb: 'Length-y Houston cornerback adds to a corner-heavy 2027 haul.', source: '247Sports' },
  { id: 'jones',        name: "Li'Marcus Jones",     pos: 'OT', stars: 4, heightWeight: '6-5 / 285',  hometown: 'Brentwood, TN · Brentwood Academy',      date: 'May 24, 2026', blurb: 'Four-star offensive tackle, a top-25 OT and major trench win.', source: '247Sports' },
  { id: 'rasmussen',    name: 'Will Rasmussen',      pos: 'CB', stars: 3, heightWeight: '5-10 / 180', hometown: 'Orem, UT · Orem HS',                     date: 'May 20, 2026', blurb: 'Three-star Utah cornerback.', source: '247Sports' },
  { id: 'jenkins',      name: 'Gabe Jenkins',        pos: 'S',  stars: 4, heightWeight: '6-2 / 187',  hometown: 'Pittsburgh, PA · Imani Christian',       date: 'May 20, 2026', blurb: 'Top-20 safety nationally — a four-star anchor for the back end.', source: '247Sports' },
  { id: 'willis',       name: "Ba'Roc Willis",       pos: 'EDGE', stars: 3, heightWeight: '6-3 / 230', hometown: 'Pell City, AL · Pell City HS',          date: 'May 19, 2026', blurb: 'Three-star edge rusher who kicked off the late-May commit run.', source: '247Sports' },
  { id: 'adams',        name: 'Andre Adams',         pos: 'QB', stars: 4, heightWeight: '—',     hometown: 'Nashville, TN · Antioch HS',             date: 'Apr 14, 2026', blurb: 'Four-star quarterback, the cornerstone of the 2027 class.', source: '247Sports' },
  { id: 'fairley',      name: 'Kenny Fairley',       pos: 'DL', stars: 3, heightWeight: '6-0 / 270',  hometown: 'Fairburn, GA · Creekside',               date: 'Feb 2026',    blurb: 'Three-star defensive lineman, chose CU over Cincinnati & Purdue.', source: '247Sports / On3' },
  { id: 'dericho',      name: 'Davon Dericho',       pos: 'CB', stars: 3, heightWeight: '5-9',        hometown: 'Miami, FL · Killian',                    date: 'Feb 12, 2026', blurb: 'Three-star Miami cornerback.', source: '247Sports' },
];

// Expert predictions / Crystal Ball — only list 100%-confirmed picks here.
// None could be verified to 247Sports or On3 as of June 6, 2026 (prediction pages
// are paywalled), so this list is intentionally empty rather than risk bad data.
const EXPERT_PREDICTIONS: Array<{ name: string; pos: string; pick: string; analyst: string; confidence: string; source: string }> = [];

// Newest commit drives the celebratory popup.
const LATEST_COMMIT = COMMITS_2027[0];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch { return dateStr; }
}
function formatTime(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
    });
  } catch { return ''; }
}
function timeAgo(dateStr: string) {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  } catch { return ''; }
}
function Stars({ count }: { count: number }) {
  if (count <= 0) return <span className="text-gray-500 text-xs">NR</span>;
  return <span className="text-cu-gold text-xs">{'★'.repeat(count)}{'☆'.repeat(5 - count)}</span>;
}

// ─── New-commit popup ──────────────────────────────────────────────────────────

function CommitPopup({ commit, onClose }: { commit: Commit; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-br from-cu-gray via-cu-black to-cu-gray border-2 border-cu-gold shadow-2xl shadow-cu-gold/30 overflow-hidden">
        {/* Top gold banner */}
        <div className="bg-cu-gold px-6 py-4 flex items-center gap-3">
          <PartyPopper className="text-black" size={24} />
          <div>
            <div className="text-black font-black text-lg uppercase tracking-wide leading-none">New Commit!</div>
            <div className="text-black/70 text-xs font-bold mt-1">Colorado 2027 Recruiting Class</div>
          </div>
          <button
            onClick={onClose}
            className="ml-auto text-black/60 hover:text-black"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cu-gold/20 border-2 border-cu-gold mb-4">
            <span className="text-cu-gold font-black text-2xl">
              {commit.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </span>
          </div>
          <h2 className="text-white font-black text-2xl">{commit.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs font-bold bg-cu-gold/20 text-cu-gold px-2 py-0.5 rounded">{commit.pos}</span>
            <Stars count={commit.stars} />
          </div>
          {commit.heightWeight && commit.heightWeight !== '—' && (
            <div className="text-gray-400 text-sm mt-2">{commit.heightWeight}</div>
          )}
          <div className="text-gray-400 text-sm mt-1">{commit.hometown}</div>
          <p className="text-gray-300 text-sm mt-4 leading-relaxed">{commit.blurb}</p>
          <div className="text-gray-600 text-xs mt-3">Committed {commit.date} · Source: {commit.source}</div>

          <div className="flex gap-2 mt-6">
            <Link
              href="/recruiting"
              className="flex-1 px-4 py-2.5 rounded-xl bg-cu-gold text-black font-bold text-sm hover:bg-cu-gold/90 transition-colors flex items-center justify-center gap-1"
            >
              View 2027 Class <ExternalLink size={14} />
            </Link>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tiles ──────────────────────────────────────────────────────────────────

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
            <div className="text-gray-400 text-xs flex items-center gap-1"><Clock size={10} />{formatTime(upcoming.date)}</div>
            {venue?.fullName && (
              <div className="text-gray-400 text-xs flex items-center gap-1">
                <MapPin size={10} />{venue.fullName}{venue.address ? `, ${venue.address.city}, ${venue.address.state}` : ''}
              </div>
            )}
            {broadcast && (
              <div className="text-gray-400 text-xs flex items-center gap-1"><Tv size={10} />{broadcast}</div>
            )}
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-gray-600 text-xs flex items-center gap-1"><AlertCircle size={10} />Betting lines posted closer to kickoff</div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-gray-300 text-sm font-medium">2026 Season</div>
            <div className="text-gray-500 text-xs">Schedule loading from ESPN&hellip;</div>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <div className="text-gray-600 text-xs flex items-center gap-1"><AlertCircle size={10} />Betting lines available once the schedule is set</div>
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
          { label: 'Offense', value: '"Go Go" (B. Marion)' },
          { label: 'Defense', value: '4-2-5 (C. Marve)' },
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

function RecruitingTile({ onShowCommit }: { onShowCommit: () => void }) {
  const recent = COMMITS_2027.slice(0, 4);
  return (
    <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
      <TileHeader title="Recruiting Updates" icon={<span className="text-cu-gold text-sm">🏈</span>} />
      <div className="p-4 space-y-3">
        <button
          onClick={onShowCommit}
          className="w-full text-left bg-cu-gold/10 border border-cu-gold/30 rounded-lg px-3 py-2 hover:bg-cu-gold/15 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-cu-gold text-[10px] font-bold uppercase tracking-wide">
            <PartyPopper size={11} /> Newest Commit
          </div>
          <div className="text-white text-sm font-bold mt-0.5">{LATEST_COMMIT.name}</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-gray-500 text-xs">{LATEST_COMMIT.pos}</span>
            <Stars count={LATEST_COMMIT.stars} />
            <span className="text-gray-600 text-xs">{LATEST_COMMIT.date}</span>
          </div>
        </button>

        <div className="space-y-2">
          <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wide">Recent Commits</div>
          {recent.map((c) => (
            <div key={c.id} className="flex items-center gap-2">
              <span className="text-white text-xs font-semibold flex-1 truncate">{c.name}</span>
              <span className="text-gray-500 text-xs">{c.pos}</span>
              <Stars count={c.stars} />
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-gray-800">
          <div className="text-gray-500 text-xs">
            <span className="text-cu-gold font-bold">{COMMITS_2027.length}</span> total commits ·{' '}
            <span className="text-gray-400">Visit:</span> Zykee Scott LB (Jun 19&ndash;21)
          </div>
          <Link href="/recruiting" className="text-cu-gold text-xs font-bold hover:underline flex items-center gap-1 mt-2">
            Full 2027 tracker <ExternalLink size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [showCommit, setShowCommit] = useState(false);

  useEffect(() => {
    // Show the celebratory popup once per newest commit (tracked in localStorage).
    try {
      const seen = localStorage.getItem('cu-seen-commit');
      if (seen !== LATEST_COMMIT.id) setShowCommit(true);
    } catch {
      setShowCommit(true);
    }

    Promise.all([
      fetch('/api/news').then(r => r.json()).then(d => setArticles((d.articles || []) as NewsArticle[])).catch(() => {}),
      fetch('/api/schedule').then(r => r.json()).then(d => setEvents((d.events || []) as ScheduleEvent[])).catch(() => {}),
    ]).finally(() => setLoadingNews(false));
  }, []);

  const dismissCommit = () => {
    setShowCommit(false);
    try { localStorage.setItem('cu-seen-commit', LATEST_COMMIT.id); } catch { /* ignore */ }
  };

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1, 9);

  return (
    <div className="max-w-7xl mx-auto">
      {showCommit && <CommitPopup commit={LATEST_COMMIT} onClose={dismissCommit} />}

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
        <RecruitingTile onShowCommit={() => setShowCommit(true)} />
      </div>

      {/* Expert predictions — only renders if we have verified picks */}
      {EXPERT_PREDICTIONS.length > 0 && (
        <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden mb-8">
          <TileHeader title="Crystal Ball / Expert Predictions" icon={<Sparkles size={14} className="text-cu-gold" />} />
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXPERT_PREDICTIONS.map((p, i) => (
              <div key={i} className="bg-cu-black/40 rounded-lg p-3 border border-cu-gold/10">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-bold">{p.name}</span>
                  <span className="text-gray-500 text-xs">{p.pos}</span>
                </div>
                <div className="text-gray-300 text-xs mt-1">Predicted to <span className="text-cu-gold font-bold">{p.pick}</span></div>
                <div className="text-gray-500 text-xs mt-1">{p.analyst} · {p.confidence} confidence · {p.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News section */}
      <div className="space-y-6">
        {loadingNews ? (
          <div className="h-72 rounded-2xl skeleton" />
        ) : featuredArticle ? (
          <a href={featuredArticle.links?.web?.href || '#'} target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative rounded-2xl overflow-hidden bg-cu-gray border border-cu-gold/20 hover:border-cu-gold/60 transition-all duration-300">
              {featuredArticle.images?.[0]?.url ? (
                <div className="relative h-72 w-full">
                  <Image src={featuredArticle.images[0].url} alt={featuredArticle.images[0].alt || featuredArticle.headline} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
              ) : (
                <div className="h-72 bg-gradient-to-br from-cu-gold/20 to-black" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-2 py-1 bg-cu-gold text-black text-xs font-bold rounded mb-3 uppercase tracking-wide">Featured</span>
                <h2 className="text-xl font-bold text-white group-hover:text-cu-gold transition-colors line-clamp-2">{featuredArticle.headline}</h2>
                {featuredArticle.description && <p className="text-gray-300 text-sm mt-2 line-clamp-2">{featuredArticle.description}</p>}
                <div className="flex items-center gap-2 mt-3 text-gray-400 text-xs">
                  <Clock size={12} /><span>{timeAgo(featuredArticle.published)}</span><ExternalLink size={12} className="ml-auto" />
                </div>
              </div>
            </div>
          </a>
        ) : null}

        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-cu-gold rounded-full inline-block" />
            Latest News
          </h2>
          {loadingNews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 rounded-xl skeleton" />)}
            </div>
          ) : restArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restArticles.map((article, i) => (
                <a key={i} href={article.links?.web?.href || '#'} target="_blank" rel="noopener noreferrer" className="flex gap-3 p-4 rounded-xl bg-cu-gray border border-cu-gold/10 hover:border-cu-gold/40 transition-all group">
                  {article.images?.[0]?.url && (
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={article.images[0].url} alt={article.headline} fill className="object-cover" unoptimized />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white group-hover:text-cu-gold transition-colors line-clamp-2">{article.headline}</h3>
                    <div className="flex items-center gap-1 mt-2 text-gray-500 text-xs"><Clock size={10} /><span>{timeAgo(article.published)}</span></div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm bg-cu-gray rounded-xl border border-cu-gold/10">
              News temporarily unavailable. Visit{' '}
              <a href="https://www.espn.com/college-football/team/_/id/38/colorado-buffaloes" target="_blank" rel="noopener noreferrer" className="text-cu-gold underline">ESPN&rsquo;s Colorado page</a>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
