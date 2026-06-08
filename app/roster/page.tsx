'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Filter, Users, ExternalLink } from 'lucide-react';

interface Player {
  jersey: string;
  name: string;
  position: string;
  positionGroup: string;
  year: string;
  height: string;
  weight: string;
  hometown: string;
  previousSchool?: string;
}

// Official 2026 CU Buffaloes Spring Football Roster — sourced from official PDF
const OFFICIAL_ROSTER: Player[] = [
  // QUARTERBACKS
  { jersey: '10', name: 'Julian Lewis',           position: 'QB', positionGroup: 'Quarterbacks',   year: 'FR', height: "6'1\"",  weight: '190', hometown: 'Carrollton, GA / Carrollton' },
  { jersey: '14', name: 'Kaneal Sweetwyne',       position: 'QB', positionGroup: 'Quarterbacks',   year: 'FR', height: "6'3\"",  weight: '195', hometown: 'Lehi, UT / Skyridge' },
  { jersey: '16', name: 'Isaac Wilson',           position: 'QB', positionGroup: 'Quarterbacks',   year: 'So', height: "6'0\"",  weight: '210', hometown: 'Draper, UT / Corner Canyon',        previousSchool: 'Utah' },
  // RUNNING BACKS
  { jersey: '9',  name: 'Richard Young',          position: 'RB', positionGroup: 'Running Backs',  year: 'JR', height: "5'11\"", weight: '210', hometown: 'Lehigh Acres, FL / Lehigh',          previousSchool: 'Alabama' },
  { jersey: '20', name: 'DeKalon Taylor',         position: 'RB', positionGroup: 'Running Backs',  year: 'SR', height: "5'9\"",  weight: '165', hometown: 'Longview, TX / Longview',            previousSchool: 'Incarnate Word' },
  { jersey: '23', name: 'JaQuail Smith',          position: 'RB', positionGroup: 'Running Backs',  year: 'So', height: "5'11\"", weight: '170', hometown: 'Orlando, FL / Jones',                previousSchool: 'Sacramento State' },
  { jersey: '26', name: 'Damian Henderson II',    position: 'RB', positionGroup: 'Running Backs',  year: 'JR', height: "6'2\"",  weight: '205', hometown: 'Los Alamitos, CA / Los Alamitos',    previousSchool: 'Colorado State/Sacramento State' },
  { jersey: '27', name: 'Bryce Hicks',            position: 'RB', positionGroup: 'Running Backs',  year: 'So', height: "5'9\"",  weight: '185', hometown: 'Atlanta, GA / Carrollton',            previousSchool: 'West Georgia' },
  { jersey: '29', name: 'Micah Welch',            position: 'RB', positionGroup: 'Running Backs',  year: 'JR', height: "5'9\"",  weight: '215', hometown: 'Milledgeville, GA / Baldwin' },
  { jersey: '34', name: 'Titus Bautista',         position: 'RB', positionGroup: 'Running Backs',  year: 'So', height: "5'10\"", weight: '185', hometown: 'Chicago, IL / DePaul College Prep' },
  { jersey: '37', name: 'Leonardo Valle',         position: 'RB', positionGroup: 'Running Backs',  year: 'FR', height: "6'1\"",  weight: '210', hometown: 'Richmond Hill, GA / Richmond Hill' },
  // WIDE RECEIVERS
  { jersey: '3',  name: 'DeAndre Moore Jr.',      position: 'WR', positionGroup: 'Wide Receivers', year: 'SR', height: "6'0\"",  weight: '190', hometown: 'Bellflower, CA / St. John Bosco',    previousSchool: 'Texas' },
  { jersey: '4',  name: 'Ernest Campbell',        position: 'WR', positionGroup: 'Wide Receivers', year: 'So', height: "5'9\"",  weight: '145', hometown: 'Refugio, TX / Refugio',              previousSchool: 'Texas A&M/Sacramento St.' },
  { jersey: '5',  name: 'Hykeem Williams',        position: 'WR', positionGroup: 'Wide Receivers', year: 'SR', height: "6'2\"",  weight: '220', hometown: 'Fort Lauderdale, FL / Stranahan',     previousSchool: 'Florida State' },
  { jersey: '6',  name: 'Quentin Gibson',         position: 'WR', positionGroup: 'Wide Receivers', year: 'So', height: "5'9\"",  weight: '155', hometown: 'Fort Worth, TX / North Crowley' },
  { jersey: '7',  name: 'Kam Perry',              position: 'WR', positionGroup: 'Wide Receivers', year: 'SR', height: "5'9\"",  weight: '170', hometown: 'Marietta, GA / Marietta',            previousSchool: 'Indiana/Miami (Ohio)' },
  { jersey: '8',  name: 'Joseph Williams',        position: 'WR', positionGroup: 'Wide Receivers', year: 'JR', height: "6'2\"",  weight: '200', hometown: 'Arlington, TX / Mansfield Summit',   previousSchool: 'Tulsa' },
  { jersey: '13', name: 'Kaleb Mathis',           position: 'WR', positionGroup: 'Wide Receivers', year: 'JR', height: "5'9\"",  weight: '165', hometown: 'Arlington, TX / Grace Prep' },
  { jersey: '14', name: 'Quanell Farrakhan Jr.',  position: 'WR', positionGroup: 'Wide Receivers', year: 'So', height: "6'1\"",  weight: '180', hometown: 'Houston, TX / North Shore' },
  { jersey: '17', name: 'Christian Ward',         position: 'WR', positionGroup: 'Wide Receivers', year: 'FR', height: "6'3\"",  weight: '205', hometown: 'Carrollton, GA / IMG Academy' },
  { jersey: '18', name: 'Danny Scudero',          position: 'WR', positionGroup: 'Wide Receivers', year: 'SR', height: "5'9\"",  weight: '175', hometown: 'San Jose, CA / Archbishop Mitty',    previousSchool: 'Sacramento State/San Jose State' },
  { jersey: '22', name: 'Tagert Bardin',          position: 'WR', positionGroup: 'Wide Receivers', year: 'JR', height: "6'0\"",  weight: '160', hometown: 'Durango, CO / Durango' },
  { jersey: '32', name: 'Alex Ward',              position: 'WR', positionGroup: 'Wide Receivers', year: 'FR', height: "6'1\"",  weight: '180', hometown: 'Carrollton, GA / IMG Academy' },
  { jersey: '36', name: 'Carson Westbrook',       position: 'WR', positionGroup: 'Wide Receivers', year: 'So', height: "5'11\"", weight: '170', hometown: 'Ellaville, GA / Schley County' },
  // TIGHT ENDS
  { jersey: '82', name: 'Ben Gula',               position: 'TE', positionGroup: 'Tight Ends',     year: 'FR', height: "6'5\"",  weight: '285', hometown: 'Weston, FL / Cypress Bay' },
  { jersey: '83', name: 'Zayne DeSouza',          position: 'TE', positionGroup: 'Tight Ends',     year: 'FR', height: "6'6\"",  weight: '260', hometown: 'Loveland, CO / Loveland' },
  { jersey: '85', name: 'Zach Atkins',            position: 'TE', positionGroup: 'Tight Ends',     year: 'SR', height: "6'4\"",  weight: '240', hometown: 'Olathe, KS / Blue Valley Southwest', previousSchool: 'Northwest Missouri State' },
  { jersey: '86', name: 'Brady Kopetz',           position: 'TE', positionGroup: 'Tight Ends',     year: 'SR', height: "6'4\"",  weight: '270', hometown: 'Portland, OR / Lincoln' },
  { jersey: '87', name: 'Charlie Williams',       position: 'TE', positionGroup: 'Tight Ends',     year: 'JR', height: "6'4\"",  weight: '245', hometown: 'Aspen, CO / IMG Academy',            previousSchool: 'UNLV' },
  { jersey: '88', name: 'Corbin Laisure',         position: 'TE', positionGroup: 'Tight Ends',     year: 'FR', height: "6'5\"",  weight: '250', hometown: 'Bluff City, TN / Science Hill' },
  { jersey: '89', name: 'Fisher Clements',        position: 'TE', positionGroup: 'Tight Ends',     year: 'GR', height: "6'7\"",  weight: '265', hometown: 'Hattiesburg, MS / Mountain View (Idaho)', previousSchool: 'Northern Colorado' },
  // OFFENSIVE LINE
  { jersey: '51', name: 'Chauncey Gooden',        position: 'OL', positionGroup: 'Offensive Line', year: 'FR', height: "6'3\"",  weight: '380', hometown: 'Nashville, TN / Lipscomb Academy' },
  { jersey: '52', name: 'Andre Roye Jr.',         position: 'OL', positionGroup: 'Offensive Line', year: 'SR', height: "6'6\"",  weight: '295', hometown: 'District Heights, MD / St. Frances', previousSchool: 'Maryland' },
  { jersey: '53', name: 'Larry Johnson III',      position: 'OL', positionGroup: 'Offensive Line', year: 'SR', height: "6'7\"",  weight: '350', hometown: 'Savannah, GA / Jenkins',             previousSchool: 'Hutchinson CC/Tennessee' },
  { jersey: '54', name: 'Taj White',              position: 'OL', positionGroup: 'Offensive Line', year: 'SR', height: "6'5\"",  weight: '310', hometown: 'Jersey City, NJ / Hudson Catholic',  previousSchool: 'Rutgers' },
  { jersey: '55', name: 'Bo Hughley',             position: 'OL', positionGroup: 'Offensive Line', year: 'JR', height: "6'7\"",  weight: '295', hometown: 'Fairburn, GA / Langston Hughes',     previousSchool: 'Georgia' },
  { jersey: '56', name: 'Phillip Houston',        position: 'OL', positionGroup: 'Offensive Line', year: 'SR', height: "6'5\"",  weight: '280', hometown: 'McKinney, TX / McKinney Boyd',       previousSchool: 'Navarro College/FIU' },
  { jersey: '57', name: 'Leon Bell',              position: 'OL', positionGroup: 'Offensive Line', year: 'GR', height: "6'8\"",  weight: '330', hometown: 'Dickinson, TX / Dickinson',          previousSchool: 'Kilgore CC/Mississippi State/California' },
  { jersey: '58', name: 'Demetrius Hunter',       position: 'OL', positionGroup: 'Offensive Line', year: 'GR', height: "6'2\"",  weight: '310', hometown: 'Orange, TX / West Orange-Stark',     previousSchool: 'Houston' },
  { jersey: '59', name: 'Yahya Attia',            position: 'OL', positionGroup: 'Offensive Line', year: 'So', height: "6'4\"",  weight: '340', hometown: 'London, England / NFL Academy' },
  { jersey: '62', name: 'Sean Kinney',            position: 'OL', positionGroup: 'Offensive Line', year: 'JR', height: "6'2\"",  weight: '305', hometown: 'Nazareth, PA / Nazareth',            previousSchool: 'Lafayette' },
  { jersey: '71', name: 'Jayvon McFadden',        position: 'OL', positionGroup: 'Offensive Line', year: 'FR', height: "6'3\"",  weight: '295', hometown: 'Upper Marlboro, MD / Riverdale Baptist', previousSchool: 'Ohio State' },
  { jersey: '72', name: 'Xavier Payne',           position: 'OL', positionGroup: 'Offensive Line', year: 'FR', height: "6'7\"",  weight: '320', hometown: 'Canandaigua, NY / Jones' },
  { jersey: '73', name: 'Jose Soto',              position: 'OL', positionGroup: 'Offensive Line', year: 'JR', height: "6'3\"",  weight: '310', hometown: 'Tulare, CA / Tulare Western',        previousSchool: 'Sacramento State' },
  { jersey: '75', name: 'Jayven Richardson',      position: 'OL', positionGroup: 'Offensive Line', year: 'SR', height: "6'6\"",  weight: '315', hometown: 'Gonzales, LA / East Ascension',      previousSchool: 'Hutchinson CC/Missouri' },
  { jersey: '78', name: 'Hudson Steber',          position: 'OL', positionGroup: 'Offensive Line', year: 'FR', height: "6'3\"",  weight: '270', hometown: 'Evergreen, CO / Evergreen' },
  // DEFENSIVE LINE
  { jersey: '27', name: 'Domata Peko Jr.',        position: 'DE', positionGroup: 'Defensive Line', year: 'JR', height: "6'4\"",  weight: '235', hometown: 'Calabasas, CA / Calabasas',          previousSchool: 'Ventura College' },
  { jersey: '41', name: 'Kylan Salter',           position: 'DE', positionGroup: 'Defensive Line', year: 'JR', height: "6'2\"",  weight: '230', hometown: 'Cedar Hill, TX / Cedar Hill',        previousSchool: 'TCU' },
  { jersey: '45', name: 'Vili Taufatofua',        position: 'DL', positionGroup: 'Defensive Line', year: 'SR', height: "6'3\"",  weight: '260', hometown: 'Auckland, New Zealand / Mount Roskill', previousSchool: 'NMMI/Utah/San Jose State' },
  { jersey: '49', name: 'Quency Wiggins',         position: 'DE', positionGroup: 'Defensive Line', year: 'SR', height: "6'5\"",  weight: '255', hometown: 'Baton Rouge, LA / Madison Prep',    previousSchool: 'LSU' },
  { jersey: '52', name: 'Immanuel Ezeogu',        position: 'DE', positionGroup: 'Defensive Line', year: 'So', height: "6'2\"",  weight: '240', hometown: 'Suffolk, VA / Nansemond River',      previousSchool: 'James Madison' },
  { jersey: '53', name: 'Toby Anene',             position: 'DE', positionGroup: 'Defensive Line', year: 'SR', height: "6'4\"",  weight: '260', hometown: 'St. Paul, MN / East Ridge',          previousSchool: 'North Dakota State' },
  { jersey: '56', name: 'Lamont Lester Jr.',      position: 'DL', positionGroup: 'Defensive Line', year: 'So', height: "6'2\"",  weight: '230', hometown: 'Ramsey, NJ / Don Bosco Prep',        previousSchool: 'Monmouth' },
  { jersey: '88', name: 'Samu Taumanupepe',       position: 'DL', positionGroup: 'Defensive Line', year: 'JR', height: "6'3\"",  weight: '375', hometown: 'Humble, TX / Atascocita',            previousSchool: 'Texas A&M/Baylor' },
  { jersey: '90', name: 'Tyler Moore',            position: 'DL', positionGroup: 'Defensive Line', year: 'JR', height: "5'10\"", weight: '290', hometown: 'Locust Grove, GA / Luella',           previousSchool: 'Tennessee State/Coastal Carolina' },
  { jersey: '91', name: 'Sedrick Smith',          position: 'DL', positionGroup: 'Defensive Line', year: 'JR', height: "6'4\"",  weight: '320', hometown: 'Atlanta, GA / South Atlanta',         previousSchool: 'SC State/Alabama A&M/Maryland' },
  { jersey: '94', name: 'Josiah Manu',            position: 'DL', positionGroup: 'Defensive Line', year: 'FR', height: "6'5\"",  weight: '295', hometown: 'Loveland, CO / Thompson Valley' },
  { jersey: '95', name: 'Yamil Talib',            position: 'DE', positionGroup: 'Defensive Line', year: 'So', height: "6'2\"",  weight: '240', hometown: 'Richardson, TX / Richardson Berkner', previousSchool: 'Oklahoma State/Charlotte' },
  { jersey: '96', name: 'Balansama Kamara',       position: 'DE', positionGroup: 'Defensive Line', year: 'SR', height: "6'3\"",  weight: '260', hometown: 'Philadelphia, PA / Central',          previousSchool: 'Temple/Hutchinson CC/Albany' },
  { jersey: '97', name: 'Santana Hopper',         position: 'DL', positionGroup: 'Defensive Line', year: 'SR', height: "6'2\"",  weight: '265', hometown: 'Shelby, NC / Shelby',                previousSchool: 'Appalachian State/Tulane' },
  { jersey: '98', name: 'Ezra Christensen',       position: 'DL', positionGroup: 'Defensive Line', year: 'SR', height: "6'2\"",  weight: '280', hometown: 'Poway, CA / Poway',                  previousSchool: 'SD Mesa/Fresno State/New Mexico State' },
  { jersey: '99', name: 'Dylan Manuel',           position: 'DL', positionGroup: 'Defensive Line', year: 'FR', height: "6'1\"",  weight: '300', hometown: 'Stockbridge, GA / Stockbridge',       previousSchool: 'Appalachian State' },
  // LINEBACKERS
  { jersey: '17', name: 'Liona Lefau',            position: 'LB', positionGroup: 'Linebackers',    year: 'SR', height: "6'1\"",  weight: '230', hometown: 'Kahuka, HI / Kahuku',                previousSchool: 'Texas' },
  { jersey: '35', name: 'Tyler Martinez',         position: 'LB', positionGroup: 'Linebackers',    year: 'SR', height: "6'1\"",  weight: '220', hometown: 'Albuquerque, NM / Volcano Vista',    previousSchool: 'NMMI/New Mexico State' },
  { jersey: '40', name: 'Colby Johnson',          position: 'LB', positionGroup: 'Linebackers',    year: 'FR', height: "6'2\"",  weight: '195', hometown: 'Sammamish, WA / Eastlake' },
  { jersey: '44', name: 'Gideon Lampron',         position: 'LB', positionGroup: 'Linebackers',    year: 'SR', height: "6'0\"",  weight: '220', hometown: 'LaGrange, OH / Keystone',            previousSchool: 'Dayton/Bowling Green' },
  { jersey: '50', name: 'Rodney Colton Jr.',      position: 'LB', positionGroup: 'Linebackers',    year: 'FR', height: "6'1\"",  weight: '225', hometown: 'Newnan, GA / Newnan' },
  { jersey: '51', name: 'Carson Crawford',        position: 'LB', positionGroup: 'Linebackers',    year: 'FR', height: "6'4\"",  weight: '220', hometown: 'Carthage, TX / Carthage' },
  { jersey: '54', name: 'Bo LaPenna',             position: 'LB', positionGroup: 'Linebackers',    year: 'SR', height: "6'1\"",  weight: '235', hometown: 'Commerce City, CO / Adams City' },
  { jersey: '55', name: 'Gage Goldberg',          position: 'LB', positionGroup: 'Linebackers',    year: 'So', height: "6'0\"",  weight: '210', hometown: 'Boerne, TX / Champion' },
  // DEFENSIVE BACKS
  { jersey: '4',  name: 'Naeten Mitchell',        position: 'DB', positionGroup: 'Defensive Backs', year: 'JR', height: "5'10\"", weight: '175', hometown: 'Temple, TX / Temple',               previousSchool: 'New Mexico State' },
  { jersey: '5',  name: 'RJ Johnson',             position: 'DB', positionGroup: 'Defensive Backs', year: 'JR', height: "6'2\"",  weight: '185', hometown: "McDonough, GA / Eagle's Landing" },
  { jersey: '6',  name: 'Boo Carter',             position: 'DB', positionGroup: 'Defensive Backs', year: 'JR', height: "5'11\"", weight: '200', hometown: 'Chattanooga, TN / Bradley Central',  previousSchool: 'Tennessee' },
  { jersey: '7',  name: 'Randon Fontenette',      position: 'DB', positionGroup: 'Defensive Backs', year: 'SR', height: "6'2\"",  weight: '220', hometown: 'Freeport, TX / Brazosport',          previousSchool: 'TCU/Vanderbilt' },
  { jersey: '8',  name: 'Emory Floyd',            position: 'DB', positionGroup: 'Defensive Backs', year: 'SR', height: "6'1\"",  weight: '195', hometown: 'Powder Springs, GA / Hillgrove',     previousSchool: 'South Carolina/Appalachian State' },
  { jersey: '9',  name: 'Jaydan Hardy',           position: 'DB', positionGroup: 'Defensive Backs', year: 'FR', height: "5'10\"", weight: '180', hometown: 'Lewisville, TX / Lewisville',        previousSchool: 'Oklahoma' },
  { jersey: '10', name: 'Makari Vickers',         position: 'DB', positionGroup: 'Defensive Backs', year: 'JR', height: "6'1\"",  weight: '190', hometown: 'Tallahassee, FL / Robert F. Munroe', previousSchool: 'Oklahoma' },
  { jersey: '13', name: 'Jason Stokes Jr.',       position: 'DB', positionGroup: 'Defensive Backs', year: 'So', height: "6'2\"",  weight: '185', hometown: 'Pflugerville, TX / Weiss',           previousSchool: 'Utah' },
  { jersey: '15', name: 'Jah Jah Boyd',           position: 'DB', positionGroup: 'Defensive Backs', year: 'So', height: "5'11\"", weight: '190', hometown: 'Philadelphia, PA / Roman Catholic',   previousSchool: 'Indiana' },
  { jersey: '18', name: 'Paul Omodia',            position: 'DB', positionGroup: 'Defensive Backs', year: 'JR', height: "6'2\"",  weight: '200', hometown: 'Richmond, TX / Fort Bend Bush',      previousSchool: 'Illinois State/Lamar' },
  { jersey: '20', name: 'Cree Thomas',            position: 'DB', positionGroup: 'Defensive Backs', year: 'FR', height: "6'1\"",  weight: '190', hometown: 'Phoenix, AZ / Brophy Prep',          previousSchool: 'Notre Dame' },
  { jersey: '25', name: 'Mojo Williams Jr.',      position: 'DB', positionGroup: 'Defensive Backs', year: 'FR', height: "5'11\"", weight: '170', hometown: 'New Orleans, LA / Edna Karr' },
  { jersey: '26', name: 'Braylon Edwards',        position: 'DB', positionGroup: 'Defensive Backs', year: 'FR', height: "5'11\"", weight: '180', hometown: 'Duncanville, TX / Duncanville' },
  { jersey: '28', name: 'Ben Finneseth',          position: 'DB', positionGroup: 'Defensive Backs', year: 'SR', height: "6'2\"",  weight: '205', hometown: 'Durango, CO / Durango' },
  { jersey: '30', name: 'Justin Eaglin',          position: 'DB', positionGroup: 'Defensive Backs', year: 'SR', height: "6'1\"",  weight: '175', hometown: 'Fayetteville, NC / Pine Forest',     previousSchool: 'James Madison' },
  { jersey: '31', name: 'Preston Ashley',         position: 'CB', positionGroup: 'Defensive Backs', year: 'FR', height: "5'11\"", weight: '185', hometown: 'Brandon, MS / Brandon' },
  { jersey: '33', name: 'Kole Mathis',            position: 'DB', positionGroup: 'Defensive Backs', year: 'So', height: "5'8\"",  weight: '140', hometown: 'Arlington, TX / Fairview' },
  { jersey: '39', name: 'Donavon Stephens',       position: 'DB', positionGroup: 'Defensive Backs', year: 'FR', height: "5'10\"", weight: '170', hometown: 'Alpharetta, GA / Collins Hill',      previousSchool: 'Georgia Military Institute' },
  // SPECIALISTS
  { jersey: '35', name: 'Damon Greaves',          position: 'P',  positionGroup: 'Specialists',     year: 'SR', height: "6'1\"",  weight: '190', hometown: 'Busselton, Australia / Prokick Australia', previousSchool: 'Kansas' },
  { jersey: '38', name: 'Daniel Gerlach',         position: 'P',  positionGroup: 'Specialists',     year: 'JR', height: "6'0\"",  weight: '160', hometown: 'Boulder, CO / Boulder',              previousSchool: 'Colby College' },
  { jersey: '45', name: 'Luke Whiting',           position: 'SN', positionGroup: 'Specialists',     year: 'JR', height: "6'4\"",  weight: '225', hometown: 'Holiday, UT / Olympus',             previousSchool: 'Idaho State/FAU/Georgia Tech' },
  { jersey: '46', name: 'Elliot Arnold',          position: 'PK', positionGroup: 'Specialists',     year: 'FR', height: "5'10\"", weight: '165', hometown: 'Chattanooga, TN / McCallie' },
  { jersey: '50', name: 'Trey Young',             position: 'SN', positionGroup: 'Specialists',     year: 'So', height: "5'10\"", weight: '195', hometown: 'San Juan Capistrano, CA / San Juan Hills', previousSchool: 'Saddleback' },
  { jersey: '60', name: 'Josh McCormick',         position: 'PK', positionGroup: 'Specialists',     year: 'GR', height: "6'0\"",  weight: '220', hometown: 'Austin, TX / Akins',                previousSchool: 'Oregon State/William & Mary/Grambling State' },
  { jersey: '61', name: 'Aiden DeCorte',          position: 'SN', positionGroup: 'Specialists',     year: 'JR', height: "6'1\"",  weight: '300', hometown: 'Jackson, MI / Jackson',              previousSchool: 'Central Michigan' },
];

