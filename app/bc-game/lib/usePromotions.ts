"use client";

import { useState, useEffect } from "react";

import { BASE_URL, getMediaUrl } from "./constants";

export interface Promotion {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  start_date: string;
  end_date: string;
  status: string;
  is_exclusive: boolean;
}

export function usePromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/promotions`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const data = (json.data || []).map((p: any) => ({
          ...p,
          image_url: getMediaUrl(p.image_url),
        }));
        setPromotions(data);
      }
    } catch (error) {
      console.error("Failed to load promotions:", error);
    } finally {
      setLoading(false);
    }
    0;
  };

  useEffect(() => {
    loadData();
  }, []);

  return { promotions, loading, refresh: loadData };
}
