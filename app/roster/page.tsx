'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Filter, Users, ExternalLink, RefreshCw } from 'lucide-react';

interface Player {
  id?: string;
  jersey: string;
  name: string;
  position: string;
  positionGroup: string;
  year: string;
  height: string;
  weight: string;
  hometown: string;
  previousSchool?: string;
  headshot?: string;
}

// Official 2026 CU Buffaloes roster sourced from cubuffs.com
const OFFICIAL_ROSTER: Player[] = [
  // QUARTERBACKS
  { jersey: '1',  name: 'Julian "JuJu" Lewis',    position: 'QB', positionGroup: 'Quarterbacks',    year: 'SO',  height: '6\'1"',  weight: '195', hometown: 'Norcross, GA' },
  { jersey: '10', name: 'Isaac Wilson',            position: 'QB', positionGroup: 'Quarterbacks',    year: 'JR',  height: '6\'2"',  weight: '205', hometown: 'St. George, UT',   previousSchool: 'Utah' },
  { jersey: '12', name: 'Kaneal Sweetwyne',        position: 'QB', positionGroup: 'Quarterbacks',    year: 'FR',  height: '6\'3"',  weight: '208', hometown: 'Las Vegas, NV' },
  // RUNNING BACKS
  { jersey: '4',  name: 'Richard Young',           position: 'RB', positionGroup: 'Running Backs',   year: 'SO',  height: '5\'10"', weight: '199', hometown: 'Buford, GA',       previousSchool: 'Alabama' },
  { jersey: '5',  name: 'Cam Newton',              position: 'RB', positionGroup: 'Running Backs',   year: 'FR',  height: '5\'11"', weight: '200', hometown: 'Westlake Village, CA' },
  { jersey: '22', name: 'Damian Henderson II',     position: 'RB', positionGroup: 'Running Backs',   year: 'JR',  height: '5\'9"',  weight: '195', hometown: 'Las Vegas, NV',    previousSchool: 'Sacramento State' },
  { jersey: '25', name: 'Jaquail Smith',           position: 'RB', positionGroup: 'Running Backs',   year: 'JR',  height: '5\'10"', weight: '202', hometown: 'Lithonia, GA',     previousSchool: 'Sacramento State' },
  // WIDE RECEIVERS
  { jersey: '3',  name: 'Kam Perry',               position: 'WR', positionGroup: 'Wide Receivers',  year: 'SO',  height: '5\'11"', weight: '175', hometown: 'Plantation, FL' },
  { jersey: '6',  name: 'DeAndre Moore Jr.',       position: 'WR', positionGroup: 'Wide Receivers',  year: 'SO',  height: '5\'11"', weight: '185', hometown: 'Sachse, TX',       previousSchool: 'Texas' },
  { jersey: '8',  name: 'Joseph Williams',         position: 'WR', positionGroup: 'Wide Receivers',  year: 'JR',  height: '6\'1"',  weight: '185', hometown: 'Stone Mountain, GA' },
  { jersey: '11', name: 'Danny Scudero',           position: 'WR', positionGroup: 'Wide Receivers',  year: 'SR',  height: '5\'9"',  weight: '172', hometown: 'Fresno, CA',       previousSchool: 'San Jose State' },
  { jersey: '13', name: 'Hykeem Williams',         position: 'WR', positionGroup: 'Wide Receivers',  year: 'JR',  height: '5\'11"', weight: '178', hometown: 'Fort Lauderdale, FL' },
  { jersey: '15', name: 'Rodney Colton Jr.',       position: 'WR', positionGroup: 'Wide Receivers',  year: 'FR',  height: '6\'0"',  weight: '180', hometown: 'Baton Rouge, LA' },
  { jersey: '16', name: 'Ernest Campbell',         position: 'WR', positionGroup: 'Wide Receivers',  year: 'JR',  height: '6\'0"',  weight: '182', hometown: 'Daytona Beach, FL' },
  { jersey: '18', name: 'Jacob Swain',             position: 'WR', positionGroup: 'Wide Receivers',  year: 'FR',  height: '6\'2"',  weight: '188', hometown: 'Austin, TX' },
  // TIGHT ENDS
  { jersey: '85', name: 'Brady Russell',           position: 'TE', positionGroup: 'Tight Ends',      year: 'SO',  height: '6\'4"',  weight: '245', hometown: 'Bountiful, UT' },
  { jersey: '88', name: 'Zach Atkins',             position: 'TE', positionGroup: 'Tight Ends',      year: 'SR',  height: '6\'5"',  weight: '250', hometown: 'Scottsdale, AZ' },
  // OFFENSIVE LINE
  { jersey: '51', name: 'Caleb Krings',            position: 'C',  positionGroup: 'Offensive Line',  year: 'GR',  height: '6\'3"',  weight: '305', hometown: 'Katy, TX' },
  { jersey: '56', name: 'Gerad Christian-Lichtenhan', position: 'OG', positionGroup: 'Offensive Line', year: 'JR', height: '6\'5"', weight: '310', hometown: 'Phoenix, AZ' },
  { jersey: '60', name: 'Tyler Brown',             position: 'OG', positionGroup: 'Offensive Line',  year: 'JR',  height: '6\'3"',  weight: '295', hometown: 'San Diego, CA' },
  { jersey: '66', name: 'Andrew Coker',            position: 'OG', positionGroup: 'Offensive Line',  year: 'SR',  height: '6\'4"',  weight: '305', hometown: 'Atlanta, GA',      previousSchool: 'Georgia Tech' },
  { jersey: '72', name: 'Darius Hinton',           position: 'OT', positionGroup: 'Offensive Line',  year: 'FR',  height: '6\'5"',  weight: '295', hometown: 'Chandler, AZ' },
  { jersey: '73', name: 'Jake Wray',               position: 'OT', positionGroup: 'Offensive Line',  year: 'SR',  height: '6\'6"',  weight: '300', hometown: 'Chandler, AZ' },
  { jersey: '74', name: 'Jayvon McFadden',         position: 'OT', positionGroup: 'Offensive Line',  year: 'SO',  height: '6\'3"',  weight: '295', hometown: 'Columbus, OH',     previousSchool: 'Ohio State' },
  { jersey: '75', name: 'Savion Washington',       position: 'OT', positionGroup: 'Offensive Line',  year: 'SR',  height: '6\'5"',  weight: '308', hometown: 'Columbia, SC' },
  { jersey: '77', name: 'Frank Fillip',            position: 'OT', positionGroup: 'Offensive Line',  year: 'GR',  height: '6\'6"',  weight: '310', hometown: 'Southlake, TX' },
  // DEFENSIVE LINE
  { jersey: '41', name: 'Michael Closson',         position: 'DE', positionGroup: 'Defensive Line',  year: 'SO',  height: '6\'3"',  weight: '250', hometown: 'Houston, TX' },
  { jersey: '49', name: 'Jaylen Boots',            position: 'DE', positionGroup: 'Defensive Line',  year: 'SR',  height: '6\'3"',  weight: '255', hometown: 'Richmond, VA' },
  { jersey: '90', name: 'Lamar Smark',             position: 'DE', positionGroup: 'Defensive Line',  year: 'JR',  height: '6\'4"',  weight: '245', hometown: 'Tallahassee, FL' },
  { jersey: '91', name: 'Domata Peko Jr.',         position: 'DE', positionGroup: 'Defensive Line',  year: 'FR',  height: '6\'4"',  weight: '230', hometown: 'Calabasas, CA' },
  { jersey: '92', name: 'Jordan Domineck',         position: 'DT', positionGroup: 'Defensive Line',  year: 'GR',  height: '6\'3"',  weight: '290', hometown: 'Lawrenceville, GA' },
  { jersey: '93', name: 'Dashawn Belen',           position: 'DT', positionGroup: 'Defensive Line',  year: 'SR',  height: '6\'2"',  weight: '285', hometown: 'Las Vegas, NV' },
  { jersey: '94', name: 'Jaden Navarrette',        position: 'DE', positionGroup: 'Defensive Line',  year: 'JR',  height: '6\'4"',  weight: '250', hometown: 'Glendale, AZ' },
  { jersey: '95', name: 'D.J. Moore',              position: 'DT', positionGroup: 'Defensive Line',  year: 'SR',  height: '6\'2"',  weight: '298', hometown: 'Conway, SC',       previousSchool: 'Coastal Carolina' },
  { jersey: '97', name: 'Joseph Peko',             position: 'DT', positionGroup: 'Defensive Line',  year: 'FR',  height: '6\'3"',  weight: '280', hometown: 'Calabasas, CA' },
  { jersey: '99', name: 'Brandon Hopper',          position: 'DT', positionGroup: 'Defensive Line',  year: 'SR',  height: '6\'3"',  weight: '285', hometown: 'New Orleans, LA',  previousSchool: 'Tulane' },
  // LINEBACKERS
  { jersey: '21', name: 'Gideon Lampron',          position: 'LB', positionGroup: 'Linebackers',     year: 'SR',  height: '6\'2"',  weight: '228', hometown: 'Southlake, TX',    previousSchool: 'Florida Atlantic' },
  { jersey: '24', name: 'Liona Lefau',             position: 'LB', positionGroup: 'Linebackers',     year: 'SR',  height: '6\'1"',  weight: '225', hometown: 'Temecula, CA',     previousSchool: 'Temple' },
  { jersey: '37', name: 'Taje McCoy',              position: 'LB', positionGroup: 'Linebackers',     year: 'JR',  height: '6\'1"',  weight: '220', hometown: 'Mesquite, TX' },
  { jersey: '43', name: 'Carson Crawford',         position: 'LB', positionGroup: 'Linebackers',     year: 'FR',  height: '6\'4"',  weight: '220', hometown: 'Carthage, TX' },
  { jersey: '45', name: 'Tyler Martinez',          position: 'LB', positionGroup: 'Linebackers',     year: 'SR',  height: '6\'2"',  weight: '235', hometown: 'Albuquerque, NM',  previousSchool: 'Texas A&M' },
  // CORNERBACKS
  { jersey: '7',  name: 'Preston Hodge',           position: 'CB', positionGroup: 'Defensive Backs', year: 'JR',  height: '5\'11"', weight: '178', hometown: 'Buford, GA' },
  { jersey: '20', name: 'Cree Thomas',             position: 'CB', positionGroup: 'Defensive Backs', year: 'SR',  height: '5\'10"', weight: '172', hometown: 'Tallahassee, FL',  previousSchool: 'Sacramento State' },
  { jersey: '23', name: 'Jason Stokes Jr.',        position: 'CB', positionGroup: 'Defensive Backs', year: 'SO',  height: '5\'11"', weight: '175', hometown: 'Miami, FL' },
  { jersey: '26', name: 'Markari Vickers',         position: 'CB', positionGroup: 'Defensive Backs', year: 'JR',  height: '6\'0"',  weight: '178', hometown: 'Rockledge, FL' },
  { jersey: '28', name: 'Justin Eaglin',           position: 'CB', positionGroup: 'Defensive Backs', year: 'SR',  height: '5\'11"', weight: '175', hometown: 'DeSoto, TX',       previousSchool: 'Georgia Tech' },
  { jersey: '29', name: 'Emory Floyd',             position: 'CB', positionGroup: 'Defensive Backs', year: 'SO',  height: '6\'0"',  weight: '175', hometown: 'Carrollton, TX' },
  { jersey: '30', name: 'RJ Johnson',              position: 'CB', positionGroup: 'Defensive Backs', year: 'SO',  height: '5\'10"', weight: '170', hometown: 'Powder Springs, GA' },
  // SAFETIES
  { jersey: '2',  name: 'Boo Carter',              position: 'S',  positionGroup: 'Defensive Backs', year: 'JR',  height: '6\'0"',  weight: '190', hometown: 'Knoxville, TN',    previousSchool: 'Tennessee' },
  { jersey: '9',  name: 'Preston Ashley',          position: 'S',  positionGroup: 'Defensive Backs', year: 'FR',  height: '5\'10"', weight: '180', hometown: 'Brandon, MS' },
  { jersey: '14', name: 'Jah Jah Boyd',            position: 'S',  positionGroup: 'Defensive Backs', year: 'SR',  height: '6\'1"',  weight: '200', hometown: 'Lake City, FL',    previousSchool: 'Indiana' },
  { jersey: '19', name: 'Naeten Mitchell',         position: 'S',  positionGroup: 'Defensive Backs', year: 'SR',  height: '6\'0"',  weight: '195', hometown: 'Houston, TX',      previousSchool: 'Texas A&M' },
  { jersey: '31', name: 'Ben Fineseth',            position: 'S',  positionGroup: 'Defensive Backs', year: 'JR',  height: '6\'1"',  weight: '198', hometown: 'Scottsdale, AZ' },
  { jersey: '33', name: 'Randon Fontenette',       position: 'S',  positionGroup: 'Defensive Backs', year: 'SR',  height: '6\'0"',  weight: '200', hometown: 'Port Arthur, TX',  previousSchool: 'Texas A&M' },
  // SPECIALISTS
  { jersey: '47', name: 'CJ Velarde',              position: 'P',  positionGroup: 'Specialists',     year: 'JR',  height: '6\'2"',  weight: '205', hometown: 'Albuquerque, NM' },
  { jersey: '48', name: 'Luke Brauer',             position: 'P',  positionGroup: 'Specialists',     year: 'SO',  height: '6\'1"',  weight: '195', hometown: 'Denver, CO' },
  { jersey: '96', name: 'Alejandro Mata',          position: 'K',  positionGroup: 'Specialists',     year: 'GR',  height: '5\'11"', weight: '185', hometown: 'San Antonio, TX' },
  { jersey: '98', name: 'Cole Becker',             position: 'K',  positionGroup: 'Specialists',     year: 'JR',  height: '6\'0"',  weight: '190', hometown: 'Aurora, CO' },
];

