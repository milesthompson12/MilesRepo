'use client';

import { useState, useCallback, useRef } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { DL_ROLES } from '@/lib/roster';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Player {
  name: string;
  number: string;
  year: string;
  rank: number;
  posGroup: string; // QB | RB | WR | TE | OL | DL | LB | CB | S
}

interface FieldSlot {
  id: string;
  label: string;
  posGroup: string[]; // accepted position groups
  x: number; // % from left
  y: number; // % from top
  playerId: string | null;
}

type Side = 'offense' | 'defense';

// ─── Roster data (Official 2026 Spring PDF) ───────────────────────────────────

const rawRoster: Record<string, Omit<Player, 'posGroup'>[]> = {
  QB: [
    { name: 'Julian Lewis',      number: '10', year: 'FR', rank: 1 },
    { name: 'Isaac Wilson',      number: '16', year: 'So', rank: 2 },
    { name: 'Kaneal Sweetwyne',  number: '14', year: 'FR', rank: 3 },
  ],
  RB: [
    { name: 'Richard Young',       number: '9',  year: 'JR', rank: 1 },
    { name: 'Damian Henderson II', number: '26', year: 'JR', rank: 2 },
    { name: 'JaQuail Smith',       number: '23', year: 'So', rank: 3 },
    { name: 'Micah Welch',         number: '29', year: 'JR', rank: 4 },
    { name: 'Bryce Hicks',         number: '27', year: 'So', rank: 5 },
    { name: 'DeKalon Taylor',      number: '20', year: 'SR', rank: 6 },
    { name: 'Titus Bautista',      number: '34', year: 'So', rank: 7 },
    { name: 'Leonardo Valle',      number: '37', year: 'FR', rank: 8 },
  ],
  WR: [
    { name: 'Danny Scudero',         number: '18', year: 'SR', rank: 1 },
    { name: 'Joseph Williams',       number: '8',  year: 'JR', rank: 2 },
    { name: 'DeAndre Moore Jr.',     number: '3',  year: 'SR', rank: 3 },
    { name: 'Hykeem Williams',       number: '5',  year: 'SR', rank: 4 },
    { name: 'Kam Perry',             number: '7',  year: 'SR', rank: 5 },
    { name: 'Quentin Gibson',        number: '6',  year: 'So', rank: 6 },
    { name: 'Kaleb Mathis',          number: '13', year: 'JR', rank: 7 },
    { name: 'Quanell Farrakhan Jr.', number: '14', year: 'So', rank: 8 },
    { name: 'Christian Ward',        number: '17', year: 'FR', rank: 9 },
    { name: 'Tagert Bardin',         number: '22', year: 'JR', rank: 10 },
    { name: 'Carson Westbrook',      number: '36', year: 'So', rank: 11 },
    { name: 'Alex Ward',             number: '32', year: 'FR', rank: 12 },
    { name: 'Ernest Campbell',       number: '4',  year: 'So', rank: 13 },
  ],
  TE: [
    { name: 'Zach Atkins',      number: '85', year: 'SR', rank: 1 },
    { name: 'Brady Kopetz',     number: '86', year: 'SR', rank: 2 },
    { name: 'Charlie Williams', number: '87', year: 'JR', rank: 3 },
    { name: 'Fisher Clements',  number: '89', year: 'GR', rank: 4 },
    { name: 'Ben Gula',         number: '82', year: 'FR', rank: 5 },
    { name: 'Corbin Laisure',   number: '88', year: 'FR', rank: 6 },
    { name: 'Zayne DeSouza',    number: '83', year: 'FR', rank: 7 },
  ],
  OL: [
    { name: 'Larry Johnson III', number: '53', year: 'SR', rank: 1 },
    { name: 'Taj White',         number: '54', year: 'SR', rank: 2 },
    { name: 'Leon Bell',         number: '57', year: 'GR', rank: 3 },
    { name: 'Bo Hughley',        number: '55', year: 'JR', rank: 4 },
    { name: 'Jayven Richardson', number: '75', year: 'SR', rank: 5 },
    { name: 'Andre Roye Jr.',    number: '52', year: 'SR', rank: 6 },
    { name: 'Phillip Houston',   number: '56', year: 'SR', rank: 7 },
    { name: 'Demetrius Hunter',  number: '58', year: 'GR', rank: 8 },
    { name: 'Sean Kinney',       number: '62', year: 'JR', rank: 9 },
    { name: 'Jayvon McFadden',   number: '71', year: 'FR', rank: 10 },
    { name: 'Jose Soto',         number: '73', year: 'JR', rank: 11 },
    { name: 'Xavier Payne',      number: '72', year: 'FR', rank: 12 },
    { name: 'Yahya Attia',       number: '59', year: 'So', rank: 13 },
    { name: 'Hudson Steber',     number: '78', year: 'FR', rank: 14 },
    { name: 'Chauncey Gooden',   number: '51', year: 'FR', rank: 15 },
  ],
  DL: [
    { name: 'Quency Wiggins',    number: '49', year: 'SR', rank: 1 },
    { name: 'Toby Anene',        number: '53', year: 'SR', rank: 2 },
    { name: 'Santana Hopper',    number: '97', year: 'SR', rank: 3 },
    { name: 'Domata Peko Jr.',   number: '27', year: 'JR', rank: 4 },
    { name: 'Kylan Salter',      number: '41', year: 'JR', rank: 5 },
    { name: 'Immanuel Ezeogu',   number: '52', year: 'So', rank: 6 },
    { name: 'Yamil Talib',       number: '95', year: 'So', rank: 7 },
    { name: 'Balansama Kamara',  number: '96', year: 'SR', rank: 8 },
    { name: 'Vili Taufatofua',   number: '45', year: 'SR', rank: 9 },
    { name: 'Samu Taumanupepe',  number: '88', year: 'JR', rank: 10 },
    { name: 'Lamont Lester Jr.', number: '56', year: 'So', rank: 11 },
    { name: 'Tyler Moore',       number: '90', year: 'JR', rank: 12 },
    { name: 'Sedrick Smith',     number: '91', year: 'JR', rank: 13 },
    { name: 'Josiah Manu',       number: '94', year: 'FR', rank: 14 },
    { name: 'Ezra Christensen',  number: '98', year: 'SR', rank: 15 },
    { name: 'Dylan Manuel',      number: '99', year: 'FR', rank: 16 },
  ],
  LB: [
    { name: 'Liona Lefau',       number: '17', year: 'SR', rank: 1 },
    { name: 'Tyler Martinez',    number: '35', year: 'SR', rank: 2 },
    { name: 'Gideon Lampron',    number: '44', year: 'SR', rank: 3 },
    { name: 'Carson Crawford',   number: '51', year: 'FR', rank: 4 },
    { name: 'Rodney Colton Jr.', number: '50', year: 'FR', rank: 5 },
    { name: 'Bo LaPenna',        number: '54', year: 'SR', rank: 6 },
    { name: 'Gage Goldberg',     number: '55', year: 'So', rank: 7 },
    { name: 'Colby Johnson',     number: '40', year: 'FR', rank: 8 },
  ],
  CB: [
    { name: 'Justin Eaglin',     number: '30', year: 'SR', rank: 1 },
    { name: 'Boo Carter',        number: '6',  year: 'JR', rank: 2 },
    { name: 'Randon Fontenette', number: '7',  year: 'SR', rank: 3 },
    { name: 'Naeten Mitchell',   number: '4',  year: 'JR', rank: 4 },
    { name: 'RJ Johnson',        number: '5',  year: 'JR', rank: 5 },
    { name: 'Makari Vickers',    number: '10', year: 'JR', rank: 6 },
    { name: 'Jason Stokes Jr.',  number: '13', year: 'So', rank: 7 },
    { name: 'Jah Jah Boyd',      number: '15', year: 'So', rank: 8 },
    { name: 'Paul Omodia',       number: '18', year: 'JR', rank: 9 },
    { name: 'Cree Thomas',       number: '20', year: 'FR', rank: 10 },
    { name: 'Mojo Williams Jr.', number: '25', year: 'FR', rank: 11 },
    { name: 'Braylon Edwards',   number: '26', year: 'FR', rank: 12 },
    { name: 'Jaydan Hardy',      number: '9',  year: 'FR', rank: 13 },
    { name: 'Kole Mathis',       number: '33', year: 'So', rank: 14 },
    { name: 'Donavon Stephens',  number: '39', year: 'FR', rank: 15 },
    { name: 'Preston Ashley',    number: '31', year: 'FR', rank: 16 },
  ],
  S: [
    { name: 'Emory Floyd',   number: '8',  year: 'SR', rank: 1 },
    { name: 'Ben Finneseth', number: '28', year: 'SR', rank: 2 },
  ],
};

