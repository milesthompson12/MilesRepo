import { Star, MapPin, TrendingUp, Users, Award, ExternalLink, Calendar, Eye } from 'lucide-react';

interface Commit {
  name: string;
  position: string;
  stars: number;
  rating: number;
  hometown: string;
  state: string;
  height: string;
  weight: number;
  status: 'Committed' | 'Enrolled' | 'Signed';
  date: string;
  nationalRank: number;
  positionRank: number;
}

interface Target {
  name: string;
  position: string;
  stars: number;
  rating: number;
  hometown: string;
  state: string;
  height: string;
  weight: number;
  topSchools: string[];
  cuInterest: 'High' | 'Medium' | 'Offered';
  note?: string;
}

interface Visit {
  name: string;
  position: string;
  stars: number;
  rating: number;
  hometown: string;
  state: string;
  height: string;
  weight: number;
  visitType: 'Official' | 'Unofficial';
  visitDate: string;
  topSchools: string[];
  note?: string;
}

// ─── 2027 COMMITS ─────────────────────────────────────────────────────────────
const commits2027: Commit[] = [
  {
    name: 'Andre Adams',
    position: 'QB',
    stars: 4,
    rating: 0.8934,
    hometown: 'Antioch',
    state: 'TN',
    height: '6\'3"',
    weight: 185,
    status: 'Committed',
    date: 'Apr 14, 2026',
    nationalRank: 165,
    positionRank: 15,
  },
  {
    name: 'Gabe Jenkins',
    position: 'S',
    stars: 4,
    rating: 0.8912,
    hometown: 'Pittsburgh',
    state: 'PA',
    height: '6\'2"',
    weight: 187,
    status: 'Committed',
    date: 'Mar 22, 2026',
    nationalRank: 186,
    positionRank: 17,
  },
  {
    name: 'Li\'Marcus Jones',
    position: 'OT',
    stars: 4,
    rating: 0.8876,
    hometown: 'Brentwood',
    state: 'TN',
    height: '6\'5"',
    weight: 285,
    status: 'Committed',
    date: 'May 18, 2026',
    nationalRank: 171,
    positionRank: 22,
  },
  {
    name: 'Jaiden Kelly-Murray',
    position: 'WR',
    stars: 4,
    rating: 0.8801,
    hometown: 'Mt. Pleasant',
    state: 'SC',
    height: '5\'10"',
    weight: 170,
    status: 'Committed',
    date: 'May 31, 2026',
    nationalRank: 302,
    positionRank: 38,
  },
  {
    name: 'Ba\'Roc Willis',
    position: 'LB',
    stars: 3,
    rating: 0.8712,
    hometown: 'Pell City',
    state: 'AL',
    height: '6\'2"',
    weight: 230,
    status: 'Committed',
    date: 'Apr 29, 2026',
    nationalRank: 389,
    positionRank: 37,
  },
  {
    name: 'Kenny Fairley',
    position: 'DL',
    stars: 3,
    rating: 0.8634,
    hometown: 'Fairburn',
    state: 'GA',
    height: '6\'0"',
    weight: 270,
    status: 'Committed',
    date: 'Mar 8, 2026',
    nationalRank: 445,
    positionRank: 52,
  },
  {
    name: 'Davon Dericho',
    position: 'CB',
    stars: 3,
    rating: 0.8598,
    hometown: 'Miami',
    state: 'FL',
    height: '5\'11"',
    weight: 170,
    status: 'Committed',
    date: 'Jan 27, 2026',
    nationalRank: 593,
    positionRank: 55,
  },
  {
    name: 'Will Rasmussen',
    position: 'CB',
    stars: 3,
    rating: 0.8521,
    hometown: 'Orem',
    state: 'UT',
    height: '5\'10"',
    weight: 180,
    status: 'Committed',
    date: 'Apr 5, 2026',
    nationalRank: 620,
    positionRank: 62,
  },
  {
    name: 'Prince Washington',
    position: 'CB',
    stars: 3,
    rating: 0.8489,
    hometown: 'Houston',
    state: 'TX',
    height: '6\'1"',
    weight: 185,
    status: 'Committed',
    date: 'May 10, 2026',
    nationalRank: 648,
    positionRank: 67,
  },
];

