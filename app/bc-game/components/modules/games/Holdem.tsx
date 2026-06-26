"use client";

import BorderCardCarousel from "@/components/ui/carousel/BorderCardCarousel";
import { useGames } from "@/lib/useGames";

export default function Holdem() {
  const { games } = useGames({ category: "poker", limit: 8 });
  return (
    <BorderCardCarousel
      title={"Hold'em"}
      games={games}
      sectionId="Holdem-game-home"
    />
  );
}