// Flatten into a keyed map: "QB-1" -> Player
function buildPlayerMap(): Record<string, Player> {
  const map: Record<string, Player> = {};
  for (const [posGroup, players] of Object.entries(rawRoster)) {
    for (const p of players) {
      map[`${posGroup}-${p.rank}`] = { ...p, posGroup };
    }
  }
  return map;
}

const PLAYER_MAP = buildPlayerMap();

// ─── Formation definitions ────────────────────────────────────────────────────

// Offense: end zone at top (y=0). LOS at y=52 (matches the dashed line in the SVG).
// Offensive players sit AT or BEHIND the LOS (y >= 52, toward the bottom).
// OL is subtly staggered (center on the ball, guards/tackles a touch back) like
// a real line. All coordinates keep >=10% horizontal / >=6% vertical separation
// so the 70px cards never overlap.
function makeOffenseSlots(formation: string): Omit<FieldSlot, 'playerId'>[] {
  const LINE = 52;       // line of scrimmage / center
  const SHOTGUN = 68;    // QB in shotgun/pistol-deep
  const UNDER = 60;      // QB under center
  const RB_DEEP = 74;    // running back depth

  // Offensive line — center on the ball, guards 1% back, tackles 2% back.
  const olSlots: Omit<FieldSlot, 'playerId'>[] = [
    { id: 'LT', label: 'LT', posGroup: ['OL'], x: 32, y: LINE + 2 },
    { id: 'LG', label: 'LG', posGroup: ['OL'], x: 40, y: LINE + 1 },
    { id: 'C',  label: 'C',  posGroup: ['OL'], x: 48, y: LINE },
    { id: 'RG', label: 'RG', posGroup: ['OL'], x: 56, y: LINE + 1 },
    { id: 'RT', label: 'RT', posGroup: ['OL'], x: 64, y: LINE + 2 },
  ];

  // 11 personnel (1 RB, 1 TE, 3 WR), QB in shotgun with back beside him.
  if (formation === 'Spread') {
    return [
      ...olSlots,
      { id: 'TE',  label: 'TE', posGroup: ['TE'], x: 72, y: LINE },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 6,  y: LINE },
      { id: 'WR3', label: 'WR', posGroup: ['WR'], x: 18, y: LINE + 3 },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 94, y: LINE },
      { id: 'QB',  label: 'QB', posGroup: ['QB'], x: 48, y: SHOTGUN },
      { id: 'RB',  label: 'RB', posGroup: ['RB'], x: 38, y: SHOTGUN },
    ];
  }
  // 11 personnel, QB in the pistol with the RB stacked directly behind.
  if (formation === 'Pistol') {
    return [
      ...olSlots,
      { id: 'TE',  label: 'TE', posGroup: ['TE'], x: 72, y: LINE },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 6,  y: LINE },
      { id: 'WR3', label: 'WR', posGroup: ['WR'], x: 84, y: LINE + 3 },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 94, y: LINE },
      { id: 'QB',  label: 'QB', posGroup: ['QB'], x: 48, y: 64 },
      { id: 'RB',  label: 'RB', posGroup: ['RB'], x: 48, y: RB_DEEP + 2 },
    ];
  }
  // 21 personnel (2 RB, 1 TE, 2 WR), QB under center with split backs.
  if (formation === 'Pro Set') {
    return [
      ...olSlots,
      { id: 'TE',  label: 'TE', posGroup: ['TE'], x: 72, y: LINE },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 6,  y: LINE },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 94, y: LINE },
      { id: 'QB',  label: 'QB', posGroup: ['QB'], x: 48, y: UNDER },
      { id: 'FB',  label: 'HB', posGroup: ['RB'], x: 40, y: RB_DEEP },
      { id: 'RB',  label: 'HB', posGroup: ['RB'], x: 56, y: RB_DEEP },
    ];
  }
  // Trips right: 3 WR bunched to one side, 1 WR backside, 1 RB, QB shotgun.
  if (formation === 'Trips') {
    return [
      ...olSlots,
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 6,  y: LINE },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 74, y: LINE },
      { id: 'WR3', label: 'WR', posGroup: ['WR'], x: 84, y: LINE + 3 },
      { id: 'WR4', label: 'WR', posGroup: ['WR'], x: 94, y: LINE },
      { id: 'QB',  label: 'QB', posGroup: ['QB'], x: 48, y: SHOTGUN },
      { id: 'RB',  label: 'RB', posGroup: ['RB'], x: 38, y: SHOTGUN },
    ];
  }
  // Empty: no back, 5 WR spread across the field, QB shotgun.
  if (formation === 'Empty') {
    return [
      ...olSlots,
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 6,  y: LINE },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 18, y: LINE + 3 },
      { id: 'WR3', label: 'WR', posGroup: ['WR'], x: 70, y: LINE + 3 },
      { id: 'WR4', label: 'WR', posGroup: ['WR'], x: 82, y: LINE },
      { id: 'WR5', label: 'WR', posGroup: ['WR'], x: 94, y: LINE + 3 },
      { id: 'QB',  label: 'QB', posGroup: ['QB'], x: 48, y: SHOTGUN },
    ];
  }
  return [];
}

