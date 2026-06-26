"use client";

import { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface SwapRate {
  id: number;
  from_coin: string;
  to_coin: string;
  rate: number;
  fee_percentage: number;
}

export function useSwap() {
  const [rates, setRates] = useState<SwapRate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    try {
      const res = await fetch(`${BASE_URL}/swap/rates`);
      if (res.ok) {
        const data = await res.json();
        setRates(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch swap rates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const executeSwap = async (from_coin: string, to_coin: string, amount: number) => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "Please log in first" };

    try {
      const res = await fetch(`${BASE_URL}/swap/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ from_coin, to_coin, amount })
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Swap execution failed:", error);
      return { success: false, message: "Server error" };
    }
  };

  return { rates, loading, executeSwap, refresh: fetchRates };
}
