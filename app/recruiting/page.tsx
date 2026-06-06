import { Star, MapPin, TrendingUp, Users, Award, ExternalLink } from 'lucide-react';

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
  profileUrl?: string;
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
}

const commits2025: Commit[] = [
  {
    name: 'Domata Peko Jr.',
    position: 'EDGE',
    stars: 5,
    rating: 0.9105,
    hometown: 'Calabasas',
    state: 'CA',
    height: '6\'4"',
    weight: 230,
    status: 'Signed',
    date: 'Dec 4, 2025',
    nationalRank: 38,
    positionRank: 5,
  },
  {
    name: 'Carson Crawford',
    position: 'LB',
    stars: 5,
    rating: 0.8962,
    hometown: 'Carthage',
    state: 'TX',
    height: '6\'4"',
    weight: 220,
    status: 'Signed',
    date: 'Dec 4, 2025',
    nationalRank: 52,
    positionRank: 4,
  },
  {
    name: 'Preston Ashley',
    position: 'S',
    stars: 5,
    rating: 0.8935,
    hometown: 'Brandon',
    state: 'MS',
    height: '5\'10"',
    weight: 180,
    status: 'Signed',
    date: 'Dec 4, 2025',
    nationalRank: 61,
    positionRank: 6,
  },
  {
    name: 'Rodney Colton Jr.',
    position: 'WR',
    stars: 4,
    rating: 0.8876,
    hometown: 'Baton Rouge',
    state: 'LA',
    height: '6\'0"',
    weight: 180,
    status: 'Signed',
    date: 'Feb 4, 2026',
    nationalRank: 148,
    positionRank: 22,
  },
  {
    name: 'Cam Newton',
    position: 'RB',
    stars: 4,
    rating: 0.8812,
    hometown: 'Westlake Village',
    state: 'CA',
    height: '5\'11"',
    weight: 200,
    status: 'Enrolled',
    date: 'Feb 4, 2026',
    nationalRank: 167,
    positionRank: 19,
  },
  {
    name: 'Jacob Swain',
    position: 'WR',
    stars: 4,
    rating: 0.8791,
    hometown: 'Austin',
    state: 'TX',
    height: '6\'2"',
    weight: 188,
    status: 'Enrolled',
    date: 'Feb 4, 2026',
    nationalRank: 174,
    positionRank: 26,
  },
  {
    name: 'Kaneal Sweetwyne',
    position: 'QB',
    stars: 4,
    rating: 0.8956,
    hometown: 'Las Vegas',
    state: 'NV',
    height: '6\'3"',
    weight: 208,
    status: 'Enrolled',
    date: 'Dec 4, 2025',
    nationalRank: 95,
    positionRank: 8,
  },
  {
    name: 'Joseph Peko',
    position: 'DL',
    stars: 3,
    rating: 0.8634,
    hometown: 'Calabasas',
    state: 'CA',
    height: '6\'3"',
    weight: 280,
    status: 'Signed',
    date: 'Jan 9, 2026',
    nationalRank: 298,
    positionRank: 44,
  },
  {
    name: 'Trey Marshall',
    position: 'CB',
    stars: 3,
    rating: 0.8701,
    hometown: 'Miami',
    state: 'FL',
    height: '6\'0"',
    weight: 175,
    status: 'Signed',
    date: 'Dec 18, 2025',
    nationalRank: 247,
    positionRank: 38,
  },
  {
    name: 'Darius Hinton',
    position: 'OT',
    stars: 3,
    rating: 0.8589,
    hometown: 'Chandler',
    state: 'AZ',
    height: '6\'5"',
    weight: 295,
    status: 'Signed',
    date: 'Feb 4, 2026',
    nationalRank: 312,
    positionRank: 48,
  },
];

const targets2025: Target[] = [
  {
    name: 'Marcus Fieulleteau',
    position: 'WR',
    stars: 5,
    rating: 0.9712,
    hometown: 'West Palm Beach',
    state: 'FL',
    height: '6\'2"',
    weight: 185,
    topSchools: ['Colorado', 'Ohio State', 'Georgia', 'Alabama'],
    cuInterest: 'High',
  },
  {
    name: 'Elijah Griffin',
    position: 'DL',
    stars: 5,
    rating: 0.9688,
    hometown: 'Savannah',
    state: 'GA',
    height: '6\'4"',
    weight: 265,
    topSchools: ['Georgia', 'Colorado', 'Alabama', 'Texas'],
    cuInterest: 'High',
  },
  {
    name: 'Nathaniel Owusu-Boateng',
    position: 'CB',
    stars: 5,
    rating: 0.9634,
    hometown: 'Powder Springs',
    state: 'GA',
    height: '6\'1"',
    weight: 178,
    topSchools: ['Georgia', 'Ohio State', 'Colorado', 'LSU'],
    cuInterest: 'Medium',
  },
  {
    name: 'Savion Hiter',
    position: 'RB',
    stars: 4,
    rating: 0.9145,
    hometown: 'Daytona Beach',
    state: 'FL',
    height: '5\'11"',
    weight: 210,
    topSchools: ['Colorado', 'Florida', 'Georgia Tech', 'Tennessee'],
    cuInterest: 'High',
  },
  {
    name: 'Keelan Marion',
    position: 'WR',
    stars: 4,
    rating: 0.9023,
    hometown: 'Las Vegas',
    state: 'NV',
    height: '6\'1"',
    weight: 182,
    topSchools: ['Colorado', 'UNLV', 'Utah', 'Arizona State'],
    cuInterest: 'High',
  },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < stars ? 'text-cu-gold fill-cu-gold' : 'text-gray-600'}
        />
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
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

