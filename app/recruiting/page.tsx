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
    name: 'Micah Mello',
    position: 'WR',
    stars: 4,
    rating: 0.9012,
    hometown: 'Las Vegas',
    state: 'NV',
    height: '6\'1"',
    weight: 185,
    status: 'Committed',
    date: 'Jan 15, 2025',
    nationalRank: 87,
    positionRank: 12,
  },
  {
    name: 'Deandre Moore Jr.',
    position: 'WR',
    stars: 4,
    rating: 0.8945,
    hometown: 'Sachse',
    state: 'TX',
    height: '6\'0"',
    weight: 175,
    status: 'Committed',
    date: 'Mar 3, 2025',
    nationalRank: 112,
    positionRank: 18,
  },
  {
    name: 'Jordan Seaton',
    position: 'OT',
    stars: 5,
    rating: 0.9842,
    hometown: 'Cornelius',
    state: 'NC',
    height: '6\'6"',
    weight: 300,
    status: 'Enrolled',
    date: 'Dec 20, 2024',
    nationalRank: 4,
    positionRank: 1,
  },
  {
    name: 'Cormani McClain',
    position: 'CB',
    stars: 5,
    rating: 0.9788,
    hometown: 'Lakeland',
    state: 'FL',
    height: '6\'2"',
    weight: 170,
    status: 'Enrolled',
    date: 'Jan 3, 2025',
    nationalRank: 7,
    positionRank: 1,
  },
  {
    name: 'LaJohntay Wester',
    position: 'WR',
    stars: 4,
    rating: 0.8876,
    hometown: 'Lake Worth',
    state: 'FL',
    height: '5\'9"',
    weight: 160,
    status: 'Committed',
    date: 'Feb 14, 2025',
    nationalRank: 145,
    positionRank: 24,
  },
  {
    name: 'Dylan Edwards',
    position: 'RB',
    stars: 4,
    rating: 0.9102,
    hometown: 'Derby',
    state: 'KS',
    height: '5\'10"',
    weight: 190,
    status: 'Signed',
    date: 'Dec 18, 2024',
    nationalRank: 66,
    positionRank: 8,
  },
  {
    name: 'Micah Welch',
    position: 'S',
    stars: 4,
    rating: 0.8823,
    hometown: 'Duncanville',
    state: 'TX',
    height: '6\'1"',
    weight: 205,
    status: 'Committed',
    date: 'Apr 5, 2025',
    nationalRank: 162,
    positionRank: 15,
  },
  {
    name: 'Alejandro Sherwood',
    position: 'DL',
    stars: 3,
    rating: 0.8654,
    hometown: 'Denver',
    state: 'CO',
    height: '6\'4"',
    weight: 270,
    status: 'Committed',
    date: 'May 1, 2025',
    nationalRank: 234,
    positionRank: 42,
  },
  {
    name: 'Marcus McFarlane',
    position: 'LB',
    stars: 4,
    rating: 0.8934,
    hometown: 'Buford',
    state: 'GA',
    height: '6\'3"',
    weight: 225,
    status: 'Committed',
    date: 'Apr 22, 2025',
    nationalRank: 121,
    positionRank: 10,
  },
  {
    name: 'Isaiah Augustave',
    position: 'QB',
    stars: 4,
    rating: 0.9001,
    hometown: 'Miami',
    state: 'FL',
    height: '6\'2"',
    weight: 205,
    status: 'Committed',
    date: 'Mar 18, 2025',
    nationalRank: 98,
    positionRank: 9,
  },
];

const targets2025: Target[] = [
  {
    name: 'Bryce Underwood',
    position: 'QB',
    stars: 5,
    rating: 0.9956,
    hometown: 'Belleville',
    state: 'MI',
    height: '6\'4"',
    weight: 210,
    topSchools: ['Michigan', 'Ohio State', 'Colorado', 'Alabama'],
    cuInterest: 'High',
  },
  {
    name: 'Dakorien Moore',
    position: 'WR',
    stars: 5,
    rating: 0.9701,
    hometown: 'Longview',
    state: 'TX',
    height: '6\'1"',
    weight: 180,
    topSchools: ['Texas', 'LSU', 'Colorado', 'Georgia'],
    cuInterest: 'High',
  },
  {
    name: 'Elijah Rushing',
    position: 'EDGE',
    stars: 5,
    rating: 0.9845,
    hometown: 'Tucson',
    state: 'AZ',
    height: '6\'5"',
    weight: 235,
    topSchools: ['Oregon', 'Ohio State', 'Colorado', 'Penn State'],
    cuInterest: 'Medium',
  },
  {
    name: 'KJ Bolden',
    position: 'S',
    stars: 5,
    rating: 0.9723,
    hometown: 'Buford',
    state: 'GA',
    height: '6\'1"',
    weight: 195,
    topSchools: ['Georgia', 'Ohio State', 'Colorado', 'Alabama'],
    cuInterest: 'Offered',
  },
  {
    name: 'Jonah Williams',
    position: 'OT',
    stars: 4,
    rating: 0.9234,
    hometown: 'Chandler',
    state: 'AZ',
    height: '6\'7"',
    weight: 310,
    topSchools: ['Colorado', 'Utah', 'USC', 'Arizona State'],
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
          <span className="text-cu-gold">2025</span> Recruiting Class
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
          <div className="text-3xl font-black text-green-400">#14</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">National Rank</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-blue-400">#3</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Big 12 Rank</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Commits List */}
        <div className="xl:col-span-3 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cu-gold rounded-full inline-block" />
              2025 Commitments
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
              <p>🔥 Colorado moving up in national rankings after big spring visit weekend</p>
              <p>⭐ 5-star OT Jordan Seaton enrolled early — projected starter</p>
              <p>📍 Strong in-state push for Colorado prep talent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
