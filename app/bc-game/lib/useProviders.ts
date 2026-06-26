"use client";

import { useEffect, useState } from "react";
import { fetchProviders, Provider } from "./api";

interface UseProvidersResult {
  providers: Provider[];
  loading: boolean;
  error: string | null;
}

export function useProviders(): UseProvidersResult {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchProviders()
      .then((data) => {
        if (!cancelled) {
          setProviders(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load providers");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { providers, loading, error };
}
