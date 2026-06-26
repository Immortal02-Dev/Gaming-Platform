"use client";

import { useState, useEffect } from "react";

import { BASE_URL, getMediaUrl } from "./constants";

export interface VipLevel {
  id: number;
  level: number;
  name: string;
  min_wager: number;
  bonus_percentage: number;
  monthly_bonus: number;
  is_active: boolean;
}

export interface VipBenefit {
  id: number;
  level_id: number;
  title: string;
  image_url: string;
  description: string;
  is_active: boolean;
}

export interface VipFaq {
  id: number;
  category: string;
  question: string;
  answer: string;
  display_order: number;
}

export function useVip() {
  const [levels, setLevels] = useState<VipLevel[]>([]);
  const [benefits, setBenefits] = useState<VipBenefit[]>([]);
  const [faqs, setFaqs] = useState<VipFaq[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [vRes, fRes] = await Promise.all([
        fetch(`${BASE_URL}/vip`, { cache: "no-store" }),
        fetch(`${BASE_URL}/vip/faqs`, { cache: "no-store" })
      ]);

      if (vRes.ok) {
        const json = await vRes.json();
        setLevels(json.data.levels || []);
        const benefitData = (json.data.benefits || []).map((b: any) => ({
          ...b,
          image_url: getMediaUrl(b.image_url)
        }));
        setBenefits(benefitData);
      }
      if (fRes.ok) {
        const json = await fRes.json();
        setFaqs(json.data || []);
      }
    } catch (error) {
      console.error("Failed to load VIP data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { levels, benefits, faqs, loading, refresh: loadData };
}
