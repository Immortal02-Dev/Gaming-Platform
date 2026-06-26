/*
 * mockSports.ts
 * Server-side mock sportsbook data and utilities
 * - In-memory store of events, markets, and odds
 * - Periodically simulates live updates (odds movement, suspensions, score updates)
 * - Exposes functions to read sidebar, pre-match, live, event markets
 * - Supports odds locking and multi-bet calculations
 */

import { randomUUID } from "crypto";

export type Status = "UPCOMING" | "LIVE" | "SUSPENDED" | "FINISHED";

export type Selection = {
  id: string;
  name: string;
  odds: number;
  lockedUntil?: number | null; // epoch ms until which this selection is locked
  suspended?: boolean;
};

export type Market = {
  id: string;
  title: string;
  label?: string; // localized display title (e.g., '승패')
  selections: Selection[];
  suspended?: boolean;
};

export type Teams = {
  home: string;
  away: string;
  homeFlag?: string;
  awayFlag?: string;
  homeScore?: number;
  awayScore?: number;
};

export type Event = {
  event_id: string;
  sport: string;
  country: string;
  league: string;
  start_time: string; // ISO
  display_time?: string; // e.g. '06/19 17:25'
  league_time_label?: string; // e.g. '오늘 19:00'
  status: Status;
  minute?: number;
  period?: string;
  teams: Teams;
  markets: Market[];
  lastUpdated: number;
};

export type Sidebar = {
  categories: {
    sport: string;
    count: number;
    countries: {
      country: string;
      leagues: { league: string; count: number }[];
    }[];
  }[];
};

// In-memory storage
const EVENTS: Map<string, Event> = new Map();
let lastSeed = 0;

// Configuration
const SPORTS = [
  "Football",
  "Baseball",
  "Basketball",
  "Volleyball",
  "Tennis",
  "LoL",
];
const COUNTRIES = ["England", "Korea", "Japan", "USA", "Spain", "World"];
const LEAGUES = [
  "Premier League",
  "K League 1",
  "J League",
  "MLB",
  "LaLiga",
  "World Cup",
];
const TEAM_NAMES = [
  "United",
  "City",
  "Hotspur",
  "Tigers",
  "Eagles",
  "Stars",
  "Sharks",
  "Wolves",
  "DRX",
  "DN 프릭스",
  "수원 FC",
  "창녕 WFC",
];

function rnd(max = 1) {
  return Math.random() * max;
}
function rndInt(max = 1) {
  return Math.floor(rnd(max));
}
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function makeOdds(base = 1.6) {
  const delta = (rnd() - 0.5) * 0.6;
  const o = Math.round((base + delta) * 100) / 100;
  return clamp(o, 1.01, 99);
}

function createSelection(name: string, base = 1.8): Selection {
  return {
    id: randomUUID(),
    name,
    odds: makeOdds(base),
    lockedUntil: null,
    suspended: false,
  };
}

function createMarket(title: string, home: string, away: string): Market {
  if (title === "Match Winner") {
    return {
      id: randomUUID(),
      title,
      label: "승패",
      selections: [
        createSelection(home, 1.8),
        createSelection("Draw", 3.2),
        createSelection(away, 2.1),
      ],
      suspended: false,
    };
  }
  if (title === "Handicap") {
    return {
      id: randomUUID(),
      title,
      label: "핸디캡",
      selections: [
        createSelection(`${home} -0.5`, 1.95),
        createSelection(`${away} +0.5`, 1.95),
      ],
      suspended: false,
    };
  }
  if (title === "Over/Under") {
    return {
      id: randomUUID(),
      title,
      label: "언더오버",
      selections: [
        createSelection("Over 2.5", 1.88),
        createSelection("Under 2.5", 1.98),
      ],
      suspended: false,
    };
  }
  // fallback
  return {
    id: randomUUID(),
    title,
    selections: [createSelection(home), createSelection(away)],
    suspended: false,
  };
}

