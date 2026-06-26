import { BASE_URL, getMediaUrl } from "./constants";

export interface Game {
  id: string | number;
  slug: string;
  title: string;
  image: string;
  href: string;
  userCount: number;
  isNew?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  category?: string;
  provider_name?: string;
  provider_slug?: string;
}

export interface Provider {
  id: number;
  slug: string;
  name: string;
  logo: string;
  game_count: number;
}

export interface Sport {
  id: number;
  slug: string;
  name: string;
  icon_svg?: string;
}

export interface MatchOutcome {
  name: string;
  value: string;
}

export interface Match {
  id: string;
  sport: string;
  country: string;
  league: string;
  teams: {
    name: string;
    logo: string;
    score: number;
  }[];
  status: string;
  isLive: boolean;
  href: string;
  marketName: string;
  outcomes: MatchOutcome[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ── New Interfaces ──────────────────────────────────────────────────────────

export interface Quest {
  id: number;
  type: "daily" | "weekly";
  title: string;
  description: string;
  reward_amount: number;
  reward_currency: string;
  goal_value: number;
  is_active: boolean;
}

export interface QuestProgress extends Quest {
  quest_id: number;
  current_value: number;
  status: "pending" | "completed" | "claimed";
  period_date: string;
}

export interface QuestMeta {
  daily_expires_at: string;
  daily_expires_ms: number;
  weekly_expires_at: string;
  weekly_expires_ms: number;
}

export interface QuestStats {
  accumulated_rewards: number;
  currency: string;
}

export interface Lottery {
  id: number;
  name: string;
  slug: string;
  draw_time: string;
  jackpot_amount: number;
  jackpot_currency: string;
  jackpot: string; // Combined prize string
  is_popular: boolean;
  is_featured: boolean;
  is_exclusive: boolean;
  country_code: string;
  next_draw_at?: string;
}

export interface LotterySection {
  title: string;
  lotteries: Lottery[];
}

export interface ReferralStats {
  user_id: number;
  referral_code: string;
  referral_link: string;
  total_rewards: number;
  total_friends: number;
  available_commission: number;
  locked_referral: number;
}

export interface ReferralReward {
  id: number;
  user_id: number;
  amount: number;
  currency: string;
  status: "pending" | "claimed";
  created_at: string;
}

export interface ReferralFriend {
  id: number;
  username: string;
  user_id: number;
  commission_rate: number;
  total_deposits_7d: number;
  total_commission: number;
  registered_at: string;
  friend_vip_level: number;
}

export interface LiveReward {
  username: string;
  amount: number;
  currency: string;
  awarded_at: string;
}

export interface BonusStats {
  user_id: number;
  total_claimed: number;
  vip_bonus: number;
  special_bonus: number;
  general_bonus: number;
  locked_bonus: number;
  deposit_bonus_progress: number;
}

export interface RakebackInfo {
  locked_bcd: number;
  unlock_rate: number;
  ready_to_claim: number;
  next_claim_time: string | null;
}

export interface BonusTask {
  id: number;
  task_key: string;
  status: "pending" | "completed" | "claimed";
  reward_amount: number;
}

export interface TradingMarket {
  id: number;
  symbol: string;
  price: string | number;
  change_24h: number;
  is_active: boolean;
}

export interface Trade {
  id: number;
  symbol: string;
  trading_type: string;
  amount: number;
  direction: "up" | "down" | "buy" | "sell";
  entry_price: number;
  exit_price?: number;
  profit?: number;
  status: "pending" | "won" | "lost";
  created_at: string;
}

export interface PriceData {
  time: number;
  value: number;
}

export interface TradingStats {
  win_ratio_24h: number;
  live_players_24h: number;
  wins_paid_24h: number;
  all_time_wins_paid: number;
}

export interface GamesResponse {
  data: Game[];
  pagination: Pagination;
}

export interface FeaturedGamesResponse {
  section: string;
  data: Game[];
}

export interface ProvidersResponse {
  data: Provider[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function mapGame(g: any): Game {
  return {
    id: g.id,
    slug: g.slug,
    title: g.title,
    image: getMediaUrl(g.image),
    href: `/play/${g.slug}`,
    userCount: g.user_count ?? 0,
    isNew: Boolean(g.is_new),
    isHot: Boolean(g.is_hot),
    isFeatured: Boolean(g.is_featured),
    category: g.category,
    provider_name: g.provider_name,
    provider_slug: g.provider_slug,
  };
}

// ── API Functions ────────────────────────────────────────────────────────────

/**
 * GET /api/games/featured?section=originals|hot|live|new
 */
export async function fetchFeaturedGames(
  section: "originals" | "hot" | "live" | "new",
  limit = 12,
): Promise<Game[]> {
  const res = await fetch(
    `${BASE_URL}/games/featured?section=${section}&limit=${limit}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) return [];
  const json: FeaturedGamesResponse = await res.json();
  return json.data.map(mapGame);
}

/**
 * GET /api/games?category=&sort=&page=&limit=&isNew=&isHot=
 */
export async function fetchGames(params: {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  isNew?: boolean;
  isHot?: boolean;
}): Promise<{ games: Game[]; pagination: Pagination }> {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.isNew) query.set("isNew", "true");
  if (params.isHot) query.set("isHot", "true");

  const res = await fetch(`${BASE_URL}/games?${query.toString()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok)
    return {
      games: [],
      pagination: { total: 0, page: 1, limit: 16, totalPages: 0 },
    };

  const json: GamesResponse = await res.json();
  return { games: json.data.map(mapGame), pagination: json.pagination };
}

/**
 * GET /api/games/search?q=...
 */
export async function fetchSearchGames(query: string): Promise<Game[]> {
  if (!query || query.length < 2) return [];
  const res = await fetch(
    `${BASE_URL}/games/search?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) return [];
  const json: { data: any[] } = await res.json();
  return json.data.map(mapGame);
}

/**
 * GET /api/games/favorites (authenticated)
 */
export async function fetchFavoriteGames(token: string): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json: { data: any[] } = await res.json();
  return json.data.map(mapGame);
}

/**
 * GET /api/games/recent (authenticated)
 */
export async function fetchRecentGames(token: string): Promise<Game[]> {
  const res = await fetch(`${BASE_URL}/games/recent`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json: any[] = await res.json();
  return json.map(mapGame);
}

/**
 * GET /api/providers
 */
export async function fetchProviders(): Promise<Provider[]> {
  const res = await fetch(`${BASE_URL}/providers`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const json: ProvidersResponse = await res.json();
  return json.data;
}

/**
 * GET /api/bets/history  (authenticated)
 */
export async function fetchBetHistory(
  params: { category?: string; coin?: string; period?: string; page?: number },
  token: string,
): Promise<{ data: any[]; pagination: Pagination }> {
  const query = new URLSearchParams();
  if (params.category && params.category !== "all")
    query.set("category", params.category);
  if (params.coin && params.coin !== "All Assets")
    query.set("coin", params.coin);
  if (params.period) query.set("period", params.period);
  if (params.page) query.set("page", String(params.page));

  const res = await fetch(`${BASE_URL}/bets/history?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok)
    return {
      data: [],
      pagination: { total: 0, page: 1, limit: 20, totalPages: 0 },
    };
  return res.json();
}

/**
 * GET /api/sports
 */
export async function fetchSports(): Promise<Sport[]> {
  const res = await fetch(`${BASE_URL}/sports`, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
}

/**
 * GET /api/sports/matches
 */
export async function fetchMatches(
  type: "popular" | "live" | "upcoming",
  sportSlug?: string,
  ids?: string[] | string,
): Promise<Match[]> {
  let url = `${BASE_URL}/sports/matches?type=${type}`;
  if (sportSlug) url += `&sportSlug=${sportSlug}`;
  if (ids) {
    const idsString = Array.isArray(ids) ? ids.join(",") : ids;
    url += `&ids=${idsString}`;
  }

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return await res.json();
}

/**
 * ── QUESTS ──────────────────────────────────────────────────────────────
 */

export async function fetchQuests(type?: "daily" | "weekly"): Promise<Quest[]> {
  const url = type ? `${BASE_URL}/quests?type=${type}` : `${BASE_URL}/quests`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function fetchQuestMeta(): Promise<QuestMeta | null> {
  const res = await fetch(`${BASE_URL}/quests/meta`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function fetchQuestProgress(
  token: string,
): Promise<QuestProgress[]> {
  const res = await fetch(`${BASE_URL}/quests/my-progress`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function fetchQuestStats(
  token: string,
): Promise<QuestStats | null> {
  const res = await fetch(`${BASE_URL}/quests/stats`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function claimQuest(
  id: number,
  token: string,
): Promise<{ message: string; reward?: any }> {
  const res = await fetch(`${BASE_URL}/quests/${id}/claim`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

/**
 * ── LOTTERY ─────────────────────────────────────────────────────────────
 */

export async function fetchFeaturedLotteries(): Promise<LotterySection[]> {
  const res = await fetch(`${BASE_URL}/lottery/featured`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.sections || [];
}

export async function fetchLotteries(): Promise<Lottery[]> {
  const res = await fetch(`${BASE_URL}/lottery`, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

/**
 * ── REFERRAL ────────────────────────────────────────────────────────────
 */

export async function fetchReferralStats(
  token: string,
): Promise<ReferralStats | null> {
  const res = await fetch(`${BASE_URL}/referral/stats`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function fetchReferralActivities(
  token: string,
): Promise<LiveReward[]> {
  const res = await fetch(`${BASE_URL}/referral/activities`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function fetchReferralFriends(
  token: string,
): Promise<ReferralFriend[]> {
  const res = await fetch(`${BASE_URL}/referral/friends`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function fetchLiveRewards(): Promise<LiveReward[]> {
  const res = await fetch(`${BASE_URL}/referral/live-rewards`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

/**
 * ── BONUS ───────────────────────────────────────────────────────────────
 */

export async function fetchBonusStats(
  token: string,
): Promise<BonusStats | null> {
  const res = await fetch(`${BASE_URL}/bonus/stats`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function fetchRakeback(
  token: string,
): Promise<RakebackInfo | null> {
  const res = await fetch(`${BASE_URL}/bonus/rakeback`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export async function fetchBonusTasks(token: string): Promise<BonusTask[]> {
  const res = await fetch(`${BASE_URL}/bonus/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export async function redeemPromoCode(
  code: string,
  token: string,
): Promise<{ message: string; reward?: any }> {
  const res = await fetch(`${BASE_URL}/bonus/redeem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code }),
  });
  return res.json();
}

/**
 * ── TRADING ─────────────────────────────────────────────────────────────
 */

export async function fetchTradingMarkets(): Promise<TradingMarket[]> {
  const res = await fetch(`${BASE_URL}/trading/markets`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchPriceHistory(
  symbol: string,
  limit = 150,
): Promise<PriceData[]> {
  const res = await fetch(
    `${BASE_URL}/trading/price/${symbol}?limit=${limit}`,
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  return res.json();
}

export async function fetchTradingStats(): Promise<TradingStats | null> {
  const res = await fetch(`${BASE_URL}/trading/stats`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function placeTrade(
  data: any,
  token: string,
): Promise<{ message: string; data?: any }> {
  const res = await fetch(`${BASE_URL}/trading/trade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchPositions(token: string): Promise<Trade[]> {
  const res = await fetch(`${BASE_URL}/trading/positions`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}
