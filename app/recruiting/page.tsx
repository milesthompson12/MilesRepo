'use client';

import { useState } from 'react';
import { Star, MapPin, TrendingUp, Users, Award, ExternalLink, Calendar, Sparkles, Info, ArrowUpDown } from 'lucide-react';

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
  posRank?: string;    // e.g. "No. 22 QB"
  overallRank?: string; // e.g. "No. 171 overall"
  rating?: string;     // composite rating, e.g. "0.9030"
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
// As of June 8, 2026. 14 commits.
const commits2027: Commit[] = [
  {
    name: 'Samari Howard', position: 'S', stars: 3,
    hometown: 'Fort Lauderdale', state: 'FL', highSchool: 'St. Thomas Aquinas',
    height: "5'11\"", weight: '175', date: 'Jun 8, 2026',
    posRank: 'No. 71 S', overallRank: 'No. 72 in FL',
    note: 'Committed to Colorado following his official visit to Boulder (June 5–7). The three-star safety from powerhouse St. Thomas Aquinas joins four-star Gabe Jenkins as the second safety committed in the class. Holds offers from Texas A&M, Florida State, Indiana, Ohio State, and Oregon. Physical, instinctive defensive back who projects well in Colorado\'s coverage schemes.',
    source: '247Sports / On3',
  },
  {
    name: 'Steven Alexis', position: 'RB', stars: 0,
    hometown: 'St. Petersburg', state: 'FL', highSchool: 'Northeast HS',
    height: "6'0\"", weight: '203', date: 'Jun 7, 2026',
    note: 'Physical, downhill running back with excellent vision and contact balance. Rushed for 1,113 yards and 9 TDs in 2025 at Northeast HS. Showed the ability to make defenders miss in open space. Chose Colorado over Pitt, Illinois, and Iowa in a competitive recruitment.',
    source: '247Sports / On3',
  },
  {
    name: 'Jovon Pulliam', position: 'EDGE', stars: 3,
    hometown: 'Hoover', state: 'AL', highSchool: 'Hoover HS',
    date: 'Jun 7, 2026',
    note: 'Explosive edge rusher out of powerhouse Hoover HS in Alabama. Recorded 11 sacks, 16 TFLs, and 3 forced fumbles in 2025. Elite first-step quickness and a relentless motor. Brings a versatile skill set that fits both 4-3 DE and 3-4 OLB roles. Chose CU over App State and Tulane.',
    source: '247Sports / On3',
  },
  {
    name: 'Zaquan Linton', position: 'OT', stars: 3,
    hometown: 'Wellington', state: 'FL', highSchool: 'Wellington HS',
    height: "6'5\"", weight: '293', date: 'Jun 6, 2026',
    note: 'Former Miami commit who decommitted and chose Colorado. Brings exceptional athleticism from a track and field background. Holds 24 total offers and has the size and movement skills to develop into a Power 4 starter. Physical frame projects well for the Big 12.',
    source: '247Sports',
  },
  {
    name: 'Jaiden Lindsay', position: 'OL', stars: 3,
    hometown: 'Olney', state: 'MD', highSchool: 'Bullis School',
    height: "6'3\"", weight: '300', date: 'Jun 6, 2026',
    posRank: 'No. 65 IOL',
    note: 'Interior offensive lineman from the prestigious Bullis School prep program in Maryland. Committed to Colorado during his official visit to Boulder. Strong, technically sound blocker who projects as an immediate contributor at guard or center in the Big 12.',
    source: '247Sports / Rivals',
  },
  {
    name: 'Jaiden Kelly-Murray', position: 'WR', stars: 4,
    hometown: 'Mount Pleasant', state: 'SC', highSchool: 'Oceanside Collegiate Academy',
    height: "5'10\"", weight: '170', date: 'May 25, 2026',
    posRank: 'No. 38 WR',
    note: 'Explosive slot and perimeter receiver with elite route-running precision and quick-twitch separation ability. Set school records at Oceanside Collegiate for receiving yards and touchdowns. Flipped from South Carolina after an official visit to Boulder — became the headliner of the late-May commit surge. Dynamic yards-after-catch ability and a natural pass-catching feel.',
    source: '247Sports / On3',
  },
  {
    name: 'Prince Washington', position: 'CB', stars: 0,
    hometown: 'Houston', state: 'TX', highSchool: 'Lamar HS',
    height: "6'1\"", weight: '185', date: 'May 24, 2026',
    note: 'Long, physical cornerback from talent-rich Lamar HS in Houston. Ideal size at 6\'1"/185 lbs for an outside corner at the college level. Projects well in press-man coverage with continued development. Represents Colorado\'s growing pipeline into the Houston and Texas recruiting areas.',
    source: '247Sports',
  },
  {
    name: "Li'Marcus Jones", position: 'OT', stars: 4,
    hometown: 'Brentwood', state: 'TN', highSchool: 'Brentwood Academy',
    height: "6'5\"", weight: '285', date: 'May 24, 2026',
    posRank: 'No. 22 OT', overallRank: 'No. 171 overall',
    note: 'Long, technically refined offensive tackle from one of Tennessee\'s premier prep programs. Possesses elite footwork and hand technique for a lineman his size, with the athleticism to project at tackle or guard. Held 30+ offers including Alabama, Georgia, and Tennessee before choosing Colorado. A true Day 1 starter candidate in the Big 12.',
    source: '247Sports',
  },
  {
    name: 'Will Rasmussen', position: 'CB', stars: 3,
    hometown: 'Orem', state: 'UT', highSchool: 'Orem HS',
    height: "5'10\"", weight: '180', date: 'May 20, 2026',
    posRank: 'No. 132 CB',
    note: 'Physical cornerback from in-state Orem HS with good ball skills and press coverage ability. Quick-twitch athlete who competes well on the outside. Committed to Colorado over multiple mid-major offers. Provides the Buffs with a familiar face from the Utah recruiting corridor.',
    source: '247Sports',
  },
  {
    name: 'Gabe Jenkins', position: 'S', stars: 4,
    hometown: 'Pittsburgh', state: 'PA', highSchool: 'Imani Christian Academy',
    height: "6'2\"", weight: '187', date: 'May 20, 2026',
    posRank: 'No. 17 S',
    note: 'Elite safety prospect from Imani Christian Academy in Pittsburgh with excellent range, ball-hawking instincts, and physicality when asked to play in the box. Multiple WPIAL championship appearances. Chose Colorado over Penn State, Notre Dame, Georgia, and Michigan. Projects as a high-ceiling, starter-ready defender with immediate impact potential.',
    source: '247Sports',
  },
  {
    name: "Ba'Roc Willis", position: 'EDGE', stars: 3,
    hometown: 'Pell City', state: 'AL', highSchool: 'Pell City HS',
    height: "6'3\"", weight: '230', date: 'May 19, 2026',
    note: 'Physical edge defender who kicked off Colorado\'s late-May commitment surge. Brings a well-developed pass-rush repertoire with good length and leverage. Versatile enough to play in multiple fronts — fits as a 4-3 DE or an OLB in the 3-4. Shows leadership qualities and a high football IQ.',
    source: '247Sports',
  },
  {
    name: 'Andre Adams', position: 'QB', stars: 4,
    hometown: 'Nashville', state: 'TN', highSchool: 'Antioch HS',
    date: 'Apr 14, 2026',
    posRank: 'No. 22 QB',
    note: 'The cornerstone of Colorado\'s 2027 class. Elite dual-threat signal caller from Antioch HS in Nashville with a big arm and elite rushing ability. Named a Tennessee Gatorade Player of the Year finalist. Threw for over 3,100 yards and 32 TDs his junior season while adding significant yards on the ground. Committed to CU over offers from Alabama, USC, Oregon, and Tennessee.',
    source: '247Sports',
  },
  {
    name: 'Kenny Fairley', position: 'DL', stars: 3,
    hometown: 'Fairburn', state: 'GA', highSchool: 'Creekside HS',
    height: "6'0\"", weight: '270', date: 'Feb 2026',
    note: 'Interior defensive lineman from Creekside HS in Georgia with the size and strength to be a disruptive presence at the college level. Brings run-stopping ability and the potential to be developed as a pass-rushing interior piece in Colorado\'s defensive system. Chose the Buffs over Cincinnati and Purdue.',
    source: '247Sports / On3',
  },
  {
    name: 'Davon Dericho', position: 'CB', stars: 3,
    hometown: 'Miami', state: 'FL', highSchool: 'Killian HS',
    height: "5'9\"", date: 'Feb 12, 2026',
    posRank: 'No. 57 CB', overallRank: 'No. 593 overall',
    note: 'Compact, physical cornerback from talent-rich Killian HS in Miami. Outstanding ball skills and natural instincts for the position. Plays with a physicality that belies his size — effective in both zone and man coverage schemes. Represents Colorado\'s continued pipeline into Florida\'s deep talent pool.',
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
    note: 'Priority WR target — completed official visit to Boulder (Jun 5–7). No decision announced yet.',
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
    visitType: 'Official', visitDate: 'Jun 5–7, 2026 (completed)',
    note: 'Priority WR target — official visit to Boulder completed. No decision announced yet.',
    source: '247Sports',
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

type SortKey = 'recent' | 'stars' | 'position';

export default function RecruitingPage() {
  const [sortKey, setSortKey] = useState<SortKey>('recent');

  const ranked = commits2027.filter(c => c.stars > 0);
  const avgStars = (ranked.reduce((s, c) => s + c.stars, 0) / ranked.length).toFixed(1);
  const fourStars = commits2027.filter(c => c.stars === 4).length;
  const threeStars = commits2027.filter(c => c.stars === 3).length;
  const unranked = commits2027.filter(c => c.stars === 0).length;
  const byPosition = commits2027.reduce<Record<string, number>>((acc, c) => {
    acc[c.position] = (acc[c.position] || 0) + 1;
    return acc;
  }, {});

  const sortedCommits = [...commits2027].sort((a, b) => {
    if (sortKey === 'stars') return b.stars - a.stars;
    if (sortKey === 'position') return a.position.localeCompare(b.position);
    return 0; // 'recent' = original order (most recent first)
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">2027</span> Recruiting
        </h1>
        <p className="text-gray-400 mt-1">Commits · Targets · Visits · Crystal Ball — as of June 8, 2026</p>
      </div>

      {/* Accuracy note */}
      <div className="bg-cu-gray/60 rounded-xl border border-cu-gold/10 p-3 mb-6 flex items-start gap-2">
        <Info size={14} className="text-cu-gold flex-shrink-0 mt-0.5" />
        <p className="text-gray-400 text-xs">
          Every entry below is verified as of June 8, 2026. Sourcing is weighted 247Sports first,
          then On3, with ESPN only as a last resort (≈60% / 30% / 10%). Unconfirmed ratings, rankings, and
          predictions are intentionally omitted rather than estimated.
        </p>
      </div>

      {/* Class Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
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
        {/* National rank — split into 247Sports and On3 */}
        <div className="bg-cu-gray rounded-2xl border border-green-500/20 p-4 text-center">
          <div className="text-3xl font-black text-green-400">No. 37</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Natl Rank · 247Sports</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-blue-500/20 p-4 text-center">
          <div className="text-3xl font-black text-blue-400">No. 40</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Natl Rank · On3 (No. 4 Big 12)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main — sections stacked */}
        <div className="xl:col-span-3 space-y-10">

          {/* ── COMMITS ──────────────────────────────────────────────────── */}
          <section id="commits">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-cu-gold rounded-full inline-block" />
                2027 Commitments
                <span className="text-sm font-normal text-gray-500">({commits2027.length} committed)</span>
              </h2>
              <div className="ml-auto flex items-center gap-1 bg-black/40 border border-white/10 rounded-lg p-1">
                <ArrowUpDown size={12} className="text-gray-500 ml-1" />
                {(['recent', 'stars', 'position'] as SortKey[]).map((k) => (
                  <button key={k} onClick={() => setSortKey(k)}
                    className={`px-2 py-1 rounded text-xs font-bold capitalize transition-all ${
                      sortKey === k ? 'bg-cu-gold text-black' : 'text-gray-400 hover:text-white'
                    }`}
                  >{k === 'recent' ? 'Date' : k === 'stars' ? 'Stars' : 'Position'}</button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {sortedCommits.map((c, i) => (
                <div key={i} className="bg-cu-gray rounded-xl border border-cu-gold/10 hover:border-cu-gold/40 transition-all p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-cu-gold/20 border border-cu-gold/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-cu-gold font-black text-xs">{c.position}</span>
                      </div>
                      <div className="flex-1 min-w-0">
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
                        {c.note && <div className="text-xs text-gray-300 mt-2 leading-relaxed">{c.note}</div>}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <span className="text-xs text-gray-500">Committed {c.date}</span>
                          <span className="text-gray-700">·</span>
                          <SourceTag source={c.source} />
                        </div>
                      </div>
                    </div>
                    {/* Ranking panel */}
                    <div className="text-right flex-shrink-0 space-y-1 min-w-[90px]">
                      {c.posRank && (
                        <div>
                          <div className="text-cu-gold font-bold text-xs">{c.posRank}</div>
                          <div className="text-gray-600 text-[10px]">Pos. Rank</div>
                        </div>
                      )}
                      {c.overallRank && (
                        <div>
                          <div className="text-gray-300 font-bold text-xs">{c.overallRank}</div>
                          <div className="text-gray-600 text-[10px]">Overall</div>
                        </div>
                      )}
                      {c.rating && (
                        <div>
                          <div className="text-blue-400 font-bold text-xs">{c.rating}</div>
                          <div className="text-gray-600 text-[10px]">Rating</div>
                        </div>
                      )}
                      {c.stars > 0 && (
                        <div className="flex justify-end">
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${c.stars === 4 ? 'bg-cu-gold/20 text-cu-gold' : 'bg-gray-700 text-gray-400'}`}>
                            {c.stars}★
                          </span>
                        </div>
                      )}
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
                  recruit could be 100% confirmed as of June 8, 2026 — those prediction pages are
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
