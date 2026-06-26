"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "bc-game-sports-favorites";

// Global listener registry for same-tab updates across multiple hook instances
const listeners = new Set<() => void>();

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const loadFavorites = useCallback(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    loadFavorites();

    const notify = () => loadFavorites();
    listeners.add(notify);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY) loadFavorites();
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      listeners.delete(notify);
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadFavorites]);

  const toggleFavorite = (id: string) => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    let current: string[] = [];
    if (saved) {
      try {
        current = JSON.parse(saved);
      } catch (e) {}
    }

    const next = current.includes(id)
      ? current.filter((favId) => favId !== id)
      : [...current, id];

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));

    // Update all local hook instances immediately
    listeners.forEach((l) => l());
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}