// ─── TARGETS / OFFERS ─────────────────────────────────────────────────────────
const targets2027: Target[] = [
  {
    name: 'Joshua Dobson',
    position: 'CB',
    stars: 5,
    rating: 0.9734,
    hometown: 'Cornelius',
    state: 'NC',
    height: '6\'1"',
    weight: 185,
    topSchools: ['Texas A&M', 'Georgia', 'Colorado', 'Ohio State'],
    cuInterest: 'Offered',
    note: '#11 overall · #3 CB in 2027 · offered by Sanders personally',
  },
  {
    name: 'Javian Jones-Priest',
    position: 'RB',
    stars: 4,
    rating: 0.9012,
    hometown: 'Arlington',
    state: 'TX',
    height: '5\'10"',
    weight: 195,
    topSchools: ['Colorado', 'SMU', 'Oklahoma State', 'TCU'],
    cuInterest: 'High',
    note: '#27 RB nationally · CU in top group · decision expected late June',
  },
  {
    name: 'Kameron Roberson',
    position: 'CB',
    stars: 4,
    rating: 0.8934,
    hometown: 'Cypress',
    state: 'TX',
    height: '6\'1"',
    weight: 180,
    topSchools: ['Colorado', 'Houston', 'Vanderbilt', 'Iowa State'],
    cuInterest: 'High',
    note: '#16 CB in class · official visit set June 19',
  },
  {
    name: 'Kylan Bobo',
    position: 'RB',
    stars: 3,
    rating: 0.8745,
    hometown: 'Tupelo',
    state: 'MS',
    height: '5\'11"',
    weight: 205,
    topSchools: ['Colorado', 'Arkansas', 'Ole Miss', 'Mississippi State'],
    cuInterest: 'High',
    note: '1,726 yds / 28 TDs in 2025 · CU frontrunner · July 1 decision date',
  },
  {
    name: 'Jackson Roper',
    position: 'WR',
    stars: 4,
    rating: 0.8867,
    hometown: 'Savannah',
    state: 'GA',
    height: '6\'2"',
    weight: 185,
    topSchools: ['Colorado', 'Georgia', 'Tennessee', 'Auburn'],
    cuInterest: 'High',
    note: 'Hosted by Deion Sanders personally · trending CU',
  },
  {
    name: 'Bryce Woods',
    position: 'DB',
    stars: 4,
    rating: 0.8889,
    hometown: 'Atlanta',
    state: 'GA',
    height: '6\'0"',
    weight: 185,
    topSchools: ['Colorado', 'Mississippi State', 'Virginia Tech', 'Ohio State'],
    cuInterest: 'Offered',
    note: '#27 DB · #204 overall · official visit to MSU May 29, VT June 5, OSU June 12',
  },
  {
    name: 'Khyren Haywood',
    position: 'DL',
    stars: 3,
    rating: 0.8701,
    hometown: 'Denton',
    state: 'TX',
    height: '6\'1"',
    weight: 270,
    topSchools: ['Colorado', 'Texas Tech', 'Kansas State', 'TCU'],
    cuInterest: 'Medium',
    note: 'Visited Boulder May 15–17 · said CU "exceeded expectations" · decision imminent',
  },
];

