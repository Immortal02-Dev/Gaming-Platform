"use client";

import CardCarousel from "@/components/ui/carousel/CardCarousel";
import { useGames } from "@/lib/useGames";

export default function HotGames() {
  const { games } = useGames({ section: "hot", limit: 18 });

  return (
    <CardCarousel
      title="Hot Games"
      games={games}
      path="casino/hot-games"
      sectionId="hot-games-home"
    />
  );
}
