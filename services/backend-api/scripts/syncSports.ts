import db from "../config/db";
import {
  fetchScores,
  fetchOdds,
  OddsEvent,
  OddsData,
} from "../services/oddsApiService";
import {
  fetchApiSportsGames,
  mapToStandardEvent,
  ApiSportsSubdomain,
} from "../services/apiSportsService";
import dotenv from "dotenv";

dotenv.config();

interface SportConfig {
  key: string;
  slug: string;
  name: string;
  leagueKey: string;
  leagueName: string;
  region: string;
  logoPrefix: string;
  isIndividualSport?: boolean; // Tennis, MMA — no team logos
  apiSports?: {
    subdomain: ApiSportsSubdomain;
    league: number;
    // season removed to bypass free plan restrictions
  };
}

const SPORTS_TO_SYNC: SportConfig[] = [
  // ── BASKETBALL ─────────────────────────────────────────────
  {
    key: "basketball_nba",
    slug: "basketball",
    name: "Basketball",
    leagueKey: "nba",
    leagueName: "NBA",
    region: "USA",
    logoPrefix: "nba/500/scoreboard",
    apiSports: { subdomain: "basketball", league: 12 },
  },

  // ── SOCCER ─────────────────────────────────────────────────
  {
    key: "soccer_epl",
    slug: "soccer",
    name: "Soccer",
    leagueKey: "premier-league",
    leagueName: "Premier League",
    region: "England",
    logoPrefix: "soccer/500",
    apiSports: { subdomain: "football", league: 39 },
  },
  {
    key: "soccer_uefa_champs_league",
    slug: "soccer",
    name: "Soccer",
    leagueKey: "champions-league",
    leagueName: "Champions League",
    region: "Europe",
    logoPrefix: "soccer/500",
    apiSports: { subdomain: "football", league: 2 },
  },
  {
    key: "soccer_spain_la_liga",
    slug: "soccer",
    name: "Soccer",
    leagueKey: "la-liga",
    leagueName: "La Liga",
    region: "Spain",
    logoPrefix: "soccer/500",
    apiSports: { subdomain: "football", league: 140 },
  },
  {
    key: "soccer_germany_bundesliga",
    slug: "soccer",
    name: "Soccer",
    leagueKey: "bundesliga",
    leagueName: "Bundesliga",
    region: "Germany",
    logoPrefix: "soccer/500",
    apiSports: { subdomain: "football", league: 78 },
  },
  {
    key: "soccer_italy_serie_a",
    slug: "soccer",
    name: "Soccer",
    leagueKey: "serie-a",
    leagueName: "Serie A",
    region: "Italy",
    logoPrefix: "soccer/500",
    apiSports: { subdomain: "football", league: 135 },
  },
  {
    key: "soccer_france_ligue_one",
    slug: "soccer",
    name: "Soccer",
    leagueKey: "ligue-1",
    leagueName: "Ligue 1",
    region: "France",
    logoPrefix: "soccer/500",
    apiSports: { subdomain: "football", league: 61 },
  },
  {
    key: "soccer_uefa_europa_league",
    slug: "soccer",
    name: "Soccer",
    leagueKey: "europa-league",
    leagueName: "Europa League",
    region: "Europe",
    logoPrefix: "soccer/500",
    apiSports: { subdomain: "football", league: 3 },
  },

  // ── ICE HOCKEY ─────────────────────────────────────────────
  {
    key: "icehockey_nhl",
    slug: "ice-hockey",
    name: "Ice Hockey",
    leagueKey: "nhl",
    leagueName: "NHL",
    region: "USA",
    logoPrefix: "nhl/500/scoreboard",
    apiSports: { subdomain: "hockey", league: 57 },
  },

  // ── BASEBALL ───────────────────────────────────────────────
  {
    key: "baseball_mlb",
    slug: "baseball",
    name: "Baseball",
    leagueKey: "mlb",
    leagueName: "MLB",
    region: "USA",
    logoPrefix: "mlb/500/scoreboard",
    apiSports: { subdomain: "baseball", league: 1 },
  },

  // ── AMERICAN FOOTBALL ──────────────────────────────────────
  {
    key: "americanfootball_nfl",
    slug: "american-football",
    name: "American Football",
    leagueKey: "nfl",
    leagueName: "NFL",
    region: "USA",
    logoPrefix: "nfl/500/scoreboard",
    apiSports: { subdomain: "american-football", league: 1 },
  },

  // ── MMA & BOXING ───────────────────────────────────────────
  {
    key: "mma_mixed_martial_arts",
    slug: "mma",
    name: "MMA",
    leagueKey: "ufc",
    leagueName: "UFC",
    region: "World",
    logoPrefix: "mma/500",
    isIndividualSport: true,
  },
  {
    key: "boxing_boxing",
    slug: "boxing",
    name: "Boxing",
    leagueKey: "boxing",
    leagueName: "Boxing",
    region: "World",
    logoPrefix: "boxing/500",
    isIndividualSport: true,
  },

  // ── CRICKET ────────────────────────────────────────────────
  {
    key: "cricket_ipl",
    slug: "cricket",
    name: "Cricket",
    leagueKey: "ipl",
    leagueName: "IPL",
    region: "India",
    logoPrefix: "cricket/500",
  },

  // ── TENNIS ─────────────────────────────────────────────────
  {
    key: "tennis_wta_charleston_open",
    slug: "tennis",
    name: "Tennis",
    leagueKey: "wta-charleston",
    leagueName: "WTA Charleston",
    region: "USA",
    logoPrefix: "tennis/500/scoreboard",
    isIndividualSport: true,
  },

  // ── ADDITIONAL SPORTS ──────────────────────────────────────
  {
    key: "aussierules_afl",
    slug: "aussie-rules",
    name: "Aussie Rules",
    leagueKey: "afl",
    leagueName: "AFL",
    region: "Australia",
    logoPrefix: "afl/500",
  },
  {
    key: "rugbyleague_nrl",
    slug: "rugby-league",
    name: "Rugby League",
    leagueKey: "nrl",
    leagueName: "NRL",
    region: "Australia",
    logoPrefix: "rugby/500",
  },
  {
    key: "rugbyunion_six_nations",
    slug: "rugby-union",
    name: "Rugby Union",
    leagueKey: "six-nations",
    leagueName: "Six Nations",
    region: "Europe",
    logoPrefix: "rugby/500",
  },
  {
    key: "golf_masters_tournament_winner",
    slug: "golf",
    name: "Golf",
    leagueKey: "masters",
    leagueName: "The Masters",
    region: "World",
    logoPrefix: "golf/500",
    isIndividualSport: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// LOGO MAP  –  mapped value is either a full URL (starts with http) or an ESPN
//              CDN abbreviation which gets combined with config.logoPrefix
// ─────────────────────────────────────────────────────────────────────────────
const LOGO_MAP: Record<string, string> = {
  // ── NBA ──────────────────────────────────────────────────────────────────
  "Atlanta Hawks": "atl",
  "Boston Celtics": "bos",
  "Brooklyn Nets": "bkn",
  "Charlotte Hornets": "cha",
  "Chicago Bulls": "chi",
  "Cleveland Cavaliers": "cle",
  "Dallas Mavericks": "dal",
  "Denver Nuggets": "den",
  "Detroit Pistons": "det",
  "Golden State Warriors": "gs",
  "Houston Rockets": "hou",
  "Indiana Pacers": "ind",
  "LA Clippers": "lac",
  "Los Angeles Clippers": "lac",
  "Los Angeles Lakers": "lal",
  "Memphis Grizzlies": "mem",
  "Miami Heat": "mia",
  "Milwaukee Bucks": "mil",
  "Minnesota Timberwolves": "min",
  "New Orleans Pelicans": "no",
  "New York Knicks": "ny",
  "Oklahoma City Thunder": "okc",
  "Orlando Magic": "orl",
  "Philadelphia 76ers": "phi",
  "Phoenix Suns": "phx",
  "Portland Trail Blazers": "por",
  "Sacramento Kings": "sac",
  "San Antonio Spurs": "sa",
  "Toronto Raptors": "tor",
  "Utah Jazz": "utah",
  "Washington Wizards": "was",

  // ── NFL ──────────────────────────────────────────────────────────────────
  "Arizona Cardinals": "ari",
  "Atlanta Falcons": "atl",
  "Baltimore Ravens": "bal",
  "Buffalo Bills": "buf",
  "Carolina Panthers": "car",
  "Chicago Bears": "chi",
  "Cincinnati Bengals": "cin",
  "Cleveland Browns": "cle",
  "Dallas Cowboys": "dal",
  "Denver Broncos": "den",
  "Detroit Lions": "det",
  "Green Bay Packers": "gb",
  "Houston Texans": "hou",
  "Indianapolis Colts": "ind",
  "Jacksonville Jaguars": "jax",
  "Kansas City Chiefs": "kc",
  "Las Vegas Raiders": "lv",
  "Los Angeles Chargers": "lac",
  "Los Angeles Rams": "lar",
  "Miami Dolphins": "mia",
  "Minnesota Vikings": "min",
  "New England Patriots": "ne",
  "New Orleans Saints": "no",
  "New York Giants": "nyg",
  "New York Jets": "nyj",
  "Philadelphia Eagles": "phi",
  "Pittsburgh Steelers": "pit",
  "San Francisco 49ers": "sf",
  "Seattle Seahawks": "sea",
  "Tampa Bay Buccaneers": "tb",
  "Tennessee Titans": "ten",
  "Washington Commanders": "wsh",

  // ── NHL ──────────────────────────────────────────────────────────────────
  "Anaheim Ducks": "ana",
  "Boston Bruins": "bos",
  "Buffalo Sabres": "buf",
  "Calgary Flames": "cgy",
  "Carolina Hurricanes": "car",
  "Chicago Blackhawks": "chi",
  "Colorado Avalanche": "col",
  "Columbus Blue Jackets": "cbj",
  "Dallas Stars": "dal",
  "Detroit Red Wings": "det",
  "Edmonton Oilers": "edm",
  "Florida Panthers": "fla",
  "Los Angeles Kings": "la",
  "Minnesota Wild": "min",
  "Montréal Canadiens": "mtl",
  "Montreal Canadiens": "mtl",
  "Nashville Predators": "nsh",
  "New Jersey Devils": "njd",
  "New York Islanders": "nyi",
  "New York Rangers": "nyr",
  "Ottawa Senators": "ott",
  "Philadelphia Flyers": "phi",
  "Pittsburgh Penguins": "pit",
  "San Jose Sharks": "sjs",
  "Seattle Kraken": "sea",
  "St. Louis Blues": "stl",
  "Tampa Bay Lightning": "tb",
  "Toronto Maple Leafs": "tor",
  "Utah Hockey Club": "utah",
  "Vancouver Canucks": "van",
  "Vegas Golden Knights": "vgk",
  "Washington Capitals": "wsh",
  "Winnipeg Jets": "wpg",

  // ── MLB ──────────────────────────────────────────────────────────────────
  "Arizona Diamondbacks": "ari",
  "Atlanta Braves": "atl",
  "Baltimore Orioles": "bal",
  "Boston Red Sox": "bos",
  "Chicago Cubs": "chc",
  "Chicago White Sox": "cws",
  "Cincinnati Reds": "cin",
  "Cleveland Guardians": "cle",
  "Colorado Rockies": "col",
  "Detroit Tigers": "det",
  "Houston Astros": "hou",
  "Kansas City Royals": "kc",
  "Los Angeles Angels": "laa",
  "Los Angeles Dodgers": "lad",
  "Miami Marlins": "mia",
  "Milwaukee Brewers": "mil",
  "Minnesota Twins": "min",
  "New York Mets": "nym",
  "New York Yankees": "nyy",
  "Oakland Athletics": "oak",
  "Philadelphia Phillies": "phi",
  "Pittsburgh Pirates": "pit",
  "San Diego Padres": "sd",
  "San Francisco Giants": "sf",
  "Seattle Mariners": "sea",
  "St. Louis Cardinals": "stl",
  "Tampa Bay Rays": "tb",
  "Texas Rangers": "tex",
  "Toronto Blue Jays": "tor",
  "Washington Nationals": "wsh",
  "Sacramento River Cats": "oak", // Athletics relocation

  // ── SOCCER – Premier League ──────────────────────────────────────────────
  Arsenal: "https://media.api-sports.io/football/teams/42.png",
  "Aston Villa": "https://media.api-sports.io/football/teams/66.png",
  Bournemouth: "https://media.api-sports.io/football/teams/35.png",
  Brentford: "https://media.api-sports.io/football/teams/55.png",
  "Brighton and Hove Albion":
    "https://media.api-sports.io/football/teams/51.png",
  "Brighton & Hove Albion": "https://media.api-sports.io/football/teams/51.png",
  Chelsea: "https://media.api-sports.io/football/teams/49.png",
  "Crystal Palace": "https://media.api-sports.io/football/teams/52.png",
  Everton: "https://media.api-sports.io/football/teams/45.png",
  Fulham: "https://media.api-sports.io/football/teams/36.png",
  Liverpool: "https://media.api-sports.io/football/teams/40.png",
  "Manchester City": "https://media.api-sports.io/football/teams/50.png",
  "Manchester United": "https://media.api-sports.io/football/teams/33.png",
  "Newcastle United": "https://media.api-sports.io/football/teams/34.png",
  "Nottingham Forest": "https://media.api-sports.io/football/teams/65.png",
  "Tottenham Hotspur": "https://media.api-sports.io/football/teams/47.png",
  "West Ham United": "https://media.api-sports.io/football/teams/48.png",
  "Wolverhampton Wanderers":
    "https://media.api-sports.io/football/teams/39.png",
  "Luton Town": "https://media.api-sports.io/football/teams/1359.png",
  Burnley: "https://media.api-sports.io/football/teams/44.png",
  "Ipswich Town": "https://media.api-sports.io/football/teams/57.png",
  "Leicester City": "https://media.api-sports.io/football/teams/46.png",
  Southampton: "https://media.api-sports.io/football/teams/41.png",

  // ── SOCCER – Champions League / UCL ──────────────────────────────────────
  "Real Madrid": "https://media.api-sports.io/football/teams/541.png",
  Barcelona: "https://media.api-sports.io/football/teams/529.png",
  "Bayern Munich": "https://media.api-sports.io/football/teams/157.png",
  "Bayern Munchen": "https://media.api-sports.io/football/teams/157.png",
  "Paris Saint Germain": "https://media.api-sports.io/football/teams/85.png",
  PSG: "https://media.api-sports.io/football/teams/85.png",
  "Inter Milan": "https://media.api-sports.io/football/teams/505.png",
  "AC Milan": "https://media.api-sports.io/football/teams/489.png",
  Juventus: "https://media.api-sports.io/football/teams/496.png",
  "Atletico Madrid": "https://media.api-sports.io/football/teams/530.png",
  "Atlético Madrid": "https://media.api-sports.io/football/teams/530.png",
  "Borussia Dortmund": "https://media.api-sports.io/football/teams/165.png",
  Porto: "https://media.api-sports.io/football/teams/212.png",
  Benfica: "https://media.api-sports.io/football/teams/211.png",
  Ajax: "https://media.api-sports.io/football/teams/194.png",
  "Shakhtar Donetsk": "https://media.api-sports.io/football/teams/255.png",
  "RB Leipzig": "https://media.api-sports.io/football/teams/173.png",
  "Bayer Leverkusen": "https://media.api-sports.io/football/teams/168.png",

  // ── SOCCER – La Liga ─────────────────────────────────────────────────────
  Sevilla: "https://media.api-sports.io/football/teams/536.png",
  "Sevilla FC": "https://media.api-sports.io/football/teams/536.png",
  Valencia: "https://media.api-sports.io/football/teams/532.png",
  "Athletic Club": "https://media.api-sports.io/football/teams/531.png",
  "Real Sociedad": "https://media.api-sports.io/football/teams/548.png",
  Villarreal: "https://media.api-sports.io/football/teams/533.png",
  "Real Betis": "https://media.api-sports.io/football/teams/543.png",
  Osasuna: "https://media.api-sports.io/football/teams/727.png",
  "Celta Vigo": "https://media.api-sports.io/football/teams/538.png",
  Getafe: "https://media.api-sports.io/football/teams/546.png",
  "Rayo Vallecano": "https://media.api-sports.io/football/teams/728.png",
  Mallorca: "https://media.api-sports.io/football/teams/798.png",
  Girona: "https://media.api-sports.io/football/teams/547.png",
  Alaves: "https://media.api-sports.io/football/teams/724.png",
  "Deportivo Alaves": "https://media.api-sports.io/football/teams/724.png",
  Espanyol: "https://media.api-sports.io/football/teams/535.png",
  "Las Palmas": "https://media.api-sports.io/football/teams/737.png",
  Leganes: "https://media.api-sports.io/football/teams/534.png",
  Leganés: "https://media.api-sports.io/football/teams/534.png",
  Valladolid: "https://media.api-sports.io/football/teams/720.png",

  // ── SOCCER – Bundesliga ──────────────────────────────────────────────────
  "Eintracht Frankfurt": "https://media.api-sports.io/football/teams/169.png",
  Wolfsburg: "https://media.api-sports.io/football/teams/161.png",
  "Borussia Monchengladbach":
    "https://media.api-sports.io/football/teams/163.png",
  "Borussia Mönchengladbach":
    "https://media.api-sports.io/football/teams/163.png",
  "VfB Stuttgart": "https://media.api-sports.io/football/teams/172.png",
  Stuttgart: "https://media.api-sports.io/football/teams/172.png",
  "Union Berlin": "https://media.api-sports.io/football/teams/182.png",
  "SC Freiburg": "https://media.api-sports.io/football/teams/160.png",
  Freiburg: "https://media.api-sports.io/football/teams/160.png",
  "Mainz 05": "https://media.api-sports.io/football/teams/164.png",
  "1. FSV Mainz 05": "https://media.api-sports.io/football/teams/164.png",
  "Werder Bremen": "https://media.api-sports.io/football/teams/162.png",
  "FC Augsburg": "https://media.api-sports.io/football/teams/170.png",
  Augsburg: "https://media.api-sports.io/football/teams/170.png",
  "TSG Hoffenheim": "https://media.api-sports.io/football/teams/167.png",
  Hoffenheim: "https://media.api-sports.io/football/teams/167.png",
  "VfL Bochum": "https://media.api-sports.io/football/teams/176.png",
  Bochum: "https://media.api-sports.io/football/teams/176.png",
  "1. FC Heidenheim": "https://media.api-sports.io/football/teams/189.png",
  Heidenheim: "https://media.api-sports.io/football/teams/189.png",
  "Holstein Kiel": "https://media.api-sports.io/football/teams/190.png",
  "FC St. Pauli": "https://media.api-sports.io/football/teams/191.png",
  "St. Pauli": "https://media.api-sports.io/football/teams/191.png",

  // ── SOCCER – Serie A ─────────────────────────────────────────────────────
  "AS Roma": "https://media.api-sports.io/football/teams/497.png",
  Roma: "https://media.api-sports.io/football/teams/497.png",
  Napoli: "https://media.api-sports.io/football/teams/492.png",
  Lazio: "https://media.api-sports.io/football/teams/487.png",
  Atalanta: "https://media.api-sports.io/football/teams/499.png",
  Fiorentina: "https://media.api-sports.io/football/teams/502.png",
  Torino: "https://media.api-sports.io/football/teams/503.png",
  Bologna: "https://media.api-sports.io/football/teams/500.png",
  Udinese: "https://media.api-sports.io/football/teams/494.png",
  Cagliari: "https://media.api-sports.io/football/teams/488.png",
  "Hellas Verona": "https://media.api-sports.io/football/teams/495.png",
  Sassuolo: "https://media.api-sports.io/football/teams/498.png",
  Monza: "https://media.api-sports.io/football/teams/867.png",
  Empoli: "https://media.api-sports.io/football/teams/511.png",
  Lecce: "https://media.api-sports.io/football/teams/867.png",
  Como: "https://media.api-sports.io/football/teams/867.png",
  Venezia: "https://media.api-sports.io/football/teams/867.png",

  // ── SOCCER – Ligue 1 ─────────────────────────────────────────────────────
  Monaco: "https://media.api-sports.io/football/teams/91.png",
  "AS Monaco": "https://media.api-sports.io/football/teams/91.png",
  Lyon: "https://media.api-sports.io/football/teams/80.png",
  "Olympique Lyonnais": "https://media.api-sports.io/football/teams/80.png",
  Marseille: "https://media.api-sports.io/football/teams/81.png",
  "Olympique de Marseille": "https://media.api-sports.io/football/teams/81.png",
  Rennes: "https://media.api-sports.io/football/teams/93.png",
  Lens: "https://media.api-sports.io/football/teams/116.png",
  "RC Lens": "https://media.api-sports.io/football/teams/116.png",
  Lille: "https://media.api-sports.io/football/teams/79.png",
  Nice: "https://media.api-sports.io/football/teams/84.png",
  "OGC Nice": "https://media.api-sports.io/football/teams/84.png",
  Strasbourg: "https://media.api-sports.io/football/teams/95.png",
  "RC Strasbourg": "https://media.api-sports.io/football/teams/95.png",
  Nantes: "https://media.api-sports.io/football/teams/83.png",
  "FC Nantes": "https://media.api-sports.io/football/teams/83.png",
  Toulouse: "https://media.api-sports.io/football/teams/96.png",
  Reims: "https://media.api-sports.io/football/teams/94.png",
  "Stade de Reims": "https://media.api-sports.io/football/teams/94.png",
  "Le Havre": "https://media.api-sports.io/football/teams/1031.png",
  Auxerre: "https://media.api-sports.io/football/teams/1014.png",
  Brest: "https://media.api-sports.io/football/teams/130.png",
  "Stade Brestois 29": "https://media.api-sports.io/football/teams/130.png",
  Montpellier: "https://media.api-sports.io/football/teams/82.png",
  Angers: "https://media.api-sports.io/football/teams/110.png",
  "Saint-Etienne": "https://media.api-sports.io/football/teams/76.png",
  "AS Saint-Etienne": "https://media.api-sports.io/football/teams/76.png",

  // ── SOCCER – Europa League ───────────────────────────────────────────────
  "Sevilla FC - UEL": "https://media.api-sports.io/football/teams/536.png",
  "Sporting CP": "https://media.api-sports.io/football/teams/228.png",
  "Roma - UEL": "https://media.api-sports.io/football/teams/497.png",

  // ── CRICKET – IPL ────────────────────────────────────────────────────────
  "Mumbai Indians": "https://img.icons8.com/color/512/cricket.png",
  "Chennai Super Kings": "https://img.icons8.com/color/512/cricket.png",
  "Royal Challengers Bengaluru": "https://img.icons8.com/color/512/cricket.png",
  "Royal Challengers Bangalore": "https://img.icons8.com/color/512/cricket.png",
  "Kolkata Knight Riders": "https://img.icons8.com/color/512/cricket.png",
  "Delhi Capitals": "https://img.icons8.com/color/512/cricket.png",
  "Punjab Kings": "https://img.icons8.com/color/512/cricket.png",
  "Rajasthan Royals": "https://img.icons8.com/color/512/cricket.png",
  "Sunrisers Hyderabad": "https://img.icons8.com/color/512/cricket.png",
  "Lucknow Super Giants": "https://img.icons8.com/color/512/cricket.png",
  "Gujarat Titans": "https://img.icons8.com/color/512/cricket.png",
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper: generate a colored initials avatar URL for individual sport athletes
// ─────────────────────────────────────────────────────────────────────────────
function playerAvatar(name: string, sportSlug: string): string {
  const palettes: Record<string, string[]> = {
    tennis: ["1a472a", "1e3a5f", "5c1a1a", "3b1a5f", "1a3f5c", "5f3b1a"],
    mma: ["7b0000", "003366", "1a1a1a", "4b0082", "002244", "3d1a00"],
    boxing: ["8b0000", "000000", "434343", "d4af37", "c0c0c0", "ff0000"],
    golf: ["006400", "ffffff", "ffd700", "228b22", "8b4513", "000080"],
    cricket: ["006400", "00008b", "8b4513", "2f4f4f", "800000", "008080"],
    "aussie-rules": ["003087", "ed1c24", "000000", "ffd700", "004a32"],
  };
  const colors = palettes[sportSlug] ?? ["1a472a", "1e3a5f", "5c1a1a"];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=100&background=${bg}&color=fff&bold=true&length=2`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core sync function – identical pipeline for every sport
// ─────────────────────────────────────────────────────────────────────────────
async function syncSport(config: SportConfig, apiSportsData?: any[]) {
  console.log(`📡 Syncing ${config.leagueName}...`);

  try {
    // 1. Sport
    const [sports]: any = await db.query(
      "SELECT id FROM sports WHERE slug = ?",
      [config.slug],
    );
    let sportId: number;
    if (sports.length === 0) {
      const [r]: any = await db.query(
        "INSERT INTO sports (slug, name, order_index) VALUES (?, ?, ?)",
        [config.slug, config.name, 2],
      );
      sportId = r.insertId;
    } else {
      sportId = sports[0].id;
    }

    // 2. League
    const [leagues]: any = await db.query(
      "SELECT id FROM leagues WHERE slug = ?",
      [config.leagueKey],
    );
    let leagueId: number;
    if (leagues.length === 0) {
      const [r]: any = await db.query(
        "INSERT INTO leagues (sport_id, slug, name, region, is_popular) VALUES (?, ?, ?, ?, ?)",
        [sportId, config.leagueKey, config.leagueName, config.region, true],
      );
      leagueId = r.insertId;
    } else {
      leagueId = leagues[0].id;
    }

    // 3. Fetch
    let scores: any[];
    let oddsData: any[] = [];

    if (config.apiSports && apiSportsData) {
      // Filter the pre-fetched date-based data for this specific league
      const relevantGames = apiSportsData.filter(
        (g: any) => g.league?.id === config.apiSports?.league,
      );
      console.log(
        `   📦 Found ${relevantGames.length} relevant games in pre-fetched data`,
      );
      scores = relevantGames.map((g) => mapToStandardEvent(g, config.key));
    } else {
      const oddsRegion = ["soccer", "ice-hockey"].includes(config.slug)
        ? "uk"
        : "us";
      scores = await fetchScores(config.key);
      oddsData = await fetchOdds(config.key, oddsRegion);
    }

    console.log(`   ✅ ${scores.length} events for ${config.leagueName}`);
    if (scores.length === 0) return;

    for (const event of scores) {
      try {
        // 4. Upsert team / player
        const upsertTeam = async (name: string): Promise<number> => {
          let logo: string;

          if (config.isIndividualSport) {
            logo = playerAvatar(name, config.slug);
          } else {
            const mapped = LOGO_MAP[name];
            if (mapped) {
              logo = mapped.startsWith("http")
                ? mapped
                : `https://a.espncdn.com/i/teamlogos/${config.logoPrefix}/${mapped}.png`;
            } else {
              logo = playerAvatar(name, config.slug); // graceful fallback
            }
          }

          const [existing]: any = await db.query(
            "SELECT id, logo FROM teams WHERE name = ? AND sport_id = ?",
            [name, sportId],
          );
          if (existing.length > 0) {
            const shouldUpdate =
              config.isIndividualSport ||
              existing[0].logo.includes("placeholder") ||
              existing[0].logo.includes("via.placeholder");
            if (shouldUpdate)
              await db.query("UPDATE teams SET logo = ? WHERE id = ?", [
                logo,
                existing[0].id,
              ]);
            return existing[0].id;
          }
          const [r]: any = await db.query(
            "INSERT INTO teams (sport_id, name, logo) VALUES (?, ?, ?)",
            [sportId, name, logo],
          );
          return r.insertId;
        };

        const homeTeamId = await upsertTeam(event.home_team);
        const awayTeamId = await upsertTeam(event.away_team);

        // 5. Upsert match
        const status = event.completed
          ? "finished"
          : event.scores?.length
            ? "live"
            : "upcoming";
        const isLive = status === "live";
        const gameSlug = `${config.leagueKey}-${event.id}`;
        const homeScore =
          parseInt(
            String(
              event.scores?.find((s) => s.name === event.home_team)?.score ??
                "0",
            ),
            10,
          ) || 0;
        const awayScore =
          parseInt(
            String(
              event.scores?.find((s) => s.name === event.away_team)?.score ??
                "0",
            ),
            10,
          ) || 0;
        const periodInfo = event.completed
          ? "Final"
          : isLive
            ? "Live"
            : "Upcoming";

        const [existingMatch]: any = await db.query(
          "SELECT id FROM match_events WHERE slug = ?",
          [gameSlug],
        );
        let matchId: number;
        if (existingMatch.length > 0) {
          matchId = existingMatch[0].id;
          await db.query(
            `UPDATE match_events SET status=?, is_live=?, home_score=?, away_score=?, period_info=?, start_time=?, is_popular=TRUE WHERE id=?`,
            [
              status,
              isLive,
              homeScore,
              awayScore,
              periodInfo,
              new Date(event.commence_time),
              matchId,
            ],
          );
        } else {
          const [r]: any = await db.query(
            `INSERT INTO match_events (league_id, home_team_id, away_team_id, start_time, status, is_live, home_score, away_score, period_info, slug, is_popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              leagueId,
              homeTeamId,
              awayTeamId,
              new Date(event.commence_time),
              status,
              isLive,
              homeScore,
              awayScore,
              periodInfo,
              gameSlug,
              true,
            ],
          );
          matchId = r.insertId;
        }

        // 6. Upsert odds
        const eventOdds = oddsData.find((o) => o.id === event.id);
        if (eventOdds?.bookmakers?.length) {
          const market = eventOdds.bookmakers[0].markets.find(
            (m) => m.key === "h2h",
          );
          if (market) {
            for (const outcome of market.outcomes) {
              let outcomeName = "1";
              if (outcome.name === event.home_team) outcomeName = "1";
              else if (outcome.name === event.away_team) outcomeName = "2";
              else if (outcome.name.toLowerCase() === "draw") outcomeName = "X";

              const [existingOdd]: any = await db.query(
                "SELECT id FROM match_odds WHERE match_id=? AND outcome_name=?",
                [matchId, outcomeName],
              );
              if (existingOdd.length > 0) {
                await db.query(
                  "UPDATE match_odds SET odds_value=?, market_name=? WHERE id=?",
                  [outcome.price, "1x2", existingOdd[0].id],
                );
              } else {
                await db.query(
                  "INSERT INTO match_odds (match_id, market_name, outcome_name, odds_value) VALUES (?, ?, ?, ?)",
                  [matchId, "1x2", outcomeName, outcome.price],
                );
              }
            }
          }
        }
      } catch (err) {
        console.error(`   ❌ Event ${event.id} failed:`, err);
      }
    }
  } catch (error) {
    console.error(`❌ Sync error for ${config.leagueName}:`, error);
  }
}

async function syncAllSports() {
  console.log("🌍 Starting Global Sports Sync (Sync-by-Date Strategy)...");

  // 1. Identify subdomains to fetch
  const subdomains = Array.from(
    new Set(
      SPORTS_TO_SYNC.map((s) => s.apiSports?.subdomain).filter(
        (s): s is ApiSportsSubdomain => !!s,
      ),
    ),
  );

  // 2. Fetch data for Today and Tomorrow for each subdomain
  const today = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  const apiDataMap: Record<ApiSportsSubdomain, any[]> = {
    football: [],
    basketball: [],
    hockey: [],
    baseball: [],
    "american-football": [],
  };

  for (const sub of subdomains) {
    console.log(
      `📡 Pre-fetching ${sub} games for Today (${today}) and Tomorrow (${tomorrow})...`,
    );
    const gamesToday = await fetchApiSportsGames(sub, today);
    const gamesTomorrow = await fetchApiSportsGames(sub, tomorrow);
    apiDataMap[sub] = [...gamesToday, ...gamesTomorrow];
    console.log(
      `   ✅ Total ${apiDataMap[sub].length} games fetched for ${sub}`,
    );
    // Delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 1000));
  }

  // 3. Sync each sport using the pre-fetched data
  for (const sport of SPORTS_TO_SYNC) {
    const preFetched = sport.apiSports
      ? apiDataMap[sport.apiSports.subdomain]
      : undefined;
    await syncSport(sport, preFetched);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("🎉 Global Sync Completed!");
  process.exit();
}

syncAllSports();
