'use client';

// Note: This is a client component due to position filter interactivity
// Data fetching is done via server-side fetch inside the parent async component pattern

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Filter, Users } from 'lucide-react';

interface Athlete {
  id: string;
  displayName: string;
  jersey?: string;
  position?: { abbreviation: string; displayName: string };
  experience?: { displayValue: string };
  height?: string;
  weight?: number;
  birthPlace?: { city?: string; state?: string };
  headshot?: { href: string; alt?: string };
}

const POSITIONS = ['All', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K', 'P', 'LS'];

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-800">
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-700 rounded animate-pulse w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function RosterPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('All');

  useEffect(() => {
    fetch('https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/roster')
      .then(r => r.json())
      .then(data => {
        const all: Athlete[] = [];
        // ESPN roster API groups athletes by position group
        if (data.athletes) {
          for (const group of data.athletes) {
            if (group.items) {
              all.push(...group.items);
            }
          }
        }
        setAthletes(all);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filtered = selectedPosition === 'All'
    ? athletes
    : athletes.filter(a => a.position?.abbreviation === selectedPosition);

  // Group by position group for display
  const grouped = filtered.reduce<Record<string, Athlete[]>>((acc, a) => {
    const pos = a.position?.abbreviation || 'UNK';
    const group = getPositionGroup(pos);
    if (!acc[group]) acc[group] = [];
    acc[group].push(a);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">Roster</span> & Stats
        </h1>
        <p className="text-gray-400 mt-1">Colorado Buffaloes full roster — fetched live from ESPN</p>
      </div>

      {/* Filter bar */}
      <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Filter size={14} />
            <span className="font-medium">Filter by position:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POSITIONS.map(pos => (
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
          {!loading && (
            <span className="ml-auto text-gray-500 text-xs flex items-center gap-1">
              <Users size={12} />
              {filtered.length} players
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6 text-center text-red-400 mb-6">
          Unable to load roster from ESPN API. Please try again later.
        </div>
      )}

      {loading ? (
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
          <table className="w-full">
            <thead className="bg-cu-black/50">
              <tr>
                {['#', 'Player', 'Pos', 'Year', 'Height', 'Weight', 'Hometown'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs text-gray-500 font-bold uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }).map((_, i) => <SkeletonRow key={i} />)}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([group, players]) => (
            <div key={group} className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
              <div className="bg-cu-black/60 border-b border-cu-gold/20 px-4 py-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-cu-gold rounded-full" />
                <h2 className="font-black text-cu-gold text-sm uppercase tracking-wide">{group}</h2>
                <span className="ml-auto text-gray-500 text-xs">{players.length} players</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cu-black/30">
                    <tr>
                      {['#', 'Player', 'Pos', 'Year', 'Height', 'Weight', 'Hometown'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs text-gray-500 font-bold uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {players
                      .sort((a, b) => parseInt(a.jersey || '99') - parseInt(b.jersey || '99'))
                      .map((player, i) => (
                        <tr
                          key={player.id}
                          className={`border-b border-gray-800/50 hover:bg-cu-gold/5 transition-colors ${i % 2 === 0 ? '' : 'bg-black/20'}`}
                        >
                          <td className="px-4 py-3 text-cu-gold font-bold text-sm">
                            {player.jersey || '—'}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {player.headshot?.href && (
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                                  <Image
                                    src={player.headshot.href}
                                    alt={player.displayName}
                                    width={32}
                                    height={32}
                                    className="object-cover w-full h-full"
                                    unoptimized
                                  />
                                </div>
                              )}
                              <span className="text-white font-semibold text-sm whitespace-nowrap">
                                {player.displayName}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-bold bg-cu-gold/20 text-cu-gold px-2 py-0.5 rounded">
                              {player.position?.abbreviation || '—'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300 text-sm">
                            {player.experience?.displayValue || '—'}
                          </td>
                          <td className="px-4 py-3 text-gray-300 text-sm whitespace-nowrap">
                            {player.height || '—'}
                          </td>
                          <td className="px-4 py-3 text-gray-300 text-sm">
                            {player.weight ? `${player.weight} lbs` : '—'}
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                            {player.birthPlace?.city
                              ? `${player.birthPlace.city}${player.birthPlace.state ? `, ${player.birthPlace.state}` : ''}`
                              : '—'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getPositionGroup(pos: string): string {
  const groups: Record<string, string[]> = {
    'Quarterbacks': ['QB'],
    'Running Backs': ['RB', 'FB'],
    'Wide Receivers': ['WR'],
    'Tight Ends': ['TE'],
    'Offensive Line': ['OL', 'OT', 'OG', 'C', 'G', 'T'],
    'Defensive Line': ['DL', 'DT', 'DE', 'NT'],
    'Linebackers': ['LB', 'ILB', 'OLB', 'MLB', 'EDGE'],
    'Defensive Backs': ['CB', 'S', 'FS', 'SS', 'DB'],
    'Special Teams': ['K', 'P', 'LS', 'KR', 'PR'],
  };
  for (const [group, positions] of Object.entries(groups)) {
    if (positions.includes(pos)) return group;
  }
  return 'Other';
}