function createEvent(override: Partial<Event> = {}): Event {
  const sport = override.sport ?? pick(SPORTS);
  const country = override.country ?? pick(COUNTRIES);
  const league = override.league ?? pick(LEAGUES);
  const home = override.teams?.home ?? `${pick(TEAM_NAMES)} ${rndInt(100)}`;
  const away = override.teams?.away ?? `${pick(TEAM_NAMES)} ${rndInt(100)}`;
  const start = new Date(
    Date.now() + rndInt(6) * 60 * 60 * 1000 + rndInt(3600) * 1000
  );
  const status: Status = override.status ?? (rnd() > 0.7 ? "LIVE" : "UPCOMING");
  const teams: Teams = {
    home,
    away,
    homeFlag: "",
    awayFlag: "",
    homeScore: status === "LIVE" ? rndInt(3) : 0,
    awayScore: status === "LIVE" ? rndInt(3) : 0,
  };
  const fmtDisplay = (d: Date) => {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${mm}/${dd} ${hh}:${mi}`;
  };
  const fmtLeagueLabel = (d: Date) => {
    const hh = String(d.getHours()).padStart(2, "0");
    return `오늘 ${hh}:00`;
  };

  const e: Event = {
    event_id: override.event_id ?? String(Date.now()) + String(rndInt(1e4)),
    sport,
    country,
    league,
    start_time: override.start_time ?? start.toISOString(),
    display_time: fmtDisplay(start),
    league_time_label: fmtLeagueLabel(start),
    status,
    minute: status === "LIVE" ? 10 + rndInt(60) : undefined,
    period: status === "LIVE" ? "1st" : undefined,
    teams,
    markets: [
      createMarket("Match Winner", teams.home, teams.away),
      createMarket("Handicap", teams.home, teams.away),
      createMarket("Over/Under", teams.home, teams.away),
    ],
    lastUpdated: Date.now(),
  };
  return Object.assign(e, override);
}

function pick<T>(arr: T[]) {
  return arr[rndInt(arr.length)];
}

// Initialize dataset
export function seedEvents(count = 30) {
  if (lastSeed === count) return;
  EVENTS.clear();
  for (let i = 0; i < count; i++) {
    const ev = createEvent();
    EVENTS.set(ev.event_id, ev);
  }
  lastSeed = count;
}

// Provide sidebar aggregations
export function getSidebar(): Sidebar {
  // aggregate by sport and country/league counts
  const grouped: Record<string, any> = {};
  for (const ev of EVENTS.values()) {
    const sport = ev.sport;
    grouped[sport] ??= { sport, count: 0, countries: {} };
    grouped[sport].count++;
    const countries = grouped[sport].countries;
    countries[ev.country] ??= {};
    countries[ev.country][ev.league] ??= 0;
    countries[ev.country][ev.league]++;
  }
  const categories = Object.values(grouped).map((g) => ({
    sport: g.sport,
    count: Number(g.count),
    countries: Object.entries(
      g.countries as Record<string, Record<string, number>>
    ).map(([country, leaguesObj]) => ({
      country,
      leagues: Object.entries(leaguesObj).map(([league, count]) => ({
        league,
        count: Number(count),
      })),
    })),
  }));
  return { categories };
}

// Pre-match: upcoming events grouped by start_time (rounded to hour)
export function getPreMatch({ limit = 50 } = {}) {
  const list = Array.from(EVENTS.values()).filter(
    (e) => e.status === "UPCOMING"
  );
  list.sort(
    (a, b) =>
      new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  );
  return {
    generatedAt: new Date().toISOString(),
    matches: list.slice(0, limit),
  };
}

export function getLive({ limit = 50 } = {}) {
  const list = Array.from(EVENTS.values()).filter((e) => e.status === "LIVE");
  list.sort((a, b) => (b.minute ?? 0) - (a.minute ?? 0));
  return {
    generatedAt: new Date().toISOString(),
    matches: list.slice(0, limit),
  };
}

export function getEventMarkets(eventId: string): Event | null {
  return EVENTS.get(eventId) ?? null;
}

// Advanced behaviors: odds movement, suspensions
function mutateOdds() {
  const liveEvents = Array.from(EVENTS.values()).filter(
    (e) => e.status === "LIVE"
  );
  for (const ev of liveEvents) {
    let changed = false;
    for (const market of ev.markets) {
      // small chance to suspend market briefly
      if (rnd() < 0.02) {
        market.suspended = true;
        for (const s of market.selections) s.suspended = true;
        changed = true;
        // schedule unsuspend
        setTimeout(() => {
          market.suspended = false;
          for (const s of market.selections) s.suspended = false;
          ev.lastUpdated = Date.now();
        }, 3000 + rndInt(5000));
      }
      for (const s of market.selections) {
        // skip locked selections
        if (s.lockedUntil && s.lockedUntil > Date.now()) continue;
        // random small movement
        if (rnd() < 0.25) {
          const delta = (rnd() - 0.5) * 0.08; // up to +/-0.04
          s.odds = Math.round((s.odds + delta) * 100) / 100;
          s.odds = clamp(s.odds, 1.01, 99);
          changed = true;
        }
        // occasional larger move (e.g., after goal)
        if (rnd() < 0.005) {
          const delta = (rnd() > 0.5 ? 1 : -1) * (0.2 + rnd() * 0.8);
          s.odds = Math.round((s.odds + delta) * 100) / 100;
          s.odds = clamp(s.odds, 1.01, 99);
          changed = true;
        }
      }
    }
    // chance for a goal/score update
    if (rnd() < 0.05) {
      ev.teams.homeScore = (ev.teams.homeScore ?? 0) + (rnd() > 0.5 ? 1 : 0);
      ev.teams.awayScore = (ev.teams.awayScore ?? 0) + (rnd() > 0.7 ? 1 : 0);
      ev.minute = (ev.minute ?? 0) + 1 + rndInt(4);
      changed = true;
      // temporary suspension when a goal happens
      if (rnd() < 0.5) {
        ev.status = "SUSPENDED";
        setTimeout(() => {
          ev.status = "LIVE";
          ev.lastUpdated = Date.now();
        }, 3000 + rndInt(4000));
      }
    }
    if (changed) ev.lastUpdated = Date.now();
  }
}

// periodic tick
setInterval(() => {
  // sometimes promote upcoming to live
  for (const ev of EVENTS.values()) {
    if (
      ev.status === "UPCOMING" &&
      new Date(ev.start_time).getTime() < Date.now()
    ) {
      ev.status = "LIVE";
      ev.minute = 1;
      ev.teams.homeScore = 0;
      ev.teams.awayScore = 0;
      ev.lastUpdated = Date.now();
    }
  }
  mutateOdds();
}, 3000);

// Seed on module import
seedEvents(40);

// Locks a selection for a short time to simulate odds locking when user selects it
export function lockSelection(selectionId: string, lockMillis = 5000) {
  for (const ev of EVENTS.values()) {
    for (const m of ev.markets) {
      for (const s of m.selections) {
        if (s.id === selectionId) {
          s.lockedUntil = Date.now() + lockMillis;
          return { success: true, lockedUntil: s.lockedUntil };
        }
      }
    }
  }
  return { success: false, message: "selection not found" };
}

// Calculate combined odds and potential payout
export function calcMultiBet(
  selections: { event_id: string; selectionId: string; stake: number }[]
) {
  let combined = 1;
  const resolved: any[] = [];
  for (const sel of selections) {
    const event = EVENTS.get(sel.event_id);
    if (!event) {
      return {
        success: false,
        message: "event not found",
        event_id: sel.event_id,
      };
    }
    let found: Selection | null = null;
    for (const m of event.markets) {
      const s = m.selections.find((x) => x.id === sel.selectionId);
      if (s) {
        found = s;
        break;
      }
    }
    if (!found)
      return {
        success: false,
        message: "selection not found",
        selectionId: sel.selectionId,
      };
    if (found.suspended)
      return {
        success: false,
        message: "selection suspended",
        selectionId: sel.selectionId,
      };
    if (found.lockedUntil && found.lockedUntil > Date.now())
      return {
        success: false,
        message: "selection locked",
        selectionId: sel.selectionId,
      };
    combined = Math.round(combined * found.odds * 100) / 100;
    resolved.push({ ...found, currentOdds: found.odds });
  }
  const stake = selections[0]?.stake ?? 1;
  const payout = Math.round(combined * stake * 100) / 100;
  return { success: true, combinedOdds: combined, stake, payout, resolved };
}

// Utility to pretty-print current dataset (for debugging)
export function dumpEvents() {
  return Array.from(EVENTS.values());
}

// Export read-only access for test/debug
export const _internal = { EVENTS };
