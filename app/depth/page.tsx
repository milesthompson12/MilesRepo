'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { rawRoster, DL_ROLES, YEAR_COLORS, getInitials } from '@/lib/roster';

// ─── Types ────────────────────────────────────────────────────────────────────

type Side = 'offense' | 'defense';

interface Player {
  name: string; number: string; year: string; rank: number; posGroup: string;
}

// RowDef.pos can be a rawRoster key (QB, RB, WR, TE, OL, LB, CB, S)
// or a DL sub-role: 'DE', 'DT', 'NT' (filtered from rawRoster.DL)
interface RowDef {
  label: string;
  pos: string;
}

// ─── Player map ───────────────────────────────────────────────────────────────

const PLAYER_MAP: Record<string, Player> = (() => {
  const map: Record<string, Player> = {};
  for (const [posGroup, players] of Object.entries(rawRoster)) {
    for (const p of players) map[`${posGroup}-${p.rank}`] = { ...p, posGroup };
  }
  return map;
})();

// Return sorted player ids for a given row pos.
// DE/DT/NT are filtered subsets of rawRoster.DL.
function playersForPos(pos: string): string[] {
  if (pos === 'DE' || pos === 'DT' || pos === 'NT') {
    return (rawRoster['DL'] ?? [])
      .filter((p) => DL_ROLES[p.name] === pos)
      .sort((a, b) => a.rank - b.rank)
      .map((p) => `DL-${p.rank}`);
  }
  return (rawRoster[pos] ?? [])
    .sort((a, b) => a.rank - b.rank)
    .map((p) => `${pos}-${p.rank}`);
}

// ─── Formation row layouts ────────────────────────────────────────────────────

const OFFENSE_FORMATIONS = ['Spread', 'Pistol', 'Pro Set', 'Trips', 'Empty'] as const;
const DEFENSE_FORMATIONS = ['4-2-5', '3-4', '4-3', 'Nickel', 'Dime'] as const;
type OffenseFormation = typeof OFFENSE_FORMATIONS[number];
type DefenseFormation = typeof DEFENSE_FORMATIONS[number];

const OL_ROWS: RowDef[] = [
  { label: 'LT', pos: 'OL' },
  { label: 'LG', pos: 'OL' },
  { label: 'C',  pos: 'OL' },
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
    { label: 'RDE', pos: 'DE' }, { label: 'LDE', pos: 'DE' },
    { label: 'RDT', pos: 'DT' }, { label: 'LDT', pos: 'DT' },
    { label: 'LB (Mike)', pos: 'LB' }, { label: 'LB (Will)', pos: 'LB' },
    { label: 'CB (Left)', pos: 'CB' }, { label: 'NB (Nickel)', pos: 'CB' },
    { label: 'S (Free)', pos: 'S' },
  ],
  '3-4': [
    { label: 'RDE', pos: 'DE' }, { label: 'LDE', pos: 'DE' },
    { label: 'NT', pos: 'NT' },
    { label: 'OLB (Rush)', pos: 'LB' }, { label: 'OLB (Sam)', pos: 'LB' },
    { label: 'ILB (Mike)', pos: 'LB' }, { label: 'ILB (Will)', pos: 'LB' },
    { label: 'CB (Left)', pos: 'CB' }, { label: 'CB (Right)', pos: 'CB' },
    { label: 'S (Free)', pos: 'S' }, { label: 'S (Strong)', pos: 'S' },
  ],
  '4-3': [
    { label: 'RDE', pos: 'DE' }, { label: 'LDE', pos: 'DE' },
    { label: 'RDT', pos: 'DT' }, { label: 'LDT', pos: 'DT' },
    { label: 'WLB', pos: 'LB' }, { label: 'MLB', pos: 'LB' }, { label: 'SLB', pos: 'LB' },
    { label: 'CB (Left)', pos: 'CB' }, { label: 'CB (Right)', pos: 'CB' },
    { label: 'S (Free)', pos: 'S' }, { label: 'S (Strong)', pos: 'S' },
  ],
  Nickel: [
    { label: 'RDE', pos: 'DE' }, { label: 'LDE', pos: 'DE' },
    { label: 'RDT', pos: 'DT' }, { label: 'LDT', pos: 'DT' },
    { label: 'LB (Mike)', pos: 'LB' }, { label: 'LB (Will)', pos: 'LB' },
    { label: 'CB (Left)', pos: 'CB' }, { label: 'CB (Right)', pos: 'CB' },
    { label: 'NB (Nickel)', pos: 'CB' },
    { label: 'S (Free)', pos: 'S' },
  ],
  Dime: [
    { label: 'RDE', pos: 'DE' }, { label: 'LDE', pos: 'DE' },
    { label: 'RDT', pos: 'DT' }, { label: 'LDT', pos: 'DT' },
    { label: 'LB (Mike)', pos: 'LB' },
    { label: 'CB (Left)', pos: 'CB' }, { label: 'CB (Right)', pos: 'CB' },
    { label: 'NB (Nickel)', pos: 'CB' }, { label: 'DB (Dime)', pos: 'CB' },
    { label: 'S (Free)', pos: 'S' },
  ],
};