function InterestBadge({ level }: { level: Target['cuInterest'] }) {
  const styles = {
    High: 'bg-green-900/40 text-green-400 border border-green-700/40',
    Medium: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40',
    Offered: 'bg-blue-900/40 text-blue-400 border border-blue-700/40',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles[level]}`}>
      {level} Interest
    </span>
  );
}

export default function RecruitingPage() {
  const avgStars = (commits2025.reduce((s, c) => s + c.stars, 0) / commits2025.length).toFixed(1);
  const fiveStars = commits2025.filter(c => c.stars === 5).length;
  const fourStars = commits2025.filter(c => c.stars === 4).length;
  const threeStars = commits2025.filter(c => c.stars === 3).length;

  const byPosition = commits2025.reduce<Record<string, number>>((acc, c) => {
    acc[c.position] = (acc[c.position] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">2026</span> Recruiting Class
        </h1>
        <p className="text-gray-400 mt-1">Colorado Buffaloes commits, targets, and class rankings</p>
      </div>

      {/* Class Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{commits2025.length}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Total Commits</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{avgStars}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Avg Stars</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-green-400">#67</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">National Rank</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-blue-400">#15</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Big 12 Rank</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Commits List */}
        <div className="xl:col-span-3 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cu-gold rounded-full inline-block" />
              2026 Commitments
            </h2>
            <div className="space-y-3">
              {commits2025.map((commit, i) => (
                <div
                  key={i}
                  className="bg-cu-gray rounded-xl border border-cu-gold/10 hover:border-cu-gold/40 transition-all p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Position Badge */}
                      <div className="w-12 h-12 rounded-lg bg-cu-gold/20 border border-cu-gold/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-cu-gold font-black text-sm">{commit.position}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold">{commit.name}</span>
                          <StatusBadge status={commit.status} />
                        </div>
                        <StarRating stars={commit.stars} />
                        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                          <MapPin size={10} />
                          <span>{commit.hometown}, {commit.state}</span>
                          <span className="mx-1">·</span>
                          <span>{commit.height} / {commit.weight} lbs</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Committed {commit.date}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-cu-gold font-black text-lg">{commit.rating.toFixed(4)}</div>
                      <div className="text-gray-500 text-xs">Natl #{commit.nationalRank}</div>
                      <div className="text-gray-500 text-xs">{commit.position} #{commit.positionRank}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Targets Section */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-400 rounded-full inline-block" />
              Top Targets
            </h2>
            <div className="space-y-3">
              {targets2025.map((target, i) => (
                <div
                  key={i}
                  className="bg-cu-gray rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-black text-sm">{target.position}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold">{target.name}</span>
                          <InterestBadge level={target.cuInterest} />
                        </div>
                        <StarRating stars={target.stars} />
                        <div className="flex items-center gap-1 mt-1 text-gray-400 text-xs">
                          <MapPin size={10} />
                          <span>{target.hometown}, {target.state}</span>
                          <span className="mx-1">·</span>
                          <span>{target.height} / {target.weight} lbs</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          <span className="text-gray-500 text-xs">Top schools:</span>
                          {target.topSchools.map((school, j) => (
                            <span
                              key={j}
                              className={`text-xs px-1.5 py-0.5 rounded ${school === 'Colorado' ? 'bg-cu-gold/20 text-cu-gold font-bold' : 'bg-gray-700 text-gray-400'}`}
                            >
                              {school}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-white font-black text-lg">{target.rating.toFixed(4)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
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
                  <div className="flex gap-0.5 w-16 flex-shrink-0">
                    {Array.from({ length: row.stars }).map((_, i) => (
                      <Star key={i} size={10} className="text-cu-gold fill-cu-gold" />
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div
                      className={`${row.color} h-2 rounded-full`}
                      style={{ width: `${(row.count / commits2025.length) * 100}%` }}
                    />
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

          {/* External Links */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide">Recruiting Sites</h3>
            </div>
            <div className="p-2">
              {[
                { label: '247Sports CU Football', href: 'https://247sports.com/college/colorado/football/' },
                { label: 'On3 CU Recruiting', href: 'https://www.on3.com/teams/colorado-buffaloes/football/recruiting/' },
                { label: 'ESPN CU Recruiting', href: 'https://www.espn.com/college-football/team/recruiting/_/id/38' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-cu-gold/10 group transition-colors"
                >
                  <span className="text-sm text-gray-300 group-hover:text-white">{link.label}</span>
                  <ExternalLink size={12} className="text-cu-gold" />
                </a>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide flex items-center gap-2">
                <TrendingUp size={14} />
                Recruiting Buzz
              </h3>
            </div>
            <div className="p-4 space-y-2 text-xs text-gray-400">
              <p>🔥 3 five-stars signed: Peko Jr., Crawford, Ashley lead class</p>
              <p>🏈 56 total additions between portal + high school in 2026</p>
              <p>📍 56% of class from out of state; coaching staff ties driving South/Southeast pipeline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
