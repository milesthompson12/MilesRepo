import { Shield, Zap, Star } from 'lucide-react';

interface DepthPlayer {
  name: string;
  number: string;
  year: string;
  note?: string;
}

interface DepthPosition {
  position: string;
  positionFull: string;
  players: DepthPlayer[];
}

const offensiveDepth: DepthPosition[] = [
  {
    position: 'QB',
    positionFull: 'Quarterback',
    players: [
      { name: 'Julian "JuJu" Lewis', number: '1', year: 'SO', note: 'Starter' },
      { name: 'Isaac Wilson', number: '10', year: 'JR', note: 'Transfer - Utah' },
      { name: 'Kaneal Sweetwyne', number: '12', year: 'FR' },
    ],
  },
  {
    position: 'RB',
    positionFull: 'Running Back',
    players: [
      { name: 'Richard Young', number: '4', year: 'SO', note: 'Transfer - Alabama' },
      { name: 'Damian Henderson II', number: '22', year: 'JR', note: 'Transfer - Sacramento State' },
      { name: 'Jaquail Smith', number: '25', year: 'JR', note: 'Transfer - Sacramento State' },
      { name: 'Cam Newton', number: '5', year: 'FR' },
    ],
  },
  {
    position: 'WR1',
    positionFull: 'Wide Receiver (X)',
    players: [
      { name: 'Danny Scudero', number: '11', year: 'SR', note: 'Transfer - San Jose State' },
      { name: 'Ernest Campbell', number: '16', year: 'JR' },
      { name: 'Jacob Swain', number: '18', year: 'FR' },
    ],
  },
  {
    position: 'WR2',
    positionFull: 'Wide Receiver (Z)',
    players: [
      { name: 'DeAndre Moore Jr.', number: '6', year: 'SO', note: 'Transfer - Texas' },
      { name: 'Hykeem Williams', number: '13', year: 'JR' },
      { name: 'Kam Perry', number: '3', year: 'SO' },
    ],
  },
  {
    position: 'WR3',
    positionFull: 'Slot Receiver (H)',
    players: [
      { name: 'Joseph Williams', number: '8', year: 'JR', note: 'Starter' },
      { name: 'Rodney Colton Jr.', number: '15', year: 'FR' },
    ],
  },
  {
    position: 'TE',
    positionFull: 'Tight End',
    players: [
      { name: 'Zach Atkins', number: '88', year: 'SR', note: 'Starter' },
      { name: 'Brady Russell', number: '85', year: 'SO' },
    ],
  },
  {
    position: 'LT',
    positionFull: 'Left Tackle',
    players: [
      { name: 'Jayvon McFadden', number: '74', year: 'SO', note: 'Transfer - Ohio State' },
      { name: 'Jake Wray', number: '73', year: 'SR' },
    ],
  },
  {
    position: 'LG',
    positionFull: 'Left Guard',
    players: [
      { name: 'Gerad Christian-Lichtenhan', number: '56', year: 'JR', note: 'Starter' },
      { name: 'Austin Smith', number: '53', year: 'SR' },
    ],
  },
  {
    position: 'C',
    positionFull: 'Center',
    players: [
      { name: 'Caleb Krings', number: '51', year: 'GR', note: 'Starter' },
      { name: 'Tyler Brown', number: '60', year: 'JR' },
    ],
  },
  {
    position: 'RG',
    positionFull: 'Right Guard',
    players: [
      { name: 'Andrew Coker', number: '66', year: 'SR', note: 'Transfer - Georgia Tech' },
      { name: 'Darius Hinton', number: '72', year: 'FR' },
    ],
  },
  {
    position: 'RT',
    positionFull: 'Right Tackle',
    players: [
      { name: 'Frank Fillip', number: '77', year: 'GR', note: 'Starter' },
      { name: 'Savion Washington', number: '75', year: 'SR' },
    ],
  },
];

