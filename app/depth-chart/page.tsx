'use client';

import { useState, useCallback } from 'react';
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

// ─── Types ────────────────────────────────────────────────────────────────────

interface Player {
  name: string;
  number: string;
  year: string;
  rank: number;
  posGroup: string; // QB | RB | WR | TE | OT | OG | C | DL | LB | CB | S
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

// ─── Roster data ──────────────────────────────────────────────────────────────

// Players sourced exclusively from official 2026 Spring Football Roster PDF
const rawRoster: Record<string, Omit<Player, 'posGroup'>[]> = {
  QB: [
    { name: 'Julian Lewis',     number: '10', year: 'FR', rank: 1 },
    { name: 'Isaac Wilson',     number: '16', year: 'SO', rank: 2 },
    { name: 'Dominiq Ponder',   number: '7',  year: 'JR', rank: 3 },
    { name: 'Kaneal Sweetwyne', number: '14', year: 'FR', rank: 4 },
  ],
  RB: [
    { name: 'Richard Young',      number: '9',  year: 'JR', rank: 1 },
    { name: 'Damian Henderson II',number: '26', year: 'JR', rank: 2 },
    { name: 'JaQuail Smith',      number: '23', year: 'SO', rank: 3 },
    { name: 'Micah Welch',        number: '29', year: 'JR', rank: 4 },
    { name: 'Bryce Hicks',        number: '27', year: 'SO', rank: 5 },
    { name: 'DeKalon Taylor',     number: '20', year: 'SR', rank: 6 },
    { name: 'Titus Bautista',     number: '34', year: 'SO', rank: 7 },
    { name: 'Leonardo Valle',     number: '37', year: 'FR', rank: 8 },
  ],
  WR: [
    { name: 'Danny Scudero',        number: '18', year: 'SR', rank: 1 },
    { name: 'DeAndre Moore Jr.',    number: '3',  year: 'SR', rank: 2 },
    { name: 'Joseph Williams',      number: '8',  year: 'JR', rank: 3 },
    { name: 'Hykeem Williams',      number: '5',  year: 'SR', rank: 4 },
    { name: 'Kam Perry',            number: '7',  year: 'SR', rank: 5 },
    { name: 'Quentin Gibson',       number: '6',  year: 'SO', rank: 6 },
    { name: 'Kaleb Mathis',         number: '13', year: 'JR', rank: 7 },
    { name: 'Quanell Farrakhan Jr.',number: '14', year: 'SO', rank: 8 },
    { name: 'Christian Ward',       number: '17', year: 'FR', rank: 9 },
    { name: 'Tagert Bardin',        number: '22', year: 'JR', rank: 10 },
    { name: 'Carson Westbrook',     number: '36', year: 'SO', rank: 11 },
    { name: 'Alex Ward',            number: '32', year: 'FR', rank: 12 },
    { name: 'Ernest Campbell',      number: '4',  year: 'SO', rank: 13 },
  ],
  TE: [
    { name: 'Zach Atkins',    number: '85', year: 'SR', rank: 1 },
    { name: 'Brady Kopetz',   number: '86', year: 'SR', rank: 2 },
    { name: 'Charlie Williams',number:'87', year: 'JR', rank: 3 },
    { name: 'Fisher Clements',number: '89', year: 'GR', rank: 4 },
    { name: 'Ben Gula',       number: '82', year: 'FR', rank: 5 },
    { name: 'Corbin Laisure', number: '88', year: 'FR', rank: 6 },
    { name: 'Zayne DeSouza',  number: '83', year: 'FR', rank: 7 },
  ],
  OT: [
    { name: 'Larry Johnson III',  number: '53', year: 'SR', rank: 1 },
    { name: 'Jayven Richardson',  number: '75', year: 'SR', rank: 2 },
    { name: 'Andre Roye Jr.',     number: '52', year: 'SR', rank: 3 },
    { name: 'Jayvon McFadden',    number: '71', year: 'FR', rank: 4 },
    { name: 'Xavier Payne',       number: '72', year: 'FR', rank: 5 },
    { name: 'Hudson Steber',      number: '78', year: 'FR', rank: 6 },
  ],
  OG: [
    { name: 'Taj White',        number: '54', year: 'SR', rank: 1 },
    { name: 'Bo Hughley',       number: '55', year: 'JR', rank: 2 },
    { name: 'Phillip Houston',  number: '56', year: 'SR', rank: 3 },
    { name: 'Sean Kinney',      number: '62', year: 'JR', rank: 4 },
    { name: 'Chauncey Gooden',  number: '51', year: 'FR', rank: 5 },
    { name: 'Jose Soto',        number: '73', year: 'JR', rank: 6 },
  ],
  C: [
    { name: 'Leon Bell',       number: '57', year: 'GR', rank: 1 },
    { name: 'Demetrius Hunter',number: '58', year: 'GR', rank: 2 },
    { name: 'Yahya Attia',     number: '59', year: 'SO', rank: 3 },
  ],
  DL: [
    { name: 'Quency Wiggins',    number: '49', year: 'SR', rank: 1 },
    { name: 'Toby Anene',        number: '53', year: 'SR', rank: 2 },
    { name: 'Santana Hopper',    number: '97', year: 'SR', rank: 3 },
    { name: 'Domata Peko Jr.',   number: '27', year: 'JR', rank: 4 },
    { name: 'Kylan Salter',      number: '41', year: 'JR', rank: 5 },
    { name: 'Immanuel Ezeogu',   number: '52', year: 'SO', rank: 6 },
    { name: 'Yamil Talib',       number: '95', year: 'SO', rank: 7 },
    { name: 'Balansama Kamara',  number: '96', year: 'SR', rank: 8 },
    { name: 'Vili Taufatofua',   number: '45', year: 'SR', rank: 9 },
    { name: 'Samu Taumanupepe',  number: '88', year: 'JR', rank: 10 },
    { name: 'Lamont Lester Jr.', number: '56', year: 'SO', rank: 11 },
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
    { name: 'Gage Goldberg',     number: '55', year: 'SO', rank: 7 },
    { name: 'Colby Johnson',     number: '40', year: 'FR', rank: 8 },
  ],
  CB: [
    { name: 'Justin Eaglin',    number: '30', year: 'SR', rank: 1 },
    { name: 'Boo Carter',       number: '6',  year: 'JR', rank: 2 },
    { name: 'Randon Fontenette',number: '7',  year: 'SR', rank: 3 },
    { name: 'Preston Ashley',   number: '31', year: 'FR', rank: 4 },
    { name: 'Naeten Mitchell',  number: '4',  year: 'JR', rank: 5 },
    { name: 'Makari Vickers',   number: '10', year: 'JR', rank: 6 },
    { name: 'Jason Stokes Jr.', number: '13', year: 'SO', rank: 7 },
    { name: 'Cree Thomas',      number: '20', year: 'FR', rank: 8 },
    { name: 'Mojo Williams Jr.',number: '25', year: 'FR', rank: 9 },
    { name: 'Braylon Edwards',  number: '26', year: 'FR', rank: 10 },
    { name: 'Kole Mathis',      number: '33', year: 'SO', rank: 11 },
    { name: 'Donavon Stephens', number: '39', year: 'FR', rank: 12 },
  ],
  S: [
    { name: 'Emory Floyd',    number: '8',  year: 'SR', rank: 1 },
    { name: 'Ben Finneseth',  number: '28', year: 'SR', rank: 2 },
    { name: 'RJ Johnson',     number: '5',  year: 'JR', rank: 3 },
    { name: 'Jah Jah Boyd',   number: '15', year: 'SO', rank: 4 },
    { name: 'Paul Omodia',    number: '18', year: 'JR', rank: 5 },
    { name: 'Jaydan Hardy',   number: '9',  year: 'FR', rank: 6 },
  ],
};

// Flatten into a keyed map: "QB-1" → Player
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

// Each slot: id, label, accepted pos groups, x/y %
type FormationSlots = FieldSlot[];

// Offense formations — field is oriented offense at bottom (y=100 = line of scrimmage area)
function makeOffenseSlots(formation: string): Omit<FieldSlot, 'playerId'>[] {
  const LOS_Y = 72; // line of scrimmage y-position
  const OL_Y = LOS_Y;

  const olSlots: Omit<FieldSlot, 'playerId'>[] = [
    { id: 'LT', label: 'LT', posGroup: ['OT'], x: 28, y: OL_Y },
    { id: 'LG', label: 'LG', posGroup: ['OG'], x: 36, y: OL_Y },
    { id: 'C', label: 'C', posGroup: ['C'], x: 44, y: OL_Y },
    { id: 'RG', label: 'RG', posGroup: ['OG'], x: 52, y: OL_Y },
    { id: 'RT', label: 'RT', posGroup: ['OT'], x: 60, y: OL_Y },
  ];

  if (formation === 'Spread') {
    return [
      ...olSlots,
      { id: 'TE', label: 'TE', posGroup: ['TE'], x: 68, y: OL_Y },
      { id: 'QB', label: 'QB', posGroup: ['QB'], x: 44, y: LOS_Y + 10 },
      { id: 'RB', label: 'RB', posGroup: ['RB'], x: 58, y: LOS_Y + 10 },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 12, y: LOS_Y - 2 },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 82, y: LOS_Y - 2 },
      { id: 'WR3', label: 'WR', posGroup: ['WR'], x: 20, y: LOS_Y + 6 },
    ];
  }
  if (formation === 'Pistol') {
    return [
      ...olSlots,
      { id: 'TE', label: 'TE', posGroup: ['TE'], x: 68, y: OL_Y },
      { id: 'QB', label: 'QB', posGroup: ['QB'], x: 44, y: LOS_Y + 7 },
      { id: 'RB', label: 'RB', posGroup: ['RB'], x: 44, y: LOS_Y + 16 },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 12, y: LOS_Y - 2 },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 82, y: LOS_Y - 2 },
    ];
  }
  if (formation === 'Pro Set') {
    return [
      ...olSlots,
      { id: 'TE', label: 'TE', posGroup: ['TE'], x: 68, y: OL_Y },
      { id: 'QB', label: 'QB', posGroup: ['QB'], x: 44, y: LOS_Y + 8 },
      { id: 'FB', label: 'RB', posGroup: ['RB'], x: 36, y: LOS_Y + 16 },
      { id: 'RB', label: 'RB', posGroup: ['RB'], x: 52, y: LOS_Y + 16 },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 12, y: LOS_Y - 2 },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 82, y: LOS_Y - 2 },
    ];
  }
  if (formation === 'Trips') {
    return [
      ...olSlots,
      { id: 'QB', label: 'QB', posGroup: ['QB'], x: 44, y: LOS_Y + 10 },
      { id: 'RB', label: 'RB', posGroup: ['RB'], x: 58, y: LOS_Y + 10 },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 12, y: LOS_Y - 2 },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 74, y: LOS_Y - 2 },
      { id: 'WR3', label: 'WR', posGroup: ['WR'], x: 82, y: LOS_Y + 4 },
      { id: 'WR4', label: 'WR', posGroup: ['WR'], x: 82, y: LOS_Y - 10 },
    ];
  }
  if (formation === 'Empty') {
    return [
      ...olSlots,
      { id: 'QB', label: 'QB', posGroup: ['QB'], x: 44, y: LOS_Y + 10 },
      { id: 'WR1', label: 'WR', posGroup: ['WR'], x: 10, y: LOS_Y - 4 },
      { id: 'WR2', label: 'WR', posGroup: ['WR'], x: 20, y: LOS_Y + 2 },
      { id: 'WR3', label: 'WR', posGroup: ['WR'], x: 74, y: LOS_Y - 4 },
      { id: 'WR4', label: 'WR', posGroup: ['WR'], x: 82, y: LOS_Y + 2 },
      { id: 'WR5', label: 'WR', posGroup: ['WR'], x: 44, y: LOS_Y + 18 },
    ];
  }
  return [];
}

