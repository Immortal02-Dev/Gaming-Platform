"use client";

import { useEffect, useState } from "react";
import {
  fetchFavoriteGames,
  fetchRecentGames,
  fetchFeaturedGames,
  fetchGames,
  Game,
  Pagination,
} from "./api";

interface UseGamesOptions {
  /** For lobby carousels: fetch from /api/games/featured */
  section?: "originals" | "hot" | "live" | "new";
  /** For category pages: fetch from /api/games?category= */
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  isNew?: boolean;
  isHot?: boolean;
  favorites?: boolean;
  recent?: boolean;
  token?: string;
}

interface UseGamesResult {
  games: Game[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
}

export function useGames(options: UseGamesOptions = {}): UseGamesResult {
  const [games, setGames] = useState<Game[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        if (options.favorites && options.token) {
          // Favorites (requires auth token)
          const data = await fetchFavoriteGames(options.token);
          if (!cancelled) {
            setGames(data);
            setPagination(null);
          }
        } else if (options.recent && options.token) {
          // Recent games (requires auth token)
          const data = await fetchRecentGames(options.token);
          if (!cancelled) {
            setGames(data);
            setPagination(null);
          }
        } else if (options.section) {
          // Lobby carousel: use featured endpoint
          const data = await fetchFeaturedGames(options.section, options.limit);
          if (!cancelled) {
            setGames(data);
            setPagination(null);
          }
        } else {
          // Category page: use filtered games endpoint
          const { games: data, pagination: pg } = await fetchGames({
            category: options.category,
            sort: options.sort,
            page: options.page,
            limit: options.limit,
            isNew: options.isNew,
            isHot: options.isHot,
          });
          if (!cancelled) {
            setGames(data);
            setPagination(pg);
          }
        }
      } catch {
        if (!cancelled) setError("Failed to load games");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [
    options.section,
    options.category,
    options.sort,
    options.page,
    options.limit,
    options.isNew,
    options.isHot,
    options.favorites,
    options.recent,
    options.token,
  ]);

  return { games, pagination, loading, error };
}
