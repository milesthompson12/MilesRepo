import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ExternalLink, TrendingUp, ChevronRight } from 'lucide-react';

interface NewsArticle {
  headline: string;
  description?: string;
  published: string;
  links: { web: { href: string } };
  images?: Array<{ url: string; alt?: string }>;
  categories?: Array<{ description: string }>;
}

interface ScheduleEvent {
  id: string;
  name: string;
  date: string;
  competitions: Array<{
    competitors: Array<{
      homeAway: string;
      team: { displayName: string; logo: string };
      score?: string;
    }>;
    status: { type: { completed: boolean; description: string } };
    venue?: { fullName: string };
  }>;
}

async function getNews() {
  try {
    const res = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/news',
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.articles || []) as NewsArticle[];
  } catch {
    return [];
  }
}

async function getTeamInfo() {
  try {
    const res = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.team;
  } catch {
    return null;
  }
}

async function getSchedule() {
  try {
    const res = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/schedule',
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.events || []) as ScheduleEvent[];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  } catch {
    return dateStr;
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

const trendingTopics = [
  { topic: 'Deion Sanders coaching staff', trend: '+245%' },
  { topic: 'Travis Hunter 2024 season', trend: '+180%' },
  { topic: 'Colorado Big 12 schedule', trend: '+95%' },
  { topic: 'Shedeur Sanders NFL draft', trend: '+320%' },
  { topic: 'CU recruiting class 2025', trend: '+140%' },
];

export default async function HomePage() {
  const [articles, team, events] = await Promise.all([getNews(), getTeamInfo(), getSchedule()]);

  const now = new Date();
  const upcoming = events.find(e => {
    const comp = e.competitions?.[0];
    if (!comp) return false;
    return !comp.status.type.completed && new Date(e.date) >= now;
  });

  const featuredArticle = articles[0];
  const restArticles = articles.slice(1, 9);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">CU Buffaloes</span> Football Hub
        </h1>
        <p className="text-gray-400 mt-1">Latest news, scores, and updates from Boulder</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="xl:col-span-3 space-y-6">
          {/* Featured Article */}
          {featuredArticle ? (
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
          ) : (
            <div className="h-72 rounded-2xl skeleton" />
          )}

          {/* Article Grid */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cu-gold rounded-full inline-block" />
              Latest News
            </h2>
            {restArticles.length > 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-24 rounded-xl skeleton" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Next Game */}
          <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
            <div className="bg-cu-gold px-4 py-3">
              <h3 className="font-black text-black text-sm uppercase tracking-wide flex items-center gap-2">
                <Calendar size={14} />
                Next Game
              </h3>
            </div>
            <div className="p-4">
              {upcoming ? (
                <div>
                  <div className="text-white font-bold text-sm">{upcoming.name}</div>
                  <div className="text-cu-gold text-xs mt-1 font-medium">
                    {formatDate(upcoming.date)}
                  </div>
                  {upcoming.competitions?.[0]?.venue?.fullName && (
                    <div className="text-gray-400 text-xs mt-1">
                      {upcoming.competitions[0].venue.fullName}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-sm">Season schedule loading...</div>
              )}
            </div>
          </div>

          {/* Team Quick Stats */}
          {team && (
            <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
              <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
                <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide">Team Info</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Location</span>
                  <span className="text-white text-xs font-medium">Boulder, CO</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Conference</span>
                  <span className="text-white text-xs font-medium">Big 12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Stadium</span>
                  <span className="text-white text-xs font-medium">Folsom Field</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Head Coach</span>
                  <span className="text-white text-xs font-medium">Deion Sanders</span>
                </div>
              </div>
            </div>
          )}

          {/* Trending Topics */}
          <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide flex items-center gap-2">
                <TrendingUp size={14} />
                Trending
              </h3>
            </div>
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
              <div className="text-xs text-gray-600 mt-2">Search trends relative to last week</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-2xl bg-cu-gray border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide">Quick Links</h3>
            </div>
            <div className="p-2">
              {[
                { href: '/recruiting', label: 'Recruiting Tracker' },
                { href: '/roster', label: 'Full Roster' },
                { href: '/depth-chart', label: 'Depth Chart' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-cu-gold/10 group transition-colors"
                >
                  <span className="text-sm text-gray-300 group-hover:text-white">{link.label}</span>
                  <ChevronRight size={14} className="text-cu-gold" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