// ─── 2027 Commits for roster display ────────────────────────────────────────
interface Commit27 {
  name: string; position: string; positionGroup: string; hometown: string; state: string; highSchool: string;
  height?: string; weight?: string; stars: number;
}
const COMMITS_2027: Commit27[] = [
  { name: 'Andre Adams',        position: 'QB',   positionGroup: 'Quarterbacks',   hometown: 'Nashville',      state: 'TN', highSchool: 'Antioch HS',                 stars: 4 },
  { name: 'Steven Alexis',      position: 'RB',   positionGroup: 'Running Backs',  hometown: 'St. Petersburg', state: 'FL', highSchool: 'Northeast HS',               height: "6'0\"", weight: '203', stars: 0 },
  { name: 'Jaiden Kelly-Murray',position: 'WR',   positionGroup: 'Wide Receivers', hometown: 'Mount Pleasant', state: 'SC', highSchool: 'Oceanside Collegiate',       height: "5'10\"", weight: '170', stars: 4 },
  { name: 'Zaquan Linton',      position: 'OT',   positionGroup: 'Offensive Line', hometown: 'Wellington',     state: 'FL', highSchool: 'Wellington HS',              height: "6'5\"", weight: '293', stars: 3 },
  { name: 'Jaiden Lindsay',     position: 'OL',   positionGroup: 'Offensive Line', hometown: 'Olney',          state: 'MD', highSchool: 'Bullis School',              height: "6'3\"", weight: '300', stars: 3 },
  { name: "Li'Marcus Jones",    position: 'OT',   positionGroup: 'Offensive Line', hometown: 'Brentwood',      state: 'TN', highSchool: 'Brentwood Academy',          height: "6'5\"", weight: '285', stars: 4 },
  { name: 'Kenny Fairley',      position: 'DL',   positionGroup: 'Defensive Line', hometown: 'Fairburn',       state: 'GA', highSchool: 'Creekside HS',               height: "6'0\"", weight: '270', stars: 3 },
  { name: 'Jovon Pulliam',      position: 'EDGE', positionGroup: 'Defensive Line', hometown: 'Hoover',         state: 'AL', highSchool: 'Hoover HS',                  stars: 3 },
  { name: "Ba'Roc Willis",      position: 'EDGE', positionGroup: 'Defensive Line', hometown: 'Pell City',      state: 'AL', highSchool: 'Pell City HS',               height: "6'3\"", weight: '230', stars: 3 },
  { name: 'Gabe Jenkins',       position: 'S',    positionGroup: 'Defensive Backs',hometown: 'Pittsburgh',     state: 'PA', highSchool: 'Imani Christian Academy',    height: "6'2\"", weight: '187', stars: 4 },
  { name: 'Prince Washington',  position: 'CB',   positionGroup: 'Defensive Backs',hometown: 'Houston',        state: 'TX', highSchool: 'Lamar HS',                   height: "6'1\"", weight: '185', stars: 0 },
  { name: 'Will Rasmussen',     position: 'CB',   positionGroup: 'Defensive Backs',hometown: 'Orem',           state: 'UT', highSchool: 'Orem HS',                    height: "5'10\"", weight: '180', stars: 3 },
  { name: 'Davon Dericho',      position: 'CB',   positionGroup: 'Defensive Backs',hometown: 'Miami',          state: 'FL', highSchool: 'Killian HS',                 height: "5'9\"", stars: 3 },
];

