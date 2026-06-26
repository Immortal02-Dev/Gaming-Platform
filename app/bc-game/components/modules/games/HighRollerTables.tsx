"use client";

import BorderCardCarousel from "@/components/ui/carousel/BorderCardCarousel";
import { useGames } from "@/lib/useGames";

export default function HighRollerTable() {
  const { games } = useGames({ limit: 12 });
  return (
    <BorderCardCarousel
      title="High Roller Table"
      games={games}
      sectionId="High-roller-table-game-home"
    />
  );
}
