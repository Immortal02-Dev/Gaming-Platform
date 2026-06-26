"use client";

import CardCarousel from "@/components/ui/carousel/CardCarousel";
import { useGames } from "@/lib/useGames";

export default function LiveCasino() {
  const { games } = useGames({ section: "live", limit: 18 });

  return (
    <CardCarousel
      title="Live Casino"
      games={games}
      path="casino/live"
      sectionId="live-casino-home"
    />
  );
}
