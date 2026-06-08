// Shared 2026 Colorado roster data, keyed by position group.
// Used by both the Formation Editor (/depth-chart) and the Depth Chart (/depth).

export interface RosterPlayer {
  name: string;
  number: string;
  year: string;
  rank: number;
}

export const rawRoster: Record<string, RosterPlayer[]> = {
  QB: [
    { name: 'Julian Lewis',      number: '10', year: 'FR', rank: 1 },
    { name: 'Isaac Wilson',      number: '16', year: 'So', rank: 2 },
    { name: 'Dominiq Ponder',    number: '7',  year: 'JR', rank: 3 },
    { name: 'Kaneal Sweetwyne',  number: '14', year: 'FR', rank: 4 },
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
    { name: 'Kole Mathis',       number: '33', year: 'JR', rank: 14 },
    { name: 'Donavon Stephens',  number: '39', year: 'FR', rank: 15 },
    { name: 'Preston Ashley',    number: '31', year: 'FR', rank: 16 },
  ],
  S: [
    { name: 'Emory Floyd',   number: '8',  year: 'SR', rank: 1 },
    { name: 'Ben Finneseth', number: '28', year: 'SR', rank: 2 },
  ],
};

export const YEAR_COLORS: Record<string, string> = {
  FR: 'bg-emerald-900/60 text-emerald-300',
  SO: 'bg-sky-900/60 text-sky-300',
  So: 'bg-sky-900/60 text-sky-300',
  JR: 'bg-violet-900/60 text-violet-300',
  SR: 'bg-orange-900/60 text-orange-300',
  GR: 'bg-rose-900/60 text-rose-300',
};

const NAME_SUFFIXES = new Set(['Jr.', 'Sr.', 'II', 'III', 'IV', 'V']);

export function getLastName(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2 && NAME_SUFFIXES.has(parts[parts.length - 1])) {
    return `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
  }
  return parts[parts.length - 1] ?? name;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
}