const defensiveDepth: DepthPosition[] = [
  {
    position: 'EDGE',
    positionFull: 'Edge Rusher (L)',
    players: [
      { name: 'Domata Peko Jr.', number: '91', year: 'FR', note: '5-Star Signee' },
      { name: 'Jaden Navarrette', number: '94', year: 'JR' },
      { name: 'Lamar Smark', number: '90', year: 'JR' },
    ],
  },
  {
    position: 'DT',
    positionFull: 'Defensive Tackle (NT)',
    players: [
      { name: 'D.J. Moore', number: '95', year: 'SR', note: 'Transfer - Coastal Carolina' },
      { name: 'Joseph Peko', number: '97', year: 'FR' },
      { name: 'Dashawn Belen', number: '93', year: 'SR' },
    ],
  },
  {
    position: 'DT',
    positionFull: 'Defensive Tackle (3T)',
    players: [
      { name: 'Brandon Hopper', number: '99', year: 'SR', note: 'Transfer - Tulane' },
      { name: 'Jordan Domineck', number: '92', year: 'GR' },
    ],
  },
  {
    position: 'EDGE',
    positionFull: 'Edge Rusher (R)',
    players: [
      { name: 'Jaylen Boots', number: '49', year: 'SR', note: 'Starter' },
      { name: 'Michael Closson', number: '41', year: 'SO' },
    ],
  },
  {
    position: 'WILL',
    positionFull: 'Will Linebacker',
    players: [
      { name: 'Liona Lefau', number: '24', year: 'SR', note: 'Transfer — 60+ tkls in 2025' },
      { name: 'Carson Crawford', number: '43', year: 'FR', note: '5-Star Signee' },
      { name: 'Taje McCoy', number: '37', year: 'JR' },
    ],
  },
  {
    position: 'MIKE',
    positionFull: 'Mike Linebacker',
    players: [
      { name: 'Gideon Lampron', number: '21', year: 'SR', note: 'Transfer — 60+ tkls in 2025' },
      { name: 'Tyler Martinez', number: '45', year: 'SR', note: 'Transfer' },
    ],
  },
  {
    position: 'CB',
    positionFull: 'Cornerback (L)',
    players: [
      { name: 'Preston Hodge', number: '7', year: 'JR', note: 'Starter' },
      { name: 'RJ Johnson', number: '30', year: 'SO' },
      { name: 'Markari Vickers', number: '26', year: 'JR' },
    ],
  },
  {
    position: 'CB',
    positionFull: 'Cornerback (R)',
    players: [
      { name: 'Justin Eaglin', number: '28', year: 'SR', note: 'Transfer' },
      { name: 'Cree Thomas', number: '20', year: 'SR', note: 'Transfer' },
      { name: 'Jason Stokes Jr.', number: '23', year: 'SO' },
    ],
  },
  {
    position: 'FS',
    positionFull: 'Free Safety',
    players: [
      { name: 'Boo Carter', number: '2', year: 'JR', note: 'Transfer - Tennessee' },
      { name: 'Naeten Mitchell', number: '19', year: 'SR', note: 'Transfer' },
      { name: 'Ben Fineseth', number: '31', year: 'JR', note: 'Returner' },
    ],
  },
  {
    position: 'SS',
    positionFull: 'Strong Safety',
    players: [
      { name: 'Jah Jah Boyd', number: '14', year: 'SR', note: 'Transfer - Indiana' },
      { name: 'Randon Fontenette', number: '33', year: 'SR', note: 'Transfer' },
      { name: 'Preston Ashley', number: '9', year: 'FR', note: '5-Star Signee' },
    ],
  },
];

const specialTeamsDepth: DepthPosition[] = [
  {
    position: 'PK',
    positionFull: 'Placekicker',
    players: [
      { name: 'Alejandro Mata', number: '96', year: 'GR', note: 'Starter' },
      { name: 'Cole Becker', number: '98', year: 'JR' },
    ],
  },
  {
    position: 'P',
    positionFull: 'Punter',
    players: [
      { name: 'CJ Velarde', number: '47', year: 'JR', note: 'Starter' },
      { name: 'Luke Brauer', number: '48', year: 'SO' },
    ],
  },
  {
    position: 'KR',
    positionFull: 'Kick Returner',
    players: [
      { name: 'Richard Young', number: '4', year: 'SO', note: 'Starter' },
      { name: 'Kam Perry', number: '3', year: 'SO' },
    ],
  },
  {
    position: 'PR',
    positionFull: 'Punt Returner',
    players: [
      { name: 'Hykeem Williams', number: '13', year: 'JR', note: 'Starter' },
      { name: 'Danny Scudero', number: '11', year: 'SR' },
    ],
  },
];