function makeDefenseSlots(formation: string): Omit<FieldSlot, 'playerId'>[] {
  const LOS_Y = 28;

  if (formation === '4-2-5') {
    return [
      { id: 'DL1', label: 'DE', posGroup: ['DL'], x: 26, y: LOS_Y },
      { id: 'DL2', label: 'DT', posGroup: ['DL'], x: 36, y: LOS_Y },
      { id: 'DL3', label: 'DT', posGroup: ['DL'], x: 52, y: LOS_Y },
      { id: 'DL4', label: 'DE', posGroup: ['DL'], x: 62, y: LOS_Y },
      { id: 'LB1', label: 'LB', posGroup: ['LB'], x: 36, y: LOS_Y + 14 },
      { id: 'LB2', label: 'LB', posGroup: ['LB'], x: 52, y: LOS_Y + 14 },
      { id: 'CB1', label: 'CB', posGroup: ['CB'], x: 10, y: LOS_Y - 4 },
      { id: 'CB2', label: 'CB', posGroup: ['CB'], x: 78, y: LOS_Y - 4 },
      { id: 'CB3', label: 'NB', posGroup: ['CB'], x: 20, y: LOS_Y + 10 },
      { id: 'S1', label: 'SS', posGroup: ['S'], x: 44, y: LOS_Y + 26 },
      { id: 'S2', label: 'FS', posGroup: ['S'], x: 44, y: LOS_Y + 38 },
    ];
  }
  if (formation === '3-4') {
    return [
      { id: 'DL1', label: 'DE', posGroup: ['DL'], x: 28, y: LOS_Y },
      { id: 'DL2', label: 'NT', posGroup: ['DL'], x: 44, y: LOS_Y },
      { id: 'DL3', label: 'DE', posGroup: ['DL'], x: 60, y: LOS_Y },
      { id: 'LB1', label: 'OLB', posGroup: ['LB'], x: 18, y: LOS_Y + 10 },
      { id: 'LB2', label: 'ILB', posGroup: ['LB'], x: 36, y: LOS_Y + 10 },
      { id: 'LB3', label: 'ILB', posGroup: ['LB'], x: 52, y: LOS_Y + 10 },
      { id: 'LB4', label: 'OLB', posGroup: ['LB'], x: 70, y: LOS_Y + 10 },
      { id: 'CB1', label: 'CB', posGroup: ['CB'], x: 10, y: LOS_Y - 4 },
      { id: 'CB2', label: 'CB', posGroup: ['CB'], x: 78, y: LOS_Y - 4 },
      { id: 'S1', label: 'SS', posGroup: ['S'], x: 36, y: LOS_Y + 26 },
      { id: 'S2', label: 'FS', posGroup: ['S'], x: 52, y: LOS_Y + 26 },
    ];
  }
  if (formation === '4-3') {
    return [
      { id: 'DL1', label: 'DE', posGroup: ['DL'], x: 26, y: LOS_Y },
      { id: 'DL2', label: 'DT', posGroup: ['DL'], x: 37, y: LOS_Y },
      { id: 'DL3', label: 'DT', posGroup: ['DL'], x: 51, y: LOS_Y },
      { id: 'DL4', label: 'DE', posGroup: ['DL'], x: 62, y: LOS_Y },
      { id: 'LB1', label: 'WLB', posGroup: ['LB'], x: 28, y: LOS_Y + 14 },
      { id: 'LB2', label: 'MLB', posGroup: ['LB'], x: 44, y: LOS_Y + 14 },
      { id: 'LB3', label: 'SLB', posGroup: ['LB'], x: 60, y: LOS_Y + 14 },
      { id: 'CB1', label: 'CB', posGroup: ['CB'], x: 10, y: LOS_Y - 4 },
      { id: 'CB2', label: 'CB', posGroup: ['CB'], x: 78, y: LOS_Y - 4 },
      { id: 'S1', label: 'SS', posGroup: ['S'], x: 36, y: LOS_Y + 28 },
      { id: 'S2', label: 'FS', posGroup: ['S'], x: 52, y: LOS_Y + 28 },
    ];
  }
  if (formation === 'Nickel') {
    return [
      { id: 'DL1', label: 'DE', posGroup: ['DL'], x: 26, y: LOS_Y },
      { id: 'DL2', label: 'DT', posGroup: ['DL'], x: 36, y: LOS_Y },
      { id: 'DL3', label: 'DT', posGroup: ['DL'], x: 52, y: LOS_Y },
      { id: 'DL4', label: 'DE', posGroup: ['DL'], x: 62, y: LOS_Y },
      { id: 'LB1', label: 'LB', posGroup: ['LB'], x: 44, y: LOS_Y + 12 },
      { id: 'CB1', label: 'CB', posGroup: ['CB'], x: 10, y: LOS_Y - 4 },
      { id: 'CB2', label: 'CB', posGroup: ['CB'], x: 78, y: LOS_Y - 4 },
      { id: 'CB3', label: 'NB', posGroup: ['CB'], x: 20, y: LOS_Y + 8 },
      { id: 'S1', label: 'SS', posGroup: ['S'], x: 36, y: LOS_Y + 26 },
      { id: 'S2', label: 'FS', posGroup: ['S'], x: 52, y: LOS_Y + 26 },
      { id: 'S3', label: 'DB', posGroup: ['S', 'CB'], x: 44, y: LOS_Y + 38 },
    ];
  }
  if (formation === 'Dime') {
    return [
      { id: 'DL1', label: 'DE', posGroup: ['DL'], x: 26, y: LOS_Y },
      { id: 'DL2', label: 'DT', posGroup: ['DL'], x: 36, y: LOS_Y },
      { id: 'DL3', label: 'DT', posGroup: ['DL'], x: 52, y: LOS_Y },
      { id: 'DL4', label: 'DE', posGroup: ['DL'], x: 62, y: LOS_Y },
      { id: 'CB1', label: 'CB', posGroup: ['CB'], x: 10, y: LOS_Y - 4 },
      { id: 'CB2', label: 'CB', posGroup: ['CB'], x: 78, y: LOS_Y - 4 },
      { id: 'CB3', label: 'CB', posGroup: ['CB'], x: 20, y: LOS_Y + 8 },
      { id: 'S1', label: 'SS', posGroup: ['S'], x: 30, y: LOS_Y + 24 },
      { id: 'S2', label: 'FS', posGroup: ['S'], x: 44, y: LOS_Y + 30 },
      { id: 'S3', label: 'DB', posGroup: ['S', 'CB'], x: 58, y: LOS_Y + 24 },
      { id: 'S4', label: 'DB', posGroup: ['S', 'CB'], x: 44, y: LOS_Y + 42 },
    ];
  }
  return [];
}

