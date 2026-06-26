"use client";

import { useState, useEffect } from "react";
import {
  fetchQuests,
  fetchQuestMeta,
  fetchQuestProgress,
  fetchQuestStats,
  Quest,
  QuestMeta,
  QuestProgress,
  QuestStats,
} from "./api";

export function useQuests(token?: string | null) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [progress, setProgress] = useState<QuestProgress[]>([]);
  const [meta, setMeta] = useState<QuestMeta | null>(null);
  const [stats, setStats] = useState<QuestStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [qData, mData] = await Promise.all([
        fetchQuests(),
        fetchQuestMeta(),
      ]);
      setQuests(qData);
      setMeta(mData);

      if (token) {
        const [pData, sData] = await Promise.all([
          fetchQuestProgress(token),
          fetchQuestStats(token),
        ]);
        setProgress(pData);
        setStats(sData);
      }
    } catch (error) {
      console.error("Failed to load quests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  return { quests, progress, meta, stats, loading, refresh: loadData };
}
