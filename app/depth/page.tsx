'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { rawRoster, YEAR_COLORS, getLastName, getInitials, RosterPlayer } from '@/lib/roster';

// ─── Types ────────────────────────────────────────────────────────────────────

type Side = 'offense' | 'defense';

interface Player extends RosterPlayer {
  posGroup: string;
}

// A depth-chart row: a named position backed by a roster position group.
interface RowDef {
  label: string;
  pos: string; // key into rawRoster
}

// ─── Player map ───────────────────────────────────────────────────────────────

const PLAYER_MAP: Record<string, Player> = (() => {
  const map: Record<string, Player> = {};
  for (const [posGroup, players] of Object.entries(rawRoster)) {
    for (const p of players) map[`${posGroup}-${p.rank}`] = { ...p, posGroup };
  }
  return map;
})();

// ─── Formation row layouts ────────────────────────────────────────────────────

const OFFENSE_FORMATIONS = ['Spread', 'Pistol', 'Pro Set', 'Trips', 'Empty'] as const;
const DEFENSE_FORMATIONS = ['4-2-5', '3-4', '4-3', 'Nickel', 'Dime'] as const;
type OffenseFormation = typeof OFFENSE_FORMATIONS[number];
type DefenseFormation = typeof DEFENSE_FORMATIONS[number];

const OL_ROWS: RowDef[] = [
  { label: 'LT', pos: 'OL' },
  { label: 'LG', pos: 'OL' },
  { label: 'C', pos: 'OL' },
  { label: 'RG', pos: 'OL' },
  { label: 'RT', pos: 'OL' },
];

const OFFENSE_ROWS: Record<OffenseFormation, RowDef[]> = {
  Spread: [
    { label: 'QB', pos: 'QB' }, { label: 'RB', pos: 'RB' },
    { label: 'WR (X)', pos: 'WR' }, { label: 'WR (Z)', pos: 'WR' }, { label: 'WR (Slot)', pos: 'WR' },
    { label: 'TE', pos: 'TE' }, ...OL_ROWS,
  ],
  Pistol: [
    { label: 'QB', pos: 'QB' }, { label: 'RB', pos: 'RB' },
    { label: 'WR (X)', pos: 'WR' }, { label: 'WR (Z)', pos: 'WR' }, { label: 'WR (Slot)', pos: 'WR' },
    { label: 'TE', pos: 'TE' }, ...OL_ROWS,
  ],
  'Pro Set': [
    { label: 'QB', pos: 'QB' }, { label: 'HB', pos: 'RB' }, { label: 'FB', pos: 'RB' },
    { label: 'WR (X)', pos: 'WR' }, { label: 'WR (Z)', pos: 'WR' },
    { label: 'TE', pos: 'TE' }, ...OL_ROWS,
  ],
  Trips: [
    { label: 'QB', pos: 'QB' }, { label: 'RB', pos: 'RB' },
    { label: 'WR (X)', pos: 'WR' }, { label: 'WR (Y)', pos: 'WR' },
    { label: 'WR (Z)', pos: 'WR' }, { label: 'WR (Slot)', pos: 'WR' },
    ...OL_ROWS,
  ],
  Empty: [
    { label: 'QB', pos: 'QB' },
    { label: 'WR (X)', pos: 'WR' }, { label: 'WR (Z)', pos: 'WR' }, { label: 'WR (Slot)', pos: 'WR' },
    { label: 'WR (4)', pos: 'WR' }, { label: 'WR (5)', pos: 'WR' },
    ...OL_ROWS,
  ],
};

const DEFENSE_ROWS: Record<DefenseFormation, RowDef[]> = {
  '4-2-5': [
    { label: 'DE', pos: 'DL' }, { label: 'DT', pos: 'DL' },
    { label: 'LB', pos: 'LB' },
    { label: 'CB', pos: 'CB' }, { label: 'NB (Nickel)', pos: 'CB' },
    { label: 'S', pos: 'S' },
  ],
  '3-4': [
    { label: 'DE', pos: 'DL' }, { label: 'NT', pos: 'DL' },
    { label: 'OLB', pos: 'LB' }, { label: 'ILB', pos: 'LB' },
    { label: 'CB', pos: 'CB' }, { label: 'S', pos: 'S' },
  ],
  '4-3': [
    { label: 'DE', pos: 'DL' }, { label: 'DT', pos: 'DL' },
    { label: 'LB', pos: 'LB' },
    { label: 'CB', pos: 'CB' }, { label: 'S', pos: 'S' },
  ],
  Nickel: [
    { label: 'DE', pos: 'DL' }, { label: 'DT', pos: 'DL' },
    { label: 'LB', pos: 'LB' },
    { label: 'CB', pos: 'CB' }, { label: 'NB (Nickel)', pos: 'CB' },
    { label: 'S', pos: 'S' },
  ],
  Dime: [
    { label: 'DE', pos: 'DL' }, { label: 'DT', pos: 'DL' },
    { label: 'LB', pos: 'LB' },
    { label: 'CB', pos: 'CB' }, { label: 'NB (Nickel)', pos: 'CB' }, { label: 'DB (Dime)', pos: 'CB' },
    { label: 'S', pos: 'S' },
  ],
};

