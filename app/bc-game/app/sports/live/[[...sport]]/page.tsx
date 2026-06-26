"use client";

import React from "react";

import SportsHeader from "@/components/shared/navigation/sports-header";
import SportsCarousel from "@/components/ui/carousel/SportsCarousel";
import SportCard, {
  SportCardProps,
} from "@/components/modules/sports/MatchCard";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, startTransition, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const POPULAR_MATCHES: SportCardProps[] = [
  // === SOCCER (8 matches) ===
  {
    id: "s1",
    sport: "soccer",
    country: "Italy",
    league: "Serie A",
    teams: [
      {
        name: "Como 1907",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2704.png",
        score: 1,
      },
      {
        name: "AC Milan",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1643.png",
        score: 0,
      },
    ],
    status: "Tomorrow, 03:45",
    isLive: true,
    href: "/sports/soccer/italy/serie-a/como-1907-ac-milan-1",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.92" },
      { name: "draw", value: "3.15" },
      { name: "2", value: "2.48" },
    ],
  },
  {
    id: "s2",
    sport: "soccer",
    country: "England",
    league: "Premier League",
    teams: [
      {
        name: "Arsenal",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/42.png",
      },
      {
        name: "Liverpool",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/44.png",
      },
    ],
    status: "19 Jan, 00:30",
    isLive: true,
    href: "/sports/soccer/england/premier-league/arsenal-liverpool-4",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.10" },
      { name: "draw", value: "3.40" },
      { name: "2", value: "3.20" },
    ],
  },
  {
    id: "s3",
    sport: "soccer",
    country: "Spain",
    league: "La Liga",
    teams: [
      {
        name: "Real Madrid",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2829.png",
      },
      {
        name: "Barcelona",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2817.png",
      },
    ],
    status: "20 Jan, 04:00",
    isLive: true,
    href: "/sports/soccer/spain/la-liga/real-madrid-barcelona-7",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.05" },
      { name: "draw", value: "3.60" },
      { name: "2", value: "3.40" },
    ],
  },
  {
    id: "s4",
    sport: "soccer",
    country: "Germany",
    league: "Bundesliga",
    teams: [
      {
        name: "Bayern Munich",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2672.png",
      },
      {
        name: "Dortmund",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2673.png",
      },
    ],
    status: "21 Jan, 01:30",
    isLive: true,
    href: "/sports/soccer/germany/bundesliga/bayern-dortmund-9",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "1.55" },
      { name: "draw", value: "4.20" },
      { name: "2", value: "5.80" },
    ],
  },
  {
    id: "s5",
    sport: "soccer",
    country: "France",
    league: "Ligue 1",
    teams: [
      {
        name: "PSG",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1644.png",
        score: 2,
      },
      {
        name: "Marseille",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1641.png",
        score: 2,
      },
    ],
    status: "Live 75'",
    isLive: true,
    href: "/sports/soccer/france/ligue-1/psg-marseille-10",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.30" },
      { name: "draw", value: "2.10" },
      { name: "2", value: "4.80" },
    ],
  },
  {
    id: "s6",
    sport: "soccer",
    country: "Morocco",
    league: "AFCON",
    teams: [
      {
        name: "Morocco",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4831.png",
      },
      {
        name: "Senegal",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4835.png",
      },
    ],
    status: "18 Jan, 03:00",
    isLive: true,
    href: "/sports/soccer/africa/afcon/morocco-senegal-12",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.40" },
      { name: "draw", value: "3.00" },
      { name: "2", value: "2.85" },
    ],
  },
  {
    id: "s7",
    sport: "soccer",
    country: "Italy",
    league: "Serie A",
    teams: [
      {
        name: "Inter Milan",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1638.png",
      },
      {
        name: "Juventus",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1642.png",
      },
    ],
    status: "22 Jan, 03:45",
    isLive: true,
    href: "/sports/soccer/italy/serie-a/inter-juve",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "1.90" },
      { name: "draw", value: "3.30" },
      { name: "2", value: "3.50" },
    ],
  },
  {
    id: "s8",
    sport: "soccer",
    country: "Portugal",
    league: "Liga Portugal",
    teams: [
      {
        name: "Benfica",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2955.png",
      },
      {
        name: "Porto",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2957.png",
      },
    ],
    status: "Tomorrow, 20:00",
    isLive: true,
    href: "/sports/soccer/portugal/liga/benfica-porto",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.15" },
      { name: "draw", value: "3.10" },
      { name: "2", value: "3.00" },
    ],
  },

  // === BASKETBALL (8 matches) ===
  {
    id: "b1",
    sport: "basketball",
    country: "USA",
    league: "NBA",
    teams: [
      {
        name: "Lakers",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3421.png",
      },
      {
        name: "Warriors",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3432.png",
      },
    ],
    status: "Today, 10:00",
    isLive: true,
    href: "/sports/basketball/usa/nba/lakers-warriors-2",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "2", value: "1.95" },
    ],
  },
  {
    id: "b2",
    sport: "basketball",
    country: "UK",
    league: "NBA London",
    teams: [
      {
        name: "Orlando Magic",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3416.png",
      },
      {
        name: "Memphis Grizzlies",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3415.png",
      },
    ],
    status: "18 Jan, 20:00",
    isLive: true,
    href: "/sports/basketball/uk/nba-london/magic-grizzlies-5",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.72" },
      { name: "2", value: "2.15" },
    ],
  },
  {
    id: "b3",
    sport: "basketball",
    country: "USA",
    league: "NBA",
    teams: [
      {
        name: "Celtics",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3411.png",
        score: 112,
      },
      {
        name: "Bucks",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3419.png",
        score: 108,
      },
    ],
    status: "Live Q4 02:15",
    isLive: true,
    href: "/sports/basketball/usa/nba/celtics-bucks-8",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.25" },
      { name: "2", value: "4.50" },
    ],
  },
  {
    id: "b4",
    sport: "basketball",
    country: "USA",
    league: "NBA",
    teams: [
      {
        name: "Suns",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3426.png",
      },
      {
        name: "Nuggets",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3413.png",
      },
    ],
    status: "22 Jan, 09:00",
    isLive: true,
    href: "/sports/basketball/usa/nba/suns-nuggets-11",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.91" },
      { name: "2", value: "1.91" },
    ],
  },
  {
    id: "b5",
    sport: "basketball",
    country: "USA",
    league: "NBA",
    teams: [
      {
        name: "Heat",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3418.png",
      },
      {
        name: "76ers",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3425.png",
      },
    ],
    status: "Tomorrow, 08:30",
    isLive: true,
    href: "/sports/basketball/usa/nba/heat-76ers",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.10" },
      { name: "2", value: "1.75" },
    ],
  },
  {
    id: "b6",
    sport: "basketball",
    country: "USA",
    league: "NBA",
    teams: [
      {
        name: "Bulls",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3412.png",
      },
      {
        name: "Knicks",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3422.png",
      },
    ],
    status: "21 Jan, 10:00",
    isLive: true,
    href: "/sports/basketball/usa/nba/bulls-knicks",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.40" },
      { name: "2", value: "1.60" },
    ],
  },
  {
    id: "b7",
    sport: "basketball",
    country: "USA",
    league: "NBA",
    teams: [
      {
        name: "Clippers",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3420.png",
      },
      {
        name: "Rockets",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3414.png",
      },
    ],
    status: "Today, 11:30",
    isLive: true,
    href: "/sports/basketball/usa/nba/clippers-rockets",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.80" },
      { name: "2", value: "2.05" },
    ],
  },
  {
    id: "b8",
    sport: "basketball",
    country: "USA",
    league: "NBA",
    teams: [
      {
        name: "Spurs",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3427.png",
      },
      {
        name: "Mavericks",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3417.png",
      },
    ],
    status: "22 Jan, 11:00",
    isLive: true,
    href: "/sports/basketball/usa/nba/spurs-mavs",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.20" },
      { name: "2", value: "1.65" },
    ],
  },

  // === TENNIS (8 matches) ===
  {
    id: "t1",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Novak Djokovic",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
        score: 2,
      },
      {
        name: "Rafael Nadal",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
        score: 1,
      },
    ],
    status: "Live 3rd Set",
    isLive: true,
    href: "/sports/tennis/world/atp-melbourne/djokovic-nadal-3",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "1.40" },
      { name: "2", value: "2.80" },
    ],
  },
  {
    id: "t2",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Carlos Alcaraz",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
        score: 0,
      },
      {
        name: "Jannik Sinner",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
        score: 1,
      },
    ],
    status: "Live 2nd Set",
    isLive: true,
    href: "/sports/tennis/australia/australian-open/alcaraz-sinner-6",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "2.10" },
      { name: "2", value: "1.75" },
    ],
  },
  {
    id: "t3",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Daniil Medvedev",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
      {
        name: "A. Zverev",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
    ],
    status: "Today, 16:00",
    isLive: true,
    href: "/sports/tennis/world/medvedev-zverev",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "1.80" },
      { name: "2", value: "2.00" },
    ],
  },
  {
    id: "t4",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Casper Ruud",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
      {
        name: "Holger Rune",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
    ],
    status: "Tomorrow, 14:00",
    isLive: true,
    href: "/sports/tennis/world/ruud-rune",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "1.95" },
      { name: "2", value: "1.85" },
    ],
  },
  {
    id: "t5",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Taylor Fritz",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
      {
        name: "Ben Shelton",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
    ],
    status: "Tomorrow, 12:00",
    isLive: true,
    href: "/sports/tennis/world/fritz-shelton",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "1.70" },
      { name: "2", value: "2.10" },
    ],
  },
  {
    id: "t6",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Alex de Minaur",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
      {
        name: "Tommy Paul",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
    ],
    status: "Live 1st Set",
    isLive: true,
    href: "/sports/tennis/world/deminaur-paul",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "1.65" },
      { name: "2", value: "2.25" },
    ],
  },
  {
    id: "t7",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Stefanos Tsitsipas",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
      {
        name: "Andrey Rublev",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
    ],
    status: "Today, 19:00",
    isLive: true,
    href: "/sports/tennis/world/tsitsipas-rublev",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "2", value: "1.95" },
    ],
  },
  {
    id: "t8",
    sport: "tennis",
    country: "USA",
    league: "WTA Charleston",
    teams: [
      {
        name: "Lorenzo Musetti",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
      {
        name: "Jack Draper",
        logo: "https://img.icons8.com/color/512/tennis-ball.png",
      },
    ],
    status: "20 Jan, 10:00",
    isLive: true,
    href: "/sports/tennis/world/musetti-draper",
    marketName: "Match Winner",
    outcomes: [
      { name: "1", value: "2.15" },
      { name: "2", value: "1.70" },
    ],
  },

  // === COUNTER-STRIKE (8 matches) ===
  {
    id: "cs1",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      {
        name: "Team Vitality",
        logo: "https://img.vavel.com/team-vitality-logo-1.png",
      },
      {
        name: "NAVI",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/ac/Natus_Vincere_logo.svg",
      },
    ],
    status: "Today, 21:00",
    isLive: true,
    href: "/esports/cs/vitality-navi",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.75" },
      { name: "2", value: "2.05" },
    ],
  },
  {
    id: "cs2",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      {
        name: "G2 Esports",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/12/G2_Esports_logo.svg",
      },
      {
        name: "FaZe Clan",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/FaZe_Clan.svg",
      },
    ],
    status: "Live Map 2",
    isLive: true,
    href: "/esports/cs/g2-faze",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.90" },
      { name: "2", value: "1.90" },
    ],
  },
  {
    id: "cs3",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      {
        name: "MOUZ",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/ad/Mousesports_logo.svg",
      },
      {
        name: "Team Spirit",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/5e/Team_Spirit_logo.svg",
      },
    ],
    status: "Tomorrow, 18:00",
    isLive: true,
    href: "/esports/cs/mouz-spirit",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.20" },
      { name: "2", value: "1.65" },
    ],
  },
  {
    id: "cs4",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      { name: "The MongolZ", logo: "https://img.vavel.com/mongolz.png" },
      {
        name: "FURIA",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/90/Furia_Esports_logo.svg",
      },
    ],
    status: "Tomorrow, 15:00",
    isLive: true,
    href: "/esports/cs/mongolz-furia",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "2", value: "1.95" },
    ],
  },
  {
    id: "cs5",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      {
        name: "Astralis",
        logo: "https://upload.wikimedia.org/wikipedia/en/7/7d/Astralis_logo.svg",
      },
      {
        name: "Liquid",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/Team_Liquid_logo.svg",
      },
    ],
    status: "Today, 23:30",
    isLive: true,
    href: "/esports/cs/astralis-liquid",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.00" },
      { name: "2", value: "1.80" },
    ],
  },
  {
    id: "cs6",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      {
        name: "Virtus.pro",
        logo: "https://upload.wikimedia.org/wikipedia/en/d/d3/Virtus.pro_logo.svg",
      },
      {
        name: "Heroic",
        logo: "https://upload.wikimedia.org/wikipedia/en/2/2f/Heroic_logo.svg",
      },
    ],
    status: "21 Jan, 17:00",
    isLive: true,
    href: "/esports/cs/vp-heroic",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.70" },
      { name: "2", value: "2.10" },
    ],
  },
  {
    id: "cs7",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      { name: "3DMAX", logo: "https://img.vavel.com/3dmax.png" },
      { name: "Aurora", logo: "https://img.vavel.com/aurora.png" },
    ],
    status: "Live Map 1",
    isLive: true,
    href: "/esports/cs/3dmax-aurora",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.50" },
      { name: "2", value: "1.50" },
    ],
  },
  {
    id: "cs8",
    sport: "counter-strike",
    country: "World",
    league: "IEM Kraków",
    teams: [
      {
        name: "100 Thieves",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/16/100_Thieves_logo.svg",
      },
      { name: "Falcons", logo: "https://img.vavel.com/falcons.png" },
    ],
    status: "22 Jan, 19:00",
    isLive: true,
    href: "/esports/cs/100t-falcons",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.10" },
      { name: "2", value: "1.70" },
    ],
  },

  // === DOTA 2 (8 matches) ===
  {
    id: "d1",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      {
        name: "Tundra",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/44/Tundra_Esports_logo.svg",
      },
      { name: "Falcons", logo: "https://img.vavel.com/falcons.png" },
    ],
    status: "Today, 18:00",
    isLive: true,
    href: "/esports/dota/tundra-falcons",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.10" },
      { name: "2", value: "1.70" },
    ],
  },
  {
    id: "d2",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      {
        name: "Team Spirit",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/5e/Team_Spirit_logo.svg",
      },
      {
        name: "Liquid",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/Team_Liquid_logo.svg",
      },
    ],
    status: "Live Game 2",
    isLive: true,
    href: "/esports/dota/spirit-liquid",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.80" },
      { name: "2", value: "2.00" },
    ],
  },
  {
    id: "d3",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      { name: "Xtreme Gaming", logo: "https://img.vavel.com/xtreme.png" },
      {
        name: "Gaimin Gladiators",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/1c/Gaimin_Gladiators_logo.svg",
      },
    ],
    status: "Today, 21:00",
    isLive: true,
    href: "/esports/dota/xtreme-gg",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.25" },
      { name: "2", value: "1.65" },
    ],
  },
  {
    id: "d4",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      { name: "BetBoom Team", logo: "https://img.vavel.com/betboom.png" },
      {
        name: "OG",
        logo: "https://upload.wikimedia.org/wikipedia/en/d/d4/OG_Esports_logo.svg",
      },
    ],
    status: "Tomorrow, 17:00",
    isLive: true,
    href: "/esports/dota/betboom-og",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.75" },
      { name: "2", value: "2.05" },
    ],
  },
  {
    id: "d5",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      { name: "Parivision", logo: "https://img.vavel.com/parivision.png" },
      {
        name: "MOUZ",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/ad/Mousesports_logo.svg",
      },
    ],
    status: "Tomorrow, 20:00",
    isLive: true,
    href: "/esports/dota/parivision-mouz",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.60" },
      { name: "2", value: "2.30" },
    ],
  },
  {
    id: "d6",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      { name: "Team Yandex", logo: "https://img.vavel.com/yandex.png" },
      {
        name: "HEROIC",
        logo: "https://upload.wikimedia.org/wikipedia/en/2/2f/Heroic_logo.svg",
      },
    ],
    status: "21 Jan, 16:00",
    isLive: true,
    href: "/esports/dota/yandex-heroic",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "2", value: "1.95" },
    ],
  },
  {
    id: "d7",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      { name: "Azure Ray", logo: "https://img.vavel.com/azure.png" },
      {
        name: "LGD Gaming",
        logo: "https://upload.wikimedia.org/wikipedia/en/8/8e/LGD_Gaming_logo.svg",
      },
    ],
    status: "Live Game 1",
    isLive: true,
    href: "/esports/dota/azure-lgd",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.00" },
      { name: "2", value: "1.80" },
    ],
  },
  {
    id: "d8",
    sport: "dota-2",
    country: "World",
    league: "DreamLeague",
    teams: [
      {
        name: "Cloud9",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Cloud9_logo.svg",
      },
      {
        name: "Nigma Galaxy",
        logo: "https://upload.wikimedia.org/wikipedia/en/3/3d/Nigma_Galaxy_logo.svg",
      },
    ],
    status: "22 Jan, 15:00",
    isLive: true,
    href: "/esports/dota/c9-nigma",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.70" },
      { name: "2", value: "2.10" },
    ],
  },

  // === BASEBALL (8 matches) ===
  {
    id: "bb1",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "LA Dodgers",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Los_Angeles_Dodgers_Logo.svg",
      },
      {
        name: "NY Yankees",
        logo: "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Yankees_logo.svg",
      },
    ],
    status: "Tomorrow, 07:00",
    isLive: true,
    href: "/sports/baseball/dodgers-yankees",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.80" },
      { name: "2", value: "2.00" },
    ],
  },
  {
    id: "bb2",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "Astros",
        logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Houston-Astros-Logo.svg",
      },
      {
        name: "Braves",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Atlanta_Braves_logo.svg",
      },
    ],
    status: "Today, 09:00",
    isLive: true,
    href: "/sports/baseball/astros-braves",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.95" },
      { name: "2", value: "1.85" },
    ],
  },
  {
    id: "bb3",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "Phillies",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f0/Philadelphia_Phillies_logo.svg",
      },
      {
        name: "Mets",
        logo: "https://upload.wikimedia.org/wikipedia/en/7/7b/New_York_Mets_logo.svg",
      },
    ],
    status: "Tomorrow, 08:00",
    isLive: true,
    href: "/sports/baseball/phillies-mets",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.75" },
      { name: "2", value: "2.05" },
    ],
  },
  {
    id: "bb4",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "Cubs",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Chicago_Cubs_logo.svg",
      },
      {
        name: "Cardinals",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/9d/St._Louis_Cardinals_logo.svg",
      },
    ],
    status: "Live Top 5th",
    isLive: true,
    href: "/sports/baseball/cubs-cardinals",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.10" },
      { name: "2", value: "1.70" },
    ],
  },
  {
    id: "bb5",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "Red Sox",
        logo: "https://upload.wikimedia.org/wikipedia/en/6/6d/Red_Sox_logo_primary.svg",
      },
      {
        name: "Blue Jays",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/ba/Toronto_Blue_Jays_logo.svg",
      },
    ],
    status: "Today, 10:00",
    isLive: true,
    href: "/sports/baseball/redsox-jays",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.90" },
      { name: "2", value: "1.90" },
    ],
  },
  {
    id: "bb6",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "Padres",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/San_Diego_Padres_logo.svg",
      },
      {
        name: "Giants",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/41/San_Francisco_Giants_Logo.svg",
      },
    ],
    status: "Tomorrow, 11:00",
    isLive: true,
    href: "/sports/baseball/padres-giants",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "2", value: "1.95" },
    ],
  },
  {
    id: "bb7",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "Rangers",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/41/Texas_Rangers.svg",
      },
      {
        name: "Angels",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Los_Angeles_Angels_of_Anaheim.svg",
      },
    ],
    status: "20 Jan, 09:00",
    isLive: true,
    href: "/sports/baseball/rangers-angels",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.65" },
      { name: "2", value: "2.25" },
    ],
  },
  {
    id: "bb8",
    sport: "baseball",
    country: "USA",
    league: "MLB",
    teams: [
      {
        name: "Tigers",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Detroit_Tigers_logo.svg",
      },
      {
        name: "Guardians",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/52/Cleveland_Guardians_logo.svg",
      },
    ],
    status: "20 Jan, 07:30",
    isLive: true,
    href: "/sports/baseball/tigers-guardians",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.00" },
      { name: "2", value: "1.80" },
    ],
  },

  // === LEAGUE OF LEGENDS (8 matches) ===
  {
    id: "lol1",
    sport: "league-of-legends",
    country: "World",
    league: "LCK",
    teams: [
      {
        name: "T1",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f9/T1_logo.svg",
      },
      {
        name: "Gen.G",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/af/Gen.G_logo.svg",
      },
    ],
    status: "Live Game 3",
    isLive: true,
    href: "/esports/lol/t1-geng",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.70" },
      { name: "2", value: "2.10" },
    ],
  },
  {
    id: "lol2",
    sport: "league-of-legends",
    country: "World",
    league: "LPL",
    teams: [
      { name: "Bilibili Gaming", logo: "https://img.vavel.com/blg.png" },
      { name: "Top Esports", logo: "https://img.vavel.com/tes.png" },
    ],
    status: "Today, 17:00",
    isLive: true,
    href: "/esports/lol/blg-tes",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.55" },
      { name: "2", value: "2.40" },
    ],
  },
  {
    id: "lol3",
    sport: "league-of-legends",
    country: "World",
    league: "LEC",
    teams: [
      {
        name: "G2 Esports",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/12/G2_Esports_logo.svg",
      },
      {
        name: "Fnatic",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Fnatic_logo.svg",
      },
    ],
    status: "Tomorrow, 19:00",
    isLive: true,
    href: "/esports/lol/g2-fnatic",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.60" },
      { name: "2", value: "2.30" },
    ],
  },
  {
    id: "lol4",
    sport: "league-of-legends",
    country: "World",
    league: "LCS",
    teams: [
      {
        name: "Team Liquid",
        logo: "https://upload.wikimedia.org/wikipedia/en/f/f7/Team_Liquid_logo.svg",
      },
      {
        name: "FlyQuest",
        logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/FlyQuest_logo.svg",
      },
    ],
    status: "Tomorrow, 04:00",
    isLive: true,
    href: "/esports/lol/liquid-flyquest",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.80" },
      { name: "2", value: "2.00" },
    ],
  },
  {
    id: "lol5",
    sport: "league-of-legends",
    country: "World",
    league: "LCK",
    teams: [
      { name: "Hanwha Life", logo: "https://img.vavel.com/hle.png" },
      { name: "Dplus KIA", logo: "https://img.vavel.com/dk.png" },
    ],
    status: "Today, 19:00",
    isLive: true,
    href: "/esports/lol/hle-dk",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.75" },
      { name: "2", value: "2.05" },
    ],
  },
  {
    id: "lol6",
    sport: "league-of-legends",
    country: "World",
    league: "LPL",
    teams: [
      { name: "JD Gaming", logo: "https://img.vavel.com/jdg.png" },
      { name: "Weibo Gaming", logo: "https://img.vavel.com/wbg.png" },
    ],
    status: "21 Jan, 15:00",
    isLive: true,
    href: "/esports/lol/jdg-wbg",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.65" },
      { name: "2", value: "2.20" },
    ],
  },
  {
    id: "lol7",
    sport: "league-of-legends",
    country: "World",
    league: "LEC",
    teams: [
      { name: "Karmine Corp", logo: "https://img.vavel.com/kc.png" },
      { name: "Team Vitality", logo: "https://img.vavel.com/vitality.png" },
    ],
    status: "Live Game 1",
    isLive: true,
    href: "/esports/lol/kc-vitality",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.40" },
      { name: "2", value: "1.55" },
    ],
  },
  {
    id: "lol8",
    sport: "league-of-legends",
    country: "World",
    league: "CBLOL",
    teams: [
      { name: "LOUD", logo: "https://img.vavel.com/loud.png" },
      { name: "paiN Gaming", logo: "https://img.vavel.com/pain.png" },
    ],
    status: "22 Jan, 01:00",
    isLive: true,
    href: "/esports/lol/loud-pain",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.90" },
      { name: "2", value: "1.90" },
    ],
  },

  // === ICE HOCKEY (8 matches) ===
  {
    id: "ih1",
    sport: "ice-hockey",
    country: "USA",
    league: "NHL",
    teams: [
      {
        name: "Tampa Bay",
        logo: "https://upload.wikimedia.org/wikipedia/en/2/2f/Tampa_Bay_Lightning_Logo_2011.svg",
      },
      {
        name: "Detroit Red Wings",
        logo: "https://upload.wikimedia.org/wikipedia/en/e/e0/Detroit_Red_Wings_logo.svg",
      },
    ],
    status: "Today, 08:00",
    isLive: true,
    href: "/sports/hockey/lightning-wings",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.75" },
      { name: "2", value: "2.10" },
    ],
  },
  {
    id: "ih2",
    sport: "ice-hockey",
    country: "USA",
    league: "NHL",
    teams: [
      {
        name: "Colorado Avalanche",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/45/Colorado_Avalanche_logo.svg",
      },
      {
        name: "Dallas Stars",
        logo: "https://upload.wikimedia.org/wikipedia/en/2/2a/Dallas_Stars_logo.svg",
      },
    ],
    status: "Live P3 05:00",
    isLive: true,
    href: "/sports/hockey/avalanche-stars",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "2", value: "1.95" },
    ],
  },
  {
    id: "ih3",
    sport: "ice-hockey",
    country: "USA",
    league: "NHL",
    teams: [
      {
        name: "Carolina Hurricanes",
        logo: "https://upload.wikimedia.org/wikipedia/en/3/32/Carolina_Hurricanes.svg",
      },
      {
        name: "NY Islanders",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/42/New_York_Islanders_logo.svg",
      },
    ],
    status: "Tomorrow, 07:30",
    isLive: true,
    href: "/sports/hockey/canes-isles",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.70" },
      { name: "2", value: "2.20" },
    ],
  },
  {
    id: "ih4",
    sport: "ice-hockey",
    country: "USA",
    league: "NHL",
    teams: [
      {
        name: "Edmonton Oilers",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/4d/Logo_Edmonton_Oilers.svg",
      },
      {
        name: "Vegas Knights",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/ac/Vegas_Golden_Knights_logo.svg",
      },
    ],
    status: "Today, 10:00",
    isLive: true,
    href: "/sports/hockey/oilers-vegas",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.80" },
      { name: "2", value: "2.05" },
    ],
  },
  {
    id: "ih5",
    sport: "ice-hockey",
    country: "USA",
    league: "NHL",
    teams: [
      {
        name: "Toronto Maple Leafs",
        logo: "https://upload.wikimedia.org/wikipedia/en/b/b9/Toronto_Maple_Leafs_logo.svg",
      },
      {
        name: "Boston Bruins",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Boston_Bruins.svg",
      },
    ],
    status: "Tomorrow, 08:30",
    isLive: true,
    href: "/sports/hockey/leafs-bruins",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.95" },
      { name: "2", value: "1.85" },
    ],
  },
  {
    id: "ih6",
    sport: "ice-hockey",
    country: "USA",
    league: "NHL",
    teams: [
      {
        name: "Florida Panthers",
        logo: "https://upload.wikimedia.org/wikipedia/en/4/43/Florida_Panthers_2016_logo.svg",
      },
      {
        name: "NY Rangers",
        logo: "https://upload.wikimedia.org/wikipedia/en/a/ae/New_York_Rangers.svg",
      },
    ],
    status: "21 Jan, 07:00",
    isLive: true,
    href: "/sports/hockey/cats-rangers",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.00" },
      { name: "2", value: "1.80" },
    ],
  },
  {
    id: "ih7",
    sport: "ice-hockey",
    country: "USA",
    league: "NHL",
    teams: [
      { name: "Utah Mammoth", logo: "https://img.vavel.com/utah.png" },
      {
        name: "Minnesota Wild",
        logo: "https://upload.wikimedia.org/wikipedia/en/1/1b/Minnesota_Wild.svg",
      },
    ],
    status: "22 Jan, 09:00",
    isLive: true,
    href: "/sports/hockey/utah-wild",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.20" },
      { name: "2", value: "1.65" },
    ],
  },
  {
    id: "ih8",
    sport: "ice-hockey",
    country: "Italy",
    league: "Winter Olympics",
    teams: [
      { name: "Slovakia", logo: "https://img.vavel.com/svk.png" },
      { name: "Finland", logo: "https://img.vavel.com/fin.png" },
    ],
    status: "Feb 06, 20:00",
    isLive: true,
    href: "/sports/hockey/svk-fin",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.50" },
      { name: "2", value: "1.55" },
    ],
  },

  // === VOLLEYBALL (8 matches) ===
  {
    id: "v1",
    sport: "volleyball",
    country: "USA",
    league: "LOVB Pro",
    teams: [
      { name: "LOVB Madison", logo: "https://img.vavel.com/madison.png" },
      { name: "LOVB Austin", logo: "https://img.vavel.com/austin.png" },
    ],
    status: "Today, 19:00",
    isLive: true,
    href: "/sports/volleyball/madison-austin",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.75" },
      { name: "2", value: "2.05" },
    ],
  },
  {
    id: "v2",
    sport: "volleyball",
    country: "USA",
    league: "LOVB Pro",
    teams: [
      { name: "LOVB Atlanta", logo: "https://img.vavel.com/atlanta.png" },
      { name: "LOVB Nebraska", logo: "https://img.vavel.com/nebraska.png" },
    ],
    status: "Live Set 4",
    isLive: true,
    href: "/sports/volleyball/atlanta-nebraska",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "2", value: "1.95" },
    ],
  },
  {
    id: "v3",
    sport: "volleyball",
    country: "USA",
    league: "MLV",
    teams: [
      { name: "Atlanta Vibe", logo: "https://img.vavel.com/atl-vibe.png" },
      { name: "Omaha Supernovas", logo: "https://img.vavel.com/omaha.png" },
    ],
    status: "Tomorrow, 20:00",
    isLive: true,
    href: "/sports/volleyball/vibe-supernovas",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.70" },
      { name: "2", value: "2.10" },
    ],
  },
  {
    id: "v4",
    sport: "volleyball",
    country: "USA",
    league: "MLV",
    teams: [
      { name: "Columbus Fury", logo: "https://img.vavel.com/columbus.png" },
      { name: "San Diego Mojo", logo: "https://img.vavel.com/mojo.png" },
    ],
    status: "Today, 21:30",
    isLive: true,
    href: "/sports/volleyball/fury-mojo",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.90" },
      { name: "2", value: "1.90" },
    ],
  },
  {
    id: "v5",
    sport: "volleyball",
    country: "USA",
    league: "LOVB Pro",
    teams: [
      { name: "LOVB Salt Lake", logo: "https://img.vavel.com/slc.png" },
      { name: "LOVB Houston", logo: "https://img.vavel.com/houston.png" },
    ],
    status: "Tomorrow, 18:00",
    isLive: true,
    href: "/sports/volleyball/slc-houston",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.15" },
      { name: "2", value: "1.65" },
    ],
  },
  {
    id: "v6",
    sport: "volleyball",
    country: "USA",
    league: "MLV",
    teams: [
      { name: "Grand Rapids Rise", logo: "https://img.vavel.com/rise.png" },
      {
        name: "Orlando Valkyries",
        logo: "https://img.vavel.com/valkyries.png",
      },
    ],
    status: "21 Jan, 19:00",
    isLive: true,
    href: "/sports/volleyball/rise-valkyries",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.80" },
      { name: "2", value: "2.00" },
    ],
  },
  {
    id: "v7",
    sport: "volleyball",
    country: "USA",
    league: "MLV",
    teams: [
      { name: "Indy Ignite", logo: "https://img.vavel.com/ignite.png" },
      { name: "Dallas Team", logo: "https://img.vavel.com/dallas.png" },
    ],
    status: "Live Set 1",
    isLive: true,
    href: "/sports/volleyball/indy-dallas",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.05" },
      { name: "2", value: "1.75" },
    ],
  },
  {
    id: "v8",
    sport: "volleyball",
    country: "World",
    league: "Nations League",
    teams: [
      { name: "Brazil", logo: "https://img.vavel.com/bra.png" },
      { name: "Poland", logo: "https://img.vavel.com/pol.png" },
    ],
    status: "22 Jan, 03:00",
    isLive: true,
    href: "/sports/volleyball/bra-pol",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.90" },
      { name: "2", value: "1.90" },
    ],
  },

  // === BCGAME ORIGINALS (4 matches) ===

  {
    id: "bc1",
    sport: "bcgame-originals",
    country: "BC.GAME",
    league: "House Games",
    teams: [
      {
        name: "Limbo",
        logo: "https://bc.game/assets/limbo.png", // Palitan ang URL ng saktong asset mo
      },
      {
        name: "Multiplier Hunt",
        logo: "https://bc.game/assets/originals-icon.png",
      },
    ],
    status: "Win up to 1,000,000x",
    isLive: true,
    href: "/originals/limbo",
    marketName: "Next Target",
    outcomes: [
      { name: "Over 2x", value: "1.98" },
      { name: "Over 10x", value: "9.90" },
    ],
  },
  {
    id: "bc2",
    sport: "bcgame-originals",
    country: "BC.GAME",
    league: "House Games",
    teams: [
      {
        name: "Crash",
        logo: "https://bc.game/assets/crash.png",
      },
      {
        name: "Trend Ball",
        logo: "https://bc.game/assets/originals-icon.png",
      },
    ],
    status: "Live 2.45x...",
    isLive: true,
    href: "/originals/crash",
    marketName: "Color Bet",
    outcomes: [
      { name: "Red", value: "1.96" },
      { name: "Green", value: "2.00" },
      { name: "Moon", value: "10.0" },
    ],
  },
  {
    id: "bc3",
    sport: "bcgame-originals",
    country: "BC.GAME",
    league: "House Games",
    teams: [
      {
        name: "Hash Dice",
        logo: "https://bc.game/assets/hashdice.png",
      },
      {
        name: "High/Low",
        logo: "https://bc.game/assets/originals-icon.png",
      },
    ],
    status: "Provably Fair",
    isLive: false,
    href: "/originals/hash-dice",
    marketName: "Dice Range",
    outcomes: [
      { name: "Low", value: "2.00" },
      { name: "High", value: "2.00" },
    ],
  },
  {
    id: "bc4",
    sport: "bcgame-originals",
    country: "BC.GAME",
    league: "House Games",
    teams: [
      {
        name: "Plinko",
        logo: "https://bc.game/assets/plinko.png",
      },
      {
        name: "Classic Mode",
        logo: "https://bc.game/assets/originals-icon.png",
      },
    ],
    status: "Hot Game",
    isLive: true,
    href: "/originals/plinko",
    marketName: "Risk Level",
    outcomes: [
      { name: "Low", value: "1.20" },
      { name: "Medium", value: "5.00" },
      { name: "High", value: "20.0" },
    ],
  },

  // === ESOCCER_MATCHES (5 matches) ===

  {
    id: "es1",
    sport: "esoccer",
    country: "GT Sports",
    league: "Euro League - 10 Mins Play",
    teams: [
      {
        name: "Arsenal (Bily)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/42.png",
        score: 2,
      },
      {
        name: "AC Milan (Kray)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1643.png",
        score: 1,
      },
    ],
    status: "Live 62'",
    isLive: true,
    href: "/sports/esoccer/euro-league/arsenal-milan-es1",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "1.45" },
      { name: "draw", value: "3.20" },
      { name: "2", value: "5.50" },
    ],
  },
  {
    id: "es2",
    sport: "esoccer",
    country: "Battle Stars",
    league: "Champions League - 8 Mins Play",
    teams: [
      {
        name: "Real Madrid (Sava)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2829.png",
        score: 0,
      },
      {
        name: "Man City (Jeky)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/171.png",
        score: 0,
      },
    ],
    status: "Live 12'",
    isLive: true,
    href: "/sports/esoccer/champions-league/madrid-city-es2",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.10" },
      { name: "draw", value: "3.50" },
      { name: "2", value: "3.10" },
    ],
  },
  {
    id: "es3",
    sport: "esoccer",
    country: "Cyber Live",
    league: "E-Premier League",
    teams: [
      {
        name: "Liverpool (Flew)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/44.png",
      },
      {
        name: "Chelsea (Panda)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/45.png",
      },
    ],
    status: "Today, 14:15",
    isLive: false,
    href: "/sports/esoccer/e-premier/liverpool-chelsea-es3",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "1.85" },
      { name: "draw", value: "4.00" },
      { name: "2", value: "2.35" },
    ],
  },
  {
    id: "es4",
    sport: "esoccer",
    country: "GT Sports",
    league: "International Friendly",
    teams: [
      {
        name: "France (Gaga)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4819.png",
        score: 1,
      },
      {
        name: "Germany (Spiderman)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4820.png",
        score: 3,
      },
    ],
    status: "Live HT",
    isLive: true,
    href: "/sports/esoccer/friendly/france-germany-es4",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "8.50" },
      { name: "draw", value: "4.20" },
      { name: "2", value: "1.15" },
    ],
  },
  {
    id: "es5",
    sport: "esoccer",
    country: "Battle Stars",
    league: "World Cup 2026 E-Quals",
    teams: [
      {
        name: "Brazil (Zico)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4831.png",
      },
      {
        name: "Argentina (Messi10)",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4835.png",
      },
    ],
    status: "Today, 15:30",
    isLive: false,
    href: "/sports/esoccer/wc-quals/brazil-argentina-es5",
    marketName: "1x2",
    outcomes: [
      { name: "1", value: "2.40" },
      { name: "draw", value: "3.10" },
      { name: "2", value: "2.75" },
    ],
  },

  // === CRICKET_MATCHES (4 matches) ===
  {
    id: "cr1",
    sport: "cricket",
    country: "India",
    league: "IPL - Indian Premier League",
    teams: [
      {
        name: "Mumbai Indians",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/6112.png",
        score: "182/4", // Runs/Wickets format
      },
      {
        name: "Chennai Super Kings",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/6115.png",
        score: "145/2",
      },
    ],
    status: "Live 15.2 Ov.", // Overs
    isLive: true,
    href: "/sports/cricket/ipl/mi-csk-cr1",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.65" },
      { name: "2", value: "2.20" },
    ],
  },
  {
    id: "cr2",
    sport: "cricket",
    country: "Australia",
    league: "Big Bash League (BBL)",
    teams: [
      {
        name: "Sydney Sixers",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/6120.png",
      },
      {
        name: "Perth Scorchers",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/6121.png",
      },
    ],
    status: "Today, 16:00",
    isLive: false,
    href: "/sports/cricket/bbl/sixers-scorchers-cr2",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.90" },
      { name: "2", value: "1.90" },
    ],
  },
  {
    id: "cr3",
    sport: "cricket",
    country: "International",
    league: "T20 World Cup Qualifiers",
    teams: [
      {
        name: "South Africa",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4901.png",
        score: "210/3",
      },
      {
        name: "Pakistan",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/4902.png",
        score: "198/9",
      },
    ],
    status: "Live Final Over",
    isLive: true,
    href: "/sports/cricket/t20-wc/sa-pak-cr3",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "1.05" },
      { name: "2", value: "12.0" },
    ],
  },
  {
    id: "cr4",
    sport: "cricket",
    country: "England",
    league: "The Hundred",
    teams: [
      {
        name: "London Spirit",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/6130.png",
      },
      {
        name: "Oval Invincibles",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/6131.png",
      },
    ],
    status: "Tomorrow, 20:30",
    isLive: false,
    href: "/sports/cricket/the-hundred/spirit-invincibles-cr4",
    marketName: "Winner",
    outcomes: [
      { name: "1", value: "2.15" },
      { name: "2", value: "1.70" },
    ],
  },
];