// Defense: end zone at bottom (y=100). LOS at y=30 (matches the dashed SVG line).
// The D-line is ON the ball (y=30); everyone else drops back into coverage toward
// the bottom (corners up near the line, linebackers at the second level, safeties
// deep). Each personnel grouping totals 11 with proper position counts.
function makeDefenseSlots(formation: string): Omit<FieldSlot, 'playerId'>[] {
  const LINE = 30;  // defensive line — on the line of scrimmage
  const CB_Y = 40;  // cornerbacks press near the line, out wide
  const LB_Y = 46;  // linebacker second level
  const S_Y = 64;   // safeties deep

  // 4-2-5: 4 DL, 2 LB, 5 DB (2 CB, nickel, 2 S) — Colorado's base.
  if (formation === '4-2-5') {
    return [
      { id: 'DL1', label: 'LDE', posGroup: ['DE'], x: 20, y: LINE },
      { id: 'DL2', label: 'LDT', posGroup: ['DT'], x: 38, y: LINE },
      { id: 'DL3', label: 'RDT', posGroup: ['DT'], x: 58, y: LINE },
      { id: 'DL4', label: 'RDE', posGroup: ['DE'], x: 76, y: LINE },
      { id: 'LB1', label: 'LB',  posGroup: ['LB'], x: 38, y: LB_Y },
      { id: 'LB2', label: 'LB',  posGroup: ['LB'], x: 58, y: LB_Y },
      { id: 'CB1', label: 'CB',  posGroup: ['CB'], x: 6,  y: CB_Y },
      { id: 'CB2', label: 'CB',  posGroup: ['CB'], x: 94, y: CB_Y },
      { id: 'NB',  label: 'NB',  posGroup: ['CB'], x: 20, y: LB_Y + 2 },
      { id: 'S1',  label: 'SS',  posGroup: ['S'],  x: 36, y: S_Y },
      { id: 'S2',  label: 'FS',  posGroup: ['S'],  x: 60, y: S_Y },
    ];
  }
  // 3-4: 3 DL, 4 LB, 4 DB (2 CB, 2 S).
  if (formation === '3-4') {
    return [
      { id: 'DL1', label: 'LDE', posGroup: ['DE'], x: 28, y: LINE },
      { id: 'DL2', label: 'NT',  posGroup: ['NT'], x: 48, y: LINE },
      { id: 'DL3', label: 'RDE', posGroup: ['DE'], x: 68, y: LINE },
      { id: 'LB1', label: 'OLB', posGroup: ['LB'], x: 10, y: LB_Y - 2 },
      { id: 'LB2', label: 'ILB', posGroup: ['LB'], x: 36, y: LB_Y },
      { id: 'LB3', label: 'ILB', posGroup: ['LB'], x: 60, y: LB_Y },
      { id: 'LB4', label: 'OLB', posGroup: ['LB'], x: 86, y: LB_Y - 2 },
      { id: 'CB1', label: 'CB',  posGroup: ['CB'], x: 6,  y: CB_Y },
      { id: 'CB2', label: 'CB',  posGroup: ['CB'], x: 94, y: CB_Y },
      { id: 'S1',  label: 'SS',  posGroup: ['S'],  x: 36, y: S_Y },
      { id: 'S2',  label: 'FS',  posGroup: ['S'],  x: 62, y: S_Y },
    ];
  }
  // 4-3: 4 DL, 3 LB, 4 DB (2 CB, 2 S).
  if (formation === '4-3') {
    return [
      { id: 'DL1', label: 'LDE', posGroup: ['DE'], x: 20, y: LINE },
      { id: 'DL2', label: 'LDT', posGroup: ['DT'], x: 38, y: LINE },
      { id: 'DL3', label: 'RDT', posGroup: ['DT'], x: 58, y: LINE },
      { id: 'DL4', label: 'RDE', posGroup: ['DE'], x: 76, y: LINE },
      { id: 'LB1', label: 'WLB', posGroup: ['LB'], x: 28, y: LB_Y },
      { id: 'LB2', label: 'MLB', posGroup: ['LB'], x: 48, y: LB_Y },
      { id: 'LB3', label: 'SLB', posGroup: ['LB'], x: 68, y: LB_Y },
      { id: 'CB1', label: 'CB',  posGroup: ['CB'], x: 6,  y: CB_Y },
      { id: 'CB2', label: 'CB',  posGroup: ['CB'], x: 94, y: CB_Y },
      { id: 'S1',  label: 'SS',  posGroup: ['S'],  x: 36, y: S_Y },
      { id: 'S2',  label: 'FS',  posGroup: ['S'],  x: 62, y: S_Y },
    ];
  }
  // Nickel: 4 DL, 2 LB, 5 DB (2 CB, nickel, 2 S).
  if (formation === 'Nickel') {
    return [
      { id: 'DL1', label: 'LDE', posGroup: ['DE'], x: 20, y: LINE },
      { id: 'DL2', label: 'LDT', posGroup: ['DT'], x: 38, y: LINE },
      { id: 'DL3', label: 'RDT', posGroup: ['DT'], x: 58, y: LINE },
      { id: 'DL4', label: 'RDE', posGroup: ['DE'], x: 76, y: LINE },
      { id: 'LB1', label: 'LB',  posGroup: ['LB'], x: 38, y: LB_Y },
      { id: 'LB2', label: 'LB',  posGroup: ['LB'], x: 58, y: LB_Y },
      { id: 'CB1', label: 'CB',  posGroup: ['CB'], x: 6,  y: CB_Y },
      { id: 'CB2', label: 'CB',  posGroup: ['CB'], x: 94, y: CB_Y },
      { id: 'NB',  label: 'NB',  posGroup: ['CB'], x: 20, y: LB_Y + 2 },
      { id: 'S1',  label: 'SS',  posGroup: ['S'],  x: 36, y: S_Y },
      { id: 'S2',  label: 'FS',  posGroup: ['S'],  x: 60, y: S_Y },
    ];
  }
  // Dime: 4 DL, 1 LB, 6 DB (2 CB, nickel, extra DB, 2 S).
  if (formation === 'Dime') {
    return [
      { id: 'DL1', label: 'LDE', posGroup: ['DE'], x: 20, y: LINE },
      { id: 'DL2', label: 'LDT', posGroup: ['DT'], x: 38, y: LINE },
      { id: 'DL3', label: 'RDT', posGroup: ['DT'], x: 58, y: LINE },
      { id: 'DL4', label: 'RDE', posGroup: ['DE'], x: 76, y: LINE },
      { id: 'LB1', label: 'LB',  posGroup: ['LB'], x: 48, y: LB_Y },
      { id: 'CB1', label: 'CB',  posGroup: ['CB'], x: 6,  y: CB_Y },
      { id: 'CB2', label: 'CB',  posGroup: ['CB'], x: 94, y: CB_Y },
      { id: 'NB',  label: 'NB',  posGroup: ['CB'], x: 20, y: LB_Y + 2 },
      { id: 'DB',  label: 'DB',  posGroup: ['CB', 'S'], x: 76, y: LB_Y + 2 },
      { id: 'S1',  label: 'SS',  posGroup: ['S'],  x: 36, y: S_Y },
      { id: 'S2',  label: 'FS',  posGroup: ['S'],  x: 60, y: S_Y },
    ];
  }
  return [];
}

// ─── Auto-assign logic ────────────────────────────────────────────────────────

// Resolve a position group (including the virtual DE / DT / NT defensive splits)
// to a rank-sorted list of player ids. DE = edge ends, DT/NT = interior linemen.
function playersForGroup(pg: string): { pid: string; rank: number }[] {
  if (pg === 'DE') {
    return (rawRoster['DL'] ?? [])
      .filter((p) => DL_ROLES[p.name] === 'DE')
      .map((p) => ({ pid: `DL-${p.rank}`, rank: p.rank }));
  }
  if (pg === 'DT' || pg === 'NT') {
    return (rawRoster['DL'] ?? [])
      .filter((p) => DL_ROLES[p.name] === 'DT' || DL_ROLES[p.name] === 'NT')
      .map((p) => ({ pid: `DL-${p.rank}`, rank: p.rank }));
  }
  return (rawRoster[pg] ?? []).map((p) => ({ pid: `${pg}-${p.rank}`, rank: p.rank }));
}

function autoAssignSlots(slotDefs: Omit<FieldSlot, 'playerId'>[]): FieldSlot[] {
  const used = new Set<string>();

  return slotDefs.map((slot) => {
    let chosen: string | null = null;
    for (const pg of slot.posGroup) {
      const players = playersForGroup(pg).slice().sort((a, b) => a.rank - b.rank);
      for (const p of players) {
        if (!used.has(p.pid)) {
          chosen = p.pid;
          break;
        }
      }
      if (chosen) break;
    }
    if (chosen) used.add(chosen);
    return { ...slot, playerId: chosen };
  });
}

