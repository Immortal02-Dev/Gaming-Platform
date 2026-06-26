"use client";

import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Lottery {
  id: number;
  title: string;
  slug: string;
  draw_time: string;
  prize_pool: number;
  category: string;
  icon_src: string;
  icon_offset_y: number;
  is_exclusive: boolean;
  is_popular: boolean;
  status: string;
  winning_numbers: string | null;
  is_drawn: boolean;
}

export interface LotterySection {
  title: string;
  section: string;
  data: Lottery[];
}

export function useLottery() {
  const [sections, setSections] = useState<LotterySection[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/lottery/featured`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setSections(json.sections || []);
      }
    } catch (error) {
      console.error("Failed to load lotteries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { sections, loading, refresh: loadData };
}
