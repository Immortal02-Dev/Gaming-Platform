"use client";

import BorderCardCarousel from "@/components/ui/carousel/BorderCardCarousel";
import { useGames } from "@/lib/useGames";

export default function TeenPatti() {
  const { games } = useGames({ category: "poker", limit: 8 });
  return (
    <BorderCardCarousel
      title="Teen Patti"
      games={games}
      sectionId="teen-patti-game-home"
    />
  );
}
