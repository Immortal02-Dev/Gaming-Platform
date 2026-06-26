import "dotenv/config";
import axios from "axios";

// API-Sports Subdomains
export type ApiSportsSubdomain = "football" | "basketball" | "hockey" | "baseball" | "american-football";

const getBaseUrl = (subdomain: ApiSportsSubdomain) => `https://v${subdomain === "football" ? 3 : 1}.${subdomain}.api-sports.io`;

const getApiKey = () => process.env.NBA_API_KEY || "";

export interface ApiSportsGame {
  id: number | string;
  date: string;
  status: {
    short: string;
    long: string;
    elapsed?: number | null;
  };
  league: {
    id: number;
    name: string;
    season: string | number;
  };
  teams: {
    home: { id: number; name: string; logo: string };
    away: { id: number; name: string; logo: string };
  };
  scores: {
    home: { total: number | null };
    away: { total: number | null };
  };
}

/**
 * Fetch games from API-Sports by date.
 * Using date instead of season avoids the free plan restriction on the current season.
 */
export const fetchApiSportsGames = async (
  subdomain: ApiSportsSubdomain,
  date: string, // YYYY-MM-DD
  leagueId?: number
): Promise<ApiSportsGame[]> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("❌ NBA_API_KEY (API-Sports key) is missing!");
    return [];
  }

  const baseUrl = getBaseUrl(subdomain);
  const endpoint = subdomain === "football" ? "/fixtures" : "/games";

  try {
    const params: any = { date };
    if (leagueId) params.league = leagueId;

    const response = await axios.get(`${baseUrl}${endpoint}`, {
      params,
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    if (response.data.errors && Object.keys(response.data.errors).length > 0) {
      console.error(`❌ API-Sports error for ${subdomain} (date ${date}):`, response.data.errors);
      return [];
    }

    const rawGames = response.data.response || [];
    
    return rawGames.map((g: any) => {
      // API-Football response structure normalization
      if (subdomain === "football") {
        return {
          id: g.fixture.id,
          date: g.fixture.date,
          status: g.fixture.status,
          league: g.league,
          teams: g.teams,
          scores: {
            home: { total: g.goals?.home ?? 0 },
            away: { total: g.goals?.away ?? 0 },
          },
        };
      }
      // Standard structure for Basketball, Hockey, Baseball, American Football
      return {
        ...g,
        scores: {
          home: { total: g.scores?.home?.total ?? 0 },
          away: { total: g.scores?.away?.total ?? 0 },
        },
      };
    });
  } catch (error) {
    console.error(`❌ Error fetching API-Sports ${subdomain} games:`, error);
    return [];
  }
};

/**
 * Map API-Sports Game to standardized structure for sync script
 */
export const mapToStandardEvent = (game: ApiSportsGame, sportKey: string) => {
  const isCompleted = ["FT", "AET", "PEN", "POST", "CANC", "ABD", "AWD", "WO"].includes(game.status.short);
  
  return {
    id: `api-sports-${game.id}`,
    sport_key: sportKey,
    commence_time: game.date,
    home_team: game.teams.home.name,
    away_team: game.teams.away.name,
    completed: isCompleted,
    scores: [
      { name: game.teams.home.name, score: String(game.scores.home.total ?? 0) },
      { name: game.teams.away.name, score: String(game.scores.away.total ?? 0) },
    ],
    last_update: new Date().toISOString(),
    status: game.status.short,
  };
};

export default {
  fetchApiSportsGames,
  mapToStandardEvent,
};