function YearBadge({ year }: { year: string }) {
  const colors: Record<string, string> = {
    FR: 'bg-green-900/40 text-green-400',
    SO: 'bg-blue-900/40 text-blue-400',
    JR: 'bg-purple-900/40 text-purple-400',
    SR: 'bg-orange-900/40 text-orange-400',
    GR: 'bg-red-900/40 text-red-400',
  };
  return (
    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${colors[year] || 'bg-gray-700 text-gray-400'}`}>
      {year}
    </span>
  );
}

function DepthGroup({ group }: { group: DepthPosition }) {
  return (
    <div className="bg-cu-gray rounded-xl border border-cu-gold/10 hover:border-cu-gold/25 transition-all overflow-hidden">
      <div className="bg-cu-black/50 px-3 py-2 border-b border-cu-gold/10 flex items-center gap-2">
        <span className="text-cu-gold font-black text-xs uppercase tracking-wide w-10 flex-shrink-0">
          {group.position}
        </span>
        <span className="text-gray-500 text-xs">{group.positionFull}</span>
      </div>
      <div className="p-2 space-y-1">
        {group.players.map((player, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-lg ${i === 0 ? 'bg-cu-gold/5 border border-cu-gold/20' : ''}`}
          >
            <span className="text-xs text-gray-600 w-4 flex-shrink-0 font-bold">{i + 1}</span>
            <span className="text-cu-gold font-bold text-xs w-6 flex-shrink-0">#{player.number}</span>
            <span className={`text-sm font-medium flex-1 ${i === 0 ? 'text-white' : 'text-gray-400'}`}>
              {player.name}
            </span>
            <YearBadge year={player.year} />
            {player.note && i === 0 && (
              <span className="hidden md:block text-xs text-cu-gold/60 truncate max-w-[120px]">{player.note}</span>
            )}
            {i === 0 && (
              <Star size={10} className="text-cu-gold fill-cu-gold flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DepthChartPage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">Depth</span> Chart
        </h1>
        <p className="text-gray-400 mt-1">2026 Colorado Buffaloes projected starters and backups · as of June 2026</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 bg-cu-gray rounded-xl p-4 border border-cu-gold/20">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-8 h-4 rounded bg-cu-gold/5 border border-cu-gold/20" />
          <span>Starter (Row 1)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {['FR', 'SO', 'JR', 'SR', 'GR'].map(y => <YearBadge key={y} year={y} />)}
          <span>Year in program</span>
        </div>
        <div className="ml-auto text-xs text-gray-500 italic">
          * Projected depth chart — subject to change
        </div>
      </div>

      {/* Offense */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap size={18} className="text-cu-gold" />
          <span>Offense</span>
          <span className="text-xs text-gray-500 font-normal ml-1">— "Go Go Offense" (OC Brennan Marion)</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {offensiveDepth.map((group, i) => (
            <DepthGroup key={i} group={group} />
          ))}
        </div>
      </section>

      {/* Defense */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Shield size={18} className="text-cu-gold" />
          <span>Defense</span>
          <span className="text-xs text-gray-500 font-normal ml-1">— 4-2-5 Base</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {defensiveDepth.map((group, i) => (
            <DepthGroup key={i} group={group} />
          ))}
        </div>
      </section>

      {/* Special Teams */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Star size={18} className="text-cu-gold" />
          <span>Special Teams</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {specialTeamsDepth.map((group, i) => (
            <DepthGroup key={i} group={group} />
          ))}
        </div>
      </section>

      {/* Notes */}
      <div className="mt-8 bg-cu-gray rounded-xl border border-cu-gold/20 p-4">
        <h3 className="text-cu-gold font-bold text-sm mb-3">Notable Players — 2026</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div>
            <span className="text-white font-semibold">Julian "JuJu" Lewis #1</span> — Redshirt sophomore QB entering his first full year as starter. Posted 589 yds, 4 TDs, 0 INTs in limited 2025 action. Under OC Brennan Marion's "Go Go Offense."
          </div>
          <div>
            <span className="text-white font-semibold">Liona Lefau & Gideon Lampron</span> — Transfer LB duo each recorded 60+ tackles in 2025. Form the backbone of DC Chris Marve's revamped defense.
          </div>
          <div>
            <span className="text-white font-semibold">Danny Scudero #11</span> — Top-3 nationally ranked receiver (On3) transferred from San Jose State. Expected to be Lewis's go-to target in the slot-heavy "Go Go" scheme.
          </div>
        </div>
      </div>
    </div>
  );
}
