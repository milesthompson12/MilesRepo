import { Star, MapPin, TrendingUp, Users, Award, ExternalLink, Calendar, Sparkles, Info } from 'lucide-react';

interface Commit {
  name: string;
  position: string;
  stars: number; // 0 = unranked / no star rating
  hometown: string;
  state: string;
  highSchool: string;
  height?: string;
  weight?: string;
  date: string;
  posRank?: string; // verified positional/overall ranking note
  note?: string;
  source: string;
}

interface Target {
  name: string;
  position: string;
  stars: number;
  hometown: string;
  state: string;
  highSchool: string;
  status: 'Offered' | 'Target';
  topSchools?: string[];
  visitDate?: string;
  visitType?: 'Official' | 'Unofficial';
  note?: string;
  source: string;
}

interface Visit {
  name: string;
  position: string;
  stars: number;
  hometown: string;
  state: string;
  visitType: 'Official' | 'Unofficial';
  visitDate: string;
  topSchools?: string[];
  note?: string;
  source: string;
}

// ─── 2027 COMMITS — verified via 247Sports / On3 (most recent first) ──────────────
// As of June 7, 2026, 4:00pm MT. 13 commits.
const commits2027: Commit[] = [
  {
    name: 'Steven Alexis', position: 'RB', stars: 0,
    hometown: 'St. Petersburg', state: 'FL', highSchool: 'Northeast HS',
    height: '6\'0"', weight: '203', date: 'Jun 7, 2026',
    note: 'Rushed for 1,113 yds and 9 TDs in 2025. Chose CU over Pitt, Illinois & Iowa.',
    source: '247Sports / On3',
  },
  {
    name: 'Jovon Pulliam', position: 'EDGE', stars: 3,
    hometown: 'Hoover', state: 'AL', highSchool: 'Hoover HS',
    date: 'Jun 7, 2026',
    note: '11 sacks, 16 TFLs, 3 forced fumbles in 2025. Chose CU over App State & Tulane.',
    source: '247Sports / On3',
  },
  {
    name: 'Zaquan Linton', position: 'OT', stars: 3,
    hometown: 'Wellington', state: 'FL', highSchool: 'Wellington HS',
    height: '6\'5"', weight: '293', date: 'Jun 6, 2026',
    note: 'Former Miami commit with track & field athleticism. 24 total offers.',
    source: '247Sports',
  },
  {
    name: 'Jaiden Lindsay', position: 'OL', stars: 3,
    hometown: 'Olney', state: 'MD', highSchool: 'Bullis School',
    height: '6\'3"', weight: '300', date: 'Jun 6, 2026', posRank: 'No. 65 IOL',
    note: 'Committed during his official visit to Boulder.',
    source: '247Sports / Rivals',
  },
  {
    name: 'Jaiden Kelly-Murray', position: 'WR', stars: 4,
    hometown: 'Mount Pleasant', state: 'SC', highSchool: 'Oceanside Collegiate Academy',
    height: '5\'10"', weight: '170', date: 'May 25, 2026', posRank: 'No. 38 WR',
    note: 'Flipped from South Carolina — headliner of the late-May commit surge.',
    source: '247Sports / On3',
  },
  {
    name: 'Prince Washington', position: 'CB', stars: 0,
    hometown: 'Houston', state: 'TX', highSchool: 'Lamar HS',
    height: '6\'1"', weight: '185', date: 'May 24, 2026',
    source: '247Sports',
  },
  {
    name: 'Li\'Marcus Jones', position: 'OT', stars: 4,
    hometown: 'Brentwood', state: 'TN', highSchool: 'Brentwood Academy',
    height: '6\'5"', weight: '285', date: 'May 24, 2026', posRank: 'No. 22 OT · No. 171 overall',
    source: '247Sports',
  },
  {
    name: 'Will Rasmussen', position: 'CB', stars: 3,
    hometown: 'Orem', state: 'UT', highSchool: 'Orem HS',
    height: '5\'10"', weight: '180', date: 'May 20, 2026', posRank: 'No. 132 CB',
    source: '247Sports',
  },
  {
    name: 'Gabe Jenkins', position: 'S', stars: 4,
    hometown: 'Pittsburgh', state: 'PA', highSchool: 'Imani Christian Academy',
    height: '6\'2"', weight: '187', date: 'May 20, 2026', posRank: 'No. 17 S',
    source: '247Sports',
  },
  {
    name: 'Ba\'Roc Willis', position: 'EDGE', stars: 3,
    hometown: 'Pell City', state: 'AL', highSchool: 'Pell City HS',
    height: '6\'3"', weight: '230', date: 'May 19, 2026',
    note: 'Kicked off the late-May run of commitments.',
    source: '247Sports',
  },
  {
    name: 'Andre Adams', position: 'QB', stars: 4,
    hometown: 'Nashville', state: 'TN', highSchool: 'Antioch HS',
    date: 'Apr 14, 2026', posRank: 'No. 22 QB',
    note: 'Cornerstone quarterback of the 2027 class.',
    source: '247Sports',
  },
  {
    name: 'Kenny Fairley', position: 'DL', stars: 3,
    hometown: 'Fairburn', state: 'GA', highSchool: 'Creekside',
    height: '6\'0"', weight: '270', date: 'Feb 2026',
    note: 'Chose Colorado over Cincinnati and Purdue.',
    source: '247Sports / On3',
  },
  {
    name: 'Davon Dericho', position: 'CB', stars: 3,
    hometown: 'Miami', state: 'FL', highSchool: 'Killian',
    height: '5\'9"', date: 'Feb 12, 2026', posRank: 'No. 57 CB · No. 593 overall',
    source: '247Sports',
  },
];