// ─── Formation configs ────────────────────────────────────────────────────────

const OFFENSE_FORMATIONS = ['Spread', 'Pistol', 'Pro Set', 'Trips', 'Empty'] as const;
const DEFENSE_FORMATIONS = ['4-2-5', '3-4', '4-3', 'Nickel', 'Dime'] as const;
type OffenseFormation = typeof OFFENSE_FORMATIONS[number];
type DefenseFormation = typeof DEFENSE_FORMATIONS[number];

// ─── Opponent (scout team) positions ──────────────────────────────────────────
// Generic, name/number-less markers for the other team, positioned above the LOS.
// When viewing OUR offense (LOS y=52), the opponent shows a 4-3 defense.
// When viewing OUR defense (LOS y=30), the opponent shows a Pistol offense.

interface OppMarker { id: string; label: string; x: number; y: number }

// Opponent 4-3 defense vs our offense — sits just above the LOS (y < 52).
const OPP_DEFENSE_43: OppMarker[] = [
  { id: 'o-de1', label: 'DE', x: 22, y: 48 },
  { id: 'o-dt1', label: 'DT', x: 40, y: 48 },
  { id: 'o-dt2', label: 'DT', x: 56, y: 48 },
  { id: 'o-de2', label: 'DE', x: 74, y: 48 },
  { id: 'o-lb1', label: 'LB', x: 30, y: 40 },
  { id: 'o-lb2', label: 'LB', x: 48, y: 40 },
  { id: 'o-lb3', label: 'LB', x: 66, y: 40 },
  { id: 'o-cb1', label: 'CB', x: 8,  y: 44 },
  { id: 'o-cb2', label: 'CB', x: 92, y: 44 },
  { id: 'o-s1',  label: 'S',  x: 36, y: 30 },
  { id: 'o-s2',  label: 'S',  x: 62, y: 30 },
];

// Opponent Pistol offense vs our defense — sits above the LOS (y < 30).
const OPP_OFFENSE_PISTOL: OppMarker[] = [
  { id: 'o-lt', label: 'OL', x: 34, y: 26 },
  { id: 'o-lg', label: 'OL', x: 42, y: 26 },
  { id: 'o-c',  label: 'OL', x: 50, y: 26 },
  { id: 'o-rg', label: 'OL', x: 58, y: 26 },
  { id: 'o-rt', label: 'OL', x: 66, y: 26 },
  { id: 'o-te', label: 'TE', x: 72, y: 26 },
  { id: 'o-wr1', label: 'WR', x: 8,  y: 26 },
  { id: 'o-wr2', label: 'WR', x: 92, y: 26 },
  { id: 'o-slot', label: 'WR', x: 22, y: 24 },
  { id: 'o-qb', label: 'QB', x: 50, y: 17 },
  { id: 'o-rb', label: 'RB', x: 50, y: 10 },
];

// ─── Route / coverage drawing ────────────────────────────────────────────────

// Offensive route tree
const ROUTES = ['Go', 'Post', 'Corner', 'Curl', 'Dig', 'Out', 'Slant', 'Screen', 'Wheel', 'Flat'] as const;
// Defensive coverage assignments — zones the player is responsible for, or MAN
const COVERAGES = ['MAN', 'Flat', 'Curl', 'Hook', 'Deep Third', 'Deep Half', 'Deep Middle', 'Blitz'] as const;

type RouteType = typeof ROUTES[number];
type CoverageType = typeof COVERAGES[number];
type AssignType = RouteType | CoverageType;

interface RouteEntry { route: AssignType; flip: boolean; color: string; kind: 'route' | 'coverage' }

const ROUTE_COLORS = [
  '#FFD700', '#FF6B6B', '#6BFFB8', '#6BB8FF', '#FF6BFF',
  '#FFA500', '#00FFFF', '#FF4444', '#44FF44', '#FFFF44',
];

// Generates SVG path data for an offensive route starting at (x, y) in viewBox
// coords (0–100). dir: -1 = upward (offense). flip: mirrors horizontal direction.
function routePath(route: RouteType, x: number, y: number, flip: boolean, dir: number): string {
  const h = flip ? -1 : 1;
  switch (route) {
    case 'Go':     return `M ${x} ${y} L ${x} ${y + dir * 30}`;
    case 'Slant':  return `M ${x} ${y} L ${x + h * 14} ${y + dir * 22}`;
    case 'Out':    return `M ${x} ${y} L ${x} ${y + dir * 14} L ${x + h * 14} ${y + dir * 14}`;
    case 'Dig':    return `M ${x} ${y} L ${x} ${y + dir * 14} L ${x - h * 14} ${y + dir * 14}`;
    case 'Post':   return `M ${x} ${y} L ${x} ${y + dir * 14} L ${x - h * 14} ${y + dir * 28}`;
    case 'Corner': return `M ${x} ${y} L ${x} ${y + dir * 14} L ${x + h * 14} ${y + dir * 28}`;
    case 'Curl':   return `M ${x} ${y} L ${x} ${y + dir * 20} Q ${x + h * 6} ${y + dir * 26} ${x} ${y + dir * 24}`;
    case 'Flat':   return `M ${x} ${y} L ${x + h * 12} ${y + dir * 4}`;
    case 'Screen': return `M ${x} ${y} L ${x - h * 8} ${y - dir * 5}`;
    case 'Wheel':  return `M ${x} ${y} L ${x + h * 10} ${y + dir * 6} L ${x + h * 12} ${y + dir * 28}`;
    default:       return '';
  }
}