// ─── UPCOMING VISITS ──────────────────────────────────────────────────────────
const upcomingVisits: Visit[] = [
  {
    name: 'Kylan Bobo',
    position: 'RB',
    stars: 3,
    rating: 0.8745,
    hometown: 'Tupelo',
    state: 'MS',
    height: '5\'11"',
    weight: 205,
    visitType: 'Official',
    visitDate: 'Jun 12–14, 2026',
    topSchools: ['Colorado', 'Arkansas', 'Ole Miss'],
    note: 'CU is current frontrunner · decision expected July 1',
  },
  {
    name: 'Kameron Roberson',
    position: 'CB',
    stars: 4,
    rating: 0.8934,
    hometown: 'Cypress',
    state: 'TX',
    height: '6\'1"',
    weight: 180,
    visitType: 'Official',
    visitDate: 'Jun 19, 2026',
    topSchools: ['Colorado', 'Houston', 'Vanderbilt', 'Iowa State'],
    note: '4-star CB · has 5 official visits total · CU among leaders',
  },
  {
    name: 'EDGE Recruit (Lakeland, FL)',
    position: 'EDGE',
    stars: 3,
    rating: 0.8412,
    hometown: 'Lakeland',
    state: 'FL',
    height: '6\'3"',
    weight: 225,
    visitType: 'Official',
    visitDate: 'Jun 12–14, 2026',
    topSchools: ['Colorado', 'Florida', 'Florida State'],
    note: '#104 EDGE nationally · #148 in FL · CU competing with in-state programs',
  },
  {
    name: 'Jackson Roper',
    position: 'WR',
    stars: 4,
    rating: 0.8867,
    hometown: 'Savannah',
    state: 'GA',
    height: '6\'2"',
    weight: 185,
    visitType: 'Unofficial',
    visitDate: 'Jun 7, 2026',
    topSchools: ['Colorado', 'Georgia', 'Tennessee', 'Auburn'],
    note: 'Hosted by Coach Prime — CU trending strong',
  },
  {
    name: 'Javian Jones-Priest',
    position: 'RB',
    stars: 4,
    rating: 0.9012,
    hometown: 'Arlington',
    state: 'TX',
    height: '5\'10"',
    weight: 195,
    visitType: 'Official',
    visitDate: 'Jun 20–22, 2026',
    topSchools: ['Colorado', 'SMU', 'Oklahoma State', 'TCU'],
    note: '#27 RB · CU in final 4 · decision expected by end of June',
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} className={i < stars ? 'text-cu-gold fill-cu-gold' : 'text-gray-600'} />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Commit['status'] }) {
  const styles = {
    Committed: 'bg-cu-gold/20 text-cu-gold border border-cu-gold/40',
    Enrolled: 'bg-green-900/40 text-green-400 border border-green-700/40',
    Signed: 'bg-blue-900/40 text-blue-400 border border-blue-700/40',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles[status]}`}>{status}</span>;
}

function InterestBadge({ level }: { level: Target['cuInterest'] }) {
  const styles = {
    High: 'bg-green-900/40 text-green-400 border border-green-700/40',
    Medium: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40',
    Offered: 'bg-blue-900/40 text-blue-400 border border-blue-700/40',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles[level]}`}>{level} Interest</span>;
}