// ─── Auto-assign logic ────────────────────────────────────────────────────────

function autoAssign(slots: Omit<FieldSlot, 'playerId'>[]): FieldSlot[] {
  // Track how many of each posGroup have been used
  const usageCount: Record<string, number> = {};

  return slots.map((slot) => {
    // Find the best available player for this slot
    let bestPlayerId: string | null = null;

    for (const pg of slot.posGroup) {
      const players = rawRoster[pg] ?? [];
      for (const player of players) {
        const pid = `${pg}-${player.rank}`;
        // Check if already used by a previous slot
        const alreadyUsed = Object.values(usageCount).includes(player.rank) &&
          // refine: track by pid
          false;
        void alreadyUsed; // suppress warning
        if (!usageCount[pid]) {
          bestPlayerId = pid;
          break;
        }
      }
      if (bestPlayerId) break;
    }

    if (bestPlayerId) usageCount[bestPlayerId] = 1;
    return { ...slot, playerId: bestPlayerId };
  });
}

// Better auto-assign: track used pids in a Set
function autoAssignSlots(slotDefs: Omit<FieldSlot, 'playerId'>[]): FieldSlot[] {
  const used = new Set<string>();

  return slotDefs.map((slot) => {
    let chosen: string | null = null;
    for (const pg of slot.posGroup) {
      const players = (rawRoster[pg] ?? []).slice().sort((a, b) => a.rank - b.rank);
      for (const p of players) {
        const pid = `${pg}-${p.rank}`;
        if (!used.has(pid)) {
          chosen = pid;
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

// ─── Sub-components ───────────────────────────────────────────────────────────

const YEAR_COLORS: Record<string, string> = {
  FR: 'bg-emerald-900/60 text-emerald-300',
  SO: 'bg-sky-900/60 text-sky-300',
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

function PlayerAvatar({
  player,
  size = 'md',
}: {
  player: Player;
  size?: 'sm' | 'md';
}) {
  const initials = getInitials(player.name);
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
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
          flex flex-col items-center bg-black/85 border rounded-xl px-2 py-1.5 gap-1 shadow-lg min-w-[72px]
          ${isOver ? 'border-cu-gold shadow-cu-gold/40' : 'border-cu-gold/50'}
        `}
      >
        <PlayerAvatar player={player} size="sm" />
        <span className="text-cu-gold font-black text-xs leading-tight">#{player.number}</span>
        <span className="text-white font-semibold text-[10px] leading-tight text-center max-w-[72px] w-full text-center line-clamp-2">
          {player.name.split(' ').slice(-1)[0]}
        </span>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${YEAR_COLORS[player.year] ?? 'bg-gray-700 text-gray-400'}`}
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
        w-[72px] h-[72px] rounded-xl border-2 border-dashed
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

  // center the card: shift left/up by half the card width/height
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
      {/* Always show position label below */}
      {player && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-cu-gold/70 whitespace-nowrap">
          {slot.label}
        </div>
      )}
    </div>
  );
}

// ─── Football field SVG background ───────────────────────────────────────────

function FieldBackground({ side }: { side: Side }) {
  // Shows 50% of the field relevant to the unit
  // Offense: bottom half (own 40 to opponent 35 roughly)
  // Defense: top half
  const lines = Array.from({ length: 6 }, (_, i) => i); // 6 horizontal lines

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
        <rect x="0" y="0" width="100" height="12" fill="#145222" />
      ) : (
        <rect x="0" y="88" width="100" height="12" fill="#145222" />
      )}

      {/* BUFFS text in end zone */}
      {side === 'offense' ? (
        <text
          x="50"
          y="8"
          textAnchor="middle"
          fontSize="6"
          fontWeight="bold"
          fill="#CFB227"
          opacity="0.6"
          fontFamily="sans-serif"
          letterSpacing="3"
        >
          BUFFS
        </text>
      ) : (
        <text
          x="50"
          y="95"
          textAnchor="middle"
          fontSize="6"
          fontWeight="bold"
          fill="#CFB227"
          opacity="0.6"
          fontFamily="sans-serif"
          letterSpacing="3"
        >
          BUFFS
        </text>
      )}

      {/* Yard lines */}
      {lines.map((i) => {
        const y = 15 + i * 14;
        return (
          <g key={i}>
            <line x1="0" y1={y} x2="100" y2={y} stroke="white" strokeWidth="0.3" opacity="0.5" />
            {/* Hash marks */}
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
        <line x1="0" y1="74" x2="100" y2="74" stroke="#CFB227" strokeWidth="0.5" opacity="0.4" strokeDasharray="3,2" />
      ) : (
        <line x1="0" y1="26" x2="100" y2="26" stroke="#CFB227" strokeWidth="0.5" opacity="0.4" strokeDasharray="3,2" />
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
              <div className="flex gap-1">
                {players.map((p) => {
                  const pid = `${p.posGroup}-${p.rank}`;
                  const isSelected = selectedBench === pid;
                  return (
                    <button
                      key={pid}
                      onClick={() => onSelectBench(isSelected ? null : pid)}
                      className={`
                        flex flex-col items-center p-1.5 rounded-lg border transition-all min-w-[52px]
                        ${isSelected
                          ? 'border-cu-gold bg-cu-gold/10 shadow-lg shadow-cu-gold/20'
                          : 'border-white/10 bg-cu-gray hover:border-cu-gold/30'
                        }
                      `}
                      title={`${p.name} #${p.number} — click then tap a field slot to swap`}
                    >
                      <PlayerAvatar player={p} size="sm" />
                      <span className="text-[8px] text-cu-gold font-bold mt-0.5">#{p.number}</span>
                      <span className="text-[7px] text-gray-300 truncate max-w-[48px]">{p.name.split(' ').slice(-1)[0]}</span>
                      <span className={`text-[6px] font-bold px-0.5 rounded mt-0.5 ${YEAR_COLORS[p.year] ?? ''}`}>{p.year}</span>
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
    <div className="absolute top-2 right-2 z-50 bg-black/90 border border-cu-gold/50 rounded-xl p-3 shadow-2xl w-40">
      <button
        onClick={onClose}
        className="absolute top-1 right-2 text-gray-500 hover:text-white text-xs"
        aria-label="Close"
      >
        ✕
      </button>
      <div className="flex flex-col items-center gap-1">
        <PlayerAvatar player={player} size="md" />
        <span className="text-cu-gold font-black text-sm">#{player.number}</span>
        <span className="text-white font-bold text-xs text-center">{player.name}</span>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${YEAR_COLORS[player.year] ?? ''}`}>{player.year}</span>
        <span className="text-gray-500 text-[9px]">{player.posGroup} · Rank #{player.rank}</span>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DepthChartPage() {
  const [side, setSide] = useState<Side>('offense');
  const [offenseFormation, setOffenseFormation] = useState<OffenseFormation>('Spread');
  const [defenseFormation, setDefenseFormation] = useState<DefenseFormation>('4-2-5');

  // slots state: keyed by formation+side for memoization
  const getInitialSlots = useCallback(
    (s: Side, of_: OffenseFormation, df: DefenseFormation): FieldSlot[] => {
      const defs =
        s === 'offense' ? makeOffenseSlots(of_) : makeDefenseSlots(df);
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

  // suppress unused
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
    if (!over) return;

    const fromSlotId = (active.data.current as { slotId: string })?.slotId;
    const toSlotId = String(over.id).replace('drop-', '');

    if (!fromSlotId || fromSlotId === toSlotId) return;

    // Find both slots
    const slots = [...currentSlots];
    const fromIdx = slots.findIndex((s) => s.id === fromSlotId);
    const toIdx = slots.findIndex((s) => s.id === toSlotId);
    if (fromIdx === -1 || toIdx === -1) return;

    const fromSlot = slots[fromIdx];
    const toSlot = slots[toIdx];

    // Check compatibility: can the fromSlot player go to toSlot?
    const fromPlayerId = fromSlot.playerId;
    const toPlayerId = toSlot.playerId;

    if (fromPlayerId) {
      const fromPlayer = PLAYER_MAP[fromPlayerId];
      if (fromPlayer && !toSlot.posGroup.includes(fromPlayer.posGroup)) {
        // incompatible — don't swap
        return;
      }
    }
    if (toPlayerId) {
      const toPlayer = PLAYER_MAP[toPlayerId];
      if (toPlayer && !fromSlot.posGroup.includes(toPlayer.posGroup)) {
        return;
      }
    }

    // Swap player IDs
    slots[fromIdx] = { ...fromSlot, playerId: toPlayerId };
    slots[toIdx] = { ...toSlot, playerId: fromPlayerId };
    setCurrentSlots(slots);
  }

  // Bench click-to-swap
  const [selectedBench, setSelectedBench] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [infoPlayer, setInfoPlayer] = useState<Player | null>(null);

  function handleFieldSlotClick(slotId: string) {
    // If a bench player is selected, swap it into this slot
    if (selectedBench) {
      const slots = [...currentSlots];
      const targetIdx = slots.findIndex((s) => s.id === slotId);
      if (targetIdx === -1) return;

      const targetSlot = slots[targetIdx];
      const benchPlayer = PLAYER_MAP[selectedBench];
      if (!benchPlayer) return;

      // Check compatibility
      if (!targetSlot.posGroup.includes(benchPlayer.posGroup)) {
        setSelectedBench(null);
        return;
      }

      // Find if bench player is already in some slot (shouldn't be, bench = not on field)
      // The bench player is not on any slot. The slot's current player goes to bench (just removed from slot).
      slots[targetIdx] = { ...targetSlot, playerId: selectedBench };
      setCurrentSlots(slots);
      setSelectedBench(null);
      return;
    }

    // Otherwise toggle field slot selection for info
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
        // Only show players of relevant posGroups for this side
        const relevantGroups =
          side === 'offense'
            ? ['QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C']
            : ['DL', 'LB', 'CB', 'S'];
        if (relevantGroups.includes(posGroup)) {
          benchPlayers.push({ ...p, posGroup });
        }
      }
    }
  }

  // Reset info when switching sides/formations
  function switchSide(s: Side) {
    setSide(s);
    setSelectedBench(null);
    setSelectedField(null);
    setInfoPlayer(null);
  }

  const activePlayer = activeSlotId
    ? PLAYER_MAP[currentSlots.find((s) => s.id === activeSlotId)?.playerId ?? '']
    : null;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white">
          <span className="text-cu-gold">Depth</span> Chart
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Interactive 2026 field view — drag players to swap positions
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

      {/* Hint */}
      {selectedBench && (
        <div className="mb-3 px-3 py-1.5 bg-cu-gold/10 border border-cu-gold/30 rounded-lg text-xs text-cu-gold">
          Bench player selected — click a field slot to swap in
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
          className="relative w-full bg-green-800 rounded-2xl overflow-hidden border border-green-600/30 shadow-2xl"
          style={{ minHeight: '560px', paddingBottom: '0' }}
          onClick={(e) => {
            // Deselect info if clicking field background
            const target = e.target as HTMLElement;
            if (target.closest('[data-slot]') === null && selectedField) {
              setSelectedField(null);
              setInfoPlayer(null);
            }
          }}
        >
          <FieldBackground side={side} />

          {/* Slot nodes */}
          <div className="absolute inset-0">
            {currentSlots.map((slot) => {
              const player = slot.playerId ? (PLAYER_MAP[slot.playerId] ?? null) : null;
              return (
                <div
                  key={slot.id}
                  data-slot={slot.id}
                  onClick={() => handleFieldSlotClick(slot.id)}
                  style={{
                    position: 'absolute',
                    left: `${slot.x}%`,
                    top: `${slot.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  <FieldSlotNode
                    slot={slot}
                    player={player}
                    activeSlotId={activeSlotId}
                    overSlotId={overSlotId}
                  />
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
          <div className="absolute bottom-2 left-3 text-[10px] text-white/30 font-bold select-none">
            {side === 'offense' ? offenseFormation : defenseFormation}
          </div>

          {/* Side label */}
          <div className="absolute top-2 left-3 text-[10px] text-white/30 font-bold uppercase select-none">
            {side}
          </div>
        </div>

        {/* DragOverlay */}
        <DragOverlay>
          {activePlayer ? (
            <div className="flex flex-col items-center bg-black/90 border border-cu-gold rounded-lg px-2 py-1.5 shadow-2xl shadow-cu-gold/30 gap-1">
              <PlayerAvatar player={activePlayer} size="sm" />
              <span className="text-cu-gold font-black text-[10px]">#{activePlayer.number}</span>
              <span className="text-white text-[9px] font-semibold">{activePlayer.name.split(' ').slice(-1)[0]}</span>
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
          <span>Click bench player → click slot to swap in</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-800 border border-cu-gold/30" />
          <span>Gold dashed line = line of scrimmage</span>
        </div>
        {['FR', 'SO', 'JR', 'SR', 'GR'].map((y) => (
          <span key={y} className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${YEAR_COLORS[y]}`}>{y}</span>
        ))}
      </div>
    </div>
  );
}