const GRADE_ORDER: Record<string, number> = { SR: 0, GR: 1, JR: 2, SO: 3, So: 3, FR: 4 };

function sortPlayers(players: Player[]): Player[] {
  return [...players].sort((a, b) => {
    // (HS) commits always appear last
    const aHS = a.year === '(HS)' ? 1 : 0;
    const bHS = b.year === '(HS)' ? 1 : 0;
    if (aHS !== bHS) return aHS - bHS;
    const gradeDiff = (GRADE_ORDER[a.year] ?? 5) - (GRADE_ORDER[b.year] ?? 5);
    if (gradeDiff !== 0) return gradeDiff;
    return parseInt(a.jersey) - parseInt(b.jersey);
  });
}

const POSITION_FILTERS = ['All', 'QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB', 'K/P'];

const POSITION_FILTER_MAP: Record<string, string[]> = {
  QB: ['QB'],
  RB: ['RB', 'FB'],
  WR: ['WR'],
  TE: ['TE'],
  OL: ['OL', 'OT', 'OG', 'C'],
  DL: ['DE', 'DL', 'DT', 'NT'],
  LB: ['LB', 'ILB', 'OLB'],
  DB: ['CB', 'DB', 'S', 'FS', 'SS'],
  'K/P': ['K', 'P', 'PK', 'SN', 'LS'],
};

