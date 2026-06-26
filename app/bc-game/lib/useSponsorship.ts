"use client";

import { useState, useEffect } from "react";

import { BASE_URL, getMediaUrl } from "./constants";

export interface Sponsorship {
  id: number;
  partner_name: string;
  title: string;
  slug: string;
  logo_url: string;
  banner_url: string;
  description: string;
  content: string;
  created_at: string;
}

export function useSponsorships() {
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/sponsorship`, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        const data = (json.data || []).map((s: any) => ({
          ...s,
          logo_url: getMediaUrl(s.logo_url),
          banner_url: getMediaUrl(s.banner_url)
        }));
        setSponsorships(data);
      }
    } catch (error) {
      console.error("Failed to load sponsorships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { sponsorships, loading, refresh: loadData };
}

export function useSponsorship(slug: string) {
  const [sponsorship, setSponsorship] = useState<Sponsorship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const loadDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/sponsorship/${slug}`, { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          const s = json.data;
          if (s) {
            setSponsorship({
              ...s,
              logo_url: getMediaUrl(s.logo_url),
              banner_url: getMediaUrl(s.banner_url)
            });
          }
        }
      } catch (error) {
        console.error("Failed to load sponsorship detail:", error);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [slug]);

  return { sponsorship, loading };
}