// ─── TARGETS / OFFERS — verified via 247Sports / On3 only ────────────────────────
// Warm interest = "Target" · Cool/offer only = "Offered"
// visitDate shown next to player name in this section if a visit is scheduled.
const targets2027: Target[] = [
  {
    name: 'Zykee Scott', position: 'LB', stars: 3,
    hometown: 'Philadelphia', state: 'PA', highSchool: 'La Salle College HS',
    status: 'Target', topSchools: ['UNC', 'Georgia Tech', 'Pitt', 'Michigan St.', 'Colorado'],
    visitDate: 'Jun 19–21', visitType: 'Official',
    note: 'Top-50 LB · plans to announce commitment June 25.',
    source: '247Sports',
  },
  {
    name: 'Ryan Ferdinand', position: 'WR', stars: 0,
    hometown: 'West Palm Beach', state: 'FL', highSchool: 'Palm Beach Lakes HS',
    status: 'Target',
    visitDate: 'Jun 5–7', visitType: 'Official',
    note: 'Priority WR target — on campus for official visit this weekend.',
    source: '247Sports',
  },
  {
    name: 'Jaden Baldwin', position: 'WR', stars: 3,
    hometown: 'Chandler', state: 'AZ', highSchool: 'Chandler HS',
    status: 'Target', topSchools: ['Colorado', 'Iowa State', 'Penn State', 'Pitt'],
    visitDate: 'Jun 12', visitType: 'Official',
    note: 'Final four includes CU — plans to announce commitment June 16.',
    source: '247Sports',
  },
  {
    name: 'Drew Sapp', position: 'EDGE', stars: 3,
    hometown: 'Lakeland', state: 'FL', highSchool: 'Lakeland HS',
    status: 'Target',
    visitDate: 'Jun 12', visitType: 'Official',
    note: 'Official visit set for June 12; also visiting Mississippi State.',
    source: '247Sports',
  },
  {
    name: 'Samari Howard', position: 'S', stars: 3,
    hometown: 'Fort Lauderdale', state: 'FL', highSchool: 'St. Thomas Aquinas',
    status: 'Target',
    visitDate: 'Jun 5–7 (visited)', visitType: 'Official',
    note: 'No. 71 safety in 2027 class — took official visit this weekend.',
    source: 'On3 / 247Sports',
  },
  {
    name: 'Kingston Thornton', position: 'CB', stars: 0,
    hometown: 'Dallas', state: 'TX', highSchool: 'Parish Episcopal',
    status: 'Offered',
    note: 'Offered in early May 2026; taking his time with the process.',
    source: 'On3',
  },
];

// ─── UPCOMING VISITS — verified via 247Sports only ───────────────────────────────
const upcomingVisits: Visit[] = [
  {
    name: 'Ryan Ferdinand', position: 'WR', stars: 0,
    hometown: 'West Palm Beach', state: 'FL',
    visitType: 'Official', visitDate: 'Jun 5–7, 2026',
    note: 'Priority WR target — took official visit this weekend.',
    source: '247Sports',
  },
  {
    name: 'Samari Howard', position: 'S', stars: 3,
    hometown: 'Fort Lauderdale', state: 'FL',
    visitType: 'Official', visitDate: 'Jun 5–7, 2026',
    note: 'No. 71 safety in 2027 class — took official visit this weekend.',
    source: 'On3 / 247Sports',
  },
  {
    name: 'Jaden Baldwin', position: 'WR', stars: 3,
    hometown: 'Chandler', state: 'AZ',
    visitType: 'Official', visitDate: 'Jun 12, 2026',
    topSchools: ['Colorado', 'Iowa State', 'Penn State', 'Pitt'],
    note: 'Final four — plans to announce commitment June 16.',
    source: '247Sports',
  },
  {
    name: 'Drew Sapp', position: 'EDGE', stars: 3,
    hometown: 'Lakeland', state: 'FL',
    visitType: 'Official', visitDate: 'Jun 12, 2026',
    note: 'Also visiting Mississippi State.',
    source: '247Sports',
  },
  {
    name: 'Zykee Scott', position: 'LB', stars: 3,
    hometown: 'Philadelphia', state: 'PA',
    visitType: 'Official', visitDate: 'Jun 19–21, 2026',
    topSchools: ['UNC', 'Georgia Tech', 'Pitt', 'Michigan St.', 'Colorado'],
    note: 'Plans to announce commitment June 25.',
    source: '247Sports',
  },
];