const TABS = [
  {
    id: "soccer-1",
    label: "Soccer",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.04 21.3793C12.368 22.0323 13.8288 22.393 15.3425 22.4261L17.8734 19.5272C17.9026 17.8165 17.5076 16.1267 16.7246 14.6139L11.7195 13.4485C10.675 14.4949 9.86495 15.7551 9.35078 17.1439L11.04 21.3793ZM10.7764 22.204L9.08458 23.6141C10.9111 25.274 13.3374 26.2857 16 26.2857C16.511 26.2857 17.0133 26.2485 17.5043 26.1765L15.3359 23.2833C13.7356 23.25 12.1884 22.8783 10.7764 22.204ZM5.7343 16.6469H8.62297C9.20019 15.1755 10.086 13.8441 11.2164 12.7406V9.62205C10.2129 9.37945 9.1786 9.29054 8.14698 9.35692C6.6294 11.1491 5.71429 13.4677 5.71429 16C5.71429 16.2173 5.72102 16.433 5.7343 16.6469ZM22.9116 19.3483C23.8049 18.4384 24.5225 17.3714 25.0254 16.2017L23.6597 11.542C22.5016 10.9523 21.2395 10.587 19.9272 10.4698L17.6048 14.4567C18.3 15.8824 18.6825 17.4437 18.7275 19.033L22.9116 19.3483ZM23.4088 20.0636V23.1348C25.0358 21.4457 26.0906 19.2017 26.2613 16.7145L25.7741 16.6293C25.2096 17.9111 24.4065 19.0765 23.4088 20.0636ZM23.9985 9.53268C22.4866 7.66509 20.3338 6.33759 17.8747 5.88473C17.5281 6.28981 17.2149 6.71981 16.9371 7.17124L19.7454 9.596C21.1338 9.68779 22.4749 10.0354 23.7142 10.6149L23.9985 9.53268ZM16.0845 6.92604C16.3235 6.51838 16.5885 6.12608 16.8785 5.75128C16.5889 5.72678 16.2959 5.71429 16 5.71429C13.2876 5.71429 10.8204 6.76421 8.98261 8.47983C9.78915 8.49238 10.5923 8.59246 11.3784 8.77945C11.4114 8.75319 11.4487 8.73155 11.4894 8.71569L16.0845 6.92604ZM16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28Z"
      />
    ),
  },
  {
    id: "bcgame-originals-325",
    label: "BC.GAME: Originals",
    icon: (
      <g clipPath="url(#clip0_6198_5254)">
        <path d="M2.53955 27.9941C3.7354 27.9941 4.65869 28.8069 4.65869 29.997C4.65867 31.1871 3.73538 31.9999 2.53955 31.9999C1.34364 31.9999 0.420433 31.1871 0.42041 29.997C0.42041 28.8069 1.34363 27.9941 2.53955 27.9941ZM12.728 27.9941C13.6275 27.9942 14.1612 28.4471 14.4282 28.9462L13.4419 29.4511C13.3142 29.2132 13.0587 29.0275 12.728 29.0273C12.1649 29.0273 11.7866 29.4571 11.7866 29.997C11.7866 30.5369 12.1649 30.9667 12.728 30.9667C12.9774 30.9667 13.209 30.9021 13.3599 30.7919V30.624H12.6118V29.6601H14.4985V31.2158C14.069 31.6917 13.4883 31.9998 12.728 31.9999C11.5553 31.9999 10.5972 31.2335 10.5972 29.997C10.5972 28.7546 11.5553 27.9941 12.728 27.9941ZM29.8433 27.9999C30.4761 27.9999 31.0456 28.18 31.4868 28.54L30.8599 29.3701C30.5232 29.1147 30.0875 28.9873 29.7798 28.9872C29.4895 28.9872 29.4253 29.0917 29.4253 29.1904C29.4255 29.341 29.5828 29.3932 29.9946 29.4628C30.6332 29.5731 31.5796 29.7593 31.5796 30.6533C31.5795 31.5064 30.9465 31.9998 29.9077 31.9999C29.0835 31.9999 28.5201 31.7561 28.1079 31.3847L28.7173 30.5136C29.0076 30.7923 29.4429 31.0126 29.9653 31.0126C30.1859 31.0126 30.395 30.937 30.395 30.7861C30.3947 30.6354 30.2319 30.5598 29.8491 30.4902C29.2105 30.3741 28.2349 30.2233 28.2349 29.2538C28.2349 28.5979 28.781 28 29.8433 27.9999ZM7.14111 28.0576C8.04665 28.0576 8.53467 28.662 8.53467 29.3876C8.53458 30.0551 8.14506 30.4096 7.8374 30.5605L8.54053 31.9306H7.20459L6.67041 30.6874H6.24658V31.9306H5.07373V28.0576H7.14111ZM10.1812 31.9306H9.0083V28.0576H10.1812V31.9306ZM16.1909 31.9306H15.0181V28.0576H16.1909V31.9306ZM19.3696 30.0087V28.0576H20.5425V31.9306H19.4165L17.9878 29.8515V31.9306H16.8159V28.0576H18.0229L19.3696 30.0087ZM25.0825 31.9306H23.811L23.6597 31.4306H22.1743L22.0229 31.9306H20.7515L22.1802 28.0576H23.6548L25.0825 31.9306ZM26.4644 30.9081H27.9331V31.9306H25.2915V28.0576H26.4644V30.9081ZM2.53955 29.0273C1.97642 29.0273 1.61084 29.4571 1.61084 29.997C1.61086 30.5369 1.97644 30.9667 2.53955 30.9667C3.10258 30.9667 3.46824 30.5368 3.46826 29.997C3.46826 29.4572 3.10259 29.0274 2.53955 29.0273ZM22.4761 30.456H23.3579L22.9175 29.0917L22.4761 30.456ZM6.24658 29.7128H6.96143C7.15862 29.7126 7.3442 29.5847 7.34424 29.3701C7.34424 29.1612 7.15864 29.0333 6.96143 29.0331H6.24658V29.7128ZM7.10205 0.599548C10.5973 0.599629 11.7414 1.66143 11.8032 4.96967C13.3499 4.15818 14.5261 3.72154 15.7017 3.65912H16.0415C17.4954 3.75275 19.0115 4.40775 21.146 5.65619V5.68744H21.1147C25.5693 8.27795 26.1577 9.30833 26.1577 14.6142C26.1577 19.9196 25.6004 21.0121 20.9604 23.6337C18.6404 24.9446 17.2789 25.5995 15.856 25.5995C14.433 25.5995 13.0715 24.9445 10.7515 23.6337C6.23534 21.0746 5.58611 19.9819 5.55518 15.0195V3.09662C5.58608 2.50371 5.52364 1.94158 5.30713 1.41107C5.02896 0.724899 5.09108 0.599568 5.89502 0.599548H7.10205ZM16.7534 7.56049C12.9485 7.09232 9.51431 9.80747 9.05029 13.6464C8.58643 17.4852 11.3087 20.9497 15.0825 21.4179C18.8873 21.8861 22.3215 19.1395 22.7856 15.332C22.7856 15.2383 22.7232 15.1757 22.6304 15.1757H18.9497C18.7641 15.1757 18.6096 15.2384 18.4858 15.3632L16.104 17.7353C15.9494 17.8913 15.7323 17.8911 15.5776 17.7353L12.6079 14.7695V14.7382H12.5464C12.4227 14.5822 12.4533 14.364 12.6079 14.2392L15.5776 11.2744C15.7323 11.1183 15.9493 11.1183 16.104 11.2744L18.4858 13.6464C18.6095 13.7711 18.7642 13.8339 18.9497 13.8339H22.6304C22.7231 13.8339 22.7855 13.74 22.7856 13.6464C22.4144 10.463 19.9086 7.93512 16.7534 7.56049Z"></path>
      </g>
    ),
  },
  {
    id: "esoccer-300",
    label: "eSoccer",
    icon: (
      <path d="M29 17C30.1046 17 31 17.8954 31 19V29C31 30.1046 30.1046 31 29 31H19C17.8954 31 17 30.1046 17 29V19C17 17.8954 17.8954 17 19 17H29ZM24 19C23.5858 19 23.25 19.3358 23.25 19.75C23.25 19.972 23.3467 20.1713 23.5 20.3086V21.25H21C20.1716 21.25 19.5 21.9216 19.5 22.75V27.75C19.5 28.5784 20.1716 29.25 21 29.25H27C27.8284 29.25 28.5 28.5784 28.5 27.75V22.75C28.5 21.9216 27.8284 21.25 27 21.25H24.5V20.3086C24.6533 20.1713 24.75 19.972 24.75 19.75C24.75 19.3358 24.4142 19 24 19ZM16 4C22.6274 4 28 9.37258 28 16H24.9658L23.6602 11.542C22.5021 10.9523 21.2391 10.5869 19.9268 10.4697L17.6045 14.457C17.8629 14.9871 18.0783 15.5357 18.249 16.0977C17.9649 16.1709 17.698 16.2847 17.4531 16.4326C17.2687 15.8063 17.0262 15.197 16.7246 14.6143L11.7197 13.4482C10.6753 14.4946 9.86477 15.7548 9.35059 17.1436L11.04 21.3789C12.3681 22.0319 13.829 22.3927 15.3428 22.4258L16 21.6729V24.1689L15.3359 23.2832C13.7356 23.25 12.1884 22.8784 10.7764 22.2041L9.08496 23.6143C10.7974 25.1704 13.0368 26.1573 15.5039 26.2744L16 26.2861V28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4ZM18 26.75H19V23.75H18V26.75ZM29 26.75H30V23.75H29V26.75ZM22.5 24.5C22.9142 24.5 23.25 24.8358 23.25 25.25C23.25 25.6642 22.9142 26 22.5 26C22.0858 26 21.75 25.6642 21.75 25.25C21.75 24.8358 22.0858 24.5 22.5 24.5ZM25.5 24.5C25.9142 24.5 26.25 24.8358 26.25 25.25C26.25 25.6642 25.9142 26 25.5 26C25.0858 26 24.75 25.6642 24.75 25.25C24.75 24.8358 25.0858 24.5 25.5 24.5ZM11.2168 9.62207C10.2134 9.3795 9.17891 9.29013 8.14746 9.35645C6.62988 11.1486 5.71387 13.4677 5.71387 16C5.71387 16.2171 5.72112 16.4327 5.73438 16.6465H8.62305C9.20027 15.1752 10.0865 13.8436 11.2168 12.7402V9.62207ZM17.875 5.88477C17.5285 6.28972 17.2153 6.71962 16.9375 7.1709L19.7451 9.5957C21.1334 9.68749 22.4746 10.0357 23.7139 10.6152L23.999 9.53223C22.4871 7.66472 20.334 6.33767 17.875 5.88477ZM16 5.71387C13.2876 5.71387 10.8202 6.76391 8.98242 8.47949C9.7888 8.49203 10.592 8.59238 11.3779 8.7793C11.4109 8.75308 11.4486 8.73167 11.4893 8.71582L16.085 6.92578C16.3239 6.51825 16.589 6.12566 16.8789 5.75098C16.5893 5.72648 16.2959 5.71387 16 5.71387Z"></path>
    ),
  },
  {
    id: "tennis-5",
    label: "Tennis",
    icon: (
      <path d="M21.8897 15.3026L23.9308 13.2615L21.8897 11.2204L19.8485 13.2615L21.8897 15.3026ZM22.5192 15.9321L23.9299 17.3429C24.6067 16.573 25.0965 15.6738 25.4018 14.7325L24.5603 13.891L22.5192 15.9321ZM25.7285 11.4638C25.5929 10.3641 25.1999 9.34598 24.5537 8.5563L22.5192 10.5909L24.5603 12.632L25.7285 11.4638ZM25.7747 12.6765L25.1898 13.2615L25.6555 13.7273C25.7196 13.3772 25.7593 13.0255 25.7747 12.6765ZM21.2602 15.9321L19.2191 13.891L17.1779 15.9321L19.2191 17.9732L21.2602 15.9321ZM21.8897 16.5616L19.8485 18.6027L20.7138 19.468C21.641 19.1545 22.5294 18.6564 23.3011 17.973L21.8897 16.5616ZM17.3862 19.8062L18.5896 18.6027L16.5485 16.5616L14.5127 18.5973C15.3081 19.2573 16.3093 19.6607 17.3862 19.8062ZM18.5889 19.8624C18.9638 19.848 19.342 19.8044 19.7184 19.7315L19.2191 19.2322L18.5889 19.8624ZM17.1779 10.5909L19.2191 12.632L21.2602 10.5909L19.2191 8.54975L17.1779 10.5909ZM16.5485 9.96142L18.5896 7.92028L17.7481 7.07878C16.8068 7.38406 15.9076 7.87383 15.1377 8.55063L16.5485 9.96142ZM21.0168 6.75205L19.8485 7.92028L21.8897 9.96142L23.9243 7.92683C23.1346 7.28069 22.1165 6.88768 21.0168 6.75205ZM19.804 6.70585C19.4551 6.72125 19.1034 6.76093 18.7533 6.82503L19.2191 7.29081L19.804 6.70585ZM16.5485 11.2204L14.5073 13.2615L16.5485 15.3026L18.5896 13.2615L16.5485 11.2204ZM15.919 10.5909L14.5076 9.17949C13.8242 9.95113 13.3261 10.8396 13.0126 11.7668L13.8779 12.632L15.919 10.5909ZM12.6744 15.0944C12.8199 16.1713 13.2233 17.1724 13.8833 17.9678L15.919 15.9321L13.8779 13.891L12.6744 15.0944ZM12.6182 13.8917L13.2484 13.2615L12.7491 12.7622C12.6762 13.1386 12.6326 13.5168 12.6182 13.8917ZM11.5416 17.5497C10.3354 20.8379 9.3621 22.9333 8.57894 23.8951L8.51812 23.9625L6.62971 25.8509L8.55126 23.931C9.06029 23.4717 9.9673 22.9723 11.2494 22.399C11.8005 22.1526 12.414 21.8964 13.0795 21.6328C13.6732 21.3977 14.2911 21.1633 14.9188 20.9334C14.1808 20.5952 13.5046 20.1364 12.9244 19.5562C12.341 18.9728 11.8804 18.2923 11.5416 17.5497ZM10.8332 14.2046C10.824 11.8619 11.7368 9.41336 13.5539 7.59628C16.8991 4.25104 22.5875 4.04055 25.5138 6.96681C28.44 9.89307 28.2295 15.5815 24.8843 18.9267C23.0672 20.7438 20.6187 21.6565 18.276 21.6474C18.2631 21.6523 18.2499 21.6569 18.2366 21.6613C18.1679 21.6837 18.037 21.7271 17.8529 21.7891C17.5449 21.8928 17.2014 22.0105 16.8313 22.14C15.7748 22.5096 14.7186 22.8986 13.7351 23.2881C13.0921 23.5428 12.5018 23.7893 11.9762 24.0244C10.8594 24.5237 10.0709 24.9579 9.77705 25.2214L7.25918 27.7393C6.91153 28.0869 6.34789 28.0869 6.00024 27.7393L4.74131 26.4803C4.39366 26.1327 4.39366 25.569 4.74131 25.2214L7.22486 22.7378C8.02223 21.7288 9.2488 18.8563 10.8228 14.2335C10.8261 14.2238 10.8295 14.2141 10.8332 14.2046ZM6.45596 9.2418C6.61841 8.5513 6.9692 7.91364 7.4847 7.39814C7.97349 6.90935 8.57222 6.56847 9.22226 6.39597C8.98426 5.6992 8.41028 5.15812 7.69353 4.96595C7.51693 5.59635 7.1812 6.1765 6.70531 6.65238C6.21375 7.14394 5.61098 7.48593 4.95661 7.65749C5.14523 8.41158 5.71856 9.01323 6.45596 9.2418ZM7.35253 9.32876C8.41333 9.21656 9.2518 8.35908 9.33451 7.28974C8.87953 7.43057 8.46138 7.6804 8.11417 8.02761C7.74637 8.3954 7.48795 8.84276 7.35253 9.32876ZM4.92189 6.73937C5.35117 6.59531 5.7456 6.35316 6.07584 6.02292C6.39399 5.70477 6.63039 5.32707 6.77609 4.91595C5.83118 5.06064 5.08195 5.79961 4.92189 6.73937ZM7.11571 10.2314C5.39495 10.2314 4 8.83647 4 7.11571C4 5.39495 5.39495 4 7.11571 4C8.83647 4 10.2314 5.39495 10.2314 7.11571C10.2314 8.83647 8.83647 10.2314 7.11571 10.2314Z"></path>
    ),
  },
  {
    id: "basketball-3",
    label: "Basketball",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.81747 14.5375C5.74947 15.0152 5.71429 15.5035 5.71429 16C5.71429 18.7226 6.77212 21.1982 8.4992 23.0381C9.76418 18.2491 12.8191 14.1388 16.947 11.4075C16.505 10.963 16.0422 10.5416 15.5601 10.145C14.5449 10.7299 13.4025 11.1111 12.1918 11.2384C11.9035 11.2687 11.6127 11.2845 11.3201 11.2856C9.08279 11.5238 7.08484 12.7245 5.81747 14.5375ZM6.24269 12.7368C7.79362 11.2657 9.87392 10.3931 12.1107 10.385C13.0758 10.2825 13.9927 10.0004 14.8243 9.57045C13.5309 8.61229 12.1135 7.82664 10.5963 7.2464C8.56994 8.49996 7.01132 10.4375 6.24269 12.7368ZM18.2824 5.96841C17.5483 5.80209 16.7844 5.71429 16 5.71429C14.4131 5.71429 12.9102 6.07364 11.5681 6.71542C13.0198 7.33693 14.3771 8.14001 15.6196 9.0968C16.7609 8.3209 17.6886 7.24394 18.2824 5.96841ZM19.1205 6.19615C18.5 7.5914 17.5231 8.78011 16.3133 9.65697C16.791 10.0612 17.2498 10.489 17.6886 10.9387C19.3646 9.92716 21.2009 9.13632 23.1533 8.60907C22.0266 7.51835 20.6512 6.68295 19.1205 6.19615ZM15.5043 26.274C16.0451 25.2469 16.4286 22.9117 16.4286 20.2857V19.3441C16.454 17.146 17.4524 15.1817 19.0134 13.8621C18.559 13.223 18.0694 12.614 17.5471 12.0389C13.3913 14.744 10.352 18.8957 9.21044 23.7266C10.9062 25.2179 13.0969 26.1598 15.5043 26.274ZM16.442 26.2764C18.8459 26.1748 21.0363 25.248 22.7374 23.7722C22.368 20.3933 21.2296 17.2483 19.4979 14.5758C18.1425 15.7544 17.2857 17.4914 17.2857 19.4286V20.2857C17.2857 22.7513 16.9665 24.9733 16.442 26.2764ZM25.9545 13.4009C25.2463 13.1376 24.4906 13 23.7143 13C22.4098 13 21.196 13.3886 20.1824 14.0562C21.8937 16.6798 23.0533 19.7407 23.509 23.0294C25.2312 21.1904 26.2857 18.7183 26.2857 16C26.2857 15.1021 26.1707 14.2311 25.9545 13.4009ZM25.638 12.3996C25.214 11.2651 24.5954 10.2255 23.8228 9.32143C21.8423 9.80926 19.981 10.5778 18.2871 11.5796C18.7881 12.1401 19.2596 12.7305 19.6995 13.3479C20.8506 12.5863 22.2307 12.1429 23.7143 12.1429C24.3724 12.1429 25.018 12.2303 25.638 12.3996ZM16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28Z"
      ></path>
    ),
  },

  {
    id: "counter-strike-2",
    label: "Counter-Strike",
    icon: (
      <path d="M11.8967 18.8639L13.1361 20.1033L13.1724 20.067C13.9726 19.2668 15.1951 19.0684 16.2073 19.5745L16.4262 19.684C16.7636 19.8527 17.1711 19.7866 17.4378 19.5198L25.2204 11.7372C26.5895 10.3682 26.5895 8.14859 25.2204 6.77956C23.8514 5.41054 21.6318 5.41054 20.2628 6.77956L12.4802 14.5622C12.2134 14.8289 12.1473 15.2364 12.316 15.5738L12.4255 15.7927C12.9316 16.8049 12.7332 18.0274 11.933 18.8276L11.8967 18.8639ZM11.277 19.4836L9.80088 20.9597C9.14153 21.6191 8.16624 21.8493 7.28162 21.5544C7.02684 21.4695 6.74595 21.5358 6.55605 21.7257L6.00949 22.2723C5.66724 22.6145 5.66724 23.1694 6.00949 23.5117L8.48832 25.9905C8.83058 26.3328 9.38548 26.3328 9.72774 25.9905L10.2743 25.4439C10.4642 25.254 10.5305 24.9732 10.4456 24.7184C10.1507 23.8338 10.3809 22.8585 11.0403 22.1991L12.5164 20.723L11.277 19.4836ZM7.47068 10.5069C5.7766 10.5069 4.40328 9.13361 4.40328 7.43954C4.40328 5.74546 5.7766 4.37214 7.47068 4.37214C9.16475 4.37214 10.5381 5.74546 10.5381 7.43954C10.5381 9.13361 9.16475 10.5069 7.47068 10.5069ZM7.47068 9.63053C8.68073 9.63053 9.66168 8.64959 9.66168 7.43954C9.66168 6.22948 8.68073 5.24854 7.47068 5.24854C6.26062 5.24854 5.27968 6.22948 5.27968 7.43954C5.27968 8.64959 6.26062 9.63053 7.47068 9.63053ZM26.4599 5.54015C28.5134 7.59368 28.5134 10.9231 26.4599 12.9766L18.6773 20.7592C17.877 21.5595 16.6545 21.7578 15.6423 21.2517L15.4234 21.1423C15.086 20.9736 14.6785 21.0397 14.4118 21.3065L12.2797 23.4385C12.0898 23.6284 12.0235 23.9093 12.1084 24.1641C12.4033 25.0487 12.1731 26.024 11.5137 26.6834L10.9672 27.2299C9.94039 28.2567 8.27567 28.2567 7.24891 27.2299L4.77007 24.7511C3.74331 23.7243 3.74331 22.0596 4.77007 21.0328L5.31664 20.4863C5.97599 19.8269 6.95128 19.5967 7.8359 19.8916C8.09068 19.9765 8.37157 19.9102 8.56147 19.7203L10.6935 17.5882C10.9603 17.3215 11.0264 16.914 10.8577 16.5766L10.7483 16.3577C10.2422 15.3455 10.4405 14.123 11.2408 13.3227L19.0234 5.54015C21.0769 3.48662 24.4063 3.48662 26.4599 5.54015Z"></path>
    ),
  },

  {
    id: "baseball-6",
    label: "Baseball",
    icon: (
      <path d="M12.3364 17.857C10.9592 19.4673 9.3453 21.3545 7.67699 23.3055C7.44693 23.6676 6.98367 23.8221 6.58243 23.6506C6.20094 23.4875 6.02748 23.5082 5.87719 23.6585C5.68069 23.855 5.72794 24.1351 6.14789 24.555L7.44304 25.8502C7.86531 26.2725 8.14105 26.3194 8.33958 26.1209C8.49913 25.9613 8.52241 25.7945 8.37381 25.4376C8.21384 25.0533 8.35098 24.6154 8.68003 24.379L8.67821 24.3769L14.1343 19.6549L12.3364 17.857ZM12.904 17.1934L14.7943 19.0836L16.3435 17.7429C18.4727 15.9001 18.4727 15.9001 18.8516 15.5753L25.9709 8.42998C26.2808 8.11891 26.2706 7.58676 25.9257 7.24185L24.6945 6.01066C24.3496 5.66575 23.8184 5.65653 23.5085 5.96759L16.4162 13.0859C16.4215 13.0804 15.0002 14.7423 12.904 17.1934ZM10.1863 25.3748C10.3188 26.1154 10.1193 26.8035 9.57077 27.3521C8.56458 28.3583 7.21854 28.1291 6.19135 27.1019L4.8962 25.8067C3.87092 24.7814 3.64296 23.4303 4.646 22.4273C5.19722 21.8761 5.8933 21.6862 6.64648 21.8318C13.5021 13.8145 15.1404 11.8994 15.185 11.8547L22.2773 4.7364C23.2762 3.73386 24.9085 3.7622 25.9235 4.77722L27.1547 6.00842C28.1697 7.02344 28.201 8.65862 27.2021 9.66117C22.8514 14.0278 22.8514 14.0278 20.0358 16.8503L10.1863 25.3748ZM9.09553 14.0688C7.41269 14.0688 6.04848 12.7046 6.04848 11.0217C6.04848 9.33891 7.41269 7.9747 9.09553 7.9747C10.7784 7.9747 12.1426 9.33891 12.1426 11.0217C12.1426 12.7046 10.7784 14.0688 9.09553 14.0688ZM9.09553 13.1982C10.2976 13.1982 11.272 12.2238 11.272 11.0217C11.272 9.81972 10.2976 8.84529 9.09553 8.84529C7.8935 8.84529 6.91907 9.81972 6.91907 11.0217C6.91907 12.2238 7.8935 13.1982 9.09553 13.1982Z"></path>
    ),
  },

  {
    id: "cricket-21",
    label: "Cricket",
    icon: (
      <path d="M11.8967 18.8639L13.1361 20.1033L13.1724 20.067C13.9726 19.2668 15.1951 19.0684 16.2073 19.5745L16.4262 19.684C16.7636 19.8527 17.1711 19.7866 17.4378 19.5198L25.2204 11.7372C26.5895 10.3682 26.5895 8.14859 25.2204 6.77956C23.8514 5.41054 21.6318 5.41054 20.2628 6.77956L12.4802 14.5622C12.2134 14.8289 12.1473 15.2364 12.316 15.5738L12.4255 15.7927C12.9316 16.8049 12.7332 18.0274 11.933 18.8276L11.8967 18.8639ZM11.277 19.4836L9.80088 20.9597C9.14153 21.6191 8.16624 21.8493 7.28162 21.5544C7.02684 21.4695 6.74595 21.5358 6.55605 21.7257L6.00949 22.2723C5.66724 22.6145 5.66724 23.1694 6.00949 23.5117L8.48832 25.9905C8.83058 26.3328 9.38548 26.3328 9.72774 25.9905L10.2743 25.4439C10.4642 25.254 10.5305 24.9732 10.4456 24.7184C10.1507 23.8338 10.3809 22.8585 11.0403 22.1991L12.5164 20.723L11.277 19.4836ZM7.47068 10.5069C5.7766 10.5069 4.40328 9.13361 4.40328 7.43954C4.40328 5.74546 5.7766 4.37214 7.47068 4.37214C9.16475 4.37214 10.5381 5.74546 10.5381 7.43954C10.5381 9.13361 9.16475 10.5069 7.47068 10.5069ZM7.47068 9.63053C8.68073 9.63053 9.66168 8.64959 9.66168 7.43954C9.66168 6.22948 8.68073 5.24854 7.47068 5.24854C6.26062 5.24854 5.27968 6.22948 5.27968 7.43954C5.27968 8.64959 6.26062 9.63053 7.47068 9.63053ZM26.4599 5.54015C28.5134 7.59368 28.5134 10.9231 26.4599 12.9766L18.6773 20.7592C17.877 21.5595 16.6545 21.7578 15.6423 21.2517L15.4234 21.1423C15.086 20.9736 14.6785 21.0397 14.4118 21.3065L12.2797 23.4385C12.0898 23.6284 12.0235 23.9093 12.1084 24.1641C12.4033 25.0487 12.1731 26.024 11.5137 26.6834L10.9672 27.2299C9.94039 28.2567 8.27567 28.2567 7.24891 27.2299L4.77007 24.7511C3.74331 23.7243 3.74331 22.0596 4.77007 21.0328L5.31664 20.4863C5.97599 19.8269 6.95128 19.5967 7.8359 19.8916C8.09068 19.9765 8.37157 19.9102 8.56147 19.7203L10.6935 17.5882C10.9603 17.3215 11.0264 16.914 10.8577 16.5766L10.7483 16.3577C10.2422 15.3455 10.4405 14.123 11.2408 13.3227L19.0234 5.54015C21.0769 3.48662 24.4063 3.48662 26.4599 5.54015Z"></path>
    ),
  },

  {
    id: "dota-2-4",
    label: "Dota 2",
    icon: (
      <>
        <path d="M4 24.6227C4 24.7023 4.03161 24.7786 4.08787 24.8349L7.16514 27.9121C7.2214 27.9684 7.29771 28 7.37728 28H13.0348C13.302 28 13.4359 27.6769 13.2469 27.4879L4.51213 18.7531C4.32314 18.5641 4 18.698 4 18.9652V24.6227Z"></path>
        <path d="M22.4885 27.8944C22.5455 27.9614 22.629 28 22.7169 28H26.6555C26.8048 28 26.9313 27.8902 26.9525 27.7424L27.9749 20.5853C27.9904 20.4769 27.9457 20.3688 27.8582 20.303L6.37688 4.1565C6.25745 4.06672 6.09015 4.07853 5.9845 4.18418L4.19574 5.97293C4.08518 6.08349 4.07808 6.26042 4.1794 6.37949L16.9105 21.3397C16.9407 21.3752 16.9787 21.4031 17.0216 21.4214L19.0496 22.2838C19.1365 22.3208 19.201 22.3965 19.2235 22.4882L19.7504 24.6281C19.7616 24.6733 19.7831 24.7153 19.8132 24.7508L22.4885 27.8944Z"></path>
        <path d="M18.9652 4C18.698 4 18.5641 4.32314 18.7531 4.51213L27.4879 13.2469C27.6769 13.4359 28 13.302 28 13.0348V7.37728C28 7.29771 27.9684 7.2214 27.9121 7.16514L24.8349 4.08787C24.7786 4.03161 24.7023 4 24.6227 4H18.9652Z"></path>
      </>
    ),
  },

  {
    id: "league-of-legends-8",
    label: "League of Legends",
    icon: (
      <path d="M12.3364 17.857C10.9592 19.4673 9.3453 21.3545 7.67699 23.3055C7.44693 23.6676 6.98367 23.8221 6.58243 23.6506C6.20094 23.4875 6.02748 23.5082 5.87719 23.6585C5.68069 23.855 5.72794 24.1351 6.14789 24.555L7.44304 25.8502C7.86531 26.2725 8.14105 26.3194 8.33958 26.1209C8.49913 25.9613 8.52241 25.7945 8.37381 25.4376C8.21384 25.0533 8.35098 24.6154 8.68003 24.379L8.67821 24.3769L14.1343 19.6549L12.3364 17.857ZM12.904 17.1934L14.7943 19.0836L16.3435 17.7429C18.4727 15.9001 18.4727 15.9001 18.8516 15.5753L25.9709 8.42998C26.2808 8.11891 26.2706 7.58676 25.9257 7.24185L24.6945 6.01066C24.3496 5.66575 23.8184 5.65653 23.5085 5.96759L16.4162 13.0859C16.4215 13.0804 15.0002 14.7423 12.904 17.1934ZM10.1863 25.3748C10.3188 26.1154 10.1193 26.8035 9.57077 27.3521C8.56458 28.3583 7.21854 28.1291 6.19135 27.1019L4.8962 25.8067C3.87092 24.7814 3.64296 23.4303 4.646 22.4273C5.19722 21.8761 5.8933 21.6862 6.64648 21.8318C13.5021 13.8145 15.1404 11.8994 15.185 11.8547L22.2773 4.7364C23.2762 3.73386 24.9085 3.7622 25.9235 4.77722L27.1547 6.00842C28.1697 7.02344 28.201 8.65862 27.2021 9.66117C22.8514 14.0278 22.8514 14.0278 20.0358 16.8503L10.1863 25.3748ZM9.09553 14.0688C7.41269 14.0688 6.04848 12.7046 6.04848 11.0217C6.04848 9.33891 7.41269 7.9747 9.09553 7.9747C10.7784 7.9747 12.1426 9.33891 12.1426 11.0217C12.1426 12.7046 10.7784 14.0688 9.09553 14.0688ZM9.09553 13.1982C10.2976 13.1982 11.272 12.2238 11.272 11.0217C11.272 9.81972 10.2976 8.84529 9.09553 8.84529C7.8935 8.84529 6.91907 9.81972 6.91907 11.0217C6.91907 12.2238 7.8935 13.1982 9.09553 13.1982Z"></path>
    ),
  },
  {
    id: "ice-hockey-7",
    label: "Ice Hockey",
    icon: (
      <path d="M20.4325 12.3083L23.0427 13.8744L23.8906 12.2503L21.2841 10.6864L20.4325 12.3083ZM20.0245 13.0855L16.2598 20.2553C15.877 20.9843 15.027 21.3345 14.2418 21.0868L8.91739 19.4069C8.68698 19.3342 8.44699 19.2964 8.20538 19.2947C6.8673 19.2853 5.77496 20.3625 5.76558 21.7005L5.75277 23.5268C5.75272 23.5362 5.75272 23.5362 5.75272 23.5456C5.75374 24.8838 6.83933 25.9677 8.17744 25.9667L15.5154 25.961C16.2636 25.9605 16.9497 25.5444 17.296 24.8811L22.6364 14.6526L20.0245 13.0855ZM21.6922 9.90922L24.2969 11.4721L26.0634 8.0887C26.4638 7.32187 26.1886 6.37575 25.4395 5.94323C25.4148 5.92919 25.4148 5.92919 25.3897 5.91581C24.6967 5.55195 23.84 5.81875 23.4761 6.51172L21.6922 9.90922ZM6.81056 10.4124V12.1744C6.81056 13.4187 8.65447 14.4613 11.1922 14.4613C13.7304 14.4613 15.5741 13.4187 15.5741 12.1738V10.2665C14.6513 10.9983 13.0775 11.3941 11.1677 11.3941C9.22393 11.3941 7.70017 11.0687 6.81056 10.4124ZM6.81414 8.76685C6.81599 9.8361 8.43009 10.5177 11.1677 10.5177C13.6624 10.5177 15.3833 9.78719 15.5699 8.75879C15.4716 7.55988 13.6601 6.57411 11.1922 6.57411C8.71901 6.57411 6.90504 7.56432 6.81414 8.76685ZM11.1922 15.3377C8.23474 15.3377 5.9342 14.0369 5.9342 12.1744V8.86166C5.9342 6.9987 8.23457 5.69776 11.1922 5.69776C14.1501 5.69776 16.4505 6.99866 16.4505 8.86166V12.1738C16.4505 14.0368 14.1501 15.3377 11.1922 15.3377ZM21.9243 5.69691C22.7382 4.1469 24.6545 3.55014 26.2045 4.364C26.2606 4.39392 26.2606 4.39392 26.3158 4.42533C27.8783 5.3274 28.4521 7.30061 27.6171 8.89989L18.8497 25.6923C18.2015 26.9338 16.9173 27.7127 15.5167 27.7138L8.17878 27.7194C5.87267 27.7211 4.00176 25.8531 4 23.547C4.00001 23.5307 4.00001 23.5307 4.0001 23.5145L4.01291 21.6882C4.02908 19.3822 5.91161 17.5259 8.21767 17.542C8.63405 17.545 9.04766 17.6101 9.44476 17.7354L14.728 19.4023L21.9243 5.69691Z"></path>
    ),
  },
  {
    id: "volleyball-9",
    label: "Volleyball",
    icon: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.509 7.30099C9.48574 9.0238 8.87757 10.9635 8.74288 12.9927C8.87583 12.9976 9.00917 13 9.14286 13C10.2172 13 11.2604 12.8405 12.2474 12.5418C12.5911 10.0508 13.7417 7.58916 15.4152 5.73063C13.6177 5.83138 11.9434 6.3937 10.509 7.30099ZM8.93089 8.52845C7.74843 9.6476 6.83148 11.0444 6.28441 12.6146C6.80828 12.7593 7.344 12.8639 7.88818 12.9274C7.99067 11.3976 8.34562 9.9151 8.93089 8.52845ZM16.6072 5.73191C14.8575 7.40464 13.6033 9.78053 13.1665 12.2172C15.8619 11.1244 18.0389 8.9613 19.1215 6.19647C18.3214 5.94195 17.4789 5.78266 16.6072 5.73191ZM5.89213 17.9145C6.10294 19.0343 6.49523 20.0901 7.0373 21.0501C11.2593 21.8766 15.0461 21.4325 18.8389 18.4268C18.6652 17.4347 18.3539 16.4813 17.9195 15.5905C13.857 17.8101 11.0395 18.4531 5.89213 17.9145ZM5.76611 17.039C10.8721 17.6001 13.5417 17.0068 17.5131 14.8358C16.9128 13.821 16.144 12.9046 15.2311 12.127C13.4502 13.2293 11.3579 13.8571 9.14286 13.8571C8.0813 13.8571 7.03889 13.714 6.03658 13.4354C5.82617 14.2552 5.71429 15.1145 5.71429 16C5.71429 16.3507 5.73184 16.6973 5.76611 17.039ZM7.66884 22.0335C8.49137 23.1673 9.53968 24.1266 10.7478 24.8455C11.3455 24.948 11.9549 25 12.5714 25C14.7612 25 16.8513 24.3421 18.6179 23.1321C18.8693 22.2168 19 21.2613 19 20.2857C19 19.9922 18.9881 19.7007 18.9647 19.4117C15.3124 22.1422 11.653 22.6727 7.66884 22.0335ZM13.0235 25.8485C13.9657 26.1328 14.965 26.2857 16 26.2857C16.4098 26.2857 16.814 26.2617 17.2113 26.2151C17.5912 25.6446 17.9145 25.0407 18.1773 24.411C16.6101 25.2807 14.8535 25.778 13.0235 25.8485L13.0235 25.8485ZM18.6241 8.92403C17.8907 9.97002 16.9911 10.8839 15.9673 11.6314C18.4172 13.8061 19.8571 16.9278 19.8571 20.2857C19.8571 22.3303 19.325 24.2944 18.3397 26.0184C20.0239 25.6266 21.5493 24.8211 22.803 23.7148C23.1223 22.4791 23.2857 21.2005 23.2857 19.9C23.2857 15.7132 21.5832 11.7961 18.6241 8.92403ZM19.0979 8.19068C22.2969 11.2322 24.1429 15.4204 24.1429 19.9C24.1429 20.798 24.069 21.6864 23.9236 22.5589C25.3989 20.7785 26.2857 18.4928 26.2857 16C26.2857 11.71 23.6594 8.03347 19.9268 6.49047C19.6956 7.08413 19.4177 7.65219 19.0979 8.19068ZM16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28Z"
      ></path>
    ),
  },
];

