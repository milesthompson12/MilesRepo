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
      { name: 'Shedeur Sanders', number: '2', year: 'SR', note: 'Starter' },
      { name: 'Taylen Green', number: '10', year: 'JR' },
      { name: 'Brendon Lewis', number: '12', year: 'SO' },
    ],
  },
  {
    position: 'RB',
    positionFull: 'Running Back',
    players: [
      { name: 'Dylan Edwards', number: '4', year: 'FR', note: 'Starter' },
      { name: 'Anthony Hankerson', number: '22', year: 'JR' },
      { name: 'Ashaad Clayton', number: '5', year: 'SO' },
    ],
  },
  {
    position: 'WR1',
    positionFull: 'Wide Receiver (X)',
    players: [
      { name: 'Travis Hunter', number: '12', year: 'JR', note: 'Starter / Heisman Candidate' },
      { name: 'Micah Mello', number: '16', year: 'FR' },
      { name: 'Deandre Moore Jr.', number: '18', year: 'FR' },
    ],
  },
  {
    position: 'WR2',
    positionFull: 'Wide Receiver (Z)',
    players: [
      { name: 'LaJohntay Wester', number: '6', year: 'FR', note: 'Starter' },
      { name: 'Jimmy Horn Jr.', number: '13', year: 'SR' },
      { name: 'Dimitri Stanley', number: '3', year: 'JR' },
    ],
  },
  {
    position: 'TE',
    positionFull: 'Tight End',
    players: [
      { name: 'Michael Harrison', number: '88', year: 'SR', note: 'Starter' },
      { name: 'Caleb Lohner', number: '84', year: 'SO' },
      { name: 'Brady Russell', number: '85', year: 'FR' },
    ],
  },
  {
    position: 'LT',
    positionFull: 'Left Tackle',
    players: [
      { name: 'Jordan Seaton', number: '74', year: 'FR', note: 'Starter / 5-Star' },
      { name: 'Jake Wray', number: '73', year: 'JR' },
    ],
  },
  {
    position: 'LG',
    positionFull: 'Left Guard',
    players: [
      { name: 'Tommy Brown', number: '75', year: 'SR', note: 'Starter' },
      { name: 'Gerad Christian-Lichtenhan', number: '56', year: 'SO' },
    ],
  },
  {
    position: 'C',
    positionFull: 'Center',
    players: [
      { name: 'Caleb Krings', number: '51', year: 'SR', note: 'Starter' },
      { name: 'Austin Smith', number: '53', year: 'JR' },
    ],
  },
  {
    position: 'RG',
    positionFull: 'Right Guard',
    players: [
      { name: 'Noah Cain', number: '66', year: 'SR', note: 'Starter' },
      { name: 'Tyler Brown', number: '60', year: 'SO' },
    ],
  },
  {
    position: 'RT',
    positionFull: 'Right Tackle',
    players: [
      { name: 'Frank Fillip', number: '77', year: 'SR', note: 'Starter' },
      { name: 'Savion Washington', number: '72', year: 'JR' },
    ],
  },
];

