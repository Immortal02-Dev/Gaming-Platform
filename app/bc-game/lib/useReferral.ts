"use client";

import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ReferralStats {
  total_reward: number;
  total_friends: number;
  referral_reward: number;
  commission_reward: number;
  referral_code: string;
  referral_link: string;
}

export interface ReferralActivity {
  id: number;
  username: string;
  reward_amount: number;
  currency: string;
  type: string;
  created_at: string;
}

export function useReferral() {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [activities, setActivities] = useState<ReferralActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      // In a real app, this would be protected by auth
      const token = localStorage.getItem("token");
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const [statsRes, activitiesRes] = await Promise.all([
        fetch(`${BASE_URL}/referral/stats`, { headers, cache: "no-store" }),
        fetch(`${BASE_URL}/referral/activities`, { headers, cache: "no-store" }),
      ]);

      if (statsRes.ok) {
        const statsJson = await statsRes.ok ? await statsRes.json() : { data: null };
        setStats(statsJson.data);
      }
      
      if (activitiesRes.ok) {
        const activitiesJson = await activitiesRes.json();
        setActivities(activitiesJson.data || []);
      }
    } catch (error) {
      console.error("Failed to load referral data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { stats, activities, loading, refresh: loadData };
}
