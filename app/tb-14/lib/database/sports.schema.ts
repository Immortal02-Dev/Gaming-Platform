// Database schema definitions for Sports Betting

export interface Sport {
  id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface Event {
  id: string;
  sport_id: string;
  name: string;
  slug: string;
  start_time: Date;
  status: "upcoming" | "live" | "finished" | "cancelled";
}

export interface Market {
  id: string;
  event_id: string;
  name: string;
  slug: string;
  active: boolean;
}

export interface Outcome {
  id: string;
  market_id: string;
  name: string;
  odds: number;
  active: boolean;
}

export interface Bet {
  id: string;
  user_id: string;
  outcome_id: string;
  amount: number;
  status: "pending" | "won" | "lost" | "cancelled";
  created_at: Date;
  updated_at: Date;
}
