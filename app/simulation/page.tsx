'use client';

import { useState } from 'react';
import { Play, RotateCcw, MapPin, Trophy, Activity, ChevronRight, AlertTriangle, Shield, Swords } from 'lucide-react';
import { rawRoster, DL_ROLES, getLastName, RosterPlayer } from '@/lib/roster';

// ─── 2026 SCHEDULE — real opponents & dates (fbschedules.com / cubuffs.com) ────
interface Opponent {
  name: string;
  short: string;
  date: string;
  site: 'Home' | 'Away';
  strength: number; // 0–100 power rating used by the sim
  scout: string;    // real-data-informed scouting blurb
}

const SCHEDULE: Opponent[] = [
  {
    name: 'Georgia Tech Yellow Jackets', short: 'Georgia Tech', date: 'Sep 5', site: 'Away', strength: 80,
    scout: 'Season opener in Atlanta against an ACC opponent coming off a strong 2025 campaign. Georgia Tech runs an efficient, run-heavy offense that controls the clock and limits possessions — a tough road environment for an opener.',
  },
  {
    name: 'Weber State Wildcats', short: 'Weber State', date: 'Sep 12', site: 'Home', strength: 52,
    scout: 'Home opener against an FCS program from the Big Sky. Weber State has a history of solid FCS playoff teams, but this is a significant talent gap — a tune-up game to build chemistry before conference play.',
  },
  {
    name: 'Northwestern Wildcats', short: 'Northwestern', date: 'Sep 19', site: 'Away', strength: 70,
    scout: 'A road trip to the Big Ten. Northwestern is traditionally a disciplined, defensively sound team that wins ugly. Expect a low-scoring, physical game where field position and turnovers decide it.',
  },
  {
    name: 'Baylor Bears', short: 'Baylor', date: 'Sep 26', site: 'Away', strength: 79,
    scout: 'Big 12 opener in Waco. Baylor brings an explosive passing attack and was one of the higher-scoring offenses in the conference in 2025. The Buffs secondary will be tested early and often.',
  },
  {
    name: 'Texas Tech Red Raiders', short: 'Texas Tech', date: 'Oct 3', site: 'Home', strength: 86,
    scout: 'One of the biggest home games of the year. Texas Tech invested heavily through the portal and was a Big 12 title contender in 2025. An elite roster on both lines — this is a measuring-stick game.',
  },
  {
    name: 'Utah Utes', short: 'Utah', date: 'Oct 17', site: 'Home', strength: 82,
    scout: 'The rivalry renewed after the bye week. Utah is perennially one of the most physical teams in the conference with a dominant offensive line and a punishing run game. Folsom Field will be rocking.',
  },
  {
    name: 'Oklahoma State Cowboys', short: 'Oklahoma State', date: 'Oct 24', site: 'Away', strength: 68,
    scout: 'A trip to Stillwater against a Cowboys program in rebuild mode. Oklahoma State struggled in 2025 but is always dangerous at home in Boone Pickens Stadium. A game Colorado should win — on paper.',
  },
  {
    name: 'Kansas State Wildcats', short: 'Kansas State', date: 'Oct 31', site: 'Home', strength: 81,
    scout: 'Halloween showdown at Folsom. K-State is one of the best-coached teams in the conference, with a balanced offense and special teams that consistently flip games. They rarely beat themselves.',
  },
  {
    name: 'Arizona State Sun Devils', short: 'Arizona State', date: 'Nov 7', site: 'Away', strength: 81,
    scout: 'A November trip to Tempe against the defending conference contender. ASU has playmakers all over the field and one of the best home-field advantages in the Big 12 late in the season.',
  },
  {
    name: 'Houston Cougars', short: 'Houston', date: 'Nov 14', site: 'Home', strength: 75,
    scout: 'Houston made major strides in 2025 behind an athletic defense and improved quarterback play. A dangerous mid-tier Big 12 team that can beat anyone when its pass rush gets going.',
  },
  {
    name: 'Cincinnati Bearcats', short: 'Cincinnati', date: 'Nov 21', site: 'Away', strength: 76,
    scout: 'Cold-weather road game in late November. Cincinnati was much improved in 2025 with a strong offensive front and a veteran quarterback. Weather and physicality define this one.',
  },
  {
    name: 'UCF Knights', short: 'UCF', date: 'Nov 28', site: 'Home', strength: 74,
    scout: 'Senior Day season finale at Folsom Field. UCF brings elite team speed and an up-tempo spread attack. A potential bowl-positioning game to close out the regular season.',
  },
];