// For a defensive coverage assignment, returns the zone target (a point to drop
// to) plus an optional radius so we can draw a zone bubble. dir: +1 = drop back
// toward the defense's deep field (downward). MAN/Blitz attack the LOS (upward).
function coverageTarget(
  cov: CoverageType, x: number, y: number, flip: boolean, dir: number
): { tx: number; ty: number; r: number; attack: boolean } {
  const h = flip ? -1 : 1;
  switch (cov) {
    case 'MAN':         return { tx: x, ty: y - dir * 8, r: 0, attack: true };
    case 'Blitz':       return { tx: x, ty: y - dir * 16, r: 0, attack: true };
    case 'Flat':        return { tx: x + h * 18, ty: y + dir * 8, r: 5, attack: false };
    case 'Curl':        return { tx: x + h * 10, ty: y + dir * 14, r: 5, attack: false };
    case 'Hook':        return { tx: x, ty: y + dir * 14, r: 5, attack: false };
    case 'Deep Third':  return { tx: x + h * 12, ty: y + dir * 30, r: 6, attack: false };
    case 'Deep Half':   return { tx: x + h * 8,  ty: y + dir * 32, r: 7, attack: false };
    case 'Deep Middle': return { tx: x, ty: y + dir * 32, r: 6, attack: false };
    default:            return { tx: x, ty: y, r: 0, attack: false };
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const GRADE_ORDER: Record<string, number> = { SR: 0, GR: 1, JR: 2, SO: 3, So: 3, FR: 4 };

const YEAR_COLORS: Record<string, string> = {
  FR: 'bg-emerald-900/60 text-emerald-300',
  SO: 'bg-sky-900/60 text-sky-300',
  So: 'bg-sky-900/60 text-sky-300',
  JR: 'bg-violet-900/60 text-violet-300',
  SR: 'bg-orange-900/60 text-orange-300',
  GR: 'bg-rose-900/60 text-rose-300',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
}

const NAME_SUFFIXES = new Set(['Jr.', 'Sr.', 'II', 'III', 'IV', 'V']);

function getLastName(name: string) {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2 && NAME_SUFFIXES.has(parts[parts.length - 1])) {
    return `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
  }
  return parts[parts.length - 1] ?? name;
}

function PlayerAvatar({
  player,
  size = 'md',
}: {
  player: Player;
  size?: 'sm' | 'md';
}) {
  const initials = getInitials(player.name);
  const sz = size === 'sm' ? 'w-9 h-9 text-[11px]' : 'w-11 h-11 text-sm';
  return (
    <div
      className={`${sz} rounded-full bg-cu-gold/20 border border-cu-gold/50 flex items-center justify-center font-black text-cu-gold flex-shrink-0`}
    >
      {initials}
    </div>
  );
}

// A draggable player card placed on a field slot
function DraggablePlayerCard({
  slotId,
  player,
  isOver,
}: {
  slotId: string;
  player: Player;
  isOver: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `drag-${slotId}`,
    data: { slotId, playerId: player ? `${player.posGroup}-${player.rank}` : null },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        absolute flex flex-col items-center cursor-grab active:cursor-grabbing select-none
        ${isDragging ? 'opacity-30' : ''}
        ${isOver ? 'scale-110' : ''}
        transition-transform
      `}
      style={{ touchAction: 'none' }}
    >
      <div
        className={`
          flex flex-col items-center bg-black/85 border rounded-lg px-1 py-1.5 gap-0.5 shadow-lg w-[70px]
          ${isOver ? 'border-cu-gold shadow-cu-gold/40' : 'border-cu-gold/50'}
        `}
      >
        <PlayerAvatar player={player} size="sm" />
        <span className="text-cu-gold font-black text-xs leading-none">#{player.number}</span>
        <span className="text-white font-semibold text-[10px] leading-none text-center w-full truncate">
          {getLastName(player.name)}
        </span>
        <span
          className={`text-[8px] font-bold px-1 rounded leading-none ${YEAR_COLORS[player.year] ?? 'bg-gray-700 text-gray-400'}`}
        >
          {player.year}
        </span>
      </div>
    </div>
  );
}

// A droppable empty slot
function EmptySlotCard({
  slotId,
  label,
  isOver,
}: {
  slotId: string;
  label: string;
  isOver: boolean;
}) {
  const { setNodeRef } = useDroppable({ id: `drop-${slotId}` });
  return (
    <div
      ref={setNodeRef}
      className={`
        absolute flex flex-col items-center justify-center
        w-[70px] h-[70px] rounded-lg border-2 border-dashed
        ${isOver ? 'border-cu-gold bg-cu-gold/10' : 'border-white/20 bg-white/5'}
        transition-all
      `}
    >
      <span className="text-white/40 text-xs font-bold">{label}</span>
    </div>
  );
}

// Wrapper that is both draggable and droppable
function FieldSlotNode({
  slot,
  player,
  activeSlotId,
  overSlotId,
}: {
  slot: FieldSlot;
  player: Player | null;
  activeSlotId: string | null;
  overSlotId: string | null;
}) {
  const { setNodeRef: dropRef, isOver } = useDroppable({ id: `drop-${slot.id}` });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${slot.x}%`,
    top: `${slot.y}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: activeSlotId === slot.id ? 50 : 10,
  };

  return (
    <div ref={dropRef} style={style}>
      {player ? (
        <DraggablePlayerCard
          slotId={slot.id}
          player={player}
          isOver={isOver || overSlotId === slot.id}
        />
      ) : (
        <EmptySlotCard
          slotId={slot.id}
          label={slot.label}
          isOver={isOver || overSlotId === slot.id}
        />
      )}
      {/* Position label below */}
      {player && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold text-cu-gold/80 whitespace-nowrap">
          {slot.label}
        </div>
      )}
    </div>
  );
}

// ─── Football field SVG background ───────────────────────────────────────────

function FieldBackground({ side }: { side: Side }) {
  const lines = Array.from({ length: 6 }, (_, i) => i);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Field base */}
      <rect x="0" y="0" width="100" height="100" fill="#1a6b2f" />

      {/* End zone */}
      {side === 'offense' ? (
        <rect x="0" y="0" width="100" height="12" fill="#000000" />
      ) : (
        <rect x="0" y="88" width="100" height="12" fill="#000000" />
      )}

      {/* COLORADO text in end zone */}
      {side === 'offense' ? (
        <text x="50" y="8" textAnchor="middle" fontSize="5" fontWeight="bold"
          fill="#CFB227" opacity="0.85" fontFamily="sans-serif" letterSpacing="2.5">
          COLORADO
        </text>
      ) : (
        <text x="50" y="95" textAnchor="middle" fontSize="5" fontWeight="bold"
          fill="#CFB227" opacity="0.85" fontFamily="sans-serif" letterSpacing="2.5">
          COLORADO
        </text>
      )}

      {/* Yard lines */}
      {lines.map((i) => {
        const y = 15 + i * 13;
        return (
          <g key={i}>
            <line x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="0.3" opacity="0.5" />
            <line x1="30" y1={y - 1} x2="30" y2={y + 1} stroke="white" strokeWidth="0.3" opacity="0.4" />
            <line x1="70" y1={y - 1} x2="70" y2={y + 1} stroke="white" strokeWidth="0.3" opacity="0.4" />
          </g>
        );
      })}

      {/* Sideline markers */}
      <line x1="3" y1="12" x2="3" y2="88" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="97" y1="12" x2="97" y2="88" stroke="white" strokeWidth="0.5" opacity="0.4" />

      {/* Line of scrimmage highlight */}
      {side === 'offense' ? (
        <line x1="0" y1="52" x2="100" y2="52" stroke="#CFB227" strokeWidth="0.6" opacity="0.5" strokeDasharray="3,2" />
      ) : (
        <line x1="0" y1="30" x2="100" y2="30" stroke="#CFB227" strokeWidth="0.6" opacity="0.5" strokeDasharray="3,2" />
      )}

    </svg>
  );
}

// ─── Bench (remaining players) ────────────────────────────────────────────────