export default function SportsLivePage({
  params: paramsPromise,
}: {
  params: Promise<{ sport?: string[] }>;
}) {
  const params = use(paramsPromise);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = params.sport?.[0] || "soccer-1";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync activeTab with URL path
  useEffect(() => {
    const sportPath = params.sport?.[0];
    if (sportPath && sportPath !== activeTab) {
      startTransition(() => {
        setActiveTab(sportPath);
      });
    }
  }, [params.sport, activeTab]);

  // Also keep sync with "top" param if it exists (for backward compatibility or other uses)
  const prevTopParamRef = useRef<string | null>(null);
  useEffect(() => {
    const topParam = searchParams.get("top");
    if (topParam && topParam !== prevTopParamRef.current) {
      prevTopParamRef.current = topParam;
      const tabId = topParam.startsWith("/") ? topParam.slice(1) : topParam;
      if (activeTab !== tabId) {
        startTransition(() => {
          setActiveTab(tabId);
        });
      }
    } else if (!topParam) {
      prevTopParamRef.current = null;
    }
  }, [searchParams, activeTab]);

  // Extract sport type from tab id (e.g., "soccer-1" -> "soccer")
  const getActiveSport = () => {
    const sportMatch = activeTab.match(/^(.+?)-\d+$/);
    return sportMatch ? sportMatch[1] : "soccer";
  };

  // Filter matches based on active sport
  const filteredMatches = POPULAR_MATCHES.filter((match) => {
    const activeSport = getActiveSport();
    return match.sport === activeSport;
  });

  // Handle tab click - update URL and state
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/sports/live/${tabId}`, { scroll: false });
  };

  return (
    <div className="page-content relative z-10 w-full px-4 sm:px-0 pb-0!">
      <div className="my-0! -mx-4 min-h-[70vh] sm:mx-0">
        <div
          style={{
            fontFamily: "inherit",
            backgroundColor: "var(--sports-bg_main)",
          }}
        >
          <div
            className="sports-main"
            style={{ minHeight: `calc(-56px + 100vh)` }}
          >
            <SportsHeader />

            {/* Feature Modules */}

            <div className="sport-content">
              <div className="sport-content__inner">
                <div
                  className="sport-content__title"
                  data-editor-id="blockTitle"
                >
                  <svg
                    data-cy="ic-live-simple"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#FF4E4E"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block mr-2"
                    style={{
                      fill: "rgb(205, 48, 48)",
                      color: "inherit",
                      width: "auto",
                      height: "32px",
                    }}
                  >
                    <path d="M12.9628 3.20912C12.6766 2.93029 12.2125 2.93029 11.9263 3.20912C11.6401 3.48794 11.6401 3.94001 11.9263 4.21883C12.436 4.71538 12.8404 5.30487 13.1163 5.95365C13.3921 6.60242 13.5341 7.29777 13.5341 8C13.5341 8.70223 13.3921 9.39758 13.1163 10.0464C12.8404 10.6951 12.436 11.2846 11.9263 11.7812C11.6401 12.06 11.6401 12.5121 11.9263 12.7909C12.2125 13.0697 12.6766 13.0697 12.9628 12.7909C13.6087 12.1617 14.121 11.4148 14.4706 10.5928C14.8201 9.77079 15 8.88975 15 8C15 7.11025 14.8201 6.22921 14.4706 5.40719C14.121 4.58517 13.6087 3.83827 12.9628 3.20912Z"></path>
                    <path d="M10.0422 5.11529C10.3284 4.83647 10.7925 4.83647 11.0787 5.11529C11.4708 5.49724 11.7818 5.95068 11.994 6.44972C12.2062 6.94876 12.3155 7.48363 12.3155 8.02379C12.3155 8.56395 12.2062 9.09881 11.994 9.59786C11.7818 10.0969 11.4708 10.5503 11.0787 10.9323C10.7925 11.2111 10.3284 11.2111 10.0422 10.9323C9.75595 10.6535 9.75595 10.2014 10.0422 9.92257C10.2982 9.67322 10.5012 9.37719 10.6397 9.0514C10.7783 8.72561 10.8496 8.37642 10.8496 8.02379C10.8496 7.67115 10.7783 7.32197 10.6397 6.99617C10.5012 6.67038 10.2982 6.37436 10.0422 6.12501C9.75595 5.84618 9.75595 5.39412 10.0422 5.11529Z"></path>
                    <path d="M8.05198 9.51147C8.90891 9.51147 9.60359 8.83477 9.60359 8.00002C9.60359 7.16526 8.90891 6.48856 8.05198 6.48856C7.19504 6.48856 6.50036 7.16526 6.50036 8.00002C6.50036 8.83477 7.19504 9.51147 8.05198 9.51147Z"></path>
                    <path d="M6.05604 5.11529C5.76981 4.83647 5.30574 4.83647 5.0195 5.11529C4.62741 5.49724 4.31638 5.95068 4.10418 6.44972C3.89198 6.94876 3.78276 7.48363 3.78276 8.02379C3.78276 8.56395 3.89198 9.09881 4.10418 9.59786C4.31638 10.0969 4.62741 10.5503 5.0195 10.9323C5.30574 11.2111 5.76981 11.2111 6.05604 10.9323C6.34228 10.6535 6.34228 10.2014 6.05604 9.92257C5.80007 9.67322 5.59702 9.37719 5.45848 9.0514C5.31995 8.72561 5.24865 8.37642 5.24865 8.02379C5.24865 7.67115 5.31995 7.32197 5.45848 6.99617C5.59702 6.67038 5.80007 6.37436 6.05604 6.12501C6.34228 5.84618 6.34228 5.39412 6.05604 5.11529Z"></path>
                    <path d="M3.03717 3.20912C3.3234 2.93029 3.78748 2.93029 4.07371 3.20912C4.35994 3.48794 4.35994 3.94001 4.07371 4.21883C3.56397 4.71538 3.15962 5.30487 2.88375 5.95365C2.60788 6.60242 2.46589 7.29777 2.46589 8C2.46589 8.70223 2.60788 9.39758 2.88375 10.0464C3.15962 10.6951 3.56397 11.2846 4.07371 11.7812C4.35994 12.06 4.35994 12.5121 4.07371 12.7909C3.78748 13.0697 3.3234 13.0697 3.03717 12.7909C2.39131 12.1617 1.87898 11.4148 1.52944 10.5928C1.1799 9.77078 1 8.88975 1 8C1 7.11025 1.1799 6.22921 1.52944 5.40719C1.87898 4.58517 2.39131 3.83827 3.03717 3.20912Z"></path>
                  </svg>
                  <div>Live</div>
                </div>
                <SportsCarousel />
                <div>
                  <div className="w-full">
                    <div className="block">
                      <div className="mt-6">
                        <div className="h-auto overflow-visible">
                          <div className="overflow-visible">
                            <div className="mb-4">
                              <div className="relative h-8.25">
                                <div className="w-full h-8.25 overflow-hidden relative">
                                  <div className="w-full pb-12.5 overflow-x-auto overflow-y-hidden">
                                    <div className="relative w-full overflow-hidden h-8.5">
                                      <div className="inline-block whitespace-nowrap align-top h-8.25">
                                        <div className="flex flex-nowrap">
                                          {TABS.map((tab) => (
                                            <button
                                              key={tab.id}
                                              onClick={() =>
                                                handleTabClick(tab.id)
                                              }
                                              className={cn(
                                                "sport-item__tab",
                                                tab.id === activeTab
                                                  ? "active"
                                                  : "",
                                              )}
                                            >
                                              <div className="sport-tab__icon">
                                                <svg
                                                  data-cy={`sport-${tab.icon}`}
                                                  width="32"
                                                  height="32"
                                                  viewBox="0 0 32 32"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  style={{
                                                    fill: "currentcolor",
                                                    color: "inherit",
                                                    width: "auto",
                                                    height: "24px",
                                                  }}
                                                >
                                                  {tab.icon}
                                                </svg>
                                              </div>
                                              <div className="bt2127">
                                                {tab.label}
                                              </div>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                              {filteredMatches.map((match) => (
                                <SportCard key={match.id} {...match} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-[50%] m-[40px_auto_96px]">
                <div className="bt598">
                  <div className="block">
                    <div className="w-full flex justify-center items-center flex-wrap">
                      <div
                        className="sports-odd__selectLabel"
                        data-editor-id="oddsFormatSelectLabel"
                      >
                        Odds Format
                      </div>
                      <div className="w-42 z-10">
                        <div
                          className="relative text-xs"
                          data-editor-id="oddsFormatSelect"
                        >
                          <div className="sports_odd__select">
                            American
                            <div
                              className="sc-hehhuf-0 eBtXID"
                              style={{ width: "16px", height: "16px" }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                              >
                                <path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="sports-odd__NoticeMessage"
                    data-editor-id="marketNoticeMessage"
                  >
                    Although every effort is made to ensure data displayed on
                    our site is accurate, this data is for information purposes
                    and should be used as a guide only. In the event of any
                    particular information being incorrect, we assume no
                    liability for it.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