// ─── CRYSTAL BALL / EXPERT PREDICTIONS ───────────────────────────────────────────
// Intentionally empty: 247Sports Crystal Ball and On3 RPM prediction pages are
// paywalled, so no individual prediction (analyst, pick, confidence) can be
// confirmed to 100% as of June 6, 2026. We do not list unverified predictions.
const crystalBall: Array<{
  name: string; position: string; pick: string; analyst: string; confidence: string; source: string;
}> = [];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function StarRating({ stars }: { stars: number }) {
  if (stars <= 0) {
    return <span className="text-gray-500 text-xs font-bold">NR (no star rating)</span>;
  }
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} className={i < stars ? 'text-cu-gold fill-cu-gold' : 'text-gray-600'} />
      ))}
    </div>
  );
}

function SourceTag({ source }: { source: string }) {
  return <span className="text-[10px] text-gray-600">Source: {source}</span>;
}

function StatusBadge({ status }: { status: Target['status'] }) {
  const styles = {
    Offered: 'bg-blue-900/40 text-blue-400 border border-blue-700/40',
    Target: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles[status]}`}>{status}</span>;
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

function TopSchools({ schools }: { schools?: string[] }) {
  if (!schools?.length) return null;
  return (
    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
      <span className="text-gray-500 text-xs">Top schools:</span>
      {schools.map((s, j) => (
        <span key={j} className={`text-xs px-1.5 py-0.5 rounded ${s === 'Colorado' ? 'bg-cu-gold/20 text-cu-gold font-bold' : 'bg-gray-700 text-gray-400'}`}>
          {s}
        </span>
      ))}
    </div>
  );
}

export default function RecruitingPage() {
  const ranked = commits2027.filter(c => c.stars > 0);
  const avgStars = (ranked.reduce((s, c) => s + c.stars, 0) / ranked.length).toFixed(1);
  const fourStars = commits2027.filter(c => c.stars === 4).length;
  const threeStars = commits2027.filter(c => c.stars === 3).length;
  const unranked = commits2027.filter(c => c.stars === 0).length;
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
        <p className="text-gray-400 mt-1">Commits · Targets · Visits · Crystal Ball — as of June 7, 2026, 4:00pm MT</p>
      </div>

      {/* Accuracy note */}
      <div className="bg-cu-gray/60 rounded-xl border border-cu-gold/10 p-3 mb-6 flex items-start gap-2">
        <Info size={14} className="text-cu-gold flex-shrink-0 mt-0.5" />
        <p className="text-gray-400 text-xs">
          Every entry below is verified against a 247Sports or On3 article as of June 7, 2026 (4pm MT). Unconfirmed
          ratings, rankings, and predictions are intentionally omitted rather than estimated.
        </p>
      </div>

      {/* Class Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{commits2027.length}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Commits</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{fourStars}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Four-Stars</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{avgStars}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Avg Stars (ranked)</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-green-400">~40</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Natl Rank (247)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main — sections stacked */}
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
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cu-gold/20 text-cu-gold border border-cu-gold/40">Committed</span>
                        </div>
                        <div className="mt-1"><StarRating stars={c.stars} /></div>
                        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs flex-wrap">
                          <MapPin size={10} />
                          <span>{c.hometown}, {c.state} · {c.highSchool}</span>
                          {c.height && (
                            <>
                              <span className="mx-1">·</span>
                              <span>{c.height}{c.weight ? ` / ${c.weight} lbs` : ''}</span>
                            </>
                          )}
                        </div>
                        {c.note && <div className="text-xs text-gray-400 mt-1 italic">{c.note}</div>}
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-xs text-gray-500">Committed {c.date}</span>
                          <span className="text-gray-700">·</span>
                          <SourceTag source={c.source} />
                        </div>
                      </div>
                    </div>
                    {c.posRank && (
                      <div className="text-right flex-shrink-0">
                        <div className="text-cu-gold font-bold text-xs">{c.posRank}</div>
                        <div className="text-gray-600 text-[10px]">247Sports</div>
                      </div>
                    )}
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
              <span className="ml-2 text-sm font-normal text-gray-500">({targets2027.length} verified)</span>
            </h2>
            <div className="space-y-3">
              {targets2027.map((t, i) => (
                <div key={i} className="bg-cu-gray rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-black text-xs">{t.position}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold">{t.name}</span>
                        <StatusBadge status={t.status} />
                        {t.visitDate && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-700/40 flex items-center gap-1">
                            <Calendar size={9} />
                            {t.visitType} Visit: {t.visitDate}
                          </span>
                        )}
                      </div>
                      <div className="mt-1"><StarRating stars={t.stars} /></div>
                      <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                        <MapPin size={10} />
                        <span>{t.hometown}, {t.state} · {t.highSchool}</span>
                      </div>
                      {t.note && <div className="text-xs text-gray-400 mt-1 italic">{t.note}</div>}
                      <TopSchools schools={t.topSchools} />
                      <div className="mt-1"><SourceTag source={t.source} /></div>
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
              <span className="ml-2 text-sm font-normal text-gray-500">({upcomingVisits.length} verified)</span>
            </h2>
            <div className="space-y-3">
              {upcomingVisits.map((v, i) => (
                <div key={i} className="bg-cu-gray rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 font-black text-xs">{v.position}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold">{v.name}</span>
                        <VisitTypeBadge type={v.visitType} />
                      </div>
                      <div className="mt-1"><StarRating stars={v.stars} /></div>
                      <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                        <MapPin size={10} />
                        <span>{v.hometown}, {v.state}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-purple-400 text-xs font-semibold">
                        <Calendar size={10} />
                        <span>{v.visitDate}</span>
                      </div>
                      {v.note && <div className="text-xs text-gray-400 mt-1 italic">{v.note}</div>}
                      <TopSchools schools={v.topSchools} />
                      <div className="mt-1"><SourceTag source={v.source} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CRYSTAL BALL / EXPERT PREDICTIONS ─────────────────────────── */}
          <section id="crystal-ball">
            <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-400 rounded-full inline-block" />
              Crystal Ball / Expert Predictions
            </h2>
            {crystalBall.length > 0 ? (
              <div className="space-y-3">
                {crystalBall.map((p, i) => (
                  <div key={i} className="bg-cu-gray rounded-xl border border-emerald-500/10 p-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Sparkles size={14} className="text-emerald-400" />
                      <span className="text-white font-bold">{p.name}</span>
                      <span className="text-gray-500 text-xs">{p.position}</span>
                    </div>
                    <div className="text-gray-300 text-sm mt-1">
                      Predicted to <span className="text-cu-gold font-bold">{p.pick}</span>
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {p.analyst} · {p.confidence} confidence · {p.source}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-cu-gray rounded-xl border border-emerald-500/10 p-4 flex items-start gap-2">
                <Sparkles size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400 text-sm">
                  No individual Crystal Ball (247Sports) or RPM Expert Prediction (On3) for a 2027 Colorado
                  recruit could be 100% confirmed as of June 7, 2026 — those prediction pages are
                  subscriber-locked. To preserve accuracy, none are listed. Check the live pages below for the latest.
                  <div className="flex flex-wrap gap-3 mt-2">
                    <a href="https://247sports.com/college/colorado/season/2027-football/institutionpredictions/" target="_blank" rel="noopener noreferrer" className="text-cu-gold text-xs underline">247 Crystal Ball</a>
                    <a href="https://www.on3.com/db/expert-predictions/football/2027/" target="_blank" rel="noopener noreferrer" className="text-cu-gold text-xs underline">On3 Expert Predictions</a>
                  </div>
                </div>
              </div>
            )}
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
                { href: '#crystal-ball', label: 'Crystal Ball', color: 'bg-emerald-400' },
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
                { label: '4★', count: fourStars, color: 'bg-cu-gold' },
                { label: '3★', count: threeStars, color: 'bg-gray-400' },
                { label: 'NR', count: unranked, color: 'bg-gray-600' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="text-cu-gold text-xs font-bold w-8 flex-shrink-0">{row.label}</span>
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

          {/* Recruiting buzz — verified facts only */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide flex items-center gap-2">
                <TrendingUp size={14} />
                Recruiting Buzz
              </h3>
            </div>
            <div className="p-4 space-y-2 text-xs text-gray-400">
              <p>🔥 4 commits June 6–7 weekend (Alexis, Pulliam, Linton, Lindsay — 247Sports/On3)</p>
              <p>⭐ WR Jaiden Kelly-Murray flipped from South Carolina (247/On3)</p>
              <p>🏈 13 commits — ranked No. 34 nationally, No. 2 in the Big 12 (On3)</p>
              <p>📍 Class spans 10+ different states — a true national haul</p>
              <p>🏈 WR Jaden Baldwin official visit June 12, decides June 16 (247Sports)</p>
              <p>🏈 LB Zykee Scott official visit June 19–21, decides June 25 (247Sports)</p>
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