function BenchSection({
  benchPlayers,
  selectedBench,
  onSelectBench,
}: {
  benchPlayers: Player[];
  selectedBench: string | null;
  onSelectBench: (pid: string | null) => void;
}) {
  const byPos: Record<string, Player[]> = {};
  for (const p of benchPlayers) {
    if (!byPos[p.posGroup]) byPos[p.posGroup] = [];
    byPos[p.posGroup].push(p);
  }
  // Sort each position group by grade level (SR first) then by depth-chart rank
  for (const pos of Object.keys(byPos)) {
    byPos[pos].sort((a, b) => {
      const g = (GRADE_ORDER[a.year] ?? 5) - (GRADE_ORDER[b.year] ?? 5);
      return g !== 0 ? g : a.rank - b.rank;
    });
  }

  return (
    <div className="mt-4">
      <h3 className="text-cu-gold/70 text-xs font-bold uppercase tracking-wide mb-2">
        Bench / Reserves
      </h3>
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2 min-w-max">
          {Object.entries(byPos).map(([pos, players]) => (
            <div key={pos} className="flex flex-col gap-1">
              <span className="text-gray-500 text-[9px] font-bold uppercase tracking-wider text-center">{pos}</span>
              <div className="flex gap-1.5">
                {players.map((p) => {
                  const pid = `${p.posGroup}-${p.rank}`;
                  const isSelected = selectedBench === pid;
                  return (
                    <button
                      key={pid}
                      onClick={() => onSelectBench(isSelected ? null : pid)}
                      className={`
                        flex flex-col items-center p-2 rounded-lg border transition-all min-w-[100px]
                        ${isSelected
                          ? 'border-cu-gold bg-cu-gold/10 shadow-lg shadow-cu-gold/20'
                          : 'border-white/10 bg-cu-gray hover:border-cu-gold/30'
                        }
                      `}
                      title={`${p.name} #${p.number} — click then tap a field slot to swap`}
                    >
                      <PlayerAvatar player={p} size="sm" />
                      <span className="text-xs text-cu-gold font-black mt-1">#{p.number}</span>
                      <span className="text-xs text-white font-medium truncate max-w-[92px] text-center">{getLastName(p.name)}</span>
                      <span className={`text-[8px] font-bold px-1 rounded mt-0.5 ${YEAR_COLORS[p.year] ?? ''}`}>{p.year}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {benchPlayers.length === 0 && (
            <span className="text-gray-600 text-xs italic">All players are on the field</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Player info panel (click on field player) ───────────────────────────────

function PlayerInfoPanel({ player, onClose }: { player: Player; onClose: () => void }) {
  return (
    <div className="absolute top-2 right-2 z-50 bg-black/90 border border-cu-gold/50 rounded-xl p-3 shadow-2xl w-44">
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-gray-500 hover:text-white text-xs"
        aria-label="Close"
      >
        &#x2715;
      </button>
      <div className="flex flex-col items-center gap-1">
        <PlayerAvatar player={player} size="md" />
        <span className="text-cu-gold font-black text-sm">#{player.number}</span>
        <span className="text-white font-bold text-xs text-center">{player.name}</span>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${YEAR_COLORS[player.year] ?? ''}`}>{player.year}</span>
        <span className="text-gray-500 text-[9px]">{player.posGroup} &middot; Rank #{player.rank}</span>
      </div>
    </div>
  );
}

// SVG overlay that draws all assigned routes on the field
function RouteOverlay({
  routes,
  slots,
  posOverrides,
  side,
}: {
  routes: Record<string, RouteEntry>;
  slots: FieldSlot[];
  posOverrides: Record<string, { x: number; y: number }>;
  side: Side;
}) {
  const dir = side === 'offense' ? -1 : 1;
  const entries = Object.entries(routes);
  if (entries.length === 0) return null;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {ROUTE_COLORS.map((c) => (
          <marker
            key={c}
            id={`arrow-${c.replace('#', '')}`}
            markerWidth="4" markerHeight="4"
            refX="2" refY="2"
            orient="auto"
          >
            <path d="M0,0 L4,2 L0,4 Z" fill={c} />
          </marker>
        ))}
      </defs>
      {entries.map(([slotId, entry]) => {
        const slot = slots.find((s) => s.id === slotId);
        if (!slot) return null;
        const pos = posOverrides[slotId] || { x: slot.x, y: slot.y };
        const markerId = `arrow-${entry.color.replace('#', '')}`;

        if (entry.kind === 'coverage') {
          const cov = entry.route as CoverageType;
          const { tx, ty, r, attack } = coverageTarget(cov, pos.x, pos.y, entry.flip, dir);
          return (
            <g key={slotId}>
              <path
                d={`M ${pos.x} ${pos.y} L ${tx} ${ty}`}
                stroke={entry.color}
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={attack ? '0' : '2,1.5'}
                opacity="0.9"
                markerEnd={`url(#${markerId})`}
              />
              {r > 0 && (
                <circle cx={tx} cy={ty} r={r} fill={entry.color} opacity="0.12"
                  stroke={entry.color} strokeWidth="0.4" strokeDasharray="1.5,1" />
              )}
              <text x={tx} y={ty + 0.8} textAnchor="middle" fontSize="2.4"
                fontWeight="bold" fill={entry.color} opacity="0.95"
                fontFamily="sans-serif">
                {cov === 'MAN' ? 'MAN' : cov === 'Blitz' ? 'BLZ' : ''}
              </text>
            </g>
          );
        }

        const d = routePath(entry.route as RouteType, pos.x, pos.y, entry.flip, dir);
        return (
          <path
            key={slotId}
            d={d}
            stroke={entry.color}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            markerEnd={`url(#${markerId})`}
          />
        );
      })}
    </svg>
  );
}

// Route picker popover shown when a player is clicked in route-draw mode.
// On offense it offers the route tree; on defense it offers coverage zones.
function RoutePicker({
  slotId,
  side,
  onSelect,
  onFlip,
  onClear,
  onClose,
  currentRoute,
  currentFlip,
}: {
  slotId: string;
  side: Side;
  onSelect: (slotId: string, route: AssignType) => void;
  onFlip: (slotId: string) => void;
  onClear: (slotId: string) => void;
  onClose: () => void;
  currentRoute?: AssignType;
  currentFlip?: boolean;
}) {
  void slotId;
  const options: readonly AssignType[] = side === 'offense' ? ROUTES : COVERAGES;
  const title = side === 'offense' ? 'Route Tree' : 'Coverage';
  return (
    <div className="absolute z-50 bg-black/95 border border-cu-gold/60 rounded-xl p-3 shadow-2xl w-52 top-2 left-1/2 -translate-x-1/2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-cu-gold text-xs font-black uppercase tracking-wide">{title}</span>
        <button onClick={onClose} className="text-gray-500 hover:text-white text-xs">&#x2715;</button>
      </div>
      <div className="grid grid-cols-2 gap-1 mb-2">
        {options.map((r, i) => (
          <button
            key={r}
            onClick={() => onSelect(slotId, r)}
            className={`
              px-2 py-1 rounded text-[10px] font-bold border transition-all text-left
              ${currentRoute === r
                ? 'bg-cu-gold text-black border-cu-gold'
                : 'bg-black/60 border-white/20 text-white hover:border-cu-gold/50'
              }
            `}
            style={{ borderLeftColor: currentRoute === r ? undefined : ROUTE_COLORS[i % ROUTE_COLORS.length], borderLeftWidth: 2 }}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => onFlip(slotId)}
          className={`flex-1 px-2 py-1 rounded text-[10px] font-bold border transition-all ${currentFlip ? 'bg-white/20 border-white/50 text-white' : 'border-white/20 text-gray-400 hover:text-white'}`}
        >
          Flip {currentFlip ? '(on)' : '(off)'}
        </button>
        <button
          onClick={() => onClear(slotId)}
          className="flex-1 px-2 py-1 rounded text-[10px] font-bold border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

// A draggable, name-less opponent marker (the other team's scout look).
function OpponentMarker({
  marker, pos,
}: {
  marker: OppMarker;
  pos: { x: number; y: number };
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `opp-${marker.id}`,
    data: { oppId: marker.id },
  });
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    transform: `translate(-50%, -50%) ${transform ? `translate(${transform.x}px, ${transform.y}px)` : ''}`,
    zIndex: isDragging ? 40 : 6,
    touchAction: 'none',
  };
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-grab active:cursor-grabbing select-none flex flex-col items-center"
    >
      <div className="w-8 h-8 rounded-full bg-white/15 border-2 border-white/60 flex items-center justify-center shadow-md">
        <span className="text-white/70 text-[8px] font-black">{marker.label}</span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DepthChartPage() {
  const [side, setSide] = useState<Side>('offense');
  const [offenseFormation, setOffenseFormation] = useState<OffenseFormation>('Spread');
  const [defenseFormation, setDefenseFormation] = useState<DefenseFormation>('4-2-5');

  const getInitialSlots = useCallback(
    (s: Side, of_: OffenseFormation, df: DefenseFormation): FieldSlot[] => {
      const defs = s === 'offense' ? makeOffenseSlots(of_) : makeDefenseSlots(df);
      return autoAssignSlots(defs);
    },
    []
  );

  const [offenseSlots, setOffenseSlots] = useState<Record<OffenseFormation, FieldSlot[]>>(() => {
    const map = {} as Record<OffenseFormation, FieldSlot[]>;
    for (const f of OFFENSE_FORMATIONS) {
      map[f] = autoAssignSlots(makeOffenseSlots(f));
    }
    return map;
  });

  const [defenseSlots, setDefenseSlots] = useState<Record<DefenseFormation, FieldSlot[]>>(() => {
    const map = {} as Record<DefenseFormation, FieldSlot[]>;
    for (const f of DEFENSE_FORMATIONS) {
      map[f] = autoAssignSlots(makeDefenseSlots(f));
    }
    return map;
  });

  void getInitialSlots;

  const currentSlots: FieldSlot[] =
    side === 'offense' ? offenseSlots[offenseFormation] : defenseSlots[defenseFormation];

  function setCurrentSlots(slots: FieldSlot[]) {
    if (side === 'offense') {
      setOffenseSlots((prev) => ({ ...prev, [offenseFormation]: slots }));
    } else {
      setDefenseSlots((prev) => ({ ...prev, [defenseFormation]: slots }));
    }
  }

  // Free-position overrides: slotId -> {x, y} in % coords
  const fieldRef = useRef<HTMLDivElement>(null);
  const [posOverrides, setPosOverrides] = useState<Record<string, { x: number; y: number }>>({});

  // Opponent (scout team) free-position overrides: oppId -> {x, y}
  const [oppOverrides, setOppOverrides] = useState<Record<string, { x: number; y: number }>>({});

  // Opponent look depends on which side we're viewing:
  // viewing our offense -> opponent is a 4-3 defense; viewing our defense -> Pistol offense.
  const opponents = side === 'offense' ? OPP_DEFENSE_43 : OPP_OFFENSE_PISTOL;

  // Route drawing state
  const [routeMode, setRouteMode] = useState(false);
  const [routes, setRoutes] = useState<Record<string, RouteEntry>>({});
  const [routeTarget, setRouteTarget] = useState<string | null>(null);
  const routeColorIndex = useRef(0);

  function handleSelectRoute(slotId: string, route: AssignType) {
    const existing = routes[slotId];
    const color = existing?.color ?? ROUTE_COLORS[routeColorIndex.current++ % ROUTE_COLORS.length];
    const kind: 'route' | 'coverage' = side === 'offense' ? 'route' : 'coverage';
    setRoutes((prev) => ({ ...prev, [slotId]: { route, flip: existing?.flip ?? false, color, kind } }));
    setRouteTarget(null);
  }

  function handleFlipRoute(slotId: string) {
    setRoutes((prev) => {
      const e = prev[slotId];
      if (!e) return prev;
      return { ...prev, [slotId]: { ...e, flip: !e.flip } };
    });
  }

  function handleClearRoute(slotId: string) {
    setRoutes((prev) => { const n = { ...prev }; delete n[slotId]; return n; });
    setRouteTarget(null);
  }

  // DnD
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);
  const [overSlotId, setOverSlotId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function handleDragStart(event: DragStartEvent) {
    const slotId = (event.active.data.current as { slotId: string })?.slotId;
    setActiveSlotId(slotId ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    if (event.over) {
      const dropId = String(event.over.id);
      const slotId = dropId.replace('drop-', '');
      setOverSlotId(slotId);
    } else {
      setOverSlotId(null);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveSlotId(null);
    setOverSlotId(null);

    const { active, over } = event;

    // Opponent markers: always free-move by drag delta (no slots / swapping).
    const oppId = (active.data.current as { oppId?: string })?.oppId;
    if (oppId) {
      const fieldEl = fieldRef.current;
      if (fieldEl) {
        const rect = fieldEl.getBoundingClientRect();
        const dx = (event.delta.x / rect.width) * 100;
        const dy = (event.delta.y / rect.height) * 100;
        const base = oppOverrides[oppId] ?? opponents.find((o) => o.id === oppId)!;
        setOppOverrides((prev) => ({
          ...prev,
          [oppId]: {
            x: Math.max(2, Math.min(98, base.x + dx)),
            y: Math.max(2, Math.min(98, base.y + dy)),
          },
        }));
      }
      return;
    }

    const fromSlotId = (active.data.current as { slotId: string })?.slotId;
    if (!fromSlotId) return;

    if (!over) {
      // Free-form move: shift position by drag delta
      const fieldEl = fieldRef.current;
      if (fieldEl) {
        const rect = fieldEl.getBoundingClientRect();
        const dx = (event.delta.x / rect.width) * 100;
        const dy = (event.delta.y / rect.height) * 100;
        const slot = currentSlots.find((s) => s.id === fromSlotId);
        if (slot) {
          const cur = posOverrides[fromSlotId] ?? { x: slot.x, y: slot.y };
          setPosOverrides((prev) => ({
            ...prev,
            [fromSlotId]: {
              x: Math.max(2, Math.min(98, cur.x + dx)),
              y: Math.max(2, Math.min(98, cur.y + dy)),
            },
          }));
          // Also update route position if it exists (routes follow the player)
        }
      }
      return;
    }

    const toSlotId = String(over.id).replace('drop-', '');
    if (fromSlotId === toSlotId) return;

    const slots = [...currentSlots];
    const fromIdx = slots.findIndex((s) => s.id === fromSlotId);
    const toIdx = slots.findIndex((s) => s.id === toSlotId);
    if (fromIdx === -1 || toIdx === -1) return;

    const fromSlot = slots[fromIdx];
    const toSlot = slots[toIdx];
    // Swap players between slots
    slots[fromIdx] = { ...fromSlot, playerId: toSlot.playerId };
    slots[toIdx] = { ...toSlot, playerId: fromSlot.playerId };
    setCurrentSlots(slots);
  }

  // Bench click-to-swap
  const [selectedBench, setSelectedBench] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [infoPlayer, setInfoPlayer] = useState<Player | null>(null);

  function handleFieldSlotClick(slotId: string) {
    if (selectedBench) {
      const slots = [...currentSlots];
      const targetIdx = slots.findIndex((s) => s.id === slotId);
      if (targetIdx === -1) return;

      const targetSlot = slots[targetIdx];
      const benchPlayer = PLAYER_MAP[selectedBench];
      if (!benchPlayer) return;

      // Any bench player can be placed into any slot.
      slots[targetIdx] = { ...targetSlot, playerId: selectedBench };
      setCurrentSlots(slots);
      setSelectedBench(null);
      return;
    }

    if (selectedField === slotId) {
      setSelectedField(null);
      setInfoPlayer(null);
    } else {
      setSelectedField(slotId);
      const slot = currentSlots.find((s) => s.id === slotId);
      if (slot?.playerId) {
        setInfoPlayer(PLAYER_MAP[slot.playerId] ?? null);
      } else {
        setInfoPlayer(null);
      }
    }
  }

  // Compute bench = all players not in any current slot
  const onFieldIds = new Set(currentSlots.map((s) => s.playerId).filter(Boolean) as string[]);
  const benchPlayers: Player[] = [];

  for (const [posGroup, players] of Object.entries(rawRoster)) {
    for (const p of players) {
      const pid = `${posGroup}-${p.rank}`;
      if (!onFieldIds.has(pid)) {
        const relevantGroups =
          side === 'offense'
            ? ['QB', 'RB', 'WR', 'TE', 'OL']
            : ['DL', 'LB', 'CB', 'S'];
        if (relevantGroups.includes(posGroup)) {
          benchPlayers.push({ ...p, posGroup });
        }
      }
    }
  }

  function switchSide(s: Side) {
    setSide(s);
    setSelectedBench(null);
    setSelectedField(null);
    setInfoPlayer(null);
    setPosOverrides({});
    setOppOverrides({});
    setRoutes({});
    setRouteTarget(null);
  }

  const activePlayer = activeSlotId
    ? PLAYER_MAP[currentSlots.find((s) => s.id === activeSlotId)?.playerId ?? '']
    : null;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">Formation</span> Editor
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Interactive 2026 field view &mdash; drag players to swap positions
        </p>
      </div>

      {/* Side tabs */}
      <div className="flex gap-2 mb-4">
        {(['offense', 'defense'] as Side[]).map((s) => (
          <button
            key={s}
            onClick={() => switchSide(s)}
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
      <div className="flex flex-wrap gap-2 mb-4">
        {(side === 'offense' ? OFFENSE_FORMATIONS : DEFENSE_FORMATIONS).map((f) => {
          const active =
            side === 'offense' ? offenseFormation === f : defenseFormation === f;
          return (
            <button
              key={f}
              onClick={() => {
                if (side === 'offense') setOffenseFormation(f as OffenseFormation);
                else setDefenseFormation(f as DefenseFormation);
                setSelectedBench(null);
                setSelectedField(null);
                setInfoPlayer(null);
                setPosOverrides({});
                setOppOverrides({});
                setRoutes({});
                setRouteTarget(null);
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

      {/* Route mode toggle + clear */}
      <div className="flex gap-2 mb-3 items-center">
        <button
          onClick={() => { setRouteMode((v) => !v); setRouteTarget(null); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
            routeMode
              ? 'bg-cu-gold text-black border-cu-gold shadow-lg shadow-cu-gold/30'
              : 'bg-cu-gray border-white/10 text-gray-400 hover:text-white'
          }`}
        >
          {routeMode
            ? (side === 'offense' ? '✏️ Drawing Routes' : '✏️ Drawing Coverage')
            : (side === 'offense' ? 'Draw Routes' : 'Draw Coverage')}
        </button>
        {Object.keys(routes).length > 0 && (
          <button
            onClick={() => { setRoutes({}); setRouteTarget(null); }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all"
          >
            {side === 'offense' ? 'Clear All Routes' : 'Clear All Coverage'}
          </button>
        )}
        {routeMode && (
          <span className="text-xs text-gray-400 italic">
            Click a player to assign {side === 'offense' ? 'a route' : 'coverage'}
          </span>
        )}
      </div>

      {/* Hint */}
      {selectedBench && (
        <div className="mb-3 px-3 py-1.5 bg-cu-gold/10 border border-cu-gold/30 rounded-lg text-xs text-cu-gold">
          Bench player selected &mdash; click a field slot to swap in
        </div>
      )}

      {/* Field */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          ref={fieldRef}
          className="relative w-full bg-green-800 rounded-2xl overflow-hidden border border-green-600/30 shadow-2xl"
          style={{ minHeight: '640px', paddingBottom: '78%' }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest('[data-slot]') === null) {
              if (selectedField) { setSelectedField(null); setInfoPlayer(null); }
              if (routeTarget) { setRouteTarget(null); }
            }
          }}
        >
          <FieldBackground side={side} />

          {/* Route overlay */}
          <RouteOverlay routes={routes} slots={currentSlots} posOverrides={posOverrides} side={side} />

          {/* Opponent (scout team) markers — drag to reposition */}
          <div className="absolute inset-0">
            {opponents.map((m) => {
              const pos = oppOverrides[m.id] ?? { x: m.x, y: m.y };
              return <OpponentMarker key={m.id} marker={m} pos={pos} />;
            })}
          </div>

          {/* Slot nodes */}
          <div className="absolute inset-0">
            {currentSlots.map((slot) => {
              const player = slot.playerId ? (PLAYER_MAP[slot.playerId] ?? null) : null;
              const pos = posOverrides[slot.id] ?? { x: slot.x, y: slot.y };
              const isRouteTarget = routeTarget === slot.id;
              return (
                <div
                  key={slot.id}
                  data-slot={slot.id}
                  onClick={() => {
                    if (routeMode && player) {
                      setRouteTarget(isRouteTarget ? null : slot.id);
                      return;
                    }
                    handleFieldSlotClick(slot.id);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isRouteTarget ? 60 : 10,
                  }}
                >
                  {isRouteTarget && (
                    <RoutePicker
                      slotId={slot.id}
                      side={side}
                      onSelect={handleSelectRoute}
                      onFlip={handleFlipRoute}
                      onClear={handleClearRoute}
                      onClose={() => setRouteTarget(null)}
                      currentRoute={routes[slot.id]?.route}
                      currentFlip={routes[slot.id]?.flip}
                    />
                  )}
                  <div style={{ outline: routes[slot.id] ? `2px solid ${routes[slot.id].color}` : undefined, borderRadius: 10 }}>
                    <FieldSlotNode
                      slot={{ ...slot, x: pos.x, y: pos.y }}
                      player={player}
                      activeSlotId={activeSlotId}
                      overSlotId={overSlotId}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Player info panel */}
          {infoPlayer && (
            <PlayerInfoPanel
              player={infoPlayer}
              onClose={() => { setInfoPlayer(null); setSelectedField(null); }}
            />
          )}

          {/* Formation label overlay */}
          <div className="absolute bottom-2 left-3 text-xs text-white/40 font-bold select-none">
            {side === 'offense' ? offenseFormation : defenseFormation}
          </div>

          {/* Side label */}
          <div className="absolute top-2 left-3 text-xs text-white/40 font-bold uppercase select-none">
            {side}
          </div>
        </div>

        {/* DragOverlay */}
        <DragOverlay>
          {activePlayer ? (
            <div className="flex flex-col items-center bg-black/90 border border-cu-gold rounded-lg px-1 py-1.5 shadow-2xl shadow-cu-gold/30 gap-0.5 w-[70px]">
              <PlayerAvatar player={activePlayer} size="sm" />
              <span className="text-cu-gold font-black text-xs">#{activePlayer.number}</span>
              <span className="text-white text-[9px] font-semibold truncate w-full text-center">{getLastName(activePlayer.name)}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Bench */}
      <BenchSection
        benchPlayers={benchPlayers}
        selectedBench={selectedBench}
        onSelectBench={setSelectedBench}
      />

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 bg-cu-gray rounded-xl p-3 border border-cu-gold/10 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-cu-gold/20 border border-cu-gold/50" />
          <span>Drag to swap field positions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-cu-gold/10 border border-cu-gold/30" />
          <span>Click bench player &rarr; click slot to swap in</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-800 border border-cu-gold/30" />
          <span>Gold dashed line = line of scrimmage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/15 border-2 border-white/60" />
          <span>Opponent ({side === 'offense' ? '4-3 defense' : 'Pistol offense'}) &mdash; drag to move</span>
        </div>
        {['FR', 'SO', 'JR', 'SR', 'GR'].map((y) => (
          <span key={y} className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${YEAR_COLORS[y]}`}>{y}</span>
        ))}
      </div>
    </div>
  );
}
