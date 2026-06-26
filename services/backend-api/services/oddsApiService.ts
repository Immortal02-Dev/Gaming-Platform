import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://api.the-odds-api.com/v4/sports";

const oddsApi = axios.create({
  baseURL: BASE_URL,
});

export interface OddsScore {
  name: string;
  score: string;
}

export interface OddsEvent {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  completed: boolean;
  scores: OddsScore[] | null;
  last_update: string | null;
}

export interface OddsMarketOutcome {
    name: string;
    price: number;
}

export interface OddsMarket {
    key: string;
    last_update: string;
    outcomes: OddsMarketOutcome[];
}

export interface OddsBookmaker {
    key: string;
    title: string;
    last_update: string;
    markets: OddsMarket[];
}

export interface OddsData {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: OddsBookmaker[];
}

/**
 * Fetch scores for a specific sport (live and upcoming)
 */
export const fetchScores = async (sportKey: string): Promise<OddsEvent[]> => {
  const apiKey = process.env.THE_ODDS_API_KEY;
  if (!apiKey) {
    console.error("❌ THE_ODDS_API_KEY is missing!");
    return [];
  }

  try {
    const response = await oddsApi.get(`/${sportKey}/scores`, {
      params: {
        apiKey,
        daysFrom: 3, 
      },
    });
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ${sportKey} scores:`, error);
    return [];
  }
};

/**
 * Fetch odds for a specific sport
 */
export const fetchOdds = async (sportKey: string, region: string = "us"): Promise<OddsData[]> => {
  const apiKey = process.env.THE_ODDS_API_KEY;
  if (!apiKey) {
    console.error("❌ THE_ODDS_API_KEY is missing!");
    return [];
  }

  try {
    const response = await oddsApi.get(`/${sportKey}/odds`, {
      params: {
        apiKey,
        regions: region,
        markets: "h2h", 
        oddsFormat: "decimal",
      },
    });
    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ${sportKey} odds:`, error);
    return [];
  }
};

/**
 * Legacy wrappers for backward compatibility
 */
export const fetchNBAScores = () => fetchScores("basketball_nba");
export const fetchNBAOdds = () => fetchOdds("basketball_nba");

export default {
  fetchScores,
  fetchOdds,
  fetchNBAScores,
  fetchNBAOdds,
};
