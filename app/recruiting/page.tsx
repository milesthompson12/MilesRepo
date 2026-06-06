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

const targets2025: Target[] = [
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
  },
  {
    name: 'Javian Jones-Priest',
    position: 'RB',
    stars: 4,
    rating: 0.9012,
    hometown: 'Desoto',
    state: 'TX',
    height: '5\'10"',
    weight: 195,
    topSchools: ['Colorado', 'SMU', 'Oklahoma State', 'TCU'],
    cuInterest: 'High',
  },
  {
    name: 'Kameron Roberson',
    position: 'CB',
    stars: 4,
    rating: 0.8934,
    hometown: 'New Orleans',
    state: 'LA',
    height: '6\'0"',
    weight: 178,
    topSchools: ['Colorado', 'Houston', 'Vanderbilt', 'Iowa State'],
    cuInterest: 'High',
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
          <span className="text-cu-gold">2027</span> Recruiting Class
        </h1>
        <p className="text-gray-400 mt-1">Colorado Buffaloes commits, targets, and class rankings · as of June 6, 2026</p>
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
          <div className="text-3xl font-black text-green-400">#37</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">National Rank</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-blue-400">#6</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Big 12 Rank</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Commits List */}
        <div className="xl:col-span-3 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-cu-gold rounded-full inline-block" />
              2027 Commitments
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
                { label: '247Sports 2027 Commits', href: 'https://247sports.com/college/colorado/season/2027-football/commits/' },
                { label: 'On3 CU 2027 Class', href: 'https://www.on3.com/college/colorado-buffaloes/football/2027/industry-comparison-commits/' },
                { label: 'ESPN CU Recruiting', href: 'https://www.espn.com/college-sports/football/recruiting/school/_/id/38/class/2027' },
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
              <p>🔥 Class jumped to #37 nationally after big May–June push</p>
              <p>🌎 Every 2027 commit is from a different state — true national reach</p>
              <p>⭐ RB Kylan Bobo visiting June 12–14 with CU as frontrunner</p>
              <p>🎯 5-star CB Joshua Dobson offered — Texas A&M still leads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