function VisitTypeBadge({ type }: { type: Visit['visitType'] }) {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
      type === 'Official'
        ? 'bg-purple-900/40 text-purple-400 border border-purple-700/40'
        : 'bg-gray-700/60 text-gray-300 border border-gray-600/40'
    }`}>
      {type} Visit
    </span>
  );
}

type Tab = 'commits' | 'targets' | 'visits';

export default function RecruitingPage() {
  // Static page — use a simple anchor-based tab approach via hash
  const avgStars = (commits2027.reduce((s, c) => s + c.stars, 0) / commits2027.length).toFixed(1);
  const fiveStars = commits2027.filter(c => c.stars === 5).length;
  const fourStars = commits2027.filter(c => c.stars === 4).length;
  const threeStars = commits2027.filter(c => c.stars === 3).length;
  const byPosition = commits2027.reduce<Record<string, number>>((acc, c) => {
    acc[c.position] = (acc[c.position] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">2027</span> Recruiting
        </h1>
        <p className="text-gray-400 mt-1">Commits · Targets · Upcoming Visits · as of June 6, 2026</p>
      </div>

      {/* Class Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{commits2027.length}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Commits</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{avgStars}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Avg Stars</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-green-400">#37</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">National Rank</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-blue-400">#2</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Big 12 Rank</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main — three sections stacked */}
        <div className="xl:col-span-3 space-y-10">

          {/* ── COMMITS ──────────────────────────────────────────────────── */}
          <section id="commits">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cu-gold rounded-full inline-block" />
              2027 Commitments
              <span className="ml-2 text-sm font-normal text-gray-500">({commits2027.length} committed)</span>
            </h2>
            <div className="space-y-3">
              {commits2027.map((c, i) => (
                <div key={i} className="bg-cu-gray rounded-xl border border-cu-gold/10 hover:border-cu-gold/40 transition-all p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-cu-gold/20 border border-cu-gold/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-cu-gold font-black text-xs">{c.position}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold">{c.name}</span>
                          <StatusBadge status={c.status} />
                        </div>
                        <StarRating stars={c.stars} />
                        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                          <MapPin size={10} />
                          <span>{c.hometown}, {c.state}</span>
                          <span className="mx-1">·</span>
                          <span>{c.height} / {c.weight} lbs</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">Committed {c.date}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-cu-gold font-black text-lg">{c.rating.toFixed(4)}</div>
                      <div className="text-gray-500 text-xs">Natl #{c.nationalRank}</div>
                      <div className="text-gray-500 text-xs">{c.position} #{c.positionRank}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TARGETS / OFFERS ─────────────────────────────────────────── */}
          <section id="targets">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-blue-400 rounded-full inline-block" />
              Targets & Offers
              <span className="ml-2 text-sm font-normal text-gray-500">({targets2027.length} being tracked)</span>
            </h2>
            <div className="space-y-3">
              {targets2027.map((t, i) => (
                <div key={i} className="bg-cu-gray rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-black text-xs">{t.position}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold">{t.name}</span>
                          <InterestBadge level={t.cuInterest} />
                        </div>
                        <StarRating stars={t.stars} />
                        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                          <MapPin size={10} />
                          <span>{t.hometown}, {t.state}</span>
                          <span className="mx-1">·</span>
                          <span>{t.height} / {t.weight} lbs</span>
                        </div>
                        {t.note && (
                          <div className="text-xs text-yellow-500/80 mt-1 italic">{t.note}</div>
                        )}
                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                          <span className="text-gray-500 text-xs">Top schools:</span>
                          {t.topSchools.map((s, j) => (
                            <span key={j} className={`text-xs px-1.5 py-0.5 rounded ${s === 'Colorado' ? 'bg-cu-gold/20 text-cu-gold font-bold' : 'bg-gray-700 text-gray-400'}`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white font-black text-lg">{t.rating.toFixed(4)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── UPCOMING VISITS ──────────────────────────────────────────── */}
          <section id="visits">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-purple-400 rounded-full inline-block" />
              Upcoming Visits
              <span className="ml-2 text-sm font-normal text-gray-500">({upcomingVisits.length} scheduled)</span>
            </h2>
            <div className="space-y-3">
              {upcomingVisits.map((v, i) => (
                <div key={i} className="bg-cu-gray rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 font-black text-xs">{v.position}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold">{v.name}</span>
                          <VisitTypeBadge type={v.visitType} />
                        </div>
                        <StarRating stars={v.stars} />
                        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                          <MapPin size={10} />
                          <span>{v.hometown}, {v.state}</span>
                          <span className="mx-1">·</span>
                          <span>{v.height} / {v.weight} lbs</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-purple-400 text-xs font-semibold">
                          <Calendar size={10} />
                          <span>{v.visitDate}</span>
                        </div>
                        {v.note && (
                          <div className="text-xs text-yellow-500/80 mt-1 italic">{v.note}</div>
                        )}
                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                          <span className="text-gray-500 text-xs">Top schools:</span>
                          {v.topSchools.map((s, j) => (
                            <span key={j} className={`text-xs px-1.5 py-0.5 rounded ${s === 'Colorado' ? 'bg-cu-gold/20 text-cu-gold font-bold' : 'bg-gray-700 text-gray-400'}`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Eye size={16} className="text-purple-400 ml-auto" />
                      <div className="text-white font-black text-lg mt-1">{v.rating.toFixed(4)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Quick nav */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide">Jump To</h3>
            </div>
            <div className="p-2">
              {[
                { href: '#commits', label: `Commitments (${commits2027.length})`, color: 'bg-cu-gold' },
                { href: '#targets', label: `Targets (${targets2027.length})`, color: 'bg-blue-400' },
                { href: '#visits', label: `Upcoming Visits (${upcomingVisits.length})`, color: 'bg-purple-400' },
              ].map(link => (
                <a key={link.href} href={link.href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cu-gold/10 group transition-colors">
                  <span className={`w-2 h-2 rounded-full ${link.color} flex-shrink-0`} />
                  <span className="text-sm text-gray-300 group-hover:text-white">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Star breakdown */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide flex items-center gap-2">
                <Award size={14} />
                Star Breakdown
              </h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                { stars: 5, count: fiveStars, color: 'bg-yellow-400' },
                { stars: 4, count: fourStars, color: 'bg-cu-gold' },
                { stars: 3, count: threeStars, color: 'bg-gray-400' },
              ].map(row => (
                <div key={row.stars} className="flex items-center gap-3">
                  <div className="flex gap-0.5 w-14 flex-shrink-0">
                    {Array.from({ length: row.stars }).map((_, i) => (
                      <Star key={i} size={9} className="text-cu-gold fill-cu-gold" />
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className={`${row.color} h-2 rounded-full`} style={{ width: `${(row.count / commits2027.length) * 100}%` }} />
                  </div>
                  <span className="text-white text-xs font-bold w-4">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Position breakdown */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide flex items-center gap-2">
                <Users size={14} />
                By Position
              </h3>
            </div>
            <div className="p-4 space-y-2">
              {Object.entries(byPosition).sort((a, b) => b[1] - a[1]).map(([pos, count]) => (
                <div key={pos} className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">{pos}</span>
                  <span className="text-cu-gold font-bold text-sm">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recruiting buzz */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide flex items-center gap-2">
                <TrendingUp size={14} />
                Recruiting Buzz
              </h3>
            </div>
            <div className="p-4 space-y-2 text-xs text-gray-400">
              <p>🔥 Class jumped to #37 nationally, #2 Big 12 after spring surge</p>
              <p>🏃 RB Kylan Bobo visiting June 12–14 · CU frontrunner</p>
              <p>🎯 5-star CB Joshua Dobson offered — Sanders called personally</p>
              <p>📍 Every commit from a different state — true national class</p>
              <p>🏈 5 official visits scheduled in June 2026</p>
            </div>
          </div>

          {/* External links */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide">Recruiting Sites</h3>
            </div>
            <div className="p-2">
              {[
                { label: '247Sports 2027 Commits', href: 'https://247sports.com/college/colorado/season/2027-football/commits/' },
                { label: 'On3 CU 2027 Class', href: 'https://www.on3.com/college/colorado-buffaloes/football/2027/industry-comparison-commits/' },
                { label: 'ESPN CU Recruiting', href: 'https://www.espn.com/college-sports/football/recruiting/school/_/id/38/class/2027' },
              ].map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-cu-gold/10 group transition-colors">
                  <span className="text-sm text-gray-300 group-hover:text-white">{link.label}</span>
                  <ExternalLink size={12} className="text-cu-gold" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