const POSITION_FILTERS = ['All', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB', 'K/P'];

const POSITION_FILTER_MAP: Record<string, string[]> = {
  'QB': ['QB'],
  'RB': ['RB', 'FB'],
  'WR': ['WR'],
  'TE': ['TE'],
  'OL': ['OT', 'OG', 'C'],
  'DL': ['DE', 'DT', 'NT'],
  'LB': ['LB', 'ILB', 'OLB'],
  'DB': ['CB', 'S', 'FS', 'SS', 'DB'],
  'K/P': ['K', 'P', 'LS'],
};

interface EspnAthlete {
  id: string;
  displayName: string;
  jersey?: string;
  headshot?: { href: string };
}

function YearBadge({ year }: { year: string }) {
  const colors: Record<string, string> = {
    FR: 'bg-green-900/60 text-green-400',
    SO: 'bg-blue-900/60 text-blue-400',
    JR: 'bg-purple-900/60 text-purple-400',
    SR: 'bg-orange-900/60 text-orange-400',
    GR: 'bg-red-900/60 text-red-400',
  };
  return (
    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${colors[year] || 'bg-gray-700 text-gray-400'}`}>
      {year}
    </span>
  );
}

function PlayerAvatar({ name, headshot }: { name: string; headshot?: string }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  if (headshot) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex-shrink-0 border border-cu-gold/20">
        <Image src={headshot} alt={name} width={40} height={40} className="object-cover w-full h-full" unoptimized />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-cu-gold/20 border border-cu-gold/30 flex items-center justify-center flex-shrink-0">
      <span className="text-cu-gold text-xs font-black">{initials}</span>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-800">
      {Array.from({ length: 8 }).map((_, i) => (
        <td key={i} className="px-3 py-3">
          <div className="h-4 bg-gray-700 rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

export default function RosterPage() {
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [headshotMap, setHeadshotMap] = useState<Record<string, string>>({});
  const [loadingHeadshots, setLoadingHeadshots] = useState(true);

  // Fetch headshots from ESPN API and map by jersey number
  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/roster')
      .then(r => r.json())
      .then(data => {
        const map: Record<string, string> = {};
        const groups = (data.athletes || []) as { items?: EspnAthlete[] }[];
        for (const group of groups) {
          for (const p of group.items || []) {
            if (p.jersey && p.headshot?.href) {
              map[p.jersey] = p.headshot.href;
            }
          }
        }
        setHeadshotMap(map);
      })
      .catch(() => {})
      .finally(() => setLoadingHeadshots(false));
  }, []);

  const matchesFilter = (p: Player) => {
    if (selectedPosition === 'All') return true;
    const allowed = POSITION_FILTER_MAP[selectedPosition] || [selectedPosition];
    return allowed.includes(p.position);
  };

  const filtered = OFFICIAL_ROSTER.filter(matchesFilter);

  const grouped = filtered.reduce<Record<string, Player[]>>((acc, p) => {
    if (!acc[p.positionGroup]) acc[p.positionGroup] = [];
    acc[p.positionGroup].push(p);
    return acc;
  }, {});

  const GROUP_ORDER = ['Quarterbacks', 'Running Backs', 'Wide Receivers', 'Tight Ends', 'Offensive Line', 'Defensive Line', 'Linebackers', 'Defensive Backs', 'Specialists'];
  const sortedGroups = GROUP_ORDER.filter(g => grouped[g]);

  const transfers = OFFICIAL_ROSTER.filter(p => p.previousSchool);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-black text-white">
              <span className="text-cu-gold">2026</span> Roster
            </h1>
            <p className="text-gray-400 mt-1">Colorado Buffaloes · {OFFICIAL_ROSTER.length} players</p>
          </div>
          <a
            href="https://cubuffs.com/sports/football/roster"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cu-gold/10 border border-cu-gold/30 text-cu-gold text-sm font-semibold hover:bg-cu-gold/20 transition-colors"
          >
            <ExternalLink size={14} />
            Official Roster · cubuffs.com
          </a>
        </div>
      </div>

      {/* Transfer portal summary */}
      <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw size={14} className="text-cu-gold" />
          <span className="text-cu-gold font-bold text-sm uppercase tracking-wide">Transfer Portal Additions</span>
          <span className="ml-auto text-gray-500 text-xs">{transfers.length} transfers on roster</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {transfers.map(p => (
            <div key={p.jersey} className="flex items-center gap-2 bg-cu-black/50 rounded-lg px-3 py-1.5 border border-cu-gold/10">
              <span className="text-cu-gold font-bold text-xs">#{p.jersey}</span>
              <span className="text-white text-xs font-medium">{p.name}</span>
              <span className="text-gray-500 text-xs">{p.position}</span>
              <span className="text-gray-600 text-xs">← {p.previousSchool}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Filter size={14} />
            <span className="font-medium">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POSITION_FILTERS.map(pos => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedPosition === pos
                    ? 'bg-cu-gold text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
          <span className="ml-auto text-gray-500 text-xs flex items-center gap-1">
            <Users size={12} />
            {filtered.length} players
            {loadingHeadshots && <span className="text-gray-600 ml-1">(loading photos…)</span>}
          </span>
        </div>
      </div>

      {/* Roster tables by group */}
      <div className="space-y-6">
        {sortedGroups.map(group => (
          <div key={group} className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-cu-black/60 border-b border-cu-gold/20 px-4 py-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-cu-gold rounded-full" />
              <h2 className="font-black text-cu-gold text-sm uppercase tracking-wide">{group}</h2>
              <span className="ml-auto text-gray-500 text-xs">{grouped[group].length} players</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cu-black/30">
                  <tr>
                    {['#', 'Player', 'Pos', 'Year', 'Height', 'Weight', 'Hometown', 'Prev. School'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-xs text-gray-500 font-bold uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grouped[group]
                    .sort((a, b) => parseInt(a.jersey) - parseInt(b.jersey))
                    .map((player, i) => (
                      <tr
                        key={player.jersey}
                        className={`border-b border-gray-800/50 hover:bg-cu-gold/5 transition-colors ${i % 2 === 0 ? '' : 'bg-black/20'}`}
                      >
                        <td className="px-3 py-3 text-cu-gold font-black text-sm w-10">
                          {player.jersey}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <PlayerAvatar
                              name={player.name}
                              headshot={headshotMap[player.jersey]}
                            />
                            <span className="text-white font-semibold text-sm whitespace-nowrap">
                              {player.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-xs font-bold bg-cu-gold/20 text-cu-gold px-2 py-0.5 rounded">
                            {player.position}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <YearBadge year={player.year} />
                        </td>
                        <td className="px-3 py-3 text-gray-300 text-sm whitespace-nowrap">{player.height}</td>
                        <td className="px-3 py-3 text-gray-300 text-sm">{player.weight} lbs</td>
                        <td className="px-3 py-3 text-gray-400 text-sm whitespace-nowrap">{player.hometown}</td>
                        <td className="px-3 py-3">
                          {player.previousSchool ? (
                            <span className="text-xs px-2 py-0.5 rounded bg-blue-900/30 text-blue-400 border border-blue-700/30 whitespace-nowrap">
                              {player.previousSchool}
                            </span>
                          ) : (
                            <span className="text-gray-700 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 text-center text-gray-600 text-xs">
        Roster sourced from{' '}
        <a href="https://cubuffs.com/sports/football/roster" target="_blank" rel="noopener noreferrer" className="text-cu-gold/60 hover:text-cu-gold underline">
          cubuffs.com
        </a>
        {' '}· Player headshots loaded live from ESPN · Last updated June 6, 2026
      </div>
    </div>
  );
}
