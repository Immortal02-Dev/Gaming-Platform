"use client";

import { useState, useEffect } from "react";
import { fetchSports, fetchMatches, Sport, Match } from "./api";
import { SPORTS_ICON_MAP } from "@/constants/sports";

interface UseSportsOptions {
  type?: "popular" | "live" | "upcoming";
  sportSlug?: string;
  ids?: string[];
}

export function useSports(options: UseSportsOptions = {}) {
  const [sports, setSports] = useState<Sport[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      // If we are looking for favorites and have no IDs, don't even fetch
      if (options.ids && options.ids.length === 0) {
        setMatches([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [sportsData, matchesData] = await Promise.all([
          fetchSports(),
          fetchMatches(
            options.type || "popular",
            options.sportSlug,
            options.ids,
          ),
        ]);

        if (isMounted) {
          const enrichedSports = sportsData.map((sport) => ({
            ...sport,
            icon_svg: sport.icon_svg || SPORTS_ICON_MAP[sport.slug],
          }));
          setSports(enrichedSports);
          setMatches(matchesData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch sports data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [options.type, options.sportSlug, options.ids]);

  return { sports, matches, loading, error };
}