const defensiveDepth: DepthPosition[] = [
  {
    position: 'DE',
    positionFull: 'Defensive End (L)',
    players: [
      { name: 'Guy Thomas', number: '99', year: 'SR', note: 'Starter' },
      { name: 'Jaden Navarrette', number: '91', year: 'SO' },
      { name: 'Michael Closson', number: '49', year: 'FR' },
    ],
  },
  {
    position: 'DT',
    positionFull: 'Defensive Tackle',
    players: [
      { name: 'Alejandro Sherwood', number: '95', year: 'FR', note: 'Starter' },
      { name: 'Jordan Domineck', number: '93', year: 'SR' },
      { name: 'Dashawn Belen', number: '97', year: 'JR' },
    ],
  },
  {
    position: 'DE',
    positionFull: 'Defensive End (R)',
    players: [
      { name: 'Elijah Rushing', number: '8', year: 'SO', note: 'Starter' },
      { name: 'Jaylen Boots', number: '92', year: 'JR' },
      { name: 'Lamar Smark', number: '90', year: 'SO' },
    ],
  },
  {
    position: 'WILL',
    positionFull: 'Will Linebacker',
    players: [
      { name: 'Nikhai Hill-Green', number: '24', year: 'SR', note: 'Starter' },
      { name: 'Marcus McFarlane', number: '43', year: 'FR' },
      { name: 'Taje McCoy', number: '37', year: 'SO' },
    ],
  },
  {
    position: 'MIKE',
    positionFull: 'Mike Linebacker',
    players: [
      { name: 'Jeremiah Shakir', number: '21', year: 'SR', note: 'Starter' },
      { name: 'Vincent Adams Jr.', number: '41', year: 'JR' },
    ],
  },
  {
    position: 'CB',
    positionFull: 'Cornerback (L)',
    players: [
      { name: 'Travis Hunter', number: '12', year: 'JR', note: 'Starter / Two-Way' },
      { name: 'Cormani McClain', number: '7', year: 'FR' },
      { name: 'DJ McKinney', number: '25', year: 'SR' },
    ],
  },
  {
    position: 'CB',
    positionFull: 'Cornerback (R)',
    players: [
      { name: 'Omarion Cooper', number: '26', year: 'JR', note: 'Starter' },
      { name: 'Jayla Hinton', number: '30', year: 'SO' },
    ],
  },
  {
    position: 'FS',
    positionFull: 'Free Safety',
    players: [
      { name: 'Micah Welch', number: '31', year: 'FR', note: 'Starter' },
      { name: 'Isaiah Lewis', number: '19', year: 'SR' },
      { name: "Cam'Ron Kelly", number: '20', year: 'JR' },
    ],
  },
  {
    position: 'SS',
    positionFull: 'Strong Safety',
    players: [
      { name: 'KJ Hamler', number: '1', year: 'SR', note: 'Starter' },
      { name: 'Trevor Woods', number: '28', year: 'SO' },
    ],
  },
];

const specialTeamsDepth: DepthPosition[] = [
  {
    position: 'PK',
    positionFull: 'Placekicker',
    players: [
      { name: 'Alejandro Mata', number: '94', year: 'SR', note: 'Starter' },
      { name: 'Cole Becker', number: '96', year: 'SO' },
    ],
  },
  {
    position: 'P',
    positionFull: 'Punter',
    players: [
      { name: 'Ryan Stonehouse', number: '11', year: 'GR', note: 'Starter / All-American' },
      { name: 'CJ Velarde', number: '98', year: 'SO' },
    ],
  },
  {
    position: 'KR',
    positionFull: 'Kick Returner',
    players: [
      { name: 'Dylan Edwards', number: '4', year: 'FR', note: 'Starter' },
      { name: 'LaJohntay Wester', number: '6', year: 'FR' },
    ],
  },
  {
    position: 'PR',
    positionFull: 'Punt Returner',
    players: [
      { name: 'Travis Hunter', number: '12', year: 'JR', note: 'Starter' },
      { name: 'Jimmy Horn Jr.', number: '13', year: 'SR' },
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
        <p className="text-gray-400 mt-1">2025 Colorado Buffaloes projected starters and backups</p>
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
          <span className="text-xs text-gray-500 font-normal ml-1">— Air Raid / Spread</span>
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
        <h3 className="text-cu-gold font-bold text-sm mb-3">Notable Players</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div>
            <span className="text-white font-semibold">Travis Hunter #12</span> — Unique two-way starter (WR + CB). Heisman Trophy candidate, led all WRs in receiving yards while starting at cornerback.
          </div>
          <div>
            <span className="text-white font-semibold">Jordan Seaton #74</span> — 5-star OT recruit, enrolled early. Projected immediate starter at LT.
          </div>
          <div>
            <span className="text-white font-semibold">Ryan Stonehouse #11</span> — All-American punter, one of the best in college football history for hang time and distance.
          </div>
        </div>
      </div>
    </div>
  );
}