// ─── STARTER SLOTS ─────────────────────────────────────────────────────────────
interface StarterSlot {
  key: string;
  label: string;
  pool: () => RosterPlayer[];
  side: 'offense' | 'defense';
}

const dlPool = (roles: Array<'DE' | 'DT' | 'NT'>) =>
  rawRoster['DL'].filter((p) => roles.includes(DL_ROLES[p.name] ?? 'DT'));

const SLOTS: StarterSlot[] = [
  { key: 'QB',  label: 'Quarterback',     pool: () => rawRoster['QB'], side: 'offense' },
  { key: 'RB',  label: 'Running Back',    pool: () => rawRoster['RB'], side: 'offense' },
  { key: 'WR1', label: 'WR — X',          pool: () => rawRoster['WR'], side: 'offense' },
  { key: 'WR2', label: 'WR — Z',          pool: () => rawRoster['WR'], side: 'offense' },
  { key: 'WR3', label: 'WR — Slot',       pool: () => rawRoster['WR'], side: 'offense' },
  { key: 'TE',  label: 'Tight End',       pool: () => rawRoster['TE'], side: 'offense' },
  { key: 'DE1', label: 'Edge — Right',    pool: () => dlPool(['DE']), side: 'defense' },
  { key: 'DE2', label: 'Edge — Left',     pool: () => dlPool(['DE']), side: 'defense' },
  { key: 'DT',  label: 'Def. Tackle',     pool: () => dlPool(['DT', 'NT']), side: 'defense' },
  { key: 'LB',  label: 'Linebacker',      pool: () => rawRoster['LB'], side: 'defense' },
  { key: 'CB1', label: 'Cornerback 1',    pool: () => rawRoster['CB'], side: 'defense' },
  { key: 'CB2', label: 'Cornerback 2',    pool: () => rawRoster['CB'], side: 'defense' },
  { key: 'S',   label: 'Safety',          pool: () => rawRoster['S'], side: 'defense' },
];

// ─── SIM TYPES ─────────────────────────────────────────────────────────────────
interface Injury {
  player: string;
  position: string;
  gamesRemaining: number;
  description: string;
}

interface GameResult {
  opponent: Opponent;
  cuScore: number;
  oppScore: number;
  win: boolean;
  headline: string;
  recap: string;
  statLines: { player: string; line: string }[];
  injury?: Injury;
}

// ─── SIM HELPERS ───────────────────────────────────────────────────────────────
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Player quality from roster depth-chart rank: rank 1 ≈ 90, declining with depth.
function playerQuality(p: RosterPlayer): number {
  return Math.max(55, 92 - (p.rank - 1) * 5);
}

const INJURY_TYPES = [
  'hamstring strain', 'high-ankle sprain', 'shoulder sprain (AC joint)',
  'concussion protocol', 'knee sprain (MCL)', 'groin strain', 'wrist sprain',
];

function buildHeadline(win: boolean, margin: number, opp: Opponent, star: string): string {
  if (win && margin >= 21) return `Buffs roll: Colorado dominates ${opp.short} behind ${star}`;
  if (win && margin >= 10) return `Colorado pulls away from ${opp.short} in the second half`;
  if (win) return `${star} delivers as Colorado edges ${opp.short} in a thriller`;
  if (margin <= -21) return `Rough day: ${opp.short} overwhelms Colorado`;
  if (margin <= -10) return `Colorado can't keep pace with ${opp.short}`;
  return `Heartbreaker: ${opp.short} slips past Colorado late`;
}