const STRINGS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DepthPage() {
  const [side, setSide] = useState<Side>('offense');
  const [offenseFormation, setOffenseFormation] = useState<OffenseFormation>('Spread');
  const [defenseFormation, setDefenseFormation] = useState<DefenseFormation>('4-2-5');

  // Per-row ordering of player ids. Key: unique per side/formation/row index.
  // Lazily initialized from each position group's default rank order.
  const [order, setOrder] = useState<Record<string, string[]>>({});

  const formation = side === 'offense' ? offenseFormation : defenseFormation;
  const rows = side === 'offense'
    ? OFFENSE_ROWS[offenseFormation]
    : DEFENSE_ROWS[defenseFormation];

  function rowKey(idx: number, row: RowDef) {
    return `${side}|${formation}|${idx}|${row.label}`;
  }

  function getRowOrder(idx: number, row: RowDef): string[] {
    const key = rowKey(idx, row);
    if (order[key]) return order[key];
    return (rawRoster[row.pos] ?? [])
      .slice()
      .sort((a, b) => a.rank - b.rank)
      .map((p) => `${row.pos}-${p.rank}`);
  }

  function move(idx: number, row: RowDef, from: number, dir: -1 | 1) {
    const key = rowKey(idx, row);
    const list = getRowOrder(idx, row).slice();
    const to = from + dir;
    if (to < 0 || to >= list.length) return;
    [list[from], list[to]] = [list[to], list[from]];
    setOrder((prev) => ({ ...prev, [key]: list }));
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">Depth</span> Chart
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Move players up and down the depth chart &mdash; positions adjust to the selected formation
        </p>
      </div>

      {/* Side tabs */}
      <div className="flex gap-2 mb-4">
        {(['offense', 'defense'] as Side[]).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            className={`
              px-5 py-2 rounded-full font-bold text-sm capitalize transition-all
              ${side === s
                ? 'bg-cu-gold text-black shadow-lg shadow-cu-gold/30'
                : 'bg-cu-gray text-gray-400 hover:text-white border border-white/10'
              }
            `}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Formation selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(side === 'offense' ? OFFENSE_FORMATIONS : DEFENSE_FORMATIONS).map((f) => {
          const active = side === 'offense' ? offenseFormation === f : defenseFormation === f;
          return (
            <button
              key={f}
              onClick={() => {
                if (side === 'offense') setOffenseFormation(f as OffenseFormation);
                else setDefenseFormation(f as DefenseFormation);
              }}
              className={`
                px-3 py-1 rounded-lg text-xs font-bold border transition-all
                ${active
                  ? 'bg-cu-gold/20 border-cu-gold text-cu-gold'
                  : 'bg-cu-gray border-white/10 text-gray-400 hover:border-cu-gold/30 hover:text-cu-gold/70'
                }
              `}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Depth chart rows */}
      <div className="space-y-4">
        {rows.map((row, idx) => {
          const ids = getRowOrder(idx, row);
          return (
            <div key={rowKey(idx, row)} className="bg-cu-gray rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-white/10">
                <span className="text-cu-gold font-black text-sm tracking-wide">{row.label}</span>
                <span className="text-gray-600 text-[10px] uppercase tracking-wider">{row.pos}</span>
              </div>
              <div className="divide-y divide-white/5">
                {ids.map((pid, i) => {
                  const p = PLAYER_MAP[pid];
                  if (!p) return null;
                  return (
                    <div
                      key={pid}
                      className={`flex items-center gap-3 px-4 py-2 ${i === 0 ? 'bg-cu-gold/5' : ''}`}
                    >
                      <span className={`w-8 text-[10px] font-black ${i === 0 ? 'text-cu-gold' : 'text-gray-500'}`}>
                        {STRINGS[i] ?? `${i + 1}th`}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-cu-gold/20 border border-cu-gold/50 flex items-center justify-center font-black text-cu-gold text-[10px] flex-shrink-0">
                        {getInitials(p.name)}
                      </div>
                      <span className="text-cu-gold font-black text-xs w-8">#{p.number}</span>
                      <span className="text-white font-semibold text-sm flex-1 truncate">{p.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${YEAR_COLORS[p.year] ?? 'bg-gray-700 text-gray-400'}`}>
                        {p.year}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <button
                          onClick={() => move(idx, row, i, -1)}
                          disabled={i === 0}
                          className="text-gray-500 hover:text-cu-gold disabled:opacity-20 disabled:hover:text-gray-500 transition-colors"
                          aria-label="Move up"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button
                          onClick={() => move(idx, row, i, 1)}
                          disabled={i === ids.length - 1}
                          className="text-gray-500 hover:text-cu-gold disabled:opacity-20 disabled:hover:text-gray-500 transition-colors"
                          aria-label="Move down"
                        >
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                {ids.length === 0 && (
                  <div className="px-4 py-3 text-gray-600 text-xs italic">No players listed</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-gray-600 text-xs mt-6 italic">
        Use the &uarr;/&darr; arrows to promote or demote a player within each position.
        Switching formation changes which positions are shown (e.g., the 3-4 reveals a Nose Tackle).
      </p>
    </div>
  );
}
