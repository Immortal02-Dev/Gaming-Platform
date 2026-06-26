import "dotenv/config";
import axios from "axios";

const BASE_URL = "https://v2.nba.api-sports.io";

const nbaApi = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to attach the API key dynamically
nbaApi.interceptors.request.use((config) => {
  const apiKey = process.env.NBA_API_KEY;
  if (!apiKey) {
    console.error("❌ NBA_API_KEY is missing from environment variables!");
  }
  config.headers["x-apisports-key"] = apiKey;
  return config;
});

export interface NBAGameTeam {
  id: number;
  name: string;
  logo: string;
}

export interface NBAGame {
  id: number;
  league: string;
  season: number;
  date: {
    start: string;
  };
  status: {
    long: string;
    short: string;
  };
  teams: {
    visitors: NBAGameTeam;
    home: NBAGameTeam;
  };
  scores: {
    visitors: {
      points: number;
    };
    home: {
      points: number;
    };
  };
}

export const fetchNBAGames = async (date: string): Promise<NBAGame[]> => {
  try {
    const response = await nbaApi.get(`/games?date=${date}`);
    return response.data.response || [];
  } catch (error) {
    console.error("Error fetching NBA games:", error);
    return [];
  }
};

export const fetchNBALiveGames = async (): Promise<NBAGame[]> => {
  try {
    const response = await nbaApi.get("/games?live=all");
    return response.data.response || [];
  } catch (error) {
    console.error("Error fetching live NBA games:", error);
    return [];
  }
};

export const fetchNBATeams = async (): Promise<NBAGameTeam[]> => {
  try {
    const response = await nbaApi.get("/teams");
    return response.data.response || [];
  } catch (error) {
    console.error("Error fetching NBA teams:", error);
    return [];
  }
};

export default {
  fetchNBAGames,
  fetchNBALiveGames,
  fetchNBATeams,
};