// ─── SIM ENGINE ────────────────────────────────────────────────────────────────
function simulateGame(
  opp: Opponent,
  starters: Record<string, string>,
  injuries: Injury[],
): GameResult {
  const byName: Record<string, RosterPlayer> = {};
  for (const group of Object.values(rawRoster)) for (const p of group) byName[p.name] = p;

  const get = (key: string) => byName[starters[key]];
  const qb = get('QB'); const rb = get('RB');
  const wrs = [get('WR1'), get('WR2'), get('WR3')]; const te = get('TE');
  const defenders = ['DE1', 'DE2', 'DT', 'LB', 'CB1', 'CB2', 'S'].map(get);

  const offQuality = ([qb, rb, ...wrs, te].reduce((s, p) => s + playerQuality(p), 0)) / 6;
  const defQuality = defenders.reduce((s, p) => s + playerQuality(p), 0) / defenders.length;
  let cuStrength = offQuality * 0.55 + defQuality * 0.45;
  if (opp.site === 'Home') cuStrength += 3;

  const diff = cuStrength - opp.strength + rand(-14, 14); // game-day variance
  const win = diff > 0;
  const base = rand(17, 31);
  const cuScore = Math.max(3, base + (win ? Math.ceil(diff / 2) : Math.floor(diff / 3)));
  const oppScore = Math.max(0, win ? cuScore - Math.max(1, Math.round(diff / 2)) : cuScore + Math.max(1, Math.round(-diff / 2)));

  // ── stat lines ──
  const passYds = Math.round(170 + (cuScore * 5) + rand(-30, 60));
  const passTD = Math.max(0, Math.round(cuScore / 10) + rand(-1, 1));
  const ints = win ? rand(0, 1) : rand(0, 2);
  const att = rand(26, 41);
  const comp = Math.min(att - 2, Math.round(att * (0.55 + (playerQuality(qb) - 70) / 200)) + rand(-3, 3));

  const rushYds = Math.round(55 + cuScore * 1.8 + rand(-20, 40));
  const carries = rand(13, 24);
  const rushTD = Math.max(0, Math.round(cuScore / 14) + rand(-1, 1));

  // distribute receiving among WRs/TE weighted by quality
  const receivers = [...wrs, te];
  const weights = receivers.map((p) => playerQuality(p) + rand(0, 25));
  const wSum = weights.reduce((a, b) => a + b, 0);
  const recLines = receivers.map((p, i) => {
    const yds = Math.round((passYds * weights[i]) / wSum);
    const recs = Math.max(1, Math.round(yds / rand(11, 16)));
    return { p, recs, yds };
  });
  let tdLeft = passTD;
  const recTDs = recLines.map((r, i) => {
    const isTop = weights[i] === Math.max(...weights);
    const t = tdLeft > 0 && (isTop || Math.random() < 0.4) ? rand(1, Math.min(2, tdLeft)) : 0;
    tdLeft -= t;
    return t;
  });

  const sackers = [defenders[0], defenders[1], defenders[2]];
  const sacks = sackers.map(() => (Math.random() < 0.45 ? rand(1, 2) : 0));
  const lbTackles = rand(6, 13);
  const dbInt = Math.random() < (win ? 0.4 : 0.2);
  const intMan = pick([defenders[4], defenders[5], defenders[6]]);

  const statLines: { player: string; line: string }[] = [
    { player: qb.name, line: `${comp}/${att}, ${passYds} pass yds, ${passTD} TD, ${ints} INT` },
    { player: rb.name, line: `${carries} car, ${rushYds} rush yds, ${rushTD} TD` },
    ...recLines.map((r, i) => ({
      player: r.p.name,
      line: `${r.recs} rec, ${r.yds} yds${recTDs[i] ? `, ${recTDs[i]} TD` : ''}`,
    })),
    { player: defenders[3].name, line: `${lbTackles} tackles${Math.random() < 0.3 ? ', 1 TFL' : ''}` },
    ...sackers.flatMap((d, i) => (sacks[i] ? [{ player: d.name, line: `${sacks[i]} sack${sacks[i] > 1 ? 's' : ''}, ${rand(2, 6)} tackles` }] : [])),
    ...(dbInt ? [{ player: intMan.name, line: `1 INT, ${rand(3, 7)} tackles` }] : []),
  ];

  // star of the game = biggest offensive line
  const starCandidates = [
    { name: getLastName(qb.name), score: passYds + passTD * 40 - ints * 30 },
    { name: getLastName(rb.name), score: rushYds * 1.4 + rushTD * 40 },
    ...recLines.map((r, i) => ({ name: getLastName(r.p.name), score: r.yds * 1.3 + recTDs[i] * 40 })),
  ];
  starCandidates.sort((a, b) => b.score - a.score);
  const star = starCandidates[0].name;

  const headline = buildHeadline(win, cuScore - oppScore, opp, star);
  const recapBits: string[] = [];
  recapBits.push(
    win
      ? `Colorado ${cuScore - oppScore >= 14 ? 'controlled this one from the jump' : 'survived a battle'} ${opp.site === 'Home' ? 'at Folsom Field' : 'on the road'}, beating ${opp.name} ${cuScore}–${oppScore}.`
      : `Colorado fell to ${opp.name} ${oppScore}–${cuScore} ${opp.site === 'Home' ? 'at Folsom Field' : 'on the road'} in a ${oppScore - cuScore <= 7 ? 'game that came down to the final possession' : 'game that got away in the second half'}.`,
  );
  recapBits.push(`${getLastName(qb.name)} finished ${comp}-of-${att} for ${passYds} yards${passTD ? ` and ${passTD} touchdown${passTD > 1 ? 's' : ''}` : ''}${ints ? `, but threw ${ints} interception${ints > 1 ? 's' : ''}` : ''}.`);
  const topRec = recLines.reduce((a, b) => (a.yds > b.yds ? a : b));
  recapBits.push(`${getLastName(topRec.p.name)} led all receivers with ${topRec.yds} yards on ${topRec.recs} catches, while ${getLastName(rb.name)} ground out ${rushYds} yards on ${carries} carries.`);
  const totalSacks = sacks.reduce((a, b) => a + b, 0);
  if (totalSacks >= 2) recapBits.push(`The defensive front lived in the backfield, racking up ${totalSacks} sacks.`);
  if (dbInt) recapBits.push(`${getLastName(intMan.name)} came up with a momentum-swinging interception.`);

  // ── injury roll (~12% per game) ──
  let injury: Injury | undefined;
  if (Math.random() < 0.12) {
    const allStarters = SLOTS.map((s) => ({ slot: s, player: starters[s.key] }));
    const hit = pick(allStarters);
    injury = {
      player: hit.player,
      position: hit.slot.label,
      gamesRemaining: rand(1, 3),
      description: pick(INJURY_TYPES),
    };
    recapBits.push(`Injury news: ${hit.player} (${hit.slot.label}) left the game with a ${injury.description} and is expected to miss ${injury.gamesRemaining} game${injury.gamesRemaining > 1 ? 's' : ''}.`);
  }

  return { opponent: opp, cuScore, oppScore, win, headline, recap: recapBits.join(' '), statLines, injury };
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────
export default function SimulationPage() {
  const [gameIndex, setGameIndex] = useState(0);
  const [results, setResults] = useState<GameResult[]>([]);
  const [injuries, setInjuries] = useState<Injury[]>([]);
  const [phase, setPhase] = useState<'pick' | 'result' | 'done'>('pick');

  const injuredNames = new Set(injuries.filter((i) => i.gamesRemaining > 0).map((i) => i.player));

  // default starters = top-ranked healthy player per slot (no duplicates across WR/edge/CB slots)
  const defaultStarters = (): Record<string, string> => {
    const out: Record<string, string> = {};
    const used = new Set<string>();
    for (const slot of SLOTS) {
      const candidate = slot.pool().find((p) => !injuredNames.has(p.name) && !used.has(p.name));
      const name = candidate?.name ?? slot.pool()[0].name;
      out[slot.key] = name;
      used.add(name);
    }
    return out;
  };

  const [starters, setStarters] = useState<Record<string, string>>(defaultStarters);

  const wins = results.filter((r) => r.win).length;
  const losses = results.length - wins;
  const currentGame = SCHEDULE[gameIndex];
  const lastResult = results[results.length - 1];

  const playGame = () => {
    const result = simulateGame(currentGame, starters, injuries);
    const decremented = injuries
      .map((i) => ({ ...i, gamesRemaining: i.gamesRemaining - 1 }))
      .filter((i) => i.gamesRemaining > 0);
    const nextInjuries = result.injury ? [...decremented, result.injury] : decremented;
    setResults([...results, result]);
    setInjuries(nextInjuries);
    setPhase(gameIndex === SCHEDULE.length - 1 ? 'done' : 'result');
  };

  const nextGame = () => {
    setGameIndex(gameIndex + 1);
    setPhase('pick');
    // recompute defaults with updated injury list
    const active = new Set(injuries.filter((i) => i.gamesRemaining > 0).map((i) => i.player));
    const out: Record<string, string> = {};
    const used = new Set<string>();
    for (const slot of SLOTS) {
      const prev = starters[slot.key];
      const keepPrev = prev && !active.has(prev) && !used.has(prev);
      const name = keepPrev ? prev : (slot.pool().find((p) => !active.has(p.name) && !used.has(p.name))?.name ?? slot.pool()[0].name);
      out[slot.key] = name;
      used.add(name);
    }
    setStarters(out);
  };

  const reset = () => {
    setGameIndex(0);
    setResults([]);
    setInjuries([]);
    setPhase('pick');
    setStarters(defaultStarters());
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-black text-white">
            <span className="text-cu-gold">2026</span> Season Simulation
          </h1>
          <p className="text-gray-400 mt-1">Pick your starters, play the schedule game by game — real 2026 opponents.</p>
        </div>
        <button onClick={reset} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-gray-300 hover:text-white hover:border-cu-gold/40 text-sm font-bold transition-all">
          <RotateCcw size={14} /> Reset Season
        </button>
      </div>

      {/* Record bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-cu-gold">{wins}–{losses}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Record</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 p-4 text-center">
          <div className="text-3xl font-black text-white">{Math.min(gameIndex + (phase === 'pick' ? 1 : phase === 'result' ? 1 : 0), SCHEDULE.length)}<span className="text-gray-500 text-xl">/{SCHEDULE.length}</span></div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{phase === 'done' ? 'Season Complete' : 'Current Game'}</div>
        </div>
        <div className="bg-cu-gray rounded-2xl border border-red-500/20 p-4 text-center">
          <div className="text-3xl font-black text-red-400">{injuries.filter((i) => i.gamesRemaining > 0).length}</div>
          <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">Injured</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">

          {/* ── PICK STARTERS ── */}
          {phase === 'pick' && (
            <section className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
              <div className="bg-gradient-to-r from-cu-black to-cu-gray px-5 py-4 border-b border-cu-gold/20 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="text-xs text-cu-gold font-bold uppercase tracking-wide">Game {gameIndex + 1} · {currentGame.date}</div>
                  <h2 className="text-xl font-black text-white">{currentGame.site === 'Home' ? 'vs' : 'at'} {currentGame.name}</h2>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${currentGame.site === 'Home' ? 'bg-cu-gold/20 text-cu-gold border border-cu-gold/40' : 'bg-gray-700 text-gray-300 border border-gray-600'}`}>
                  <MapPin size={10} className="inline mr-1" />{currentGame.site === 'Home' ? 'Folsom Field' : 'Road Game'}
                </span>
              </div>

              <div className="p-5">
                <div className="bg-black/30 rounded-xl border border-white/5 p-4 mb-6">
                  <div className="text-xs font-bold text-cu-gold uppercase tracking-wide mb-1">Scouting Report</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{currentGame.scout}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {(['offense', 'defense'] as const).map((side) => (
                    <div key={side}>
                      <h3 className="text-sm font-black text-white uppercase tracking-wide mb-3 flex items-center gap-2">
                        {side === 'offense' ? <Swords size={14} className="text-cu-gold" /> : <Shield size={14} className="text-blue-400" />}
                        {side} Starters
                      </h3>
                      <div className="space-y-2">
                        {SLOTS.filter((s) => s.side === side).map((slot) => (
                          <div key={slot.key} className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 font-bold w-24 flex-shrink-0">{slot.label}</span>
                            <select
                              value={starters[slot.key]}
                              onChange={(e) => setStarters({ ...starters, [slot.key]: e.target.value })}
                              className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:border-cu-gold/50 focus:outline-none"
                            >
                              {slot.pool().map((p) => {
                                const hurt = injuredNames.has(p.name);
                                const takenElsewhere = Object.entries(starters).some(([k, v]) => k !== slot.key && v === p.name);
                                return (
                                  <option key={p.name} value={p.name} disabled={hurt || takenElsewhere}>
                                    #{p.number} {p.name}{hurt ? ' (INJURED)' : takenElsewhere ? ' (starting elsewhere)' : ''}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={playGame}
                  className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cu-gold text-black font-black text-sm uppercase tracking-wide hover:bg-yellow-400 transition-all"
                >
                  <Play size={16} /> Simulate Game {gameIndex + 1}
                </button>
              </div>
            </section>
          )}

          {/* ── GAME RESULT ── */}
          {(phase === 'result' || phase === 'done') && lastResult && (
            <section className={`rounded-2xl border overflow-hidden ${lastResult.win ? 'bg-cu-gray border-cu-gold/30' : 'bg-cu-gray border-red-500/30'}`}>
              <div className={`px-5 py-4 border-b flex items-center justify-between flex-wrap gap-2 ${lastResult.win ? 'bg-cu-gold/10 border-cu-gold/20' : 'bg-red-900/20 border-red-500/20'}`}>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wide ${lastResult.win ? 'text-cu-gold' : 'text-red-400'}`}>
                    Final · {lastResult.opponent.date} · {lastResult.win ? 'WIN' : 'LOSS'}
                  </div>
                  <h2 className="text-2xl font-black text-white">
                    Colorado {lastResult.cuScore} — {lastResult.opponent.short} {lastResult.oppScore}
                  </h2>
                </div>
                <Trophy size={28} className={lastResult.win ? 'text-cu-gold' : 'text-gray-600'} />
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <h3 className="text-lg font-black text-white mb-2">{lastResult.headline}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{lastResult.recap}</p>
                </div>

                {lastResult.injury && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 flex items-start gap-2">
                    <AlertTriangle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-300">
                      <span className="font-bold">{lastResult.injury.player}</span> ({lastResult.injury.position}) — {lastResult.injury.description}, out {lastResult.injury.gamesRemaining} game{lastResult.injury.gamesRemaining > 1 ? 's' : ''}.
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-black text-cu-gold uppercase tracking-wide mb-2 flex items-center gap-1">
                    <Activity size={12} /> Box Score Leaders
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {lastResult.statLines.map((s, i) => (
                      <div key={i} className="bg-black/30 rounded-lg border border-white/5 px-3 py-2 flex items-center justify-between gap-2">
                        <span className="text-sm text-white font-bold truncate">{s.player}</span>
                        <span className="text-xs text-gray-400 text-right flex-shrink-0">{s.line}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {phase === 'result' ? (
                  <button
                    onClick={nextGame}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cu-gold text-black font-black text-sm uppercase tracking-wide hover:bg-yellow-400 transition-all"
                  >
                    Set Starters for Game {gameIndex + 2} ({SCHEDULE[gameIndex + 1].site === 'Home' ? 'vs' : 'at'} {SCHEDULE[gameIndex + 1].short}) <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="bg-cu-gold/10 border border-cu-gold/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-cu-gold">Season Complete: {wins}–{losses}</div>
                    <div className="text-sm text-gray-300 mt-1">
                      {wins >= 10 ? 'A statement season — Colorado is firmly in the College Football Playoff conversation.' :
                       wins >= 8 ? 'A strong campaign — the Buffs are headed to a quality bowl game.' :
                       wins >= 6 ? 'Bowl eligible — a foundation to build on for 2027.' :
                       'A rebuilding year — the 2027 recruiting class can’t arrive soon enough.'}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: schedule / results log + injury report */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-cu-gray rounded-2xl border border-cu-gold/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-cu-gold/20">
              <h3 className="font-black text-cu-gold text-sm uppercase tracking-wide">2026 Schedule</h3>
            </div>
            <div className="p-2">
              {SCHEDULE.map((g, i) => {
                const res = results[i];
                const isCurrent = i === gameIndex && phase !== 'done';
                return (
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isCurrent ? 'bg-cu-gold/10 border border-cu-gold/30' : ''}`}>
                    <span className="text-[10px] text-gray-500 w-10 flex-shrink-0">{g.date}</span>
                    <span className={`text-xs flex-1 truncate ${isCurrent ? 'text-cu-gold font-bold' : 'text-gray-300'}`}>
                      {g.site === 'Home' ? 'vs' : 'at'} {g.short}
                    </span>
                    {res ? (
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${res.win ? 'bg-cu-gold/20 text-cu-gold' : 'bg-red-900/40 text-red-400'}`}>
                        {res.win ? 'W' : 'L'} {res.cuScore}–{res.oppScore}
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-600">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-cu-gray rounded-2xl border border-red-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-cu-black to-cu-gray px-4 py-3 border-b border-red-500/20">
              <h3 className="font-black text-red-400 text-sm uppercase tracking-wide flex items-center gap-2">
                <AlertTriangle size={13} /> Injury Report
              </h3>
            </div>
            <div className="p-3">
              {injuries.filter((i) => i.gamesRemaining > 0).length === 0 ? (
                <p className="text-xs text-gray-500">No active injuries. Knock on wood.</p>
              ) : (
                <div className="space-y-2">
                  {injuries.filter((i) => i.gamesRemaining > 0).map((inj, i) => (
                    <div key={i} className="bg-black/30 rounded-lg border border-red-500/10 px-3 py-2">
                      <div className="text-xs text-white font-bold">{inj.player}</div>
                      <div className="text-[10px] text-gray-400">{inj.description} · out {inj.gamesRemaining} more game{inj.gamesRemaining > 1 ? 's' : ''}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