const STRINGS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DepthPage() {
  const [side, setSide] = useState<Side>('offense');
  const [offenseFormation, setOffenseFormation] = useState<OffenseFormation>('Spread');
  const [defenseFormation, setDefenseFormation] = useState<DefenseFormation>('4-2-5');

  // Per-row ordering: key = `${side}|${formation}|${rowIdx}|${label}` → pid[]
  const [order, setOrder] = useState<Record<string, string[]>>({});

  const formation = side === 'offense' ? offenseFormation : defenseFormation;
  const rows = side === 'offense' ? OFFENSE_ROWS[offenseFormation] : DEFENSE_ROWS[defenseFormation];

  function rowKey(idx: number, row: RowDef) {
    return `${side}|${formation}|${idx}|${row.label}`;
  }

  function getRowOrder(idx: number, row: RowDef): string[] {
    const key = rowKey(idx, row);
    return order[key] ?? playersForPos(row.pos);
  }

  function move(idx: number, row: RowDef, from: number, dir: -1 | 1) {
    const key = rowKey(idx, row);
    // Only allow moving among non-blocked players (the regular segment)
    const allIds = getRowOrder(idx, row);
    const blockedSet = computeBlocked(idx, row.pos);
    const regularIds = allIds.filter((pid) => !blockedSet.has(pid));
    const to = from + dir;
    if (to < 0 || to >= regularIds.length) return;
    const newRegular = [...regularIds];
    [newRegular[from], newRegular[to]] = [newRegular[to], newRegular[from]];
    // Reconstruct full order: new regular ids + blocked ids at end (in original order)
    const blockedIds = allIds.filter((pid) => blockedSet.has(pid));
    setOrder((prev) => ({ ...prev, [key]: [...newRegular, ...blockedIds] }));
  }

  // Compute which pids are "blocked" in row `rowIdx` (starters in another row of same pool)
  function computeBlocked(rowIdx: number, pos: string): Set<string> {
    const blocked = new Set<string>();
    rows.forEach((otherRow, otherIdx) => {
      if (otherIdx !== rowIdx && otherRow.pos === pos) {
        const othersOrder = getRowOrder(otherIdx, otherRow);
        // Non-blocked starter of the other row
        const otherBlocked = new Set<string>();
        rows.forEach((r2, i2) => {
          if (i2 !== otherIdx && r2.pos === pos) {
            const o2 = getRowOrder(i2, r2);
            const o2Regular = o2.filter((p) => !otherBlocked.has(p));
            if (o2Regular[0]) otherBlocked.add(o2Regular[0]);
          }
        });
        const otherRegular = othersOrder.filter((p) => !otherBlocked.has(p));
        if (otherRegular[0]) blocked.add(otherRegular[0]);
      }
    });
    return blocked;
  }

  // Build: pid -> label of row where they start (for "Starting at X" badge)
  function buildStarterLabels(): Record<string, string> {
    const labels: Record<string, string> = {};
    // Group rows by pos pool
    const poolRows: Record<string, number[]> = {};
    rows.forEach((row, idx) => {
      if (!poolRows[row.pos]) poolRows[row.pos] = [];
      poolRows[row.pos].push(idx);
    });
    for (const rowIndices of Object.values(poolRows)) {
      // Iteratively find starters: for each row in pool, the starter is the first non-blocked player
      const claimed = new Set<string>();
      rowIndices.forEach((rowIdx) => {
        const ids = getRowOrder(rowIdx, rows[rowIdx]);
        const starter = ids.find((pid) => !claimed.has(pid));
        if (starter) {
          claimed.add(starter);
          labels[starter] = rows[rowIdx].label;
        }
      });
    }
    return labels;
  }

  const starterLabels = buildStarterLabels();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">Depth</span> Chart
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Move players up and down &mdash; formation selection adjusts positions (3-4 reveals NT, etc.)
        </p>
      </div>

      {/* Side tabs */}
      <div className="flex gap-2 mb-4">
        {(['offense', 'defense'] as Side[]).map((s) => (
          <button key={s} onClick={() => setSide(s)}
            className={`px-5 py-2 rounded-full font-bold text-sm capitalize transition-all ${
              side === s ? 'bg-cu-gold text-black shadow-lg shadow-cu-gold/30'
                        : 'bg-cu-gray text-gray-400 hover:text-white border border-white/10'
            }`}
          >{s}</button>
        ))}
      </div>

      {/* Formation selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(side === 'offense' ? OFFENSE_FORMATIONS : DEFENSE_FORMATIONS).map((f) => {
          const active = side === 'offense' ? offenseFormation === f : defenseFormation === f;
          return (
            <button key={f} onClick={() => {
              if (side === 'offense') setOffenseFormation(f as OffenseFormation);
              else setDefenseFormation(f as DefenseFormation);
            }}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                active ? 'bg-cu-gold/20 border-cu-gold text-cu-gold'
                       : 'bg-cu-gray border-white/10 text-gray-400 hover:border-cu-gold/30 hover:text-cu-gold/70'
              }`}
            >{f}</button>
          );
        })}
      </div>

      {/* Depth chart rows */}
      <div className="space-y-4">
        {rows.map((row, idx) => {
          const allIds = getRowOrder(idx, row);
          const blockedSet = computeBlocked(idx, row.pos);
          const regularIds = allIds.filter((pid) => !blockedSet.has(pid));
          const blockedIds = allIds.filter((pid) => blockedSet.has(pid));

          return (
            <div key={rowKey(idx, row)} className="bg-cu-gray rounded-xl border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-white/10">
                <span className="text-cu-gold font-black text-sm tracking-wide">{row.label}</span>
                <span className="text-gray-600 text-[10px] uppercase tracking-wider">{row.pos}</span>
              </div>
              <div className="divide-y divide-white/5">
                {/* Regular (non-blocked) players */}
                {regularIds.map((pid, i) => {
                  const p = PLAYER_MAP[pid];
                  if (!p) return null;
                  return (
                    <div key={pid} className={`flex items-center gap-3 px-4 py-2 ${i === 0 ? 'bg-cu-gold/5' : ''}`}>
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
                        <button onClick={() => move(idx, row, i, -1)} disabled={i === 0}
                          className="text-gray-500 hover:text-cu-gold disabled:opacity-20 disabled:hover:text-gray-500 transition-colors">
                          <ChevronUp size={16} />
                        </button>
                        <button onClick={() => move(idx, row, i, 1)} disabled={i === regularIds.length - 1}
                          className="text-gray-500 hover:text-cu-gold disabled:opacity-20 disabled:hover:text-gray-500 transition-colors">
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Blocked players — greyed out at the bottom */}
                {blockedIds.map((pid) => {
                  const p = PLAYER_MAP[pid];
                  if (!p) return null;
                  const startingAt = starterLabels[pid] ?? '';
                  return (
                    <div key={pid} className="flex items-center gap-3 px-4 py-2 opacity-35">
                      <span className="w-8 text-[10px] font-black text-gray-600">—</span>
                      <div className="w-8 h-8 rounded-full bg-gray-700/40 border border-gray-600/30 flex items-center justify-center font-black text-gray-500 text-[10px] flex-shrink-0">
                        {getInitials(p.name)}
                      </div>
                      <span className="text-gray-600 font-black text-xs w-8">#{p.number}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-gray-500 font-semibold text-sm truncate block">{p.name}</span>
                        {startingAt && (
                          <span className="text-gray-600 text-[9px]">Starting at {startingAt}</span>
                        )}
                      </div>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-700/40 text-gray-600">
                        {p.year}
                      </span>
                      <div className="flex flex-col gap-0.5 opacity-0 pointer-events-none">
                        <ChevronUp size={16} />
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  );
                })}

                {regularIds.length === 0 && blockedIds.length === 0 && (
                  <div className="px-4 py-3 text-gray-600 text-xs italic">No players listed</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-gray-600 text-xs mt-6 italic">
        Use &uarr;/&darr; to promote or demote a player. Players starting elsewhere in the same position
        group are greyed out and locked at the bottom of other rows. Switching formation adjusts positions
        (e.g., 3-4 adds a separate NT row; 4-3 splits into RDE/LDE and RDT/LDT).
      </p>
    </div>
  );
}
