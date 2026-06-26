"use client";

import CardCarousel from "@/components/ui/carousel/CardCarousel";
import { useGames } from "@/lib/useGames";

export default function BcOriginals() {
  const { games } = useGames({ section: "originals", limit: 12 });

  return (
    <CardCarousel
      title="BC Originals"
      games={games}
      path="casino/originals"
      sectionId="bc-originals-home"
    />
  );
}
