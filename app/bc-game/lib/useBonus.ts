"use client";

import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface BonusStats {
  total_claimed: number;
  vip_bonus: number;
  special_bonus: number;
  general_bonus: number;
  locked_bonus: number;
  deposit_bonus_progress: number;
}

export interface RakebackData {
  locked_bcd: number;
  unlock_rate: number;
  ready_to_claim: number;
  next_claim_time: string | null;
}

export interface TaskData {
  id: number;
  title: string;
  status: 'pending' | 'completed' | 'claimed';
  reward_amount: number;
  icon_url?: string;
}

export interface SpinStatus {
  daily_spins_available: number;
  last_spin_time: string | null;
  vip_spin_available: boolean;
}

export function useBonus() {
  const [stats, setStats] = useState<BonusStats | null>(null);
  const [rakeback, setRakeback] = useState<RakebackData | null>(null);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [spin, setSpin] = useState<SpinStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [statsRes, rakebackRes, tasksRes, spinRes] = await Promise.all([
        fetch(`${BASE_URL}/bonus/stats`, { headers }),
        fetch(`${BASE_URL}/bonus/rakeback`, { headers }),
        fetch(`${BASE_URL}/bonus/tasks`, { headers }),
        fetch(`${BASE_URL}/bonus/spin/status`, { headers })
      ]);

      if (statsRes.ok) setStats((await statsRes.json()).data);
      if (rakebackRes.ok) setRakeback((await rakebackRes.json()).data);
      if (tasksRes.ok) setTasks((await tasksRes.json()).data);
      if (spinRes.ok) setSpin((await spinRes.json()).data);

    } catch (error) {
      console.error("Failed to fetch bonus data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const claimRakeback = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/bonus/rakeback/claim`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchAll();
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  const redeemCode = async (code: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${BASE_URL}/bonus/redeem`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code })
      });
      if (res.ok) fetchAll();
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  return { stats, rakeback, tasks, spin, loading, claimRakeback, redeemCode, refresh: fetchAll };
}
