"use client";
import CardCarousel from "@/components/ui/carousel/CardCarousel";
import { useGames } from "@/lib/useGames";

export default function RecommendedGames() {
  const { games: myRecommended } = useGames({ section: "hot", limit: 18 });

  return (
    <CardCarousel
      title="Recommended Games"
      games={myRecommended}
      path="casino/slots"
      sectionId="recommended-games"
    />
  );
}