interface EspnAthlete {
  id: string;
  displayName: string;
  headshot?: { href: string };
}

function YearBadge({ year }: { year: string }) {
  if (year === '(HS)') {
    return <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-cu-gold/20 text-cu-gold border border-cu-gold/30">(HS)</span>;
  }
  const upper = year.toUpperCase();
  const colors: Record<string, string> = {
    FR: 'bg-green-900/60 text-green-400',
    SO: 'bg-blue-900/60 text-blue-400',
    JR: 'bg-purple-900/60 text-purple-400',
    SR: 'bg-orange-900/60 text-orange-400',
    GR: 'bg-red-900/60 text-red-400',
  };
  return (
    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${colors[upper] || 'bg-gray-700 text-gray-400'}`}>
      {upper}
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

export default function RosterPage() {
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [headshotMap, setHeadshotMap] = useState<Record<string, string>>({});
  const [loadingHeadshots, setLoadingHeadshots] = useState(true);
  const [showCommits, setShowCommits] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Step 1: roster fetch for headshots + ESPN IDs
        const res = await fetch(
          'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/38/roster'
        );
        const data = await res.json();

        const headshots: Record<string, string> = {};

        const groups = (data.athletes || []) as { items?: EspnAthlete[] }[];
        for (const group of groups) {
          for (const p of group.items || []) {
            if (!p.displayName) continue;
            const key = p.displayName.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (p.headshot?.href) headshots[key] = p.headshot.href;
          }
        }
        setHeadshotMap(headshots);
      } catch {
        // ESPN API unavailable — render without headshots/stats
      } finally {
        setLoadingHeadshots(false);
      }
    };

    fetchAll();
  }, []);

  const matchesFilter = (p: Player) => {
    if (selectedPosition === 'All') return true;
    const allowed = POSITION_FILTER_MAP[selectedPosition] || [selectedPosition];
    return allowed.includes(p.position);
  };

  // Merge commits into roster as (HS) players when toggled
  const commitPlayers: Player[] = showCommits
    ? COMMITS_2027.filter((c) => matchesFilter(c as unknown as Player)).map((c) => ({
        jersey: '—',
        name: c.name,
        position: c.position,
        positionGroup: c.positionGroup,
        year: `(HS)`,
        height: c.height ?? '',
        weight: c.weight ?? '',
        hometown: `${c.hometown}, ${c.state} / ${c.highSchool}`,
      }))
    : [];

  const filtered = [...OFFICIAL_ROSTER.filter(matchesFilter), ...commitPlayers];

  const grouped = filtered.reduce<Record<string, Player[]>>((acc, p) => {
    if (!acc[p.positionGroup]) acc[p.positionGroup] = [];
    acc[p.positionGroup].push(p);
    return acc;
  }, {});

  const GROUP_ORDER = [
    'Quarterbacks', 'Running Backs', 'Wide Receivers', 'Tight Ends',
    'Offensive Line', 'Defensive Line', 'Linebackers', 'Defensive Backs', 'Specialists',
  ];
  const sortedGroups = GROUP_ORDER.filter(g => grouped[g]);

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
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setShowCommits((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                showCommits
                  ? 'bg-cu-gold text-black border-cu-gold'
                  : 'bg-gray-700/60 text-gray-300 border-gray-600 hover:border-cu-gold/40 hover:text-white'
              }`}
            >
              <span className="text-[10px]">2027</span> Commits
            </button>
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Users size={12} />
              {filtered.length} players
              {loadingHeadshots && <span className="text-gray-600 ml-1">(loading photos&hellip;)</span>}
            </span>
          </div>
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
                    {['#', 'Player', 'Pos', 'Year', 'Height', 'Weight', 'Hometown / High School', 'Prev. School'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-xs text-gray-500 font-bold uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortPlayers(grouped[group]).map((player, i) => {
                    const nameKey = player.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    return (
                      <tr
                        key={`${player.jersey}-${player.name}`}
                        className={`border-b border-gray-800/50 hover:bg-cu-gold/5 transition-colors ${i % 2 === 0 ? '' : 'bg-black/20'}`}
                      >
                        <td className="px-3 py-3 text-cu-gold font-black text-sm w-10">
                          {player.jersey}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <PlayerAvatar
                              name={player.name}
                              headshot={headshotMap[nameKey]}
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 text-center text-gray-600 text-xs">
        Roster sourced from official 2026 Spring Football Roster PDF ·{' '}
        <a
          href="https://cubuffs.com/sports/football/roster"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cu-gold/50 hover:text-cu-gold underline"
        >
          cubuffs.com
        </a>
      </div>
    </div>
  );
}
